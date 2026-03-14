import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReportPriceForm } from "@/components/ReportPriceForm";
import { getAllTreatments, getAllCities } from "@/lib/data/queries";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Reportar precio — ¿Cuánto pagaste?",
  description:
    "Reporta el precio que pagaste por un tratamiento dental y ayuda a otros pacientes a conocer precios reales.",
  path: "/reportar-precio",
});

export default async function ReportPricePage() {
  const [treatments, cities] = await Promise.all([
    getAllTreatments(),
    getAllCities(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Reportar precio", href: "/reportar-precio" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">¿Cuánto pagaste?</h1>
      <p className="mt-2 text-gray-600">
        Comparte el precio que pagaste por un tratamiento dental. Tu aportación
        ayuda a otros pacientes a conocer precios reales.
      </p>

      <ReportPriceForm
        treatments={treatments.map((t) => ({ name: t.name, slug: t.slug }))}
        cities={cities.map((c) => ({ name: c.name, slug: c.slug }))}
      />
    </div>
  );
}
