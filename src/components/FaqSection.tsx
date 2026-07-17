"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { translateCopy } from "@/lib/localized-content";
import { useLocaleSettings } from "./LocaleProvider";

const faqs = [
  {
    question: "Wie lange dauert die Fertigung?",
    answer:
      "Typischerweise dauert die Fertigung eines MINO-Anhängers etwa 10 bis 14 Wochen.",
  },
  {
    question: "Kann ich meinen Anhänger individuell gestalten?",
    answer:
      "Ja. Unsere Anhänger sind auf Basis der Modelle nahezu vollständig individualisierbar.",
  },
  {
    question: "Bietet ihr Lieferung an?",
    answer:
      "Ja, die Lieferung bieten wir mit an und stimmen den Ablauf passend mit dir ab.",
  },
  {
    question: "Ist der TÜV inklusive?",
    answer:
      "Ja. Der TÜV ist bei deinem fertigen Anhänger inklusive.",
  },
  {
    question: "Gibt es auch fertige Produkte?",
    answer:
      "Ja. Verfügbare Imbiss-Anhänger und Pavillons findest du unter Sofort verfügbar oder Mieten.",
  },
  {
    question: "Wie startet der Prozess?",
    answer:
      "Du wählst ein Modell, konfigurierst deinen Anhänger oder fragst direkt eine Beratung an.",
  },
];

export function FaqSection() {
  const { region } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <section className="mx-auto w-full max-w-7xl border-t border-graphit/10 px-6 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.35fr] lg:items-start">
        <div>
          <h2 className="text-4xl leading-[0.96] tracking-normal sm:text-5xl lg:text-[3.35rem]">
            <span className="font-serif font-medium">{tc("Häufige")}</span>
            <br />
            <span className="font-sans font-black tracking-tight">{tc("Fragen")}</span>
          </h2>
          <p className="mt-5 max-w-sm font-sans text-sm leading-6 text-graphit/65 lg:text-base lg:leading-7">
            {tc("Die wichtigsten Antworten, bevor aus deiner Idee ein fertiger Anhänger wird.")}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`} className="border-graphit/12">
              <AccordionTrigger className="py-5 text-left font-sans text-lg font-black tracking-tight text-graphit hover:no-underline">
              {tc(faq.question)}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-6 font-sans text-base leading-7 text-graphit/68">
                {tc(faq.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
