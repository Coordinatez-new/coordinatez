import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { RevealOnScroll, RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { insights } from "@/data/insights";

export const metadata: Metadata = buildMetadata({
  title: "Insights — Writing on AI, Software & Engineering",
  description:
    "Practical writing on AI, software, and engineering from the Coordinatez team — field notes on AI agents, custom software, and getting data ready.",
  path: "/insights",
  keywords: [
    "Coordinatez insights",
    "AI articles for business",
    "custom software insights",
    "AI agents in business",
    "data readiness for AI",
    "engineering blog",
  ],
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function InsightsPage() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
        ]}
      />

      {/* Editorial hero */}
      <section className="border-b">
        <Container className="py-20 sm:py-24">
          <RevealOnScroll>
            <div className="flex items-center gap-3">
              <p className="eyebrow">Insights</p>
              <span aria-hidden className="h-px max-w-24 flex-1 bg-border" />
            </div>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              Field notes from the engineering floor.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Practical writing on AI, software, and engineering from the Coordinatez team.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Article list */}
      <section className="section-y">
        <Container>
          <RevealStagger className="divide-y border-y">
            {sorted.map((post) => (
              <motion.article key={post.slug} variants={staggerItem}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group grid gap-2 py-7 transition-colors sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    <p>{dateFormat.format(new Date(post.date))}</p>
                    <p className="mt-1 text-brand-sky">{post.category}</p>
                  </div>
                  <div>
                    <h2 className="text-balance font-display text-xl font-medium transition-colors group-hover:text-brand-royal dark:group-hover:text-brand-sky sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="hidden size-5 self-center text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground sm:block" />
                </Link>
              </motion.article>
            ))}
          </RevealStagger>
        </Container>
      </section>
    </>
  );
}
