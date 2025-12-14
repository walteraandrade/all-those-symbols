import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export function CentralHub() {
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 cursor-pointer"
      initial="idle"
      whileHover="hover"
    >
      
      {/* Core Icon - Stable and Clean */}
      <motion.div 
        className="relative z-20 bg-background/50 backdrop-blur-sm rounded-full p-4 border border-primary/20"
        variants={{
          idle: { 
            boxShadow: "0 0 20px rgba(45,212,191,0.1)", 
            scale: 1,
            borderColor: "rgba(45,212,191,0.2)"
          },
          hover: { 
            boxShadow: "0 0 50px rgba(45,212,191,0.3)", 
            scale: 1.1,
            borderColor: "rgba(45,212,191,0.6)"
          }
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Cpu className="w-6 h-6 text-primary/80" strokeWidth={1.5} />
      </motion.div>

      {/* Breathing Halo (The "Mind") */}
      <motion.div
        className="absolute inset-0 bg-primary/5 rounded-full z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sophisticated Orbital Rings (The "Logic") */}
      {/* Inner fine ring */}
      <motion.div
        className="absolute w-24 h-24 border border-primary/20 rounded-full z-0"
        style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        variants={{
          hover: { scale: 1.05, borderTopColor: "rgba(45,212,191,0.4)", borderLeftColor: "rgba(45,212,191,0.4)" }
        }}
      />
      
      {/* Middle dashed ring */}
      <motion.div
        className="absolute w-32 h-32 border border-primary/10 rounded-full border-dashed z-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        variants={{
          hover: { scale: 1.1, borderColor: "rgba(45,212,191,0.3)" }
        }}
      />

      {/* Outer subtle ring */}
      <motion.div
        className="absolute w-48 h-48 border border-primary/5 rounded-full z-0"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        variants={{
          hover: { scale: 1.15, borderColor: "rgba(45,212,191,0.2)" }
        }}
      />

      {/* Orbiting "Electron" Particle - Accelrates on hover */}
      <motion.div
        className="absolute w-32 h-32 z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        variants={{
          hover: { scale: 1.1 }
        }}
      >
        <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_5px_var(--color-accent)] transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

       {/* Counter-Orbiting "Electron" Particle */}
       <motion.div
        className="absolute w-20 h-20 z-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        variants={{
          hover: { scale: 1.1 }
        }}
      >
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_var(--color-primary)] transform -translate-x-1/2 translate-y-1/2" />
      </motion.div>

    </motion.div>
  );
}
