import ArtDecoHomePage from "../../../../design-proposals/art-deco/HomePage";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&family=Josefin+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --navy: #0a0f1a; --navy-light: #141c2e; --navy-mid: #1a2540;
  --gold: #d4a574; --gold-light: #e8c9a0; --gold-dark: #c9a961;
  --brass: #b8956e; --bronze: #8b7355;
  --ivory: #f5f0e6; --cream: #faf7f0; --pearl: #e8e4dc; --charcoal: #2a2a2a;
  --emerald: #1a4d3e; --burgundy: #6b2d3c;
  --font-display: 'Poiret One', cursive;
  --font-heading: 'Josefin Sans', sans-serif;
  --font-body: 'Josefin Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --gradient-gold: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 25%, var(--gold-light) 50%, var(--gold) 75%, var(--gold-dark) 100%);
  --gradient-shimmer: linear-gradient(90deg, transparent 0%, rgba(212,165,116,0.4) 50%, transparent 100%);
  --shadow-glow: 0 0 20px rgba(212, 165, 116, 0.3);
  --transition-fast: 150ms ease-out;
  --transition-base: 300ms ease-out;
  --transition-slow: 500ms ease-out;
  --transition-reveal: 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-body); background: var(--navy); color: var(--ivory); line-height: 1.6; overflow-x: hidden; }

.display-title { font-family: var(--font-display); font-size: clamp(3rem, 10vw, 7rem); letter-spacing: 0.3em; text-transform: uppercase; color: var(--ivory); text-shadow: 0 0 60px rgba(212, 165, 116, 0.3); }
.display-subtitle { font-family: var(--font-heading); font-size: clamp(1rem, 2vw, 1.5rem); letter-spacing: 0.5em; text-transform: uppercase; color: var(--gold); font-weight: 300; }
.heading-1 { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.5rem); letter-spacing: 0.2em; text-transform: uppercase; color: var(--ivory); }
.heading-2 { font-family: var(--font-heading); font-size: clamp(1.5rem, 3vw, 2rem); letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold-light); font-weight: 500; }
.body-text { font-family: var(--font-body); font-size: 1rem; line-height: 1.8; color: var(--pearl); font-weight: 300; }
.mono-text { font-family: var(--font-mono); font-size: 0.875rem; color: var(--gold); }

.btn-deco { display: inline-flex; align-items: center; justify-content: center; padding: 1rem 2.5rem; font-family: var(--font-heading); font-size: 0.875rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; color: var(--gold); background: transparent; border: 2px solid var(--gold); position: relative; overflow: hidden; cursor: pointer; transition: all var(--transition-base); }
.btn-deco:hover { color: var(--navy); background: var(--gold); box-shadow: var(--shadow-glow); }
.btn-gold { background: var(--gradient-gold); background-size: 200% 100%; color: var(--navy); border: none; animation: shimmer 3s ease-in-out infinite; }
@keyframes shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

.card-deco { background: var(--navy-light); border: 1px solid rgba(212, 165, 116, 0.2); padding: 2rem; position: relative; transition: all var(--transition-base); }
.card-deco:hover { border-color: var(--gold); box-shadow: var(--shadow-glow); transform: translateY(-4px); }

.container-deco { width: 100%; max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
.section-deco { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 6rem 2rem; position: relative; }
.grid-deco { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }

.nav-deco { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.5rem 2rem; display: flex; justify-content: center; gap: 3rem; background: linear-gradient(180deg, var(--navy) 0%, transparent 100%); }
.nav-link { font-family: var(--font-heading); font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--pearl); text-decoration: none; position: relative; padding: 0.5rem 0; transition: color var(--transition-fast); }
.nav-link:hover { color: var(--gold); }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-up { animation: fadeInUp var(--transition-reveal) forwards; opacity: 0; }
.animate-delay-1 { animation-delay: 0.1s; }
.animate-delay-2 { animation-delay: 0.2s; }
.animate-delay-3 { animation-delay: 0.3s; }
.animate-delay-4 { animation-delay: 0.4s; }
.animate-delay-5 { animation-delay: 0.5s; }
`;

export default function ArtDecoPreview() {
  return (
    <>
      <style>{STYLES}</style>
      <ArtDecoHomePage />
    </>
  );
}
