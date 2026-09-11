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
  { title: "Capabilities", items: footerNav.capabilities },
  { title: "Company", items: footerNav.company },
];

export function Footer() {
  const hq = siteConfig.locations.headquarters;
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
                Global Trade
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

        <div className="grid gap-10 sm:grid-cols-2">
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
              label: aus.label,
              company: `${aus.company} — ${aus.role}`,
              lines: [aus.addressLines[aus.addressLines.length - 1]],
              coords: aus.coordinates.label,
              contact: siteConfig.email.contact,
            },
            {
              label: "Global Trade Desk",
              company: "United States · India · International Markets",
              lines: ["Sourcing, import & export, and logistics", "coordination across trade corridors"],
              coords: "US–India primary corridor",
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
            <span className="block sm:inline">
              A division of {siteConfig.parent.name} —{" "}
              <a
                href={siteConfig.parent.url}
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                coordinatez.com
              </a>
            </span>
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-[var(--ink-panel-muted)] transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            {/* Changing or withdrawing cookie consent has to be reachable from every page.
                It lives here rather than in nav.ts because it reopens the consent banner
                instead of navigating anywhere. */}
            <CookiePreferencesLink className="text-xs text-[var(--ink-panel-muted)] transition-colors hover:text-white" />
          </nav>
        </Container>
      </div>
    </footer>
  );
}
