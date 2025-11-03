import React, { createContext, useContext, useState } from "react";
import i18n from "../utils/i18n";

interface LanguageContextProps {
  lang: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  lang: "en",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const setLanguage = (language: string) => {
    setLang(language);
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
