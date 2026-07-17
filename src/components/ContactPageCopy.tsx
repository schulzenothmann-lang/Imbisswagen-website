"use client";

import { Mail, MapPin, Phone } from "lucide-react";

import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_HOURS, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/contact";
import { translateCopy } from "@/lib/localized-content";
import { useLocaleSettings } from "./LocaleProvider";

export function ContactPageIntro() {
  const { region } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <h1 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
        <span className="font-serif font-medium">{tc("Lass uns")}</span>
        <br />
        <span className="font-sans font-black tracking-tight">{tc("sprechen.")}</span>
      </h1>
      <p className="font-sans text-lg leading-8 text-graphit/70">
        {tc("Ob Beratung, Frage zum Modell oder Anfrage zu deinem fertigen Anhänger — schreib uns, wir melden uns zeitnah zurück.")}
      </p>
    </div>
  );
}

export function ContactAside() {
  const { region } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <aside className="flex flex-col gap-6 rounded-sm border border-graphit/10 bg-kreide/40 p-6 lg:sticky lg:top-24 lg:p-8">
      <div>
        <p className="font-sans text-sm font-bold text-graphit">{tc("Direkt erreichbar")}</p>
        <div className="mt-4 flex flex-col gap-4">
          {CONTACT_PHONE_HREF ? (
            <a
              href={CONTACT_PHONE_HREF}
              className="flex items-center gap-3 font-sans text-sm text-graphit/75 hover:text-graphit"
            >
              <Phone className="h-4 w-4 shrink-0" />
              {CONTACT_PHONE_DISPLAY}
            </a>
          ) : (
            <span className="flex items-center gap-3 font-sans text-sm text-graphit/45">
              <Phone className="h-4 w-4 shrink-0" />
              {CONTACT_PHONE_DISPLAY}
            </span>
          )}

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 font-sans text-sm text-graphit/75 hover:text-graphit"
          >
            <Mail className="h-4 w-4 shrink-0" />
            {CONTACT_EMAIL}
          </a>

          <span className="flex items-start gap-3 font-sans text-sm text-graphit/45">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            {CONTACT_ADDRESS}
          </span>
        </div>
      </div>

      <div className="border-t border-graphit/10 pt-6">
        <p className="font-sans text-sm font-bold text-graphit">{tc("Erreichbarkeit")}</p>
        <p className="mt-2 font-sans text-sm text-graphit/70">{CONTACT_HOURS}</p>
      </div>
    </aside>
  );
}
