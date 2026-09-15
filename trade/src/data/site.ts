// Central company constants. Update these values to correct or extend company info —
// every page, schema block, and email template reads from here.
export const siteConfig = {
  name: "Coordinatez Global Trade",
  // Update with the registered legal entity name once provided.
  legalName: "Coordinatez",
  tagline: "Connecting Global Markets. Moving Business Forward.",
  description:
    "Coordinatez Global Trade is a US-based international trading company headquartered in Chicago. We export metal and scrap — ferrous and non-ferrous grades, aluminium, and copper — and run end-to-end import/export operations between the United States, India, and global markets.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://trade.coordinatez.com",
  keywords: [
    "Coordinatez Global Trade",
    "scrap metal export",
    "scrap metal exporter USA",
    "aluminium scrap",
    "copper scrap",
    "ferrous and non-ferrous scrap",
    "international trade",
    "global sourcing",
    "commodity trading",
    "import export company USA",
    "US India trade",
    "metal trading",
  ],
  email: {
    // trade@ is a Hostinger alias delivering into the support@coordinatez.com mailbox.
    contact: "trade@coordinatez.com",
    careers: "info@coordinatez.com",
  },
  phone: {
    us: "+1 (872) 258-2235",
    india: "+91 8200688817",
  },
  // Parent company — the trade site cross-links to the corporate/IT site.
  parent: {
    name: "Coordinatez",
    url: "https://www.coordinatez.com",
  },
  locations: {
    headquarters: {
      label: "Global Headquarters",
      company: "Coordinatez",
      role: "Corporate, Global Trade & Client Partnerships",
      city: "Chicago, Illinois",
      country: "United States",
      addressLines: ["8745 W. Higgins Road, Suite 110", "Chicago, IL 60631, USA"],
      coordinates: { lat: 41.9848, lon: -87.8459, label: "41.9848° N / 87.8459° W" },
      mapEmbedSrc:
        "https://www.google.com/maps?q=8745+W+Higgins+Road+Suite+110,+Chicago,+IL+60631&output=embed",
    },
    australia: {
      label: "Australia Office",
      company: "Coordinatez",
      role: "Asia-Pacific",
      city: "Harris Park, NSW",
      country: "Australia",
      addressLines: ["60 Weston St", "Harris Park NSW 2150, Australia"],
      coordinates: { lat: -33.8213, lon: 151.0043, label: "33.8213° S / 151.0043° E" },
      mapEmbedSrc:
        "https://www.google.com/maps?q=60+Weston+St,+Harris+Park+NSW+2150,+Australia&output=embed",
    },
  },
  businessHours: [
    { days: "Monday – Friday", hours: "9:00 AM – 5:00 PM (CT) · 10:00 AM – 6:00 PM (IST)" },
    { days: "Saturday – Sunday", hours: "Closed" },
  ],
  // Add real profile URLs as they are created — the footer only renders entries that exist.
  social: {} as Partial<
    Record<"linkedin" | "twitter" | "facebook" | "instagram" | "github", string>
  >,
} as const;

export type SiteConfig = typeof siteConfig;
