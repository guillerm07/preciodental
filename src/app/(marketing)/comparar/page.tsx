export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TreatmentSearch } from "@/components/TreatmentSearch";
import { getAllTreatments, getAllCities } from "@/lib/data/queries";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Comparar precios de tratamientos dentales",
  description:
    "Herramienta para comparar precios de tratamientos dentales en España. Busca por tratamiento y ciudad.",
  path: "/comparar",
});

export default async function ComparePage() {
  const [treatments, cities] = await Promise.all([
    getAllTreatments(),
    getAllCities(),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Comparar precios", href: "/comparar" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">
        Comparar precios dentales
      </h1>
      <p className="mt-2 text-gray-600">
        Selecciona un tratamiento y una ciudad para ver el rango de precios con
        datos de aseguradoras, cadenas y clínicas.
      </p>

      <div className="mt-8">
        <TreatmentSearch
          treatments={treatments.map((t) => ({
            name: t.name,
            slug: t.slug,
            category: t.category,
          }))}
          cities={cities.map((c) => ({ name: c.name, slug: c.slug }))}
        />
      </div>
    </div>
  );
}
