import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ModelsTeaser } from "@/components/ModelsTeaser";
import { CustomerJourney } from "@/components/CustomerJourney";
import { FaqSection } from "@/components/FaqSection";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <ModelsTeaser />
        <HowItWorks />
        <CustomerJourney />
        <FaqSection />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
