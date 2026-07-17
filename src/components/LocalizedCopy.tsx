"use client";

import { translateCopy } from "@/lib/localized-content";
import { useLocaleSettings } from "./LocaleProvider";

export function LocalizedCopy({ text, values }: { text: string; values?: Record<string, string | number> }) {
  const { region } = useLocaleSettings();
  const translated = translateCopy(text, region.languageCode);
  const output = values
    ? Object.entries(values).reduce((current, [key, value]) => current.replaceAll(`{${key}}`, String(value)), translated)
    : translated;

  return <>{output}</>;
}
