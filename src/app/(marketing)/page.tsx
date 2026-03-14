import Link from "next/link";
import { TreatmentSearch } from "@/components/TreatmentSearch";
import { PriceCard } from "@/components/PriceCard";
import { Card } from "@/components/ui/Card";
import { getAllTreatments, getAllCities, getTreatmentsWithNationalPrices } from "@/lib/data/queries";
import { TREATMENT_CATEGORY_LABELS } from "@/types";

export default async function HomePage() {
  const [treatments, cities, treatmentsWithPrices] = await Promise.all([
    getAllTreatments(),
    getAllCities(),
    getTreatmentsWithNationalPrices(),
  ]);

  const topTreatments = treatmentsWithPrices.slice(0, 8);
  const topCities = cities.slice(0, 12);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Compara{" "}
            <span className="text-primary-600">precios dentales</span>{" "}
            en España
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Datos reales de aseguradoras, cadenas y clínicas. Encuentra el mejor
            precio para tu tratamiento dental.
          </p>

          <div className="mt-8 flex justify-center">
            <TreatmentSearch
              treatments={treatments.map((t) => ({
                name: t.name,
                slug: t.slug,
                category: t.category,
              }))}
              cities={cities.map((c) => ({ name: c.name, slug: c.slug }))}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-accent-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Datos de {treatmentsWithPrices.length}+ tratamientos
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-accent-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              {cities.length}+ ciudades
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-accent-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Actualizado 2026
            </span>
          </div>
        </div>
      </section>

      {/* Popular treatments */}
      {topTreatments.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Tratamientos más buscados
              </h2>
              <p className="mt-1 text-gray-600">
                Precios actualizados de los tratamientos dentales más populares
              </p>
            </div>
            <Link
              href="/tratamientos"
              className="hidden text-sm font-medium text-primary-600 hover:text-primary-800 sm:block"
            >
              Ver todos &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topTreatments.map((t) => (
              <PriceCard
                key={t.treatmentSlug}
                treatmentName={t.treatmentName}
                treatmentSlug={t.treatmentSlug}
                priceRange={{
                  min: Number(t.min),
                  max: Number(t.max),
                  avg: Math.round(Number(t.avg)),
                  count: Number(t.count),
                }}
              />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/tratamientos"
              className="text-sm font-medium text-primary-600 hover:text-primary-800"
            >
              Ver todos los tratamientos &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Cities */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Precios por ciudad
          </h2>
          <p className="mt-1 text-gray-600">
            Compara precios dentales en las principales ciudades de España
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/ciudades/${city.slug}`}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 hover:border-primary-300 hover:shadow-sm transition-all"
              >
                {city.name}
                <span className="ml-1 text-xs text-gray-400">
                  ({city.community})
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/ciudades"
              className="text-sm font-medium text-primary-600 hover:text-primary-800"
            >
              Ver todas las ciudades &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Cómo funciona
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Busca tu tratamiento",
              description:
                "Selecciona el tratamiento dental y tu ciudad para ver precios locales.",
            },
            {
              step: "2",
              title: "Compara precios",
              description:
                "Ve el rango de precios con datos de aseguradoras, cadenas y clínicas independientes.",
            },
            {
              step: "3",
              title: "Decide informado",
              description:
                "Conoce el precio justo antes de visitar al dentista. Sin sorpresas.",
            },
          ].map((item) => (
            <Card key={item.step} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-600">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-gray-200 bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-4xl text-center text-xs text-gray-400 leading-relaxed">
          Los precios mostrados son orientativos y están basados en datos
          públicos de aseguradoras, cadenas dentales y clínicas que publican sus
          tarifas. El precio final de cualquier tratamiento depende del
          diagnóstico individualizado del profesional. Solicita siempre un
          presupuesto personalizado antes de iniciar cualquier tratamiento.
          Precios con IVA incluido salvo indicación contraria.
        </p>
      </section>
    </>
  );
}
