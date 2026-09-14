import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { HeroGlobe } from "@/components/three/hero-globe";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="ink-panel relative overflow-hidden">
      <div aria-hidden className="bg-graticule pointer-events-none absolute inset-0 text-white" />
      {/* soft radial glow behind the globe */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 hidden size-[46rem] -translate-y-1/2 rounded-full lg:block"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-sky) 20%, transparent) 0%, transparent 62%)",
        }}
      />

      <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:min-h-[calc(100vh-6.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:py-10">
        <div className="max-w-2xl">
          <RevealOnScroll>
            <p className="eyebrow-on-ink flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Global HQ — Chicago</span>
              <span aria-hidden className="text-[var(--ink-panel-border)]">/</span>
              <span>Development — India</span>
              <span aria-hidden className="text-[var(--ink-panel-border)]">/</span>
              <span>Clients — Worldwide</span>
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <h1 className="mt-6 text-balance font-display text-[2.6rem] font-medium leading-[1.06] text-white sm:text-6xl lg:text-[4.2rem]">
              Software &amp; <span className="text-gradient-sky">AI systems</span> that move
              business <span className="text-gradient-copper">forward</span>.
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.16}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--ink-panel-muted)] sm:text-lg">
              {siteConfig.name} is an IT services &amp; AI solutions company — Chicago-based,
              with our own development center in Gujarat, India. We design, build, and run web
              platforms, custom software, AI integrations, and data systems for startups, SMEs,
              and enterprises.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-6 text-[#10143a] hover:bg-white/90"
              >
                <Link href="/technology">
                  Explore Our Services
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">
                  Talk to Coordinatez
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.32}>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-2 border-t border-[var(--ink-panel-border)] pt-6">
              <div>
                <dt className="eyebrow-on-ink">Engineering</dt>
                <dd className="mt-1.5 text-sm font-medium text-white">
                  Web, Mobile &amp; Custom Software
                </dd>
              </div>
              <div>
                <dt className="eyebrow-on-ink">Intelligence</dt>
                <dd className="mt-1.5 text-sm font-medium text-white">
                  AI Agents, Automation &amp; Data
                </dd>
              </div>
            </dl>
          </RevealOnScroll>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <HeroGlobe />
        </div>
      </Container>
    </section>
  );
}
