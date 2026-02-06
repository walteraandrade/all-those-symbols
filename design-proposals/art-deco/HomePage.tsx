import { useEffect, useRef, useState } from 'react';
import './styles.css';

const PROJECTS = [
  { name: 'Modulart', desc: 'Event platform' },
  { name: 'NaPorta', desc: 'Delivery system' },
  { name: 'Payssego', desc: 'Fintech solution' },
  { name: 'Vivenda', desc: 'Construction tech' },
  { name: 'ioP Pet', desc: 'Mobile app' },
  { name: 'AI Decco', desc: 'Interior AI' },
  { name: 'HTML-DOCX', desc: 'Converter library' },
  { name: 'Aetheria', desc: 'Game project' },
  { name: 'Smells Like Job Spirit', desc: 'Browser extension' },
  { name: 'The Thought Weaver', desc: 'Notes app' },
];

const TECH_STACK = [
  'TypeScript', 'Python', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'GCP'
];

const NAV_LINKS = ['About', 'Projects', 'Blog', 'Contact'];

const SunburstPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute top-1/2 left-1/2 w-[200%] h-[200%]"
      style={{
        transform: 'translate(-50%, -50%)',
        background: `repeating-conic-gradient(
          from 0deg at 50% 50%,
          transparent 0deg 5deg,
          rgba(212, 165, 116, 0.02) 5deg 10deg
        )`,
      }}
    />
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute top-1/2 left-1/2 h-[1px] origin-left"
        style={{
          width: '150%',
          background: 'linear-gradient(90deg, rgba(212,165,116,0.3) 0%, transparent 70%)',
          transform: `translate(0, -50%) rotate(${i * 30}deg)`,
        }}
      />
    ))}
  </div>
);

const DecoFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative p-8 md:p-12">
    <div className="absolute inset-0 border-2 border-[var(--gold)] opacity-60" />
    <div className="absolute inset-3 border border-[var(--gold)] opacity-30" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[var(--gradient-gold)]" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[var(--gradient-gold)]" />
    <CornerOrnament position="top-left" />
    <CornerOrnament position="top-right" />
    <CornerOrnament position="bottom-left" />
    <CornerOrnament position="bottom-right" />
    {children}
  </div>
);

const CornerOrnament = ({ position }: { position: string }) => {
  const styles: Record<string, React.CSSProperties> = {
    'top-left': { top: -8, left: -8 },
    'top-right': { top: -8, right: -8, transform: 'rotate(90deg)' },
    'bottom-left': { bottom: -8, left: -8, transform: 'rotate(-90deg)' },
    'bottom-right': { bottom: -8, right: -8, transform: 'rotate(180deg)' },
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="absolute"
      style={styles[position]}
    >
      <path
        d="M0 24 L0 0 L24 0 L24 6 L6 6 L6 24 Z"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
      />
      <rect x="9" y="9" width="6" height="6" fill="var(--gold)" transform="rotate(45 12 12)" />
    </svg>
  );
};

const FanDivider = () => (
  <div className="flex items-center justify-center gap-6 my-16">
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    <svg width="60" height="30" viewBox="0 0 60 30">
      {[...Array(7)].map((_, i) => (
        <path
          key={i}
          d={`M30 30 L${15 + i * 5} 0 L${20 + i * 5} 0 Z`}
          fill={i % 2 === 0 ? 'var(--gold)' : 'transparent'}
          stroke="var(--gold)"
          strokeWidth="0.5"
        />
      ))}
    </svg>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
  </div>
);

const ChevronPattern = ({ className = '' }: { className?: string }) => (
  <div
    className={`absolute pointer-events-none opacity-10 ${className}`}
    style={{
      backgroundImage: `
        linear-gradient(135deg, var(--gold) 25%, transparent 25%),
        linear-gradient(225deg, var(--gold) 25%, transparent 25%)
      `,
      backgroundSize: '30px 15px',
      backgroundPosition: '0 0, 15px 0',
    }}
  />
);

const Navigation = () => (
  <nav className="nav-deco">
    {NAV_LINKS.map((link) => (
      <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
        {link}
      </a>
    ))}
  </nav>
);

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-deco relative min-h-screen">
      <SunburstPattern />
      <ChevronPattern className="top-0 left-0 w-32 h-full" />
      <ChevronPattern className="top-0 right-0 w-32 h-full" />

      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <DecoFrame>
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <p className="display-subtitle animate-fade-up animate-delay-1">
                Senior Software Engineer
              </p>
              <h1 className="display-title animate-fade-up animate-delay-2">
                Walter
                <br />
                Andrade
              </h1>
            </div>

            <div className="flex items-center justify-center gap-4 animate-fade-up animate-delay-3">
              <span className="w-12 h-[1px] bg-[var(--gold)]" />
              <p
                className="font-[var(--font-heading)] text-[var(--gold)] tracking-[0.3em] uppercase text-sm"
              >
                Logic × Philosophy × Code
              </p>
              <span className="w-12 h-[1px] bg-[var(--gold)]" />
            </div>

            <p className="body-text max-w-xl mx-auto animate-fade-up animate-delay-4">
              Software developer with a philosophy degree in logic.
              Building AI interview bots, fintech platforms, e-learning systems, and mobile applications.
              Philosophy teaches clarity in complexity.
            </p>

            <div className="flex justify-center gap-4 animate-fade-up animate-delay-5">
              <a href="#projects" className="btn-deco">
                View Work
              </a>
              <a href="#contact" className="btn-deco btn-gold">
                Get in Touch
              </a>
            </div>
          </div>
        </DecoFrame>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

const TechStackSection = () => (
  <section className="py-16 relative overflow-hidden">
    <div className="container-deco">
      <div className="flex flex-wrap justify-center gap-4">
        {TECH_STACK.map((tech, i) => (
          <span
            key={tech}
            className="mono-text px-4 py-2 border border-[var(--gold)] border-opacity-30 hover:border-opacity-100 hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-all duration-300"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card-deco group cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <svg width="40" height="20" viewBox="0 0 40 20">
            {[...Array(5)].map((_, i) => (
              <path
                key={i}
                d={`M20 20 L${8 + i * 6} 0 L${12 + i * 6} 0 Z`}
                fill={isHovered ? 'var(--gold)' : 'var(--navy-mid)'}
                stroke="var(--gold)"
                strokeWidth="0.5"
                style={{ transition: 'fill 300ms ease-out' }}
              />
            ))}
          </svg>
        </div>

        <div className="pt-4 text-center">
          <h3 className="heading-2 mb-2">{project.name}</h3>
          <p className="body-text text-sm opacity-70">{project.desc}</p>
        </div>

        <div className="mt-6 flex justify-center">
          <span className="mono-text text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            View Project →
          </span>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => (
  <section id="projects" className="section-deco relative py-24">
    <div className="absolute inset-0 pattern-fan opacity-30" />

    <div className="container-deco relative z-10">
      <div className="text-center mb-16">
        <h2 className="heading-1 mb-4">Selected Works</h2>
        <p className="display-subtitle">A decade of digital craftsmanship</p>
      </div>

      <FanDivider />

      <div className="grid-deco">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const BlogPreview = () => {
  const directors = ['Bergman', 'Tarkovsky', 'Godard', 'Kurosawa', 'Wong Kar-Wai', 'Fellini'];

  return (
    <section id="blog" className="section-deco bg-[var(--navy-light)] relative">
      <ChevronPattern className="top-0 left-0 right-0 h-20" />
      <ChevronPattern className="bottom-0 left-0 right-0 h-20 rotate-180" />

      <div className="container-deco relative z-10">
        <div className="text-center mb-16">
          <h2 className="heading-1 mb-4">The Journal</h2>
          <p className="display-subtitle">Cinema • Philosophy • Music</p>
        </div>

        <FanDivider />

        <div className="max-w-2xl mx-auto text-center">
          <p className="body-text mb-8">
            Essays exploring the intersection of visual storytelling and philosophical inquiry.
            From the existential landscapes of Tarkovsky to the rhythmic poetry of Gilberto Gil.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {directors.map((director) => (
              <span
                key={director}
                className="px-4 py-2 border border-[var(--gold)] border-opacity-20 text-[var(--pearl)] text-sm tracking-wider hover:border-opacity-100 hover:text-[var(--gold)] transition-all cursor-pointer"
              >
                {director}
              </span>
            ))}
          </div>

          <a href="/blog" className="btn-deco">
            Read Essays
          </a>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="section-deco relative py-32">
    <SunburstPattern />

    <div className="container-deco relative z-10 max-w-2xl">
      <DecoFrame>
        <div className="text-center space-y-8">
          <h2 className="heading-1">Let's Build</h2>
          <p className="display-subtitle">Together</p>

          <FanDivider />

          <p className="body-text">
            Currently crafting intelligent systems at SmartHow.
            Open to collaborations that value precision and elegance.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:walteraandrade@gmail.com"
              className="block mono-text hover:text-[var(--gold)] transition-colors"
            >
              walteraandrade@gmail.com
            </a>

            <div className="flex justify-center gap-6">
              {[
                { name: 'GitHub', href: 'https://github.com/walteraandrade' },
                { name: 'LinkedIn', href: '#' },
                { name: 'Discord', href: '#' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </DecoFrame>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 border-t border-[var(--gold)] border-opacity-20">
    <div className="container-deco text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="w-8 h-[1px] bg-[var(--gold)]" />
        <div className="w-2 h-2 bg-[var(--gold)] transform rotate-45" />
        <span className="w-8 h-[1px] bg-[var(--gold)]" />
      </div>
      <p className="mono-text text-xs opacity-50">
        © {new Date().getFullYear()} Walter Andrade
      </p>
    </div>
  </footer>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--navy)]">
      <Navigation />
      <main>
        <HeroSection />
        <TechStackSection />
        <ProjectsSection />
        <BlogPreview />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
