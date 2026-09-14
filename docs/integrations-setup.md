# Coorbitz — External Services Setup Guide

_Last updated: 2026-07-18._

Reference documentation for connecting Coorbitz (`coorbitz.com`, currently a placeholder/
not-yet-live domain) to the external services used for security, analytics, marketing, and
monitoring. Written for a non-technical to semi-technical site owner. All app-side environment
variables below are read from `.env.local` in the Next.js project; anything the browser needs
must be prefixed `NEXT_PUBLIC_` (see `.env.example` for the full, current list).

---

## 1. Cloudflare (reverse proxy / WAF in front of Vercel)

Cloudflare sits in front of your Vercel-hosted site as a DNS-level proxy, giving you a WAF,
DDoS protection, and caching without changing your app.

**Setup steps**

1. Create a free Cloudflare account at cloudflare.com and click "Add a site." Enter
   `coorbitz.com`.
2. Cloudflare scans your existing DNS records and imports them. Review the imported records
   for accuracy (A/CNAME records pointing at Vercel, MX records for email, etc.) before
   continuing.
3. Cloudflare gives you two nameservers (e.g., `xxx.ns.cloudflare.com`). Log in to your domain
   registrar and replace the existing nameservers with these. Propagation can take anywhere
   from minutes to ~24 hours.
4. Once Cloudflare detects the nameserver change, the site becomes "Active." In DNS settings,
   make sure the records pointing to Vercel (typically a CNAME to `cname.vercel-dns.com` for
   the root/`www`, or the Vercel-provided A record) have the **proxy status set to "Proxied"
   (orange cloud)**, not "DNS only" (grey cloud). Proxied is what enables the WAF/CDN features
   below.
5. Go to the **SSL/TLS** section of the dashboard and set the encryption mode to **Full
   (strict)**. This requires Vercel's origin to present a valid certificate, which it does
   automatically — this avoids redirect loops and keeps the origin connection encrypted, not
   just the visitor-facing side.
6. In the SSL/TLS section (commonly under an "Edge Certificates" tab), turn on **Always Use
   HTTPS** so any plain HTTP request is redirected to HTTPS.
7. In the **Speed** section, enable **HTTP/3 (with QUIC)** and **Brotli** compression if not
   already on by default — both are available on the free plan and improve load performance
   (see `docs/performance-report.md`).
8. In the **Security** section, confirm the **WAF managed rules** (Cloudflare's free/core
   managed ruleset) are enabled — free-plan accounts get a baseline managed ruleset
   automatically; review and leave it in "block"/default mode unless you see false positives.
9. In the same Security area, enable **Bot Fight Mode**. This is available on the Free plan.
   **Super Bot Fight Mode** (finer-grained bot categories and allow-listing) requires the Pro
   plan or higher; the free plan only exposes the single Bot Fight Mode toggle.
10. **Rate limiting rules**: custom rate-limiting rules (e.g., "block an IP after N requests to
    `/api/careers` in 60 seconds") require a paid plan (Pro and above include a limited
    allotment; higher volume needs Business/Enterprise). The Free plan does not include custom
    rate limiting rules — you get Cloudflare's automatic, non-configurable DDoS mitigation
    only. The app's own in-memory rate limiting (`src/lib/rate-limit.ts`) is a free second line
    of defense either way — see `docs/security-audit.md`.
11. **DDoS protection** is unmetered and on by default for every plan, including Free — no
    action needed.
12. Verify everything by visiting `https://coorbitz.com` and confirming the padlock is valid,
    then check response headers (e.g., via browser dev tools) for a `cf-ray` header, which
    confirms traffic is passing through Cloudflare.

**Where this plugs into the codebase:** Nothing in the Next.js app changes — Cloudflare sits
entirely at the DNS/network layer. No env vars needed for this integration.

---

## 2. Cloudflare Turnstile (form bot protection)

This project already has Turnstile wired end-to-end in code
(`src/components/shared/turnstile-widget.tsx`, `src/lib/turnstile.ts`) — both the Contact and
Careers forms work exactly as they do today if you skip this section; Turnstile only activates
once both keys below are set.

1. In the Cloudflare dashboard, go to **Turnstile** → **Add Site**. Name it "Coorbitz," enter
   the domain (`coorbitz.com` — add `localhost` too if you want to test locally), and choose
   the **Managed** widget mode (Cloudflare picks the least-intrusive challenge automatically).
2. Cloudflare issues a **Site Key** (public) and a **Secret Key** (private, server-only).
3. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (the site key) and `TURNSTILE_SECRET_KEY` (the secret
   key) in your environment.
4. The Careers form (`/api/careers`) verifies the token server-side automatically once
   `TURNSTILE_SECRET_KEY` is set — no further code change needed.
5. The Contact form posts straight to Formspree, so Formspree itself must also be told to
   verify Turnstile: in the Formspree dashboard, open the form → **Settings** → **Spam
   Protection**, and enable/connect Cloudflare Turnstile there, entering the same secret key.
   Without this step, the token is sent but not checked on Formspree's side.
6. Test both forms after deploying: the widget should render as a small "Verify you are human"
   checkbox/challenge before the submit button.

**Where this plugs into the codebase:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client),
`TURNSTILE_SECRET_KEY` (server-only, never exposed to the browser).

---

## 3. Google Analytics 4 (GA4) & Google Ads conversion tracking

1. Go to analytics.google.com and sign in with a Google account dedicated to the business if
   possible (not a personal one).
2. Click **Admin** (gear icon) → **Create Property**. Name it "Coorbitz" or "Coorbitz —
   coorbitz.com", set the correct reporting time zone (Chicago = America/Chicago) and currency
   (USD).
3. Fill in basic business details (industry category, business size) when prompted — this only
   affects Google's benchmarking, not tracking.
4. Under **Data Streams**, add a **Web** stream and enter `https://coorbitz.com`.
5. GA4 generates a **Measurement ID** in the format `G-XXXXXXXXXX`. Copy it from the stream
   details page.
6. Verify tracking is live by installing the ID in the site (see below), deploying, then
   checking **Reports → Realtime** in GA4 while browsing the live site — you should see
   yourself as an active user within a minute or two.
7. **Google Ads conversion tracking** (optional, only if running paid ads): in
   ads.google.com → **Tools & Settings → Conversions**, create a new conversion action, and
   Google Ads issues a **Conversion ID** in the format `AW-XXXXXXXXX`. This project's
   `AnalyticsScripts` component loads the shared `gtag.js` once for either or both of GA4 and
   Google Ads — set whichever IDs you have.

**Where this plugs into the codebase:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` (GA4) and/or
`NEXT_PUBLIC_GOOGLE_ADS_ID` (Google Ads), both in `.env.local`.

---

## 4. Google Search Console (GSC)

1. Go to search.google.com/search-console and add a property. Choose **Domain** property type
   (covers all subdomains and protocols) over **URL-prefix** if you can complete DNS
   verification — it's the more complete option.
2. **DNS TXT record method** (recommended for the Domain property type): Google gives you a
   TXT record value; add it as a new TXT record at your DNS provider (Cloudflare, in this
   case) for the root domain, then click Verify in GSC. DNS propagation may take a few minutes
   to a few hours. **No code change needed for this method.**
3. **HTML meta tag method** (alternative, works with URL-prefix properties, and is already
   wired up in this codebase): Google gives you a verification string; set it as
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in your environment, and `src/app/layout.tsx` will
   render it as `<meta name="google-site-verification" content="...">` on every page
   automatically via the Next.js Metadata API — no manual HTML editing required, just set the
   env var and deploy.
4. Once verified (either method), go to **Sitemaps** in the left nav and submit `sitemap.xml`
   (i.e., `https://coorbitz.com/sitemap.xml`, generated by `src/app/sitemap.ts`) — confirm the
   file is reachable in a browser first.
5. To request indexing of an individual page (e.g., right after launch), use the **URL
   Inspection** tool, paste the full URL, and click **Request Indexing**. This does not
   guarantee immediate crawling but nudges Google to prioritize it.

**Where this plugs into the codebase:** DNS TXT method needs no env var. Meta-tag method uses
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, already wired in `src/app/layout.tsx`.

---

## 5. Google Business Profile (GBP)

Coorbitz is a B2B IT/AI services company with two locations: a Chicago HQ and a Gujarat,
India dev office. Neither is a walk-in storefront.

**Should both locations be listed?**
- A storefront listing (a full address shown publicly, pin on Maps) makes sense for a business
  that receives walk-in customers at that address during posted hours. That is generally not
  the case for either Coorbitz office.
- For an office that isn't open to the public, Google's guidelines call for either (a) a
  **service-area business (SAB)** listing — you hide the exact address and instead list the
  geographic areas/cities you serve (up to 20), or (b) if you do want the office address to
  appear (e.g., for local SEO / "near me" credibility), the address must be staffed during
  posted hours and have visible signage — a shared/virtual office or unstaffed suite does not
  qualify.
- Practical recommendation for a B2B services company like Coorbitz: create **one profile for
  the Chicago HQ** as the primary listing (service-area business if the office isn't staffed
  for visitors, or a normal address listing if it is a genuine staffed office), and treat
  the India operation as an internal delivery/dev center rather than a second public GBP
  listing. Running two separate GBP profiles for
  one company can trigger Google's duplicate-listing and quality-guideline issues unless the
  second location is clearly a distinct, independently reachable business location with its
  own signage and staff.
- A second listing for India is **out of scope while the public address is region-only**
  ("Gujarat, India"). GBP requires a specific, verifiable address or a defined service area,
  and the site deliberately no longer publishes a street address or locality for the India
  operation. If that is revisited — e.g., for hiring visibility in Gujarat — the address in
  `src/data/site.ts` has to be restored to a specific staffed location first, and the listing
  created as its own profile with either SAB or a genuinely staffed address, not a
  placeholder.

**Verification steps** (per location)
1. Create/claim the listing at business.google.com, enter the business name, category (e.g.,
   "Information Technology Company" or "Software Company"), and address (or service areas, for
   SAB).
2. Choose a verification method. Google offers, depending on the account and business type:
   **postcard** (mailed to the address, code entered online, ~5–14 days), **phone** (automated
   call/text with a code, when available), **email** (code sent to a business email on the
   domain), or **video verification** (a short walkthrough showing signage, business
   documents, equipment). Google decides which options are offered per listing; not all are
   always available.
3. Enter the code or complete the video call as instructed to verify.
4. After verification, complete the profile: hours, website URL, phone number, services
   offered, and a short business description.

**Where this plugs into the codebase:** No code integration — this is entirely managed in the
Google Business Profile dashboard, independent of the website. The `LocalBusiness` JSON-LD
already on the site (`src/lib/seo.ts`) reflects the same NAP data, but that's a content/SEO
decision, not an env var.

---

## 6. Bing Webmaster Tools

1. Go to bing.com/webmasters and sign in with a Microsoft account.
2. The easiest path: choose **Import from Google Search Console**. Authorize Bing to read your
   GSC data, select the coorbitz.com property, and click Import. Bing will auto-verify
   ownership and pull in sitemaps you've already submitted in GSC — no separate verification
   is needed.
3. If verifying independently, Bing offers the same style of options as GSC: an XML file
   upload, a DNS CNAME/TXT record, or a `<meta>` tag. **The meta-tag method is already wired up
   in this codebase**: set `NEXT_PUBLIC_BING_SITE_VERIFICATION` to the verification string Bing
   gives you, and `src/app/layout.tsx` renders it as `<meta name="msvalidate.01"
   content="...">` automatically — no manual HTML editing needed.
4. After the site appears in Bing Webmaster Tools, go to **Sitemaps** and confirm
   `sitemap.xml` was imported; if not, submit `https://coorbitz.com/sitemap.xml` manually.
5. Bing Webmaster Tools also surfaces crawl errors, backlink data, and (via its "IndexNow"
   feature) the option to push instant indexing pings — worth enabling if you want faster
   Bing/DuckDuckGo indexing of new pages.

**Where this plugs into the codebase:** Import/DNS methods need no env var. Meta-tag method
uses `NEXT_PUBLIC_BING_SITE_VERIFICATION`, already wired in `src/app/layout.tsx`.

---

## 7. Microsoft Clarity

1. Go to clarity.microsoft.com and sign in with a Microsoft account (or Google account —
   Clarity supports both).
2. Click **Add new project**, name it "Coorbitz," enter the website URL
   `https://coorbitz.com`, and select a category.
3. Clarity generates a **Project ID** (a short alphanumeric string) shown in **Settings →
   Setup** along with a tracking snippet.
4. After deploying with the ID wired in, return to the Clarity dashboard — session recordings
   and heatmaps typically appear within a few minutes to a few hours of real traffic.
5. Clarity is free with no traffic cap as of 2026, which makes it a reasonable low-cost
   complement to GA4 for qualitative behavior (heatmaps, session replay, rage-click detection).

**Where this plugs into the codebase:** set `NEXT_PUBLIC_CLARITY_ID` in `.env.local` to the
Clarity Project ID.

---

## 8. Google Tag Manager (GTM)

1. Go to tagmanager.google.com and click **Create Account**. Name the account "Coorbitz," set
   the country, and create a **Container** for "coorbitz.com" with target platform **Web**.
2. GTM issues a **Container ID** in the format `GTM-XXXXXXX` — this project loads it via the
   env var rather than pasting raw snippets.
3. Inside GTM, you can then manage GA4, Meta Pixel, LinkedIn Insight Tag, and other marketing
   tags centrally through tags/triggers/variables instead of hard-coding each one — this is
   optional; each service can also be wired directly via its own env var, and GTM can either
   replace or sit alongside those (running both GTM and a direct gtag.js include for the same
   GA4 property would double-count events, so pick one path per tag).
4. Use **Preview mode** in GTM (top-right "Preview" button) against `coorbitz.com` (or a Vercel
   preview URL) to confirm tags fire on the intended pages/events before publishing.
5. Click **Submit** → **Publish** to push the container live. Every subsequent tag change also
   needs a Submit/Publish to take effect — saving a tag alone doesn't deploy it.

**Where this plugs into the codebase:** set `NEXT_PUBLIC_GTM_ID` in `.env.local` to the
`GTM-XXXXXXX` container ID.

---

## 9. Meta Pixel

1. Go to Meta Events Manager (business.facebook.com/events_manager) inside a Meta Business
   Manager / Business Suite account. Create a Business Manager account first if Coorbitz
   doesn't have one, and add coorbitz.com as a business asset.
2. In Events Manager, click **Connect Data Sources → Web**, then **Get Started**, name the
   pixel/dataset "Coorbitz Website," and enter the URL.
3. Meta creates a **Pixel ID** — a 15–16 digit number — visible under **Data Sources** in
   Events Manager.
4. Use the **Test Events** tab in Events Manager (enter the live site URL) to confirm a
   PageView event registers in real time after the pixel is installed and deployed.
5. For better long-term reliability (browser tracking-prevention affects client-side pixels),
   Meta recommends pairing the browser pixel with the server-side **Conversions API**
   eventually — out of scope for initial setup, but worth flagging for a later phase.

**Where this plugs into the codebase:** set `NEXT_PUBLIC_META_PIXEL_ID` in `.env.local` to the
numeric Pixel ID.

---

## 10. LinkedIn Insight Tag

1. Go to LinkedIn Campaign Manager (business.linkedin.com/marketing-solutions/insight-tag) and
   sign in with an account tied to a LinkedIn Company Page for Coorbitz (create the Company
   Page first if it doesn't exist).
2. Under **Account Assets → Insight Tag**, create a new Insight Tag associated with your ad
   account. LinkedIn issues a **Partner ID** (a numeric ID) used in the tracking snippet.
3. Verify installation using LinkedIn's **Insight Tag Helper** browser extension, or check the
   Insight Tag status page in Campaign Manager, which reports "Active" once it detects the tag
   firing on the live site.
4. The Insight Tag also enables LinkedIn's website demographics/retargeting audiences even
   without running ads yet, so it's reasonable to install early.

**Where this plugs into the codebase:** set `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` in `.env.local`
to the numeric Partner ID.

---

## 11. Sentry (error monitoring)

1. Go to sentry.io and create an account/organization for Coorbitz. Create a new **Project**,
   choosing **Next.js** as the platform.
2. Sentry shows a **DSN** (Data Source Name — a URL-like key) for the project under
   **Settings → Projects → [project] → Client Keys (DSN)**.
3. **This codebase does not currently have the Sentry SDK installed.** To wire it up, a
   developer would run:
   ```
   npx @sentry/wizard@latest -i nextjs
   ```
   from the project root. The wizard prompts for the Sentry account/project, then scaffolds
   `instrumentation-client.ts` (browser init), `sentry.server.config.ts` (Node runtime),
   `sentry.edge.config.ts` (edge runtime), an `instrumentation.ts` file that registers the
   server/edge configs with Next.js's instrumentation hook, and wraps `next.config.ts` with
   `withSentryConfig` for source-map upload. It will also add the DSN to `.env.local`
   automatically.
4. After the wizard runs and the app is deployed, trigger a test error (Sentry's wizard offers
   to create a sample error page) and confirm it appears in the Sentry **Issues** dashboard.

**Where this plugs into the codebase:** once installed, the DSN is typically stored as
`NEXT_PUBLIC_SENTRY_DSN` (client-exposed) — the wizard will name the exact variable(s) during
setup; treat this as a future step, not something already wired in (see
`docs/future-improvements.md`).

---

## 12. LogRocket (session replay)

1. Go to app.logrocket.com and sign up. Create a new application named "Coorbitz."
2. LogRocket assigns an **App ID** in the `org-slug/app-slug` format (e.g.,
   `coorbitz/coorbitz-web`), shown on the setup/quickstart screen.
3. Integration note: install the package with `npm install logrocket`, then in a **client
   component** (LogRocket must run in the browser, not on the server) call
   `LogRocket.init('your-app-id')` once, ideally very early in the app's client bootstrap (e.g.,
   a small client component mounted near the root layout).
4. LogRocket records session replays, console logs, and network requests for real users;
   verify by browsing the live site yourself and checking the **Sessions** list in the
   dashboard shortly after.
5. Because it captures full session replay (including form interactions), review LogRocket's
   data-scrubbing/privacy settings (masking inputs, redacting text) before going live, and
   mention its use in the Privacy Policy page.

**Where this plugs into the codebase:** set `NEXT_PUBLIC_LOGROCKET_APP_ID` (suggested name;
not yet present in this project) in `.env.local` to the `org/app` slug, and initialize it
inside a client component such as an analytics/providers wrapper.

---

## 13. UptimeRobot

1. Sign up free at uptimerobot.com.
2. Click **+ Add New Monitor**, choose **HTTP(s)**, set the friendly name ("Coorbitz
   Production"), and enter `https://coorbitz.com`. The free plan supports a 5-minute check
   interval and up to 50 monitors.
3. Under **Alert Contacts**, add an email address (and optionally SMS/Slack/webhook — free plan
   includes a limited number of the available integrations) so the right people are notified
   on downtime.
4. Free-plan status pages are limited to one; if you want a public status page, you can enable
   it from the monitor settings, or use a dedicated tool (see Better Stack below) for a nicer
   public page.
5. As of 2026, UptimeRobot's own terms of service state the service, including its free plan,
   is available for commercial and business use — but terms can change, so it's worth a quick
   re-check of the current ToS before relying on the free tier long-term for a production
   business site.

**Where this plugs into the codebase:** No env var — monitoring is configured entirely in the
UptimeRobot dashboard against the public production URL.

---

## 14. Better Stack (formerly Better Uptime)

1. Sign up at betterstack.com and create an **Uptime** monitor for `https://coorbitz.com`.
2. The free tier includes around 10 monitors and 10 heartbeats with 3-minute check intervals,
   plus a basic status page.
3. Better Stack combines uptime monitoring with incident management/on-call escalation and log
   management in one platform, whereas UptimeRobot is a narrower, simpler uptime-only tool.
4. **When to pick which:** choose **UptimeRobot** if you just want a large number of simple
   up/down checks for free with no plan to pay; choose **Better Stack** if you want a more
   polished public status page, on-call/escalation policies, or plan to eventually consolidate
   logs and incident response in one place — its free tier has fewer monitors, but the paid
   tiers unlock considerably more operational tooling than UptimeRobot's paid tiers do.
5. Either tool (or both) can be run simultaneously without conflict, since they just poll the
   public URL independently.

**Where this plugs into the codebase:** No env var — configured entirely in the Better Stack
dashboard against the public production URL.

---

## 15. Google PageSpeed Insights

Not a service to "set up" — it's a free tool at **pagespeed.web.dev**. Enter the production URL
(`https://coorbitz.com`) once the site is live to get a Lighthouse-based performance,
accessibility, best-practices, and SEO score, plus Core Web Vitals data sourced from real
Chrome User Experience Report (CrUX) traffic when available. See `docs/performance-report.md`
for expected score ranges.

**Where this plugs into the codebase:** No env var, no integration — just re-run the report
periodically (e.g., after major releases) as a health check.

---

## Summary: environment variables

| Service | Env var | Wired in code? |
|---|---|---|
| Cloudflare Turnstile | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Yes |
| Google Analytics 4 | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes |
| Google Ads | `NEXT_PUBLIC_GOOGLE_ADS_ID` | Yes |
| Google Tag Manager | `NEXT_PUBLIC_GTM_ID` | Yes |
| Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` | Yes |
| Meta Pixel | `NEXT_PUBLIC_META_PIXEL_ID` | Yes |
| LinkedIn Insight Tag | `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | Yes |
| Google Search Console (meta-tag method) | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Yes |
| Bing Webmaster Tools (meta-tag method) | `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Yes |
| Sentry | DSN, exact name TBD by the setup wizard | Not yet installed |
| LogRocket | `NEXT_PUBLIC_LOGROCKET_APP_ID` (suggested) | Not yet installed |

Cloudflare (WAF/DNS layer), Google Search Console (DNS method), Google Business Profile, Bing
Webmaster Tools (import/DNS method), UptimeRobot, Better Stack, and PageSpeed Insights all
operate outside the codebase (DNS, dashboard, or ad-hoc tooling) and require no environment
variables.
