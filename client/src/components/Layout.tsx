import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { MainNav } from "@/components/MainNav";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const isHome = location === "/";
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-[#F5F5F0] text-black relative overflow-x-hidden font-mono selection:bg-red-500/20">
      {/* Skip link for a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border-brutal"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#F5F5F0]/95 backdrop-blur-sm border-b-2 border-black">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-mono text-sm uppercase tracking-wider hover:text-red-500 transition-colors"
            >
              WALTER<span className="text-red-500">_</span>
            </motion.span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <MainNav />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        id="main-content"
        className={`relative z-10 pt-16 ${isMobile ? "pb-24" : "pb-8"}`}
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-xs text-black/40 font-mono uppercase tracking-wider border-t-2 border-black bg-[#F5F5F0]">
        <span className="text-red-500">&gt;</span> {new Date().getFullYear()} Walter Andrade
      </footer>

      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </div>
  );
}
