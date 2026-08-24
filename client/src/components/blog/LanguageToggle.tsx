import type { PostLang } from "@/lib/blog/types";
import { useLanguage } from "@/contexts/LanguageContext";

const labels: Record<PostLang, string> = { en: "English", pt: "Português" };

export function LanguageToggle({ langs }: { langs: PostLang[] }) {
  const { lang, setLang } = useLanguage();

  if (langs.length < 2) return null;

  return (
    <div className="flex gap-2" role="group" aria-label="Post language">
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === lang}
          onClick={() => setLang(l)}
          className={`esc-tag ${l === lang ? "on" : ""}`}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
