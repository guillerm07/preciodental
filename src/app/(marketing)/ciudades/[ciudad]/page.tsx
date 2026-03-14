import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceCard } from "@/components/PriceCard";
import { FAQSection } from "@/components/FAQSection";
import { Card } from "@/components/ui/Card";
import { getCityBySlug, getPricesByCity, getAllCities } from "@/lib/data/queries";
import { generateCityMetadata } from "@/lib/seo/metadata";
import { formatPrice, formatNumber } from "@/lib/utils/format";

interface Props {
  params: Promise<{ ciudad: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad } = await params;
  const city = await getCityBySlug(ciudad);
  if (!city) return {};
  return generateCityMetadata(city.name, city.slug);
}

export default async function CityPage({ params }: Props) {
  const { ciudad } = await params;
  const city = await getCityBySlug(ciudad);
  if (!city) notFound();

  const [treatmentPrices, allCities] = await Promise.all([
    getPricesByCity(city.id),
    getAllCities(),
  ]);

  // Calculate city-level stats
  const cheapest = treatmentPrices.length > 0
    ? treatmentPrices.reduce((a, b) => (Number(a.min) < Number(b.min) ? a : b))
    : null;
  const mostExpensive = treatmentPrices.length > 0
    ? treatmentPrices.reduce((a, b) => (Number(a.max) > Number(b.max) ? a : b))
    : null;

  // Nearby cities from same community
  const nearbyCities = allCities
    .filter((c) => c.community === city.community && c.slug !== city.slug)
    .slice(0, 6);

  const faqItems = [
    {
      question: `¿Cuánto cuesta ir al dentista en ${city.name}?`,
      answer: `Los precios dentales en ${city.name} varían según el tratamiento. ${cheapest ? `El tratamiento más económico es ${cheapest.treatmentName.toLowerCase()} desde ${formatPrice(Number(cheapest.min))}.` : ""} ${city.name} está en la Zona ${city.zone} de aseguradoras, lo que afecta a las tarifas de seguros dentales.`,
    },
    {
      question: `¿${city.name} es cara para tratamientos dentales?`,
      answer: `${city.name} pertenece a la Zona ${city.zone} de aseguradoras (${city.community}). ${city.zone === "A" ? "La Zona A tiene precios generalmente más bajos que la Zona B." : "La Zona B tiene precios ligeramente superiores a la Zona A. Ciudades como Madrid, Barcelona y Bilbao están en esta zona."}`,
    },
    {
      question: `¿Qué seguro dental es mejor en ${city.name}?`,
      answer: `Para elegir seguro dental en ${city.name}, compara las tarifas de Zona ${city.zone}. Sanitas, Adeslas y Cigna tienen diferentes baremos según la zona geográfica. Consulta los precios por tratamiento en esta página.`,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Ciudades", href: "/ciudades" },
          { label: city.name, href: `/ciudades/${city.slug}` },
        ]}
      />

      {/* Header */}
      <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight text-balance sm:text-4xl">
            Precios dentales en {city.name}
            <span className="block text-lg font-normal text-zinc-500 mt-1">
              {city.province}, {city.community} — Actualizado 2026
            </span>
          </h1>
        </div>
      </div>

      {/* City info cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="text-center border-primary-100 rounded-2xl shadow-soft">
          <p className="text-sm font-medium text-zinc-500 text-pretty">Zona aseguradoras</p>
          <p className="mt-1 text-3xl font-extrabold text-primary-600 tabular-nums">
            Zona {city.zone}
          </p>
          <p className="mt-1 text-xs text-zinc-400 text-pretty">
            {city.zone === "A" ? "Precios generalmente más bajos" : "Precios ligeramente superiores"}
          </p>
        </Card>
        <Card className="text-center rounded-2xl shadow-soft">
          <p className="text-sm font-medium text-zinc-500 text-pretty">Tratamientos</p>
          <p className="mt-1 text-3xl font-extrabold text-zinc-900 tabular-nums">
            {treatmentPrices.length}
          </p>
          <p className="mt-1 text-xs text-zinc-400 text-pretty">
            con datos de precios
          </p>
        </Card>
        <Card className="text-center rounded-2xl shadow-soft">
          <p className="text-sm font-medium text-zinc-500 text-pretty">Población</p>
          <p className="mt-1 text-3xl font-extrabold text-zinc-900 tabular-nums">
            {formatNumber(city.population || 0)}
          </p>
          <p className="mt-1 text-xs text-zinc-400 text-pretty">
            habitantes
          </p>
        </Card>
      </div>

      {/* Treatment prices grid */}
      {treatmentPrices.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Todos los precios dentales en {city.name}
          </h2>
          <p className="mt-1 text-sm text-zinc-500 text-pretty">
            Toca cualquier tratamiento para ver el desglose por fuente
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatmentPrices.map((tp) => (
              <PriceCard
                key={tp.treatmentSlug}
                treatmentName={tp.treatmentName}
                treatmentSlug={tp.treatmentSlug}
                citySlug={city.slug}
                priceRange={{
                  min: Number(tp.min),
                  max: Number(tp.max),
                  avg: Math.round(Number(tp.avg)),
                  count: Number(tp.count),
                }}
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="mt-8 rounded-2xl border border-zinc-200/60 bg-zinc-50 p-8 text-center shadow-soft">
          <p className="text-zinc-500 text-pretty">
            Todavía no tenemos datos de precios específicos para {city.name}.
          </p>
          <p className="mt-2 text-sm text-zinc-500 text-pretty">
            Consulta los{" "}
            <Link
              href="/tratamientos"
              className="text-primary-600 hover:underline"
            >
              precios nacionales
            </Link>{" "}
            como referencia, o{" "}
            <Link
              href="/reportar-precio"
              className="text-primary-600 hover:underline"
            >
              reporta un precio
            </Link>{" "}
            de {city.name}.
          </p>
        </div>
      )}

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Otras ciudades en {city.community}
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {nearbyCities.map((c) => (
              <Link
                key={c.slug}
                href={`/ciudades/${c.slug}`}
                className="press-scale group flex items-center gap-3 rounded-2xl border border-zinc-200/60 px-4 py-3 hover:border-primary-300 hover:bg-primary-50 transition-all shadow-soft"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-sm font-bold text-zinc-500 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 group-hover:text-primary-700 text-pretty">
                    {c.name}
                  </p>
                  <p className="text-xs text-zinc-400">{c.province}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/ciudades"
              className="press-scale text-sm font-semibold text-primary-600 hover:text-primary-800"
            >
              Ver todas las ciudades →
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">
              ¿Vives en {city.name}?
            </h3>
            <p className="mt-1 text-sm text-zinc-500 text-pretty">
              Comparte lo que pagaste en tu clínica y ayuda a otros pacientes de {city.name}.
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

      <FAQSection items={faqItems} className="mt-10" />
    </div>
  );
}
