"use client";
import { useState } from "react";

export function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const gradientStyle = {
    backgroundImage: 'linear-gradient(90deg, rgba(58, 129, 180, 1) 0%, rgba(167, 73, 186, 1) 76%, rgba(0, 217, 25, 1) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10 bg-overlay/80 select-none">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black">
        Skip to main content
      </a>
      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center" aria-label="Main navigation">
        <a 
          href="#home" 
          className="text-xl font-bold text-white transition-colors px-2 py-1 rounded"
          onMouseEnter={() => setHoveredItem('logo')}
          onMouseLeave={() => setHoveredItem(null)}
          style={hoveredItem === 'logo' ? {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            ...gradientStyle
          } : undefined}
        >
          WA
        </a>
        <ul className="flex gap-6">
          <li>
            <a 
              href="#about" 
              className="text-subtext transition-colors px-2 py-1 rounded"
              onMouseEnter={() => setHoveredItem('about')}
              onMouseLeave={() => setHoveredItem(null)}
              style={hoveredItem === 'about' ? {
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                ...gradientStyle
              } : undefined}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className="text-subtext transition-colors px-2 py-1 rounded"
              onMouseEnter={() => setHoveredItem('projects')}
              onMouseLeave={() => setHoveredItem(null)}
              style={hoveredItem === 'projects' ? {
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                ...gradientStyle
              } : undefined}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#experience" 
              className="text-subtext transition-colors px-2 py-1 rounded"
              onMouseEnter={() => setHoveredItem('experience')}
              onMouseLeave={() => setHoveredItem(null)}
              style={hoveredItem === 'experience' ? {
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                ...gradientStyle
              } : undefined}
            >
              Experience
            </a>
          </li>
          <li>
            <a 
              href="#tech" 
              className="text-subtext transition-colors px-2 py-1 rounded"
              onMouseEnter={() => setHoveredItem('tech')}
              onMouseLeave={() => setHoveredItem(null)}
              style={hoveredItem === 'tech' ? {
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                ...gradientStyle
              } : undefined}
            >
              Tech
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="text-subtext transition-colors px-2 py-1 rounded"
              onMouseEnter={() => setHoveredItem('contact')}
              onMouseLeave={() => setHoveredItem(null)}
              style={hoveredItem === 'contact' ? {
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                ...gradientStyle
              } : undefined}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
