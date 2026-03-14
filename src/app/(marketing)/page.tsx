export const dynamic = "force-dynamic";

import Link from "next/link";
import { TreatmentSearch } from "@/components/TreatmentSearch";
import { PriceRangeBar } from "@/components/PriceRangeBar";
import { Card } from "@/components/ui/Card";
import {
  getAllTreatments,
  getAllCities,
  getTreatmentsWithNationalPrices,
  getGlobalStats,
} from "@/lib/data/queries";
import { TREATMENT_CATEGORY_LABELS, type TreatmentCategory } from "@/types";
import { formatPrice } from "@/lib/utils/format";

export default async function HomePage() {
  const [treatments, cities, treatmentsWithPrices, stats] = await Promise.all([
    getAllTreatments(),
    getAllCities(),
    getTreatmentsWithNationalPrices(),
    getGlobalStats(),
  ]);

  // Group treatments by category for display
  const byCategory: Record<string, typeof treatmentsWithPrices> = {};
  for (const t of treatmentsWithPrices) {
    if (!byCategory[t.category]) byCategory[t.category] = [];
    byCategory[t.category].push(t);
  }

  // Pick 3 "hero" treatments that everyone knows about
  const heroSlugs = ["implante-dental", "ortodoncia-invisible", "limpieza-dental"];
  const heroTreatments = heroSlugs
    .map((slug) => treatmentsWithPrices.find((t) => t.treatmentSlug === slug))
    .filter(Boolean) as typeof treatmentsWithPrices;

  // Top 8 cities
  const topCities = cities.slice(0, 8);

  return (
    <>
      {/* Hero — instant answers */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-4 py-16 sm:py-20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
              Datos actualizados marzo 2026
            </p>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              ¿Cuánto cuesta tu
              <br />
              <span className="text-accent-300">tratamiento dental?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Compara precios reales de aseguradoras, cadenas y clínicas en tu ciudad.
              Sin registro. Sin compromisos.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="rounded-2xl bg-white/10 p-2 backdrop-blur-sm">
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

          {/* Instant price previews */}
          {heroTreatments.length > 0 && (
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {heroTreatments.map((t) => (
                <Link
                  key={t.treatmentSlug}
                  href={`/tratamientos/${t.treatmentSlug}`}
                  className="group rounded-xl bg-white/10 p-5 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all"
                >
                  <p className="text-sm font-medium text-primary-200 group-hover:text-white transition-colors">
                    {t.treatmentName}
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">
                      {formatPrice(Math.round(Number(t.avg)))}
                    </span>
                    <span className="text-sm text-primary-300">media</span>
                  </div>
                  <div className="mt-1 text-sm text-primary-300">
                    desde {formatPrice(Number(t.min))} hasta {formatPrice(Number(t.max))}
                  </div>
                  <div className="mt-3">
                    <PriceRangeBar
                      min={Number(t.min)}
                      max={Number(t.max)}
                      avg={Math.round(Number(t.avg))}
                      size="sm"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Stats bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { value: `${stats.treatments}`, label: "tratamientos" },
              { value: `${stats.cities}`, label: "ciudades" },
              { value: `${stats.sources}`, label: "fuentes de datos" },
              { value: `${stats.prices}+`, label: "precios comparados" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-primary-300 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick answer section — "¿Cuánto cuesta...?" */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Precios de tratamientos dentales en España
          </h2>
          <p className="mt-2 text-gray-600">
            Rango de precios actualizado con datos de {stats.sources} fuentes verificadas
          </p>
        </div>

        {/* Treatments by category with visual bars */}
        <div className="mt-10 space-y-10">
          {Object.entries(byCategory)
            .slice(0, 5)
            .map(([category, catTreatments]) => (
            <div key={category}>
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="inline-block h-1 w-6 rounded-full bg-primary-500" />
                {TREATMENT_CATEGORY_LABELS[category as TreatmentCategory] || category}
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {catTreatments.map((t) => (
                  <Link
                    key={t.treatmentSlug}
                    href={`/tratamientos/${t.treatmentSlug}`}
                    className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {t.treatmentName}
                      </h4>
                      <span className="shrink-0 ml-3 text-xl font-extrabold text-primary-600">
                        {formatPrice(Math.round(Number(t.avg)))}
                      </span>
                    </div>
                    <div className="mt-3">
                      <PriceRangeBar
                        min={Number(t.min)}
                        max={Number(t.max)}
                        avg={Math.round(Number(t.avg))}
                        size="sm"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>{Number(t.count)} fuentes</span>
                      <span className="text-primary-500 font-medium group-hover:translate-x-0.5 transition-transform">
                        Ver detalles →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/tratamientos"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Ver los {treatmentsWithPrices.length} tratamientos
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Insurance savings callout */}
      <section className="border-t border-b border-gray-100 bg-gradient-to-r from-accent-50 via-white to-accent-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold text-accent-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            Ahorro con seguro dental
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Con seguro dental puedes ahorrar entre un 30% y 50%
          </h2>
          <p className="mt-3 text-gray-600">
            Las aseguradoras negocian precios máximos con su red de clínicas.
            Comparamos tarifas de Sanitas, Adeslas, Cigna y más.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Implante dental</p>
              <p className="mt-1 text-lg font-bold text-gray-400 line-through">~1.200 €</p>
              <p className="text-2xl font-extrabold text-accent-600">~700 €</p>
              <p className="mt-1 text-sm font-semibold text-accent-600">Ahorro ~42%</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Corona de zirconio</p>
              <p className="mt-1 text-lg font-bold text-gray-400 line-through">~500 €</p>
              <p className="text-2xl font-extrabold text-accent-600">~300 €</p>
              <p className="mt-1 text-sm font-semibold text-accent-600">Ahorro ~40%</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Endodoncia</p>
              <p className="mt-1 text-lg font-bold text-gray-400 line-through">~250 €</p>
              <p className="text-2xl font-extrabold text-accent-600">~130 €</p>
              <p className="mt-1 text-sm font-semibold text-accent-600">Ahorro ~48%</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/seguros-dentales"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 hover:text-accent-800"
            >
              Comparar aseguradoras
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Precios por ciudad
            </h2>
            <p className="mt-1 text-gray-600">
              Los precios varían según la zona geográfica. Consulta tu ciudad.
            </p>
          </div>
          <Link
            href="/ciudades"
            className="hidden text-sm font-semibold text-primary-600 hover:text-primary-800 sm:flex items-center gap-1"
          >
            Ver {cities.length} ciudades →
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/ciudades/${city.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-lg font-bold text-primary-600 group-hover:bg-primary-100 transition-colors">
                {city.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {city.name}
                </p>
                <p className="text-xs text-gray-500">
                  {city.community} · Zona {city.zone}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/ciudades"
            className="text-sm font-semibold text-primary-600 hover:text-primary-800"
          >
            Ver las {cities.length} ciudades →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            ¿De dónde vienen los datos?
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Transparencia total sobre nuestra metodología
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                ),
                title: "PDFs de aseguradoras",
                description:
                  "Descargamos y analizamos los baremos oficiales de Sanitas, Adeslas, Cigna y otras aseguradoras.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                ),
                title: "Webs de cadenas y clínicas",
                description:
                  "Recopilamos precios públicos de Vitaldent, Dentix, y clínicas que publican tarifas online.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                ),
                title: "Precios de pacientes",
                description:
                  "Los usuarios reportan lo que pagaron en su ciudad. Verificamos cada dato antes de publicarlo.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/metodologia"
              className="text-sm font-semibold text-primary-600 hover:text-primary-800"
            >
              Leer nuestra metodología completa →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            ¿Has ido al dentista recientemente?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-100">
            Comparte lo que pagaste (de forma anónima) y ayuda a otros pacientes
            a conocer precios reales en su ciudad.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/reportar-precio"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Reportar mi precio
            </Link>
            <Link
              href="/comparar"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Comparar tratamientos
            </Link>
          </div>
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
