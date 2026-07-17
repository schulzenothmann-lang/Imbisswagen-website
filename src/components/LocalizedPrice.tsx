"use client";

import { formatPriceForRegion } from "@/lib/locale";
import { useLocaleSettings } from "./LocaleProvider";

export function LocalizedPrice({ value }: { value: string }) {
  const { region, rates } = useLocaleSettings();
  return <>{formatPriceForRegion(value, region, rates)}</>;
}
