"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { mainNav } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip — the coordinate motif, doubling as an honest locations line */}
      <div className="hidden border-b border-[var(--ink-panel-border)] bg-[var(--ink-panel)] text-[var(--ink-panel-muted)] lg:block">
        <div className="mx-auto flex h-8 w-full max-w-7xl items-center justify-between px-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] sm:px-6 lg:px-8">
          <span>
            Chicago {siteConfig.locations.headquarters.coordinates.label}
            <span className="mx-3 text-[var(--ink-panel-border)]">|</span>
            Gujarat {siteConfig.locations.development.coordinates.label}
          </span>
          <a
            href={`mailto:${siteConfig.email.contact}`}
            className="transition-colors hover:text-[var(--ink-panel-foreground)]"
          >
            {siteConfig.email.contact}
          </a>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/90 shadow-[0_1px_0_0_var(--border)] backdrop-blur-xl"
            : "border-transparent bg-background/60 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[0.83rem] font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px bg-brand-sky transition-opacity",
                      active ? "opacity-100" : "opacity-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden rounded-full px-4 sm:inline-flex">
              <Link href="/contact">
                Talk to Coordinatez
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                </SheetHeader>
                <nav aria-label="Mobile" className="mt-2 flex flex-col px-4">
                  {[{ label: "Home", href: "/" }, ...mainNav, { label: "Contact", href: "/contact" }].map(
                    (item, i) => {
                      const active =
                        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-baseline gap-3 border-b border-border py-4 font-display text-xl",
                            active ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </Link>
                      );
                    }
                  )}
                  <Button asChild size="lg" className="mt-6 rounded-full">
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      Talk to Coordinatez
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                  <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Chicago · Gujarat · Global Markets
                  </p>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
