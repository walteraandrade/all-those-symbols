"use client";
import { motion } from "framer-motion";
import { AnimatedBorder } from "@/components/AnimatedBorder";

export function Hero() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section 
      id="home" 
      className="section flex flex-col items-start justify-center min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/hero-bg.png)' }}
      aria-label="Hero section"
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-overlay/40" aria-hidden="true" />
      
      {/* Content positioned to the left for cleaner area */}
      <div className="relative z-10 max-w-2xl ml-0 lg:ml-8">
        <motion.h1
          className="text-4xl lg:text-5xl font-bold mb-4 text-white"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.7 }}
        >
          Hi, I'm Walter Andrade
        </motion.h1>
        <motion.p
          className="text-lg lg:text-xl max-w-lg mb-8 text-gray-200"
          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { delay: 0.3, duration: 0.7 }}
        >
          I build reliable software and thoughtful interfaces.
        </motion.p>
        <div className="flex gap-3 flex-col sm:flex-row">
          <a href="#projects" className="px-4 py-2 border border-gray-400 bg-zinc-900 text-gray-300 text-sm hover:bg-zinc-800 transition-colors">
            View Projects
          </a>
          <a href="#contact" className="px-4 py-2 border border-gray-400 bg-zinc-900 text-gray-300 text-sm hover:bg-zinc-800 transition-colors">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
