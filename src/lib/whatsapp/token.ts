// Server-only. Access-token management for the WhatsApp Cloud API.
//
// Tokens from "Generate token" in the App Dashboard are short-lived user tokens
// (hours). Without a business admin to create a never-expiring System User token,
// the app can exchange a fresh short-lived token for a ~60-day long-lived token
// (fb_exchange_token, needs the App Secret). The long-lived token is kept in the
// PRIVATE Blob store — never in logs, responses or the repo — and refreshed
// automatically when it gets old. WHATSAPP_ACCESS_TOKEN (env) is the fallback.
import { get, put } from "@vercel/blob";
import { GRAPH_VERSION } from "./config";

const PATH = "config/whatsapp-access-token.json";
const APP_ID = () => process.env.WHATSAPP_APP_ID || "1762223708324182";

type Stored = { token: string; obtainedAt: string; expiresAt: string | null; source: string };

let cache: { value: Stored | null; at: number } | null = null;
let refreshing = false;

async function readStored(): Promise<Stored | null> {
  if (cache && Date.now() - cache.at < 5 * 60_000) return cache.value;
  let value: Stored | null = null;
  try {
    const res = await get(PATH, { access: "private", useCache: false });
    if (res && res.statusCode === 200) value = JSON.parse(await new Response(res.stream).text()) as Stored;
  } catch {
    value = null;
  }
  cache = { value, at: Date.now() };
  return value;
}

async function writeStored(s: Stored) {
  await put(PATH, JSON.stringify(s), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  cache = { value: s, at: Date.now() };
}

function daysLeft(s: Stored): number | null {
  return s.expiresAt ? (Date.parse(s.expiresAt) - Date.now()) / 86_400_000 : null;
}

// Exchange a token (short-lived, or an existing long-lived one) for a fresh long-lived token.
export async function exchangeToken(sourceToken: string, source: string): Promise<{ expiresAt: string | null }> {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) throw new Error("WHATSAPP_APP_SECRET is not set");
  const url = new URL(`https://graph.facebook.com/${GRAPH_VERSION}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", APP_ID());
  url.searchParams.set("client_secret", secret);
  url.searchParams.set("fb_exchange_token", sourceToken);
  const res = await fetch(url, { method: "GET" });
  const json = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: { message?: string; code?: number };
  };
  if (!res.ok || !json.access_token) {
    throw new Error(`token exchange failed (${json.error?.code ?? res.status}): ${json.error?.message ?? "no token"}`);
  }
  const expiresAt = json.expires_in ? new Date(Date.now() + json.expires_in * 1000).toISOString() : null;
  await writeStored({ token: json.access_token, obtainedAt: new Date().toISOString(), expiresAt, source });
  return { expiresAt };
}

export async function getAccessToken(): Promise<string> {
  const stored = await readStored();
  if (stored) {
    const left = daysLeft(stored);
    if (left === null || left > 0) {
      // Refresh in the background once it is under 20 days from expiry.
      if (left !== null && left < 20 && !refreshing) {
        refreshing = true;
        exchangeToken(stored.token, "auto-refresh")
          .catch((e) => console.warn("WhatsApp: token auto-refresh failed:", (e as Error).message))
          .finally(() => (refreshing = false));
      }
      return stored.token;
    }
  }
  const env = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!env) throw new Error("no WhatsApp access token available");
  return env;
}

export async function tokenStatus() {
  const stored = await readStored();
  return stored
    ? { source: "long-lived (Blob)", obtainedAt: stored.obtainedAt, expiresAt: stored.expiresAt, daysLeft: daysLeft(stored) }
    : { source: "env WHATSAPP_ACCESS_TOKEN (short-lived)" };
}
