export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceCard } from "@/components/PriceCard";
import { getTreatmentsWithNationalPrices, getTreatmentsByCategory } from "@/lib/data/queries";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { TREATMENT_CATEGORY_LABELS, type TreatmentCategory } from "@/types";

export const metadata: Metadata = generatePageMetadata({
  title: "Precios de tratamientos dentales en España (2026)",
  description:
    "Compara precios de todos los tratamientos dentales en España. Implantes, ortodoncia, blanqueamiento, endodoncia y más. Datos actualizados 2026.",
  path: "/tratamientos",
});

export default async function TreatmentsPage() {
  const [treatmentsWithPrices, treatmentsByCategory] = await Promise.all([
    getTreatmentsWithNationalPrices(),
    getTreatmentsByCategory(),
  ]);

  const priceMap = new Map(
    treatmentsWithPrices.map((t) => [
      t.treatmentSlug,
      { min: Number(t.min), max: Number(t.max), avg: Math.round(Number(t.avg)), count: Number(t.count) },
    ])
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Tratamientos", href: "/tratamientos" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">
        Precios de tratamientos dentales en España
      </h1>
      <p className="mt-2 text-gray-600">
        Rangos de precios actualizados en 2026 con datos de aseguradoras, cadenas y clínicas.
      </p>

      {Object.entries(treatmentsByCategory).map(([category, treatments]) => (
        <section key={category} className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">
            {TREATMENT_CATEGORY_LABELS[category as TreatmentCategory] || category}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => {
              const range = priceMap.get(t.slug);
              return (
                <PriceCard
                  key={t.slug}
                  treatmentName={t.name}
                  treatmentSlug={t.slug}
                  priceRange={range || { min: 0, max: 0, avg: 0, count: 0 }}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
