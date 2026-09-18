import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll, RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { tradeProcess } from "@/data/trade";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us — A US-Based International Trading Company",
  description:
    "Coordinatez Global Trade is the trading division of Coordinatez, headquartered in Chicago — exporting metal and scrap between the USA, India and beyond.",
  path: "/about",
  keywords: [
    "about Coordinatez Global Trade",
    "US trading company",
    "metal scrap trading company",
    "Chicago trading company",
    "US India trade company",
    "import export company",
  ],
});

const values = [
  {
    index: "01",
    title: "Specification discipline",
    description:
      "Every transaction starts by pinning the requirement down in writing — grade, quantity, packing, delivery terms, and timeline. Ambiguity is where shipments go wrong, so we remove it first.",
  },
  {
    index: "02",
    title: "Accountability",
    description:
      "Every transaction has a named Coordinatez owner who carries it end to end. When you call with a question, the person who answers is the person responsible.",
  },
  {
    index: "03",
    title: "Verification at source",
    description:
      "We inspect material where it originates — before it ships, not after it lands. Catching a problem at the source costs a fraction of catching it at the destination.",
  },
  {
    index: "04",
    title: "Honesty about fit",
    description:
      "Not every requirement is ours to take. When a market or material sits outside what we can serve well, we say so at the first conversation — and point you somewhere better when we can.",
  },
];

export default function AboutPage() {
  const hq = siteConfig.locations.headquarters;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
        ]}
      />

      {/* Hero — light editorial */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="bg-graticule pointer-events-none absolute inset-0 text-brand-royal opacity-60"
        />
        <Container className="relative py-20 sm:py-28">
          <RevealOnScroll>
            <p className="eyebrow">About Coordinatez Global Trade</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              Connecting global markets. Moving business forward.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {siteConfig.name} is a US-based international trading company headquartered in
              Chicago — exporting metal and scrap and running end-to-end import/export operations
              between the United States, India, and global markets.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Who we are */}
      <section className="section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                index="01"
                eyebrow="Who We Are"
                title="A trading desk anchored in Chicago."
              />
              <RevealOnScroll delay={0.08} className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
                <p>
                  {siteConfig.name} is the trading division of{" "}
                  <a
                    href={siteConfig.parent.url}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Coordinatez
                  </a>
                  , headquartered in {hq.city}, where our corporate, trading, and client
                  partnership functions sit. From that base we source, specify, and ship material —
                  ferrous and non-ferrous scrap, aluminium and copper, and broader industrial
                  commodities — between US suppliers and international buyers.
                </p>
                <p>
                  Our home corridor is the United States and India, where we have relationships and
                  team members working the same transactions from both sides. The value we bring is
                  rarely the metal alone — it is the discipline around it: grades described
                  honestly, loads inspected before they leave, and documentation that clears
                  customs and satisfies the receiving mill without back-and-forth.
                </p>
                <p>
                  We are deliberately specific about what we claim. Beyond Chicago and Harris Park,
                  the cities you&apos;ll see on our network map are markets and trade hubs we
                  transact with through partners and counterparties — not Coordinatez offices. What
                  we tell you about our company is what is actually true of it.
                </p>
              </RevealOnScroll>
            </div>

            {/* Side rail — mono facts */}
            <RevealOnScroll delay={0.12}>
              <dl className="divide-y rounded-lg border bg-card">
                <div className="p-5">
                  <dt className="eyebrow">Headquarters</dt>
                  <dd className="mt-2 text-sm font-medium">{hq.city}</dd>
                  <dd className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground">
                    {hq.coordinates.label}
                  </dd>
                </div>
                <div className="p-5">
                  <dt className="eyebrow">Primary corridor</dt>
                  <dd className="mt-2 text-sm font-medium">United States — India</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">
                    Plus Middle East, Europe &amp; Asia counterparties
                  </dd>
                </div>
                <div className="p-5">
                  <dt className="eyebrow">Parent company</dt>
                  <dd className="mt-2 text-sm font-medium">
                    <a
                      href={siteConfig.parent.url}
                      className="underline-offset-4 hover:underline"
                    >
                      {siteConfig.parent.name}
                    </a>
                  </dd>
                  <dd className="mt-1 text-xs text-muted-foreground">coordinatez.com</dd>
                </div>
              </dl>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section className="section-y border-t bg-muted/30">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="How We Work"
            title="Discipline at every step."
            description="The same four-stage process governs every transaction we touch — it's how disputes are prevented rather than settled."
          />
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tradeProcess.map((stage) => (
              <motion.div
                key={stage.step}
                variants={staggerItem}
                className="relative rounded-lg border bg-card p-6"
              >
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-copper">
                  Step {stage.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium">{stage.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* Our values */}
      <section className="section-y border-t">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <SectionHeading
              index="03"
              eyebrow="Our Values"
              title="The standards behind the desk."
              description="Cargo fails through vagueness, unowned problems, and unchecked assumptions. These four values are how we prevent that."
            />
            <RevealStagger className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {values.map((value) => (
                <motion.div key={value.index} variants={staggerItem} className="border-t pt-6">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                    Value {value.index}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-medium">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </Container>
      </section>

      {/* Part of Coordinatez — ink panel */}
      <section className="ink-panel border-t border-[var(--ink-panel-border)]">
        <Container className="section-y">
          <SectionHeading
            index="04"
            eyebrow="Part of Coordinatez"
            title="The trading division of a two-division company."
            description="Coordinatez Global Trade is the trading division of Coordinatez. The group's technology work lives on the main Coordinatez site."
            onInk
          />
          <RevealOnScroll className="mt-10">
            <a
              href={siteConfig.parent.url}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-sky"
            >
              Visit coordinatez.com
              <span aria-hidden>→</span>
            </a>
          </RevealOnScroll>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
