"use client";
import { motion } from "framer-motion";

const sections = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "tech", label: "tech-stack" },
  { id: "contact", label: "contact" },
];

export function NavigationIndex() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section id="index" className="section py-12">
      <motion.nav
        className="max-w-7xl mx-auto"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? {} : { duration: 0.6 }}
      >
        {/* Root folder */}
        <div className="text-subtext text-lg mb-3">
          <span>sections/</span>
        </div>

        {/* File tree */}
        <ul className="space-y-2">
          {sections.map((section, index) => (
            <motion.li
              key={section.id}
              className="flex items-center"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? {} : { duration: 0.3, delay: index * 0.05 }}
            >
              {/* Tree connector */}
              <span className="text-gray-600 mr-3 text-base">
                {index === sections.length - 1 ? '└──' : '├──'}
              </span>
              
              {/* Link */}
              <a
                href={`#${section.id}`}
                className="text-subtext hover:text-white transition-colors text-base relative group"
              >
                {section.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </section>
  );
}

