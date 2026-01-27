import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { User, Code, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRetroSfx } from "@/hooks/useRetroSfx";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { cn } from "@/lib/utils";
import { RetroHeroBackground } from "@/components/RetroHeroBackground";
import { MouseTrackingAvatar } from "@/components/MouseTrackingAvatar";

const menuItems = [
  { path: "/bio", label: "Bio", icon: User },
  { path: "/projects", label: "Projects", icon: Code },
  { path: "/blog", label: "Blog", icon: BookOpen },
];

export default function Home() {
  useDocumentMeta({
    title: "Walter Andrade | Developer & Thinker",
    description: "Software developer with a background in philosophy and logic. Building rigorous, elegant systems. Exploring ideas at the intersection of code and thought.",
    canonical: "/",
  });

  const isMobile = useIsMobile();
  const sfx = useRetroSfx();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
      {!isMobile && <RetroHeroBackground />}

      <div className="relative z-20 flex flex-col items-center gap-8 px-4 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl md:text-6xl tracking-widest uppercase mb-2 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
            Walter Andrade
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-mono tracking-wider">
            Logic <span className="text-accent mx-2">×</span> Philosophy{" "}
            <span className="text-accent mx-2">×</span> Code
          </p>
        </motion.div>

        {/* Avatar with orbiting buttons */}
        {!isMobile && (
          <div className="relative w-80 h-80 flex items-center justify-center overflow-visible">
            <MouseTrackingAvatar />
            {menuItems.map((item, index) => {
              const angle = (index * 120 - 30) * (Math.PI / 180);
              const radius = 150;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, scale: 0, x, y }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="absolute"
                >
                  <Link
                    href={item.path}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      sfx.hover();
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => sfx.navigate()}
                    className={cn(
                      "group flex flex-col items-center gap-2 p-3",
                      "border-2 border-border bg-background/80 backdrop-blur-sm rounded-lg",
                      "transition-all duration-200",
                      "hover:border-primary hover:bg-primary/10",
                      "hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-6 h-6 transition-colors",
                        hoveredIndex === index
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                    <span
                      className={cn(
                        "font-display text-xs tracking-widest uppercase transition-colors",
                        hoveredIndex === index ? "text-primary" : "text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Mobile menu fallback */}
        {isMobile && (
          <nav className="flex gap-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={item.path}
                  onClick={() => sfx.navigate()}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3",
                    "border-2 border-border bg-background/80 rounded-lg",
                    "transition-all duration-200",
                    "hover:border-primary hover:bg-primary/10"
                  )}
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-display text-xs tracking-widest uppercase">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider"
        >
          v1.0 &nbsp;|&nbsp; 2025
        </motion.div>
      </div>
    </div>
  );
}
