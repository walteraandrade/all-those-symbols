import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentNodeProps {
  id: string;
  title: string;
  icon: LucideIcon;
  x: number;
  y: number;
  isActive: boolean;
  onClick: (id: string) => void;
}

export function ContentNode({ id, title, icon: Icon, x, y, isActive, onClick }: ContentNodeProps) {
  return (
    <motion.div
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10",
        isActive ? "z-20" : "z-10"
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={() => onClick(id)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={cn(
        "relative flex flex-col items-center justify-center p-4 rounded-full border-2 transition-all duration-500",
        isActive 
          ? "bg-background border-primary shadow-[0_0_30px_rgba(45,212,191,0.3)]" 
          : "bg-background/80 border-border hover:border-primary/50"
      )}>
        <Icon className={cn(
          "w-6 h-6 md:w-8 md:h-8 transition-colors duration-300",
          isActive ? "text-primary" : "text-muted-foreground"
        )} />
        
        <motion.span 
          className={cn(
            "absolute top-full mt-2 text-xs md:text-sm font-display tracking-widest uppercase whitespace-nowrap",
            isActive ? "text-primary font-bold" : "text-muted-foreground"
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.span>
      </div>

      {/* Pulse Effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border border-primary"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
