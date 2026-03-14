import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceRangeBar } from "@/components/PriceRangeBar";
import { PriceComparison } from "@/components/PriceComparison";
import { InsuranceComparison } from "@/components/InsuranceComparison";
import { FAQSection } from "@/components/FAQSection";
import { Card } from "@/components/ui/Card";
import {
  getTreatmentBySlug,
  getCityBySlug,
  getNationalPriceRange,
  getCityPriceRange,
  getPricesByTreatmentAndCity,
  getAllCities,
} from "@/lib/data/queries";
import { generateTreatmentCityMetadata } from "@/lib/seo/metadata";
import { formatPrice, formatPercent } from "@/lib/utils/format";

interface Props {
  params: Promise<{ slug: string; ciudad: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, ciudad } = await params;
  const [treatment, city] = await Promise.all([
    getTreatmentBySlug(slug),
    getCityBySlug(ciudad),
  ]);
  if (!treatment || !city) return {};
  const priceRange = await getCityPriceRange(treatment.id, city.id);
  return generateTreatmentCityMetadata(
    treatment.name,
    treatment.slug,
    city.name,
    city.slug,
    priceRange?.min,
    priceRange?.max
  );
}

export default async function TreatmentCityPage({ params }: Props) {
  const { slug, ciudad } = await params;
  const [treatment, city] = await Promise.all([
    getTreatmentBySlug(slug),
    getCityBySlug(ciudad),
  ]);
  if (!treatment || !city) notFound();

  const [cityPriceRange, nationalPriceRange, cityPrices, allCities] =
    await Promise.all([
      getCityPriceRange(treatment.id, city.id),
      getNationalPriceRange(treatment.id),
      getPricesByTreatmentAndCity(treatment.id, city.id),
      getAllCities(),
    ]);

  const sourceData = cityPrices.map((p) => ({
    sourceName: p.sourceName,
    sourceType: p.sourceType,
    priceMin: p.priceMin ? Number(p.priceMin) : null,
    priceMax: p.priceMax ? Number(p.priceMax) : null,
    priceExact: p.priceExact ? Number(p.priceExact) : null,
    zone: p.zone,
  }));

  // Insurance vs non-insurance
  const insuranceData = sourceData.filter((s) => s.sourceType === "insurance_pdf");
  const nonInsuranceData = sourceData.filter((s) => s.sourceType !== "insurance_pdf");

  const insuranceRange =
    insuranceData.length > 0
      ? {
          min: Math.min(...insuranceData.map((s) => s.priceExact ?? s.priceMin ?? Infinity)),
          max: Math.max(...insuranceData.map((s) => s.priceExact ?? s.priceMax ?? 0)),
        }
      : null;

  const nonInsuranceRange =
    nonInsuranceData.length > 0
      ? {
          min: Math.min(...nonInsuranceData.map((s) => s.priceExact ?? s.priceMin ?? Infinity)),
          max: Math.max(...nonInsuranceData.map((s) => s.priceExact ?? s.priceMax ?? 0)),
        }
      : null;

  const differencePercent =
    cityPriceRange && nationalPriceRange && nationalPriceRange.avg > 0
      ? ((cityPriceRange.avg - nationalPriceRange.avg) / nationalPriceRange.avg) * 100
      : null;

  // Other cities for navigation (exclude current, show top 8)
  const otherCities = allCities.filter((c) => c.slug !== city.slug).slice(0, 8);

  const faqItems = [
    {
      question: `¿Cuánto cuesta ${treatment.name.toLowerCase()} en ${city.name}?`,
      answer: cityPriceRange
        ? `El precio de ${treatment.name.toLowerCase()} en ${city.name} varía entre ${formatPrice(cityPriceRange.min)} y ${formatPrice(cityPriceRange.max)}, con una media de ${formatPrice(cityPriceRange.avg)}.`
        : `Consulta esta página para los precios más actualizados de ${treatment.name.toLowerCase()} en ${city.name}.`,
    },
    {
      question: `¿${city.name} es más cara o más barata que la media nacional?`,
      answer:
        differencePercent != null
          ? differencePercent > 0
            ? `${city.name} es un ${Math.abs(Math.round(differencePercent))}% más cara que la media nacional para ${treatment.name.toLowerCase()}.`
            : `${city.name} es un ${Math.abs(Math.round(differencePercent))}% más barata que la media nacional para ${treatment.name.toLowerCase()}.`
          : `Compara los precios en ${city.name} con la media nacional en esta página.`,
    },
    {
      question: `¿Qué aseguradora es más barata para ${treatment.name.toLowerCase()} en ${city.name}?`,
      answer: `Los precios de las aseguradoras dependen de la zona geográfica. ${city.name} pertenece a la Zona ${city.zone || "B"} (${city.community}). Consulta la tabla comparativa en esta página para ver qué aseguradora ofrece mejor precio.`,
    },
    {
      question: `¿Merece la pena un seguro dental para ${treatment.name.toLowerCase()}?`,
      answer:
        insuranceRange && nonInsuranceRange
          ? `Con seguro dental, ${treatment.name.toLowerCase()} en ${city.name} puede costar entre ${formatPrice(insuranceRange.min)}-${formatPrice(insuranceRange.max)}, frente a ${formatPrice(nonInsuranceRange.min)}-${formatPrice(nonInsuranceRange.max)} sin seguro. Calcula si el ahorro compensa la prima mensual.`
          : `Un seguro dental puede reducir el coste entre un 30-50%. Compara precios con y sin seguro para decidir.`,
    },
  ];

  const jsonLd = cityPriceRange
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${treatment.name} en ${city.name}`,
        description: `Precio de ${treatment.name.toLowerCase()} en ${city.name}`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: cityPriceRange.min,
          highPrice: cityPriceRange.max,
          offerCount: cityPriceRange.count,
          areaServed: {
            "@type": "City",
            name: city.name,
          },
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
          {
            label: city.name,
            href: `/tratamientos/${treatment.slug}/${city.slug}`,
          },
        ]}
      />

      {/* Header with price answer */}
      <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              Zona {city.zone}
            </span>
            <span className="text-sm text-gray-500">
              {city.province}, {city.community}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {treatment.name} en {city.name}
            <span className="block text-lg font-normal text-gray-500 mt-1">
              Precios actualizados 2026
            </span>
          </h1>
        </div>

        {cityPriceRange && (
          <div className="shrink-0 rounded-2xl border-2 border-primary-200 bg-primary-50 p-6 text-center lg:min-w-[260px]">
            <p className="text-sm font-medium text-primary-700">Precio medio en {city.name}</p>
            <p className="mt-1 text-4xl font-extrabold text-primary-600">
              {formatPrice(cityPriceRange.avg)}
            </p>
            <p className="mt-1 text-sm text-primary-500">
              {formatPrice(cityPriceRange.min)} — {formatPrice(cityPriceRange.max)}
            </p>
            {differencePercent != null && (
              <div
                className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                  differencePercent < 0
                    ? "bg-green-100 text-green-700"
                    : differencePercent > 0
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {differencePercent < 0 ? "↓" : differencePercent > 0 ? "↑" : "="}
                {formatPercent(differencePercent)} vs media nacional
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visual price range with national overlay */}
      {cityPriceRange && (
        <div className="mt-8">
          <PriceRangeBar
            min={cityPriceRange.min}
            max={cityPriceRange.max}
            avg={cityPriceRange.avg}
            highlightValue={nationalPriceRange?.avg}
            highlightLabel={`Media España: ${nationalPriceRange ? formatPrice(nationalPriceRange.avg) : ""}`}
            size="lg"
          />
        </div>
      )}

      {/* National comparison card */}
      {differencePercent != null && nationalPriceRange && cityPriceRange && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card className="border-primary-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                <span className="text-lg font-bold text-primary-600">{city.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">{city.name}</p>
                <p className="text-2xl font-extrabold text-gray-900">
                  {formatPrice(cityPriceRange.avg)}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <span className="text-lg">🇪🇸</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Media nacional</p>
                <p className="text-2xl font-extrabold text-gray-900">
                  {formatPrice(nationalPriceRange.avg)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Insurance comparison */}
      {insuranceRange && nonInsuranceRange && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">
            ¿Cuánto ahorras con seguro dental en {city.name}?
          </h2>
          <div className="mt-4">
            <InsuranceComparison
              withoutInsurance={nonInsuranceRange}
              withInsurance={insuranceRange}
            />
          </div>
        </section>
      )}

      {/* Source table */}
      {sourceData.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">
            Precios por fuente en {city.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Datos de aseguradoras, cadenas y clínicas en Zona {city.zone}
          </p>
          <Card className="mt-4" padding="sm">
            <PriceComparison prices={sourceData} />
          </Card>
        </section>
      )}

      {/* Other cities */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          {treatment.name} en otras ciudades
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          <Link
            href={`/tratamientos/${treatment.slug}`}
            className="flex items-center gap-2 rounded-lg border-2 border-primary-200 bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-100 transition-colors"
          >
            🇪🇸 Media nacional
          </Link>
          {otherCities.map((c) => (
            <Link
              key={c.slug}
              href={`/tratamientos/${treatment.slug}/${c.slug}`}
              className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all"
            >
              {c.name}
              <span className="ml-1 text-xs text-gray-400">Z.{c.zone}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              ¿Te han hecho {treatment.name.toLowerCase()} en {city.name}?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Comparte tu precio y ayuda a otros pacientes de {city.name}.
            </p>
          </div>
          <Link
            href="/reportar-precio"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Reportar precio
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqItems} className="mt-10" />

      {/* Disclaimer */}
      <p className="mt-10 text-xs text-gray-400 leading-relaxed">
        Los precios mostrados son orientativos. {city.name} pertenece a la
        Zona {city.zone || "B"} de aseguradoras ({city.community}). Última
        actualización: marzo 2026.
      </p>
    </div>
  );
}
