"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed left-6 top-0 bottom-0 z-50 hidden lg:flex items-center">
      <div className="relative h-screen w-[2px] bg-gray-700 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full origin-top"
          style={{
            scaleY,
            background: 'linear-gradient(180deg, rgba(58, 129, 180, 1) 0%, rgba(167, 73, 186, 1) 50%, rgba(0, 217, 25, 1) 100%)',
          }}
        />
      </div>
    </div>
  );
}

