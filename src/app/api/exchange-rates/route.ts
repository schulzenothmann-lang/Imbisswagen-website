import { NextResponse } from "next/server";

import { fallbackRates, type ExchangeRates } from "@/lib/locale";

export const revalidate = 21600;

export async function GET() {
  try {
    const response = await fetch("https://api.frankfurter.dev/v2/rates?base=EUR&quotes=CHF,GBP,USD", {
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`Frankfurter responded with ${response.status}`);
    }

    const data = (await response.json()) as
      | { rates?: ExchangeRates; date?: string }
      | { date?: string; quote?: string; rate?: number }[];
    const apiRates = Array.isArray(data)
      ? data.reduce<ExchangeRates>((acc, item) => {
          if (item.quote === "CHF" || item.quote === "GBP" || item.quote === "USD") {
            acc[item.quote] = item.rate;
          }
          return acc;
        }, {})
      : data.rates;
    const rates = { ...fallbackRates, ...apiRates, EUR: 1 };

    return NextResponse.json(
      {
        base: "EUR",
        date: Array.isArray(data) ? data[0]?.date ?? null : data.date ?? null,
        rates,
        source: "frankfurter",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        base: "EUR",
        date: null,
        rates: fallbackRates,
        source: "fallback",
      },
      { status: 200 }
    );
  }
}
