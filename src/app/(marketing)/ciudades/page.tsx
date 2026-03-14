import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllCities } from "@/lib/data/queries";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { formatNumber } from "@/lib/utils/format";

export const metadata: Metadata = generatePageMetadata({
  title: "Precios dentales por ciudad en España (2026)",
  description:
    "Compara precios de tratamientos dentales en las principales ciudades de España. Madrid, Barcelona, Valencia, Sevilla y más.",
  path: "/ciudades",
});

export default async function CitiesPage() {
  const cities = await getAllCities();

  const byCommunity: Record<string, typeof cities> = {};
  for (const city of cities) {
    if (!byCommunity[city.community]) byCommunity[city.community] = [];
    byCommunity[city.community].push(city);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Ciudades", href: "/ciudades" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">
        Precios dentales por ciudad
      </h1>
      <p className="mt-2 text-gray-600">
        Selecciona una ciudad para ver los precios de todos los tratamientos
        dentales disponibles.
      </p>

      {Object.entries(byCommunity)
        .sort(([, a], [, b]) => b.length - a.length)
        .map(([community, commCities]) => (
          <section key={community} className="mt-8">
            <h2 className="text-lg font-bold text-gray-900">{community}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {commCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/ciudades/${city.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-primary-300 hover:shadow-sm transition-all"
                >
                  <div>
                    <p className="font-medium text-gray-900">{city.name}</p>
                    <p className="text-xs text-gray-500">{city.province}</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                    Zona {city.zone}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
