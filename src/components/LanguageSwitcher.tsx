"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "si", label: "සිංහල" },
    { code: "ta", label: "தமிழ்" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full glass-panel text-primary hover:text-gold-300 transition-colors flex items-center gap-2"
        aria-label="Switch Language"
      >
        <Globe size={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-xl glass-panel border border-primary/20 overflow-hidden shadow-2xl z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                lang === l.code
                  ? "bg-primary/20 text-primary font-semibold"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
