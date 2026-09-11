import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Coordinatez Global Trade collects, uses, shares, and protects personal information on trade.coordinatez.com — cookies and consent, Meta, Google, LinkedIn and Microsoft advertising and measurement tags, form processing, retention, international transfers, and your GDPR, CCPA/CPRA and India DPDP rights.",
  path: "/privacy-policy",
  noIndex: false,
});

const LAST_UPDATED = "September 12, 2026";

const linkClass =
  "font-medium text-brand-royal underline-offset-4 transition-colors hover:text-brand-sky hover:underline dark:text-brand-sky";

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-28">
      <h2 className="font-display text-2xl font-medium">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.75rem] h-px w-4 shrink-0 bg-brand-sky" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Card list used for the cookie categories and the third-party recipients — a list
// rather than a <table> so it stays readable on a phone without horizontal scroll.
function DetailCards({
  items,
}: {
  items: { term: string; href?: string; detail: string }[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.term} className="rounded-xl border bg-card/40 p-4">
          <p className="font-medium text-foreground">
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {item.term} ↗
              </a>
            ) : (
              item.term
            )}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed">{item.detail}</p>
        </li>
      ))}
    </ul>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

export default function PrivacyPolicyPage() {
  const contactEmail = siteConfig.email.contact;
  const hq = siteConfig.locations.headquarters;
  const mailTo = (
    <a href={`mailto:${contactEmail}`} className={linkClass}>
      {contactEmail}
    </a>
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy" },
          ]),
        ]}
      />

      <div className="section-y">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Heading */}
            <div className="flex items-center gap-3">
              <p className="eyebrow">Legal</p>
              <span aria-hidden className="h-px max-w-24 flex-1 bg-border" />
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-medium leading-[1.1] sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
            <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              This Privacy Policy explains how {siteConfig.name} (&ldquo;{siteConfig.name}
              ,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses,
              shares, and protects personal information when you visit trade.coordinatez.com (the
              &ldquo;Site&rdquo;), submit an enquiry, or contact us through it. It also sets out
              the disclosures required by the advertising and measurement platforms we may use —
              including Meta, Google, LinkedIn, and Microsoft — and the rights you have under the
              GDPR and UK GDPR, the California Consumer Privacy Act as amended by the CPRA, and
              India&apos;s Digital Personal Data Protection Act.
            </p>

            {/* Quick links */}
            <nav
              aria-label="On this page"
              className="mt-8 rounded-2xl border bg-card/40 p-5 text-sm"
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                Jump to
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { label: "Cookies & consent", href: "#cookies" },
                  { label: "Meta, Google & LinkedIn tags", href: "#advertising" },
                  { label: "Who we share with", href: "#recipients" },
                  { label: "Your rights", href: "#your-rights" },
                  { label: "Delete my data", href: "#data-deletion" },
                ].map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <PolicySection id="controller" title="1. Who we are">
              <p>
                {siteConfig.name} is the controller of the personal information described in this
                policy. We are a US-based international trading company with our global
                headquarters at {hq.addressLines.join(", ")}, and team members working across the
                United States, India, and Australia.
              </p>
              <p>
                For any privacy question, request, or complaint — including requests to access or
                delete your data — write to {mailTo}. We have not appointed a statutory Data
                Protection Officer; privacy requests are handled by our corporate team at the
                address above.
              </p>
              <p>
                {siteConfig.name} is a division of {siteConfig.parent.name}, whose technology
                practice runs a separate website at{" "}
                <Ext href={siteConfig.parent.url}>coordinatez.com</Ext> with its own privacy
                policy. This policy covers trade.coordinatez.com only.
              </p>
            </PolicySection>

            <PolicySection id="what-we-collect" title="2. Information we collect">
              <p className="font-medium text-foreground">Information you give us</p>
              <PolicyList
                items={[
                  "Contact and enquiry form: your name, email address, phone number, company, enquiry type, country, your message, and the page or referrer that brought you to the form.",
                  "Trade correspondence: the commercial details you choose to send us about a shipment, grade, quantity, destination, or quotation.",
                  "Direct correspondence: anything you choose to include when you email, call, or message us on WhatsApp.",
                ]}
              />
              <p className="pt-2 font-medium text-foreground">
                Information collected automatically
              </p>
              <PolicyList
                items={[
                  "Technical data our servers and security tooling receive with every request — IP address, browser and device type, operating system, referring URL, the pages you request, and timestamps. IP addresses are also used to rate-limit form submissions, and are held only transiently for that purpose.",
                  "Cookies, local storage entries, and similar identifiers set by the Site and, where you consent to them, by the analytics and advertising tags described in section 4.",
                ]}
              />
              <p>
                We do not ask for and do not want special categories of data (such as health,
                religion, biometric, or government identifiers), payment card numbers, or
                passwords. Please do not submit them through our forms. Banking and documentary
                details relating to an actual transaction are exchanged directly with your
                counterparty contact at {siteConfig.parent.name}, never through this Site.
              </p>
            </PolicySection>

            <PolicySection
              id="how-we-use"
              title="3. How we use your information, and our legal bases"
            >
              <PolicyList
                items={[
                  "To respond to your enquiries, prepare quotations, and provide information about our trade and sourcing services — performance of a contract or steps taken at your request, and our legitimate interest in answering business enquiries.",
                  "To operate, secure, debug, and improve the Site, including spam and abuse prevention — our legitimate interest in keeping the Site available and free of abuse.",
                  "To measure how the Site is used and how effective our marketing is, through the analytics and advertising tags in section 4 — your consent.",
                  "To confirm a submission you made and follow up on an enquiry you started — legitimate interest, or consent where local marketing law requires it.",
                  "To meet trade compliance, sanctions screening, record-keeping, and other legal obligations, and to establish, exercise, or defend legal claims — legal obligation and legitimate interest.",
                ]}
              />
              <p>
                We do not use your information for automated decision-making that produces legal
                or similarly significant effects about you.
              </p>
            </PolicySection>

            <PolicySection id="cookies" title="4. Cookies, consent, and similar technologies">
              <p>
                When you first visit the Site we show a consent banner. Non-essential cookies and
                tags — everything in the analytics and advertising categories below — are loaded
                only after you press <strong className="text-foreground">Accept</strong>. If you
                decline, or simply ignore the banner, those scripts are never requested and no
                analytics or advertising identifiers are set.
              </p>
              <DetailCards
                items={[
                  {
                    term: "Strictly necessary",
                    detail:
                      "Required for the Site to work and to remember your own privacy choice. This includes the consent record stored in your browser under “coordinatez-cookie-consent”, your theme preference, and the tokens Cloudflare Turnstile uses to tell a person apart from a bot on our forms. These do not require consent and cannot be switched off.",
                  },
                  {
                    term: "Analytics and product insight",
                    detail:
                      "Google Analytics 4, Google Tag Manager, and Microsoft Clarity — how many people visit, which pages they read, and where they get stuck. Clarity also records anonymized interaction playback and heatmaps, and masks text typed into form fields by default. Set only with your consent.",
                  },
                  {
                    term: "Advertising and measurement",
                    detail:
                      "Meta Pixel, Google Ads conversion tracking, and the LinkedIn Insight Tag — these tell us which campaigns led to an enquiry and let those platforms show our ads to relevant audiences. Set only with your consent. Section 5 sets out exactly what each one shares.",
                  },
                ]}
              />
              <p>
                You can change your mind at any time. Use the{" "}
                <strong className="text-foreground">Cookie preferences</strong> link in the Site
                footer to reopen the banner and record a new choice, or clear this site&apos;s
                cookies and storage in your browser. Withdrawing consent stops any further
                collection; it does not undo processing that already happened lawfully. We also
                honor the Global Privacy Control (GPC) signal where your browser sends one.
              </p>
              <p>
                Each tag below loads only when it has been configured for the Site by us{" "}
                <em>and</em> you have accepted. Where no ID is configured, that provider receives
                nothing at all.
              </p>
            </PolicySection>

            <PolicySection
              id="advertising"
              title="5. Meta, Google, LinkedIn, and Microsoft — what each one receives"
            >
              <p>
                These platforms act as independent or joint controllers for the data they receive
                through their tags, under their own terms and privacy policies. Those platforms
                require us to tell you clearly what is shared and how to opt out.
              </p>
              <DetailCards
                items={[
                  {
                    term: "Meta Pixel — Meta Platforms, Inc.",
                    href: "https://www.facebook.com/privacy/policy",
                    detail:
                      "If you accept advertising cookies, the Meta Pixel reports events such as page views and form submissions to Meta, together with your IP address, browser identifiers, any Meta cookies already in your browser, and the URL you are on. Meta uses this to measure our campaigns, to build custom and lookalike audiences, and — subject to your Meta account settings — for its own purposes described in its policy. For pixel event data collected in the EEA and the UK, Meta and Coordinatez act as joint controllers for the collection and transmission step.",
                  },
                  {
                    term: "Meta ad preferences and activity controls",
                    href: "https://accountscenter.facebook.com/ad_preferences",
                    detail:
                      "Manage the ads you see and disconnect off-platform activity that businesses like ours have shared with Meta.",
                  },
                  {
                    term: "WhatsApp — Meta Platforms, Inc.",
                    href: "https://www.whatsapp.com/legal/privacy-policy",
                    detail:
                      "The floating WhatsApp button opens a conversation with our business line in WhatsApp. We receive your WhatsApp display name, phone number, and the messages you send. The conversation itself is carried by WhatsApp under Meta’s privacy policy; we use it only to answer you.",
                  },
                  {
                    term: "Google Analytics 4, Google Ads, and Google Tag Manager — Google LLC",
                    href: "https://policies.google.com/technologies/partner-sites",
                    detail:
                      "With your consent, these set cookies and device identifiers and send Google your IP address (truncated for GA4), the pages you view, and conversion events. Google uses them to provide measurement to us and, where your Google account settings allow, for ad personalization. The link explains how Google uses data from sites that use its services.",
                  },
                  {
                    term: "Google Analytics opt-out browser add-on",
                    href: "https://tools.google.com/dlpage/gaoptout",
                    detail:
                      "Blocks Google Analytics on every site you visit, independently of our consent banner. You can also manage Google ad personalization at myadcenter.google.com.",
                  },
                  {
                    term: "LinkedIn Insight Tag — LinkedIn Corporation (Microsoft)",
                    href: "https://www.linkedin.com/legal/privacy-policy",
                    detail:
                      "With your consent, reports page views and conversions to LinkedIn along with browser and IP data, so we can measure campaigns and reach professional audiences. Members can opt out of retargeting in their LinkedIn advertising settings; visitors can opt out at linkedin.com/psettings/guest-controls/retargeting-opt-out.",
                  },
                  {
                    term: "Microsoft Clarity — Microsoft Corporation",
                    href: "https://privacy.microsoft.com/privacystatement",
                    detail:
                      "With your consent, records anonymized session playback, clicks, scrolls, and heatmaps so we can find usability problems. Text you type into form fields is masked by default. Microsoft may use the data as described in its privacy statement.",
                  },
                  {
                    term: "Industry opt-out tools",
                    href: "https://optout.aboutads.info/",
                    detail:
                      "The Digital Advertising Alliance (optout.aboutads.info), the Network Advertising Initiative (optout.networkadvertising.org), and Your Online Choices in the EU (youronlinechoices.eu) let you opt out of interest-based advertising across many companies at once.",
                  },
                ]}
              />
            </PolicySection>

            <PolicySection id="forms" title="6. How form submissions are handled">
              <p>
                Our enquiry form is submitted to Formspree, Inc., a third-party form backend that
                receives the submission, stores it in our account, and emails it to our team
                mailbox. Formspree processes submissions on our instructions, as our processor.
                Notification and confirmation emails are sent through our email provider.
              </p>
              <p>
                Before a submission is accepted it is checked by Cloudflare Turnstile — a
                privacy-preserving anti-bot service that inspects technical signals from your
                browser rather than profiling you — along with a hidden honeypot field, a
                submission-timing check, and per-IP rate limiting. Cloudflare receives your IP
                address and browser signals for that verification.
              </p>
              <DetailCards
                items={[
                  {
                    term: "Formspree, Inc.",
                    href: "https://formspree.io/legal/privacy-policy",
                    detail: "Receives, stores, and forwards enquiry form submissions.",
                  },
                  {
                    term: "Cloudflare, Inc. (Turnstile)",
                    href: "https://www.cloudflare.com/privacypolicy/",
                    detail: "Verifies that a form submission comes from a person, not a bot.",
                  },
                ]}
              />
            </PolicySection>

            <PolicySection id="recipients" title="7. Who we share information with">
              <p>
                We do not sell, rent, or trade your personal information. We share it only with
                the service providers that operate parts of the Site for us, with the advertising
                and measurement platforms you have consented to, with counterparties and logistics
                or inspection partners where that is necessary to carry out a transaction you have
                asked us to progress, and where the law requires it — for example to respond to a
                lawful request, to meet trade and sanctions compliance obligations, to enforce our
                terms, or in connection with a merger or acquisition, in which case this policy
                continues to apply until you are notified otherwise.
              </p>
              <DetailCards
                items={[
                  {
                    term: "Formspree, Inc.",
                    href: "https://formspree.io/legal/privacy-policy",
                    detail: "Form submission processing and delivery.",
                  },
                  {
                    term: "Google LLC",
                    href: "https://policies.google.com/privacy",
                    detail: "With consent, Google Analytics, Google Ads, and Tag Manager.",
                  },
                  {
                    term: "Meta Platforms, Inc.",
                    href: "https://www.facebook.com/privacy/policy",
                    detail: "WhatsApp conversations, and — with consent — the Meta Pixel.",
                  },
                  {
                    term: "LinkedIn Corporation",
                    href: "https://www.linkedin.com/legal/privacy-policy",
                    detail: "With consent, the LinkedIn Insight Tag.",
                  },
                  {
                    term: "Microsoft Corporation",
                    href: "https://privacy.microsoft.com/privacystatement",
                    detail: "With consent, Microsoft Clarity product analytics.",
                  },
                  {
                    term: "Cloudflare, Inc.",
                    href: "https://www.cloudflare.com/privacypolicy/",
                    detail: "Turnstile bot protection on our forms.",
                  },
                  {
                    term: "Our hosting and email providers",
                    detail:
                      "Serve the Site, keep short-term server logs for security and diagnostics, and deliver our notification and confirmation emails.",
                  },
                ]}
              />
              <p>
                For California residents: enabling the advertising tags in section 5 may qualify
                as &ldquo;sharing&rdquo; personal information for cross-context behavioral
                advertising under the CPRA. Declining cookies, or sending a Global Privacy Control
                signal, opts you out of that sharing. We do not sell personal information, and we
                have no actual knowledge of selling or sharing the personal information of anyone
                under 16.
              </p>
            </PolicySection>

            <PolicySection id="retention" title="8. How long we keep information">
              <PolicyList
                items={[
                  "Trade enquiries: up to 24 months after our last exchange with you, so we can pick the conversation back up, then deleted or anonymized.",
                  "Records relating to a completed transaction: kept for as long as export, customs, tax, and sanctions-screening rules require, which is typically five to seven years.",
                  "Rate-limiting records: held in server memory for about ten minutes and never written to disk.",
                  "Server and security logs: kept short-term by our hosting provider for diagnostics and abuse prevention.",
                  "Your cookie choice: stored in your browser until you change or clear it.",
                  "Analytics and advertising data: retained by each platform under its own retention settings and policy.",
                ]}
              />
            </PolicySection>

            <PolicySection id="transfers" title="9. International data transfers">
              <p>
                {siteConfig.name} operates from the United States (Chicago, Illinois), with team
                members working across the United States, India, and Australia. Information you
                submit may be accessed and processed by our teams in those countries, and by the
                providers listed in section 7 — most of which are established in the United
                States. Trade is international by nature, so a transaction you ask us to progress
                may also involve counterparties and logistics partners in other countries.
              </p>
              <p>
                Where personal data is transferred out of the EEA, the UK, or another country with
                transfer restrictions, we rely on the European Commission&apos;s Standard
                Contractual Clauses (with the UK Addendum where applicable) or another lawful
                transfer mechanism offered by the provider, together with the safeguards described
                in this policy. You can request details of the mechanism used by writing to{" "}
                {mailTo}.
              </p>
            </PolicySection>

            <PolicySection id="security" title="10. Security">
              <p>
                We use reasonable technical and organizational measures to protect the information
                you send us: transport encryption (HTTPS) across the Site, secrets and API keys
                held server-side only, bot and abuse protection on every form, and access to
                submissions limited to the team members who need it. No method of transmission or
                storage is completely secure, however, and we cannot guarantee absolute security.
                If a breach affects your personal data and the law requires it, we will notify you
                and the relevant regulator without undue delay.
              </p>
              <p>
                Beware of payment fraud: we never change bank details by email mid-transaction.
                Always verify banking instructions with your known contact by phone before
                remitting funds.
              </p>
            </PolicySection>

            <PolicySection id="your-rights" title="11. Your rights">
              <p className="font-medium text-foreground">
                If you are in the EEA, the UK, or Switzerland (GDPR / UK GDPR)
              </p>
              <PolicyList
                items={[
                  "Access a copy of the personal data we hold about you, and information about how we process it.",
                  "Correct inaccurate data, or complete data that is incomplete.",
                  "Erase your data where it is no longer needed, or where you withdraw the consent it relied on.",
                  "Restrict or object to processing based on our legitimate interests, including direct marketing at any time.",
                  "Receive your data in a portable, machine-readable format.",
                  "Withdraw consent at any time, without affecting processing carried out before you withdrew it.",
                  "Lodge a complaint with your local supervisory authority — in the UK, the Information Commissioner's Office.",
                ]}
              />
              <p className="pt-2 font-medium text-foreground">
                If you are a California resident (CCPA / CPRA)
              </p>
              <PolicyList
                items={[
                  "Know the categories and specific pieces of personal information we have collected, the sources, the business purpose, and the categories of third parties it is disclosed to.",
                  "Delete the personal information we hold about you, subject to legal exceptions.",
                  "Correct inaccurate personal information.",
                  "Opt out of the sale or sharing of personal information for cross-context behavioral advertising — decline cookies in our banner, or send a Global Privacy Control signal.",
                  "Limit the use of sensitive personal information — we do not collect it for the purposes that trigger this right.",
                  "Be free from discrimination for exercising any of these rights. We do not offer financial incentives for personal information.",
                  "Use an authorized agent to submit a request on your behalf, with proof of authorization.",
                ]}
              />
              <p className="pt-2 font-medium text-foreground">
                If you are in India (Digital Personal Data Protection Act)
              </p>
              <PolicyList
                items={[
                  "Obtain a summary of the personal data we process about you and the processing activities involved.",
                  "Have your data corrected, completed, updated, or erased.",
                  "Nominate another person to exercise your rights in the event of death or incapacity.",
                  "Raise a grievance with us first — write to the address in section 15 and we will respond within the statutory timeframe. You may then escalate to the Data Protection Board of India.",
                ]}
              />
              <p>
                Residents of other jurisdictions — including Australia under the Privacy Act and
                Canada under PIPEDA — have comparable rights, and we honor equivalent requests. To
                exercise any right, email {mailTo} from the address you contacted us with, or give
                us enough detail to locate your record. We do not charge a fee, and we respond
                within 30 days, or the shorter period your local law requires. We may ask for
                information to verify your identity before acting.
              </p>
            </PolicySection>

            <PolicySection id="data-deletion" title="12. How to request deletion of your data">
              <p>
                To have us delete the personal information we hold about you, email {mailTo} with
                the subject line{" "}
                <strong className="text-foreground">&ldquo;Data deletion request&rdquo;</strong>{" "}
                and include the name, email address, and phone number you used when you contacted
                us, so we can find your records. We will confirm receipt, delete or anonymize your
                information across our mailbox and form backend, and write back to confirm —
                normally within 30 days. Records we are required to keep for export, customs, tax,
                or sanctions-compliance reasons are retained for the statutory period, and we will
                tell you if that applies to you.
              </p>
              <p>
                Data held by the advertising platforms is controlled by them, not by us. To delete
                or limit what Meta holds about your interaction with our ads, use the{" "}
                <Ext href="https://accountscenter.facebook.com/info_and_permissions">
                  Meta Accounts Center
                </Ext>
                ; for Google, use{" "}
                <Ext href="https://myactivity.google.com/">Google My Activity</Ext>; for LinkedIn
                and Microsoft, use the account settings in their respective services.
              </p>
            </PolicySection>

            <PolicySection id="children" title="13. Children's privacy">
              <p>
                The Site is intended for business audiences and is not directed to children under
                the age of 13 (or the equivalent minimum age in your jurisdiction, such as 16 in
                parts of the EEA and 18 in India). We do not knowingly collect personal
                information from children, and we do not serve behavioral advertising to them. If
                you believe a child has provided us information, contact us and we will delete it.
              </p>
            </PolicySection>

            <PolicySection id="changes" title="14. Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Last
                updated&rdquo; date at the top of this page reflects the most recent revision.
                Material changes will be reflected on this page and, where a change affects
                consent-based processing, we will ask for your consent again. Continued use of the
                Site after changes take effect constitutes acceptance of the revised policy.
              </p>
            </PolicySection>

            <PolicySection id="contact" title="15. Contact us">
              <p>
                Questions, requests, or complaints about this policy or our data practices can be
                sent to {mailTo}, or by mail to {siteConfig.name}, {hq.addressLines.join(", ")}. If
                you are not satisfied with our response, you may contact your local data
                protection authority.
              </p>
              <p>
                The Site also links to external websites we do not operate — including our social
                profiles and partner references. We are not responsible for their privacy
                practices; review their policies before sharing information with them. See also
                our{" "}
                <Link href="/terms-and-conditions" className={linkClass}>
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </PolicySection>
          </div>
        </Container>
      </div>
    </>
  );
}
