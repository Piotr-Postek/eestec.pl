"use client";

import type { SiteContent } from "@/content/site";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "pl" | "en";

const STORAGE_KEY = "eestec-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  content: SiteContent;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type Props = {
  pl: SiteContent;
  en: SiteContent;
  children: ReactNode;
};

export function LocaleProvider({ pl, en, children }: Props) {
  const [locale, setLocaleState] = useState<Locale>("pl");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s === "en" || s === "pl") setLocaleState(s);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale === "en" ? "en" : "pl";
  }, [locale, mounted]);

  const content = useMemo(
    () => (locale === "en" ? en : pl),
    [locale, pl, en]
  );

  const value = useMemo(
    () => ({ locale, setLocale, content }),
    [locale, setLocale, content]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
