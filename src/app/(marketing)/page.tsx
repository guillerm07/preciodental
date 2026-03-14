export const dynamic = "force-dynamic";

import Link from "next/link";
import { TreatmentSearch } from "@/components/TreatmentSearch";
import { PriceRangeBar } from "@/components/PriceRangeBar";
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

  // Group by category
  const byCategory: Record<string, typeof treatmentsWithPrices> = {};
  for (const t of treatmentsWithPrices) {
    if (!byCategory[t.category]) byCategory[t.category] = [];
    byCategory[t.category].push(t);
  }

  // Hero treatments — the ones everyone searches for
  const heroSlugs = ["implante-dental", "ortodoncia-invisible", "blanqueamiento-dental", "limpieza-dental"];
  const heroTreatments = heroSlugs
    .map((slug) => treatmentsWithPrices.find((t) => t.treatmentSlug === slug))
    .filter(Boolean) as typeof treatmentsWithPrices;

  const topCities = cities.slice(0, 8);

  return (
    <>
      {/* Hero — left-aligned, asymmetric */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-primary-50/30" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl w-full px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left — copy + search */}
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
                {stats.prices}+ precios verificados — marzo 2026
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl text-balance" style={{ lineHeight: "1.08" }}>
                ¿Cuánto cuesta tu tratamiento dental?
              </h1>

              <p className="mt-5 text-lg text-zinc-500 max-w-xl text-pretty leading-relaxed">
                Precios reales de aseguradoras, cadenas y clínicas en {stats.cities} ciudades de España. Sin registro, sin compromisos.
              </p>

              {/* Search */}
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

              {/* Trust line */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400">
                <span className="tabular-nums">{stats.treatments} tratamientos</span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span className="tabular-nums">{stats.sources} fuentes de datos</span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span>Datos públicos y verificables</span>
              </div>
            </div>

            {/* Right — instant price answers */}
            <div className="lg:col-span-2 space-y-3">
              {heroTreatments.slice(0, 4).map((t) => (
                <Link
                  key={t.treatmentSlug}
                  href={`/tratamientos/${t.treatmentSlug}`}
                  className="group block rounded-2xl border border-zinc-200/60 bg-white p-5 shadow-soft hover:shadow-elevated hover:border-zinc-300/60 transition-all duration-200 press-scale"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-700 transition-colors">
                      {t.treatmentName}
                    </span>
                    <span className="text-lg font-bold text-zinc-900 tabular-nums">
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
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-primary-600 tabular-nums">{formatPrice(Number(t.min))}</span>
                    <span className="text-zinc-400">{Number(t.count)} fuentes</span>
                    <span className="text-zinc-500 tabular-nums">{formatPrice(Number(t.max))}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatments by category — asymmetric 2-col layout */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance">
            Precios de tratamientos dentales en España
          </h2>
          <p className="mt-3 text-zinc-500 text-pretty">
            Rango de precios actualizado con datos de {stats.sources} fuentes verificadas.
            Toca cualquier tratamiento para ver el desglose completo.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {Object.entries(byCategory)
            .slice(0, 6)
            .map(([category, catTreatments]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {TREATMENT_CATEGORY_LABELS[category as TreatmentCategory] || category}
              </h3>
              <div className="mt-4 divide-y divide-zinc-100">
                {catTreatments.map((t) => (
                  <Link
                    key={t.treatmentSlug}
                    href={`/tratamientos/${t.treatmentSlug}`}
                    className="group flex items-center gap-6 py-4 hover:bg-zinc-50/50 -mx-4 px-4 rounded-xl transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-zinc-900 group-hover:text-primary-700 transition-colors">
                        {t.treatmentName}
                      </p>
                      <p className="mt-0.5 text-sm text-zinc-400 tabular-nums">
                        {formatPrice(Number(t.min))} — {formatPrice(Number(t.max))}
                      </p>
                    </div>
                    <div className="hidden sm:block w-32">
                      <PriceRangeBar
                        min={Number(t.min)}
                        max={Number(t.max)}
                        avg={Math.round(Number(t.avg))}
                        size="sm"
                      />
                    </div>
                    <div className="text-right shrink-0 w-24">
                      <p className="text-lg font-bold text-zinc-900 tabular-nums">
                        {formatPrice(Math.round(Number(t.avg)))}
                      </p>
                      <p className="text-xs text-zinc-400">media</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/tratamientos"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-all press-scale"
          >
            Ver los {treatmentsWithPrices.length} tratamientos
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Insurance savings — asymmetric with accent */}
      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                Ahorro con seguro dental
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 text-balance">
                Con seguro dental ahorras entre un 30% y 50%
              </h2>
              <p className="mt-3 text-zinc-500 text-pretty leading-relaxed">
                Las aseguradoras negocian precios máximos con su red de clínicas.
                Comparamos tarifas de Sanitas, Adeslas, Cigna y más para que veas
                exactamente cuánto puedes ahorrar.
              </p>
              <Link
                href="/seguros-dentales"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-primary-700 transition-colors"
              >
                Comparar aseguradoras
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Savings examples */}
            <div className="space-y-3">
              {[
                { name: "Implante dental", without: 1200, with: 700 },
                { name: "Corona de zirconio", without: 500, with: 295 },
                { name: "Endodoncia", without: 250, with: 128 },
              ].map((item) => {
                const savings = Math.round(((item.without - item.with) / item.without) * 100);
                return (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-zinc-200/60 bg-white p-5 shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-zinc-500">{item.name}</p>
                      <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                        -{savings}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="text-xl font-bold text-zinc-900 tabular-nums">
                        {formatPrice(item.with)}
                      </span>
                      <span className="text-sm text-zinc-400 line-through tabular-nums">
                        {formatPrice(item.without)}
                      </span>
                      <span className="text-sm text-primary-600 font-medium">
                        con seguro
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Precios por ciudad
              </h2>
              <p className="mt-2 text-zinc-500">
                Los precios varían según la zona geográfica. Las ciudades de
                Zona A suelen ser más baratas.
              </p>
            </div>
            <Link
              href="/ciudades"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Ver {cities.length} ciudades
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/ciudades/${city.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-soft hover:shadow-elevated hover:border-zinc-300/60 transition-all duration-200 press-scale"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-sm font-semibold text-zinc-600 group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                  {city.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-zinc-900 group-hover:text-primary-700 transition-colors">
                    {city.name}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {city.community}
                  </p>
                </div>
                <span className={`ml-auto shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold ${
                  city.zone === "A"
                    ? "bg-primary-50 text-primary-700"
                    : "bg-zinc-100 text-zinc-500"
                }`}>
                  {city.zone}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/ciudades"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
            >
              Ver las {cities.length} ciudades →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works — data sources */}
      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance">
              ¿De dónde vienen los datos?
            </h2>
            <p className="mt-3 text-zinc-500 text-pretty">
              Transparencia total. Todos nuestros datos provienen de fuentes públicas y verificables.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "PDFs de aseguradoras",
                description:
                  "Descargamos y analizamos los baremos oficiales de Sanitas, Adeslas, Cigna y otras aseguradoras con IA.",
                detail: "Baremos 2025-2026",
              },
              {
                title: "Webs de cadenas y clínicas",
                description:
                  "Recopilamos precios públicos de Vitaldent, Dentix, y clínicas que publican tarifas online.",
                detail: "Actualización trimestral",
              },
              {
                title: "Precios de pacientes",
                description:
                  "Los usuarios reportan lo que pagaron en su ciudad. Cada dato se verifica antes de publicarse.",
                detail: "Datos anónimos",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-soft transition-all hover:shadow-elevated"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  {item.detail}
                </p>
                <h3 className="mt-3 text-base font-semibold text-zinc-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed text-pretty">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/metodologia"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Leer nuestra metodología completa
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-zinc-900 p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl text-balance">
                  ¿Has ido al dentista recientemente?
                </h2>
                <p className="mt-3 text-zinc-400 text-pretty leading-relaxed">
                  Comparte lo que pagaste de forma anónima y ayuda a otros pacientes
                  a conocer precios reales en su ciudad.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/reportar-precio"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors press-scale"
                >
                  Reportar mi precio
                </Link>
                <Link
                  href="/comparar"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors press-scale"
                >
                  Comparar tratamientos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-zinc-100 px-4 py-8 sm:px-6">
        <p className="mx-auto max-w-4xl text-center text-xs text-zinc-400 leading-relaxed text-pretty">
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
