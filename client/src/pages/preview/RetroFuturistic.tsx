import RetroHomePage from "../../../../design-proposals/retro-futuristic/HomePage";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Mono:wght@400;700&family=VT323&display=swap');

:root {
  --color-void: #0a0a0f; --color-midnight: #12121a; --color-steel: #1a1a2e; --color-chrome: #2a2a4a;
  --color-cyan: #00fff9; --color-magenta: #ff00ff; --color-hot-pink: #ff2a6d;
  --color-electric-blue: #05d9e8; --color-purple: #7b2cbf; --color-amber: #ffb000; --color-lime: #39ff14;
  --color-text-primary: #e0e0ff; --color-text-secondary: #8888aa; --color-text-muted: #555577;
  --font-display: 'Press Start 2P', monospace;
  --font-terminal: 'VT323', monospace;
  --font-body: 'Space Mono', monospace;
  --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem; --text-lg: 1.25rem;
  --text-xl: 1.5rem; --text-2xl: 2rem; --text-3xl: 3rem; --text-4xl: 4rem;
  --text-hero: clamp(3rem, 10vw, 6rem);
  --space-xs: 0.25rem; --space-sm: 0.5rem; --space-md: 1rem; --space-lg: 2rem; --space-xl: 4rem; --space-2xl: 8rem;
  --glow-cyan: 0 0 10px #00fff9, 0 0 20px #00fff9, 0 0 40px #00fff966;
  --glow-magenta: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff66;
  --text-glow-cyan: 0 0 10px #00fff9, 0 0 20px #00fff966;
  --text-glow-magenta: 0 0 10px #ff00ff, 0 0 20px #ff00ff66;
  --timing-fast: 150ms; --timing-normal: 300ms; --timing-slow: 600ms; --timing-pulse: 2s;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-body); font-size: var(--text-base); color: var(--color-text-primary); background: var(--color-void); line-height: 1.6; overflow-x: hidden; }

.app { min-height: 100vh; position: relative; }

.scanlines { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1000; overflow: hidden; }
.scanlines::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px); animation: scanlineMove 10s linear infinite; }
@keyframes scanlineMove { 0% { transform: translateY(0); } 100% { transform: translateY(4px); } }

.grid-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; perspective: 500px; overflow: hidden; }
.grid-bg::before { content: ''; position: absolute; bottom: 0; left: -50%; width: 200%; height: 60%; background-image: linear-gradient(var(--color-magenta) 1px, transparent 1px), linear-gradient(90deg, var(--color-magenta) 1px, transparent 1px); background-size: 60px 60px; transform: rotateX(60deg); transform-origin: center bottom; opacity: 0.15; }
.grid-bg::after { content: ''; position: absolute; bottom: 30%; left: 0; width: 100%; height: 200px; background: linear-gradient(180deg, transparent 0%, var(--color-hot-pink) 50%, var(--color-purple) 100%); filter: blur(60px); opacity: 0.3; }

.text-glow-cyan { text-shadow: var(--text-glow-cyan); color: var(--color-cyan); }
.text-gradient { background: linear-gradient(90deg, var(--color-cyan), var(--color-magenta)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

.hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; position: relative; padding: var(--space-lg); }
.hero-title { font-family: var(--font-display); font-size: var(--text-hero); margin-bottom: var(--space-md); animation: flickerIn 0.5s ease-out, glowPulse var(--timing-pulse) ease-in-out infinite; }
.hero-tagline { font-family: var(--font-terminal); font-size: var(--text-2xl); color: var(--color-cyan); margin-bottom: var(--space-lg); text-shadow: var(--text-glow-cyan); }
.hero-tagline .separator { color: var(--color-magenta); margin: 0 var(--space-sm); animation: blink 1s step-end infinite; }

.glitch { position: relative; }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.glitch::before { color: var(--color-cyan); animation: glitchLeft 2s infinite linear alternate-reverse; clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); }
.glitch::after { color: var(--color-hot-pink); animation: glitchRight 2s infinite linear alternate-reverse; clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); }
@keyframes glitchLeft { 0%, 100% { transform: translate(0); } 20% { transform: translate(-2px, 1px); } 40% { transform: translate(-1px, -1px); } 60% { transform: translate(2px, 1px); } 80% { transform: translate(1px, -1px); } }
@keyframes glitchRight { 0%, 100% { transform: translate(0); } 20% { transform: translate(2px, -1px); } 40% { transform: translate(1px, 1px); } 60% { transform: translate(-2px, -1px); } 80% { transform: translate(-1px, 1px); } }

.terminal { background: var(--color-midnight); border: 2px solid var(--color-cyan); border-radius: 8px; overflow: hidden; box-shadow: var(--glow-cyan); max-width: 800px; margin: var(--space-xl) auto; }
.terminal-header { background: linear-gradient(90deg, var(--color-steel), var(--color-chrome)); padding: var(--space-sm) var(--space-md); display: flex; align-items: center; gap: var(--space-sm); }
.terminal-dot { width: 12px; height: 12px; border-radius: 50%; }
.terminal-dot.red { background: #ff5f56; }
.terminal-dot.yellow { background: #ffbd2e; }
.terminal-dot.green { background: #27c93f; }
.terminal-title { font-family: var(--font-terminal); color: var(--color-text-secondary); font-size: var(--text-sm); margin-left: auto; }
.terminal-body { padding: var(--space-lg); font-family: var(--font-terminal); font-size: var(--text-lg); line-height: 1.8; }
.terminal-line { margin-bottom: var(--space-sm); }
.terminal-prompt { color: var(--color-lime); }
.terminal-command { color: var(--color-cyan); }
.terminal-output { color: var(--color-text-primary); padding-left: var(--space-md); }

.cursor { display: inline-block; width: 10px; height: 1.2em; background: var(--color-cyan); margin-left: 2px; animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.btn-neon { font-family: var(--font-display); font-size: var(--text-sm); text-transform: uppercase; letter-spacing: 0.1em; padding: var(--space-md) var(--space-xl); background: transparent; border: 2px solid var(--color-cyan); color: var(--color-cyan); cursor: pointer; position: relative; overflow: hidden; transition: all var(--timing-normal) ease; text-decoration: none; display: inline-block; }
.btn-neon:hover { box-shadow: var(--glow-cyan); background: rgba(0, 255, 249, 0.1); }
.btn-neon--magenta { border-color: var(--color-magenta); color: var(--color-magenta); }
.btn-neon--magenta:hover { box-shadow: var(--glow-magenta); background: rgba(255, 0, 255, 0.1); }

.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-lg); padding: var(--space-xl); max-width: 1400px; margin: 0 auto; }
.project-card { background: linear-gradient(135deg, var(--color-steel) 0%, var(--color-midnight) 100%); border: 1px solid var(--color-chrome); padding: var(--space-lg); position: relative; overflow: hidden; transition: all var(--timing-normal) ease; }
.project-card:hover { transform: translateY(-4px); border-color: var(--color-cyan); box-shadow: var(--glow-cyan); }
.project-card__title { font-family: var(--font-display); font-size: var(--text-sm); color: var(--color-cyan); margin-bottom: var(--space-md); text-transform: uppercase; }
.project-card__desc { font-family: var(--font-terminal); font-size: var(--text-lg); color: var(--color-text-secondary); margin-bottom: var(--space-md); }
.project-card__tags { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
.tag { font-family: var(--font-terminal); font-size: var(--text-sm); color: var(--color-magenta); padding: var(--space-xs) var(--space-sm); border: 1px solid var(--color-magenta); opacity: 0.7; }

.section-header { text-align: center; margin-bottom: var(--space-xl); position: relative; }
.section-header__title { font-family: var(--font-display); font-size: var(--text-2xl); color: var(--color-text-primary); text-transform: uppercase; letter-spacing: 0.2em; }
.section-header__subtitle { font-family: var(--font-terminal); font-size: var(--text-lg); color: var(--color-magenta); margin-top: var(--space-sm); }

.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: var(--space-md) var(--space-xl); background: linear-gradient(180deg, var(--color-void) 0%, transparent 100%); }
.nav-list { display: flex; justify-content: center; gap: var(--space-xl); list-style: none; }
.nav-link { font-family: var(--font-terminal); font-size: var(--text-lg); color: var(--color-text-secondary); text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; position: relative; transition: color var(--timing-fast) ease; }
.nav-link:hover { color: var(--color-cyan); text-shadow: var(--text-glow-cyan); }

@keyframes flickerIn { 0% { opacity: 0; transform: scale(1.1); } 10% { opacity: 0.5; } 20% { opacity: 0.2; } 30% { opacity: 0.8; } 40% { opacity: 0.4; } 50% { opacity: 1; transform: scale(1); } 60% { opacity: 0.7; } 70% { opacity: 1; } 100% { opacity: 1; } }
@keyframes glowPulse { 0%, 100% { text-shadow: 0 0 10px var(--color-cyan), 0 0 20px var(--color-cyan), 0 0 40px var(--color-cyan); } 50% { text-shadow: 0 0 20px var(--color-cyan), 0 0 40px var(--color-cyan), 0 0 80px var(--color-cyan); } }

.vhs-effect { position: relative; }
.vhs-effect::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%); animation: vhsScroll 8s linear infinite; pointer-events: none; }
@keyframes vhsScroll { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
`;

export default function RetroFuturisticPreview() {
  return (
    <>
      <style>{STYLES}</style>
      <RetroHomePage />
    </>
  );
}
