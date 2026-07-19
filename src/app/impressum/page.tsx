import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocalizedCopy } from "@/components/LocalizedCopy";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/lib/contact";
import {
  LEGAL_CITY,
  LEGAL_COMPANY_NAME,
  LEGAL_REGISTER,
  LEGAL_REPRESENTATIVE,
  LEGAL_RESPONSIBLE_CONTENT,
  LEGAL_STREET,
  LEGAL_VAT_ID,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Impressum | MINO",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
        <section className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24 lg:px-10 lg:pt-24 lg:pb-32">
          <h1 className="text-4xl leading-[0.95] tracking-normal lg:text-5xl">
            <span className="font-sans font-black tracking-tight"><LocalizedCopy text="Impressum" /></span>
          </h1>

          <p className="mt-6 rounded-sm border border-dashed border-graphit/25 bg-kreide/40 p-5 font-sans text-sm text-graphit/60">
            <LocalizedCopy text="Die Gründung als UG (haftungsbeschränkt) befindet sich in Vorbereitung. Handelsregistereintrag und Umsatzsteuer-ID werden ergänzt, sobald sie vorliegen." />
          </p>

          <div className="mt-10 flex flex-col gap-8 font-sans text-sm leading-7 text-graphit/80">
            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="Angaben gemäß § 5 TMG" /></h2>
              <p className="mt-2">
                {LEGAL_COMPANY_NAME}
                <br />
                {LEGAL_STREET}
                <br />
                {LEGAL_CITY}
              </p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="Vertreten durch" /></h2>
              <p className="mt-2">{LEGAL_REPRESENTATIVE}</p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="Kontakt" /></h2>
              <p className="mt-2">
                <LocalizedCopy text="Telefon" />: {CONTACT_PHONE_DISPLAY}
                <br />
                E-Mail: {CONTACT_EMAIL}
              </p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="Registereintrag" /></h2>
              <p className="mt-2">{LEGAL_REGISTER}</p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="Umsatzsteuer-ID" /></h2>
              <p className="mt-2">{LEGAL_VAT_ID}</p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit">
                <LocalizedCopy text="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" />
              </h2>
              <p className="mt-2">{LEGAL_RESPONSIBLE_CONTENT}</p>
            </div>

            <div>
              <h2 className="font-sans text-base font-bold text-graphit"><LocalizedCopy text="Streitschlichtung" /></h2>
              <p className="mt-2">
                <LocalizedCopy text="Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:" />{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  className="underline underline-offset-2 hover:text-graphit"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <LocalizedCopy text=". Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen." />
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
