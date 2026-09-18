import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Terms governing use of coordinatez.com and Coordinatez applications — acceptable use, automated replies, liability, termination, and governing law.",
  path: "/terms-and-conditions",
});

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-medium">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function TermsAndConditionsPage() {
  const contactEmail = siteConfig.email.contact;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Terms & Conditions", path: "/terms-and-conditions" },
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
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              Effective date: September 11, 2026 · Last updated: September 12, 2026
            </p>
            <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of
              coordinatez.com (the &ldquo;Site&rdquo;) and the Coordinatez applications described
              below (together, the &ldquo;Services&rdquo;), operated by {siteConfig.name}. By
              accessing or using the Services, you agree to be bound by these Terms. If you do
              not agree, please do not use them.
            </p>

            <TermsSection title="1. The services we provide">
              <p>
                {siteConfig.name} is an IT services and AI solutions company. The Site publishes
                information about our technology and AI practice, our locations, our published
                insights, and our open roles, and it provides contact and career forms you can use
                to reach us.
              </p>
              <p>
                Alongside the Site we operate a small number of applications for clients and
                prospective clients: an assistant that answers questions in the chat widget and on
                our WhatsApp business line, and a YouTube publishing tool that uploads and manages
                video content on a channel you connect and authorize through Google. Access to
                these applications is provided as-is, at our discretion, and may be changed or
                withdrawn. Paid engagements are governed by a separate signed agreement, not by
                these Terms.
              </p>
            </TermsSection>

            <TermsSection title="2. Acceptable use">
              <p>
                You may use the Services for lawful purposes only. You agree not to interfere with
                their operation, attempt to gain unauthorized access to any systems or data,
                submit false or misleading information through our forms, or use automated means
                to scrape or overload them.
              </p>
              <p>You further agree not to:</p>
              <ul className="space-y-2.5">
                {[
                  "Use the Services to send unlawful, abusive, harassing, defamatory, deceptive, or infringing content, or to upload video content you do not have the rights to publish.",
                  "Attempt to probe, scan, or test the vulnerability of our systems, or to circumvent our authentication, rate limiting, or bot protection.",
                  "Use our AI assistant to generate or distribute unlawful content, to impersonate another person, or to extract our underlying prompts, models, or credentials.",
                  "Connect a Google or YouTube account you are not authorized to control, or use our publishing tool in breach of the YouTube Terms of Service.",
                  "Resell, sublicense, or provide the Services to third parties as your own without our written agreement.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[0.75rem] h-px w-4 shrink-0 bg-brand-sky" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                You are responsible for activity carried out through any account or authorization
                you grant us, and for keeping your own credentials secure.
              </p>
            </TermsSection>

            <TermsSection title="3. Informational content — not an offer or advice">
              <p>
                The content on this Site is provided for general informational purposes only. It
                does not constitute professional, legal, financial, investment, or trading advice,
                and it should not be relied upon as such. You should obtain advice appropriate to
                your circumstances from qualified professionals before making business decisions.
              </p>
              <p>
                Descriptions of our services are informational and do not constitute an offer
                capable of acceptance. Engagements are governed exclusively by separate written
                agreements or contracts negotiated and executed between {siteConfig.name} and the
                relevant counterparty. In the event of any conflict between Site content and a
                signed agreement, the signed agreement controls.
              </p>
            </TermsSection>

            <TermsSection title="4. Intellectual property">
              <p>
                The Site and its content — including text, graphics, logos, page designs, and
                original articles — are the property of {siteConfig.name} or its licensors and are
                protected by copyright, trademark, and other intellectual-property laws. You may
                view and share links to Site content, but you may not reproduce, republish,
                modify, or commercially exploit it without our prior written permission.
              </p>
            </TermsSection>

            <TermsSection title="5. Submissions">
              <p>
                Information you submit through our contact and career forms is handled as
                described in our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  Privacy Policy
                </Link>
                . You are responsible for the accuracy of the information you provide, and you
                confirm that you have the right to share any materials (such as a resume) that you
                upload.
              </p>
            </TermsSection>

            <TermsSection title="6. Disclaimer of warranties">
              <p>
                The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                basis. To the fullest extent permitted by law, {siteConfig.name} disclaims all
                warranties, express or implied, including warranties of merchantability, fitness
                for a particular purpose, and non-infringement. We do not warrant that the Site
                will be uninterrupted, error-free, or free of harmful components, or that its
                content is complete, accurate, or current at all times.
              </p>
            </TermsSection>

            <TermsSection title="7. Limitation of liability">
              <p>
                To the fullest extent permitted by law, {siteConfig.name} and its officers,
                employees, and agents will not be liable for any indirect, incidental,
                consequential, special, or punitive damages — including lost profits, lost data,
                or business interruption — arising out of or relating to your use of, or inability
                to use, the Site or its content, even if advised of the possibility of such
                damages. Nothing in these Terms excludes liability that cannot be excluded under
                applicable law.
              </p>
            </TermsSection>

            <TermsSection title="8. Termination">
              <p>
                You may stop using the Services at any time. If you have connected a Google or
                YouTube account, you can end that connection yourself by revoking our access in
                your Google account settings, and you can ask us to delete the data we hold as
                described in our{" "}
                <Link
                  href="/privacy-policy#data-deletion"
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  Privacy Policy
                </Link>
                . To stop receiving WhatsApp messages, reply STOP or block the number.
              </p>
              <p>
                We may suspend or terminate your access to the Services, in whole or in part and
                without notice, if we reasonably believe you have breached these Terms, if your
                use puts our systems, other users, or a third-party platform at risk, or if we are
                required to do so by law or by a platform we depend on. We may also discontinue
                any part of the Services.
              </p>
              <p>
                Termination does not affect rights or obligations that accrued beforehand. The
                sections on intellectual property, disclaimer of warranties, limitation of
                liability, and governing law survive termination.
              </p>
            </TermsSection>

            <TermsSection title="9. Third-party links">
              <p>
                The Site may contain links to third-party websites or services that we do not own
                or control. We are not responsible for their content, policies, or practices, and
                a link does not imply endorsement. You access third-party sites at your own risk.
              </p>
            </TermsSection>

            <TermsSection title="10. Changes to the Services and these Terms">
              <p>
                We may modify, suspend, or discontinue any part of the Site at any time. We may
                also revise these Terms from time to time; the &ldquo;Last updated&rdquo; date
                above reflects the most recent version. Your continued use of the Site after
                revised Terms take effect constitutes acceptance of the revision.
              </p>
            </TermsSection>

            <TermsSection title="11. Governing law">
              <p>
                These Terms are governed by and construed in accordance with the laws of the State
                of Illinois, United States of America, without regard to its conflict-of-law
                principles. Any dispute arising out of these Terms or your use of the Site will be
                subject to the exclusive jurisdiction of the state and federal courts located in
                Cook County, Illinois.
              </p>
            </TermsSection>

            <TermsSection title="12. Contact">
              <p>
                Questions about these Terms can be sent to{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  {contactEmail}
                </a>
                .
              </p>
            </TermsSection>
          </div>
        </Container>
      </div>
    </>
  );
}
