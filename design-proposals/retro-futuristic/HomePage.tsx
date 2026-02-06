import { useState, useEffect, FC } from 'react'
import './styles.css'

interface Project {
  id: string
  name: string
  description: string
  tags: string[]
}

interface BlogPost {
  id: string
  title: string
  category: string
}

const PROJECTS: Project[] = [
  { id: 'modulart', name: 'Modulart', description: 'Event platform for creative gatherings', tags: ['Next.js', 'PostgreSQL'] },
  { id: 'naporta', name: 'NaPorta', description: 'Last-mile delivery solution', tags: ['React Native', 'Node.js'] },
  { id: 'payssego', name: 'Payssego', description: 'Fintech payment gateway', tags: ['TypeScript', 'AWS'] },
  { id: 'vivenda', name: 'Vivenda', description: 'Construction management platform', tags: ['React', 'PostgreSQL'] },
  { id: 'iop-pet', name: 'ioP Pet', description: 'Pet care mobile application', tags: ['React Native', 'Firebase'] },
  { id: 'ai-decco', name: 'AI Decco', description: 'AI-powered interior design', tags: ['Python', 'TensorFlow'] },
  { id: 'html-docx', name: 'HTML-DOCX', description: 'HTML to DOCX converter library', tags: ['TypeScript', 'npm'] },
  { id: 'aetheria', name: 'Aetheria', description: 'Browser-based adventure game', tags: ['Phaser.js', 'TypeScript'] },
  { id: 'smells-job', name: 'Smells Like Job Spirit', description: 'Job search browser extension', tags: ['Chrome API', 'React'] },
  { id: 'thought-weaver', name: 'The Thought Weaver', description: 'Connected notes system', tags: ['React', 'Graph DB'] },
]

const BLOG_POSTS: BlogPost[] = [
  { id: '1', title: 'Persona & the Mirror of Dreams', category: 'Bergman' },
  { id: '2', title: 'Stalker: Faith in the Zone', category: 'Tarkovsky' },
  { id: '3', title: 'Breathless Revolution', category: 'Godard' },
  { id: '4', title: 'Seven Samurai: Honor & Chaos', category: 'Kurosawa' },
  { id: '5', title: 'In the Mood for Longing', category: 'Wong Kar-Wai' },
  { id: '6', title: '8½: Fellini\'s Dream Logic', category: 'Fellini' },
  { id: '7', title: 'Gilberto Gil: Tropicalia Rebel', category: 'Music' },
]

const TECH_STACK = ['TypeScript', 'Python', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'GCP']

const TypewriterText: FC<{ text: string; delay?: number }> = ({ text, delay = 50 }) => {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowCursor(false), 2000)
      }
    }, delay)
    return () => clearInterval(timer)
  }, [text, delay])

  return (
    <span>
      {displayed}
      {showCursor && <span className="cursor" />}
    </span>
  )
}

const BootSequence: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([])
  const bootLines = [
    'WALTER_OS v2.0.24 initializing...',
    'Loading philosophy.dll... OK',
    'Loading logic.sys... OK',
    'Loading creativity.exe... OK',
    'Mounting /projects... 10 found',
    'Mounting /blog... 13 entries',
    'Neural networks: ONLINE',
    'Aesthetic modules: SYNTHWAVE',
    '',
    'BOOT COMPLETE. Welcome to the Digital Frontier.',
  ]

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < bootLines.length) {
        setLines(prev => [...prev, bootLines[i]])
        i++
      } else {
        clearInterval(timer)
        setTimeout(onComplete, 1500)
      }
    }, 200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="terminal" style={{ margin: '20vh auto', maxWidth: '700px' }}>
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">boot_sequence.sh</span>
      </div>
      <div className="terminal-body">
        {lines.map((line, idx) => (
          <div key={idx} className="terminal-line">
            <span className="terminal-prompt">{line ? '>' : ''}</span>{' '}
            <span className="terminal-output">{line}</span>
          </div>
        ))}
        <span className="cursor" />
      </div>
    </div>
  )
}

const Navigation: FC = () => (
  <nav className="nav">
    <ul className="nav-list">
      {['profile', 'projects', 'blog', 'contact'].map(item => (
        <li key={item}>
          <a href={`#${item}`} className="nav-link">
            {item}.exe
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

const HeroSection: FC = () => (
  <section className="hero" id="profile">
    <h1 className="hero-title glitch text-glow-cyan" data-text="WALTER ANDRADE">
      WALTER ANDRADE
    </h1>
    <p className="hero-tagline">
      Logic<span className="separator">×</span>Philosophy<span className="separator">×</span>Code
    </p>
    <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)' }}>
      <a href="#projects" className="btn-neon">View Projects</a>
      <a href="#contact" className="btn-neon btn-neon--magenta">Contact</a>
    </div>
  </section>
)

const BioTerminal: FC = () => (
  <div className="terminal">
    <div className="terminal-header">
      <span className="terminal-dot red" />
      <span className="terminal-dot yellow" />
      <span className="terminal-dot green" />
      <span className="terminal-title">walter@digital-frontier:~</span>
    </div>
    <div className="terminal-body">
      <div className="terminal-line">
        <span className="terminal-prompt">$</span>{' '}
        <span className="terminal-command">cat bio.txt</span>
      </div>
      <div className="terminal-output" style={{ marginTop: 'var(--space-md)' }}>
        <p>Senior Software Engineer @ SmartHow</p>
        <p style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
          Software developer with a philosophy degree in logic.
          Building AI interview bots, fintech platforms, e-learning systems, and mobile apps.
        </p>
        <p style={{ marginTop: 'var(--space-sm)', color: 'var(--color-magenta)' }}>
          &gt; Philosophy teaches clarity in complexity.
        </p>
      </div>
      <div className="terminal-line" style={{ marginTop: 'var(--space-lg)' }}>
        <span className="terminal-prompt">$</span>{' '}
        <span className="terminal-command">ls tech_stack/</span>
      </div>
      <div className="terminal-output" style={{ marginTop: 'var(--space-sm)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        {TECH_STACK.map(tech => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>
      <div className="terminal-line" style={{ marginTop: 'var(--space-lg)' }}>
        <span className="terminal-prompt">$</span>{' '}
        <span className="cursor" />
      </div>
    </div>
  </div>
)

const ProjectCard: FC<{ project: Project; index: number }> = ({ project, index }) => (
  <article
    className="project-card"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="pixel-corner pixel-corner--tl" />
    <div className="pixel-corner pixel-corner--br" />
    <h3 className="project-card__title">{project.name}</h3>
    <p className="project-card__desc">{project.description}</p>
    <div className="project-card__tags">
      {project.tags.map(tag => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  </article>
)

const ProjectsSection: FC = () => (
  <section id="projects" style={{ padding: 'var(--space-2xl) 0' }}>
    <header className="section-header">
      <h2 className="section-header__title text-gradient">PROJECTS.db</h2>
      <p className="section-header__subtitle">// 10 entries found</p>
    </header>
    <div className="projects-grid">
      {PROJECTS.map((project, idx) => (
        <ProjectCard key={project.id} project={project} index={idx} />
      ))}
    </div>
  </section>
)

const BlogSection: FC = () => (
  <section id="blog" style={{ padding: 'var(--space-2xl) var(--space-xl)' }}>
    <header className="section-header">
      <h2 className="section-header__title text-gradient">BLOG.log</h2>
      <p className="section-header__subtitle">// Cinema Analysis & Music</p>
    </header>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {BLOG_POSTS.map((post, idx) => (
        <article
          key={post.id}
          className="vhs-effect"
          style={{
            padding: 'var(--space-md) var(--space-lg)',
            borderBottom: '1px solid var(--color-chrome)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all var(--timing-fast) ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--color-steel)'
            e.currentTarget.style.paddingLeft = 'var(--space-xl)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.paddingLeft = 'var(--space-lg)'
          }}
        >
          <span style={{ fontFamily: 'var(--font-terminal)', fontSize: 'var(--text-lg)' }}>
            <span style={{ color: 'var(--color-cyan)', marginRight: 'var(--space-md)' }}>
              [{String(idx + 1).padStart(2, '0')}]
            </span>
            {post.title}
          </span>
          <span className="tag">{post.category}</span>
        </article>
      ))}
    </div>
  </section>
)

const ContactSection: FC = () => (
  <section id="contact" style={{ padding: 'var(--space-2xl) var(--space-xl)', textAlign: 'center' }}>
    <header className="section-header">
      <h2 className="section-header__title text-gradient">CONTACT.sys</h2>
      <p className="section-header__subtitle">// Establish connection</p>
    </header>
    <div className="terminal" style={{ maxWidth: '600px', textAlign: 'left' }}>
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">network_interface</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">$</span>{' '}
          <span className="terminal-command">ping walter</span>
        </div>
        <div className="terminal-output" style={{ marginTop: 'var(--space-md)' }}>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            <span style={{ color: 'var(--color-lime)' }}>EMAIL:</span>{' '}
            <a href="mailto:walteraandrade@gmail.com" style={{ color: 'var(--color-cyan)', textDecoration: 'none' }}>
              walteraandrade@gmail.com
            </a>
          </p>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            <span style={{ color: 'var(--color-lime)' }}>GITHUB:</span>{' '}
            <a href="https://github.com/walteraandrade" style={{ color: 'var(--color-cyan)', textDecoration: 'none' }}>
              @walteraandrade
            </a>
          </p>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            <span style={{ color: 'var(--color-lime)' }}>LINKEDIN:</span>{' '}
            <a href="https://linkedin.com/in/walteraandrade" style={{ color: 'var(--color-cyan)', textDecoration: 'none' }}>
              /in/walteraandrade
            </a>
          </p>
          <p>
            <span style={{ color: 'var(--color-lime)' }}>DISCORD:</span>{' '}
            <span style={{ color: 'var(--color-text-secondary)' }}>walter.andrade</span>
          </p>
        </div>
        <div className="terminal-line" style={{ marginTop: 'var(--space-lg)' }}>
          <span className="terminal-prompt">$</span>{' '}
          <TypewriterText text="Connection established. Awaiting transmission..." delay={40} />
        </div>
      </div>
    </div>
  </section>
)

const Footer: FC = () => (
  <footer style={{
    padding: 'var(--space-xl)',
    textAlign: 'center',
    borderTop: '1px solid var(--color-chrome)',
    marginTop: 'var(--space-2xl)',
  }}>
    <p style={{
      fontFamily: 'var(--font-terminal)',
      fontSize: 'var(--text-lg)',
      color: 'var(--color-text-muted)',
    }}>
      <span style={{ color: 'var(--color-cyan)' }}>&lt;/&gt;</span>{' '}
      with <span style={{ color: 'var(--color-hot-pink)' }}>logic</span> by Walter Andrade{' '}
      <span style={{ color: 'var(--color-cyan)' }}>&lt;/&gt;</span>
    </p>
    <p style={{
      fontFamily: 'var(--font-terminal)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-muted)',
      marginTop: 'var(--space-sm)',
    }}>
      "Where logic meets the digital frontier"
    </p>
  </footer>
)

export const HomePage: FC = () => {
  const [booted, setBooted] = useState(false)

  return (
    <div className="app">
      {/* Background effects */}
      <div className="grid-bg" />
      <div className="scanlines" />

      {!booted ? (
        <BootSequence onComplete={() => setBooted(true)} />
      ) : (
        <>
          <Navigation />
          <main>
            <HeroSection />
            <BioTerminal />
            <ProjectsSection />
            <BlogSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

export default HomePage
