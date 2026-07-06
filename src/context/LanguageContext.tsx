"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "@/locales/en.json";
import si from "@/locales/si.json";
import ta from "@/locales/ta.json";

export type Language = "en" | "si" | "ta";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<Language, any> = { en, si, ta };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedLang = localStorage.getItem("wedding_lang") as Language;
    if (storedLang && ["en", "si", "ta"].includes(storedLang)) {
      setLangState(storedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("wedding_lang", newLang);
  };

  const t = (key: string) => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = dictionaries[lang];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key if not found
      }
    }
    return value;
  };

  // Prevent hydration mismatch by rendering a loader or nothing until client mounts
  // However, returning children directly is fine if text mismatches are acceptable, 
  // but let's just return children and let Next.js handle it (might have slight hydration warning but it's fine)
  return (
    <LanguageContext.Provider value={{ lang: isClient ? lang : "en", setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
