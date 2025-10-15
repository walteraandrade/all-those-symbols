"use client";
import { motion } from "framer-motion";
import { GradientHeading } from "@/components/gradient-heading";

export function Hero() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section 
      id="home" 
      className="section flex flex-col items-start justify-center min-h-screen relative bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url(/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-overlay/40 border-2 p-4" aria-hidden="true" />
      
      <div className="relative z-10 max-w-2xl w-full top-[400px] border-2 bg-[#0E0E0E] p-4">
        <GradientHeading
          as="h1"
          className="text-4xl lg:text-5xl font-bold mb-4"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.7 }}
        >
          Hi, I&apos;m Walter Andrade
        </GradientHeading>
        <motion.p
          className="text-lg lg:text-xl max-w-lg mb-8 text-gray-200"
          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { delay: 0.3, duration: 0.7 }}
        >
          I have fun transforming{' '}
          <span style={{ color: 'rgba(58, 129, 180, 1)' }}>human problems </span>
          
          <span style={{ color: 'rgba(167, 73, 186, 1) ' }}>into</span>
          {' '}<span style={{ color: 'rgba(0, 217, 25, 1)' }}>computer solutions.</span>
        </motion.p>
        
      </div>
    </section>
  );
}
