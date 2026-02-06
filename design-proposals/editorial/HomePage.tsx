import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Code2, Mail, User } from "lucide-react";

const FEATURED_PROJECTS = [
  { name: "Modulart", category: "Events", year: "2024" },
  { name: "Payssego", category: "Fintech", year: "2024" },
  { name: "AI Decco", category: "AI", year: "2023" },
];

const FEATURED_ESSAYS = [
  { title: "The Mirror of Memory", director: "Tarkovsky" },
  { title: "Faces in the Void", director: "Bergman" },
  { title: "The Poetics of Movement", director: "Wong Kar-Wai" },
];

const NAV_ITEMS = [
  { path: "/bio", label: "Bio", icon: User },
  { path: "/projects", label: "Work", icon: Code2 },
  { path: "/blog", label: "Essays", icon: BookOpen },
  { path: "/contact", label: "Contact", icon: Mail },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function EditorialHomePage() {
  const prefersReduced = useReducedMotion();
  const [currentIssue] = useState("Vol. I / 2025");

  return (
    <div className="ed-page">
      {/* Masthead */}
      <header className="ed-masthead">
        <div className="ed-container">
          <motion.div
            className="ed-masthead-inner"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="ed-masthead-issue">{currentIssue}</span>
            <nav className="ed-masthead-nav">
              {NAV_ITEMS.map((item) => (
                <Link key={item.path} href={item.path} className="ed-masthead-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="ed-hero">
        <div className="ed-container">
          <div className="ed-grid">
            <motion.div
              className="ed-hero-content"
              initial={prefersReduced ? {} : "hidden"}
              animate="visible"
              variants={stagger}
            >
              {/* Name as massive editorial headline */}
              <motion.div className="ed-hero-name-wrapper" variants={fadeUp}>
                <h1 className="ed-hero-name">
                  <span className="ed-hero-name-first">Walter</span>
                  <span className="ed-hero-name-last">Andrade</span>
                </h1>
              </motion.div>

              {/* Tagline as elegant subhead */}
              <motion.p className="ed-hero-tagline" variants={fadeUp}>
                <span className="ed-tagline-word">Logic</span>
                <span className="ed-tagline-separator">&times;</span>
                <span className="ed-tagline-word">Philosophy</span>
                <span className="ed-tagline-separator">&times;</span>
                <span className="ed-tagline-word">Code</span>
              </motion.p>

              {/* Rule */}
              <motion.hr className="ed-hero-rule" variants={fadeUp} />

              {/* Role */}
              <motion.p className="ed-hero-role" variants={fadeUp}>
                Senior Software Engineer
                <span className="ed-role-at">at</span>
                SmartHow
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editorial Lede */}
      <section className="ed-lede">
        <div className="ed-container">
          <div className="ed-grid">
            <motion.div
              className="ed-lede-content"
              initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="ed-lede-text ed-drop-cap">
                A software developer with a philosophy degree in logic, building AI
                interview bots, fintech platforms, e-learning systems, and mobile
                applications. Philosophy teaches clarity in complexity&mdash;the art
                of reducing intricate problems to their essential forms.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Two-Column Feature Section */}
      <section className="ed-features">
        <div className="ed-container">
          <div className="ed-grid">
            {/* Left Column: Selected Work */}
            <motion.div
              className="ed-feature-col ed-feature-left"
              initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="ed-feature-header">
                <h2 className="ed-section-title">Selected Work</h2>
                <span className="ed-section-count">10 Projects</span>
              </div>

              <hr className="ed-rule ed-rule-thick" />

              <ul className="ed-project-list">
                {FEATURED_PROJECTS.map((project, index) => (
                  <motion.li
                    key={project.name}
                    className="ed-project-item"
                    initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="ed-project-name">{project.name}</span>
                    <span className="ed-project-meta">
                      <span className="ed-project-category">{project.category}</span>
                      <span className="ed-project-year">{project.year}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/projects" className="ed-feature-link">
                <span>View All Projects</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Right Column: Essays */}
            <motion.div
              className="ed-feature-col ed-feature-right"
              initial={prefersReduced ? {} : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="ed-feature-header">
                <h2 className="ed-section-title">Cinema Essays</h2>
                <span className="ed-section-count">13 Writings</span>
              </div>

              <hr className="ed-rule ed-rule-thick" />

              <ul className="ed-essay-list">
                {FEATURED_ESSAYS.map((essay, index) => (
                  <motion.li
                    key={essay.title}
                    className="ed-essay-item"
                    initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="ed-essay-title">{essay.title}</span>
                    <span className="ed-essay-director">On {essay.director}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/blog" className="ed-feature-link">
                <span>Read Essays</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="ed-quote-section">
        <div className="ed-container">
          <div className="ed-grid">
            <motion.blockquote
              className="ed-pull-quote ed-col-main"
              initial={prefersReduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              "Programming is nothing more than converting human problems into
              computer problems&mdash;and discovering that this is, above all, fun."
              <cite>From the Philosophy of Code</cite>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="ed-stack">
        <div className="ed-container">
          <motion.div
            className="ed-stack-inner"
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="ed-stack-label">Primary Technologies</span>
            <p className="ed-stack-list">
              TypeScript &middot; Python &middot; Next.js &middot; React &middot;
              Node.js &middot; PostgreSQL &middot; AWS &middot; GCP
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ed-footer">
        <div className="ed-container">
          <div className="ed-footer-inner">
            <div className="ed-footer-left">
              <span className="ed-footer-name">Walter Andrade</span>
              <span className="ed-footer-year">&copy; 2025</span>
            </div>
            <div className="ed-footer-right">
              <a href="mailto:walteraandrade@gmail.com" className="ed-footer-link">
                Email
              </a>
              <a href="https://github.com/walteraandrade" className="ed-footer-link">
                GitHub
              </a>
              <a href="https://linkedin.com/in/walteraandrade" className="ed-footer-link">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        /* Page Styles */
        .ed-page {
          min-height: 100vh;
          background: var(--color-bg, #FEFBF6);
          color: var(--color-text, #0D0D0D);
        }

        /* Masthead */
        .ed-masthead {
          padding: var(--spacing-lg, 1.5rem) 0;
          border-bottom: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-masthead-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ed-masthead-issue {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        .ed-masthead-nav {
          display: flex;
          gap: var(--spacing-xl, 2rem);
        }

        .ed-masthead-link {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--color-text, #0D0D0D);
          transition: color 200ms ease;
        }

        .ed-masthead-link:hover {
          color: var(--color-accent, #E63946);
        }

        /* Hero */
        .ed-hero {
          padding: var(--spacing-5xl, 8rem) 0 var(--spacing-4xl, 6rem);
        }

        .ed-hero-content {
          grid-column: 1 / -1;
          text-align: center;
        }

        .ed-hero-name-wrapper {
          overflow: hidden;
        }

        .ed-hero-name {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-weight: 600;
          font-size: clamp(4rem, 15vw, 12rem);
          letter-spacing: -0.04em;
          line-height: 0.85;
          margin: 0;
        }

        .ed-hero-name-first,
        .ed-hero-name-last {
          display: block;
        }

        .ed-hero-name-last {
          font-style: italic;
          font-weight: 500;
        }

        .ed-hero-tagline {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-md, 1rem);
          margin-top: var(--spacing-2xl, 3rem);
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        .ed-tagline-separator {
          color: var(--color-accent, #E63946);
        }

        .ed-hero-rule {
          width: 60px;
          height: 2px;
          background: var(--color-text, #0D0D0D);
          border: none;
          margin: var(--spacing-2xl, 3rem) auto;
        }

        .ed-hero-role {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-xl, 1.25rem);
          font-weight: 400;
          color: var(--color-text-muted, #737373);
        }

        .ed-role-at {
          font-style: italic;
          margin: 0 0.5em;
          color: var(--color-text-muted, #A3A3A3);
        }

        /* Lede */
        .ed-lede {
          padding: var(--spacing-4xl, 6rem) 0;
          border-top: 1px solid var(--color-border, #E5E5E5);
          border-bottom: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-lede-content {
          grid-column: 3 / 11;
        }

        @media (max-width: 1024px) {
          .ed-lede-content {
            grid-column: 2 / 12;
          }
        }

        @media (max-width: 768px) {
          .ed-lede-content {
            grid-column: 1 / -1;
          }
        }

        .ed-lede-text {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 400;
          line-height: 1.6;
          color: var(--color-text, #0D0D0D);
        }

        /* Features */
        .ed-features {
          padding: var(--spacing-4xl, 6rem) 0;
        }

        .ed-feature-col {
          padding: var(--spacing-xl, 2rem) 0;
        }

        .ed-feature-left {
          grid-column: 1 / 7;
          padding-right: var(--spacing-2xl, 3rem);
          border-right: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-feature-right {
          grid-column: 7 / -1;
          padding-left: var(--spacing-2xl, 3rem);
        }

        @media (max-width: 768px) {
          .ed-feature-left,
          .ed-feature-right {
            grid-column: 1 / -1;
            padding: var(--spacing-xl, 2rem) 0;
            border-right: none;
            border-bottom: 1px solid var(--color-border, #E5E5E5);
          }

          .ed-feature-right {
            border-bottom: none;
          }
        }

        .ed-feature-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: var(--spacing-md, 1rem);
        }

        .ed-section-title {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-3xl, 1.875rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .ed-section-count {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        /* Project List */
        .ed-project-list,
        .ed-essay-list {
          list-style: none;
          padding: 0;
          margin: var(--spacing-xl, 2rem) 0;
        }

        .ed-project-item,
        .ed-essay-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: var(--spacing-md, 1rem) 0;
          border-bottom: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-project-name {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-xl, 1.25rem);
          font-weight: 500;
        }

        .ed-project-meta {
          display: flex;
          gap: var(--spacing-lg, 1.5rem);
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        .ed-essay-title {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-xl, 1.25rem);
          font-weight: 500;
          font-style: italic;
        }

        .ed-essay-director {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        .ed-feature-link {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm, 0.5rem);
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--color-text, #0D0D0D);
          margin-top: var(--spacing-md, 1rem);
          transition: color 200ms ease;
        }

        .ed-feature-link:hover {
          color: var(--color-accent, #E63946);
        }

        /* Pull Quote Section */
        .ed-quote-section {
          padding: var(--spacing-4xl, 6rem) 0;
          background: var(--color-gray-100, #F7F7F7);
        }

        .dark .ed-quote-section {
          background: var(--color-gray-900, #171717);
        }

        .ed-pull-quote {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-style: italic;
          font-weight: 400;
          line-height: 1.4;
          text-align: center;
          color: var(--color-text, #0D0D0D);
          margin: 0;
          padding: 0;
          border: none;
        }

        .ed-pull-quote cite {
          display: block;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          font-style: normal;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: var(--spacing-lg, 1.5rem);
          color: var(--color-accent, #E63946);
        }

        /* Tech Stack */
        .ed-stack {
          padding: var(--spacing-3xl, 4rem) 0;
          border-top: 1px solid var(--color-border, #E5E5E5);
          border-bottom: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-stack-inner {
          text-align: center;
        }

        .ed-stack-label {
          display: block;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
          margin-bottom: var(--spacing-md, 1rem);
        }

        .ed-stack-list {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-lg, 1.125rem);
          font-weight: 400;
          color: var(--color-text, #0D0D0D);
          margin: 0;
        }

        /* Footer */
        .ed-footer {
          padding: var(--spacing-2xl, 3rem) 0;
        }

        .ed-footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ed-footer-left {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-md, 1rem);
        }

        .ed-footer-name {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-lg, 1.125rem);
          font-weight: 500;
        }

        .ed-footer-year {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          color: var(--color-text-muted, #737373);
        }

        .ed-footer-right {
          display: flex;
          gap: var(--spacing-lg, 1.5rem);
        }

        .ed-footer-link {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 500;
          text-decoration: none;
          color: var(--color-text-muted, #737373);
          transition: color 200ms ease;
        }

        .ed-footer-link:hover {
          color: var(--color-accent, #E63946);
        }

        @media (max-width: 640px) {
          .ed-footer-inner {
            flex-direction: column;
            gap: var(--spacing-lg, 1.5rem);
            text-align: center;
          }
        }

        /* Drop Cap Override */
        .ed-drop-cap::first-letter {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: 4em;
          font-weight: 600;
          float: left;
          line-height: 0.8;
          padding-right: 0.15em;
          margin-top: 0.1em;
          color: var(--color-accent, #E63946);
        }

        /* Grid Container */
        .ed-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (min-width: 768px) {
          .ed-container {
            padding: 0 2rem;
          }
        }

        .ed-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2rem;
        }

        .ed-col-main {
          grid-column: 3 / 11;
        }

        @media (max-width: 1024px) {
          .ed-col-main {
            grid-column: 2 / 12;
          }
        }

        @media (max-width: 768px) {
          .ed-col-main {
            grid-column: 1 / -1;
          }
        }

        /* Rules */
        .ed-rule {
          border: none;
          height: 1px;
          background: var(--color-border, #E5E5E5);
          margin: 0;
        }

        .ed-rule-thick {
          height: 2px;
          background: var(--color-text, #0D0D0D);
        }
      `}</style>
    </div>
  );
}
