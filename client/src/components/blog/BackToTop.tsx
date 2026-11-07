import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { CHROME } from "@/lib/blog/chrome";
import { useLanguage } from "@/contexts/LanguageContext";

export function BackToTop() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 left-4 z-40 p-3 bg-[#1d1c16] text-[#ece6d4] border-2 border-[#3a382f] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-[opacity,transform,visibility,color,border-color] duration-200 ${
        visible ? "opacity-100 scale-100 visible" : "opacity-0 scale-80 invisible"
      }`}
      aria-label={CHROME[lang].backToTop}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
