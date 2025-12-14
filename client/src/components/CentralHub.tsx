import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export function CentralHub() {
  const [sparks, setSparks] = useState<any[]>([]);

  // Generate random lightning paths
  useEffect(() => {
    const generateSparks = () => {
      const newSparks = Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60) + (Math.random() * 30 - 15);
        const length = 100 + Math.random() * 50;
        // Create a jagged path
        const segments = 5;
        let path = "M 0 0";
        for (let j = 1; j <= segments; j++) {
          const x = (length / segments) * j;
          const y = (Math.random() * 20 - 10);
          path += ` L ${x} ${y}`;
        }
        return { id: i, angle, path, delay: Math.random() * 2 };
      });
      setSparks(newSparks);
    };
    
    generateSparks();
    // Regenerate occasionally to keep it fresh
    const interval = setInterval(generateSparks, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0">
      
      {/* Lightning Sparks Container */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute left-1/2 top-1/2 origin-left w-0 h-0"
            style={{ rotate: `${spark.angle}deg` }}
          >
            <svg 
              width="200" 
              height="40" 
              viewBox="0 -20 200 40" 
              className="overflow-visible"
              style={{ transform: "translateY(-50%)" }}
            >
              <motion.path
                d={spark.path}
                fill="transparent"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="square"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1], 
                  opacity: [0, 1, 0],
                  strokeWidth: [2, 1, 0]
                }}
                transition={{
                  duration: 0.15, // Very fast zap
                  repeat: Infinity,
                  repeatDelay: 0.5 + Math.random() * 2, // Random intervals
                  ease: "linear",
                  delay: spark.delay
                }}
              />
              {/* Secondary faint spark for glow effect */}
              <motion.path
                d={spark.path}
                fill="transparent"
                stroke="var(--color-primary)"
                strokeWidth="6"
                strokeLinecap="square"
                className="opacity-20 blur-[2px]"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1], 
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                  repeatDelay: 0.5 + Math.random() * 2,
                  ease: "linear",
                  delay: spark.delay
                }}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Central Core Icon */}
      <div className="relative z-20 bg-background rounded-full p-4 border border-primary shadow-[0_0_15px_rgba(45,212,191,0.5)]">
        <Cpu className="w-8 h-8 text-primary" />
        
        {/* Rapid flicker overlay on the icon itself */}
        <motion.div 
          className="absolute inset-0 bg-primary rounded-full mix-blend-overlay"
          animate={{ opacity: [0, 0.5, 0, 0.2, 0] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
        />
      </div>

      {/* Rotating Tech Rings - kept mechanical */}
      <motion.div
        className="absolute w-32 h-32 border border-primary/30 rounded-full border-dashed z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-40 h-40 border border-primary/10 rounded-full z-0 opacity-50"
        style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
        animate={{ rotate: -180 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Shockwave ripple */}
      <motion.div
        className="absolute inset-0 border border-primary/40 rounded-full z-10"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
      />

    </div>
  );
}
