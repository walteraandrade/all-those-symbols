"use client";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10 bg-overlay/80 select-none">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black">
        Skip to main content
      </a>
      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center" aria-label="Main navigation">
        <a href="#home" className="text-xl font-bold text-white hover:text-primary transition-colors">
          WA
        </a>
        <ul className="flex gap-6">
          <li>
            <a href="#about" className="text-subtext hover:text-primary transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="text-subtext hover:text-primary transition-colors">
              Projects
            </a>
          </li>
          <li>
            <a href="#experience" className="text-subtext hover:text-primary transition-colors">
              Experience
            </a>
          </li>
          <li>
            <a href="#tech" className="text-subtext hover:text-primary transition-colors">
              Tech
            </a>
          </li>
          <li>
            <a href="#contact" className="text-subtext hover:text-primary transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
