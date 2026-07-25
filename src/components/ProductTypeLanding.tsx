"use client";

import { ProductTypePicker } from "./ProductTypePicker";

type ProductTypeLandingProps = {
  /** "Mieten" -> rent variant, otherwise buy variant. */
  eyebrow: string;
};

export function ProductTypeLanding({ eyebrow }: ProductTypeLandingProps) {
  const variant = eyebrow === "Mieten" ? "rent" : "buy";

  return (
    <main className="flex min-h-svh flex-col bg-beton pt-20 text-graphit lg:h-svh lg:pt-[4.25rem]">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-8 pb-6 lg:min-h-0 lg:px-10 lg:pt-10 lg:pb-8">
        <ProductTypePicker variant={variant} />
      </section>
    </main>
  );
}
