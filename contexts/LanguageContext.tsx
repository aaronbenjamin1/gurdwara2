"use client";
import { createContext, useContext, useState } from "react";

export type Lang = "en" | "pa";

interface Ctx { lang: Lang; toggle: () => void; }
const LanguageContext = createContext<Ctx>({ lang: "en", toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, toggle: () => setLang(l => l === "en" ? "pa" : "en") }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
