import { ReactNode } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { MainNav } from "@/components/MainNav";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NetworkBackground } from "@/components/NetworkBackground";
import { CentralHub } from "@/components/CentralHub";
import { nodes } from "@/lib/data";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const isHome = location === "/";
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-x-hidden font-sans selection:bg-primary/20">
      {/* Skip link for a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-primary focus:rounded-md focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      {/* Decorative background */}
      <NetworkBackground nodes={nodes} activeNodeId={null} />

      {/* Central hub on home only */}
      {isHome && <CentralHub />}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display font-bold text-xl tracking-tighter"
          >
            WALTER<span className="text-primary">.</span>
          </motion.a>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <MainNav />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        id="main-content"
        className={`relative z-10 pt-20 ${isMobile ? "pb-24" : "pb-8"}`}
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-xs text-muted-foreground font-mono">
        © {new Date().getFullYear()} Walter Andrade
      </footer>

      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </div>
  );
}
