import { LucideIcon, Music, BookOpen, User, Code, Briefcase, Cpu, Layers, Terminal } from "lucide-react";

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

export const bio = `As a child, I was captivated by computers and the world of reading. My formal academic journey began with studies in literature and journalism, before I delved into philosophy, where I discovered a profound love for formal logic and the philosophy of mathematics. This rigorous, first-principles approach "naturally" led me to programming. I now apply this foundation to leading teams and architecting full-stack applications, thriving on building elegant and efficient systems.`;

export const projects: Project[] = [
  {
    title: "Modulart System",
    role: "Full Stack Developer & Product Owner",
    description: "Full-stack event sales and management platform with responsive webpage, robust PostgreSQL backend, and comprehensive admin panel.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Payload CMS", "GCP", "Prisma", "Apollo GraphQL", "Docker"]
  },
  {
    title: "NaPorta Platform",
    role: "Full-Stack Developer & Lead",
    description: "Animated landing page and responsive admin system for delivery management. Winner of national competition.",
    tech: ["Next.js", "Node.js", "Framer Motion", "Refine", "GSAP", "React Query", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Payssego Payment System",
    role: "Full-Stack Developer & Architect",
    description: "Node.js platform for employee salary advances with rigorous API security requirements and secure client integrations.",
    tech: ["Node.js", "Retool", "API Security", "PostgreSQL", "AWS"]
  },
  {
    title: "Vivenda Platform",
    role: "Full-Stack Developer & DevOps",
    description: "Astro-based platform connecting construction companies to at-risk individuals, simplifying bureaucracy and stakeholder connections.",
    tech: ["Astro", "AWS", "EC2", "Ubuntu", "Node.js"]
  },
  {
    title: "ioP Pet App",
    role: "Mobile Developer",
    description: "React Native application with Bluetooth integration for pet management, deployed on Apple Store and Google Play.",
    tech: ["React Native", "Bluetooth", "iOS", "Android"]
  }
];

export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "SmartHow",
    period: "September 2025 - Present",
    description: "Developing AI-powered solutions for training and accident prevention in large industrial environments."
  },
  {
    role: "Senior Full Stack Developer",
    company: "Instaq – Instituto Taqtile",
    period: "October 2023 - September 2025",
    description: "Led full-stack development of Modulart system. Developed animated landing page for NaPorta. Created Payssego payment platform."
  },
  {
    role: "Software Engineer",
    company: "Taqtile Brasil",
    period: "September 2020 - May 2023",
    description: "Developed React Native app for ioP Pet. Created full-stack Timesheet application. Led Gentelab e-learning platform development."
  }
];

export const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL", "GraphQL"],
  frontend: ["Next.js", "React", "React Native", "Astro", "Tailwind CSS", "Framer Motion", "GSAP", "Relay"],
  backend: ["Node.js", "PostgreSQL", "Prisma", "Apollo GraphQL", "Hasura", "REST APIs", "Firebase"],
  cloud: ["AWS", "EC2", "GCP", "Netlify", "Vercel", "Docker"]
};

export const socialLinks = {
  email: "walteraandrade@gmail.com",
  linkedin: "/in/walteraandrade",
  github: "@walteraandrade",
  discord: "@walteraandrade"
};

export interface NodeSection {
  id: string;
  title: string;
  icon: LucideIcon;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
}

export const nodes: NodeSection[] = [
  { id: "bio", title: "Bio / Philosophy", icon: User, x: 20, y: 30 },
  { id: "projects", title: "Projects", icon: Code, x: 80, y: 30 },
  { id: "music", title: "Soundscapes", icon: Music, x: 20, y: 80 },
  { id: "blog", title: "Writings", icon: BookOpen, x: 80, y: 80 },
];

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "rigor-of-logic-vs-fluidity-of-code",
    title: "The Rigor of Logic vs. The Fluidity of Code",
    date: "Dec 14, 2025",
    category: "Philosophy",
    excerpt:
      "In formal logic, a contradiction is fatal. In software engineering, a race condition is often just a Tuesday. Transitioning from the absolute truths of mathematical philosophy to the heuristic reality of distributed systems taught me that perfection is not about the absence of error, but the elegance of recovery...",
  },
  {
    slug: "why-i-cook-like-i-code",
    title: "Why I Cook Like I Code",
    date: "Nov 02, 2025",
    category: "Life",
    excerpt:
      "Mise en place is just dependency injection for the kitchen. Understanding the heat capacity of a cast iron skillet is no different than understanding the throughput of a database connection pool. It's all about resource management...",
  },
];
