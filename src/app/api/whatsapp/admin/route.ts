import { NextResponse } from "next/server";
import { GRAPH_VERSION } from "@/lib/whatsapp/config";
import { getAccessToken } from "@/lib/whatsapp/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Staff-only WhatsApp number management through the Graph API, for when the
// dashboards cannot be used (e.g. the login is not a full business admin).
// Auth: header x-wa-key = WHATSAPP_VERIFY_TOKEN. Verification codes and PINs are
// passed through to Meta and never logged or echoed back.
const DEFAULT_WABA = () => process.env.WHATSAPP_WABA_ID || "2169424076954705";
const digits = (v: unknown) => (typeof v === "string" ? v.replace(/\D/g, "") : "");

async function graph(method: "GET" | "POST", path: string, body?: Record<string, string>) {
  const token = await getAccessToken();
  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${path}`, {
    method,
    headers: { authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({ error: { message: `HTTP ${res.status}` } }));
  return { status: res.status, json };
}

export async function POST(request: Request) {
  const key = request.headers.get("x-wa-key");
  if (!process.env.WHATSAPP_VERIFY_TOKEN || key !== process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response("Forbidden", { status: 403 });
  }
  const b = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const waba = digits(b.waba) || DEFAULT_WABA();
  const id = digits(b.phone_number_id);

  let r: { status: number; json: unknown };
  switch (b.action) {
    case "list_numbers":
      r = await graph(
        "GET",
        `${waba}/phone_numbers?fields=id,display_phone_number,verified_name,status,code_verification_status,name_status,quality_rating,platform_type`
      );
      break;
    case "add_number": {
      const cc = digits(b.cc);
      const phone = digits(b.phone_number);
      const name = typeof b.verified_name === "string" ? b.verified_name.trim().slice(0, 100) : "";
      if (!cc || !phone || !name) return NextResponse.json({ error: "cc, phone_number, verified_name required" }, { status: 400 });
      r = await graph("POST", `${waba}/phone_numbers`, { cc, phone_number: phone, verified_name: name });
      break;
    }
    case "request_code": {
      const method = b.method === "VOICE" ? "VOICE" : "SMS";
      if (!id) return NextResponse.json({ error: "phone_number_id required" }, { status: 400 });
      r = await graph("POST", `${id}/request_code`, { code_method: method, language: "en_US" });
      break;
    }
    case "verify_code": {
      const code = digits(b.code);
      if (!id || !code) return NextResponse.json({ error: "phone_number_id and code required" }, { status: 400 });
      r = await graph("POST", `${id}/verify_code`, { code });
      break;
    }
    case "register": {
      const pin = digits(b.pin);
      if (!id || pin.length !== 6) return NextResponse.json({ error: "phone_number_id and 6-digit pin required" }, { status: 400 });
      r = await graph("POST", `${id}/register`, { messaging_product: "whatsapp", pin });
      break;
    }
    case "subscribe_waba":
      r = await graph("POST", `${waba}/subscribed_apps`);
      break;
    default:
      return NextResponse.json({ error: "unknown action" }, { status: 400 });
  }
  return NextResponse.json(r.json, { status: r.status >= 400 ? r.status : 200 });
}
