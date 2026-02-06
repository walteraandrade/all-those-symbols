import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { User, Code, BookOpen, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRetroSfx } from "@/hooks/useRetroSfx";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { BrutalistBackground } from "@/components/BrutalistBackground";
import { BrutalistAvatar } from "@/components/BrutalistAvatar";
import { BrutalistOrbitButton } from "@/components/BrutalistOrbitButton";

const menuItems = [
  { path: "/bio", label: "Bio", icon: User },
  { path: "/projects", label: "Projects", icon: Code },
  { path: "/blog", label: "Blog", icon: BookOpen },
  { path: "/contact", label: "Contact", icon: Mail },
];

export default function Home() {
  useDocumentMeta({
    title: "Walter Andrade | Developer & Thinker",
    description: "Software developer with a background in philosophy and logic. Building rigorous, elegant systems. Exploring ideas at the intersection of code and thought.",
    canonical: "/",
  });

  const isMobile = useIsMobile();
  const sfx = useRetroSfx();
  const [, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center bg-[#F5F5F0]">
      {!isMobile && <BrutalistBackground />}

      <div className="relative z-20 flex flex-col items-center gap-8 px-4 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-mono text-4xl md:text-6xl tracking-tight uppercase mb-2 text-black glitch-hover">
            Walter Andrade<span className="cursor-blink text-red-500">_</span>
          </h1>
          <p className="text-sm md:text-base text-black/60 font-mono tracking-wider">
            Logic <span className="text-red-500 mx-2">/</span> Philosophy{" "}
            <span className="text-red-500 mx-2">/</span> Code
          </p>
        </motion.div>

        {/* Avatar with orbiting buttons */}
        {!isMobile && (
          <div className="relative w-80 h-80 flex items-center justify-center overflow-visible">
            <BrutalistAvatar />
            {menuItems.map((item, index) => {
              const angle = (index * 90 - 45) * (Math.PI / 180);
              const radius = 150;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <BrutalistOrbitButton
                  key={item.path}
                  path={item.path}
                  label={item.label}
                  icon={item.icon}
                  index={index}
                  x={x}
                  y={y}
                  onHover={() => {
                    setHoveredIndex(index);
                    sfx.hover();
                  }}
                  onClick={() => sfx.navigate()}
                />
              );
            })}
          </div>
        )}

        {/* Mobile menu fallback */}
        {isMobile && (
          <nav className="flex flex-wrap justify-center gap-2">
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
                  className="group flex items-center gap-2 px-3 py-2 bg-[#F5F5F0] border-brutal hover:bg-black hover:text-white hover:border-brutal-red"
                >
                  <span className="font-mono text-xs text-black/50 group-hover:text-white/50">
                    {`> ${String(index + 1).padStart(2, "0")}`}
                  </span>
                  <item.icon className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider group-hover:line-through">
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
          className="mt-8 text-[10px] text-black/30 font-mono uppercase tracking-wider"
        >
          v1.0 &nbsp;|&nbsp; 2025
        </motion.div>
      </div>
    </div>
  );
}
