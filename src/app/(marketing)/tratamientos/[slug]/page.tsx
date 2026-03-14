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

  // Top cities for linking
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Tratamientos", href: "/tratamientos" },
          { label: treatment.name, href: `/tratamientos/${treatment.slug}` },
        ]}
      />

      {/* Hero section */}
      <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="lg:max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            {TREATMENT_CATEGORY_LABELS[treatment.category as TreatmentCategory]}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 text-balance sm:text-4xl">
            {treatment.name}
            <span className="text-zinc-400 text-2xl font-normal ml-2">
              — Precio en España 2026
            </span>
          </h1>
          {treatment.description && (
            <p className="mt-3 text-lg text-zinc-500 text-pretty leading-relaxed">
              {treatment.description}
            </p>
          )}
        </div>

        {/* Quick price answer */}
        {priceRange && (
          <div className="shrink-0 rounded-2xl border-2 border-primary-200 bg-primary-50 p-6 text-center shadow-glow-primary lg:min-w-[260px]">
            <p className="text-sm font-medium text-primary-700">Precio medio nacional</p>
            <p className="mt-1 text-4xl font-extrabold text-primary-600 tabular-nums">
              {formatPrice(priceRange.avg)}
            </p>
            <p className="mt-1 text-sm text-primary-500 tabular-nums">
              {formatPrice(priceRange.min)} — {formatPrice(priceRange.max)}
            </p>
            <p className="mt-2 text-xs text-primary-400 tabular-nums">
              Basado en {priceRange.count} fuentes
            </p>
          </div>
        )}
      </div>

      {/* Visual price range */}
      {priceRange && (
        <div className="mt-8">
          <PriceRangeBar
            min={priceRange.min}
            max={priceRange.max}
            avg={priceRange.avg}
            size="lg"
          />
        </div>
      )}

      {/* Rich treatment content */}
      {(() => {
        const content = TREATMENT_CONTENT[treatment.slug];
        if (!content) return null;
        return (
          <>
            {/* Long description */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-zinc-900 text-balance">
                ¿Qué es {treatment.name.toLowerCase()}?
              </h2>
              <div className="mt-3 text-zinc-600 leading-relaxed text-pretty space-y-3">
                {content.longDescription.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* What's included / excluded */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-green-200/60 bg-green-50/50 p-5">
                <h3 className="font-semibold text-zinc-900">Qué incluye el precio</h3>
                <ul className="mt-3 space-y-2">
                  {content.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-red-200/60 bg-red-50/50 p-5">
                <h3 className="font-semibold text-zinc-900">Qué NO suele incluir</h3>
                <ul className="mt-3 space-y-2">
                  {content.excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* All-inclusive advice */}
            {content.allInclusiveTip && (
              <div className="mt-6">
                <AllInclusiveCallout
                  treatmentName={treatment.name}
                  shouldInclude={content.allInclusiveTip.shouldInclude}
                  potentialSavings={content.allInclusiveTip.potentialSavings}
                />
              </div>
            )}

            {/* Duration and recovery */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Duración</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{content.duration}</p>
              </div>
              <div className="rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Recuperación</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{content.recovery}</p>
              </div>
            </div>

            {/* Factors affecting price */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-zinc-900 text-balance">
                Factores que afectan al precio
              </h2>
              <p className="mt-2 text-sm text-zinc-400 text-pretty">
                El precio final de {treatment.name.toLowerCase()} puede variar según estos factores
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {content.factorsAffectingPrice.map((factor, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-zinc-200/60 bg-white px-4 py-3 shadow-soft">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-400">
                      {i + 1}
                    </span>
                    <span className="text-sm text-zinc-700 text-pretty">{factor}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        );
      })()}

      {/* Insurance comparison */}
      {insuranceRange && nonInsuranceRange && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            ¿Cuánto ahorras con seguro dental?
          </h2>
          <p className="mt-1 text-sm text-zinc-400 text-pretty">
            Comparativa de precios con y sin seguro dental para {treatment.name.toLowerCase()}
          </p>
          <div className="mt-4">
            <InsuranceComparison
              withoutInsurance={nonInsuranceRange}
              withInsurance={insuranceRange}
            />
          </div>
          <p className="mt-3 text-xs text-zinc-400 text-pretty">
            Precios de aseguradoras: {insuranceData.map((d) => d.sourceName).filter((v, i, a) => a.indexOf(v) === i).join(", ")}
          </p>
        </section>
      )}

      {/* Chart */}
      {chartData.length > 1 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Comparativa de precios por fuente
          </h2>
          <Card className="mt-4 rounded-2xl border-zinc-200/60 shadow-soft">
            <PriceChart data={chartData} />
          </Card>
        </section>
      )}

      {/* Source table */}
      {sourceData.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Desglose de precios de {treatment.name.toLowerCase()}
          </h2>
          <p className="mt-1 text-sm text-zinc-400 text-pretty">
            Todos los datos son públicos y verificables
          </p>
          <Card className="mt-4 rounded-2xl border-zinc-200/60 shadow-soft" padding="sm">
            <PriceComparison prices={sourceData} />
          </Card>
        </section>
      )}

      {/* Cities section — rich links */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900 text-balance">
          Precios de {treatment.name.toLowerCase()} por ciudad
        </h2>
        <p className="mt-1 text-sm text-zinc-400 text-pretty">
          Selecciona tu ciudad para ver precios locales
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/tratamientos/${treatment.slug}/${city.slug}`}
              className="press-scale group flex items-center gap-3 rounded-2xl border border-zinc-200/60 px-4 py-3 shadow-soft hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-sm font-bold text-zinc-500 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                {city.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-700 group-hover:text-primary-700 transition-colors truncate">
                  {city.name}
                </p>
                <p className="text-xs text-zinc-400">Zona {city.zone}</p>
              </div>
            </Link>
          ))}
        </div>
        {cities.length > 12 && (
          <p className="mt-3 text-sm text-zinc-400 text-pretty">
            Y {cities.length - 12} ciudades más disponibles.
          </p>
        )}
      </section>

      {/* Related treatments */}
      {relatedTreatments.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Tratamientos relacionados
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {relatedTreatments.map((t) => (
              <Link
                key={t.slug}
                href={`/tratamientos/${t.slug}`}
                className="press-scale rounded-full border border-zinc-200/60 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100 p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">
              ¿Cuánto pagaste por {treatment.name.toLowerCase()}?
            </h3>
            <p className="mt-1 text-sm text-zinc-500 text-pretty">
              Comparte tu precio de forma anónima y ayuda a otros pacientes.
            </p>
          </div>
          <Link
            href="/reportar-precio"
            className="press-scale shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Reportar precio
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqItems} className="mt-10" />

      {/* Disclaimer */}
      <p className="mt-10 text-xs text-zinc-400 text-pretty leading-relaxed">
        Los precios mostrados son orientativos y están basados en datos públicos
        de aseguradoras, cadenas dentales y clínicas. El precio final depende
        del diagnóstico individualizado del profesional. Última actualización: marzo
        2026.
      </p>
    </div>
  );
}
