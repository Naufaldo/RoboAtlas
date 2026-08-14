'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, translations } from './translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('roboatlas_locale') as Locale | null;
    if (saved === 'en' || saved === 'id') {
      setLocaleState(saved);
    } else {
      // Check browser language
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('id')) {
        setLocaleState('id');
      }
    }
  }, []);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    localStorage.setItem('roboatlas_locale', loc);
  };

  const toggleLocale = () => {
    const next: Locale = locale === 'en' ? 'id' : 'en';
    setLocale(next);
  };

  const t = translations[locale] || translations.en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
