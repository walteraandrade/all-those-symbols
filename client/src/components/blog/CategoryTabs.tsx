import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlogCategory, blogCategories } from "@/lib/data";

interface CategoryTabsProps {
  active: BlogCategory | null;
  onChange: (category: BlogCategory | null) => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <Button
        variant={active === null ? "default" : "outline"}
        size="sm"
        onClick={() => onChange(null)}
        className="font-mono text-xs whitespace-nowrap"
      >
        ░░ ALL ░░
      </Button>
      {blogCategories.map((cat) => (
        <Button
          key={cat}
          variant={active === cat ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(cat)}
          className="font-mono text-xs uppercase whitespace-nowrap group"
        >
          <span className="relative">
            ░░ {cat} ░░
            <motion.span
              className="absolute -right-1 opacity-0 group-hover:opacity-100"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              _
            </motion.span>
          </span>
        </Button>
      ))}
    </div>
  );
}
