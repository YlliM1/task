"use client";
import { useI18n } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <footer className="border-t mt-10 py-6 flex items-center justify-between">
      <p className="text-sm opacity-70">{t("footer.language")}</p>
      <div className="flex gap-2">
        {(["en", "mk", "sq"] as const).map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded border ${lang === l ? "bg-black text-white" : ""}`}
            aria-pressed={lang === l}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </footer>
  );
}
