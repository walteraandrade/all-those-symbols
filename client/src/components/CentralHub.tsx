import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export function CentralHub() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0">
      {/* Central Core Icon */}
      <div className="relative z-20 bg-background rounded-full p-4 border-2 border-primary/50 shadow-[0_0_30px_var(--color-primary)]">
        <Cpu className="w-8 h-8 text-primary" />
      </div>

      {/* Pulsing Core Glow */}
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-full z-10"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating Rings */}
      <motion.div
        className="absolute w-32 h-32 border border-primary/20 rounded-full border-dashed z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-48 h-48 border border-primary/10 rounded-full border-dashed z-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Electric Sparks */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent origin-left z-0"
          style={{ 
            width: "120px",
            rotate: i * 45,
            x: "0%",
            y: "-50%",
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 1.2],
            x: ["0%", "20%"] // Move slightly outward
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: Math.random() * 3, // Random delays for chaotic electric feel
            delay: Math.random() * 2,
            ease: "circOut"
          }}
        />
      ))}

      {/* Random Arcs/Lightning */}
      <svg className="absolute w-96 h-96 pointer-events-none overflow-visible z-0 opacity-50">
         <motion.path
            d="M 192,192 Q 250,150 300,192"
            fill="transparent"
            stroke="var(--color-primary)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
         />
         <motion.path
            d="M 192,192 Q 150,250 100,192"
            fill="transparent"
            stroke="var(--color-primary)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3.5, ease: "linear", delay: 1 }}
         />
      </svg>
    </div>
  );
}
