"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GradientHeadingProps extends Omit<HTMLMotionProps<"h1">, "children"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  className?: string;
}

export function GradientHeading({ 
  as = "h2", 
  children, 
  className = "",
  ...motionProps 
}: GradientHeadingProps) {
  const Component = motion[as] as typeof motion.h1;
  
  return (
    <Component
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, rgba(58, 129, 180, 1) 0%, rgba(167, 73, 186, 1) 76%, rgba(0, 217, 25, 1) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...motionProps.style
      }}
      {...motionProps}
    >
      {children}
    </Component>
  );
}

