import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Coordinatez collects, uses, and protects personal information across coordinatez.com, our WhatsApp business line, and our applications that connect to Google and YouTube — including the Google API Services Limited Use disclosure, the scopes we request, contact and career forms, our AI assistant, analytics, third-party processors, retention, how to delete your data, and your rights.",
  path: "/privacy-policy",
  noIndex: false,
});

function PolicySection({
  id,
  title,
  children,
}: {
  // Optional anchor — /privacy-policy#data-deletion is registered with Meta as our
  // Data Deletion Instructions URL, so that section's id must stay stable.
  id?: string;
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

export default function PrivacyPolicyPage() {
  const contactEmail = siteConfig.email.contact;
  const phone = siteConfig.phone.us;

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
              Effective date: September 11, 2026 · Last updated: September 12, 2026
            </p>
            <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              This Privacy Policy explains how {siteConfig.name} (&ldquo;{siteConfig.name}
              ,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses,
              and protects personal information when you visit coordinatez.com (the
              &ldquo;Site&rdquo;), message us on our WhatsApp business line, use a Coordinatez
              application that connects to your Google or YouTube account, or otherwise
              communicate with us. By using the Site, messaging us, or authorizing one of our
              applications, you agree to the practices described here.
            </p>

            <PolicySection title="1. Information we collect">
              <p>
                We collect information you choose to give us. When you submit our contact form,
                this may include your name, company, email address, phone number, country, and
                the message you write. When you submit our careers form, this may additionally
                include the position you are interested in and a link to your resume or
                portfolio.
              </p>
              <p>
                When you message us on WhatsApp, we receive your phone number and WhatsApp profile
                name, together with the content of your messages, any attachments you send, and
                the timestamps of the conversation. If you go on to discuss an enquiry or order
                with us, we may also receive the name, company, email address, and delivery or
                billing address you provide so we can prepare quotes and paperwork. We do not buy
                information about you from third parties, and we do not collect payment-card
                details over WhatsApp or email.
              </p>
              <p>
                If you connect a Google or YouTube account to one of our applications, we receive
                the email address and basic profile of the Google account you choose, details of
                the YouTube channel it controls, and the video files, titles, descriptions,
                thumbnails, and related metadata you ask us to publish. Google also issues us an
                authorization token, which we store so the application can act on your behalf. We
                never receive or see your Google password.
              </p>
              <p>
                Like most websites, the Site may also automatically receive limited technical
                information — such as browser type, device type, and pages visited — through the
                optional analytics services described below, where those services are enabled and
                consented to.
              </p>
            </PolicySection>

            <PolicySection title="2. How we use your information, and our legal bases">
              <PolicyList
                items={[
                  "To respond to your inquiries and provide information about our technology services.",
                  "To reply to your WhatsApp messages, keep the conversation history so we can pick up where we left off, and prepare any quote or documentation you ask for.",
                  "To evaluate career applications and contact you about current or future opportunities.",
                  "To operate, secure, and improve the Site, and to prevent fraud and abuse of our messaging channels.",
                  "To comply with legal obligations where applicable.",
                ]}
              />
              <p>
                We do not sell, rent, or trade your personal information to third parties, and we
                do not use your WhatsApp conversations or Google user data for advertising or
                share them with advertising platforms.
              </p>
              <p>
                Our legal basis depends on what we are doing: performance of a contract or steps
                taken at your request (answering your enquiry, running an upload you asked for);
                your consent (analytics and advertising cookies, and the authorization you grant
                on Google&apos;s consent screen); our legitimate interests (keeping the Site and
                our messaging channels secure and free of abuse, and recruiting); and compliance
                with a legal obligation (records we are required to keep). Where we rely on
                consent, you can withdraw it at any time — see sections 7 and 12.
              </p>
            </PolicySection>

            <PolicySection title="3. How form submissions are delivered">
              <p>
                Our contact and careers forms are submitted to Formspree, Inc., a third-party form
                backend that receives the submission, stores it in our account, and emails it to
                our team mailbox. Formspree processes submissions on our instructions, as our
                processor, and is not permitted to use them for its own purposes. Notification and
                confirmation emails are sent through our email provider.
              </p>
            </PolicySection>

            <PolicySection title="4. WhatsApp and messaging">
              <p>
                You can reach us on WhatsApp at {phone}, including through the WhatsApp button on
                the Site. Messages are carried over the WhatsApp Business Platform, operated by
                Meta Platforms, Inc., which delivers them to us and processes them under its own
                privacy policy. Once a message reaches our systems, we hold it under the practices
                described in this policy.
              </p>
              <p>
                Conversations are handled by our team and, where relevant, by the service
                providers who process data on our behalf under contract — our messaging platform,
                our hosting and email providers, and the AI provider described in the next
                section. We may disclose message content where the law requires it, including to
                customs or tax authorities.
              </p>
              <p>
                We do not sell WhatsApp message data, and we do not share it with third parties
                for advertising or allow it to be used to target ads. Section 10 sets out how long
                we keep it.
              </p>
              <p>
                You can stop receiving messages from us at any time by replying{" "}
                <strong className="font-medium text-foreground">STOP</strong>, or by blocking the
                number in WhatsApp. To have the conversation deleted as well, see{" "}
                <Link
                  href="#data-deletion"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  Deleting your data
                </Link>
                .
              </p>
            </PolicySection>

            <PolicySection title="5. Automated replies and our AI assistant">
              <p>
                Messages sent to our WhatsApp number, and messages sent through the chat assistant
                on the Site, may be answered first by an automated assistant built on an AI
                language model. To generate a reply, the content of your message is sent to a
                third-party AI provider, which processes it under its own terms. Depending on the
                service tier in use, that provider may retain messages for a period and use them
                to improve its own services, so please do not send confidential information,
                personal data about other people, credentials, or payment details to the
                assistant.
              </p>
              <p>
                A member of our team can view every conversation and take over at any time, and
                you can ask for a person at any point by writing{" "}
                <strong className="font-medium text-foreground">agent</strong> or{" "}
                <strong className="font-medium text-foreground">human</strong>. The assistant
                produces machine-generated text and can be wrong; nothing it says is a binding
                quote, contract, or professional advice. For anything sensitive, email us at{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  {contactEmail}
                </a>{" "}
                instead.
              </p>
            </PolicySection>

            <PolicySection title="6. Google API Services, YouTube, and Limited Use">
              <p>
                Some Coordinatez applications — including our YouTube publishing tool — connect to
                your Google account through Google API Services so they can publish and manage
                video content on your behalf. You grant that access on Google&apos;s own consent
                screen, and you can withdraw it at any time.
              </p>
              <p className="font-medium text-foreground">Limited Use disclosure</p>
              <p>
                {siteConfig.name}&apos;s use and transfer of information received from Google APIs
                to any other app adheres to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements. In practice that means we use Google
                user data only to provide and improve the feature you authorized it for; we do not
                transfer it to others except as necessary to provide that feature, to comply with
                applicable law, or as part of a merger or acquisition; we do not use it for
                advertising and we do not sell it; and we do not allow humans to read it unless we
                have your explicit consent, it is necessary for security or to comply with
                applicable law, or the data has been aggregated and de-identified.
              </p>
              <p className="font-medium text-foreground">The scopes we request, and why</p>
              <PolicyList
                items={[
                  "https://www.googleapis.com/auth/youtube.upload — upload video files to your YouTube channel and manage the uploads we create for you.",
                  "https://www.googleapis.com/auth/youtube.readonly — read your channel, playlist, and video details, so the tool can show you what is already published and confirm that an upload succeeded.",
                  "https://www.googleapis.com/auth/youtube — manage your YouTube account, which the tool uses to set and update titles, descriptions, thumbnails, playlists, and privacy status on the videos it manages.",
                  "openid and https://www.googleapis.com/auth/userinfo.email — confirm which Google account is connected and show you its email address, so uploads go to the channel you intend.",
                ]}
              />
              <p>
                We request these scopes only to operate the publishing features you asked for. We
                do not read, download, or analyze other content on your channel, and we do not use
                your Google data to build profiles or train models.
              </p>
              <p>
                Our applications use the YouTube API Services. By using them you are also bound by
                the{" "}
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  YouTube Terms of Service
                </a>
                , and Google&apos;s handling of your data is described in the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  Google Privacy Policy
                </a>
                .
              </p>
              <p>
                You can review or revoke our access to your Google account at any time from
                Google&apos;s security settings, on the{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  third-party apps with account access
                </a>{" "}
                page. Revoking stops any further use immediately. To have the data we already hold
                deleted as well, use the request process in section 12.
              </p>
              <p>
                The authorization tokens Google issues are stored so the tool can upload on your
                behalf without asking you to sign in each time. They are held under access
                controls, used for nothing else, and deleted when you revoke access or ask us to
                delete your data.
              </p>
            </PolicySection>

            <PolicySection title="7. Analytics and marketing tags">
              <p>
                The Site may use optional analytics and marketing tools — Google Analytics 4,
                Google Tag Manager, Microsoft Clarity, and Meta and LinkedIn tags — to understand
                how visitors use the Site and to measure the effectiveness of our outreach. These
                are non-essential, and none of them is loaded until you press{" "}
                <strong className="font-medium text-foreground">Accept</strong> on our consent
                banner. If you decline, or simply ignore the banner, those scripts are never
                requested and no analytics or advertising identifiers are set. We also honor the
                Global Privacy Control (GPC) signal where your browser sends one, and treat it as
                a decline without asking.
              </p>
              <p>
                Strictly necessary cookies and storage — the record of your own consent choice,
                your theme preference, and the token Cloudflare Turnstile uses to tell a person
                apart from a bot on our forms — are always active and cannot be switched off.
              </p>
              <p>
                Each analytics and advertising provider processes data under its own privacy
                policy. You can change or withdraw your choice at any time using the{" "}
                <strong className="font-medium text-foreground">Cookie preferences</strong> link
                in the Site footer, which reopens the banner, or by clearing this site&apos;s
                cookies and storage in your browser. Withdrawing consent stops any further
                collection; it does not undo processing that already happened lawfully.
              </p>
            </PolicySection>

            <PolicySection title="8. Anti-spam protection">
              <p>
                Our forms are protected by Cloudflare Turnstile, an anti-spam verification
                service. Turnstile may process limited technical signals from your browser to
                distinguish genuine visitors from automated abuse. This processing is governed by
                Cloudflare&apos;s privacy policy.
              </p>
            </PolicySection>

            <PolicySection title="9. Third-party processors">
              <p>
                We keep the list of companies that handle personal information for us short, and
                each one processes it only to deliver its service to us, under contract.
              </p>
              <PolicyList
                items={[
                  "Vercel — hosts and serves this website.",
                  "Google — Google API Services and the YouTube Data API behind our publishing tool, the Gemini API behind our assistant, embedded Maps, and, with your consent, Analytics, Ads, and Tag Manager.",
                  "Meta Platforms — the WhatsApp Business Platform that carries our messaging, and, with your consent, the Meta advertising tag.",
                  "Formspree — receives and forwards contact and careers form submissions.",
                  "Cloudflare — Turnstile bot protection on our forms.",
                  "Microsoft and LinkedIn — with your consent, Microsoft Clarity product analytics and the LinkedIn Insight Tag.",
                  "A managed cloud database provider — stores conversation records and the Google authorization tokens described in section 6, under our own access controls.",
                  "Our email provider — delivers our notification and confirmation emails.",
                ]}
              />
              <p>
                We do not sell personal information, and we do not share message content or Google
                user data with anyone for advertising. We may disclose information where the law
                requires it, or in connection with a merger or acquisition, in which case this
                policy continues to apply until you are notified otherwise.
              </p>
            </PolicySection>

            <PolicySection title="10. Data retention">
              <p>
                We retain contact inquiries for as long as needed to respond to and follow up on
                the inquiry, and career applications (including resumes) for as long as reasonably
                needed to consider you for current or future roles.
              </p>
              <p>
                We keep WhatsApp and other message records for up to 24 months after the last
                message in the conversation, so we can pick up a thread you return to. Where a
                message forms part of a transaction record we are required to retain — for
                example under tax or trade rules — we keep that record for as long as the law
                requires. Backups are purged on a rolling basis.
              </p>
              <p>
                Google authorization tokens and the Google account details described in section 6
                are kept only while your connection to the application is active. They are deleted
                when you revoke access in your Google account or ask us to delete your data. You
                may request deletion of your information at any time as described under
                &ldquo;Deleting your data&rdquo; below.
              </p>
            </PolicySection>

            <PolicySection title="11. Your rights">
              <p>
                Depending on your location, you may have rights to access, correct, or delete the
                personal information we hold about you, and to object to or restrict certain
                processing. To exercise any of these rights, email us at{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  {contactEmail}
                </a>{" "}
                and we will respond within a reasonable timeframe. To have your data deleted, see
                the next section.
              </p>
            </PolicySection>

            <PolicySection id="data-deletion" title="12. Deleting your data">
              <p>
                You can ask us at any time to show you, correct, or delete the personal
                information we hold about you, or to stop messaging you. To request deletion,
                either:
              </p>
              <PolicyList
                items={[
                  "Message DELETE MY DATA to the same WhatsApp number you contacted us on, or",
                  "Email us from the address — or about the phone number — you used with us, and tell us what you would like removed.",
                ]}
              />
              <p>
                Send email requests to{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  {contactEmail}
                </a>
                . We will confirm your request within 7 days and complete the deletion within 30
                days, except for records we are legally required to keep — if that applies to any
                part of your request, we will tell you which records and why. To stop receiving
                To delete data associated with a connected Google or YouTube account, revoke our
                access on Google&apos;s{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  third-party access
                </a>{" "}
                page and email us to have the stored tokens and account details removed. To stop
                receiving messages without deleting your history, reply{" "}
                <strong className="font-medium text-foreground">STOP</strong> or block the number
                in WhatsApp.
              </p>
            </PolicySection>

            <PolicySection title="13. International data transfers">
              <p>
                {siteConfig.name} operates from the United States (Chicago, Illinois) and India
                (Mehsana, Gujarat). Information you submit is stored on servers in the United
                States and may be accessed and processed by our teams in either country. Wherever
                your information is processed, we apply the protections described in this policy.
              </p>
            </PolicySection>

            <PolicySection title="14. Security">
              <p>
                We use reasonable technical and organizational measures to protect the information
                you send us, including transport encryption on the Site. Access to conversation
                records is limited to authorized staff and protected by authentication. WhatsApp
                messages are end-to-end encrypted in transit between you and Meta; once they are
                delivered to our systems they are stored under our own controls. No method of
                transmission or storage is completely secure, however, and we cannot guarantee
                absolute security.
              </p>
            </PolicySection>

            <PolicySection title="15. Children's privacy">
              <p>
                The Site and our messaging channels are intended for businesses and adults, and
                are not directed to children under the age of 13 (or the equivalent minimum age in
                your jurisdiction). We do not knowingly collect personal information from
                children. If you believe a child has provided us information, contact us and we
                will delete it.
              </p>
            </PolicySection>

            <PolicySection title="16. Third-party links">
              <p>
                The Site may link to external websites we do not operate. We are not responsible
                for the privacy practices of those sites, and we encourage you to review their
                policies.
              </p>
            </PolicySection>

            <PolicySection title="17. Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Last
                updated&rdquo; date at the top of this page reflects the most recent revision.
                Material changes will be reflected on this page; continued use of the Site after
                changes take effect constitutes acceptance of the revised policy.
              </p>
            </PolicySection>

            <PolicySection title="18. Contact us">
              <p>
                Questions about this policy or our data practices can be sent to{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  {contactEmail}
                </a>
                , by phone on {phone}, or by mail to {siteConfig.name},{" "}
                {siteConfig.locations.headquarters.addressLines.join(", ")}.
              </p>
              <p>
                See also our{" "}
                <Link
                  href="/terms-and-conditions"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
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
