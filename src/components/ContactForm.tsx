"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/contact";
import { translateCopy } from "@/lib/localized-content";
import { useLocaleSettings } from "./LocaleProvider";

const subjects = ["Beratung zu einem Modell", "Fertiger Anhänger", "Konfigurator-Frage", "Sonstiges"];

const inputClass =
  "h-12 w-full rounded-sm border border-graphit/15 bg-kreide px-4 font-sans text-sm text-graphit placeholder:text-graphit/40 outline-none transition-colors focus:border-graphit/50";

export function ContactForm({ initialSubject }: { initialSubject?: string }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const [sent, setSent] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const subjectOptions = initialSubject && !subjects.includes(initialSubject) ? [initialSubject, ...subjects] : subjects;
  const defaultSubject = initialSubject ?? subjects[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const subject = `Kontaktanfrage: ${data.get("subject")}`;
    const body = [
      `Vorname: ${data.get("firstName")}`,
      `Nachname: ${data.get("lastName")}`,
      `E-Mail: ${data.get("email")}`,
      `Telefon: ${data.get("phone") || "-"}`,
      "",
      `${data.get("message")}`,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-sm border border-graphit/10 bg-kreide/40 p-6 lg:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-sans text-sm font-bold text-graphit">
            {t("firstName")}
          </label>
          <input id="firstName" name="firstName" required className={inputClass} placeholder="Max" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="font-sans text-sm font-bold text-graphit">
            {t("lastName")}
          </label>
          <input id="lastName" name="lastName" required className={inputClass} placeholder="Mustermann" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-sans text-sm font-bold text-graphit">
            {t("email")}
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="max@beispiel.de" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-sans text-sm font-bold text-graphit">
            {t("phone")}
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="0151 234 567 89" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="font-sans text-sm font-bold text-graphit">
          {tc("Anliegen")}
        </label>
        <select id="subject" name="subject" defaultValue={defaultSubject} className={inputClass}>
          {subjectOptions.map((s) => (
            <option key={s} value={s}>
              {tc(s)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-sans text-sm font-bold text-graphit">
          {tc("Nachricht *")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} h-auto resize-none py-3`}
          placeholder={tc("Wie können wir dir helfen?")}
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 font-sans text-sm text-graphit/70">
        <input
          type="checkbox"
          required
          checked={acceptedPrivacy}
          onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border transition-colors ${
            acceptedPrivacy ? "border-graphit bg-graphit" : "border-graphit/30"
          }`}
        >
          {acceptedPrivacy && <Check className="h-3 w-3 text-kreide" />}
        </span>
        <span>
          {t("acceptPrivacy")}{" "}
          <Link href="/datenschutz" className="underline underline-offset-2 hover:text-graphit">
            {t("privacy")}
          </Link>
          . *
        </span>
      </label>

      <Button type="submit" size="lg" className="mt-2 w-full sm:w-fit">
        {tc("Nachricht senden")}
      </Button>

      <p className="font-sans text-xs text-graphit/50">
        {sent
          ? tc("Dein E-Mail-Programm sollte sich gerade geöffnet haben — bitte sende die Nachricht dort ab.")
          : tc("Öffnet dein E-Mail-Programm mit vorausgefüllter Nachricht.")}
      </p>
    </form>
  );
}
