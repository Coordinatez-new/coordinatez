// Server-only. Tenant registry for the WhatsApp agent.
//
// Every inbound webhook carries metadata.phone_number_id. That id — and nothing
// else — decides which business, prompt, and conversation store handle the
// message. An id that is not registered here is ignored, so a number added in
// WhatsApp Manager can never be answered by the wrong business by accident.
//
// Only the USA IT business (Coordinatez) is live today. The scrap-trade and
// India IT agents plug in here later with their own knowledge and prompts.

export type BusinessId = "usa_it";

export type Tenant = {
  businessId: BusinessId;
  displayName: string;
  phoneNumberId: string;
  timezone: string;
};

export const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v24.0";

export function getTenants(): Tenant[] {
  const tenants: Tenant[] = [];
  const usaIt = process.env.WHATSAPP_USA_IT_PHONE_NUMBER_ID?.trim();
  if (usaIt) {
    tenants.push({
      businessId: "usa_it",
      displayName: "Coordinatez",
      phoneNumberId: usaIt,
      timezone: "America/Chicago",
    });
  }
  return tenants;
}

export function tenantForPhoneNumberId(phoneNumberId: string | undefined): Tenant | null {
  if (!phoneNumberId) return null;
  return getTenants().find((t) => t.phoneNumberId === phoneNumberId) ?? null;
}

// Staff numbers (digits only, country code first, e.g. 13125550123) that may
// run handoff commands and receive escalation alerts.
export function ownerNumbers(): string[] {
  return (process.env.WHATSAPP_OWNER_NUMBERS || "")
    .split(",")
    .map((n) => n.replace(/\D/g, ""))
    .filter((n) => n.length >= 8);
}

export function isConfigured() {
  return {
    verifyToken: Boolean(process.env.WHATSAPP_VERIFY_TOKEN),
    appSecret: Boolean(process.env.WHATSAPP_APP_SECRET),
    accessToken: Boolean(process.env.WHATSAPP_ACCESS_TOKEN),
    usaItPhoneNumberId: Boolean(process.env.WHATSAPP_USA_IT_PHONE_NUMBER_ID),
    ownerNumbers: ownerNumbers().length,
    gemini: Boolean(process.env.GEMINI_API_KEY),
    blob: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  };
}
