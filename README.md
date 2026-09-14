# Coordinatez — Corporate Website

Production website for **Coordinatez** (coordinatez.com) — a global company operating two
business divisions: **Technology & AI Solutions** and **Global Import & Export**.
Headquartered in Chicago, USA, with technology & development in Gujarat, India (under the
Coorbitz brand).

Built with Next.js App Router (v16), TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion,
and React Three Fiber.

## Highlights

- 12+ pages: Home, About, Technology & AI (13 services), Global Trade, Industries,
  Global Presence, Careers, Contact, Insights (with full articles), Privacy, Terms, 404.
- Interactive 3D globe hero (Three.js / React Three Fiber) with real coordinates for
  Chicago, Gujarat, and global trade hubs — automatic static-SVG fallback for mobile,
  reduced-motion, low-end, and non-WebGL visitors.
- Original editorial design system: Fraunces serif display type, Archivo UI type,
  IBM Plex Mono "coordinate" labels, ink-navy + warm-paper palette from the brand logo,
  sky-blue (Technology) and copper (Global Trade) division accents. Dark mode included.
- Contact & Careers forms: client + server (Zod) validation, honeypot + time-trap +
  optional Cloudflare Turnstile, in-memory rate limiting, Nodemailer delivery with an
  automatic confirmation email to the visitor. Recipients configurable via env vars.
- Full technical SEO: unique per-page metadata, canonical URLs, Open Graph/Twitter cards,
  JSON-LD (Organization, LocalBusiness, Service, FAQ, Article, JobPosting, Breadcrumb),
  sitemap.xml, robots.txt.
- Production security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy, etc.) in
  `next.config.ts`.
- Optional env-gated analytics (GA4, GTM, Clarity, Meta Pixel, LinkedIn Insight Tag) with
  cookie consent.
- Docker (`Dockerfile`, standalone output) and GitHub Actions CI.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in SMTP + optional keys
npm run dev
```

Production build: `npm run build && npm start`.

## Configuration

All company facts (addresses, phones, emails, division copy, social links) live in
`src/data/site.ts`. Form recipients are controlled by `CONTACT_TO_EMAIL` /
`CAREERS_TO_EMAIL` env vars — see `.env.example` for everything configurable.

Content data lives in `src/data/` (services, trade capabilities, industries, insights,
jobs, FAQs, network coordinates). Job listings: add entries to `openPositions` in
`src/data/jobs.ts` — the Careers page and JobPosting schema pick them up automatically.

## Integrity rules

This site deliberately contains **no fabricated** clients, testimonials, awards,
statistics, team bios, or office locations. Market cities shown on the network visuals
are labeled as markets/trade hubs, not offices. Keep it that way when adding content.
