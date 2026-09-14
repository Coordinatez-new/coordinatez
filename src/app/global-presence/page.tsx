import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll, RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { JsonLd } from "@/components/shared/json-ld";
import { TradeNetworkMap } from "@/components/sections/trade-network-map";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Global Presence — Chicago Headquarters & India Development Center",
  description:
    "Coordinatez operates from three locations: our global headquarters in Chicago, our technology & development center in Gujarat, India, and our Asia-Pacific office in Harris Park, Australia — covering most of the global business day.",
  path: "/global-presence",
  keywords: [
    "Coordinatez locations",
    "Chicago headquarters",
    "India development center",
    "US India company",
    "international business locations",
    "Coordinatez global presence",
  ],
});

const locationEntries = [
  {
    location: siteConfig.locations.headquarters,
    phone: siteConfig.phone.us,
  },
  {
    location: siteConfig.locations.development,
    phone: siteConfig.phone.india,
  },
  {
    location: siteConfig.locations.australia,
    phone: siteConfig.email.contact,
  },
];

export default function GlobalPresencePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Global Presence", path: "/global-presence" },
          ]),
        ]}
      />

      {/* Hero — ink panel */}
      <section className="ink-panel relative overflow-hidden">
        <div aria-hidden className="bg-graticule pointer-events-none absolute inset-0 text-white" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 size-[34rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-sky) 16%, transparent) 0%, transparent 65%)",
          }}
        />
        <Container className="relative py-20 sm:py-28">
          <RevealOnScroll>
            <p className="eyebrow-on-ink">Global Presence</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Anchored in Chicago. Engineered in India.{" "}
              <span className="text-gradient-sky">Working worldwide.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--ink-panel-muted)]">
              Three offices run everything we do: our global headquarters in{" "}
              {siteConfig.locations.headquarters.city}, our technology &amp; development center in{" "}
              {siteConfig.locations.development.city}, India, and our Asia-Pacific office in{" "}
              {siteConfig.locations.australia.city}, Australia. From there we serve clients across
              time zones and continents.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-white px-6 text-[#10143a] hover:bg-white/90">
                <Link href="/contact">
                  Get in touch
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#locations">
                  See our locations
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Network map */}
      <section className="ink-panel border-t border-[var(--ink-panel-border)]">
        <Container className="section-y">
          <SectionHeading
            index="01"
            eyebrow="The Network"
            title="Our anchors, a world of working relationships."
            description="Chicago, Gujarat, and Sydney are where Coordinatez lives. The other cities on this map are markets and hubs where the wider Coordinatez group — including our Global Trade division (trade.coordinatez.com) — does business through partners and counterparties."
            onInk
          />
          <RevealOnScroll className="mt-12 overflow-hidden rounded-xl border border-[var(--ink-panel-border)] bg-[var(--ink-panel-soft)]/40 p-4 text-[var(--ink-panel-foreground)] sm:p-8">
            <TradeNetworkMap className="h-auto w-full" />
            <p className="mt-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--ink-panel-muted)]">
              Coordinatez locations in blue · partner markets &amp; hubs in copper
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Location cards */}
      <section id="locations" className="scroll-mt-24 section-y">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Our Locations"
            title="Where Coordinatez actually is."
            description="Three addresses, one company. Corporate and client partnerships run from Chicago; technology and AI delivery run from our development center in Gujarat, India; and our Asia-Pacific office is in Sydney, Australia."
          />
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locationEntries.map(({ location, phone }) => (
              <motion.div
                key={location.city}
                variants={staggerItem}
                className="flex h-full flex-col rounded-lg border bg-card p-6 sm:p-8"
              >
                <p className="eyebrow">{location.label}</p>
                <h3 className="mt-4 font-display text-2xl font-medium">{location.company}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{location.role}</p>
                <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed">
                  {location.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {location.coordinates.label}
                </p>
                <p className="mt-2 text-sm">
                  <a
                    href={
                      phone.includes("@") ? `mailto:${phone}` : `tel:${phone.replace(/[^+\d]/g, "")}`
                    }
                    className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                  >
                    {phone}
                  </a>
                </p>
                <iframe
                  src={location.mapEmbedSrc}
                  title={`Map of the ${siteConfig.name} ${location.label.toLowerCase()} in ${location.city}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mt-6 h-56 w-full rounded-lg border"
                />
              </motion.div>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* Time zones strip */}
      <section className="border-t bg-muted/30">
        <Container className="section-y">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <SectionHeading
              index="03"
              eyebrow="Working Across Time Zones"
              title="Your business day, mostly covered."
              description="US Central Time and India Standard Time sit roughly ten and a half hours apart. Between a Chicago morning and a Gujarat evening, someone at Coordinatez is at their desk for most of the global business day — and handoffs between the two teams happen inside the company, not across vendors."
            />
            <RevealOnScroll delay={0.1}>
              <dl className="divide-y rounded-lg border bg-card">
                {siteConfig.businessHours.map((entry) => (
                  <div
                    key={entry.days}
                    className="flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="text-sm font-medium">{entry.days}</dt>
                    <dd className="font-mono text-[0.72rem] tracking-[0.08em] text-muted-foreground">
                      {entry.hours}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">A note on the map:</span> beyond
                Chicago, Gujarat, and Sydney, the cities shown above — Houston, Rotterdam, Dubai,
                Mundra, Singapore, Shanghai — are markets and hubs where the wider Coordinatez
                group works through partners and counterparties. They are not Coordinatez offices,
                and we won&apos;t pretend otherwise.
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
