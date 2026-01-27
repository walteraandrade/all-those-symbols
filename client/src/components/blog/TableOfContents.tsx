import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const extractHeadings = (markdown: string): TocItem[] => {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[0].indexOf(" ");
    const text = match[1];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }

  return headings;
};

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const TocList = () => (
    <nav className="space-y-2">
      {headings.map(({ id, text, level }) => (
        <motion.a
          key={id}
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`block text-sm transition-colors ${
            level === 3 ? "pl-4" : ""
          } ${
            activeId === id
              ? "text-primary border-l-2 border-primary pl-3 -ml-[2px]"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ x: 2 }}
        >
          {text}
        </motion.a>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop: Sticky sidebar */}
      <aside className="hidden lg:block sticky top-24 w-64 shrink-0">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
          Contents
        </div>
        <TocList />
      </aside>

      {/* Mobile: Collapsible */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="lg:hidden mb-8">
        <CollapsibleTrigger className="flex items-center justify-between w-full px-5 py-4 bg-card/50 border border-border rounded-sm">
          <span className="text-sm font-mono uppercase">Table of Contents</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-5 py-4 bg-card/30 border border-t-0 border-border rounded-b-sm">
          <TocList />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
