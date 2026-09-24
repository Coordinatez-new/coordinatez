import { after, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { GRAPH_VERSION, getTenants, isConfigured } from "@/lib/whatsapp/config";
import { processWebhook, type WebhookPayload } from "@/lib/whatsapp/handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// AI generation runs in after() once Meta has its 200, so allow time for it.
export const maxDuration = 60;

// Meta's verification handshake when the callback URL is saved. With no query
// parameters it returns which settings are present (booleans only, no values).
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const mode = params.get("hub.mode");

  // Staff diagnostic: ?health=1 with header x-wa-key = verify token. Returns Meta's
  // health status for each configured number (why sends are blocked, if they are).
  if (params.get("health")) {
    const key = request.headers.get("x-wa-key");
    if (!process.env.WHATSAPP_VERIFY_TOKEN || key !== process.env.WHATSAPP_VERIFY_TOKEN) {
      return new Response("Forbidden", { status: 403 });
    }
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const out: Record<string, unknown> = {};
    for (const t of getTenants()) {
      const res = await fetch(
        `https://graph.facebook.com/${GRAPH_VERSION}/${t.phoneNumberId}?fields=health_status,status,quality_rating,verified_name,display_phone_number,name_status,code_verification_status,account_mode,throughput`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      out[t.businessId] = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    }
    return NextResponse.json(out);
  }

  if (!mode) return NextResponse.json({ ok: true, configured: isConfigured() });

  const expected = process.env.WHATSAPP_VERIFY_TOKEN;
  if (mode === "subscribe" && expected && params.get("hub.verify_token") === expected) {
    return new Response(params.get("hub.challenge") ?? "", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  }
  return new Response("Forbidden", { status: 403 });
}

function validSignature(raw: string, header: string | null): boolean {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret || !header?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(raw, "utf8").digest();
  const given = Buffer.from(header.slice(7), "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (!validSignature(raw, request.headers.get("x-hub-signature-256"))) {
    console.warn("WhatsApp: rejected webhook with missing or invalid signature");
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(raw) as WebhookPayload;
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  // Acknowledge immediately. Meta retries (and duplicates) slow or failed deliveries.
  after(async () => {
    try {
      await processWebhook(payload);
    } catch (error) {
      console.error("WhatsApp: webhook processing failed:", error);
    }
  });
  return new Response("ok", { status: 200 });
}
