import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { ZONE_COMMUNITIES } from "@/types";

export const metadata: Metadata = generatePageMetadata({
  title: "Seguros dentales en España — Comparativa de precios (2026)",
  description:
    "Compara los baremos de precios de los principales seguros dentales en España: Sanitas, Adeslas, Cigna, Caser, Generali y más.",
  path: "/seguros-dentales",
});

const INSURANCES = [
  {
    name: "Sanitas Dental Milenium",
    slug: "sanitas-dental-milenium",
    description: "La red dental más grande de España con más de 220 clínicas propias.",
    clinics: "220+",
    color: "bg-blue-50 border-blue-200",
  },
  {
    name: "Adeslas Dental",
    slug: "adeslas-dental",
    description: "Amplia red de clínicas dentales con planes con y sin copago.",
    clinics: "180+",
    color: "bg-green-50 border-green-200",
  },
  {
    name: "Cigna Healthcare Dental",
    slug: "cigna-dental",
    description: "Seguro dental con precios diferenciados por Zona A y Zona B.",
    clinics: "150+",
    color: "bg-orange-50 border-orange-200",
  },
  {
    name: "Caser Dental",
    slug: "caser-dental",
    description: "Plan Sonrisa con una red de clínicas en toda España.",
    clinics: "100+",
    color: "bg-purple-50 border-purple-200",
  },
  {
    name: "Vitaldent",
    slug: "vitaldent",
    description: "La cadena de clínicas dentales más grande de España.",
    clinics: "450+",
    color: "bg-teal-50 border-teal-200",
  },
  {
    name: "Generali Dental",
    slug: "generali-dental",
    description: "Seguro dental con baremos diferenciados por zona geográfica.",
    clinics: "120+",
    color: "bg-red-50 border-red-200",
  },
  {
    name: "AXA Dental",
    slug: "axa-dental",
    description: "Seguro dental con tarifa completa de tratamientos.",
    clinics: "100+",
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    name: "Mapfre Dental",
    slug: "mapfre-dental",
    description: "Baremo dental con precios máximos garantizados.",
    clinics: "90+",
    color: "bg-yellow-50 border-yellow-200",
  },
];

export default function InsurancesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Seguros dentales", href: "/seguros-dentales" },
        ]}
      />

      <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight text-balance sm:text-4xl">
        Seguros dentales en España
        <span className="block text-lg font-normal text-zinc-500 mt-1">
          Comparativa de baremos y precios 2026
        </span>
      </h1>
      <p className="mt-3 max-w-3xl text-zinc-500 text-pretty">
        Las aseguradoras dividen España en dos zonas con precios diferentes.
        Compara los baremos de cada aseguradora para encontrar la mejor opción
        según tu ciudad y los tratamientos que necesitas.
      </p>

      {/* Key insight */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-accent-50 to-green-50 border border-accent-200 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-accent-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-zinc-900 text-balance">
              Con seguro dental puedes ahorrar entre un 30% y 50%
            </h2>
            <p className="mt-1 text-sm text-zinc-500 text-pretty">
              Las aseguradoras negocian precios máximos (baremos) con las clínicas de su red.
              Estos baremos son públicos y los publicamos aquí para que puedas comparar antes de contratar.
            </p>
          </div>
        </div>
      </div>

      {/* Insurance cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {INSURANCES.map((ins) => (
          <Link
            key={ins.slug}
            href={`/seguros-dentales/${ins.slug}`}
            className="press-scale group block"
          >
            <div className={`h-full rounded-2xl border ${ins.color} p-5 transition-all hover:shadow-md shadow-soft`}>
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-bold text-zinc-900 group-hover:text-primary-600 transition-colors text-balance">
                  {ins.name}
                </h2>
                <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-zinc-500 shadow-sm">
                  {ins.clinics} clínicas
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-500 text-pretty">{ins.description}</p>
              <p className="mt-3 text-sm font-semibold text-primary-600 group-hover:translate-x-0.5 transition-transform text-pretty">
                Ver baremo completo →
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Zone explanation */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-zinc-900 text-balance">
          Zonas geográficas de aseguradoras dentales
        </h2>
        <p className="mt-2 text-sm text-zinc-500 text-pretty">
          Las aseguradoras agrupan las comunidades autónomas en dos zonas con baremos de precios distintos.
          La Zona A suele tener precios más bajos que la Zona B.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-accent-200 bg-accent-50 p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-sm font-bold text-white">
                A
              </span>
              <h3 className="font-bold text-zinc-900">Zona A — Precios más bajos</h3>
            </div>
            <ul className="mt-3 space-y-1">
              {ZONE_COMMUNITIES.A.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-zinc-900">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-zinc-200 bg-zinc-50 p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-500 text-sm font-bold text-white">
                B
              </span>
              <h3 className="font-bold text-zinc-900">Zona B — Precios superiores</h3>
            </div>
            <ul className="mt-3 space-y-1">
              {ZONE_COMMUNITIES.B.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-zinc-900">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100 p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold text-zinc-900">
          ¿No sabes qué seguro dental elegir?
        </h3>
        <p className="mt-2 text-sm text-zinc-500 max-w-xl mx-auto text-pretty">
          Busca el tratamiento que necesitas y compara los precios de todas las aseguradoras en tu zona.
        </p>
        <Link
          href="/comparar"
          className="press-scale mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          Comparar precios por tratamiento
        </Link>
      </section>
    </div>
  );
}
