import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceComparison } from "@/components/PriceComparison";
import { PriceChart } from "@/components/PriceChart";
import { FAQSection } from "@/components/FAQSection";
import { Card } from "@/components/ui/Card";
import {
  getTreatmentBySlug,
  getCityBySlug,
  getNationalPriceRange,
  getCityPriceRange,
  getPricesByTreatmentAndCity,
  getAllTreatments,
  getAllCities,
} from "@/lib/data/queries";
import { generateTreatmentCityMetadata } from "@/lib/seo/metadata";
import { formatPrice, formatPercent } from "@/lib/utils/format";

interface Props {
  params: Promise<{ slug: string; ciudad: string }>;
}

export async function generateStaticParams() {
  const [treatments, cities] = await Promise.all([
    getAllTreatments(),
    getAllCities(),
  ]);
  return treatments.flatMap((t) =>
    cities.map((c) => ({ slug: t.slug, ciudad: c.slug }))
  );
}

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

  const [cityPriceRange, nationalPriceRange, cityPrices] = await Promise.all([
    getCityPriceRange(treatment.id, city.id),
    getNationalPriceRange(treatment.id),
    getPricesByTreatmentAndCity(treatment.id, city.id),
  ]);

  const sourceData = cityPrices.map((p) => ({
    sourceName: p.sourceName,
    sourceType: p.sourceType,
    priceMin: p.priceMin ? Number(p.priceMin) : null,
    priceMax: p.priceMax ? Number(p.priceMax) : null,
    priceExact: p.priceExact ? Number(p.priceExact) : null,
    zone: p.zone,
  }));

  const differencePercent =
    cityPriceRange && nationalPriceRange && nationalPriceRange.avg > 0
      ? ((cityPriceRange.avg - nationalPriceRange.avg) / nationalPriceRange.avg) * 100
      : null;

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
            ? `${city.name} es un ${Math.abs(Math.round(differencePercent))}% más cara que la media nacional para este tratamiento.`
            : `${city.name} es un ${Math.abs(Math.round(differencePercent))}% más barata que la media nacional para este tratamiento.`
          : `Compara los precios en ${city.name} con la media nacional en esta página.`,
    },
    {
      question: `¿Qué aseguradora es más barata para ${treatment.name.toLowerCase()} en ${city.name}?`,
      answer: `Los precios de las aseguradoras dependen de la zona geográfica (${city.name} está en Zona ${city.zone || "B"}). Consulta la tabla comparativa en esta página.`,
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
          { label: city.name, href: `/tratamientos/${treatment.slug}/${city.slug}` },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">
        Precio de {treatment.name.toLowerCase()} en {city.name} (2026)
      </h1>

      {/* Price summary */}
      {cityPriceRange && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="text-center border-accent-200 bg-accent-50">
            <p className="text-sm font-medium text-accent-700">Mínimo</p>
            <p className="mt-1 text-3xl font-bold text-accent-600">
              {formatPrice(cityPriceRange.min)}
            </p>
          </Card>
          <Card className="text-center border-primary-200 bg-primary-50">
            <p className="text-sm font-medium text-primary-700">Media</p>
            <p className="mt-1 text-3xl font-bold text-primary-600">
              {formatPrice(cityPriceRange.avg)}
            </p>
          </Card>
          <Card className="text-center">
            <p className="text-sm font-medium text-gray-500">Máximo</p>
            <p className="mt-1 text-3xl font-bold text-gray-700">
              {formatPrice(cityPriceRange.max)}
            </p>
          </Card>
        </div>
      )}

      {/* National comparison */}
      {differencePercent != null && nationalPriceRange && (
        <Card className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Comparativa con media nacional
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {city.name}: {formatPrice(cityPriceRange!.avg)} vs España:{" "}
                {formatPrice(nationalPriceRange.avg)}
              </p>
            </div>
            <div
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                differencePercent < 0
                  ? "bg-green-100 text-green-700"
                  : differencePercent > 0
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {formatPercent(differencePercent)}
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {differencePercent < 0
              ? `${treatment.name} en ${city.name} es un ${Math.abs(Math.round(differencePercent))}% más barato que la media nacional.`
              : differencePercent > 0
              ? `${treatment.name} en ${city.name} es un ${Math.round(differencePercent)}% más caro que la media nacional.`
              : `${treatment.name} en ${city.name} está en la media nacional.`}
          </p>
        </Card>
      )}

      {/* Source table */}
      {sourceData.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">
            Precios por fuente en {city.name}
          </h2>
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
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/tratamientos/${treatment.slug}`}
            className="rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors"
          >
            Media nacional
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
