import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chat-knowledge";
import { getClientKey, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Google Gemini (free tier). Get a key at https://aistudio.google.com/apikey
// "gemini-flash-latest" is an alias Google keeps pointed at the current free
// Flash model, so it won't go stale the way a pinned version can.
const MODEL = process.env.CHAT_MODEL || "gemini-flash-latest";
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 4000;
const MAX_TOTAL_CHARS = 16000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function sanitize(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;
  const cleaned: ChatMessage[] = [];
  for (const m of input) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") continue;
    const text = content.trim().slice(0, MAX_CHARS_PER_MESSAGE);
    if (text) cleaned.push({ role, content: text });
  }
  if (cleaned.length === 0) return null;
  const trimmed = cleaned.slice(-MAX_MESSAGES);
  if (trimmed[trimmed.length - 1].role !== "user") return null;
  while (
    trimmed.length > 1 &&
    trimmed.reduce((n, m) => n + m.content.length, 0) > MAX_TOTAL_CHARS
  ) {
    trimmed.shift();
  }
  // Gemini requires the conversation to start with a user turn — drop the
  // leading assistant welcome message the widget sends for context.
  while (trimmed.length > 1 && trimmed[0].role === "assistant") trimmed.shift();
  return trimmed;
}

const FRIENDLY_ERROR =
  "Sorry, I'm having trouble responding right now. Please try again in a moment or contact our team directly at support@coordinatez.com.";

export async function POST(request: Request) {
  if (isRateLimited(`chat:${getClientKey(request)}`, 40, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many messages. Please pause for a moment and try again." },
      { status: 429 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Chat: GEMINI_API_KEY is not configured.");
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const messages = sanitize((body as { messages?: unknown })?.messages);
  if (!messages) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  let upstream: Response;
  try {
    upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`,
      {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            // gemini-flash-latest resolves to a "thinking" model whose hidden
            // reasoning counts against maxOutputTokens — with a small budget it
            // spends everything thinking and streams little or no visible text.
            // Some versions ignore thinkingBudget:0, so the ceiling must leave
            // real headroom either way. Replies stay short by prompt instruction;
            // the cap is a safety ceiling, not a target.
            maxOutputTokens: 4096,
            temperature: 0.4,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );
  } catch (error) {
    console.error("Chat: upstream request failed:", error);
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error(`Chat: upstream returned ${upstream.status}: ${detail.slice(0, 500)}`);
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 });
  }

  // Transform Gemini's SSE stream into a plain UTF-8 text stream of the reply.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  type GeminiChunk = {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const event = JSON.parse(data) as GeminiChunk;
              const parts = event.candidates?.[0]?.content?.parts;
              if (parts) {
                for (const p of parts) {
                  if (p.text) controller.enqueue(encoder.encode(p.text));
                }
              }
            } catch {
              // ignore keep-alive / non-JSON lines
            }
          }
        }
      } catch (error) {
        console.error("Chat: stream error:", error);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-accel-buffering": "no",
    },
  });
}
