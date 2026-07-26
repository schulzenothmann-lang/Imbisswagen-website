import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocalizedCopy } from "@/components/LocalizedCopy";
import { CONTACT_ADDRESS, CONTACT_EMAIL } from "@/lib/contact";
import { LEGAL_REPRESENTATIVE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Über uns | MINO",
  description:
    "Wer hinter MINO steht, wie unsere Anhänger entstehen und was du von uns erwarten kannst — offen erklärt statt behauptet.",
};

const CHAPTER_COUNT = 4;

/** Der Ablauf, wie er wirklich ist: Spezifikation bei uns, Fertigung im Partnerwerk, Abnahme wieder bei uns. */
const WORKFLOW = [
  {
    heading: "Spezifikation",
    text: "Aus deiner Konfiguration wird eine verbindliche Bauliste: Maße, Technik, Ausstattung, Material. Was unklar ist, klären wir vorher mit dir — nicht während der Fertigung.",
  },
  {
    heading: "Fertigung im Partnerwerk",
    text: "Gebaut wird in einem festen Partnerwerk, mit dem wir dauerhaft zusammenarbeiten. Die Fertigung dauert typischerweise 10 bis 14 Wochen.",
  },
  {
    heading: "Prüfung und Übergabe",
    text: "Vor der Übergabe kontrollieren wir den Anhänger anhand deiner Bauliste. Der TÜV ist inklusive; Lieferung, Montage und Einweisung kannst du dazubuchen.",
  },
];

/** Zusagen statt Superlative — jede einzelne ist überprüfbar. */
const PROMISES = [
  {
    heading: "Du sprichst mit den Gründern",
    text: "Kein Callcenter und kein wechselnder Ansprechpartner. Deine Anfrage beantworten wir selbst.",
  },
  {
    heading: "Wir raten auch ab",
    text: "Wenn ein kleineres Modell oder ein Verkaufspavillon für dein Vorhaben reicht, sagen wir das — auch wenn wir daran weniger verdienen.",
  },
  {
    heading: "Preise sind vorher sichtbar",
    text: "Modelle und Optionen sind ausgezeichnet. Was du im Konfigurator zusammenstellst, bekommst du als schriftliches Angebot.",
  },
  {
    heading: "Keine erfundenen Referenzen",
    text: "Wir sind neu und behaupten keine hunderten Auslieferungen. Was auf dieser Seite steht, ist überprüfbar.",
  },
];

/** Zwei Zielgruppen, zwei konkrete nächste Schritte — der Leser ordnet sich selbst zu. */
const AUDIENCES = [
  {
    label: "Du hast bereits Gastronomie",
    text: "Neue Standorte testen, Saison abdecken, zusätzlichen Umsatz aufbauen — ohne ein zweites Ladenlokal anzumieten.",
    ctaLabel: "Verfügbare Anhänger ansehen",
    href: "/angebote?angebot=kaufen&produkt=anhaenger",
  },
  {
    label: "Du startest neu",
    text: "Klein anfangen, dein Konzept im echten Verkauf testen und später erweitern — planbar und bezahlbar.",
    ctaLabel: "Eigenen Anhänger konfigurieren",
    href: "/konfigurator",
  },
];

/** Kapitelkopf: Eyebrow links, Zähler rechts, Haarlinie darunter — gibt der Seite eine Leserichtung. */
function ChapterHeader({
  index,
  label,
  onDark = false,
}: {
  index: number;
  label: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between border-b pb-4 ${
        onDark ? "border-kreide/15" : "border-graphit/12"
      }`}
    >
      <Eyebrow onDark={onDark}>
        <LocalizedCopy text={label} />
      </Eyebrow>
      <p
        className={`font-sans text-xs font-bold tracking-[0.16em] tabular-nums ${
          onDark ? "text-kreide/40" : "text-graphit/40"
        }`}
      >
        <span className={onDark ? "text-kreide" : "text-graphit"}>
          {String(index).padStart(2, "0")}
        </span>
        <span className="mx-1.5">/</span>
        {String(CHAPTER_COUNT).padStart(2, "0")}
      </p>
    </div>
  );
}

export default function UeberUnsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
        <section className="relative min-h-[78svh] overflow-hidden lg:min-h-[82svh]">
          <Image
            src="/images/ueber-uns/hero-ueber-uns.jpeg"
            alt="Mobiler Verkaufsstand im Einsatz"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-graphit/45" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-graphit/80 to-transparent" />

          <div className="relative mx-auto flex min-h-[78svh] w-full max-w-7xl items-end px-6 pb-16 lg:min-h-[82svh] lg:px-10 lg:pb-20">
            <div className="max-w-3xl text-kreide">
              <Eyebrow onDark><LocalizedCopy text="Über MINO" /></Eyebrow>
              <h1 className="mt-5 text-4xl leading-[0.95] tracking-normal lg:text-6xl">
                <span className="font-serif font-medium"><LocalizedCopy text="Aus der" /></span>
                <br />
                <span className="font-sans font-black tracking-tight"><LocalizedCopy text="Praxis gebaut." /></span>
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-lg leading-8 text-kreide/80 lg:text-xl lg:leading-9">
                <LocalizedCopy text="Wir kommen selbst aus der Immobilien- und Gastronomiebranche. Genau deshalb wissen wir, wie wichtig verlässliches Equipment, faire Preise und eine Lösung sind, die im Alltag wirklich funktioniert." />
              </p>
            </div>
          </div>
        </section>

        {/* 01 — Wer wir sind: Namen, Sitz, Kontakt, Status. Offenheit vor Behauptung. */}
        <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <ChapterHeader index={1} label="Wer wir sind" />

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h2 className="text-4xl leading-[0.95] tracking-normal lg:text-5xl">
                <span className="font-serif font-medium"><LocalizedCopy text="Zwei Gründer," /></span>
                <br />
                <span className="font-sans font-black tracking-tight"><LocalizedCopy text="ein Anhänger." /></span>
              </h2>
              <div className="mt-6 flex max-w-xl flex-col gap-5 font-sans text-base leading-7 text-graphit/70 lg:text-[1.0625rem] lg:leading-8">
                <p>
                  <LocalizedCopy text="Hinter MINO stehen zwei Gründer, die selbst in der Immobilien- und Gastronomiebranche unterwegs sind. Als wir unser eigenes Equipment aufstocken wollten, haben wir gemerkt, wie undurchsichtig dieser Markt ist: Welche Ausstattung lohnt sich wirklich, wo zahlt man zu viel, und wer baut so, dass es im Alltag hält?" />
                </p>
                <p>
                  <LocalizedCopy text="MINO ist daraus entstanden — und MINO ist jung. Die Gründung läuft gerade. Statt Erfahrung zu behaupten, die wir noch nicht haben, legen wir offen, mit wem du es zu tun hast und wie ein Anhänger bei uns entsteht." />
                </p>
              </div>
            </div>

            <dl className="grid gap-px self-start overflow-hidden rounded-sm border border-graphit/12 bg-graphit/10">
              {[
                { label: "Gründer", value: LEGAL_REPRESENTATIVE },
                { label: "Sitz", value: CONTACT_ADDRESS },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1 bg-beton px-6 py-5">
                  <dt className="font-sans text-xs font-semibold tracking-[0.14em] text-graphit/50 uppercase">
                    <LocalizedCopy text={row.label} />
                  </dt>
                  <dd className="font-sans text-base font-bold tracking-tight text-graphit">{row.value}</dd>
                </div>
              ))}

              <div className="flex flex-col gap-1 bg-beton px-6 py-5">
                <dt className="font-sans text-xs font-semibold tracking-[0.14em] text-graphit/50 uppercase">
                  <LocalizedCopy text="Direkter Kontakt" />
                </dt>
                <dd className="font-sans text-base font-bold tracking-tight text-graphit">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline decoration-graphit/25 underline-offset-4 transition-colors hover:decoration-graphit">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>

              <div className="flex flex-col gap-1 bg-beton px-6 py-5">
                <dt className="font-sans text-xs font-semibold tracking-[0.14em] text-graphit/50 uppercase">
                  <LocalizedCopy text="Status" />
                </dt>
                <dd className="font-sans text-sm leading-6 text-graphit/70">
                  <LocalizedCopy text="Gründung als UG (haftungsbeschränkt) in Vorbereitung." />{" "}
                  <Link href="/impressum" className="font-medium text-graphit underline decoration-graphit/25 underline-offset-4 transition-colors hover:decoration-graphit">
                    <LocalizedCopy text="Impressum" />
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 02 — Wie wir arbeiten: der ehrliche Kern, dunkel gesetzt, damit er hängen bleibt. */}
        <section className="relative isolate overflow-clip bg-tinte text-kreide">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_70%_at_50%_0%,color-mix(in_oklab,var(--color-kreide)_8%,transparent),transparent_70%)]"
          />
          <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <ChapterHeader index={2} label="Wie wir arbeiten" onDark />

            <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
              <div>
                <h2 className="text-4xl leading-[0.95] tracking-normal lg:text-5xl">
                  <span className="font-serif font-medium"><LocalizedCopy text="Gebaut wird im Werk." /></span>
                  <br />
                  <span className="font-sans font-black tracking-tight"><LocalizedCopy text="Verantwortlich sind wir." /></span>
                </h2>
                <p className="mt-6 max-w-lg font-sans text-base leading-7 text-kreide/70 lg:text-[1.0625rem] lg:leading-8">
                  <LocalizedCopy text="Wir betreiben keine eigene Halle — und tun auch nicht so. Dein Anhänger entsteht in einem festen Partnerwerk, nach Vorgaben, die wir schreiben, und mit einer Abnahme, die wir machen." />
                </p>
              </div>

              <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
                <Image
                  src="/images/prozess/produktions-raster.png"
                  alt="Sechs Fertigungsschritte eines MINO Anhängers: vom Rahmen bis zum fertigen Ausbau"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-kreide/15 ring-inset" />
              </div>
            </div>

            <ol className="mt-14 grid border-t border-kreide/15 lg:mt-20 lg:grid-cols-3">
              {WORKFLOW.map((step, index) => (
                <li
                  key={step.heading}
                  className="border-b border-kreide/15 py-8 lg:border-b-0 lg:border-l lg:px-8 lg:py-10 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
                >
                  <span className="font-sans text-xs font-bold tracking-[0.18em] text-kreide/40 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-sans text-xl font-black tracking-tight lg:text-2xl">
                    <LocalizedCopy text={step.heading} />
                  </h3>
                  <p className="mt-3 font-sans text-base leading-7 text-kreide/70">
                    <LocalizedCopy text={step.text} />
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-10 max-w-2xl font-sans text-lg leading-8 font-medium text-kreide lg:mt-12 lg:text-xl lg:leading-9">
              <LocalizedCopy text="Wenn im Werk etwas nicht so läuft wie besprochen, ist das unser Problem — nicht deins." />
            </p>
          </div>
        </section>

        {/* 03 — Zusagen: überprüfbar formuliert, kein Superlativ. */}
        <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <ChapterHeader index={3} label="Was du erwarten kannst" />

          <h2 className="mt-12 max-w-2xl text-4xl leading-[0.95] tracking-normal lg:mt-16 lg:text-5xl">
            <span className="font-serif font-medium"><LocalizedCopy text="Vier Zusagen," /></span>{" "}
            <span className="font-sans font-black tracking-tight"><LocalizedCopy text="an denen du uns messen kannst." /></span>
          </h2>

          <ol className="mt-12 grid gap-x-16 gap-y-10 lg:mt-16 lg:grid-cols-2">
            {PROMISES.map((promise, index) => (
              <li key={promise.heading} className="flex gap-5 border-t border-graphit/10 pt-6">
                <span className="font-sans text-xs font-bold tracking-[0.18em] text-graphit/40 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-sans text-xl font-black tracking-tight lg:text-2xl">
                    <LocalizedCopy text={promise.heading} />
                  </h3>
                  <p className="mt-3 max-w-md font-sans text-base leading-7 text-graphit/70">
                    <LocalizedCopy text={promise.text} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 04 — Für wen wir bauen, mit den zwei konkreten nächsten Schritten. */}
        <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <ChapterHeader index={4} label="Für wen wir bauen" />

          <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-kreide/40">
              <Image
                src="/images/prozess/anhaenger-uebergabe.png"
                alt="Fertiger MINO Anhänger vor der Übergabe"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-graphit/10 ring-inset" />
            </div>

            <div className="flex flex-col">
              <h2 className="text-4xl leading-[0.95] tracking-normal lg:text-5xl">
                <span className="font-serif font-medium"><LocalizedCopy text="Für Menschen," /></span>
                <br />
                <span className="font-sans font-black tracking-tight"><LocalizedCopy text="die starten wollen." /></span>
              </h2>
              <div className="mt-6 flex flex-col gap-5 font-sans text-base leading-7 text-graphit/70 lg:text-[1.0625rem] lg:leading-8">
                <p>
                  <LocalizedCopy text="Manche wollen mit einem fertigen Anhänger direkt loslegen. Andere brauchen erst ein kleineres Setup, etwa einen Verkaufspavillon, um ein Konzept zu testen. Für beides möchten wir eine klare, faire und verständliche Lösung anbieten." />
                </p>
                <p>
                  <LocalizedCopy text="Unser Ziel ist nicht, möglichst kompliziert zu planen. Unser Ziel ist, dass du eine Ausstattung bekommst, die zu deinem Produkt, deinem Budget und deinem nächsten Schritt passt." />
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
            {AUDIENCES.map((audience) => (
              <Link
                key={audience.label}
                href={audience.href}
                className="group flex flex-col gap-4 rounded-sm border border-graphit/12 bg-kreide/50 p-7 transition-colors duration-300 hover:border-graphit/30 lg:p-9"
              >
                <h3 className="font-sans text-xl font-black tracking-tight lg:text-2xl">
                  <LocalizedCopy text={audience.label} />
                </h3>
                <p className="font-sans text-base leading-7 text-graphit/70">
                  <LocalizedCopy text={audience.text} />
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-sans text-sm font-medium text-graphit/70 transition-colors duration-200 group-hover:text-graphit">
                  <LocalizedCopy text={audience.ctaLabel} />
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Abschluss — die Seite endete bisher ohne nächsten Schritt. */}
        <section className="relative isolate overflow-clip bg-tinte px-6 py-24 text-kreide lg:px-10 lg:py-32">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-8">
            <Eyebrow onDark><LocalizedCopy text="Dein nächster Schritt" /></Eyebrow>
            <h2 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
              <span className="font-serif font-medium"><LocalizedCopy text="Lernen wir" /></span>
              <br />
              <span className="font-sans font-black tracking-tight"><LocalizedCopy text="uns kennen." /></span>
            </h2>
            <p className="max-w-lg font-sans text-lg leading-8 text-kreide/80">
              <LocalizedCopy text="Erzähl uns von deinem Vorhaben — wir sagen dir ehrlich, was dafür sinnvoll ist und was du dir sparen kannst." />
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="inverse" size="lg">
                <Link href="/kontakt?anliegen=Kennenlernen"><LocalizedCopy text="Beratung anfragen" /></Link>
              </Button>
              <Button asChild variant="outlineOnDark" size="lg">
                <Link href="/konfigurator"><LocalizedCopy text="Jetzt konfigurieren" /></Link>
              </Button>
            </div>
            <p className="font-sans text-sm text-kreide/60">
              <LocalizedCopy text="Oder schreib uns direkt:" />{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-kreide underline decoration-kreide/30 underline-offset-4 transition-colors hover:decoration-kreide">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
