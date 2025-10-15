"use client";
import { motion } from "framer-motion";
import { GradientHeading } from "@/components/gradient-heading";

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
        <GradientHeading className="text-3xl font-bold mb-6">
          About Me
        </GradientHeading>
        <p className="text-lg leading-relaxed text-subtext">
          As a child, I was captivated by computers and the world of reading. My formal academic journey began with studies in literature and journalism, before I delved into philosophy, where I discovered a profound love for formal logic and the philosophy of mathematics. This rigorous, first-principles approach &quot;naturally&quot; led me to programming. I now apply this foundation to leading teams and architecting full-stack applications, thriving on building elegant and efficient systems. My journey with programming started with building simple apps, knowing a little bit about javascript to implement full systems from the ground up, even in a time where everything is simply handled to you. These experiences taught me that programming is nothing more than converting human problems into computer problems, and that this is fun. I am currently at the forefront of exploring and implementing solutions in the new frontiers of Artificial Intelligence and Large Language Models, while also profoundly curious about how the philosophical debate is changing because of this new technology.
        </p>
      </motion.div>
    </section>
  );
}
