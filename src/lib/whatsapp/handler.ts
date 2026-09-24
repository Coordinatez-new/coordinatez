// Server-only. Processes verified WhatsApp webhook payloads.
import { ownerNumbers, tenantForPhoneNumberId, type Tenant } from "./config";
import { markReadWithTyping, sendText, GraphError } from "./graph";
import { loadConversation, updateConversation, listConversations, type Conversation } from "./store";
import { generateReply, FALLBACK_REPLY, type AgentResult } from "./agent";

type WaMessage = {
  from: string;
  id: string;
  type: string;
  text?: { body?: string };
  interactive?: { button_reply?: { title?: string }; list_reply?: { title?: string } };
  button?: { text?: string };
  image?: { caption?: string };
  video?: { caption?: string };
  document?: { caption?: string; filename?: string };
  location?: { latitude?: number; longitude?: number; name?: string; address?: string };
};

type WaValue = {
  metadata?: { phone_number_id?: string };
  contacts?: { wa_id?: string; profile?: { name?: string } }[];
  messages?: WaMessage[];
  statuses?: {
    id?: string;
    status?: string;
    recipient_id?: string;
    errors?: { code?: number; title?: string }[];
  }[];
};

export type WebhookPayload = {
  object?: string;
  entry?: { id?: string; changes?: { field?: string; value?: WaValue }[] }[];
};

const STOP = /^\s*(stop|unsubscribe|opt ?out|do not (message|contact) me)\s*[.!]?\s*$/i;
const START = /^\s*(start|unstop|subscribe)\s*$/i;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function extractText(m: WaMessage): string | null {
  switch (m.type) {
    case "text":
      return m.text?.body?.trim() || null;
    case "interactive":
      return m.interactive?.button_reply?.title || m.interactive?.list_reply?.title || null;
    case "button":
      return m.button?.text || null;
    case "image":
      return m.image?.caption ? `[image] ${m.image.caption}` : "[The customer sent an image]";
    case "video":
      return m.video?.caption ? `[video] ${m.video.caption}` : "[The customer sent a video]";
    case "document":
      return `[The customer sent a document${m.document?.filename ? `: ${m.document.filename}` : ""}]${
        m.document?.caption ? ` ${m.document.caption}` : ""
      }`;
    case "audio":
      return "[The customer sent a voice note. You cannot listen to audio yet. Politely ask them to type their question.]";
    case "location":
      return `[The customer shared a location: ${m.location?.name || ""} ${m.location?.address || ""} (${m.location?.latitude}, ${m.location?.longitude})]`;
    case "contacts":
      return "[The customer shared a contact card]";
    case "reaction":
    case "system":
    case "request_welcome":
      return null; // never auto-reply to these
    default:
      return "[The customer sent a message type that cannot be read here]";
  }
}

async function safeSend(tenant: Tenant, to: string, text: string): Promise<string | null> {
  try {
    return await sendText(tenant.phoneNumberId, to, text);
  } catch (error) {
    const e = error as GraphError;
    console.error(`WhatsApp: send to ${to.slice(0, 4)}... failed (${e.code ?? e.status}): ${e.message}`);
    return null;
  }
}

async function notifyOwners(tenant: Tenant, text: string) {
  for (const owner of ownerNumbers()) await safeSend(tenant, owner, text);
}

function label(c: Conversation) {
  return `${c.profileName || "Unknown"} (+${c.waId})`;
}

// ---- Staff commands (only from WHATSAPP_OWNER_NUMBERS, only when starting with "#") ----

const HELP = [
  "*Coordinatez agent: staff commands*",
  "#status : conversations waiting for a human",
  "#reply <number> <message> : reply as the team (pauses AI for them)",
  "#takeover <number> : pause AI for that customer",
  "#ai <number> : hand the customer back to the AI",
  "Messages without # are treated as a normal customer chat, so you can test the agent.",
].join("\n");

async function handleOwnerCommand(tenant: Tenant, owner: string, text: string) {
  const [cmdRaw, rawNumber, ...rest] = text.trim().split(/\s+/);
  const cmd = cmdRaw.toLowerCase();
  const number = (rawNumber || "").replace(/\D/g, "");
  const reply = (t: string) => safeSend(tenant, owner, t);

  if (cmd === "#status") {
    const ids = (await listConversations(tenant.businessId)).slice(0, 50);
    const waiting: string[] = [];
    for (const id of ids) {
      const c = await loadConversation(tenant.businessId, id);
      if (c.handoff !== "human") continue;
      const last = [...c.turns].reverse().find((t) => t.role === "user");
      waiting.push(
        `- ${label(c)}: ${c.escalation?.reason || "human mode"} | last: "${(last?.text || "").slice(0, 80)}"`
      );
    }
    await reply(
      waiting.length
        ? `*Waiting for a human (${waiting.length})*\n${waiting.join("\n")}`
        : "No conversations are waiting for a human."
    );
    return;
  }

  if (cmd === "#reply") {
    const body = rest.join(" ").trim();
    if (!number || !body) {
      await reply("Usage: #reply <number> <message>");
      return;
    }
    const wamid = await safeSend(tenant, number, body);
    if (!wamid) {
      await reply(
        `Could not send to +${number}. If they have not messaged in the last 24 hours, WhatsApp only allows approved templates.`
      );
      return;
    }
    await updateConversation(tenant.businessId, number, (c) => {
      c.turns.push({ role: "human", text: body, at: new Date().toISOString(), wamid });
      c.handoff = "human";
    });
    await reply(`Sent to +${number}. AI is paused for them. Send "#ai ${number}" to hand back.`);
    return;
  }

  if (cmd === "#takeover" || cmd === "#ai") {
    if (!number) {
      await reply(`Usage: ${cmd} <number>`);
      return;
    }
    await updateConversation(tenant.businessId, number, (c) => {
      c.handoff = cmd === "#ai" ? "ai" : "human";
      if (c.handoff === "ai") delete c.escalation;
    });
    await reply(
      cmd === "#ai"
        ? `AI is handling +${number} again.`
        : `AI paused for +${number}. Reply with #reply ${number} <message>.`
    );
    return;
  }

  await reply(HELP);
}

// ---- Customer messages ----

async function handleInbound(tenant: Tenant, m: WaMessage, profileName?: string) {
  const from = (m.from || "").replace(/\D/g, "");
  const text = extractText(m);
  if (!from || !text) return;

  if (text.startsWith("#") && ownerNumbers().includes(from)) {
    await handleOwnerCommand(tenant, from, text);
    return;
  }

  const now = new Date().toISOString();
  const convo = await updateConversation(tenant.businessId, from, (c) => {
    if (c.seen.includes(m.id)) return false; // duplicate delivery from Meta
    c.seen.push(m.id);
    if (profileName) c.profileName = profileName;
    c.lastInboundAt = now;
    c.turns.push({ role: "user", text, at: now, wamid: m.id });
  });
  if (!convo) return;

  await markReadWithTyping(tenant.phoneNumberId, m.id);

  if (STOP.test(text)) {
    await updateConversation(tenant.businessId, from, (c) => {
      c.optedOut = true;
    });
    await safeSend(
      tenant,
      from,
      "You're unsubscribed. Coordinatez won't send you further WhatsApp messages. Reply START anytime to reconnect."
    );
    return;
  }
  if (START.test(text) && convo.optedOut) {
    await updateConversation(tenant.businessId, from, (c) => {
      c.optedOut = false;
    });
    await safeSend(tenant, from, "Welcome back! How can Coordinatez help you today?");
    return;
  }
  if (convo.optedOut) return;

  if (convo.handoff === "human") {
    await notifyOwners(
      tenant,
      `💬 ${label(convo)} (AI paused):\n${text.slice(0, 900)}\n\nReply: #reply ${from} <message>`
    );
    return;
  }

  // Debounce bursts: if the customer sends several messages quickly, only the
  // invocation for the newest one answers, with all of them in context.
  await sleep(2500);
  const latest = await loadConversation(tenant.businessId, from);
  const lastUser = [...latest.turns].reverse().find((t) => t.role === "user");
  if (lastUser?.wamid !== m.id || latest.handoff === "human") return;

  let result: AgentResult;
  try {
    result = await generateReply(tenant, latest);
  } catch (error) {
    console.error("WhatsApp: AI generation failed:", (error as Error).message);
    result = {
      reply: FALLBACK_REPLY,
      escalate: true,
      escalationReason: "AI error, needs a human reply",
      lead: {},
    };
  }

  const wamid = await safeSend(tenant, from, result.reply);
  const saved = await updateConversation(tenant.businessId, from, (c) => {
    c.turns.push({
      role: "assistant",
      text: result.reply,
      at: new Date().toISOString(),
      wamid: wamid ?? undefined,
    });
    for (const [k, v] of Object.entries(result.lead)) {
      if (typeof v === "string" && v.trim()) {
        (c.lead as Record<string, string>)[k] = v.trim().slice(0, 200);
      }
    }
    if (result.escalate && c.handoff === "ai") {
      c.handoff = "human";
      c.escalation = {
        reason: result.escalationReason || "Escalated by AI",
        at: new Date().toISOString(),
      };
    }
  });

  if (result.escalate && saved) {
    const lead = Object.entries(saved.lead)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ");
    await notifyOwners(
      tenant,
      [
        `🔔 *Escalation: ${tenant.displayName}*`,
        `From: ${label(saved)}`,
        `Reason: ${saved.escalation?.reason || result.escalationReason}`,
        `Customer said: "${text.slice(0, 500)}"`,
        lead ? `Lead: ${lead}` : "",
        "AI is paused for them.",
        `Reply: #reply ${from} <message>  |  Hand back: #ai ${from}`,
      ]
        .filter(Boolean)
        .join("\n")
    );
  }
}

export async function processWebhook(payload: WebhookPayload) {
  if (payload.object !== "whatsapp_business_account") return;
  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "messages" || !change.value) {
        console.log(`WhatsApp: webhook field "${change.field}" received`);
        continue;
      }
      const value = change.value;
      const tenant = tenantForPhoneNumberId(value.metadata?.phone_number_id);
      if (!tenant) {
        console.warn(
          `WhatsApp: ignoring event for unregistered phone_number_id ${value.metadata?.phone_number_id}`
        );
        continue;
      }
      for (const s of value.statuses ?? []) {
        if (s.status === "failed") {
          console.error(`WhatsApp: message ${s.id} failed: ${JSON.stringify(s.errors ?? [])}`);
        }
      }
      const names = new Map((value.contacts ?? []).map((c) => [c.wa_id, c.profile?.name]));
      for (const m of value.messages ?? []) {
        try {
          await handleInbound(tenant, m, names.get(m.from));
        } catch (error) {
          console.error("WhatsApp: failed to handle message:", error);
        }
      }
    }
  }
}
