import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface NetworkBackgroundProps {
  nodes: { id: string; x: number; y: number }[];
  activeNodeId: string | null;
}

export function NetworkBackground({ nodes, activeNodeId }: NetworkBackgroundProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate center point
  const centerX = 50;
  const centerY = 50;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Abstract Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('@assets/generated_images/dark_abstract_geometric_network_background.png')] bg-cover bg-center mix-blend-overlay" />
      
      {/* SVG Layer for Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node) => {
          const isTarget = activeNodeId === node.id;
          
          return (
            <g key={node.id}>
              {/* Static Line */}
              <line
                x1={`${centerX}%`}
                y1={`${centerY}%`}
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke="currentColor"
                className="text-primary/20"
                strokeWidth="1"
              />

              {/* Shining Line Animation */}
              <motion.line
                x1={`${centerX}%`}
                y1={`${centerY}%`}
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke="url(#gradient-shine)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isTarget ? 1 : 0.2, 
                  opacity: isTarget ? 1 : 0.1,
                  strokeDasharray: isTarget ? "0 0" : "10 20"
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut",
                  repeat: isTarget ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
            </g>
          );
        })}
        
        {/* Connection Gradient */}
        <defs>
          <linearGradient id="gradient-shine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
