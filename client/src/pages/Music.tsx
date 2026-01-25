import { motion } from "framer-motion";
import { MusicSection } from "@/components/MusicSection";

export default function Music() {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <header>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Soundscapes
          </h1>
          <p className="text-muted-foreground">
            Music is thinking made audible. Here's what I'm listening to.
          </p>
        </header>

        <MusicSection />
      </motion.div>
    </div>
  );
}
