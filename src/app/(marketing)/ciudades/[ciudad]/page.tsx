import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceCard } from "@/components/PriceCard";
import { FAQSection } from "@/components/FAQSection";
import { getCityBySlug, getPricesByCity, getAllCities } from "@/lib/data/queries";
import { generateCityMetadata } from "@/lib/seo/metadata";
import { formatPrice } from "@/lib/utils/format";

interface Props {
  params: Promise<{ ciudad: string }>;
}

export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((c) => ({ ciudad: c.slug }));
}

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

  const treatmentPrices = await getPricesByCity(city.id);

  const faqItems = [
    {
      question: `¿Cuánto cuesta ir al dentista en ${city.name}?`,
      answer: `Los precios dentales en ${city.name} varían según el tratamiento. Una limpieza dental cuesta entre 40€-100€, un empaste entre 44€-80€, y un implante dental entre 900€-1.800€. ${city.name} está en la Zona ${city.zone} de aseguradoras.`,
    },
    {
      question: `¿${city.name} es cara para tratamientos dentales?`,
      answer: `${city.name} pertenece a la Zona ${city.zone} de aseguradoras (${city.community}). ${city.zone === "A" ? "La Zona A tiene precios generalmente más bajos." : "La Zona B tiene precios ligeramente superiores."}`,
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

      <h1 className="text-3xl font-bold text-gray-900">
        Precios dentales en {city.name} (2026)
      </h1>
      <p className="mt-2 text-gray-600">
        Precios de tratamientos dentales en {city.name}, {city.province} —{" "}
        {city.community} (Zona {city.zone}).
      </p>

      {treatmentPrices.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      ) : (
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-600">
            Todavía no tenemos datos de precios específicos para {city.name}.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Consulta los{" "}
            <Link href="/tratamientos" className="text-primary-600 hover:underline">
              precios nacionales
            </Link>{" "}
            como referencia.
          </p>
        </div>
      )}

      <FAQSection items={faqItems} className="mt-10" />
    </div>
  );
}
