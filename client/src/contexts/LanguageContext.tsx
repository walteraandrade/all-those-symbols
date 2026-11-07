import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { PostLang } from "@/lib/blog/types";

interface LanguageContextValue {
  lang: PostLang;
  setLang: (lang: PostLang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "blogLang";

const isLang = (value: unknown): value is PostLang =>
  value === "en" || value === "pt";

const readStoredLang = (): PostLang | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : null;
  } catch {
    return null;
  }
};

const preferredLang = (): PostLang =>
  readStoredLang() ?? (navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en");

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<PostLang>("en");

  useEffect(() => {
    setLangState(preferredLang());
  }, []);

  const setLang = useCallback((next: PostLang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function PostLanguage({ lang, children }: { lang: PostLang; children: ReactNode }) {
  const { setLang } = useLanguage();
  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
