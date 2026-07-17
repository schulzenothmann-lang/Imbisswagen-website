import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocalizedCopy } from "@/components/LocalizedCopy";
import { CONTACT_EMAIL } from "@/lib/contact";
import { HOSTING_PROVIDER, LEGAL_CITY, LEGAL_COMPANY_NAME, LEGAL_STREET } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Datenschutz | MINO",
  description: "Datenschutzerklärung gemäß Art. 13 DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
        <section className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24 lg:px-10 lg:pt-24 lg:pb-32">
          <h1 className="text-4xl leading-[0.95] tracking-normal lg:text-5xl">
            <span className="font-sans font-black tracking-tight"><LocalizedCopy text="Datenschutzerklärung" /></span>
          </h1>

          <p className="mt-6 rounded-sm border border-dashed border-graphit/25 bg-kreide/40 p-5 font-sans text-sm text-graphit/60">
            <LocalizedCopy text="Diese Erklärung beschreibt den aktuellen technischen Stand der Website (Stand: keine Analyse-Tools, kein Tracking, keine Cookies). Verantwortliche Stelle und Hosting-Anbieter sind noch Platzhalter und müssen vor dem Livegang ergänzt werden. Bei neuen Diensten (z. B. Formularversand über einen Server, Analytics, Newsletter) muss dieser Text entsprechend erweitert werden." />
          </p>

          <div className="mt-10 flex flex-col gap-8 font-sans text-sm leading-7 text-graphit/80">
            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="1. Verantwortliche Stelle" /></h2>
              <p className="mt-2">
                {LEGAL_COMPANY_NAME}
                <br />
                {LEGAL_STREET}
                <br />
                {LEGAL_CITY}
                <br />
                E-Mail: {CONTACT_EMAIL}
              </p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="2. Hosting" /></h2>
              <p className="mt-2">
                <LocalizedCopy
                  text="Diese Website wird bei {provider} gehostet. Beim Aufruf der Seite verarbeitet der Hosting-Anbieter automatisch technische Zugriffsdaten (Server-Logfiles), z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite und verwendeter Browser. Diese Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einem sicheren und funktionsfähigen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO)."
                  values={{ provider: HOSTING_PROVIDER }}
                />
              </p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="3. Kontaktformular" /></h2>
              <p className="mt-2">
                <LocalizedCopy
                  text="Das Kontaktformular auf dieser Website übermittelt deine Eingaben nicht an einen Server von uns, sondern öffnet dein lokales E-Mail-Programm mit einer vorausgefüllten Nachricht. Der eigentliche Versand erfolgt direkt aus deinem E-Mail-Programm an {email}. Wir speichern die Formulareingaben zu keinem Zeitpunkt auf unseren Servern; die Verarbeitung der von dir gesendeten E-Mail erfolgt zur Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO)."
                  values={{ email: CONTACT_EMAIL }}
                />
              </p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="4. Cookies & Analyse-Tools" /></h2>
              <p className="mt-2">
                <LocalizedCopy text="Diese Website setzt aktuell keine Cookies und keine Analyse- oder Tracking-Tools ein." />
              </p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="5. Schriftarten" /></h2>
              <p className="mt-2">
                <LocalizedCopy text="Wir verwenden Google-Schriftarten (Libre Franklin, Playfair Display), die lokal über unseren Server ausgeliefert werden. Es findet dazu keine Verbindung zu Servern von Google statt, es werden keine Daten an Google übertragen." />
              </p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="6. Deine Rechte" /></h2>
              <p className="mt-2">
                <LocalizedCopy
                  text="Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner personenbezogenen Daten sowie auf Datenübertragbarkeit und Widerspruch gegen die Verarbeitung. Zudem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Wende dich dazu an {email}."
                  values={{ email: CONTACT_EMAIL }}
                />
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
