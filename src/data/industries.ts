export type Industry = {
  id: string;
  name: string;
  description: string;
  examples: string[];
};

export const industries: Industry[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    description:
      "We build the software manufacturing operations run on — production and inventory systems, quality dashboards, and AI-assisted document and process workflows.",
    examples: [
      "Production and inventory software",
      "Quality and compliance dashboards",
      "Machine and process data analytics",
      "Robotic cell integration and machine vision",
    ],
  },
  {
    id: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    description:
      "Tracking, documentation, and visibility software for teams that move goods — the systems that keep statuses, documents, and handoffs from degrading across borders and time zones.",
    examples: [
      "Shipment-tracking portals",
      "Documentation automation",
      "Freight and route dashboards",
      "Warehouse robot fleet integration",
    ],
  },
  {
    id: "retail-ecommerce",
    name: "Retail & E-commerce",
    description:
      "Storefront platforms, inventory and catalog systems, and the integrations and automation that keep orders moving from click to doorstep.",
    examples: [
      "E-commerce builds and integrations",
      "Inventory and catalog systems",
      "Order and fulfillment automation",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description:
      "Patient-facing portals, scheduling and records workflows, and AI-assisted document processing — built with privacy and compliance in mind.",
    examples: [
      "Appointment and intake systems",
      "Medical document digitization",
      "Practice operations dashboards",
    ],
  },
  {
    id: "finance-professional",
    name: "Finance & Professional Services",
    description:
      "Automation and AI for document-heavy service firms — accounting, legal, insurance, and consulting teams drowning in repeatable knowledge work.",
    examples: [
      "Document extraction and review AI",
      "Client portals and workflow tools",
      "Reporting and reconciliation automation",
    ],
  },
  {
    id: "construction-real-estate",
    name: "Construction & Real Estate",
    description:
      "Software for the built world — project tracking, bid management, and property operations platforms that replace the load-bearing spreadsheet.",
    examples: [
      "Bid and project management tools",
      "Property listing and CRM platforms",
      "Site reporting and document workflows",
    ],
  },
];
