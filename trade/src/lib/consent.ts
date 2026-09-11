"use client";

import { useSyncExternalStore } from "react";

// Single source of truth for the visitor's cookie choice. The privacy policy promises
// that NO analytics or advertising tag loads until the visitor accepts — AnalyticsScripts
// enforces that promise by reading this store, and the consent banner writes to it.
export const CONSENT_STORAGE_KEY = "coordinatez-cookie-consent";
const CONSENT_CHANGE_EVENT = "coordinatez:consent-change";
export const CONSENT_OPEN_EVENT = "coordinatez:consent-open";

export type ConsentChoice = "accepted" | "declined";

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "accepted" || stored === "declined" ? stored : null;
  } catch {
    // Storage can throw in private modes or when site data is blocked — treat as undecided.
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Non-fatal: the choice still applies for this page view via the event below.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }));
}

// Global Privacy Control — a browser-level opt-out signal. The privacy policy says we
// honor it, so a visitor sending GPC is treated as having declined without being asked.
export function hasGlobalPrivacyControl(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

// Lets the footer's "Cookie preferences" link reopen the banner so a choice can be changed.
export function openConsentBanner() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  // Keep other tabs of the Site in sync with a choice made here.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Server snapshot is null (undecided), so nothing consent-gated is ever server-rendered.
export function useConsent(): ConsentChoice | null {
  return useSyncExternalStore(subscribe, readConsent, () => null);
}
