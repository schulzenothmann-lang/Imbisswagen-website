"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  defaultRegion,
  fallbackRates,
  getRegion,
  translate,
  type ExchangeRates,
  type Region,
  type TranslationKey,
} from "@/lib/locale";

type Theme = "light" | "dark";

type LocaleContextValue = {
  region: Region;
  setRegionCode: (code: string) => void;
  rates: ExchangeRates;
  ratesLive: boolean;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState(() => {
    if (typeof window === "undefined") return defaultRegion;
    return getRegion(window.localStorage.getItem("mino-region"));
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem("mino-theme") as Theme | null;
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [rates, setRates] = useState<ExchangeRates>(fallbackRates);
  const [ratesLive, setRatesLive] = useState(false);

  useEffect(() => {
    document.documentElement.lang = region.locale.split("-")[0];
    document.documentElement.dataset.region = region.code;
    document.documentElement.dataset.currency = region.currency;
    document.documentElement.dataset.language = region.languageCode;
    window.localStorage.setItem("mino-region", region.code);
  }, [region]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("mino-theme", theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const response = await fetch("/api/exchange-rates", { cache: "no-store" });
        if (!response.ok) throw new Error("Could not load exchange rates");
        const data = (await response.json()) as { rates?: ExchangeRates };
        if (!cancelled && data.rates) {
          setRates({ ...fallbackRates, ...data.rates, EUR: 1 });
          setRatesLive(true);
        }
      } catch {
        if (!cancelled) {
          setRates(fallbackRates);
          setRatesLive(false);
        }
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      region,
      setRegionCode: (code) => setRegion(getRegion(code)),
      rates,
      ratesLive,
      t: (key, values) => translate(key, region.languageCode, values),
      theme,
      setTheme: setThemeState,
    }),
    [region, rates, ratesLive, theme]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleSettings() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleSettings must be used inside LocaleProvider");
  }
  return context;
}
