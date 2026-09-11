"use client";

import { openConsentBanner } from "@/lib/consent";

// Sits beside the legal links in the footer. The privacy policy tells visitors they can
// change or withdraw consent at any time — this is that control.
export function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentBanner} className={className}>
      Cookie preferences
    </button>
  );
}
