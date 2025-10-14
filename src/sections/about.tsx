"use client";
import { motion } from "framer-motion";

export function About() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section id="about" className="section">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? {} : { duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white">
          About Me
        </h2>
        <p className="text-lg leading-relaxed text-subtext">
          As a child, I was captivated by computers and the world of reading. My formal academic journey began with studies in literature and journalism, before I delved into philosophy, where I discovered a profound love for formal logic and the philosophy of mathematics. This rigorous, first-principles approach naturally led me to programming. I now apply this foundation to leading teams and architecting full-stack applications, thriving on building elegant, efficient systems. I am currently at the forefront of exploring and implementing solutions in the new frontiers of Artificial Intelligence and Large Language Models.
        </p>
      </motion.div>
    </section>
  );
}
