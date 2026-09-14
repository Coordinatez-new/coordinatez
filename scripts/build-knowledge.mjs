// Snapshots the LIVE website for drift diagnosis.
//
//   npm run build:knowledge
//
// NOTE: this script NO LONGER feeds the chatbot. It used to overwrite
// data/company-knowledge.md wholesale from a crawl, which meant the assistant
// mirrored whatever was deployed - stale content and all - and silently ate
// any hand edit. The assistant's knowledge is now generated from this repo's
// own data modules in src/lib/chat-knowledge.ts, with data/company-knowledge.md
// as a hand-authored supplement that nothing overwrites.
//
// What this script is still good for: comparing what production says against
// what the repo says. Run it, then diff data/site-crawl-snapshot.md against the
// repo to spot pages that never got deployed, or facts that drifted.
//
// Crawls only pages on our own domain (respecting robots.txt, with a polite
// delay), strips chrome (nav/footer/scripts/styles), reads structured data from
// JSON-LD (schema.org) markup, and emits:
//
//   data/site-crawl-snapshot.md    – human-readable snapshot of the live site
//   data/site-crawl-snapshot.json  – structured contact fields as published
//
// Neither file is read at runtime. To change what the assistant knows, edit the
// data modules under src/data/ or the supplement in data/company-knowledge.md.
//
// ⚠ warnings are printed for any field that could not be found on the site, so
// missing facts can be filled in manually in the markdown.

import * as cheerio from "cheerio";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = process.env.KNOWLEDGE_ORIGIN || "https://www.coordinatez.com";
const USER_AGENT = "CoordinatezKnowledgeBuilder/1.0 (site-owned build script)";
const DELAY_MS = 1200; // polite gap between requests to our own production site
const MAX_TOKENS = 4000; // soft cap for the markdown (≈ chars / 4)

// Core pages (the brief's home/about/services/contact/FAQ/blog-index mapping).
// Pricing and team pages do not exist on this site — warned about below.
const CORE_PAGES = [
  "/",
  "/about",
  "/technology",
  "/industries",
  "/global-presence",
  "/careers",
  "/insights",
  "/contact",
];

const warnings = [];
const warn = (msg) => {
  warnings.push(msg);
  console.warn(`⚠  ${msg}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(pathname) {
  const url = `${ORIGIN}${pathname}`;
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html" },
    redirect: "follow",
  });
  const html = await res.text();
  if (res.status === 403 || html.includes("Vercel Security Checkpoint")) {
    throw new Error(
      `Blocked by Vercel's bot challenge on ${url}. Wait for the mitigation to expire (Firewall tab shows it) and re-run.`
    );
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return html;
}

// ---------------------------------------------------------------- robots.txt
async function loadRobots() {
  try {
    const res = await fetch(`${ORIGIN}/robots.txt`, {
      headers: { "user-agent": USER_AGENT },
    });
    if (!res.ok) return [];
    const lines = (await res.text()).split("\n");
    const disallows = [];
    let applies = false;
    for (const raw of lines) {
      const line = raw.split("#")[0].trim();
      const [key, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      if (!key || !value) continue;
      const k = key.toLowerCase();
      if (k === "user-agent") applies = value === "*";
      else if (applies && k === "disallow") disallows.push(value);
    }
    return disallows;
  } catch {
    warn("Could not read robots.txt — proceeding with the fixed page list.");
    return [];
  }
}
const isAllowed = (pathname, disallows) =>
  !disallows.some((rule) => rule && pathname.startsWith(rule));

// ------------------------------------------------------------- page parsing
function parsePage(html) {
  const $ = cheerio.load(html);

  // Structured data first — script tags are removed right after.
  const jsonLd = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).text());
      jsonLd.push(...(Array.isArray(parsed) ? parsed : [parsed]));
    } catch {
      /* ignore malformed blocks */
    }
  });

  const title = $("title").first().text().trim();
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() ?? "";

  // Footer text/links (contact details often live here) before stripping it.
  const footerText = $("footer").text().replace(/\s+/g, " ").trim();
  const links = new Set();
  $("a[href]").each((_, el) => links.add($(el).attr("href")));

  // Strip chrome and non-content, keep the main content.
  $("script, style, noscript, svg, iframe, nav, header, footer, [aria-hidden='true']").remove();
  $('[class*="cookie" i], [id*="cookie" i]').remove();
  const mainEl = $("main").length ? $("main") : $("body");
  const headings = [];
  mainEl.find("h1, h2").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t) headings.push(t);
  });
  const text = mainEl.text().replace(/\s+/g, " ").trim();

  return { title, metaDescription, headings, text, jsonLd, footerText, links: [...links] };
}

// Walk all JSON-LD nodes (including @graph) flattened.
function* ldNodes(pages) {
  for (const page of pages.values()) {
    for (const node of page.jsonLd) {
      if (node && Array.isArray(node["@graph"])) yield* node["@graph"];
      else if (node) yield node;
    }
  }
}
const ofType = (node, type) =>
  node["@type"] === type || (Array.isArray(node["@type"]) && node["@type"].includes(type));

function formatAddress(addr) {
  if (!addr || typeof addr !== "object") return null;
  return [addr.streetAddress, addr.addressLocality, addr.addressRegion, addr.postalCode, addr.addressCountry]
    .filter(Boolean)
    .join(", ");
}

// ------------------------------------------------------------------- main
async function main() {
  console.log(`Crawling ${ORIGIN} …`);
  const disallows = await loadRobots();

  const pages = new Map();
  const crawl = async (pathname) => {
    if (pages.has(pathname)) return;
    if (!isAllowed(pathname, disallows)) {
      console.log(`   skipping ${pathname} (robots.txt)`);
      return;
    }
    await sleep(DELAY_MS);
    process.stdout.write(`   ${pathname} … `);
    pages.set(pathname, parsePage(await fetchPage(pathname)));
    console.log("ok");
  };

  for (const p of CORE_PAGES) await crawl(p);

  // Discover service detail pages from the services hub and crawl them for
  // one-line descriptions (their meta description / Service JSON-LD).
  const servicePaths = new Set();
  for (const page of pages.values()) {
    for (const href of page.links) {
      const m = typeof href === "string" && href.match(/^\/technology\/([a-z0-9-]+)$/);
      if (m) servicePaths.add(m[0]);
    }
  }
  for (const p of servicePaths) await crawl(p);

  // ---------------------------------------------------- structured extraction
  const nodes = [...ldNodes(pages)];
  const org = nodes.find((n) => ofType(n, "Organization") && n.address) ?? nodes.find((n) => ofType(n, "Organization"));
  const local = nodes.find((n) => ofType(n, "LocalBusiness"));

  const companyName = org?.name ?? null;
  const legalName = org?.legalName ?? null;
  const tagline = org?.slogan ?? null;
  const description = org?.description ?? pages.get("/")?.metaDescription ?? null;

  // Addresses: HQ + every Place in Organization.location[]
  const addresses = [];
  const hqAddress = formatAddress(local?.address ?? org?.address);
  if (hqAddress) addresses.push({ label: "Headquarters (Chicago)", address: hqAddress });
  for (const place of [].concat(org?.location ?? [])) {
    if (ofType(place, "Place")) {
      const a = formatAddress(place.address);
      if (a && !addresses.some((x) => x.address === a)) addresses.push({ label: place.name ?? "Office", address: a });
    }
  }
  if (addresses.length === 0) warn("No postal address found (JSON-LD Organization/LocalBusiness).");

  // Phone / email from JSON-LD + mailto/tel links.
  const phones = new Set();
  const emails = new Set();
  if (local?.telephone) phones.add(local.telephone);
  if (local?.email) emails.add(local.email);
  for (const cp of [].concat(org?.contactPoint ?? [])) {
    if (cp?.telephone) phones.add(cp.telephone);
    if (cp?.email) emails.add(cp.email);
  }
  for (const page of pages.values()) {
    for (const href of page.links) {
      if (typeof href !== "string") continue;
      if (href.startsWith("mailto:")) emails.add(decodeURIComponent(href.slice(7).split("?")[0]));
      if (href.startsWith("tel:")) phones.add(decodeURIComponent(href.slice(4)));
    }
  }
  // Dedupe phone formats (tel: links vs display text) by digits.
  const phoneList = [];
  for (const p of phones) {
    const digits = p.replace(/\D/g, "");
    if (!phoneList.some((x) => x.replace(/\D/g, "") === digits)) phoneList.push(p);
  }
  phones.clear();
  for (const p of phoneList) phones.add(p);
  if (emails.size === 0) warn("No email address found.");
  if (phones.size === 0) warn("No phone number found.");

  // WhatsApp + social links from anchors.
  let whatsapp = null;
  const social = new Set();
  const socialHosts = ["linkedin.com", "x.com", "twitter.com", "facebook.com", "instagram.com", "github.com", "youtube.com"];
  for (const page of pages.values()) {
    for (const href of page.links) {
      if (typeof href !== "string") continue;
      if (/wa\.me|api\.whatsapp\.com/.test(href)) whatsapp = href;
      if (socialHosts.some((h) => href.includes(h))) social.add(href.split("?")[0]);
    }
  }
  for (const s of [].concat(org?.sameAs ?? [])) social.add(s);
  if (!whatsapp) warn("No WhatsApp link found — fill manually if the business uses one.");
  if (social.size === 0) warn("No social profile links found — fill manually when profiles exist.");

  // Working hours: look for a "Monday … " pattern in page text.
  let hours = [];
  const openingNode = nodes.find((n) => n.openingHoursSpecification || n.openingHours);
  if (openingNode) hours.push(JSON.stringify(openingNode.openingHoursSpecification ?? openingNode.openingHours));
  if (hours.length === 0) {
    for (const page of pages.values()) {
      const m = page.text.match(/Monday\s*[–-]\s*Friday[^.]{0,120}/);
      const w = page.text.match(/Saturday\s*[–-]\s*Sunday[^.A-Z]{0,40}/);
      if (m) {
        hours = [m[0].trim(), ...(w ? [w[0].trim()] : [])];
        break;
      }
    }
  }
  if (hours.length === 0) warn("No working hours found — fill the ## Hours section manually.");

  // Services: hub links + one-liners from each detail page.
  const services = [...servicePaths].sort().map((p) => {
    const page = pages.get(p);
    const ld = page?.jsonLd.find((n) => ofType(n, "Service"));
    const name = ld?.name ?? page?.headings[0] ?? p.split("/").pop();
    const line = ld?.description ?? page?.metaDescription ?? "";
    return { name, path: p, description: line };
  });
  if (services.length === 0) warn("No services discovered from /technology.");

  // FAQ from FAQPage JSON-LD (deduped).
  const faqs = [];
  for (const n of nodes) {
    if (!ofType(n, "FAQPage")) continue;
    for (const q of [].concat(n.mainEntity ?? [])) {
      const question = q?.name?.trim();
      const answer = q?.acceptedAnswer?.text?.trim();
      if (question && answer && !faqs.some((f) => f.question === question)) faqs.push({ question, answer });
    }
  }
  if (faqs.length === 0) warn("No FAQ (FAQPage JSON-LD) found.");

  // Fields the site genuinely does not publish:
  warn("No pricing page exists on the site — pricing stays unanswered by design (bot directs to /contact).");
  warn("No team page exists on the site — team member info must be added manually if wanted.");

  // Page summaries for ## Other (trimmed).
  const summarize = (p, cap = 500) => {
    const page = pages.get(p);
    if (!page) return null;
    const body = page.text.slice(0, cap);
    return `**${p}** — ${page.metaDescription || body}`;
  };

  // ------------------------------------------------------------- outputs
  const md = `# Coordinatez — Company Knowledge Base
<!-- Generated by scripts/build-knowledge.mjs from the live site (${ORIGIN}).
     Hand-edit freely; re-running the script OVERWRITES this file. -->

## Company Overview
- Name: ${companyName ?? "(fill manually)"}${legalName && legalName !== companyName ? ` (legal name: ${legalName})` : ""}
- Tagline: ${tagline ?? "(fill manually)"}
- ${description ?? "(fill manually)"}
- Websites: ${ORIGIN} (IT services & AI). The separate Global Trade division (import/export, metal & scrap) has its own site: https://trade.coordinatez.com — trade questions belong there.

## Contact & Address
${addresses.map((a) => `- ${a.label}: ${a.address}`).join("\n")}
- Email: ${[...emails].join(", ") || "(fill manually)"}
- Phone: ${[...phones].join(", ") || "(fill manually)"}
- WhatsApp: ${whatsapp ?? "(none published on the site)"}
- Social: ${[...social].join(", ") || "(none published on the site)"}
- Contact form: /contact

## Hours
${hours.length ? hours.map((h) => `- ${h}`).join("\n") : "- (fill manually)"}

## Services
${services.map((s) => `- ${s.name} (${s.path}): ${s.description}`).join("\n")}

## FAQ
${faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}

## Other
- Pricing: the site publishes no prices; quotes come from a scoping conversation via /contact.
- Team: the site publishes no individual team member pages.
${["/about", "/industries", "/global-presence", "/careers", "/insights"].map((p) => summarize(p)).filter(Boolean).map((s) => `- ${s}`).join("\n")}
`;

  const json = {
    generatedAt: new Date().toISOString(),
    source: ORIGIN,
    company: { name: companyName, legalName, tagline, description },
    contact: {
      addresses,
      emails: [...emails],
      phones: [...phones],
      whatsapp,
      social: [...social],
      contactPage: "/contact",
    },
    hours,
    services,
    faqCount: faqs.length,
    warnings,
  };

  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  mkdirSync(path.join(root, "data"), { recursive: true });
  writeFileSync(path.join(root, "data", "site-crawl-snapshot.md"), md, "utf8");
  writeFileSync(path.join(root, "data", "site-crawl-snapshot.json"), JSON.stringify(json, null, 2), "utf8");

  const tokens = Math.round(md.length / 4);
  console.log(`\nWrote data/site-crawl-snapshot.md (~${tokens} tokens) and data/site-crawl-snapshot.json`);
  console.log("These are diagnostics only - nothing reads them at runtime.");
  if (tokens > MAX_TOKENS) warn(`Snapshot is ~${tokens} tokens (soft cap ${MAX_TOKENS}) — consider trimming ## Other.`);
  console.log(`${warnings.length} warning(s) above need a human look.`);
}

main().catch((err) => {
  console.error(`\n✖ ${err.message}`);
  process.exit(1);
});
