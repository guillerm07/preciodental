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
  getNationalPriceRange,
  getPricesByTreatment,
  getAllTreatments,
  getAllCities,
} from "@/lib/data/queries";
import { generateTreatmentMetadata } from "@/lib/seo/metadata";
import { formatPrice, formatPriceRange } from "@/lib/utils/format";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const treatments = await getAllTreatments();
  return treatments.map((t) => ({ slug: t.slug }));
}

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

  const [priceRange, allPrices, cities] = await Promise.all([
    getNationalPriceRange(treatment.id),
    getPricesByTreatment(treatment.id),
    getAllCities(),
  ]);

  const sourceData = allPrices.map((p) => ({
    sourceName: p.sourceName,
    sourceType: p.sourceType,
    priceMin: p.priceMin ? Number(p.priceMin) : null,
    priceMax: p.priceMax ? Number(p.priceMax) : null,
    priceExact: p.priceExact ? Number(p.priceExact) : null,
    zone: p.zone,
  }));

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
      answer: `Sí, con un seguro dental los precios pueden ser entre un 30% y un 50% más baratos. Las aseguradoras tienen baremos de precios máximos que las clínicas de su red deben respetar.`,
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

      <h1 className="text-3xl font-bold text-gray-900">
        Precio de {treatment.name.toLowerCase()} en España (2026)
      </h1>

      {treatment.description && (
        <p className="mt-2 text-gray-600">{treatment.description}</p>
      )}

      {/* Price summary */}
      {priceRange && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="text-center border-accent-200 bg-accent-50">
            <p className="text-sm font-medium text-accent-700">Precio mínimo</p>
            <p className="mt-1 text-3xl font-bold text-accent-600">
              {formatPrice(priceRange.min)}
            </p>
          </Card>
          <Card className="text-center border-primary-200 bg-primary-50">
            <p className="text-sm font-medium text-primary-700">Precio medio</p>
            <p className="mt-1 text-3xl font-bold text-primary-600">
              {formatPrice(priceRange.avg)}
            </p>
          </Card>
          <Card className="text-center">
            <p className="text-sm font-medium text-gray-500">Precio máximo</p>
            <p className="mt-1 text-3xl font-bold text-gray-700">
              {formatPrice(priceRange.max)}
            </p>
          </Card>
        </div>
      )}

      {/* Chart */}
      {chartData.length > 1 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">
            Comparativa de precios por fuente
          </h2>
          <Card className="mt-4">
            <PriceChart data={chartData} />
          </Card>
        </section>
      )}

      {/* Source table */}
      {sourceData.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">
            Desglose de precios
          </h2>
          <Card className="mt-4" padding="sm">
            <PriceComparison prices={sourceData} />
          </Card>
        </section>
      )}

      {/* Cities */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Precios de {treatment.name.toLowerCase()} por ciudad
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {cities.slice(0, 16).map((city) => (
            <Link
              key={city.slug}
              href={`/tratamientos/${treatment.slug}/${city.slug}`}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all"
            >
              {treatment.name} en {city.name}
            </Link>
          ))}
        </div>
        {cities.length > 16 && (
          <p className="mt-3 text-sm text-gray-500">
            Y {cities.length - 16} ciudades más...
          </p>
        )}
      </section>

      {/* FAQ */}
      <FAQSection items={faqItems} className="mt-10" />

      {/* Disclaimer */}
      <p className="mt-10 text-xs text-gray-400 leading-relaxed">
        Los precios mostrados son orientativos y están basados en datos públicos
        de aseguradoras, cadenas dentales y clínicas. El precio final depende
        del diagnóstico individualizado del profesional. Última actualización: marzo
        2026.
      </p>
    </div>
  );
}
