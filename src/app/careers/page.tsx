import type { Metadata } from "next";
import { ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll, RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { JsonLd } from "@/components/shared/json-ld";
import { CareerForm } from "@/components/forms/career-form";
import { buildMetadata, breadcrumbJsonLd, jobPostingJsonLd } from "@/lib/seo";
import { openPositions, careerTracks } from "@/data/jobs";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Careers — Build Software & AI That Ships",
  description:
    "Engineering, AI, and business operations roles at Coordinatez, across our Chicago headquarters and our development center in Gujarat, India.",
  path: "/careers",
  keywords: [
    "Coordinatez careers",
    "software engineering jobs Gujarat",
    "AI engineering jobs India",
    "IT jobs Gujarat",
    "technology internships India",
  ],
});

const whyReasons = [
  {
    title: "Real problems, real clients",
    description:
      "One week you're shipping an AI integration for a client; the next you're untangling the workflow their whole operation runs on. The work here goes live for real businesses — it has consequences you can see.",
  },
  {
    title: "Ownership and visibility",
    description:
      "Small teams mean your name is on the work. You'll scope with the people who talk to clients, ship things that go live, and see exactly how what you built performs — no layers between your code and its outcome.",
  },
  {
    title: "Cross-continent collaboration",
    description:
      "Our Chicago headquarters and our India development center work the same problems from both sides of the day. You'll collaborate across US Central Time and India Standard Time as a normal part of how work gets done.",
  },
  {
    title: "Grow with a company still being built",
    description:
      "Coordinatez is early in its story. Processes, tools, and standards are still being shaped — which means the people who join now get to shape them, and the responsibility curve is as steep as you want it to be.",
  },
];

const lifePoints = [
  "Small teams where decisions happen in the room, not three levels above it.",
  "Direct access to leadership — the people setting direction are the people you work with.",
  "Work that ships: client products, AI systems, and internal platforms in real use.",
  "Timezone-flexible collaboration between the US and India, with overlap hours planned rather than improvised.",
];

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
          ]),
          ...openPositions.map((job) =>
            jobPostingJsonLd({
              title: job.title,
              description: job.description,
              datePosted: job.datePosted,
              location: job.location,
              employmentType: job.type,
            })
          ),
        ]}
      />

      {/* Hero */}
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
        <Container className="relative py-20 sm:py-28">
          <RevealOnScroll>
            <p className="eyebrow">Careers at Coordinatez</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              Build a career in software and{" "}
              <span className="text-gradient-sky">AI that ships</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Coordinatez builds software and AI from {siteConfig.locations.development.city},
              with client partnerships coordinated from{" "}
              {siteConfig.locations.headquarters.city}. Join a team small enough that your work is
              visible, working on problems large enough to matter.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="#introduce-yourself">
                  Introduce yourself
                  <ArrowDown className="size-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                <MapPin className="size-3.5" />
                Chicago, USA · Gujarat, India
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Why Coordinatez */}
      <section className="section-y">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Why Coordinatez"
            title="Honest reasons to work here."
            description="We won't list ping-pong tables. Here is what actually makes the work worth doing."
          />
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2">
            {whyReasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                variants={staggerItem}
                className="rounded-lg border bg-card p-6"
              >
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-sky">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* Life at Coordinatez */}
      <section className="border-t bg-muted/30">
        <Container className="section-y">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeading
              index="02"
              eyebrow="Life at Coordinatez"
              title="Small teams. Direct lines. Work that ships."
              description="Day to day, this is a company of practitioners — engineers and operators who would rather solve the problem than schedule a meeting about it."
            />
            <RevealOnScroll delay={0.08} className="lg:pt-2">
              <ul className="space-y-4">
                {lifePoints.map((point) => (
                  <li key={point} className="flex gap-3 text-pretty leading-relaxed">
                    <span aria-hidden className="mt-[0.7rem] h-px w-4 shrink-0 bg-brand-sky" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
                We&apos;d rather under-promise here: we&apos;re a growing company, not a campus. What we can
                offer with certainty is meaningful work, honest feedback, and colleagues on two
                continents who take the craft seriously.
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Career tracks */}
      <section className="section-y border-t">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Career Tracks"
            title="Four ways in."
            description="Whichever track fits, the same rule applies — real projects from the first week."
          />
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {careerTracks.map((track, i) => (
              <motion.div
                key={track.id}
                variants={staggerItem}
                className="rounded-lg border bg-card p-6"
              >
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-sky">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium">{track.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {track.description}
                </p>
              </motion.div>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* Open positions */}
      <section id="open-positions" className="scroll-mt-24 border-t bg-muted/30">
        <Container className="section-y">
          <SectionHeading
            index="04"
            eyebrow="Open Positions"
            title="Current openings."
          />
          <div className="mt-10">
            {openPositions.length === 0 ? (
              <RevealOnScroll>
                <div className="rounded-lg border bg-card p-8 sm:p-10">
                  <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                    Currently, we don&apos;t have any open positions. However, we welcome talented
                    professionals to introduce themselves.
                  </p>
                  <Link
                    href="#introduce-yourself"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                  >
                    Introduce yourself below
                    <ArrowDown className="size-4" />
                  </Link>
                </div>
              </RevealOnScroll>
            ) : (
              <RevealStagger className="grid gap-6 sm:grid-cols-2">
                {openPositions.map((job) => (
                  <motion.article
                    key={job.id}
                    variants={staggerItem}
                    className="rounded-lg border bg-card p-6"
                  >
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-sky">
                      {job.department} · {job.type}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-medium">{job.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {job.description}
                    </p>
                    <p className="mt-4 flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {job.location}
                    </p>
                  </motion.article>
                ))}
              </RevealStagger>
            )}
          </div>
        </Container>
      </section>

      {/* Introduce yourself */}
      <section id="introduce-yourself" className="scroll-mt-24 border-t">
        <Container className="section-y">
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              index="05"
              eyebrow="Introduce Yourself"
              title="Tell us who you are."
              description="Send us your details and resume — PDF or Word — and a note on the kind of work you want to do. We read every submission, and when a role opens that fits your profile, you'll be the first conversation we start."
            />
            <RevealOnScroll delay={0.08} className="mt-10">
              <CareerForm />
            </RevealOnScroll>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Prefer email? Reach our team directly at{" "}
              <a
                href={`mailto:${siteConfig.email.careers}`}
                className="font-medium text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
              >
                {siteConfig.email.careers}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
