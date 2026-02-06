"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  { name: "Modulart", category: "Event Platform", description: "Cultural event management and ticketing" },
  { name: "NaPorta", category: "Delivery", description: "Last-mile delivery orchestration" },
  { name: "Payssego", category: "Fintech", description: "Payment infrastructure and banking" },
  { name: "Vivenda", category: "Construction", description: "Property development management" },
  { name: "ioP Pet", category: "Mobile", description: "Pet care and services marketplace" },
  { name: "AI Decco", category: "AI", description: "Interior design with artificial intelligence" },
];

const blogPosts = [
  { title: "Bergman's Silence", date: "Through the Glass" },
  { title: "Tarkovsky's Time", date: "Sculpted Memory" },
  { title: "Godard's Fractures", date: "Breaking Form" },
];

const LeafSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C8 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-12z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const BranchSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 90 Q 30 70, 50 50 Q 70 30, 90 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M50 50 Q 60 45, 75 55"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M30 70 Q 25 60, 35 50"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="90" cy="10" r="3" fill="currentColor" />
    <circle cx="75" cy="55" r="2" fill="currentColor" />
    <circle cx="35" cy="50" r="2" fill="currentColor" />
  </svg>
);

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const fadeInUp = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  };

  const stagger = {
    initial: {},
    whileInView: {},
    viewport: { once: true },
    transition: { staggerChildren: 0.1 },
  };

  return (
    <div ref={containerRef} className="organic-portfolio">
      {/* Navigation */}
      <motion.nav
        className="nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <LeafSVG className="nav-logo-icon" />
            <span>Walter Andrade</span>
          </a>
          <div className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#projects" className="nav-link">Garden</a>
            <a href="#writings" className="nav-link">Writings</a>
            <a href="#contact" className="nav-link">Connect</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="hero paper-texture"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="hero-blob hero-blob--moss" />
        <div className="hero-blob hero-blob--terracotta" />
        <div className="hero-blob hero-blob--sage" />

        <div className="botanical-corner botanical-corner--top-right" />
        <div className="botanical-corner botanical-corner--bottom-left" />

        <div className="hero-content">
          <motion.p
            className="hero-tagline"
            {...fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <span className="handwritten-accent">Logic</span>
            <span className="tagline-symbol">×</span>
            <span className="handwritten-accent">Philosophy</span>
            <span className="tagline-symbol">×</span>
            <span className="handwritten-accent">Code</span>
          </motion.p>

          <motion.h1
            className="hero-title"
            {...fadeInUp}
            transition={{ delay: 0.5 }}
          >
            Cultivating
            <br />
            <span className="title-emphasis">Digital Gardens</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            {...fadeInUp}
            transition={{ delay: 0.7 }}
          >
            Senior Software Engineer with roots in formal logic.
            <br />
            Building systems that grow from first principles.
          </motion.p>

          <motion.div
            className="hero-quote"
            {...fadeInUp}
            transition={{ delay: 0.9 }}
          >
            <BranchSVG className="quote-branch" />
            <blockquote>
              "Philosophy teaches clarity in complexity"
            </blockquote>
          </motion.div>

          <motion.div
            className="hero-actions"
            {...fadeInUp}
            transition={{ delay: 1.1 }}
          >
            <a href="#projects" className="btn btn-primary">
              <LeafSVG className="btn-icon" />
              Explore the Garden
            </a>
            <a href="#contact" className="btn btn-secondary">
              Plant a Seed
            </a>
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <span>scroll to grow</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="section about-section paper-texture">
        <div className="wavy-divider wavy-divider--top" />

        <div className="section-inner">
          <motion.div className="about-header" {...fadeInUp}>
            <h2 className="heading-display">
              <span className="text-annotation">who am I?</span>
              About Me
            </h2>
          </motion.div>

          <motion.div className="about-content" {...fadeInUp}>
            <div className="about-text">
              <p className="text-body">
                In the beginning, there was geometry. The patterns, the proofs,
                the elegant certainty of shapes and their relationships. This
                love of structure led me through literature, journalism, and
                finally to <em>philosophy</em>—where I discovered formal logic
                and the philosophy of mathematics.
              </p>
              <p className="text-body">
                This rigorous, first-principles approach naturally led to
                programming. I now architect full-stack applications at
                <strong> SmartHow</strong>, building AI interview bots, fintech
                platforms, and tools that help humans think clearer.
              </p>
              <p className="text-annotation annotation-signed">
                — growing since '92
              </p>
            </div>

            <div className="about-illustration">
              <div className="tree-visual">
                <div className="tree-roots">
                  <span>Philosophy</span>
                  <span>Logic</span>
                  <span>Mathematics</span>
                </div>
                <div className="tree-trunk" />
                <div className="tree-branches">
                  <span>TypeScript</span>
                  <span>Python</span>
                  <span>React</span>
                  <span>Node.js</span>
                  <span>AWS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="section-inner">
          <motion.div className="section-header" {...fadeInUp}>
            <h2 className="heading-display">
              <span className="text-annotation">specimens</span>
              The Garden
            </h2>
            <p className="section-subtitle">
              A collection of cultivated digital experiences
            </p>
          </motion.div>

          <motion.div
            className="projects-grid"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                className="specimen-card"
                variants={{
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <span className="specimen-number">#{String(index + 1).padStart(2, "0")}</span>
                <h3 className="specimen-title">{project.name}</h3>
                <p className="specimen-category">{project.category}</p>
                <p className="specimen-description">{project.description}</p>
                <div className="specimen-footer">
                  <LeafSVG className="specimen-leaf" />
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div className="projects-more" {...fadeInUp}>
            <p className="text-annotation">+ 4 more growing...</p>
            <a href="/projects" className="btn btn-secondary">
              View Full Herbarium
            </a>
          </motion.div>
        </div>
      </section>

      {/* Blog/Writings Section */}
      <section id="writings" className="section writings-section paper-texture">
        <div className="section-inner">
          <motion.div className="section-header" {...fadeInUp}>
            <h2 className="heading-display">
              <span className="text-annotation">journal entries</span>
              Writings
            </h2>
            <p className="section-subtitle">
              Cinema meditations and philosophical wanderings
            </p>
          </motion.div>

          <motion.div className="journal-entries" {...stagger}>
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                className="journal-entry"
                variants={{
                  initial: { opacity: 0, x: -20 },
                  whileInView: { opacity: 1, x: 0 },
                }}
                whileHover={{ x: 8 }}
              >
                <div className="entry-decoration">
                  <span className="entry-number">{index + 1}</span>
                  <div className="entry-line" />
                </div>
                <div className="entry-content">
                  <h3 className="entry-title">{post.title}</h3>
                  <p className="entry-subtitle">{post.date}</p>
                </div>
                <svg className="entry-arrow" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.article>
            ))}
          </motion.div>

          <motion.div className="writings-footer" {...fadeInUp}>
            <p className="writings-note">
              <em>13 entries on Bergman, Tarkovsky, Godard, Kurosawa, Wong Kar-Wai...</em>
            </p>
            <a href="/blog" className="btn btn-primary">
              Open the Journal
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="section-inner">
          <motion.div className="contact-content" {...fadeInUp}>
            <BranchSVG className="contact-branch" />

            <h2 className="heading-handwritten contact-heading">
              Let's cultivate something together
            </h2>

            <p className="contact-text text-body">
              Whether you're looking to build a new system, discuss philosophy,
              or share thoughts on cinema—I'd love to hear from you.
            </p>

            <div className="contact-links">
              <a href="mailto:walteraandrade@gmail.com" className="contact-link">
                <span className="contact-link-label">Email</span>
                <span className="contact-link-value">walteraandrade@gmail.com</span>
              </a>
              <a href="https://github.com/walteraandrade" className="contact-link">
                <span className="contact-link-label">GitHub</span>
                <span className="contact-link-value">@walteraandrade</span>
              </a>
              <a href="https://linkedin.com/in/walteraandrade" className="contact-link">
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-value">Connect</span>
              </a>
            </div>

            <p className="contact-annotation text-annotation">
              Seeds planted today, forests tomorrow
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-text">
            <LeafSVG className="footer-leaf" />
            Grown with care by Walter Andrade
          </p>
          <p className="footer-year">2024</p>
        </div>
      </footer>

      <style jsx>{`
        .organic-portfolio {
          background-color: var(--color-cream);
          min-height: 100vh;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: var(--space-lg) var(--space-xl);
          z-index: var(--z-navigation);
          background: linear-gradient(180deg, var(--color-cream) 0%, transparent 100%);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: var(--text-lg);
          color: var(--color-moss-dark);
          text-decoration: none;
        }

        .nav-logo-icon {
          width: 24px;
          height: 24px;
          color: var(--color-moss);
        }

        .nav-links {
          display: flex;
          gap: var(--space-xl);
        }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-beige) 100%);
        }

        .hero-content {
          text-align: center;
          z-index: var(--z-content);
          padding: var(--space-xl);
          max-width: 800px;
        }

        .hero-tagline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          margin-bottom: var(--space-2xl);
        }

        .handwritten-accent {
          font-family: var(--font-handwritten);
          font-size: var(--text-3xl);
          color: var(--color-terracotta);
        }

        .tagline-symbol {
          font-family: var(--font-sans);
          color: var(--color-sage);
          font-weight: 300;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: var(--text-6xl);
          font-weight: 700;
          color: var(--color-moss-dark);
          line-height: 1.1;
          margin-bottom: var(--space-xl);
        }

        .title-emphasis {
          color: var(--color-moss);
          font-style: italic;
        }

        .hero-subtitle {
          font-family: var(--font-serif);
          font-size: var(--text-xl);
          color: var(--color-brown-light);
          line-height: 1.6;
          margin-bottom: var(--space-2xl);
        }

        .hero-quote {
          position: relative;
          margin-bottom: var(--space-2xl);
          padding: var(--space-lg);
        }

        .quote-branch {
          position: absolute;
          width: 80px;
          height: 80px;
          color: var(--color-sage);
          opacity: 0.3;
          top: -10px;
          left: 50%;
          transform: translateX(-80%) rotate(180deg);
        }

        .hero-quote blockquote {
          font-family: var(--font-serif);
          font-size: var(--text-lg);
          font-style: italic;
          color: var(--color-sage);
        }

        .hero-actions {
          display: flex;
          gap: var(--space-lg);
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-icon {
          width: 18px;
          height: 18px;
        }

        /* About Section */
        .about-section {
          background-color: var(--color-beige);
        }

        .about-header {
          margin-bottom: var(--space-3xl);
          position: relative;
        }

        .about-header .text-annotation {
          position: absolute;
          top: -30px;
          left: -10px;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4xl);
          align-items: center;
        }

        .about-text {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .annotation-signed {
          align-self: flex-end;
          margin-top: var(--space-md);
        }

        .tree-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
          padding: var(--space-2xl);
        }

        .tree-roots,
        .tree-branches {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-sm);
        }

        .tree-roots span,
        .tree-branches span {
          font-family: var(--font-handwritten);
          font-size: var(--text-lg);
          color: var(--color-moss);
          padding: var(--space-xs) var(--space-md);
          background-color: var(--color-cream);
          border-radius: var(--radius-full);
          border: 1px solid var(--color-sage-light);
        }

        .tree-branches span {
          background-color: var(--color-parchment);
          color: var(--color-terracotta);
          border-color: var(--color-terracotta-light);
        }

        .tree-trunk {
          width: 4px;
          height: 60px;
          background: linear-gradient(180deg, var(--color-moss), var(--color-terracotta));
          border-radius: var(--radius-full);
        }

        /* Projects Section */
        .projects-section {
          background-color: var(--color-cream);
        }

        .section-subtitle {
          font-family: var(--font-serif);
          font-size: var(--text-lg);
          color: var(--color-brown-light);
          font-style: italic;
          margin-top: var(--space-md);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-3xl);
        }

        .specimen-footer {
          margin-top: var(--space-lg);
        }

        .specimen-leaf {
          width: 20px;
          height: 20px;
          color: var(--color-sage);
          opacity: 0.5;
        }

        .projects-more {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
        }

        /* Writings Section */
        .writings-section {
          background-color: var(--color-parchment);
        }

        .journal-entries {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          margin-bottom: var(--space-3xl);
        }

        .journal-entry {
          display: flex;
          align-items: center;
          gap: var(--space-xl);
          padding: var(--space-lg) var(--space-xl);
          background-color: var(--color-cream);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.3s ease-out;
          text-decoration: none;
        }

        .journal-entry:hover {
          background-color: white;
          box-shadow: var(--shadow-soft);
        }

        .entry-decoration {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .entry-number {
          font-family: var(--font-handwritten);
          font-size: var(--text-2xl);
          color: var(--color-terracotta);
          width: 30px;
        }

        .entry-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, var(--color-terracotta), transparent);
          border-radius: var(--radius-full);
        }

        .entry-content {
          flex: 1;
        }

        .entry-title {
          font-family: var(--font-serif);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-moss-dark);
          margin-bottom: var(--space-xs);
        }

        .entry-subtitle {
          font-family: var(--font-handwritten);
          font-size: var(--text-lg);
          color: var(--color-sage);
        }

        .entry-arrow {
          width: 24px;
          height: 24px;
          color: var(--color-sage);
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }

        .journal-entry:hover .entry-arrow {
          opacity: 1;
        }

        .writings-footer {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
        }

        .writings-note {
          font-family: var(--font-serif);
          color: var(--color-brown-light);
        }

        /* Contact Section */
        .contact-section {
          background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-beige) 100%);
          text-align: center;
        }

        .contact-content {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }

        .contact-branch {
          width: 150px;
          height: 150px;
          color: var(--color-sage);
          opacity: 0.15;
          margin-bottom: var(--space-xl);
        }

        .contact-heading {
          font-size: var(--text-4xl);
          margin-bottom: var(--space-xl);
        }

        .contact-text {
          margin-bottom: var(--space-2xl);
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          margin-bottom: var(--space-2xl);
        }

        .contact-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md) var(--space-xl);
          background-color: var(--color-cream);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all 0.3s ease-out;
          border: 1px solid transparent;
        }

        .contact-link:hover {
          border-color: var(--color-sage-light);
          transform: translateX(4px);
        }

        .contact-link-label {
          font-family: var(--font-handwritten);
          font-size: var(--text-xl);
          color: var(--color-sage);
        }

        .contact-link-value {
          font-family: var(--font-sans);
          font-weight: 500;
          color: var(--color-moss-dark);
        }

        .contact-annotation {
          font-size: var(--text-2xl);
        }

        /* Footer */
        .footer {
          padding: var(--space-2xl) var(--space-xl);
          background-color: var(--color-moss-dark);
          color: var(--color-cream);
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-text {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-sans);
          font-size: var(--text-sm);
        }

        .footer-leaf {
          width: 16px;
          height: 16px;
          color: var(--color-sage-light);
        }

        .footer-year {
          font-family: var(--font-handwritten);
          font-size: var(--text-xl);
          color: var(--color-sage-light);
        }

        /* Wavy divider positioning */
        .wavy-divider--top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          transform: rotate(180deg);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hero-tagline {
            flex-direction: column;
            gap: var(--space-sm);
          }

          .tagline-symbol {
            display: none;
          }

          .handwritten-accent {
            font-size: var(--text-2xl);
          }

          .hero-title {
            font-size: var(--text-4xl);
          }

          .about-content {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }

          .about-illustration {
            order: -1;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .contact-link {
            flex-direction: column;
            gap: var(--space-xs);
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
