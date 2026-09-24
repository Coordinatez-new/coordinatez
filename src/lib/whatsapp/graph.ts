// Server-only. Minimal WhatsApp Cloud API client (plain Graph API HTTPS calls;
// Meta's official Node SDK is archived).
import { GRAPH_VERSION } from "./config";

export class GraphError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: number
  ) {
    super(message);
  }
}

async function graphPost(path: string, body: unknown): Promise<unknown> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!token) throw new GraphError("WHATSAPP_ACCESS_TOKEN is not set", 500);
  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${path}`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => ({}))) as {
    error?: { message?: string; code?: number };
  };
  if (!res.ok) {
    throw new GraphError(json.error?.message || `Graph API ${res.status}`, res.status, json.error?.code);
  }
  return json;
}

export async function sendText(phoneNumberId: string, to: string, body: string): Promise<string | null> {
  const json = (await graphPost(`${phoneNumberId}/messages`, {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: { preview_url: true, body: body.slice(0, 4096) },
  })) as { messages?: { id?: string }[] };
  return json.messages?.[0]?.id ?? null;
}

// Marks the inbound message read and shows "typing…" until we reply (or 25 s).
export async function markReadWithTyping(phoneNumberId: string, messageId: string): Promise<void> {
  try {
    await graphPost(`${phoneNumberId}/messages`, {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
      typing_indicator: { type: "text" },
    });
  } catch (error) {
    console.warn("WhatsApp: mark-read failed:", (error as Error).message);
  }
}
