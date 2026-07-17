import type { Metadata } from "next";

import { ContactAside, ContactPageIntro } from "@/components/ContactPageCopy";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Kontakt | MINO",
  description: "Nimm Kontakt zu MINO auf — für Beratung, Fragen zu Modellen oder deinem fertigen Anhänger.",
};

export default async function KontaktPage({
  searchParams,
}: {
  searchParams?: Promise<{ anliegen?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialSubject = typeof params?.anliegen === "string" ? params.anliegen : undefined;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
        <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-8 lg:px-10 lg:pt-24">
          <ContactPageIntro />
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
            <ContactForm initialSubject={initialSubject} />
            <ContactAside />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
