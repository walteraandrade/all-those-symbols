"use client"

import { motion } from "framer-motion";

interface StaggerAnimationProps {
  className?: string;
  text: string;
}

const defaultAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
export const StaggerAnimation: React.FC<StaggerAnimationProps> = ({
  className,
  text,
}) => {
  return (
    <div className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: 0.1,
          delayChildren: 0.2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {text.split("").map((letter, index) => (
          <motion.span variants={defaultAnimation} key={index}>
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
};