import { motion } from "framer-motion";
import { ContentNode } from "@/components/ContentNode";
import { nodes } from "@/lib/data";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
      {/* Brand tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-16 px-4"
      >
        <p className="text-sm md:text-base text-muted-foreground font-mono">
          Logic <span className="text-accent mx-2">×</span> Philosophy{" "}
          <span className="text-accent mx-2">×</span> Code
        </p>
      </motion.div>

      {/* Navigation nodes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {nodes.map((node) => (
            <ContentNode key={node.id} {...node} />
          ))}
        </div>
      </div>
    </div>
  );
}
