import { Link } from "wouter";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { BrutalistBackground } from "@/components/BrutalistBackground";
import { useIsMobile } from "@/hooks/use-mobile";

export default function NotFound() {
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-[calc(100vh-10rem)] bg-[#F5F5F0] flex items-center justify-center">
      {!isMobile && <BrutalistBackground />}

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-brutal bg-white/50 p-8 md:p-12 max-w-md mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <span className="font-mono text-6xl md:text-8xl text-black tracking-tighter">
              404
            </span>
          </div>

          <h1 className="font-mono text-xl md:text-2xl uppercase tracking-wider text-black mb-4">
            Page_Not_Found<span className="cursor-blink text-red-500">_</span>
          </h1>

          <p className="font-mono text-sm text-black/60 mb-8">
            &gt; The requested resource could not be located on this server.
          </p>

          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white border-brutal border-red-500 font-mono text-sm uppercase tracking-wider hover:bg-red-500 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Return_Home
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
