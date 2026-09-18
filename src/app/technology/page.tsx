import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { services, serviceCategories } from "@/data/services";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "IT Services & AI Solutions Company USA | Coordinatez",
  description:
    "IT services and AI solutions for US businesses — web and mobile development, custom software, AI integration, automation, robotics, data, and cloud.",
  path: "/technology",
  keywords: [
    "IT services company USA",
    "AI solutions company USA",
    "AI development company USA",
    "software development company USA",
    "technology consulting company USA",
    "IT company Chicago",
    "AI company Chicago",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Technology & AI", path: "/technology" },
];

export default function TechnologyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          ...services.map((service) =>
            serviceJsonLd({
              title: service.title,
              description: service.description,
              path: `/technology/${service.slug}`,
            })
          ),
        ]}
      />

      {/* Hero — digital, technical treatment */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="bg-graticule pointer-events-none absolute inset-0 text-brand-sky opacity-70"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 size-[36rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-sky) 14%, transparent) 0%, transparent 65%)",
          }}
        />
        <Container className="relative py-16 sm:py-24">
          <Breadcrumbs items={crumbs} />
          <RevealOnScroll className="mt-6">
            <p className="eyebrow">{siteConfig.divisions.technology.name}</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              IT services &amp; AI solutions that move{" "}
              <span className="text-gradient-sky">business forward</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Web, mobile, custom software, AI, data, and cloud — designed, built, and operated by
              our in-house engineering team, for startups, SMEs, and enterprises across the United
              States and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href={{ pathname: "/contact", query: { interest: "Technology & AI" } }}>
                  Start a technology conversation
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link href="#services">
                  Browse all {services.length} services
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>

          {/* capability categories */}
          <RevealOnScroll delay={0.12}>
            <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-5">
              {serviceCategories.map((category, i) => (
                <div key={category.id} className="bg-card p-5">
                  <dt className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.65rem] text-brand-sky">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-medium">{category.label}</span>
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{category.note}</dd>
                </div>
              ))}
            </dl>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Services grid, grouped by category — each links to a dedicated page */}
      <section id="services" className="section-y scroll-mt-24">
        <Container>
          {serviceCategories.map((category) => {
            const items = services.filter((s) => s.category === category.id);
            if (items.length === 0) return null;
            return (
              <div key={category.id} className="mb-16 last:mb-0">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-display text-2xl font-medium">{category.label}</h2>
                  <span className="eyebrow">{category.note}</span>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((service) => (
                    <RevealOnScroll key={service.slug}>
                      <Link
                        href={`/technology/${service.slug}`}
                        className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-colors hover:border-brand-sky/50"
                      >
                        <h3 className="font-display text-xl font-medium">{service.title}</h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-royal transition-transform group-hover:translate-x-1 dark:text-brand-sky">
                          Explore {service.navLabel} <ArrowRight className="size-4" />
                        </span>
                      </Link>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* India development center note */}
      <section className="border-t bg-muted/30">
        <Container className="section-y">
          <RevealOnScroll className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                Engineered in-house.
              </span>{" "}
              {siteConfig.name}&apos;s technology and AI work is built by our own engineering team at
              our development center in {siteConfig.locations.development.city}, India — backed by the
              standards and global presence of the {siteConfig.name} group.
            </p>
            <Link
              href="/global-presence"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
            >
              Our global presence
              <ArrowRight className="size-4" />
            </Link>
          </RevealOnScroll>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
