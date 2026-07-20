import type { Metadata } from "next";
import Image from "next/image";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocalizedCopy } from "@/components/LocalizedCopy";

export const metadata: Metadata = {
  title: "Über uns | MINO",
  description: "Die Geschichte hinter MINO — aus eigener Gastronomie-Erfahrung entstanden.",
};

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

        <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-32">
          <div>
            <Eyebrow><LocalizedCopy text="Warum wir das machen" /></Eyebrow>
            <h2 className="mt-4 text-4xl leading-[0.95] tracking-normal lg:text-6xl">
              <span className="font-serif font-medium"><LocalizedCopy text="Wir kennen" /></span>
              <br />
              <span className="font-sans font-black tracking-tight"><LocalizedCopy text="die Realität." /></span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 font-sans text-base leading-8 text-graphit/75 lg:text-lg lg:leading-9">
            <p>
              <LocalizedCopy text="Wir beide sind selbst in der Immobilien- und Gastronomiebranche tätig und haben daran viel Spaß. Als wir unser eigenes Equipment aufstocken wollten, haben wir schnell gemerkt, wie viel man dabei lernen muss: Welche Ausstattung lohnt sich wirklich? Wo zahlt man zu viel? Und worauf kommt es an, wenn ein Konzept nicht nur gut aussehen, sondern jeden Tag Umsatz machen soll?" />
            </p>
            <p>
              <LocalizedCopy text="Genau aus dieser Erfahrung heraus haben wir unseren ersten Anhänger auf eigene Faust produziert. Dabei wurde klar: In mobiler Gastronomie steckt enormes Potenzial, aber Preis und Leistung müssen stimmen. Ein Anhänger oder Pavillon darf nicht unnötig kompliziert sein, sondern muss zu dem Geschäft passen, das dahintersteht." />
            </p>
            <p>
              <LocalizedCopy text="Heute möchten wir möglichst vielen Gastronomen helfen, ihr bestehendes Geschäft durch mobile Gastronomie zu erweitern, neue Standorte zu testen oder zusätzlichen Umsatz aufzubauen. Gleichzeitig wollen wir Startups und Jungunternehmer dabei unterstützen, ihr erstes eigenes Projekt greifbar und bezahlbar umzusetzen." />
            </p>

            <dl className="mt-6 grid gap-x-8 gap-y-6 border-t border-graphit/10 pt-8 sm:grid-cols-3">
              {[
                {
                  label: "Erfahrung",
                  text: "Wir kennen die Anforderungen aus eigener Gastronomie-Praxis.",
                },
                {
                  label: "Preis & Leistung",
                  text: "Gute Ausstattung muss wirtschaftlich bleiben und zum Konzept passen.",
                },
                {
                  label: "Umsetzung",
                  text: "Vom ersten Paket bis zum individuellen Ausbau denken wir verkaufsnah.",
                },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="font-sans text-xs font-semibold tracking-[0.14em] text-graphit/55 uppercase">
                    <LocalizedCopy text={item.label} />
                  </dt>
                  <dd className="mt-2.5 font-sans text-sm leading-6 text-graphit/70">
                    <LocalizedCopy text={item.text} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-32">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-kreide/40">
            <Image
              src="/images/prozess/anhaenger-uebergabe.png"
              alt="Fertiger MINO Anhänger vor der Übergabe"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
              <span className="font-serif font-medium"><LocalizedCopy text="Für Menschen," /></span>
              <br />
              <span className="font-sans font-black tracking-tight"><LocalizedCopy text="die starten wollen." /></span>
            </h2>
            <div className="mt-7 flex flex-col gap-5 font-sans text-base leading-8 text-graphit/72">
              <p>
                <LocalizedCopy text="Manche wollen mit einem fertigen Anhänger direkt loslegen. Andere brauchen erst ein kleineres Setup, etwa einen Verkaufs-Pavillon, um ein Konzept zu testen. Für beides möchten wir eine klare, faire und verständliche Lösung anbieten." />
              </p>
              <p>
                <LocalizedCopy text="Unser Ziel ist nicht, möglichst kompliziert zu planen. Unser Ziel ist, dass du eine Ausstattung bekommst, die zu deinem Produkt, deinem Budget und deinem nächsten Schritt passt." />
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
