"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import type { FC } from "react";

// Import JSON with TypeScript typing
import enJson from "@/locales/en.json";
import mkJson from "@/locales/mk.json";
import sqJson from "@/locales/sq.json";

// Type of dictionary
type Dict = Record<string, string>;

// Supported languages
export type Lang = "en" | "mk" | "sq";

// Dictionaries
const dictionaries: Record<Lang, Dict> = {
  en: enJson as Dict,
  mk: mkJson as Dict,
  sq: sqJson as Dict,
};

// Context type
interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

// Default context
const I18nCtx = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

// Provider
interface Props {
  children: ReactNode;
}

export const LanguageProvider: FC<Props> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");

  // Translation function
  const t = (key: string) => dictionaries[lang][key] ?? key;

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
};

// Hook for consuming
export const useI18n = () => useContext(I18nCtx);
