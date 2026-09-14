import type { LandingFaq } from "@/data/seo-types";

export type Service = {
  id: string;
  /** URL slug under /technology/[service] — kept identical to id. */
  slug: string;
  title: string;
  /** Short label used in nav/cards. */
  navLabel: string;
  category: "Build" | "Intelligence" | "Scale" | "Grow" | "Robotics";
  description: string;
  /** <title> for the dedicated landing page. */
  metaTitle: string;
  metaDescription: string;
  /** Extra keyword phrases for this page's metadata (semantic, non-stuffed). */
  keywords: string[];
  /** 1–3 opening paragraphs of genuinely useful, non-generic copy. */
  intro: string[];
  problem: string;
  solution: string;
  technologies: string[];
  benefits: string[];
  useCases: string[];
  faqs: LandingFaq[];
  /** Related service slugs for internal linking. */
  related: string[];
};

export const serviceCategories = [
  { id: "Build", label: "Build", note: "Product & platform engineering" },
  { id: "Intelligence", label: "Intelligence", note: "AI, data & machine learning" },
  { id: "Robotics", label: "Robotics", note: "Robot software, vision & integration" },
  { id: "Scale", label: "Scale", note: "Cloud, APIs & automation" },
  { id: "Grow", label: "Grow", note: "Marketing & search visibility" },
] as const;

export const services: Service[] = [
  {
    id: "ai-integration",
    slug: "ai-integration",
    title: "AI Integration Services",
    navLabel: "AI Integration",
    category: "Intelligence",
    description:
      "Practical integration of large language models and AI services into the products and internal tools you already run.",
    metaTitle: "AI Integration Services USA | Coordinatez Technology",
    metaDescription:
      "AI integration services for US businesses — connect LLMs and AI tools into your existing software with guardrails, evaluation, and cost control. Serving Chicago and the United States.",
    keywords: [
      "AI integration services USA",
      "AI integration company Chicago",
      "LLM integration",
      "enterprise AI integration",
      "AI implementation services",
    ],
    intro: [
      "AI integration is the work of connecting artificial intelligence — usually large language models, but also vision, speech, and forecasting services — into the software your business already depends on. It's rarely the model that's hard. The difficulty is doing it securely, reliably, and at a cost that makes sense, inside a live system that people use every day.",
      "Coordinatez integrates AI where it removes the most manual effort, not where it demos best. We start by finding the workflow that's quietly costing your team hours, then wire in the right model with the plumbing that keeps it trustworthy: evaluation, fallback behavior, monitoring, and hard cost ceilings. The result is an AI feature that lives inside the tool your team already opens — not another dashboard to check.",
    ],
    problem:
      "Teams know AI could remove hours of manual work, but stitching models into real systems — securely, reliably, at sane cost — is where projects stall.",
    solution:
      "We identify the highest-leverage workflows, then integrate the right models with proper guardrails: evaluation, fallback behavior, cost controls, and monitoring.",
    technologies: ["Anthropic Claude", "OpenAI", "LangChain", "Vector databases", "Python", "TypeScript"],
    benefits: [
      "Hours of manual processing reduced to seconds",
      "AI features shipped inside existing tools",
      "Guardrails, evals, and cost monitoring included",
      "Vendor-flexible architecture — no model lock-in",
    ],
    useCases: [
      "Document extraction and summarization",
      "Email and ticket triage",
      "AI-assisted search over company knowledge",
      "Content and proposal drafting",
    ],
    faqs: [
      {
        question: "Do we need to replace our existing software to add AI?",
        answer:
          "No. Most of our AI integration work sits on top of the systems you already run — CRMs, ERPs, ticketing, internal tools — through APIs or lightweight services. Replacing working software is rarely necessary and rarely wise.",
      },
      {
        question: "Which AI models do you work with?",
        answer:
          "We're model-flexible and build vendor-neutral architectures. We commonly work with Anthropic Claude and OpenAI, alongside open models where privacy or cost calls for them. Because we don't lock you to one provider, you can switch as pricing and capability change.",
      },
      {
        question: "How do you control AI cost and accuracy?",
        answer:
          "Every integration ships with usage monitoring, hard cost ceilings, and an evaluation harness that measures accuracy against real examples before and after launch. Where the model is uncertain, work routes to a person rather than guessing.",
      },
    ],
    related: ["ai-agents", "ai-chatbots", "business-automation"],
  },
  {
    id: "ai-agents",
    slug: "ai-agents",
    title: "AI Agents Development",
    navLabel: "AI Agents",
    category: "Intelligence",
    description:
      "Autonomous and semi-autonomous agents that execute multi-step business workflows — researching, deciding, and acting under defined guardrails.",
    metaTitle: "AI Agents Development Company USA | Coordinatez",
    metaDescription:
      "Custom AI agents that run multi-step business workflows end to end — with tools, permissions, and human-approval checkpoints. AI agent development for US businesses.",
    keywords: [
      "AI agents development USA",
      "AI agent development company",
      "autonomous AI agents for business",
      "AI workflow automation",
      "custom AI agents",
    ],
    intro: [
      "An AI agent is different from a chatbot or a single prompt. An agent completes a process: it reads inputs, decides what to do, uses tools to act across your systems, and knows when to hand off to a person. Where single-shot AI helps with tasks, agents take on the multi-step, cross-system work that otherwise lands on your team.",
      "We design agents around explicit tools, permissions, and human-approval checkpoints — so the agent handles the routine 80% of a process and people handle the exceptions. Every action is logged and auditable. That discipline is what separates an agent that survives production from an impressive demo that quietly gets switched off.",
    ],
    problem:
      "Single-prompt AI helps with tasks; it doesn't complete processes. Work that spans systems, steps, and decisions still lands on people.",
    solution:
      "We design agent workflows with clear tools, permissions, and human-approval checkpoints — so agents handle the process and people handle the exceptions.",
    technologies: ["Claude Agent SDK", "MCP", "LangGraph", "Function calling", "Workflow orchestration"],
    benefits: [
      "End-to-end processes handled, not just single tasks",
      "Human-in-the-loop checkpoints where stakes are high",
      "Full audit trail of every agent action",
      "Scales without linear headcount growth",
    ],
    useCases: [
      "Order processing and status chasing",
      "Supplier/lead research and qualification",
      "Report assembly from multiple systems",
      "Back-office data reconciliation",
    ],
    faqs: [
      {
        question: "What's the difference between an AI agent and a chatbot?",
        answer:
          "A chatbot answers questions in a conversation. An agent completes a process — it takes actions across your systems (creating records, sending updates, reconciling data) under defined permissions, and escalates to a person when it should. We build both, and often together.",
      },
      {
        question: "Are AI agents safe to let act on their own?",
        answer:
          "Only within limits you set. We build agents with least-privilege tool access, approval checkpoints before irreversible steps, and a full audit log. The agent handles routine work autonomously; anything risky or ambiguous routes to a human with context attached.",
      },
      {
        question: "What processes are a good fit for an AI agent?",
        answer:
          "Processes that are frequent, rule-heavy, and span multiple systems — order status chasing, document intake, lead qualification, reconciliations. If your team carries information between tools by hand, that's usually where an agent pays off first.",
      },
    ],
    related: ["ai-chatbots", "ai-integration", "business-automation"],
  },
  {
    id: "ai-chatbots",
    slug: "ai-chatbots",
    title: "AI Chatbot Development",
    navLabel: "AI Chatbots",
    category: "Intelligence",
    description:
      "Customer-facing and internal assistants grounded in your real content — answering accurately, escalating gracefully, and available 24/7.",
    metaTitle: "AI Chatbot Development Company USA | Coordinatez",
    metaDescription:
      "AI chatbot development grounded in your real content — accurate answers, honest 'I don't know', clean human handoff, available 24/7 on web, WhatsApp, and Slack.",
    keywords: [
      "AI chatbot development USA",
      "AI chatbot development company",
      "custom AI chatbot",
      "RAG chatbot development",
      "customer support AI chatbot",
    ],
    intro: [
      "A good AI chatbot doesn't make things up. The difference between an assistant that deflects support tickets and one that creates them is grounding: answers built from your actual documentation and policies, with the honesty to say \"I don't know, let me connect you to someone\" instead of inventing a policy that doesn't exist.",
      "Coordinatez builds retrieval-grounded chatbots for customer support and internal helpdesks, deployed where your users already are — your website, WhatsApp, or Slack. Every conversation is logged and analyzable, so you can see what customers actually ask and where the bot should hand off to a human.",
    ],
    problem:
      "Support queues fill with repetitive questions, response times stretch, and legacy rule-based bots frustrate more than they help.",
    solution:
      "Retrieval-grounded assistants trained on your documentation and policies, with honest 'I don't know' behavior and clean hand-off to humans.",
    technologies: ["RAG pipelines", "Anthropic Claude", "Vector search", "WhatsApp/Web/Slack channels"],
    benefits: [
      "Instant answers around the clock",
      "Grounded responses — no invented policies",
      "Deflects repetitive tickets, escalates real issues",
      "Every conversation logged and analyzable",
    ],
    useCases: [
      "Customer support on web and WhatsApp",
      "Internal HR and IT helpdesk",
      "Product selection and pre-sales guidance",
      "Order status and FAQ automation",
    ],
    faqs: [
      {
        question: "How do you stop the chatbot from giving wrong answers?",
        answer:
          "We ground the chatbot in your own documentation using retrieval (RAG), so it answers from your real content rather than the model's general memory. When it can't find a confident answer, it says so and offers a handoff — it doesn't guess.",
      },
      {
        question: "Where can the chatbot be deployed?",
        answer:
          "Wherever your customers already are — embedded on your website, on WhatsApp Business, inside Slack or Microsoft Teams for internal use, or through your existing helpdesk. We match the channel to how your audience actually reaches you.",
      },
      {
        question: "Can it hand conversations to a human?",
        answer:
          "Yes, and it should. We build clean escalation paths that pass the full conversation context to your team, so customers never have to repeat themselves when a real person takes over.",
      },
    ],
    related: ["ai-agents", "ai-integration", "business-automation"],
  },
  {
    id: "custom-software",
    slug: "custom-software",
    title: "Custom Software Development",
    navLabel: "Custom Software",
    category: "Build",
    description:
      "Purpose-built systems for the workflows off-the-shelf software can't handle — ERPs, CRMs, quoting engines, and operational platforms.",
    metaTitle: "Custom Software Development Company USA | Coordinatez",
    metaDescription:
      "Custom software development for US businesses — ERPs, CRMs, quoting engines, and operational platforms built around your actual workflows. Owned code, no per-seat lock-in.",
    keywords: [
      "custom software development USA",
      "custom software development company",
      "enterprise software development",
      "bespoke software development",
      "business software development Chicago",
    ],
    intro: [
      "Custom software is worth building when your business runs on a workflow that off-the-shelf tools can't fit — the way you quote, schedule, track inventory, or price work. Forcing that into generic SaaS means permanent workarounds, and workarounds compound into risk and wasted hours.",
      "We map your actual operations before we write a line of code, then build a system around them: one source of truth, the workflows and permissions your team really uses, and reporting that reflects how you actually run. You own the code outright — no per-seat licensing, no vendor holding your data hostage.",
    ],
    problem:
      "Businesses outgrow spreadsheets and generic SaaS: processes get forced into tools that don't fit, and critical data ends up scattered.",
    solution:
      "We map your actual operations first, then build software around them — a single source of truth with the workflows, permissions, and reports your team really uses.",
    technologies: ["TypeScript", "Node.js", "Python", "PostgreSQL", "Redis", "Docker"],
    benefits: [
      "Software that matches your process, not the reverse",
      "One system of record instead of scattered tools",
      "Owned code — no per-seat license lock-in",
      "Extensible as the business evolves",
    ],
    useCases: [
      "Inventory and order management",
      "Custom CRMs and quoting tools",
      "Logistics & supply-chain operations systems",
      "Compliance and reporting platforms",
    ],
    faqs: [
      {
        question: "When does custom software make more sense than off-the-shelf SaaS?",
        answer:
          "Buy SaaS for problems you share with everyone — accounting, email, payroll. Build custom for the workflow that makes your business different. If your team maintains spreadsheets alongside a tool, or you've bent your process to fit software, that's usually the signal to build.",
      },
      {
        question: "Do we own the code you build?",
        answer:
          "Yes. Engagements deliver source code you own outright, documented and deployable on your own infrastructure. There's no per-seat licensing and no lock-in to us as a vendor.",
      },
      {
        question: "How do you keep a custom build from ballooning in scope?",
        answer:
          "We start with the smallest version that proves value — often a focused pilot around one workflow — then extend from there. Ruthless scoping up front is what keeps custom software affordable and on-time.",
      },
    ],
    related: ["web-development", "api-development", "cloud-solutions", "robotics-software"],
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    navLabel: "Web Development",
    category: "Build",
    description:
      "Fast, secure, search-friendly websites and web applications — from corporate sites and e-commerce to complex customer portals.",
    metaTitle: "Web Development Company USA | Coordinatez Technology",
    metaDescription:
      "Web development company building fast, secure, SEO-ready websites and web applications for US businesses — corporate sites, e-commerce, and customer portals.",
    keywords: [
      "web development company USA",
      "web application development",
      "custom website development",
      "Next.js development company",
      "web development Chicago",
    ],
    intro: [
      "Your website is often the first — and sometimes only — impression a prospect forms of your business. A slow, dated, or hard-to-update site quietly costs credibility and conversions, and every quick fix piles on technical debt that makes the next change harder.",
      "Coordinatez builds modern, component-driven web platforms with performance, accessibility, and technical SEO engineered in from the first commit rather than bolted on later. Whether you need a corporate site your marketing team can update without developers, an e-commerce storefront, or a complex customer portal, the foundation is the same: fast, secure, and built to scale.",
    ],
    problem:
      "A slow, dated, or hard-to-maintain website costs credibility and conversions, and every workaround adds technical debt.",
    solution:
      "We build modern, component-driven web platforms with performance, accessibility, and SEO engineered in from the first commit — not patched on later.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    benefits: [
      "Sub-second page loads and strong Core Web Vitals",
      "Content teams can update without developers",
      "Built-in technical SEO and analytics",
      "Scales from brochure site to full web application",
    ],
    useCases: [
      "Corporate and marketing websites",
      "E-commerce storefronts",
      "Customer and partner portals",
      "Booking and quotation platforms",
    ],
    faqs: [
      {
        question: "Will the website be good for SEO?",
        answer:
          "Yes — we build technical SEO in from the start: server-rendered content, clean semantic markup, fast Core Web Vitals, structured data, and correct metadata. This very website is built to that standard.",
      },
      {
        question: "Can our team update content without a developer?",
        answer:
          "Yes. Where you need editable content, we integrate a content management approach that lets your marketing team publish and edit without touching code, while keeping the site fast and secure.",
      },
      {
        question: "What technologies do you build on?",
        answer:
          "We typically build on Next.js and React with TypeScript — a modern, well-supported stack that delivers fast, SEO-friendly sites. We choose the tools that fit your needs rather than forcing a one-size-fits-all platform.",
      },
    ],
    related: ["mobile-applications", "custom-software", "seo"],
  },
  {
    id: "mobile-applications",
    slug: "mobile-applications",
    title: "Mobile App Development",
    navLabel: "Mobile Apps",
    category: "Build",
    description:
      "Native-quality iOS and Android apps from a single codebase — designed for real usage patterns, offline conditions, and app-store approval.",
    metaTitle: "Mobile App Development Company USA | Coordinatez",
    metaDescription:
      "Mobile app development for iOS and Android from a single codebase — native-quality UX, offline handling, and app-store-ready releases for US businesses.",
    keywords: [
      "mobile app development USA",
      "mobile app development company",
      "iOS and Android app development",
      "React Native development",
      "cross-platform app development",
    ],
    intro: [
      "Maintaining two separate native apps doubles the cost and slows every release, while a mediocre mobile experience quietly loses customers who never come back. The question for most businesses isn't native versus cross-platform in the abstract — it's how to ship a genuinely good app without a two-team budget.",
      "We build cross-platform apps with shared business logic and platform-true UI, so you get native-quality experiences on both iOS and Android from one codebase. Analytics, crash reporting, and a release pipeline come standard, so updates stay frequent and safe after launch — not just at launch.",
    ],
    problem:
      "Maintaining two separate native apps doubles cost and slows every release, while a poor mobile experience quietly loses customers.",
    solution:
      "Cross-platform development with shared business logic and platform-true UI, backed by a release pipeline that keeps updates frequent and safe.",
    technologies: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "GraphQL"],
    benefits: [
      "One codebase, both app stores",
      "Faster release cycles at lower cost",
      "Offline-first data handling where it matters",
      "Analytics and crash reporting wired in from day one",
    ],
    useCases: [
      "Customer-facing service apps",
      "Field-team and workforce tools",
      "Order tracking and delivery apps",
      "Internal operations dashboards",
    ],
    faqs: [
      {
        question: "Do you build native or cross-platform apps?",
        answer:
          "Usually cross-platform (React Native), which delivers native-quality UX on iOS and Android from one codebase at lower cost. Where a feature genuinely needs platform-specific native code, we write it — the two approaches aren't mutually exclusive.",
      },
      {
        question: "Do you handle app store submission?",
        answer:
          "Yes. We manage the build, signing, and submission process for both the Apple App Store and Google Play, and set up the release pipeline so future updates ship smoothly.",
      },
      {
        question: "Will the app work offline?",
        answer:
          "Where it matters for your use case, yes — we build offline-first data handling so field teams and customers can keep working through poor connectivity, with sync when they're back online.",
      },
    ],
    related: ["web-development", "custom-software", "api-development"],
  },
  {
    id: "business-automation",
    slug: "business-automation",
    title: "Business Automation",
    navLabel: "Business Automation",
    category: "Scale",
    description:
      "Connecting the systems you already use and removing the copy-paste work between them — reliably, with error handling and visibility.",
    metaTitle: "Business Automation Services USA | Coordinatez",
    metaDescription:
      "Business process automation for US companies — connect your systems, eliminate copy-paste work, and run reliable workflows with error handling and alerting.",
    keywords: [
      "business automation services USA",
      "business process automation",
      "workflow automation company",
      "process automation Chicago",
      "system integration automation",
    ],
    intro: [
      "As a business grows, the manual handoffs multiply: orders re-keyed from email into an ERP, spreadsheets mailed between departments, the same data typed into three systems that don't talk to each other. Each step is slow, each is a chance for an error, and together they consume hours every week that no one has.",
      "Business automation connects those systems and removes the work between them. We map the process first, then automate it end-to-end with the parts that matter in production — queues, retries, and alerting — so automations keep working when an API hiccups instead of silently dropping a record. The goal isn't a clever script; it's a reliable process your team can trust and see.",
    ],
    problem:
      "Growth multiplies manual handoffs: re-keyed orders, emailed spreadsheets, swivel-chair work between tools — each one slow and error-prone.",
    solution:
      "We map the process, then automate it end-to-end with proper queues, retries, and alerting — so automations keep working when an API hiccups.",
    technologies: ["n8n", "Make", "Zapier", "Custom Node.js services", "Webhooks", "Message queues"],
    benefits: [
      "Hours of repetitive work eliminated weekly",
      "Fewer data-entry errors between systems",
      "Processes documented as living workflows",
      "Failures alert someone instead of silently dropping",
    ],
    useCases: [
      "Quote-to-invoice pipelines",
      "CRM ↔ accounting ↔ inventory sync",
      "Document generation and filing",
      "Onboarding and approval workflows",
    ],
    faqs: [
      {
        question: "What processes are worth automating first?",
        answer:
          "Start with work that is frequent, rule-based, and annoying — order entry, invoice generation, syncing data between your CRM and accounting. We measure the hours a process consumes today so the return on automating it is clear before we build.",
      },
      {
        question: "What happens when an automation fails?",
        answer:
          "Production automation needs to fail loudly, not silently. We build in retries for transient errors and alerting for real ones, so a failure notifies someone with context instead of quietly dropping a record. That reliability is the difference between an automation you trust and one you don't.",
      },
      {
        question: "Do you use no-code tools or custom code?",
        answer:
          "Both, matched to the job. Tools like n8n, Make, and Zapier are fast and cost-effective for standard integrations; custom services make sense for complex logic or high volume. We choose based on reliability and total cost, not ideology.",
      },
    ],
    related: ["ai-agents", "ai-integration", "api-development", "industrial-automation"],
  },
  {
    id: "data-analytics",
    slug: "data-analytics",
    title: "Data Analytics",
    navLabel: "Data Analytics",
    category: "Intelligence",
    description:
      "Turning scattered operational data into dashboards and reports leadership actually uses to decide.",
    metaTitle: "Data Analytics Services USA | Coordinatez Technology",
    metaDescription:
      "Data analytics services that turn scattered operational data into trustworthy dashboards and reports — one agreed version of the numbers, refreshed automatically.",
    keywords: [
      "data analytics services USA",
      "business intelligence company",
      "data analytics consulting",
      "dashboard development",
      "data analysis services Chicago",
    ],
    intro: [
      "Most businesses already have the numbers they need — scattered across an ERP, a dozen spreadsheets, and various SaaS exports. The problem is trust and effort: assembling a defensible monthly picture takes days, and once it's done, someone still questions whether the figures agree.",
      "We consolidate your sources into a governed data model with automated refresh, then build dashboards around the decisions each team actually makes. The outcome is one agreed version of the numbers, drillable from a top-line KPI down to the underlying transaction — reports that refresh themselves instead of eating an analyst's week.",
    ],
    problem:
      "The numbers exist — across ERPs, spreadsheets, and SaaS exports — but assembling a trustworthy monthly picture takes days and still gets questioned.",
    solution:
      "We consolidate sources into a governed data model with automated refresh, then build dashboards around the decisions each team makes.",
    technologies: ["Python", "SQL", "dbt", "BigQuery/PostgreSQL", "Power BI", "Metabase"],
    benefits: [
      "One agreed version of the numbers",
      "Reports refresh themselves",
      "Drill-down from KPI to transaction",
      "Foundation ready for ML when you are",
    ],
    useCases: [
      "Sales and margin dashboards",
      "Logistics and supply-chain KPI tracking",
      "Inventory and demand reporting",
      "Finance close automation",
    ],
    faqs: [
      {
        question: "Do we need a data warehouse to get useful dashboards?",
        answer:
          "Not always. For smaller data volumes we can build governed reporting directly on your existing databases. As volume and the number of sources grow, a lightweight warehouse pays for itself — we recommend the simplest setup that gives you trustworthy, automated reporting.",
      },
      {
        question: "How is this different from the reports our tools already produce?",
        answer:
          "Built-in tool reports show one system's view. The value of dedicated analytics is combining sources into one agreed picture — sales, inventory, finance, operations — with definitions everyone accepts, so leadership stops arguing about whose number is right.",
      },
      {
        question: "Is this a foundation for AI and machine learning later?",
        answer:
          "Yes. A clean, governed data model is exactly what predictive models need. Good analytics work pays off immediately in better reporting and again later if you choose to build forecasting or ML on top of it.",
      },
    ],
    related: ["machine-learning", "ai-integration", "business-automation", "warehouse-robotics"],
  },
  {
    id: "machine-learning",
    slug: "machine-learning",
    title: "Machine Learning Solutions",
    navLabel: "Machine Learning",
    category: "Intelligence",
    description:
      "Predictive models for forecasting, classification, and anomaly detection — built pragmatically and only where they beat simpler methods.",
    metaTitle: "Machine Learning Solutions USA | Coordinatez Technology",
    metaDescription:
      "Machine learning solutions for forecasting, classification, and anomaly detection — deployed with monitoring and retraining. Built only where ML beats simpler methods.",
    keywords: [
      "machine learning solutions USA",
      "machine learning development company",
      "predictive analytics services",
      "ML model development",
      "AI/ML solutions",
    ],
    intro: [
      "Machine learning earns its place when a decision — pricing, demand, churn, risk — relies on patterns hidden in your history that no rule captures well. It's the wrong tool when a simple heuristic would do, and plenty of ML pilots fail precisely because they were solutions in search of a problem.",
      "We start from the decision, not the algorithm, and validate any model against an honest baseline before recommending it. When ML genuinely wins, we deploy it as a production system with monitoring for drift and a retraining plan — not a notebook that grows stale the week after it's demoed. And when a simpler method would serve you better, we'll say so.",
    ],
    problem:
      "Pricing, demand, churn, and risk decisions rely on gut feel because historical data sits unused — or past ML pilots never left the notebook.",
    solution:
      "We start with the decision, validate against honest baselines, and deploy models with monitoring and retraining — production systems, not experiments.",
    technologies: ["Python", "scikit-learn", "PyTorch", "MLflow", "Vertex AI / SageMaker"],
    benefits: [
      "Forecasts grounded in your own history",
      "Models monitored for drift after launch",
      "Clear accuracy reporting vs. baseline",
      "No ML for ML's sake — we'll say when it's overkill",
    ],
    useCases: [
      "Demand and price forecasting",
      "Lead and credit scoring",
      "Anomaly detection in transactions",
      "Quality prediction in operations",
    ],
    faqs: [
      {
        question: "How much data do we need for machine learning?",
        answer:
          "It depends on the problem, but the honest answer is often 'less than you fear, but cleaner than you have.' We assess your data early and will tell you plainly whether there's enough signal to justify a model — or whether the first job is cleaning up the data.",
      },
      {
        question: "How do you know a model is actually working?",
        answer:
          "We measure every model against a simple baseline and report accuracy in business terms, not just statistics. After launch we monitor for drift — the slow decay in accuracy as the world changes — and retrain on a schedule so performance holds.",
      },
      {
        question: "What if machine learning is overkill for our problem?",
        answer:
          "We'll tell you. Plenty of problems are solved better and cheaper by good analytics or a clear rule. We'd rather recommend the simpler solution and keep your trust than sell an ML project that shouldn't exist.",
      },
    ],
    related: ["data-analytics", "ai-integration", "ai-agents", "robotic-vision"],
  },
  {
    id: "cloud-solutions",
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    navLabel: "Cloud Solutions",
    category: "Scale",
    description:
      "Cloud architecture, migration, and DevOps — infrastructure that scales with demand and doesn't page you at 3 a.m.",
    metaTitle: "Cloud Solutions & DevOps Services USA | Coordinatez",
    metaDescription:
      "Cloud solutions for US businesses — architecture, migration, and DevOps on AWS, Google Cloud, and Azure. Infrastructure that scales with demand and controls cost.",
    keywords: [
      "cloud solutions USA",
      "cloud migration services",
      "DevOps services company",
      "AWS consulting",
      "cloud infrastructure services",
    ],
    intro: [
      "Aging servers, fragile deployments, and surprise cloud bills usually trace back to infrastructure decisions made years ago that now slow every release. Cloud done well is boring in the best way: deployments become routine, costs are visible per workload, and the system scales up for peaks and down for quiet weeks without anyone paged at 3 a.m.",
      "We design right-sized cloud architecture with infrastructure-as-code, CI/CD, monitoring, and cost governance — on AWS, Google Cloud, or Azure. Whether you're migrating off legacy servers or tightening an existing cloud setup, the aim is reliable, documented infrastructure that your team can operate with confidence.",
    ],
    problem:
      "Aging servers, fragile deployments, and surprise cloud bills — infrastructure decisions made years ago now slow every release.",
    solution:
      "Right-sized cloud architecture with infrastructure-as-code, CI/CD, monitoring, and cost governance — boring, reliable, and documented.",
    technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
    benefits: [
      "Deployments become routine, not events",
      "Costs visible and controlled per workload",
      "Security and backups by default",
      "Scales up for peaks, down for quiet weeks",
    ],
    useCases: [
      "Legacy-to-cloud migration",
      "CI/CD pipeline setup",
      "High-availability hosting",
      "Disaster-recovery design",
    ],
    faqs: [
      {
        question: "Which cloud provider should we use?",
        answer:
          "The one that fits your workload, team, and existing commitments — usually AWS, Google Cloud, or Azure. We're provider-neutral and will recommend based on your actual needs and cost, not a partnership incentive.",
      },
      {
        question: "Can you help control our cloud costs?",
        answer:
          "Yes — surprise bills are one of the most common reasons clients call us. We right-size resources, add per-workload cost visibility, and set governance so spend stays predictable and tied to what each part of the business actually uses.",
      },
      {
        question: "Can you migrate us without downtime?",
        answer:
          "In most cases, yes. We plan migrations in stages with rollback paths and test thoroughly before cutover, minimizing or eliminating downtime depending on your system's architecture.",
      },
    ],
    related: ["custom-software", "api-development", "business-automation"],
  },
  {
    id: "api-development",
    slug: "api-development",
    title: "API Development",
    navLabel: "API Development",
    category: "Scale",
    description:
      "Well-documented REST and GraphQL APIs that let your systems, partners, and products talk to each other safely.",
    metaTitle: "API Development Services USA | Coordinatez Technology",
    metaDescription:
      "API development services — versioned, authenticated, well-documented REST and GraphQL APIs that let your systems, partners, and products integrate safely.",
    keywords: [
      "API development services USA",
      "REST API development",
      "GraphQL API development",
      "API integration company",
      "backend development services",
    ],
    intro: [
      "Data locked inside one system can't power the next product, partner integration, or mobile app — and the ad-hoc integrations teams build to work around that tend to break at the worst moment. A well-designed API is the stable contract everything else builds on.",
      "We design versioned, authenticated, rate-limited APIs with documentation your partners can actually onboard from — no meetings required. Whether it's a backend for your own apps, an integration surface for partners, or a public developer API, we build the auth, quotas, and audit logging in from the start so the API stays reliable as usage grows.",
    ],
    problem:
      "Data locked in one system can't power the next product, partner integration, or mobile app — and ad-hoc integrations keep breaking.",
    solution:
      "We design versioned, authenticated, rate-limited APIs with real documentation — the stable contract everything else builds on.",
    technologies: ["Node.js", "REST", "GraphQL", "OpenAPI", "OAuth 2.0", "API gateways"],
    benefits: [
      "One integration surface instead of point-to-point glue",
      "Partners onboard from docs, not meetings",
      "Auth, quotas, and audit logging built in",
      "Versioning prevents breaking downstream apps",
    ],
    useCases: [
      "Partner and supplier integrations",
      "Mobile/web backend APIs",
      "Internal service architecture",
      "Public developer APIs",
    ],
    faqs: [
      {
        question: "REST or GraphQL — which should we use?",
        answer:
          "It depends on how the API will be consumed. REST is simple and cache-friendly for straightforward resources; GraphQL shines when clients need flexible, precise queries across related data. We'll recommend based on your consumers, not fashion.",
      },
      {
        question: "Can you build on top of our existing systems?",
        answer:
          "Yes. Much API work is exposing data that's already locked inside existing databases and services through a clean, secure, documented interface — without replacing what works underneath.",
      },
      {
        question: "How do you keep APIs secure?",
        answer:
          "Every API ships with authentication (typically OAuth 2.0 or API keys), rate limiting to prevent abuse, input validation, and audit logging. Versioning ensures changes don't break the apps and partners depending on you.",
      },
    ],
    related: ["custom-software", "cloud-solutions", "business-automation"],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    navLabel: "Digital Marketing",
    category: "Grow",
    description:
      "Measurable acquisition across search, social, and email — strategy, campaigns, and analytics tied to revenue, not vanity metrics.",
    metaTitle: "Digital Marketing Services USA | Coordinatez Technology",
    metaDescription:
      "Digital marketing services tied to revenue, not vanity metrics — full-funnel tracking, search, social, and email campaigns optimized against cost per acquisition.",
    keywords: [
      "digital marketing services USA",
      "B2B digital marketing agency",
      "performance marketing company",
      "PPC management services",
      "digital marketing Chicago",
    ],
    intro: [
      "Ad spend has a way of dispersing across channels with no clear picture of what actually produces customers — so budgets get set by habit and last year's numbers rather than evidence. The fix isn't more spend; it's measurement.",
      "We set up full-funnel tracking first, then run campaigns optimized against cost-per-acquisition across search, social, and email. Reporting is in business terms — leads and sales, not impressions and likes — so you can see exactly what each channel returns and shift budget to what demonstrably works.",
    ],
    problem:
      "Ad spend disperses across channels with no clear picture of what actually produces customers — so budgets get set by habit.",
    solution:
      "Full-funnel tracking first, then campaigns optimized against cost-per-acquisition — with reporting that shows exactly what each channel returns.",
    technologies: ["Google Ads", "Meta Ads", "LinkedIn Ads", "GA4", "Tag Manager", "Email automation"],
    benefits: [
      "Every campaign measured to lead or sale",
      "Budget shifts to what demonstrably works",
      "Landing pages and creative tested, not guessed",
      "Monthly reporting in business terms",
    ],
    useCases: [
      "B2B lead generation",
      "E-commerce sales campaigns",
      "Product and service launches",
      "Remarketing programs",
    ],
    faqs: [
      {
        question: "How do you measure whether marketing is working?",
        answer:
          "We track the full funnel from click to lead to sale, so reporting is in terms that matter — cost per acquisition and return on spend, not impressions. That's what lets us move budget toward what actually produces customers.",
      },
      {
        question: "Do you handle both strategy and execution?",
        answer:
          "Yes. We set the strategy, build the tracking, run the campaigns, and report on them. Because we also build websites and analytics, the marketing connects cleanly to the site and data underneath it.",
      },
      {
        question: "Is this a good fit for B2B?",
        answer:
          "Yes — much of our marketing work is B2B lead generation, where longer sales cycles make accurate tracking and lead quality more important than raw volume. We optimize for qualified pipeline, not just clicks.",
      },
    ],
    related: ["seo", "web-development", "data-analytics"],
  },
  {
    id: "seo",
    slug: "seo",
    title: "SEO Services",
    navLabel: "SEO",
    category: "Grow",
    description:
      "Technical and content SEO that compounds — earning the searches your customers already make, month after month.",
    metaTitle: "SEO Services USA | Technical & Content SEO | Coordinatez",
    metaDescription:
      "SEO services for US businesses — technical foundation, intent-mapped content, and authority building that compounds. Rank for the buying-intent searches customers already make.",
    keywords: [
      "SEO services USA",
      "SEO company",
      "technical SEO services",
      "B2B SEO agency",
      "SEO services Chicago",
    ],
    intro: [
      "Paid ads stop the moment you stop spending. SEO is the opposite: done well, it compounds, earning the searches your customers already make month after month. The catch is that it rewards consistency and technical rigor, which is exactly where most efforts fall short.",
      "We work in three layers — a clean technical foundation, content mapped to real search intent, and steady authority building — and report against rankings, traffic, and leads rather than vanity metrics. This website is itself built to the standard we deliver: server-rendered, fast, structured, and semantically organized around clear topics.",
    ],
    problem:
      "Competitors own the first page for the exact services you sell, while paid ads are the only thing keeping the pipeline alive.",
    solution:
      "Technical foundation, intent-mapped content, and authority building — executed consistently and reported against rankings, traffic, and leads.",
    technologies: ["Technical audits", "Schema markup", "Core Web Vitals", "Content strategy", "Search Console"],
    benefits: [
      "Traffic that compounds instead of stopping with spend",
      "Rankings for buying-intent queries",
      "Site health issues found before Google penalizes",
      "Transparent monthly movement reports",
    ],
    useCases: [
      "Local and national service SEO",
      "E-commerce category rankings",
      "Site-migration SEO protection",
      "International/multilingual SEO",
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Technical fixes can move things in weeks; content and authority building typically show meaningful results over three to six months and compound from there. Anyone promising first-page rankings in days is selling something that won't last.",
      },
      {
        question: "What does your SEO work actually include?",
        answer:
          "Three layers: technical SEO (site health, speed, structured data, crawlability), content mapped to what your customers search, and steady authority building. We report against rankings, organic traffic, and leads — not vanity metrics.",
      },
      {
        question: "Can you help with local SEO for Chicago?",
        answer:
          "Yes. Local SEO combines an optimized Google Business Profile, consistent business listings, location-relevant content, and local schema. We can build the local signals that help you show up for 'near me' and city-specific searches.",
      },
    ],
    related: ["digital-marketing", "web-development", "data-analytics"],
  },
  {
    id: "robotics-software",
    slug: "robotics-software",
    title: "Robotics Software & Control Systems",
    navLabel: "Robotics Software",
    category: "Robotics",
    description:
      "Application, control, and simulation software for robots — ROS 2 stacks, task logic, and the operator tooling that makes a cell usable by the people running it.",
    metaTitle: "Robotics Software Development | Coordinatez Technology",
    metaDescription:
      "Robotics software development — ROS 2 application and control stacks, motion planning, simulation, and operator interfaces. Hardware-neutral engineering from Chicago and our India development center.",
    keywords: [
      "robotics software development",
      "ROS 2 development company",
      "robot control software",
      "robotics simulation services",
      "custom robotics software",
    ],
    intro: [
      "Robotics software is the layer between a robot that can move and a robot that does useful work. The arm, the drive base, and the controller usually arrive capable. What's missing is everything around them: the task logic, the recovery behavior when a part arrives misplaced, the interface the operator actually touches, and the integration that tells the robot what today's production order is.",
      "Coordinatez builds that layer. We work in ROS 2 and vendor SDKs, validate behavior in simulation before anything runs on real hardware, and treat the operator interface as a deliverable rather than a debug screen that shipped by accident. Our robotics practice is new; the engineering discipline behind it — testing, CI, observability, code another team can pick up — is not.",
    ],
    problem:
      "Robot hardware arrives capable but inert. The gap between a working demo and a cell that runs an unattended shift is task logic, error recovery, and operator tooling — and that is exactly where most robotics projects stall.",
    solution:
      "We build the application and control layer in ROS 2 or the vendor SDK, prove it in simulation before hardware time is spent, and ship it with the operator interface, logging, and integration hooks needed to actually run it in production.",
    technologies: ["ROS 2", "Python", "C++", "Gazebo / Isaac Sim", "MoveIt", "OPC UA / MQTT", "Docker"],
    benefits: [
      "Behavior validated in simulation before hardware time is spent",
      "Operator interfaces designed for the shop floor, not the lab",
      "Error and recovery paths specified up front, not patched after",
      "Documented, tested code — handover to your own team stays possible",
    ],
    useCases: [
      "Pick-and-place task logic for a new or re-purposed cell",
      "Motion planning and collision avoidance in constrained workspaces",
      "Operator HMI and teach interfaces",
      "Simulation environments for testing ahead of commissioning",
      "Robot and cell telemetry logged into your existing dashboards",
    ],
    faqs: [
      {
        question: "Do you supply the robot hardware?",
        answer:
          "No. We work with the robot you have chosen, or help you evaluate options against the task before you buy. Staying hardware-neutral means our recommendation is not shaped by a reseller margin.",
      },
      {
        question: "Is robotics a new practice for Coordinatez?",
        answer:
          "Yes, and we would rather say so than imply otherwise. Robotics is a new practice built on an existing engineering and AI team — the same people who ship production software and machine-learning systems. First engagements are deliberately structured to de-risk that: a scoped pilot with defined acceptance criteria, simulation-first validation, and no long commitment before the approach is proven on your parts.",
      },
      {
        question: "Can our own engineers maintain what you build?",
        answer:
          "That is the intent. We write against standard frameworks rather than private abstractions, document the architecture, and include handover as a scoped phase. If you would rather we keep running it, we can — but it should be a choice, not a lock-in.",
      },
    ],
    related: ["robotic-vision", "industrial-automation", "custom-software"],
  },
  {
    id: "industrial-automation",
    slug: "industrial-automation",
    title: "Industrial Automation & Robot Integration",
    navLabel: "Industrial Automation",
    category: "Robotics",
    description:
      "Bringing robots and automation into an existing production line — cell scoping, controls and PLC integration, and the connection back to your MES, ERP, and reporting.",
    metaTitle: "Industrial Automation & Robot Integration | Coordinatez Technology",
    metaDescription:
      "Industrial automation and robot integration — cell scoping, PLC and controls software, MES and ERP integration, and commissioning coordinated with licensed integration partners.",
    keywords: [
      "industrial automation services",
      "robot integration company",
      "PLC programming services",
      "manufacturing automation integration",
      "robotic cell integration",
    ],
    intro: [
      "A robot bought in isolation becomes an island. The arm is rarely the expensive part — the cost sits in fixturing, controls, line integration, and the safety work that lets a machine run next to people. Plenty of capable robots sit idle in plants because that surrounding work was never scoped.",
      "We scope the cell end to end and build the controls and integration software that connects it to the rest of the plant — PLC logic, line data, and the link back to your MES or ERP so production numbers leave the controller and reach the people who make decisions. On-site commissioning is delivered together with a licensed integration partner, and safety validation is performed and signed off by a qualified party. We state that split in writing before work starts, because ambiguity about who owns safety is how people get hurt.",
    ],
    problem:
      "A robot delivers nothing until it is integrated — fixturing, controls, line data, and safety sign-off. Projects stall when that surrounding scope is discovered after the hardware has been bought.",
    solution:
      "We scope the cell against your real takt time and part mix, build the controls and integration software, connect the line to your MES or ERP, and coordinate commissioning with a licensed integration partner under a written split of responsibility.",
    technologies: [
      "Siemens & Allen-Bradley PLC",
      "OPC UA",
      "Modbus / EtherNet-IP",
      "SCADA & HMI",
      "MES / ERP integration",
      "Python",
    ],
    benefits: [
      "Cell scoped against your actual takt time and part mix",
      "Safety scope assigned and documented before build begins",
      "Line data flowing into your MES/ERP instead of stranded in the controller",
      "Integration-partner coordination handled rather than left to you",
    ],
    useCases: [
      "Robotic palletising or pick-and-place on an existing line",
      "Machine tending and part transfer",
      "PLC-to-ERP data integration and production reporting",
      "Retrofitting an idle robot to a new part family",
      "Controls and HMI modernisation on ageing equipment",
    ],
    faqs: [
      {
        question: "Do you perform the on-site installation yourselves?",
        answer:
          "We deliver the scoping, controls, and integration software, and we are on site for commissioning. The mechanical installation and electrical work are delivered with a licensed integration partner local to your plant. You get one scope and one point of contact; the regulated work is done by parties licensed to do it.",
      },
      {
        question: "Who is responsible for machine safety?",
        answer:
          "Risk assessment and safety validation are performed and certified by a qualified safety party, named in the contract before work begins. We build to the resulting safety requirements and will not design around them. If a proposed change affects the safety case, it goes back for re-assessment rather than being absorbed quietly.",
      },
      {
        question: "Can you work with a robot we already own?",
        answer:
          "Often, yes — re-purposing an idle robot to a new part family is one of the more economical automation projects available. The honest answer depends on reach, payload, and controller age, which we assess before proposing anything.",
      },
    ],
    related: ["robotics-software", "robotic-vision", "business-automation"],
  },
  {
    id: "robotic-vision",
    slug: "robotic-vision",
    title: "Robotic Vision & Perception",
    navLabel: "Robotic Vision",
    category: "Robotics",
    description:
      "Vision systems that let a robot find, identify, and inspect parts — pose estimation, defect detection, and explicit handling of the cases the model is unsure about.",
    metaTitle: "Robotic Vision & Machine Vision Systems | Coordinatez Technology",
    metaDescription:
      "Robotic vision and perception systems — bin-picking pose estimation, surface defect detection, and inspection, with accuracy measured on your parts and defined low-confidence behavior.",
    keywords: [
      "robotic vision systems",
      "machine vision inspection",
      "bin picking vision",
      "AI defect detection manufacturing",
      "computer vision for robotics",
    ],
    intro: [
      "Vision is what separates a robot repeating a fixed path from one that handles the real world, where parts arrive rotated, overlapping, dusty, and occasionally wrong. A vision system has to answer three questions reliably: what is this, where exactly is it, and is it acceptable.",
      "The third question is where most projects get uncomfortable. A model that is 97% accurate is also wrong roughly once every thirty-three parts, and what happens on that part matters more than the headline number. We build vision with the confidence threshold, the reject path, and the human escalation designed in from the start, and we measure accuracy against your parts and your lighting rather than a benchmark dataset that flatters everyone.",
    ],
    problem:
      "Vision demos succeed on clean parts in good light. Production has glare, dust, overlap, and the variant nobody photographed — and a system with no defined behavior for uncertainty will confidently do the wrong thing.",
    solution:
      "We build perception against your actual parts and lighting, define the confidence threshold and reject path explicitly, and ship an evaluation harness so accuracy is measured over time rather than asserted once.",
    technologies: [
      "OpenCV",
      "PyTorch",
      "Segmentation & detection models",
      "2D and 3D cameras",
      "Point-cloud processing",
      "NVIDIA Jetson",
      "TensorRT / ONNX",
    ],
    benefits: [
      "Accuracy measured on your parts, with the test set kept and re-runnable",
      "Explicit low-confidence behavior — stop and escalate, never guess",
      "Runs at line speed on edge hardware, with no cloud round-trip",
      "A defined retraining path for when the part mix changes",
    ],
    useCases: [
      "Bin picking and pose estimation for unstructured parts",
      "Surface defect and finish inspection",
      "Label, print, and barcode verification",
      "Dimensional and tolerance checks",
      "Assembly presence and absence verification",
    ],
    faqs: [
      {
        question: "How much training data do you need?",
        answer:
          "Less than most people expect for classification, more than most expect for rare defects — you cannot learn a defect you have almost no examples of. We assess this before committing to an approach, and where examples are scarce we will say so and propose a rules-based or hybrid method rather than a model that looks confident and is not.",
      },
      {
        question: "What happens when the system is not sure?",
        answer:
          "It stops and escalates. Every system we build has an explicit confidence threshold and a defined reject path, agreed with you during scoping. A vision system that guesses under uncertainty is worse than no vision system, because it removes the human who would have caught it.",
      },
      {
        question: "Do the images leave our facility?",
        answer:
          "Not unless you want them to. Inference runs on edge hardware in your plant. Training data handling is agreed in writing, and on-premises training is available where images are sensitive.",
      },
    ],
    related: ["machine-learning", "robotics-software", "data-analytics"],
  },
  {
    id: "warehouse-robotics",
    slug: "warehouse-robotics",
    title: "Warehouse Robotics & Fleet Software",
    navLabel: "Warehouse Robotics",
    category: "Robotics",
    description:
      "The software layer over warehouse robots — fleet orchestration, WMS and ERP integration, and the operations visibility that shows whether the fleet is earning its cost.",
    metaTitle: "Warehouse Robotics & AMR Fleet Software | Coordinatez Technology",
    metaDescription:
      "Warehouse robotics software — AMR fleet orchestration, WMS and ERP integration, task allocation tuned to your order profile, and throughput reporting you can act on.",
    keywords: [
      "warehouse robotics software",
      "AMR fleet management software",
      "warehouse automation integration",
      "WMS robotics integration",
      "AGV fleet orchestration",
    ],
    intro: [
      "Most disappointment with warehouse robotics is not a robot problem. The AMRs work. What is missing is the layer above them: task allocation that understands your pick priorities, integration with the WMS that already runs the floor, and a view of throughput honest enough to tell you whether the fleet is paying for itself.",
      "That layer is software, and it is the work we do. We integrate with the fleet manager your vendor supplies rather than trying to replace it, connect it to your WMS or ERP, and build the operations view your floor supervisors and your finance team each need — in our experience two different screens, not one compromise.",
    ],
    problem:
      "Fleets are bought on a vendor demo, then run below promised throughput because task allocation ignores real pick priorities and nobody can see where the time actually goes.",
    solution:
      "We integrate the fleet with your WMS or ERP, shape task allocation around your real order profile, and build the throughput and utilisation reporting that lets you argue about fleet performance with evidence instead of impressions.",
    technologies: [
      "VDA 5050",
      "REST & GraphQL APIs",
      "MQTT",
      "Python / Node.js",
      "PostgreSQL",
      "WMS & ERP connectors",
      "React dashboards",
    ],
    benefits: [
      "Vendor-neutral integration layer — no lock-in to one fleet supplier",
      "Task allocation tuned to your order profile, not a generic default",
      "Robot activity reconciled against WMS records rather than assumed",
      "Throughput and utilisation reporting in numbers finance accepts",
    ],
    useCases: [
      "AMR or AGV fleet integration with an existing WMS",
      "Task allocation and priority logic for mixed order profiles",
      "Multi-vendor fleet orchestration under one interface",
      "Throughput, utilisation, and exception dashboards",
      "Pick-path and slotting analysis ahead of a fleet expansion",
    ],
    faqs: [
      {
        question: "Do we need to replace our WMS?",
        answer:
          "Almost never, and we would push back if someone suggested it. The integration sits alongside your WMS through its API or database, and the WMS stays the system of record. Replacing working warehouse software to accommodate robots is an expensive way to solve the wrong problem.",
      },
      {
        question: "Can you work with robots from more than one vendor?",
        answer:
          "Yes — that is much of the point. We build to standard interfaces such as VDA 5050 where the vendor supports it, and to their API where it does not, so a second supplier later is a normal project rather than a rebuild.",
      },
      {
        question: "Can you tell us whether automation is worth it before we buy?",
        answer:
          "We can analyse your order profile, pick paths, and current throughput and model where robots would and would not help. Sometimes the answer is slotting changes rather than robots. We would rather tell you that than sell you an integration you did not need.",
      },
    ],
    related: ["robotics-software", "business-automation", "data-analytics"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
