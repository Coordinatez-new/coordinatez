import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import {
  LinkedInIcon,
  XIcon,
  FacebookIcon,
  InstagramIcon,
  GitHubIcon,
} from "@/components/shared/social-icons";

const socialIconMap = {
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  twitter: { label: "X (Twitter)", Icon: XIcon },
  facebook: { label: "Facebook", Icon: FacebookIcon },
  instagram: { label: "Instagram", Icon: InstagramIcon },
  github: { label: "GitHub", Icon: GitHubIcon },
} as const;
import { CookiePreferencesLink } from "@/components/layout/cookie-preferences-link";
import { footerNav } from "@/data/nav";
import { siteConfig } from "@/data/site";

const columns: { title: string; items: { label: string; href: string }[] }[] = [
  { title: "Technology & AI", items: footerNav.technology },
  { title: "Company", items: footerNav.company },
  { title: "Legal", items: footerNav.legal },
];

export function Footer() {
  const hq = siteConfig.locations.headquarters;
  const dev = siteConfig.locations.development;
  const aus = siteConfig.locations.australia;
  const hasSocial = Object.values(siteConfig.social).some(Boolean);

  return (
    <footer className="ink-panel border-t border-[var(--ink-panel-border)]">
      {/* Brand + columns */}
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo-mark.svg" alt="" width={44} height={44} className="size-11" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl font-semibold text-white">Coordinatez</span>
              <span className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[var(--ink-panel-muted)]">
                IT Services · AI Solutions
              </span>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--ink-panel-muted)]">
            {siteConfig.description}
          </p>
          {hasSocial && (
            <ul className="mt-6 flex gap-3">
              {(
                Object.entries(siteConfig.social) as [keyof typeof socialIconMap, string][]
              ).map(([key, href]) => {
                const social = socialIconMap[key];
                if (!social || !href) return null;
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-full border border-[var(--ink-panel-border)] text-[var(--ink-panel-muted)] transition-colors hover:border-white/40 hover:text-white"
                    >
                      <social.Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--ink-panel-muted)]">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--ink-panel-foreground)]/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Withdrawing or changing cookie consent has to be reachable from every
                    page — it sits with the legal links rather than in nav.ts because it
                    reopens the banner instead of navigating anywhere. */}
                {column.title === "Legal" && (
                  <li>
                    <CookiePreferencesLink className="text-sm text-[var(--ink-panel-foreground)]/80 transition-colors hover:text-white" />
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      {/* Locations strip */}
      <div className="border-t border-[var(--ink-panel-border)]">
        <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              label: hq.label,
              company: hq.company,
              // Footer shows only the city/region line (no street address).
              lines: [hq.addressLines[hq.addressLines.length - 1]],
              coords: hq.coordinates.label,
              contact: siteConfig.phone.us,
            },
            {
              label: dev.label,
              company: `${dev.company} — ${dev.role}`,
              lines: [dev.addressLines[dev.addressLines.length - 1]],
              coords: dev.coordinates.label,
              contact: siteConfig.phone.india,
            },
            {
              label: aus.label,
              company: `${aus.company} — ${aus.role}`,
              lines: [aus.addressLines[aus.addressLines.length - 1]],
              coords: aus.coordinates.label,
              contact: siteConfig.email.contact,
            },
          ].map((loc) => (
            <div key={loc.label}>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand-sky">
                {loc.label}
              </p>
              <p className="mt-3 text-sm font-medium text-white">{loc.company}</p>
              {loc.lines.map((line) => (
                <p key={line} className="text-sm text-[var(--ink-panel-muted)]">
                  {line}
                </p>
              ))}
              <p className="mt-2 font-mono text-[0.62rem] tracking-[0.14em] text-[var(--ink-panel-muted)]">
                {loc.coords}
              </p>
              <p className="mt-1 text-sm text-[var(--ink-panel-foreground)]/80">{loc.contact}</p>
            </div>
          ))}
        </Container>
      </div>

      {/* Legal strip */}
      <div className="border-t border-[var(--ink-panel-border)]">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--ink-panel-muted)]">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="block sm:inline">{siteConfig.tagline}</span>
          </p>
          {/* Quiet pointer to the separate Global Trade division site. */}
          <a
            href={siteConfig.tradeSite.url}
            className="text-xs text-[var(--ink-panel-muted)] transition-colors hover:text-white"
          >
            Global Trade division ↗
          </a>
        </Container>
      </div>
    </footer>
  );
}
