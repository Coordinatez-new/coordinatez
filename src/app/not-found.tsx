import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { buildMetadata } from "@/lib/seo";

// A 404 must not share the homepage's title and description, and must not be
// indexed — otherwise every bad URL competes with the homepage in search.
export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description:
    "This page does not exist. Browse Coordinatez technology and AI services, insights, and contact details, or return to the homepage.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="ink-panel relative flex min-h-[70vh] items-center overflow-hidden">
      <div aria-hidden className="bg-graticule pointer-events-none absolute inset-0 text-white" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-sky) 16%, transparent) 0%, transparent 65%)",
        }}
      />
      <Container className="relative section-y">
        <p className="eyebrow-on-ink">404 — Location Not Found</p>
        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-sky">
          0.0000° N / 0.0000° E — nothing charted here
        </p>
        <h1 className="mt-6 max-w-2xl text-balance font-display text-4xl font-medium leading-[1.1] text-white sm:text-5xl">
          This page has drifted off the map.
        </h1>
        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-[var(--ink-panel-muted)]">
          The coordinates you followed don&apos;t point to anything on our chart. Let&apos;s get
          you back to known waters.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button asChild size="lg" className="rounded-full bg-white px-6 text-[#10143a] hover:bg-white/90">
            <Link href="/">
              Back to home
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/technology">Technology &amp; AI</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/insights">Insights</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
