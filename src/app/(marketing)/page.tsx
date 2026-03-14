export const dynamic = "force-dynamic";

import Link from "next/link";
import { TreatmentSearch } from "@/components/TreatmentSearch";
import { PriceRangeBar } from "@/components/PriceRangeBar";
import AnimatedCounter from "@/components/AnimatedCounter";
import SourceTicker from "@/components/SourceTicker";
import {
  getAllTreatments,
  getAllCities,
  getTreatmentsWithNationalPrices,
  getGlobalStats,
} from "@/lib/data/queries";
import { formatPrice } from "@/lib/utils/format";

export default async function HomePage() {
  const [treatments, cities, treatmentsWithPrices, stats] = await Promise.all([
    getAllTreatments(),
    getAllCities(),
    getTreatmentsWithNationalPrices(),
    getGlobalStats(),
  ]);

  const topCities = cities.slice(0, 12);

  const popularSlugs = [
    "implante-dental",
    "ortodoncia-invisible",
    "blanqueamiento-dental",
    "brackets-metalicos",
    "carillas-de-porcelana",
  ];

  const popularLinks = popularSlugs
    .map((slug) => {
      const t = treatmentsWithPrices.find((t) => t.treatmentSlug === slug);
      if (!t) return null;
      return { slug: t.treatmentSlug, name: t.treatmentName };
    })
    .filter(Boolean) as { slug: string; name: string }[];

  const topTreatments = treatmentsWithPrices.slice(0, 6);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-dots opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

        <div className="relative mx-auto max-w-7xl w-full px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
            {/* Left -- copy + search */}
            <div className="lg:col-span-3 fade-in-up">
              <h1
                className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl text-balance"
                style={{ lineHeight: "1.08" }}
              >
                Compara precios dentales en España
              </h1>

              <p className="mt-5 text-lg text-zinc-500 max-w-xl text-pretty leading-relaxed">
                Datos reales de aseguradoras, cadenas y clínicas en{" "}
                <span className="font-medium text-zinc-700">
                  {stats.cities} ciudades
                </span>
                .
              </p>

              {/* Search */}
              <div className="mt-10">
                <TreatmentSearch
                  treatments={treatments.map((t) => ({
                    name: t.name,
                    slug: t.slug,
                    category: t.category,
                  }))}
                  cities={cities.map((c) => ({ name: c.name, slug: c.slug }))}
                />
              </div>

              {/* Popular searches */}
              <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
                <span className="text-zinc-400">Lo más buscado:</span>
                {popularLinks.map((link, i) => (
                  <span key={link.slug} className="flex items-center gap-2">
                    <Link
                      href={`/tratamientos/${link.slug}`}
                      className="text-zinc-600 hover:text-primary-700 underline underline-offset-2 decoration-zinc-300 hover:decoration-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                    {i < popularLinks.length - 1 && (
                      <span className="h-1 w-1 rounded-full bg-zinc-300" />
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Right -- stats counters */}
            <div className="lg:col-span-2 fade-in-up" style={{ animationDelay: "150ms" }}>
              <div className="space-y-6">
                <div className="rounded-2xl border border-zinc-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-soft">
                  <AnimatedCounter target={stats.prices} suffix="+" />
                  <p className="mt-1 text-sm text-zinc-500">precios verificados</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-zinc-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-soft">
                    <AnimatedCounter target={stats.sources} />
                    <p className="mt-1 text-sm text-zinc-500">fuentes de datos</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-soft">
                    <AnimatedCounter target={stats.cities} />
                    <p className="mt-1 text-sm text-zinc-500">ciudades</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Source Ticker ── */}
      <section className="bg-zinc-50 border-y border-zinc-100">
        <SourceTicker
          sources={[
            "Sanitas",
            "Adeslas",
            "Cigna",
            "Vitaldent",
            "Caser",
            "Generali",
            "AXA",
            "Mapfre",
          ]}
        />
      </section>

      {/* ── Popular Treatments ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance">
            Tratamientos más consultados
          </h2>
          <p className="mt-3 text-zinc-500 text-pretty">
            Rango de precios actualizado con datos de {stats.sources} fuentes
            verificadas.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topTreatments.map((t) => (
            <Link
              key={t.treatmentSlug}
              href={`/tratamientos/${t.treatmentSlug}`}
              className="group rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-soft hover:shadow-elevated hover:border-zinc-300/60 transition-all duration-200 press-scale"
            >
              <p className="text-sm font-medium text-zinc-500 group-hover:text-zinc-700 transition-colors">
                {t.treatmentName}
              </p>
              <p className="mt-2 text-3xl font-bold text-zinc-900 tabular-nums">
                {formatPrice(Math.round(Number(t.avg)))}
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">precio medio</p>
              <div className="mt-4">
                <PriceRangeBar
                  min={Number(t.min)}
                  max={Number(t.max)}
                  avg={Math.round(Number(t.avg))}
                  size="sm"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-primary-600 tabular-nums">
                  {formatPrice(Number(t.min))}
                </span>
                <span className="text-zinc-400">
                  {Number(t.count)} fuentes
                </span>
                <span className="text-zinc-500 tabular-nums">
                  {formatPrice(Number(t.max))}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/tratamientos"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-all press-scale"
          >
            Ver los {treatmentsWithPrices.length} tratamientos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Insurance Savings ── */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
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
                const savings = Math.round(
                  ((item.without - item.with) / item.without) * 100
                );
                return (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-zinc-200/60 bg-white p-5 shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-zinc-500">
                        {item.name}
                      </p>
                      <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                        -{savings}%
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-3">
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

      {/* ── Cities ── */}
      <section className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Precios por ciudad
              </h2>
              <p className="mt-2 text-zinc-500">
                Los precios varían según la zona geográfica. Las ciudades de Zona
                A suelen ser más baratas.
              </p>
            </div>
            <Link
              href="/ciudades"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Ver las {cities.length} ciudades
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
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
                  <p className="text-xs text-zinc-400">{city.community}</p>
                </div>
                <span
                  className={`ml-auto shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold ${
                    city.zone === "A"
                      ? "bg-primary-50 text-primary-700"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
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

      {/* ── CTA (dark) ── */}
      <section className="border-t border-zinc-100">
        <div className="bg-zinc-900 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800" />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl text-balance">
                ¿Has ido al dentista recientemente?
              </h2>
              <p className="mt-4 text-zinc-400 text-pretty leading-relaxed">
                Comparte tu precio de forma anónima y ayuda a miles de pacientes
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/reportar-precio"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors press-scale"
                >
                  Reportar mi precio
                </Link>
                <Link
                  href="/comparar"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-600 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors press-scale"
                >
                  Comparar tratamientos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
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
