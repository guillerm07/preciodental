export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllCities } from "@/lib/data/queries";
import { generatePageMetadata } from "@/lib/seo/metadata";

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

      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Precios dentales por ciudad
        <span className="block text-lg font-normal text-gray-500 mt-1">
          {cities.length} ciudades con datos de precios actualizados
        </span>
      </h1>
      <p className="mt-3 max-w-3xl text-gray-600">
        Selecciona una ciudad para ver los precios de todos los tratamientos dentales.
        Los precios de aseguradoras varían según la zona geográfica (A o B).
      </p>

      {/* Zone legend */}
      <div className="mt-6 flex items-center gap-6 text-sm">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-accent-100 text-xs font-bold text-accent-700">A</span>
          <span className="text-gray-600">Zona A — Precios más bajos</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-xs font-bold text-gray-700">B</span>
          <span className="text-gray-600">Zona B — Precios superiores</span>
        </span>
      </div>

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
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-primary-300 hover:shadow-sm transition-all"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                    {city.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                      {city.name}
                    </p>
                    <p className="text-xs text-gray-500">{city.province}</p>
                  </div>
                  <span className={`shrink-0 inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                    city.zone === "A"
                      ? "bg-accent-100 text-accent-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {city.zone}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
