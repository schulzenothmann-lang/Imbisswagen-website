import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModelDetailView } from "@/components/modelle/ModelDetailView";
import { ModelsClosingCta } from "@/components/modelle/ModelsShowcase";
import { LEGACY_MODEL_IDS, MODEL_DETAILS, findModelDetail } from "@/lib/models";

export function generateStaticParams() {
  return MODEL_DETAILS.map((detail) => ({ modelId: detail.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ modelId: string }>;
}): Promise<Metadata> {
  const { modelId } = await params;
  const detail = findModelDetail(modelId);
  if (!detail) return {};

  return {
    title: `${detail.name} | MINO`,
    description: detail.description,
  };
}

export default async function ModelDetailPage({ params }: { params: Promise<{ modelId: string }> }) {
  const { modelId } = await params;

  // Frühere IDs (xl/basis/standard) zeigen noch auf die alten Modellnamen.
  const legacyTarget = LEGACY_MODEL_IDS[modelId];
  if (legacyTarget) permanentRedirect(`/modelle/${legacyTarget}`);

  const detail = findModelDetail(modelId);
  if (!detail) notFound();

  const others = MODEL_DETAILS.filter((other) => other.id !== detail.id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton pt-16 text-graphit lg:pt-[4.25rem]">
        <ModelDetailView detail={detail} others={others} />
        <ModelsClosingCta />
      </main>
      <Footer />
    </>
  );
}
