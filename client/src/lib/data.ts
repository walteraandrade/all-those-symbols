import projectData from "./projects.json";

export interface Project {
  title: string;
  role: string;
  lead?: string;
  description: string;
  tech: string[];
  link?: string;
}

export const isOwn = (p: Project) => p.role === "Creator";

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const cvUrl = "/Walter-Andrade-Resume-2026.pdf";

export const bio = `I build products end-to-end: six years of TypeScript, React and Node.js, and about a year shipping LLM features to production. At SmartHow, a compliance SaaS for heavy industry, I designed and built the workspace's AI agent from scratch, which cut writing a new document from 3 hours to 10 minutes, and built a voice-agent platform on Recall.ai and ElevenLabs.

Philosophy degree in logic taught me to find clarity in complexity. My rule: the model proposes; code and people guarantee the contract.`;

export const projects: Project[] = projectData;

export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "SmartHow",
    period: "September 2025 - August 2026",
    description:
      "Ran the team's releases. Designed and built the workspace's AI agent from scratch, cutting a new document from 3 hours to 10 minutes. Shipped document generation from PDFs and audio with structured outputs, repair and evals. Built a voice-agent platform on Recall.ai and ElevenLabs that handled 724 interactions (447 phone calls, 277 video meetings), AI checklists with LangGraph and vision, and an audit agent that only proposes writes.",
  },
  {
    role: "Senior Full Stack Web Developer | Mentor | Product Owner",
    company: "Instaq – Instituto Taqtile",
    period: "October 2023 - September 2025",
    description:
      "Product owner and main client contact on several products at once, and mentor to junior developers. Sole author of the Modulart Payload CMS 3 backend. Built the NaPorta landing page and admin (won a national competition). Led the Payssego salary-advance platform (1,100+ users on day one). Also Vivenda (Astro, AWS EC2) and Pence (React, Node.js, Neo4j).",
  },
  {
    role: "Software Engineer",
    company: "Taqtile Brasil",
    period: "September 2020 - May 2023",
    description:
      "Frontend of Grupo BIG's retail app for Sam's Club, Walmart and Bompreço (Sam's Club Brasil: 1M+ Google Play downloads). Built the ioP Pet React Native app, released on both stores. Created an internal Redmine replacement with BigQuery and Looker Studio dashboards. Led the Gentelab e-learning frontend with React, Relay and Hasura.",
  },
];

export const skills = {
  "ai & agents": [
    "OpenAI",
    "Azure OpenAI",
    "Anthropic",
    "Agent loops",
    "Structured outputs",
    "Evals",
    "LangGraph",
    "LangSmith",
    "MCP",
    "ElevenLabs",
    "Recall.ai",
    "Whisper",
    "PyTorch",
    "Claude Code",
  ],
  languages: ["TypeScript", "JavaScript", "Python", "SQL", "GraphQL"],
  frontend: [
    "React",
    "Next.js",
    "React Native",
    "React Query",
    "Zustand",
    "Astro",
    "Relay",
  ],
  backend: [
    "Node.js",
    "NestJS",
    "FastAPI",
    "PostgreSQL",
    "Neo4j",
    "BullMQ",
    "Zod",
    "REST APIs",
    "Hasura",
  ],
  infra: ["Azure", "AWS", "Docker", "GitHub Actions", "Vitest", "Playwright"],
};

export const socialLinks = {
  email: "walteraandrade@gmail.com",
  linkedin: "/in/walteraandrade",
  github: "@walteraandrade",
  discord: "@walteraandrade",
};

