/**
 * LangContext
 * Provides language state + t() translation function throughout the app.
 * Persists selection to localStorage with key 'ds-lang'.
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { createTranslator, type Language, type TranslationKey } from './i18n';

const STORAGE_KEY = 'ds-lang';

function readStoredLang(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es' || stored === 'fr') return stored;
  } catch {
    // ignore
  }
  return 'en';
}

interface LangContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

interface LangProviderProps {
  children: ReactNode;
  defaultLang?: Language;
}

export function LangProvider({ children, defaultLang }: LangProviderProps) {
  const [lang, setLangState] = useState<Language>(defaultLang ?? readStoredLang);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  }, []);

  const t = useMemo(() => createTranslator(lang), [lang]);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t }),
    [lang, setLang, t]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return ctx;
}
