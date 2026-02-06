import { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  { name: 'Modulart', desc: 'Event platform for creative industries' },
  { name: 'NaPorta', desc: 'Last-mile delivery orchestration' },
  { name: 'Payssego', desc: 'Fintech payment infrastructure' },
  { name: 'Vivenda', desc: 'Construction project management' },
  { name: 'ioP Pet', desc: 'Mobile app for pet owners' },
  { name: 'AI Decco', desc: 'AI-powered interior design' },
  { name: 'HTML-DOCX', desc: 'Document format converter' },
  { name: 'Aetheria', desc: 'Atmospheric exploration game' },
  { name: 'Smells Like Job Spirit', desc: 'Job search browser extension' },
  { name: 'The Thought Weaver', desc: 'Connected note-taking system' },
];

const BLOG_POSTS = [
  { title: 'Persona: Mirrors of the Self', director: 'Bergman' },
  { title: 'Stalker: Faith in Ruins', director: 'Tarkovsky' },
  { title: 'Breathless: Grammar of Rebellion', director: 'Godard' },
  { title: 'Rashomon: Truth Fragmented', director: 'Kurosawa' },
  { title: 'In the Mood for Love: Unsaid', director: 'Wong Kar-Wai' },
  { title: '8½: Dreams Inside Dreams', director: 'Fellini' },
  { title: 'Gilberto Gil: Tropicália Logic', director: 'Music' },
];

const TECH = ['TypeScript', 'Python', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'GCP', 'Docker', 'GraphQL'];

const ASCII_ART = `
    ╔═══════════════════════════════╗
    ║   LOGIC × PHILOSOPHY × CODE   ║
    ╚═══════════════════════════════╝
`;

type RevealProps = { children: React.ReactNode; delay?: number; className?: string };

const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const Cursor = () => <span className="cursor" aria-hidden="true" />;

const Navigation = () => (
  <nav className="nav">
    <a href="#projects">projects</a>
    <a href="#blog">writings</a>
    <a href="#tech">stack</a>
    <a href="#contact">contact</a>
  </nav>
);

const Hero = () => (
  <section className="hero">
    <div className="hero__left">
      <h1 className="hero__name glitch">
        <span>Walter</span>
        <span>Andrade</span>
        <Cursor />
      </h1>
      <p className="hero__tagline">
        Logic <span>×</span> Philosophy <span>×</span> Code
      </p>
    </div>
    <div className="hero__right">
      <pre className="ascii" aria-hidden="true">{ASCII_ART}</pre>
      <p className="hero__title">Current Position</p>
      <p className="hero__role">
        Senior Software Engineer @ <a href="#">SmartHow</a>
      </p>
      <p className="hero__bio">
        Software developer with a philosophy degree in <strong>logic</strong>.
        Building AI interview bots, fintech systems, e-learning platforms,
        and mobile applications. Philosophy teaches how to find{' '}
        <strong>clarity in complexity</strong>.
      </p>
    </div>
  </section>
);

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0]; index: number }) => (
  <article className="project-card" data-index={String(index + 1).padStart(2, '0')}>
    <span className="project-card__header">Project #{String(index + 1).padStart(2, '0')}</span>
    <h3 className="project-card__name">{project.name}</h3>
    <p className="project-card__desc">{project.desc}</p>
    <a href="#" className="project-card__link">view_project</a>
  </article>
);

const Projects = () => (
  <section className="projects" id="projects">
    <header className="projects__header">
      <h2 className="projects__title">Selected Works</h2>
      <span className="projects__count">{PROJECTS.length}</span>
    </header>
    <div className="projects__grid">
      {PROJECTS.map((project, i) => (
        <Reveal key={project.name} delay={i * 50}>
          <ProjectCard project={project} index={i} />
        </Reveal>
      ))}
    </div>
  </section>
);

const Blog = () => (
  <section className="blog" id="blog">
    <aside className="blog__sidebar">
      <h2>Writings</h2>
    </aside>
    <div className="blog__content">
      <p className="blog__intro">
        Cinema analysis as philosophical investigation. Bergman, Tarkovsky,
        Godard, Kurosawa, Wong Kar-Wai, Fellini — directors who make visible
        the invisible structures of thought.
      </p>
      <ul className="blog__list">
        {BLOG_POSTS.map((post, i) => (
          <Reveal key={post.title} delay={i * 30}>
            <li className="blog__item">
              <span className="blog__number">{String(i + 1).padStart(2, '0')}</span>
              <span className="blog__item-title">{post.title}</span>
              <span className="blog__item-meta">{post.director}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

const Tech = () => (
  <section className="tech" id="tech">
    <h2 className="tech__title">Technology Stack</h2>
    <div className="tech__list">
      {TECH.map((tech, i) => (
        <Reveal key={tech} delay={i * 20}>
          <span className="tech__item">{tech}</span>
        </Reveal>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section className="contact" id="contact">
    <div className="contact__left">
      <p className="contact__cta">
        Let's<br />Build<br />Something
      </p>
    </div>
    <div className="contact__right">
      <a href="mailto:walteraandrade@gmail.com" className="contact__link">walteraandrade@gmail.com</a>
      <a href="https://github.com/walteraandrade" className="contact__link">github.com/walteraandrade</a>
      <a href="#" className="contact__link">linkedin.com/in/walterandrade</a>
      <a href="#" className="contact__link">discord</a>
    </div>
  </section>
);

const Footer = () => {
  const now = new Date().toISOString();
  return (
    <footer className="footer">
      <span>&copy; {new Date().getFullYear()} Walter Andrade</span>
      <span className="footer__timestamp">Last build: {now}</span>
    </footer>
  );
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');

:root {
  --color-black: #000000;
  --color-white: #F5F5F0;
  --color-red: #FF0000;
  --color-grey: #888888;
  --color-dark-grey: #1A1A1A;
  --font-mono: 'JetBrains Mono', 'IBM Plex Mono', 'Courier New', monospace;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --spacing-xl: 64px;
  --spacing-xxl: 128px;
  --border-thin: 1px solid #000000;
  --border-standard: 2px solid #000000;
  --border-thick: 4px solid #000000;
  --border-red: 2px solid #FF0000;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: auto; }
body { font-family: var(--font-mono); background-color: var(--color-white); color: var(--color-black); line-height: 1.6; overflow-x: hidden; }

.scanlines::after {
  content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px);
  pointer-events: none; z-index: 9999;
}

.nav {
  position: fixed; top: 0; left: 0; width: 100%; background: var(--color-black); color: var(--color-white);
  padding: var(--spacing-sm) var(--spacing-md); border-bottom: var(--border-thick); border-color: var(--color-red);
  z-index: 100; display: flex; gap: var(--spacing-lg); font-size: 0.875rem;
}
.nav::before { content: '>'; color: var(--color-red); animation: blink 1s step-end infinite; }
.nav a { color: var(--color-white); text-decoration: none; text-transform: uppercase; letter-spacing: 2px; }
.nav a:hover { color: var(--color-red); text-decoration: line-through; }

.hero {
  min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
  border-bottom: var(--border-thick); margin-top: 48px;
}
.hero__left {
  padding: var(--spacing-xxl) var(--spacing-xl); display: flex; flex-direction: column;
  justify-content: center; border-right: var(--border-standard);
}
.hero__right {
  background: var(--color-black); color: var(--color-white); padding: var(--spacing-xl);
  display: flex; flex-direction: column; justify-content: flex-end;
}
.hero__name {
  font-size: clamp(3rem, 8vw, 8rem); font-weight: 800; line-height: 0.9;
  text-transform: uppercase; letter-spacing: -4px; margin-bottom: var(--spacing-lg);
}
.hero__name span { display: block; margin-left: -4px; }
.hero__tagline {
  font-size: 1.5rem; font-weight: 400; border-top: var(--border-standard);
  padding-top: var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm);
}
.hero__tagline span { color: var(--color-red); }
.hero__title { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 4px; color: var(--color-grey); margin-bottom: var(--spacing-sm); }
.hero__role { font-size: 1.25rem; margin-bottom: var(--spacing-xl); }
.hero__role a { color: var(--color-red); text-decoration: none; }
.hero__bio { font-size: 1rem; max-width: 500px; line-height: 1.8; }
.hero__bio strong { color: var(--color-red); }

.cursor {
  display: inline-block; width: 0.6em; height: 1.1em; background: var(--color-red);
  margin-left: var(--spacing-xs); animation: blink 1s step-end infinite; vertical-align: text-bottom;
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.projects { padding: var(--spacing-xl); border-bottom: var(--border-thick); }
.projects__header {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: var(--spacing-xl); border-bottom: var(--border-standard); padding-bottom: var(--spacing-md);
}
.projects__title { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 4px; }
.projects__count { font-size: 4rem; font-weight: 800; line-height: 1; }
.projects__grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2px; background: var(--color-black); border: var(--border-standard);
}

.project-card {
  background: var(--color-white); padding: var(--spacing-lg); display: flex;
  flex-direction: column; min-height: 200px; position: relative; transition: none;
}
.project-card::before {
  content: attr(data-index); position: absolute; top: var(--spacing-sm); right: var(--spacing-sm);
  font-size: 3rem; font-weight: 800; color: rgba(0, 0, 0, 0.05); line-height: 1;
}
.project-card:hover { background: var(--color-black); color: var(--color-white); }
.project-card:hover::before { color: rgba(255, 255, 255, 0.1); }
.project-card__header { font-size: 0.75rem; color: var(--color-grey); margin-bottom: var(--spacing-sm); text-transform: uppercase; letter-spacing: 2px; }
.project-card__name { font-size: 1.5rem; font-weight: 700; margin-bottom: var(--spacing-sm); }
.project-card__desc { font-size: 0.875rem; flex-grow: 1; color: var(--color-grey); }
.project-card:hover .project-card__desc { color: var(--color-white); }
.project-card__link { margin-top: var(--spacing-md); font-size: 0.875rem; color: var(--color-red); text-decoration: none; }
.project-card__link::before { content: '> '; }

.blog { display: grid; grid-template-columns: 200px 1fr; border-bottom: var(--border-thick); }
.blog__sidebar {
  background: var(--color-black); color: var(--color-white); padding: var(--spacing-lg);
  writing-mode: vertical-rl; text-orientation: mixed; display: flex;
  align-items: center; justify-content: center;
}
.blog__sidebar h2 { font-size: 2rem; text-transform: uppercase; letter-spacing: 8px; }
.blog__content { padding: var(--spacing-xl); }
.blog__intro { max-width: 600px; margin-bottom: var(--spacing-xl); font-size: 1rem; line-height: 1.8; }
.blog__list { list-style: none; }
.blog__item {
  border-bottom: var(--border-thin); padding: var(--spacing-md) 0;
  display: grid; grid-template-columns: 80px 1fr auto; gap: var(--spacing-lg); align-items: baseline;
}
.blog__item:hover {
  background: var(--color-black); color: var(--color-white);
  margin: 0 calc(var(--spacing-lg) * -1); padding-left: var(--spacing-lg); padding-right: var(--spacing-lg);
}
.blog__number { font-size: 0.75rem; color: var(--color-grey); }
.blog__item:hover .blog__number { color: var(--color-red); }
.blog__item-title { font-weight: 700; }
.blog__item-meta { font-size: 0.75rem; color: var(--color-grey); }

.tech { padding: var(--spacing-xl); background: var(--color-dark-grey); color: var(--color-white); }
.tech__title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 4px; color: var(--color-grey); margin-bottom: var(--spacing-lg); }
.tech__list { display: flex; flex-wrap: wrap; gap: var(--spacing-sm); }
.tech__item { border: 1px solid var(--color-grey); padding: var(--spacing-xs) var(--spacing-sm); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
.tech__item:hover { border-color: var(--color-red); color: var(--color-red); }

.contact { display: grid; grid-template-columns: 1fr 1fr; min-height: 50vh; }
.contact__left { background: var(--color-red); color: var(--color-white); padding: var(--spacing-xl); display: flex; flex-direction: column; justify-content: center; }
.contact__cta { font-size: clamp(2rem, 5vw, 4rem); font-weight: 800; text-transform: uppercase; line-height: 1; }
.contact__right { padding: var(--spacing-xl); display: flex; flex-direction: column; justify-content: center; gap: var(--spacing-md); }
.contact__link { color: var(--color-black); text-decoration: none; font-size: 1.25rem; display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-sm) 0; border-bottom: var(--border-thin); }
.contact__link::before { content: '>'; color: var(--color-red); }
.contact__link:hover { text-decoration: line-through; }

.footer { background: var(--color-black); color: var(--color-white); padding: var(--spacing-lg) var(--spacing-xl); display: flex; justify-content: space-between; font-size: 0.75rem; border-top: var(--border-red); }
.footer__timestamp { color: var(--color-grey); }

.reveal { opacity: 0; transform: translateY(20px); }
.reveal.visible { animation: reveal 0ms forwards; }
@keyframes reveal { to { opacity: 1; transform: translateY(0); } }

.glitch { position: relative; }
.glitch:hover { animation: glitch 150ms linear; }
@keyframes glitch {
  0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); } 100% { transform: translate(0); }
}

.ascii { white-space: pre; font-size: 0.5rem; line-height: 1; color: var(--color-grey); user-select: none; }

::selection { background: var(--color-red); color: var(--color-white); }

@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; }
  .hero__left { border-right: none; border-bottom: var(--border-standard); padding: var(--spacing-xl) var(--spacing-lg); }
  .hero__right { padding: var(--spacing-lg); }
  .blog { grid-template-columns: 1fr; }
  .blog__sidebar { writing-mode: horizontal-tb; padding: var(--spacing-md); }
  .blog__item { grid-template-columns: 1fr; gap: var(--spacing-xs); }
  .contact { grid-template-columns: 1fr; }
  .contact__left { padding: var(--spacing-lg); }
}
`;

export default function BrutalistPreview() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="scanlines">
        <Navigation />
        <main>
          <Hero />
          <Projects />
          <Blog />
          <Tech />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
