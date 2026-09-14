// Central company constants. Update these values to correct or extend company info —
// every page, schema block, and email template reads from here.
export const siteConfig = {
  name: "Coordinatez",
  // Update with the registered legal entity name once provided.
  legalName: "Coordinatez",
  tagline: "Technology That Moves Business Forward.",
  description:
    "Coordinatez is an IT services and AI solutions company headquartered in Chicago, with its own development center in Mehsana, India. We design, build, and run web platforms, mobile apps, custom software, AI integrations, automation, robotics, and data systems for startups, SMEs, and enterprises.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://coordinatez.com",
  keywords: [
    "Coordinatez",
    "IT services",
    "AI solutions",
    "AI integration",
    "custom software development",
    "business automation",
    "AI agents",
    "data analytics",
    "web development company",
    "mobile app development",
    "machine learning solutions",
    "cloud engineering",
    "IT services company USA",
    "AI company Chicago",
    "robotics software development",
    "industrial automation company",
    "robot integration services",
    "machine vision systems",
  ],
  email: {
    // Public-facing addresses — update if the mailbox names differ on the coordinatez.com domain.
    contact: "support@coordinatez.com",
    careers: "info@coordinatez.com",
  },
  phone: {
    us: "+1 (872) 258-2235",
    // Placeholder — replace with the real India business line before launch.
    india: "+91 79905 12345",
  },
  divisions: {
    technology: {
      name: "Coordinatez Technology",
      shortName: "Technology & AI",
      href: "/technology",
      tagline: "Technology That Moves Business Forward.",
      summary:
        "IT services and AI solutions — web, mobile, custom software, AI integration, automation, robotics, data, and cloud — delivered from our development center in India for clients worldwide.",
    },
  },
  // The Global Trade division runs on its own site. This site (www) is the
  // technology practice; the constant below powers the footer link and schema.
  tradeSite: {
    name: "Coordinatez Global Trade",
    url: "https://trade.coordinatez.com",
  },
  locations: {
    headquarters: {
      label: "Global Headquarters",
      company: "Coordinatez",
      role: "Corporate & Client Partnerships",
      city: "Chicago, Illinois",
      country: "United States",
      addressLines: ["8745 W. Higgins Road, Suite 110", "Chicago, IL 60631, USA"],
      coordinates: { lat: 41.9848, lon: -87.8459, label: "41.9848° N / 87.8459° W" },
      mapEmbedSrc:
        "https://www.google.com/maps?q=8745+W+Higgins+Road+Suite+110,+Chicago,+IL+60631&output=embed",
    },
    development: {
      label: "Technology & Development",
      company: "Coordinatez",
      role: "Technology & AI Solutions Division",
      city: "Mehsana, Gujarat",
      country: "India",
      addressLines: ["3rd Floor, Orbit Business Hub", "Mehsana, Gujarat 384002, India"],
      coordinates: { lat: 23.588, lon: 72.3693, label: "23.5880° N / 72.3693° E" },
      mapEmbedSrc: "https://www.google.com/maps?q=Mehsana,+Gujarat,+India&output=embed",
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
