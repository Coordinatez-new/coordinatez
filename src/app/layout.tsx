import type { Metadata, Viewport } from "next";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { ChatWidgetLoader } from "@/components/chat/chat-widget-loader";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { JsonLd } from "@/components/shared/json-ld";
import { AnalyticsScripts } from "@/components/shared/analytics-scripts";
import { buildMetadata, organizationJsonLd, localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.metaDescription,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.url),
  // Search engine ownership verification — only rendered once a real code is supplied.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), localBusinessJsonLd()]} />
        <AnalyticsScripts />
        <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
          <TooltipProvider delayDuration={150}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidgetLoader />
            <WhatsAppButton />
            <BackToTop />
            <CookieConsent />
            <Toaster position="bottom-right" richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
