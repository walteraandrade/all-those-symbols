import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { PostLang } from "@/lib/blog/types";

interface LanguageContextValue {
  lang: PostLang;
  setLang: (lang: PostLang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLang = (value: unknown): value is PostLang =>
  value === "en" || value === "pt";

const getInitialLang = (): PostLang => {
  const stored = localStorage.getItem("blogLang");
  if (isLang(stored)) return stored;
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<PostLang>(getInitialLang);

  useEffect(() => {
    localStorage.setItem("blogLang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
