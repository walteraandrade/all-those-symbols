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
      className={`esc-totop ${visible ? "on" : ""}`}
      aria-label={CHROME[lang].backToTop}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
