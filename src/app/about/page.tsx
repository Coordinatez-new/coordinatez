import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll, RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { services, serviceCategories } from "@/data/services";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us — An IT Services & AI Solutions Company",
  description:
    "Coordinatez is an IT services and AI solutions company headquartered in Chicago, with its development center in Gujarat, India. How we work, and why.",
  path: "/about",
  keywords: [
    "about Coordinatez",
    "Coordinatez company",
    "IT services company",
    "AI solutions company",
    "Chicago headquarters",
    "Coordinatez India office",
    "US India company",
  ],
});

const values = [
  {
    index: "01",
    title: "Specification discipline",
    description:
      "Every engagement starts by pinning the requirement down in writing — what will be delivered, to what standard, by when. Ambiguity is where projects go wrong, so we remove it first.",
  },
  {
    index: "02",
    title: "Accountability",
    description:
      "Every project has a named Coordinatez owner who carries it end to end. When you call with a question, the person who answers is the person responsible.",
  },
  {
    index: "03",
    title: "Verification at source",
    description:
      "We check work where it originates — code reviewed before it merges, software tested before it releases. Catching a problem at the source costs a fraction of catching it in production.",
  },
  {
    index: "04",
    title: "Honesty about fit",
    description:
      "Not every requirement is ours to take. When a stack, scope, or build sits outside what we can serve well, we say so at the first conversation — and point you somewhere better when we can.",
  },
];

export default function AboutPage() {
  const hq = siteConfig.locations.headquarters;
  const dev = siteConfig.locations.development;

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
            <p className="eyebrow">About Coordinatez</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              Technology that moves business forward.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Coordinatez is an IT services &amp; AI solutions company — headquartered in the
              United States, engineered from India. One company, one standard of work, on both
              sides of the world.
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
                title="One company working both sides of the world."
              />
              <RevealOnScroll delay={0.08} className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
                <p>
                  {siteConfig.name} is headquartered in {hq.city}, where our corporate and client
                  partnership functions sit. Our technology and development center in {dev.city},
                  India, is where our engineering teams design, build, and run software and AI
                  systems for clients worldwide.
                </p>
                <p>
                  Client conversations happen in US time; engineering happens in India — inside
                  one company, not across a vendor boundary. The team that scopes your project is
                  the team that builds and runs it, which keeps accountability in one place and
                  handoffs inside the company rather than between contractors.
                </p>
                <p>
                  The company also operates a separate business division,{" "}
                  <a
                    href={siteConfig.tradeSite.url}
                    className="font-medium text-brand-royal hover:underline dark:text-brand-sky"
                  >
                    {siteConfig.tradeSite.name}
                  </a>
                  , which handles international trade from its own site. This site — and this
                  team — is the technology practice.
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
                  <dt className="eyebrow">Development</dt>
                  <dd className="mt-2 text-sm font-medium">{dev.city}</dd>
                  <dd className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground">
                    {dev.coordinates.label}
                  </dd>
                </div>
                <div className="p-5">
                  <dt className="eyebrow">Focus</dt>
                  <dd className="mt-2 text-sm font-medium">IT Services &amp; AI Solutions</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">
                    Web · Mobile · Software · AI · Data · Cloud
                  </dd>
                </div>
              </dl>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="section-y border-t bg-muted/30">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="What We Do"
            title="IT services & AI, delivered end to end."
            description="Web, mobile, custom software, AI, data, and cloud — designed, built, and operated by our in-house engineering team for startups, SMEs, and enterprises."
          />
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((category, i) => {
              const items = services.filter((s) => s.category === category.id);
              return (
                <motion.div key={category.id} variants={staggerItem} className="h-full">
                  <Link
                    href="/technology"
                    className="group flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-foreground/25"
                  >
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-brand-sky">
                      {String(i + 1).padStart(2, "0")} — {category.label}
                    </p>
                    <h3 className="mt-4 font-display text-xl font-medium">{category.note}</h3>
                    <ul className="mt-5 flex flex-1 flex-wrap content-start gap-1.5">
                      {items.map((service) => (
                        <li
                          key={service.slug}
                          className="rounded border bg-muted/60 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-muted-foreground"
                        >
                          {service.navLabel}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-sky">
                      Explore Technology &amp; AI
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
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
              title="The standards behind the work."
              description="Software fails through vagueness, unowned problems, and unchecked assumptions. These four values are how we prevent that."
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

      {/* How we're organized — ink panel */}
      <section className="ink-panel border-t border-[var(--ink-panel-border)]">
        <Container className="section-y">
          <SectionHeading
            index="04"
            eyebrow="How We're Organized"
            title="One company. Offices across three continents."
            description="Corporate and client partnerships run from Chicago; technology and AI are engineered from our development center in Gujarat, India — one company, one accountable team."
            onInk
          />
          <RevealOnScroll className="mt-12">
            <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--ink-panel-border)] bg-[var(--ink-panel-border)] lg:grid-cols-2">
              <div className="bg-[var(--ink-panel)] p-7 sm:p-9">
                <p className="eyebrow-on-ink">{hq.label} — {hq.city}</p>
                <h3 className="mt-4 font-display text-2xl font-medium text-white">
                  {siteConfig.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-panel-muted)]">
                  The parent company. Corporate functions and client partnerships run from our
                  headquarters at {hq.addressLines.join(", ")} — the commercial front door of
                  the company.
                </p>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--ink-panel-muted)]">
                  {hq.coordinates.label}
                </p>
              </div>
              <div className="bg-[var(--ink-panel)] p-7 sm:p-9">
                <p className="eyebrow-on-ink">{dev.label} — {dev.city}</p>
                <h3 className="mt-4 font-display text-2xl font-medium text-white">
                  {siteConfig.divisions.technology.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-panel-muted)]">
                  The Technology &amp; AI division of {siteConfig.name}. Our engineering teams in{" "}
                  {dev.city}, India design, build, and operate this work for clients worldwide —
                  backed by the standards of the group.
                </p>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--ink-panel-muted)]">
                  {dev.coordinates.label}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-[var(--ink-panel-muted)]">
                One client relationship, one accountable owner — across every office.
              </p>
              <Link
                href="/global-presence"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-sky"
              >
                See our global presence
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
