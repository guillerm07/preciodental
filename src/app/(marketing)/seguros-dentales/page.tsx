import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo/metadata";

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
  },
  {
    name: "Adeslas Dental",
    slug: "adeslas-dental",
    description: "Amplia red de clínicas dentales con planes con y sin copago.",
    clinics: "180+",
  },
  {
    name: "Cigna Healthcare Dental",
    slug: "cigna-dental",
    description: "Seguro dental con precios diferenciados por Zona A y Zona B.",
    clinics: "150+",
  },
  {
    name: "Caser Dental",
    slug: "caser-dental",
    description: "Plan Sonrisa con una red de clínicas en toda España.",
    clinics: "100+",
  },
  {
    name: "Vitaldent",
    slug: "vitaldent",
    description: "La cadena de clínicas dentales más grande de España.",
    clinics: "450+",
  },
  {
    name: "Generali Dental",
    slug: "generali-dental",
    description: "Seguro dental con baremos diferenciados por zona geográfica.",
    clinics: "120+",
  },
  {
    name: "AXA Dental",
    slug: "axa-dental",
    description: "Seguro dental con tarifa completa de tratamientos.",
    clinics: "100+",
  },
  {
    name: "Mapfre Dental",
    slug: "mapfre-dental",
    description: "Baremo dental con precios máximos garantizados.",
    clinics: "90+",
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

      <h1 className="text-3xl font-bold text-gray-900">
        Seguros dentales en España
      </h1>
      <p className="mt-2 text-gray-600">
        Compara los baremos y precios de los principales seguros dentales.
        Las aseguradoras dividen España en Zona A (más barata) y Zona B (más
        cara).
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {INSURANCES.map((ins) => (
          <Link key={ins.slug} href={`/seguros-dentales/${ins.slug}`} className="group block">
            <Card className="h-full transition-shadow hover:shadow-md group-hover:border-primary-300">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {ins.name}
              </h2>
              <p className="mt-1 text-sm text-gray-600">{ins.description}</p>
              <p className="mt-3 text-xs text-gray-400">{ins.clinics} clínicas</p>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">
          Zonas geográficas de aseguradoras
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-gray-900">Zona A (más barata)</h3>
            <p className="mt-2 text-sm text-gray-600">
              Andalucía, Canarias, Castilla-La Mancha, Extremadura, Murcia
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-900">Zona B (más cara)</h3>
            <p className="mt-2 text-sm text-gray-600">
              Madrid, Cataluña, País Vasco, Navarra, Aragón, Baleares, La Rioja,
              Cantabria, Asturias, Galicia, Castilla y León, C. Valenciana
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
