import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleX = shouldReduceMotion ? scrollYProgress : smoothScaleX;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left z-50"
      style={{ scaleX }}
    />
  );
}
