import { Link } from "wouter";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotion } from "@/contexts/MotionContext";

interface ContentNodeProps {
  id: string;
  title: string;
  icon: LucideIcon;
  x: number;
  y: number;
}

const pathMap: Record<string, string> = {
  bio: "/bio",
  projects: "/projects",
  music: "/music",
  blog: "/blog",
};

export function ContentNode({ id, title, icon: Icon, x, y }: ContentNodeProps) {
  const { prefersReducedMotion } = useMotion();
  const path = pathMap[id] || "/";

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.95 },
      };

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ left: `${x}%`, top: `${y}%` }}
      {...motionProps}
    >
      <Link
        href={path}
        aria-label={`Navigate to ${title}`}
        className={cn(
          "relative flex flex-col items-center justify-center p-4 rounded-full border-2 transition-all duration-300",
          "bg-background/80 border-border hover:border-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <Icon
          className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground transition-colors group-hover:text-primary"
          aria-hidden="true"
        />

        <span className="absolute top-full mt-2 text-xs md:text-sm font-display tracking-widest uppercase whitespace-nowrap text-muted-foreground">
          {title}
        </span>
      </Link>
    </motion.div>
  );
}
