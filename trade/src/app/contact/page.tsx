import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactForm } from "@/components/forms/contact-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildMetadata, contactPageJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Global Trade Inquiries",
  description:
    "Talk to Coordinatez Global Trade about metal and scrap export, sourcing, and international trade. We respond within one business day.",
  path: "/contact",
  keywords: [
    "contact Coordinatez Global Trade",
    "scrap metal export inquiry",
    "import export inquiry",
    "global trade contact",
    "metal trading inquiry",
  ],
});

export default function ContactPage() {
  const hq = siteConfig.locations.headquarters;
  const aus = siteConfig.locations.australia;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          contactPageJsonLd(),
          faqJsonLd([...faqs]),
        ]}
      />

      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="bg-graticule pointer-events-none absolute inset-0 text-brand-sky opacity-60"
          style={{ backgroundSize: "40px 40px" }}
        />
        <Container className="relative py-16 sm:py-20">
          <RevealOnScroll>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl">
              Tell us what you&apos;re working on.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Every inquiry routes straight to our trading desk, and a real person replies within
              one business day.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="section-y">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Info rail */}
          <RevealOnScroll className="space-y-8">
            <div>
              <h2 className="eyebrow">Direct lines</h2>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-brand-sky" />
                  <a
                    href={`mailto:${siteConfig.email.contact}`}
                    className="text-sm font-medium underline-offset-4 hover:underline"
                  >
                    {siteConfig.email.contact}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-brand-sky" />
                  <span className="text-sm">
                    {siteConfig.phone.us} <span className="text-muted-foreground">(US)</span>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-brand-sky" />
                  <span className="text-sm">
                    {siteConfig.phone.india} <span className="text-muted-foreground">(India)</span>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">Locations</h2>
              <ul className="mt-4 space-y-5">
                {[hq, aus].map((location) => (
                  <li key={location.city} className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-sky" />
                    <div>
                      <p className="text-sm font-medium">
                        {location.company} — {location.label}
                      </p>
                      {location.addressLines.map((line) => (
                        <p key={line} className="text-sm text-muted-foreground">
                          {line}
                        </p>
                      ))}
                      <p className="mt-1 font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground">
                        {location.coordinates.label}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">Business hours</h2>
              <ul className="mt-4 space-y-2">
                {siteConfig.businessHours.map((entry) => (
                  <li key={entry.days} className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-brand-sky" />
                    <div className="text-sm">
                      <span className="font-medium">{entry.days}:</span>{" "}
                      <span className="text-muted-foreground">{entry.hours}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border bg-muted/40 p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Trade requirement?</span> Include
                the material, specification or grade, quantity, and destination — it lets our desk
                come back with a useful answer on the first reply.
              </p>
            </div>
          </RevealOnScroll>

          {/* Form */}
          <RevealOnScroll delay={0.08}>
            <Suspense
              fallback={<div className="h-[36rem] animate-pulse rounded-xl border bg-card" />}
            >
              <ContactForm />
            </Suspense>
          </RevealOnScroll>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/30">
        <Container className="section-y">
          <SectionHeading
            index="FAQ"
            eyebrow="Common Questions"
            title="Answers before you ask."
          />
          <RevealOnScroll className="mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
