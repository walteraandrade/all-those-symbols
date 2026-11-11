export interface Project {
  title: string;
  role: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const cvUrl = "/Walter-Andrade-Resume-2026.pdf";

export const bio = `I build things end-to-end: AI-powered interview bots, fintech platforms, e-learning systems, mobile apps. At SmartHow I owned DevOps, defined architecture, and led technical decisions while shipping features daily.

Philosophy degree in logic taught me to find clarity in complexity. I care about why we're building something, not just how.`;

export const projects: Project[] = [
  {
    title: "SmartHow Workspace Agent",
    role: "Senior Software Engineer",
    description:
      "Agentic chat that writes and edits long-form technical documents. Designed and built the agent loop from scratch, chosen over LangGraph and Temporal: parallel tool calls, cross-turn memory, pause/resume and a stop policy with a cost cap. Moved tools to a per-tool registry, replaced the blind spinner with a live activity stream over WebSockets, reached ~76% prompt-cache reads with a per-session HMAC delimiter, and added voice dictation through Whisper.",
    tech: [
      "TypeScript",
      "NestJS",
      "Next.js",
      "WebSockets",
      "Vercel AI SDK",
      "Azure OpenAI",
      "Prisma",
      "PostgreSQL",
    ],
  },
  {
    title: "Document Asset Ingestion",
    role: "Architect & Developer",
    description:
      "Retrieval layer that turns uploaded PDFs and audio transcripts into dependable context for the writing agent. Parsing, chunking and full-text search over Postgres, assets scoped per document with per-library permissions (the isolation eval showed zero cross-document leakage), and binary storage on an RBAC-only Azure Blob port with no public URLs.",
    tech: [
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Azure Blob Storage",
      "Python",
      "FastAPI",
    ],
  },
  {
    title: "Monorepo CI/CD Hardening",
    role: "DevOps Lead",
    description:
      "Audited and rebuilt delivery for a multi-app monorepo. Restored the Azure OIDC federation that had silently broken every deploy, rebuilt the dev deploy as blue-green, made quality gates required on protected branches, and added CodeQL, dependency audits, SHA-pinned actions and mutation testing. CI unit tests went from 44 to 254 and high+ advisories from 10 to 0.",
    tech: [
      "GitHub Actions",
      "Azure",
      "OIDC",
      "Docker",
      "CodeQL",
      "Stryker",
      "Vercel",
    ],
  },
  {
    title: "Azure Cost Program",
    role: "DevOps & Infrastructure Owner",
    description:
      "Cloud cost initiative across ~127 resources in 17 resource groups, saving about US$0.9–1.07k/month at list price: mapped the full spend, decommissioned the staging environment and a superseded production stack, purged and downgraded container registries, right-sized app plans, and rerouted expensive model traffic to cheaper deployments.",
    tech: [
      "Azure",
      "Terraform",
      "Container Apps",
      "Azure OpenAI",
      "PostgreSQL",
      "Neo4j",
    ],
  },
  {
    title: "Modulart System",
    role: "Full Stack Developer & Product Owner",
    description:
      "Event sales and management platform. Product owner and lead developer; sole author of the Payload CMS 3 backend on Next.js 15 and PostgreSQL (data model, 17 migrations, editor hooks, Cloud Build to Cloud Run deploys), 151 commits and 54 PRs from v1.1.0 to v1.5.1.",
    tech: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
      "Payload CMS",
      "GCP",
      "Prisma",
      "Apollo GraphQL",
      "Docker",
    ],
  },
  {
    title: "NaPorta Platform",
    role: "Full-Stack Developer & Lead",
    description:
      "Animated landing page and responsive admin system for delivery management. Winner of national competition.",
    tech: [
      "Next.js",
      "Node.js",
      "Framer Motion",
      "Refine",
      "GSAP",
      "React Query",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Payssego Platform",
    role: "Project Lead & Full-Stack Developer",
    description:
      "Salary-advance platform for a fintech client, in Node.js and TypeScript under strict API security requirements, with Retool internal tools and a coordinated onboarding launch that put 1,100+ users live on day one.",
    tech: ["Node.js", "Retool", "API Security", "PostgreSQL", "AWS"],
  },
  {
    title: "Vivenda Platform",
    role: "Full-Stack Developer & DevOps",
    description:
      "Astro-based platform connecting construction companies to at-risk individuals, simplifying bureaucracy and stakeholder connections.",
    tech: ["Astro", "AWS", "EC2", "Ubuntu", "Node.js"],
  },
  {
    title: "ioP Pet App",
    role: "Mobile Developer",
    description:
      "React Native application with Bluetooth integration for pet management, deployed on Apple Store and Google Play.",
    tech: ["React Native", "Bluetooth", "iOS", "Android"],
  },
  {
    title: "AI Decco Assistant",
    role: "Creator",
    description:
      "Web app to try decoration and layout ideas on a photo of your office. Upload a picture, describe the change, get AI-generated variations, and pick any of them as the base for the next round.",
    tech: ["Next.js", "TypeScript", "LangGraph", "OpenRouter", "Tailwind CSS"],
    link: "https://github.com/walteraandrade/ai-decor-assistant",
  },
  {
    title: "HTML to DOCX Converter",
    role: "Creator",
    description: "Python tool for converting HTML documents to DOCX format.",
    tech: ["Python"],
    link: "https://github.com/walteraandrade/html-to-docx",
  },
  {
    title: "Aetheria",
    role: "Creator",
    description:
      "Top-down action RPG where sound is world information: doors sing intervals, bells answer them, enemies telegraph attacks by singing. Ear training through play, with no quiz mechanics. Plain canvas and Web Audio, no engine, with sounds synthesized at runtime from random roots.",
    tech: ["JavaScript", "Canvas", "Web Audio", "Vite"],
    link: "https://github.com/walteraandrade/aetheria",
  },
  {
    title: "Smells Like Job Spirit",
    role: "Creator",
    description:
      "Browser extension with Python backend and Ollama integration for job search assistance.",
    tech: ["Browser Extension", "Python", "Ollama"],
    link: "https://github.com/walteraandrade/smells-like-job-spirit",
  },
  {
    title: "The Thought Weaver",
    role: "Creator",
    description: "TypeScript project for thought organization and note-taking.",
    tech: ["TypeScript"],
    link: "https://github.com/walteraandrade/the-thought-weaver",
  },
  {
    title: "Arachne",
    role: "Creator",
    description:
      "TUI git network graph viewer that replaces GitHub's Network tab. Renders commit DAGs with branch lanes, integrates with GitHub for fork/branch data, and live-reloads on new commits.",
    tech: ["Rust", "TUI", "Git", "GitHub API"],
    link: "https://github.com/walteraandrade/arachne",
  },
  {
    title: "Mr. Argus",
    role: "Creator",
    description:
      "Terminal process monitor for Claude Code instances. Displays a live dashboard with process trees, CPU/memory usage, sparkline history, and aggregated totals by reading the Linux /proc filesystem directly.",
    tech: ["TypeScript", "Bun", "Ink", "React", "Linux"],
    link: "https://github.com/walteraandrade/mr-argus",
  },
  {
    title: "Chrono Digger",
    role: "Creator",
    description:
      "History sim where students question source-grounded AI witnesses frozen on a Sarajevo street on 28 June 1914. Each character turn retrieves passages, builds the prompt and streams the answer with its sources under one deadline, with per-player and global daily quotas, an investigation diary, and a fidelity eval with a judge.",
    tech: [
      "TypeScript",
      "Cloudflare Workers",
      "Durable Objects",
      "Workers AI",
      "Vectorize",
      "Effect",
      "WebSockets",
    ],
    link: "https://github.com/walteraandrade/chrono-digger",
  },
  {
    title: "Desafinado",
    role: "Creator",
    description:
      "Markdown editor with an AI co-author, for prose and agent Skills. Every suggestion sits in the text as a tracked change with a rationale until you accept, reject or refine it, and a timeline keeps a version after each step. Ships as an Electron app with a Skills library and evals, and as a web app.",
    tech: [
      "TypeScript",
      "React",
      "Electron",
      "CodeMirror",
      "Vercel AI SDK",
      "OpenRouter",
      "Tailwind CSS",
    ],
    link: "https://github.com/walteraandrade/desafinado",
  },
  {
    title: "Rashomon",
    role: "Creator",
    description:
      "Shows which words stick to 27 Brazilian public figures across ten sources, from Bluesky and Google News to GDELT, the press and both houses of Congress. One collector per source, term extraction, and PMI computed in SQL, so every number opens to the texts behind it.",
    tech: ["TypeScript", "SvelteKit", "Hono", "PGlite", "PostgreSQL", "Effect"],
    link: "https://github.com/walteraandrade/rashomon",
  },
  {
    title: "Anamnesis",
    role: "Creator",
    description:
      "Chromium side panel that answers job application questions from your own story bank of Markdown files. Semantic search with EmbeddingGemma and an optional WebLLM rewrite both run in the browser, so nothing about you leaves the machine, and it never submits a form.",
    tech: [
      "TypeScript",
      "Browser Extension",
      "WXT",
      "React",
      "WebLLM",
      "Transformers.js",
      "WebGPU",
    ],
    link: "https://github.com/walteraandrade/anamnesis",
  },
  {
    title: "Estante",
    role: "Creator",
    description:
      "Shared shelf of album and track recommendations for a psychoacoustics study group. Installs as a share target, so a link sent on WhatsApp lands on the shelf with the form filled in, and filters live in the URL so any view can be shared.",
    tech: ["TypeScript", "SvelteKit", "Hono", "libSQL", "Turso", "Vercel"],
    link: "https://github.com/walteraandrade/estante",
  },
  {
    title: "Integrated Task Manager",
    role: "Creator",
    description:
      "The triage layer Linear's free plan lacks. Ingests the error backlog from Linear, enriches each item from Sentry and PostHog, proposes verdicts with an embedded Claude agent, and writes back to Linear only on confirmation. One Deno process with a SQLite overlay serves a React SPA, and it boots with zero credentials on fixture adapters.",
    tech: ["TypeScript", "Deno", "SQLite", "React", "TanStack", "Claude", "MCP"],
    link: "https://github.com/walteraandrade/integrated-task-manager",
  },
  {
    title: "Keystone",
    role: "Creator",
    description:
      "Backend that ingests audit documents (FMEA, IPAR), extracts structured knowledge with an LLM and stores it in Neo4j as the single source of truth, with Qdrant for semantic retrieval. The graph is authoritative, vectors are disposable, and entities are immutable with versions linked by SUPERSEDES.",
    tech: ["TypeScript", "Bun", "Fastify", "Neo4j", "Qdrant", "Docker"],
    link: "https://github.com/walteraandrade/keystone-v0",
  },
  {
    title: "Azure for Dummies",
    role: "Creator",
    description:
      "Full-screen terminal UI for browsing Azure resources, like k9s for Azure. Container Apps, PostgreSQL Flexible Servers and Storage Accounts with detail tabs, live log streaming, metrics sparklines and firewall rules, on a stack-based router where each service is a self-contained module.",
    tech: ["Go", "TUI", "Azure"],
    link: "https://github.com/walteraandrade/azure-for-dummies",
  },
  {
    title: "Homer",
    role: "Creator",
    description:
      "Git chronicle TUI, third sibling to Mr. Argus and Arachne. Watches a repository, groups new commits into narrative units (bursts, singles, merges) and writes them as prose through a pluggable narrator, either an LLM over OpenRouter or a template heuristic.",
    tech: ["Go", "TUI", "Bubble Tea", "Git", "SQLite", "OpenRouter"],
    link: "https://github.com/walteraandrade/homer",
  },
  {
    title: "Cerberus",
    role: "Creator",
    description:
      "Local-only TUI password manager with a single encrypted vault file. Envelope encryption with XChaCha20-Poly1305 and Argon2id, key material held in memguard, a password and diceware passphrase generator, and a clipboard that clears itself.",
    tech: ["Go", "TUI", "Bubble Tea", "Cryptography"],
    link: "https://github.com/walteraandrade/cerberus",
  },
  {
    title: "Apollo",
    role: "Creator",
    description:
      "Local-first terminal app for commit review triage. Detects new commits in a local repository, notifies that they might need a review, tracks their status in SQLite and surfaces the unreviewed queue in a keyboard-first TUI.",
    tech: ["Go", "TUI", "Git", "SQLite"],
    link: "https://github.com/walteraandrade/claude-apollo",
  },
  {
    title: "Plutio Manager",
    role: "Creator",
    description:
      "CLI and TUI that sync JSON sprint plans to Plutio task boards. Push and pull, status drift detection, an interactive kanban board, OAuth2 with token caching, and rate limiting through a token bucket, with ID mappings kept in SQLite so plan files stay clean.",
    tech: ["Go", "TUI", "Bubble Tea", "SQLite", "OAuth2"],
    link: "https://github.com/walteraandrade/plutio-manager",
  },
  {
    title: "Quest",
    role: "Creator",
    description:
      "Sprint gamification CLI that turns dev work into an RPG. Syncs merged PRs, code reviews and tasks from GitHub, then computes XP, levels, streaks and achievements, with a terminal summary and a self-contained HTML dashboard.",
    tech: ["TypeScript", "Bun", "CLI", "GitHub API"],
    link: "https://github.com/walteraandrade/quest",
  },
  {
    title: "Review Summarizer AI",
    role: "Creator",
    description:
      "Summarizes public opinion on any movie, album, song, artist, book or series with Gemini and Google Search grounding, with technical details tailored to the media type and an interactive influence map to follow the connections between works.",
    tech: ["Next.js", "TypeScript", "Gemini", "Tailwind CSS"],
    link: "https://github.com/walteraandrade/review-summarizer-ai",
  },
  {
    title: "Interactive Digital Catalogue",
    role: "Creator",
    description:
      "Turns a static PDF catalogue of dental products into a clickable page. Hotspots on the product images pick variations and fill a cart, and the order goes out as a pre-filled WhatsApp message.",
    tech: ["React", "Vite", "Zustand", "Tailwind CSS"],
    link: "https://github.com/walteraandrade/interactive-digital-catalogue",
  },
];

export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "SmartHow",
    period: "September 2025 - August 2026",
    description:
      "Owned DevOps and infrastructure on Azure. Defined architecture and led technical decisions. Release manager for production. Built voice agents on Recall.ai and ElevenLabs that handled 724 interactions (447 phone calls, 277 video meetings). Shipped features across Node.js/NestJS, Next.js, Python/FastAPI, PostgreSQL/MongoDB.",
  },
  {
    role: "Senior Full Stack Developer",
    company: "Instaq – Instituto Taqtile",
    period: "October 2023 - September 2025",
    description:
      "Led Modulart platform as Full Stack Dev & Product Owner. Built NaPorta landing page (won national competition). Led Payssego salary-advance platform (1,100+ users on day one). Deployed Vivenda on AWS. Led Pence culture analytics platform with Neo4j.",
  },
  {
    role: "Software Engineer",
    company: "Taqtile Brasil",
    period: "September 2020 - May 2023",
    description:
      "Worked on the frontend of Grupo BIG's retail app for Sam's Club, Walmart and Bompreço (Sam's Club Brasil: 1M+ Google Play downloads). Built ioP Pet mobile app with Bluetooth, released on App Store & Play Store. Created Timesheet platform replacing Redmine (React, GraphQL, BigQuery, Looker). Led Gentelab e-learning with React, Relay, Firebase.",
  },
];

export const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "Rust", "SQL", "GraphQL"],
  frontend: [
    "Next.js",
    "React",
    "React Native",
    "Astro",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Relay",
  ],
  backend: [
    "Node.js",
    "NestJS",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Neo4j",
    "Prisma",
    "Apollo GraphQL",
    "Hasura",
    "REST APIs",
    "Firebase",
  ],
  cloud: ["Azure", "AWS", "EC2", "GCP", "Vercel", "Netlify", "Docker", "GitHub Actions"],
};

export const socialLinks = {
  email: "walteraandrade@gmail.com",
  linkedin: "/in/walteraandrade",
  github: "@walteraandrade",
  discord: "@walteraandrade",
};

