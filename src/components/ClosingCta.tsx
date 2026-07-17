"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { translateCopy } from "@/lib/localized-content";
import { useLocaleSettings } from "./LocaleProvider";

export function ClosingCta() {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <section className="relative isolate overflow-clip bg-graphit px-6 py-24 text-kreide lg:px-10 lg:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-8">
        <Eyebrow onDark>{tc("Dein nächster Schritt")}</Eyebrow>
        <h2 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
          <span className="font-serif font-medium">{tc("Bereit,")}</span>
          <br />
          <span className="font-sans font-black tracking-tight">{tc("deinen Traum zu verwirklichen?")}</span>
        </h2>
        <p className="max-w-md font-sans text-lg leading-8 text-kreide/80">
          {tc("Konfiguriere jetzt deinen Anhänger oder lass dich unverbindlich beraten.")}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="inverse" size="lg">
            <Link href="/konfigurator">{t("ctaConfigure")}</Link>
          </Button>
          <Button asChild variant="outlineOnDark" size="lg">
            <Link href="/kontakt">{tc("Beratung anfragen")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
