import {
  LucideIcon,
  BookOpen,
  User,
  Code,
  Briefcase,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";

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

export const bio = `I build things end-to-end: AI-powered interview bots, fintech platforms, e-learning systems, mobile apps. At SmartHow I own DevOps, define architecture, and lead technical decisions while shipping features daily.

Philosophy degree in logic taught me to find clarity in complexity. I care about why we're building something, not just how.`;

export const projects: Project[] = [
  {
    title: "SmartHow Workspace Agent",
    role: "Senior Software Engineer",
    description:
      "Agentic chat that writes and edits long-form technical documents. Rebuilt the orchestration loop for cross-turn memory, parallel tool calls and pause/resume, moved tools to a per-tool registry, replaced the blind spinner with a live activity stream over WebSockets, and added voice dictation through Whisper.",
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
      "Retrieval layer that turns uploaded PDFs and audio transcripts into dependable context for the writing agent. Parsing, chunking and full-text search over Postgres, assets scoped per document with per-library permissions, and binary storage on an RBAC-only Azure Blob port with no public URLs.",
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
      "Audited and rebuilt delivery for a multi-app monorepo. Restored the Azure OIDC federation that had silently broken every deploy, made quality gates required on protected branches, and added CodeQL, dependency and image scanning, SHA-pinned actions, and mutation testing.",
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
      "Cloud cost initiative across 17 resource groups: mapped the full spend, decommissioned the staging environment and a superseded production stack, purged and downgraded container registries, right-sized app plans, and rerouted expensive model traffic to cheaper deployments.",
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
      "Full-stack event sales and management platform with responsive webpage, robust PostgreSQL backend, and comprehensive admin panel.",
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
    title: "Payssego Payment System",
    role: "Full-Stack Developer & Architect",
    description:
      "Node.js platform for employee salary advances with rigorous API security requirements and secure client integrations.",
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
      "AI-powered assistant for interior decoration recommendations.",
    tech: ["HTML", "CSS", "JavaScript"],
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
    description: "Game project built with Phaser.js and TypeScript.",
    tech: ["Phaser.js", "TypeScript"],
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
];

export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "SmartHow",
    period: "September 2025 - Present",
    description:
      "Own DevOps and infrastructure on Azure. Define architecture and lead technical decisions. Built AI interview automation with Recall.ai and ElevenLabs. Ship features across Node.js/NestJS, Next.js, Python/FastAPI, PostgreSQL/MongoDB.",
  },
  {
    role: "Senior Full Stack Developer",
    company: "Instaq – Instituto Taqtile",
    period: "October 2023 - September 2025",
    description:
      "Led Modulart platform as Full Stack Dev & Product Owner. Built NaPorta landing page (won national competition). Architected Payssego payment system. Deployed Vivenda on AWS. Led Pence culture analytics platform with Neo4j.",
  },
  {
    role: "Software Engineer",
    company: "Taqtile Brasil",
    period: "September 2020 - May 2023",
    description:
      "Built ioP Pet mobile app with Bluetooth, released on App Store & Play Store. Created Timesheet platform replacing Redmine (React, GraphQL, BigQuery, Looker). Led Gentelab e-learning with React, Relay, Firebase.",
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

export interface NodeSection {
  id: string;
  title: string;
  icon: LucideIcon;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
}

export const nodes: NodeSection[] = [
  { id: "bio", title: "Bio", icon: User, x: 20, y: 50 },
  { id: "projects", title: "Projects", icon: Code, x: 50, y: 30 },
  { id: "blog", title: "Blog", icon: BookOpen, x: 80, y: 50 },
];
