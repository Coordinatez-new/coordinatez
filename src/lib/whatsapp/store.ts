// Server-only. Conversation memory in a PRIVATE Vercel Blob store, one JSON
// document per (business, customer). Writes use ETag compare-and-swap so two
// webhook invocations for the same customer cannot silently overwrite each other.
import { get, put, list } from "@vercel/blob";
import type { BusinessId } from "./config";

export type Turn = {
  role: "user" | "assistant" | "human";
  text: string;
  at: string;
  wamid?: string;
};

// Free-form qualification fields (name, company, role, material, grade, quantity, ...).
export type Lead = Record<string, string>;

export type Conversation = {
  businessId: BusinessId;
  waId: string;
  profileName?: string;
  handoff: "ai" | "human";
  escalation?: { reason: string; at: string };
  pinned?: { at: string; reason: string };
  leadRef?: string; // e.g. CZ-SM-0023 from the email click-to-chat link
  qualifiedAt?: string; // trade: material + quantity + location collected, owner alerted
  optedOut?: boolean;
  lead: Lead;
  turns: Turn[];
  seen: string[]; // recent inbound wamids, for webhook de-duplication
  lastInboundAt?: string;
  updatedAt: string;
};

const MAX_TURNS = 60;
const MAX_SEEN = 100;

function key(businessId: BusinessId, waId: string) {
  if (!/^\d{6,20}$/.test(waId)) throw new Error("invalid wa_id");
  return `whatsapp/${businessId}/${waId}.json`;
}

function fresh(businessId: BusinessId, waId: string): Conversation {
  return { businessId, waId, handoff: "ai", lead: {}, turns: [], seen: [], updatedAt: new Date().toISOString() };
}

async function read(pathname: string): Promise<{ convo: Conversation | null; etag?: string }> {
  const res = await get(pathname, { access: "private", useCache: false });
  if (!res || res.statusCode !== 200) return { convo: null };
  const text = await new Response(res.stream).text();
  // Larger (compressed) blobs come back with a weak ETag (W/"..."), which ifMatch
  // rejects every time. The strong form of the same tag is accepted.
  return { convo: JSON.parse(text) as Conversation, etag: res.blob.etag.replace(/^W\//, "") };
}

export async function loadConversation(businessId: BusinessId, waId: string): Promise<Conversation> {
  const { convo } = await read(key(businessId, waId));
  return convo ?? fresh(businessId, waId);
}

// Read-modify-write with optimistic concurrency. The mutator returns false to
// abort without writing (e.g. duplicate webhook).
export async function updateConversation(
  businessId: BusinessId,
  waId: string,
  mutate: (c: Conversation) => boolean | void
): Promise<Conversation | null> {
  const pathname = key(businessId, waId);
  for (let attempt = 0; attempt < 6; attempt++) {
    const { convo, etag } = await read(pathname);
    const c = convo ?? fresh(businessId, waId);
    if (mutate(c) === false) return null;
    c.turns = c.turns.slice(-MAX_TURNS);
    c.seen = c.seen.slice(-MAX_SEEN);
    c.updatedAt = new Date().toISOString();
    try {
      await put(pathname, JSON.stringify(c), {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        ...(etag ? { ifMatch: etag } : { allowOverwrite: false }),
      });
      return c;
    } catch (error) {
      if (attempt === 5) throw error;
      await new Promise((r) => setTimeout(r, 150 * (attempt + 1)));
    }
  }
  return null;
}

export async function listConversations(businessId: BusinessId): Promise<string[]> {
  const out: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: `whatsapp/${businessId}/`, cursor, limit: 1000 });
    for (const b of page.blobs) {
      const m = b.pathname.match(/\/(\d+)\.json$/);
      if (m) out.push(m[1]);
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out;
}
