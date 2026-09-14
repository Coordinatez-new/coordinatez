export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: string;
  datePosted: string;
};

// No fabricated listings — populate this array when real openings exist.
// The careers page automatically renders the open-application state while it is empty.
export const openPositions: Job[] = [];

export const careerTracks = [
  {
    id: "technology",
    title: "Technology Careers",
    description:
      "Frontend, backend, and full-stack engineering, mobile development, QA, and DevOps — building client products and internal platforms from our development center in Gujarat, India.",
  },
  {
    id: "ai",
    title: "AI Careers",
    description:
      "Applied AI engineering: LLM integrations, AI agents and chatbots, automation pipelines, data engineering, and machine-learning solutions delivered into real business workflows.",
  },
  {
    id: "business",
    title: "Business & Operations Careers",
    description:
      "Client partnerships, project coordination, business development, and operations — the people who keep scopes honest, timelines real, and clients informed across our US and India teams.",
  },
  {
    id: "internships",
    title: "Internships",
    description:
      "Hands-on internships for students and early-career professionals in software engineering, AI, and business operations — with real projects and mentorship, not busywork.",
  },
];

export const applicationPositionOptions = [
  "Technology — Engineering",
  "Technology — Design / UX",
  "AI & Data",
  "Business & Operations",
  "Internship",
  "Other / General Application",
];
