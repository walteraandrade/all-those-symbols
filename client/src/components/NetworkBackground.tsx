import { motion } from "framer-motion";
import { useMotion } from "@/contexts/MotionContext";

interface NetworkBackgroundProps {
  nodes: { id: string; x: number; y: number }[];
  activeNodeId: string | null;
}

export function NetworkBackground({ nodes, activeNodeId }: NetworkBackgroundProps) {
  const { prefersReducedMotion } = useMotion();
  const centerX = 50;
  const centerY = 50;

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('@assets/generated_images/dark_abstract_geometric_network_background.png')] bg-cover bg-center mix-blend-overlay grayscale" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="gradient-shine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {nodes.map((node) => {
          const isTarget = activeNodeId === node.id;

          return (
            <g key={node.id}>
              {/* Static line */}
              <line
                x1={`${centerX}%`}
                y1={`${centerY}%`}
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke="currentColor"
                className="text-primary/5"
                strokeWidth="1"
              />

              {/* Animated line - only if motion allowed */}
              {!prefersReducedMotion && (
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
                    strokeDasharray: isTarget ? "0 0" : "10 20",
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: isTarget ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
