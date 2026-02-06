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

const TECH = [
  'TypeScript', 'Python', 'Next.js', 'React', 'Node.js',
  'PostgreSQL', 'AWS', 'GCP', 'Docker', 'GraphQL'
];

const ASCII_ART = `
    ╔═══════════════════════════════╗
    ║   LOGIC × PHILOSOPHY × CODE   ║
    ╚═══════════════════════════════╝
`;

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

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
        Let's<br />
        Build<br />
        Something
      </p>
    </div>
    <div className="contact__right">
      <a href="mailto:walteraandrade@gmail.com" className="contact__link">
        walteraandrade@gmail.com
      </a>
      <a href="https://github.com/walteraandrade" className="contact__link">
        github.com/walteraandrade
      </a>
      <a href="#" className="contact__link">
        linkedin.com/in/walterandrade
      </a>
      <a href="#" className="contact__link">
        discord
      </a>
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

export const HomePage = () => (
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
);

export default HomePage;
