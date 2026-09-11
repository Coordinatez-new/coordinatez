"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CONSENT_OPEN_EVENT,
  hasGlobalPrivacyControl,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // localStorage and the GPC signal don't exist during SSR, so this decision can only be
    // made post-mount — an effect is the correct (not just convenient) tool here. A visitor
    // sending Global Privacy Control has already opted out, so we honor it silently instead
    // of asking; AnalyticsScripts keeps every non-essential tag off either way.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent() && !hasGlobalPrivacyControl()) setVisible(true);

    // The footer's "Cookie preferences" link reopens the banner so a choice can be changed.
    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  function respond(value: ConsentChoice) {
    writeConsent(value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border bg-background/95 p-5 shadow-2xl backdrop-blur sm:inset-x-auto sm:right-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="text-sm text-muted-foreground">
            We use cookies that are necessary to run this site, and — only if you accept —
            analytics and advertising cookies from Google, Meta, LinkedIn, and Microsoft that
            help us measure how the site and our campaigns perform. Decline and none of them
            load. See our{" "}
            <Link
              href="/privacy-policy#cookies"
              className="text-primary underline underline-offset-4"
            >
              Privacy Policy
            </Link>{" "}
            for the details.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => respond("declined")}>
              Decline
            </Button>
            <Button size="sm" onClick={() => respond("accepted")}>
              Accept
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
