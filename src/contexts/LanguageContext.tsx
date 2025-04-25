import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, defaultLanguage, languages } from '../i18n/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  dir: string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
  dir: 'ltr'
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [dir, setDir] = useState('ltr');

  useEffect(() => {
    // Get language from localStorage or use browser language if available
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split('-')[0];
      const isSupported = languages.some(lang => lang.code === browserLang);
      if (isSupported) {
        setLanguage(browserLang);
      }
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
    
    // Set document direction based on language
    const langConfig = languages.find(lang => lang.code === language);
    if (langConfig) {
      setDir(langConfig.dir);
      document.documentElement.dir = langConfig.dir;
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to default language
    if (translations[defaultLanguage] && translations[defaultLanguage][key]) {
      return translations[defaultLanguage][key];
    }
    
    // If translation is not found, return the key
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};