import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceRangeBar } from "@/components/PriceRangeBar";
import { PriceComparison } from "@/components/PriceComparison";
import { PriceChart } from "@/components/PriceChart";
import { InsuranceComparison } from "@/components/InsuranceComparison";
import { FAQSection } from "@/components/FAQSection";
import { Card } from "@/components/ui/Card";
import {
  getTreatmentBySlug,
  getNationalPriceRange,
  getPricesByTreatment,
  getAllTreatments,
  getAllCities,
  getInsurancePricesForTreatment,
} from "@/lib/data/queries";
import { generateTreatmentMetadata } from "@/lib/seo/metadata";
import { formatPrice } from "@/lib/utils/format";
import { TREATMENT_CATEGORY_LABELS, type TreatmentCategory } from "@/types";
import { TREATMENT_CONTENT } from "@/lib/data/treatment-content";
import { AllInclusiveCallout } from "@/components/AllInclusiveCallout";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) return {};
  return generateTreatmentMetadata(treatment.name, treatment.slug);
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const [priceRange, allPrices, cities, allTreatments, insurancePrices] =
    await Promise.all([
      getNationalPriceRange(treatment.id),
      getPricesByTreatment(treatment.id),
      getAllCities(),
      getAllTreatments(),
      getInsurancePricesForTreatment(treatment.id),
    ]);

  const sourceData = allPrices.map((p) => ({
    sourceName: p.sourceName,
    sourceType: p.sourceType,
    priceMin: p.priceMin ? Number(p.priceMin) : null,
    priceMax: p.priceMax ? Number(p.priceMax) : null,
    priceExact: p.priceExact ? Number(p.priceExact) : null,
    zone: p.zone,
  }));

  // Insurance vs non-insurance data
  const insuranceData = sourceData.filter((s) => s.sourceType === "insurance_pdf");
  const nonInsuranceData = sourceData.filter((s) => s.sourceType !== "insurance_pdf");

  const insuranceRange =
    insuranceData.length > 0
      ? {
          min: Math.min(
            ...insuranceData.map((s) => s.priceExact ?? s.priceMin ?? Infinity)
          ),
          max: Math.max(
            ...insuranceData.map((s) => s.priceExact ?? s.priceMax ?? 0)
          ),
        }
      : null;

  const nonInsuranceRange =
    nonInsuranceData.length > 0
      ? {
          min: Math.min(
            ...nonInsuranceData.map((s) => s.priceExact ?? s.priceMin ?? Infinity)
          ),
          max: Math.max(
            ...nonInsuranceData.map((s) => s.priceExact ?? s.priceMax ?? 0)
          ),
        }
      : null;

  const uniqueSources = [...new Set(sourceData.map((s) => s.sourceName))];
  const chartData = uniqueSources.map((name) => {
    const sourcePrices = sourceData.filter((s) => s.sourceName === name);
    const mins = sourcePrices.map((s) => s.priceExact ?? s.priceMin ?? 0);
    const maxs = sourcePrices.map((s) => s.priceExact ?? s.priceMax ?? 0);
    return {
      name: name.length > 15 ? name.slice(0, 15) + "..." : name,
      min: Math.min(...mins),
      max: Math.max(...maxs),
      avg: Math.round((Math.min(...mins) + Math.max(...maxs)) / 2),
    };
  });

  // Related treatments from same category
  const relatedTreatments = allTreatments
    .filter((t) => t.category === treatment.category && t.slug !== treatment.slug)
    .slice(0, 4);

  const topCities = cities.slice(0, 12);

  const faqItems = [
    {
      question: `¿Cuánto cuesta ${treatment.name.toLowerCase()} en España?`,
      answer: priceRange
        ? `El precio de ${treatment.name.toLowerCase()} en España varía entre ${formatPrice(priceRange.min)} y ${formatPrice(priceRange.max)}, con una media de ${formatPrice(priceRange.avg)}. Los precios varían según la ciudad, la clínica y si se tiene seguro dental.`
        : `Los precios de ${treatment.name.toLowerCase()} varían según la ciudad y la clínica. Consulta los precios actualizados en esta página.`,
    },
    {
      question: `¿Qué incluye el precio de ${treatment.name.toLowerCase()}?`,
      answer: `El precio suele incluir la consulta de diagnóstico, el tratamiento en sí y las revisiones posteriores. Sin embargo, cada clínica puede incluir diferentes conceptos. Es importante pedir un presupuesto detallado por escrito.`,
    },
    {
      question: `¿Es más barato con seguro dental?`,
      answer:
        insuranceRange && nonInsuranceRange
          ? `Sí. Con seguro dental, ${treatment.name.toLowerCase()} puede costar entre ${formatPrice(insuranceRange.min)} y ${formatPrice(insuranceRange.max)}, frente a ${formatPrice(nonInsuranceRange.min)}-${formatPrice(nonInsuranceRange.max)} sin seguro. Las aseguradoras negocian precios máximos con sus clínicas.`
          : `Sí, con un seguro dental los precios pueden ser entre un 30% y un 50% más baratos. Las aseguradoras tienen baremos de precios máximos que las clínicas de su red deben respetar.`,
    },
    {
      question: `¿Dónde es más barato ${treatment.name.toLowerCase()}?`,
      answer: `Los precios dentales varían por zona geográfica. Las ciudades de Zona A (Andalucía, Canarias, Extremadura, Castilla-La Mancha, Murcia) suelen tener tarifas más bajas. Madrid, Barcelona y País Vasco (Zona B) tienden a ser más caras.`,
    },
  ];

  const jsonLd = priceRange
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: treatment.name,
        description: treatment.description,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: priceRange.min,
          highPrice: priceRange.max,
          offerCount: priceRange.count,
        },
      }
    : null;

  return (
    <div className="bg-accent-50/50 min-h-screen">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* ── Immersive Header ── */}
      <section className="relative overflow-hidden bg-white border-b border-accent-200">
        <div className="absolute top-0 right-0 p-32 opacity-30 blur-3xl rounded-full bg-gradient-to-br from-primary-200 to-teal-100 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-32 opacity-20 blur-3xl rounded-full bg-gradient-to-tr from-accent-200 to-primary-100 mix-blend-multiply pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-16 sm:mt-24">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Tratamientos", href: "/tratamientos" },
              { label: treatment.name, href: `/tratamientos/${treatment.slug}` },
            ]}
          />

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-3xl fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 mb-6 text-xs font-bold uppercase tracking-wider text-primary-700">
                {TREATMENT_CATEGORY_LABELS[treatment.category as TreatmentCategory]}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-accent-950 text-balance sm:text-5xl lg:text-6xl" style={{ lineHeight: "1.1" }}>
                {treatment.name}
              </h1>
              <p className="mt-4 text-xl text-accent-500 font-medium">
                Lista de precios transparentes en España <span className="px-2 py-0.5 rounded-md bg-accent-100 text-accent-600 text-sm ml-2">2026</span>
              </p>
              {treatment.description && (
                <p className="mt-6 text-lg text-accent-600 text-pretty leading-relaxed">
                  {treatment.description}
                </p>
              )}
            </div>

            {/* Quick price answer - Glow Card */}
            {priceRange && (
              <div className="shrink-0 relative fade-in-up" style={{ animationDelay: "150ms" }}>
                <div className="absolute -inset-0.5 rounded-[32px] bg-gradient-to-br from-primary-400 to-teal-600 opacity-20 blur-xl animate-pulse" />
                <div className="relative rounded-3xl border border-primary-100 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl lg:min-w-[320px]">
                  <p className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary-600 mb-4">
                    Precio Medio Nacional
                  </p>
                  <p className="text-6xl font-extrabold text-accent-950 tabular-nums">
                    {formatPrice(priceRange.avg)}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-sm font-medium border-t border-accent-100 pt-4">
                    <div className="text-left">
                      <p className="text-accent-400 uppercase tracking-widest text-[10px]">Mínimo</p>
                      <p className="text-primary-600">{formatPrice(priceRange.min)}</p>
                    </div>
                    <div className="w-px h-8 bg-accent-200 mx-4" />
                    <div className="text-right">
                      <p className="text-accent-400 uppercase tracking-widest text-[10px]">Máximo</p>
                      <p className="text-accent-700">{formatPrice(priceRange.max)}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-xs font-semibold text-accent-400 uppercase tracking-wider bg-accent-50 py-1.5 rounded-lg inline-block px-4">
                    Extraído de {priceRange.count} fuentes
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Visual price range */}
          {priceRange && (
            <div className="mt-14 fade-in-up" style={{ animationDelay: "300ms" }}>
              <PriceRangeBar
                min={priceRange.min}
                max={priceRange.max}
                avg={priceRange.avg}
                size="lg"
              />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Rich treatment content */}
        {(() => {
          const content = TREATMENT_CONTENT[treatment.slug];
          if (!content) return null;
          return (
            <div className="space-y-16">
              {/* Long description */}
              <section className="bg-white rounded-3xl border border-accent-200 p-8 sm:p-12 shadow-sm">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-extrabold text-accent-950 text-balance flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    ¿Qué es {treatment.name.toLowerCase()}?
                  </h2>
                  <div className="mt-8 prose prose-lg prose-slate max-w-none prose-p:text-accent-600 prose-p:leading-relaxed">
                    {content.longDescription.split("\n\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </section>

              {/* Bento Box: What's included / excluded / factors / recovery */}
              <section>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  
                  {/* Includes Panel */}
                  <div className="lg:col-span-1 rounded-3xl border border-primary-200 bg-primary-50/50 p-6 sm:p-8 hover:bg-primary-50 transition-colors">
                    <div className="flex items-center gap-2 mb-6 text-primary-700">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-primary-100 text-primary-500">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h3 className="text-xl font-bold">Generalmente Incluye</h3>
                    </div>
                    <ul className="space-y-4">
                      {content.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-accent-700 bg-white/60 p-3 rounded-xl border border-primary-100/50 backdrop-blur-sm shadow-sm">
                          <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                          <span className="text-pretty">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excludes Panel */}
                  <div className="lg:col-span-1 border border-accent-200 bg-white/50 p-6 sm:p-8 rounded-3xl hover:bg-white transition-colors">
                    <div className="flex items-center gap-2 mb-6 text-red-600">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-red-100 text-red-400">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h3 className="text-xl font-bold">Ojo: NO suele incluir</h3>
                    </div>
                    <ul className="space-y-4">
                      {content.excludes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-accent-700 bg-red-50/30 p-3 rounded-xl border border-red-100/30 backdrop-blur-sm">
                          <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                          <span className="text-pretty">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics & Factors */}
                  <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl border border-accent-200 p-6 shadow-sm flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-accent-50 flex items-center justify-center border border-accent-100 text-accent-400 shrink-0">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-accent-400">Duración Est.</p>
                        <p className="mt-1 text-base font-semibold text-accent-950">{content.duration}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-3xl border border-accent-200 p-6 shadow-sm flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-accent-50 flex items-center justify-center border border-accent-100 text-accent-400 shrink-0">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-accent-400">Recuperación</p>
                        <p className="mt-1 text-base font-semibold text-accent-950">{content.recovery}</p>
                      </div>
                    </div>
                    
                    <div className="bg-accent-950 text-white p-6 rounded-3xl border border-accent-900 shadow-xl flex-1 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 bg-gradient-to-br from-primary-400 to-transparent blur-3xl opacity-20 w-full h-full" />
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                          <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          Factores de Precio
                        </h3>
                        <ul className="space-y-3">
                           {content.factorsAffectingPrice.map((factor, i) => (
                            <li key={i} className="flex gap-3 text-sm text-accent-200 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                              <span className="text-primary-400 font-bold opacity-50">&bull;</span>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* All-inclusive advice */}
              {content.allInclusiveTip && (
                <div className="w-full">
                  <AllInclusiveCallout
                    treatmentName={treatment.name}
                    shouldInclude={content.allInclusiveTip.shouldInclude}
                    potentialSavings={content.allInclusiveTip.potentialSavings}
                  />
                </div>
              )}
            </div>
          );
        })()}

        {/* Insurance comparison */}
        {insuranceRange && nonInsuranceRange && (
          <section className="mt-20">
            <h2 className="text-3xl font-extrabold text-accent-950 text-balance mb-2">
              El ahorro real usando Seguro Dental
            </h2>
            <p className="text-lg text-accent-500 mb-8 max-w-3xl">
              Comparativa de tarifas máximas cobradas a pacientes con aseguradoras de salud privadas frente a pacientes sin cobertura para {treatment.name.toLowerCase()}.
            </p>
            <InsuranceComparison
              withoutInsurance={nonInsuranceRange}
              withInsurance={insuranceRange}
            />
            <p className="mt-4 text-xs font-medium text-accent-400 bg-white inline-block px-4 py-2 border border-accent-200 rounded-full">
              Fuentes aseguradoras: <span className="text-accent-600">{insuranceData.map((d) => d.sourceName).filter((v, i, a) => a.indexOf(v) === i).join(" • ")}</span>
            </p>
          </section>
        )}

        {/* Source table and Chart - Side by side if valid */}
        {(sourceData.length > 0) && (
          <section className="mt-20 pt-16 border-t border-accent-200/50">
            <div className="mb-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-accent-950 text-balance">
                Desglose analítico de mercado
              </h2>
              <p className="mt-4 text-lg text-accent-500 text-pretty">
                Transparencia absoluta. Así es como se distribuyen los precios según las clínicas e instituciones que hemos monitorizado.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {sourceData.length > 0 && (
                <Card className="rounded-3xl border-accent-200 bg-white shadow-soft" padding="sm">
                  <div className="p-4 border-b border-accent-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-accent-900">Muestra de tarifas</h3>
                    <span className="text-xs font-bold px-2 py-1 bg-accent-100 text-accent-500 rounded-md">Tabla de datos</span>
                  </div>
                  <PriceComparison prices={sourceData} />
                </Card>
              )}
              {chartData.length > 1 && (
                <Card className="rounded-3xl border-accent-200 bg-white shadow-soft">
                  <div className="p-4 border-b border-accent-100 mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-accent-900">Distribución por ente clínico</h3>
                    <span className="text-xs font-bold px-2 py-1 bg-accent-100 text-accent-500 rounded-md">Gráfico comparativo</span>
                  </div>
                  <PriceChart data={chartData} />
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Cities section — rich links */}
        <section className="mt-20 pt-16 border-t border-accent-200/50">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold text-accent-950 text-balance">
                Precios por ciudad en España
              </h2>
              <p className="mt-4 text-lg text-accent-500 text-pretty">
                Filtra las tarifas de {treatment.name.toLowerCase()} según tu comunidad o provincia para ver el coste exacto en tu área geográfica.
              </p>
            </div>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/tratamientos/${treatment.slug}/${city.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-accent-200 bg-white p-5 shadow-sm hover:border-primary-400 hover:shadow-md transition-all duration-200 press-scale"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-lg font-bold text-accent-500 group-hover:bg-primary-50 group-hover:text-primary-600 border border-accent-100 transition-colors">
                    {city.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-accent-900 group-hover:text-primary-700 transition-colors truncate">
                      {city.name}
                    </p>
                    <p className="text-xs font-medium text-accent-400">Ver precios →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {cities.length > 12 && (
            <p className="mt-5 text-sm font-medium text-accent-400 text-center">
              Filtra en el buscador general para ver datos de {cities.length - 12} ciudades más.
            </p>
          )}
        </section>

        {/* CTA */}
        <section className="mt-20 relative overflow-hidden rounded-[2rem] bg-accent-950 border border-accent-900 shadow-2xl p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-mesh-gradient-dark opacity-100" />
          <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-primary-900/50 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-white sm:text-4xl text-balance">
                ¿Acabas de hacerte este tratamiento?
              </h3>
              <p className="mt-4 text-xl text-accent-300 text-pretty leading-relaxed">
                Nuestra plataforma vive de la colaboración clínica. Si has pagado por {treatment.name.toLowerCase()} recientemente, comparte el precio que te han cobrado. Es 100% anónimo.
              </p>
            </div>
            <Link
              href="/reportar-precio"
              className="press-scale shrink-0 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-accent-950 hover:bg-primary-50 hover:scale-105 transition-all shadow-[0_4px_30px_rgba(255,255,255,0.1)]"
            >
              Reportar mi Presupuesto
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection items={faqItems} className="mt-20 pt-16 border-t border-accent-200/50" />

        {/* Disclaimer */}
        <p className="mt-20 text-xs text-accent-400 text-pretty leading-relaxed bg-white border border-accent-200 p-6 rounded-2xl shadow-sm">
          Los precios mostrados son estimaciones calculadas en base a datos agregados obtenidos mediante extracción de aseguradoras, agrupaciones empresariales y reportes independientes. En ningún caso suponen una oferta vinculante comercial. La medicina odontoestomatológica depende de variables clínicas de alta complejidad (calidad del instrumental, dificultad quirúrgica, anatomía del paciente). Contacta con un profesional colegiado para obtener un diagnóstico con validez oficial.
        </p>
      </div>
    </div>
  );
}
