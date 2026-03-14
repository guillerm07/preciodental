import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { db } from "@/lib/db";
import { prices, treatments } from "@/lib/db/schema";
import { eq, asc, ilike } from "drizzle-orm";
import { generateInsuranceMetadata } from "@/lib/seo/metadata";
import { formatPrice } from "@/lib/utils/format";

interface Props {
  params: Promise<{ aseguradora: string }>;
}

const INSURANCE_MAP: Record<
  string,
  { name: string; sourcePattern: string; description: string }
> = {
  "sanitas-dental-milenium": {
    name: "Sanitas Dental Milenium",
    sourcePattern: "Sanitas%",
    description:
      "Red dental con más de 220 clínicas propias en España. Precios de baremo fijados por zona geográfica.",
  },
  "adeslas-dental": {
    name: "Adeslas Dental",
    sourcePattern: "Adeslas%",
    description:
      "Amplia red de clínicas concertadas con planes con y sin copago. Precios diferenciados por zona.",
  },
  "cigna-dental": {
    name: "Cigna Healthcare Dental",
    sourcePattern: "Cigna%",
    description:
      "Seguro dental con precios diferenciados por Zona A y Zona B. Red de clínicas concertadas.",
  },
  "caser-dental": {
    name: "Caser Dental",
    sourcePattern: "Caser%",
    description: "Plan Sonrisa con red de clínicas en toda España.",
  },
  vitaldent: {
    name: "Vitaldent",
    sourcePattern: "Vitaldent%",
    description:
      "La cadena de clínicas dentales más grande de España con más de 450 centros.",
  },
  "generali-dental": {
    name: "Generali Dental",
    sourcePattern: "Generali%",
    description:
      "Seguro dental con baremos por zona geográfica y red de clínicas concertadas.",
  },
  "axa-dental": {
    name: "AXA Dental",
    sourcePattern: "AXA%",
    description: "Seguro dental con tarifa completa de tratamientos.",
  },
  "mapfre-dental": {
    name: "Mapfre Dental",
    sourcePattern: "Mapfre%",
    description: "Baremo dental con precios máximos garantizados.",
  },
};

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { aseguradora } = await params;
  const info = INSURANCE_MAP[aseguradora];
  if (!info) return {};
  return generateInsuranceMetadata(info.name, aseguradora);
}

export default async function InsurancePage({ params }: Props) {
  const { aseguradora } = await params;
  const info = INSURANCE_MAP[aseguradora];
  if (!info) notFound();

  const insurancePrices = await db
    .select({
      treatmentName: treatments.name,
      treatmentSlug: treatments.slug,
      sourceName: prices.sourceName,
      priceMin: prices.priceMin,
      priceMax: prices.priceMax,
      priceExact: prices.priceExact,
      zone: prices.zone,
      sourceType: prices.sourceType,
    })
    .from(prices)
    .innerJoin(treatments, eq(prices.treatmentId, treatments.id))
    .where(ilike(prices.sourceName, info.sourcePattern))
    .orderBy(asc(treatments.displayOrder));

  // Group by treatment, then by zone
  const byTreatment = new Map<
    string,
    {
      name: string;
      slug: string;
      zoneA: { min: number | null; max: number | null; exact: number | null } | null;
      zoneB: { min: number | null; max: number | null; exact: number | null } | null;
    }
  >();

  for (const p of insurancePrices) {
    if (!byTreatment.has(p.treatmentSlug)) {
      byTreatment.set(p.treatmentSlug, {
        name: p.treatmentName,
        slug: p.treatmentSlug,
        zoneA: null,
        zoneB: null,
      });
    }
    const entry = byTreatment.get(p.treatmentSlug)!;
    const priceData = {
      min: p.priceMin ? Number(p.priceMin) : null,
      max: p.priceMax ? Number(p.priceMax) : null,
      exact: p.priceExact ? Number(p.priceExact) : null,
    };

    if (p.zone === "A") entry.zoneA = priceData;
    else if (p.zone === "B") entry.zoneB = priceData;
    else {
      // No zone specified — use for both
      if (!entry.zoneA) entry.zoneA = priceData;
      if (!entry.zoneB) entry.zoneB = priceData;
    }
  }

  const treatmentList = Array.from(byTreatment.values());

  // Other insurances for navigation
  const otherInsurances = Object.entries(INSURANCE_MAP)
    .filter(([slug]) => slug !== aseguradora)
    .slice(0, 4);

  const formatInsPrice = (data: {
    min: number | null;
    max: number | null;
    exact: number | null;
  }) => {
    if (data.exact) return formatPrice(data.exact);
    if (data.min && data.max)
      return `${formatPrice(data.min)} - ${formatPrice(data.max)}`;
    if (data.min) return `desde ${formatPrice(data.min)}`;
    if (data.max) return `hasta ${formatPrice(data.max)}`;
    return "—";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Seguros dentales", href: "/seguros-dentales" },
          { label: info.name, href: `/seguros-dentales/${aseguradora}` },
        ]}
      />

      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {info.name}
        <span className="block text-lg font-normal text-gray-500 mt-1">
          Baremo de precios dentales 2026
        </span>
      </h1>
      <p className="mt-3 max-w-3xl text-gray-600">{info.description}</p>

      {treatmentList.length > 0 ? (
        <>
          {/* Summary */}
          <div className="mt-8 rounded-xl border border-primary-100 bg-primary-50 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white text-sm font-bold">
                {treatmentList.length}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {treatmentList.length} tratamientos con precios publicados
                </p>
                <p className="mt-0.5 text-sm text-gray-600">
                  Precios de baremo diferenciados por Zona A y Zona B cuando disponibles
                </p>
              </div>
            </div>
          </div>

          {/* Price table by zone */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 pr-4 text-left font-bold text-gray-900">
                    Tratamiento
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-accent-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-accent-500" />
                      Zona A
                    </span>
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-gray-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-gray-500" />
                      Zona B
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {treatmentList.map((t) => (
                  <tr
                    key={t.slug}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <Link
                        href={`/tratamientos/${t.slug}`}
                        className="font-medium text-gray-900 hover:text-primary-600"
                      >
                        {t.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-accent-600 whitespace-nowrap">
                      {t.zoneA ? formatInsPrice(t.zoneA) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-700 whitespace-nowrap">
                      {t.zoneB ? formatInsPrice(t.zoneB) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Card className="mt-8 text-center">
          <p className="text-gray-600">
            Todavía no hemos procesado los datos de {info.name}.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Estamos trabajando en importar los baremos de todas las aseguradoras.
          </p>
        </Card>
      )}

      {/* Other insurances */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">
          Otras aseguradoras dentales
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {otherInsurances.map(([slug, ins]) => (
            <Link
              key={slug}
              href={`/seguros-dentales/${slug}`}
              className="rounded-xl border border-gray-200 bg-white p-4 text-sm font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all"
            >
              {ins.name}
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/seguros-dentales"
            className="text-sm font-semibold text-primary-600 hover:text-primary-800"
          >
            Ver todas las aseguradoras →
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <p className="mt-10 text-xs text-gray-400 leading-relaxed">
        Los precios mostrados corresponden a los baremos publicados por{" "}
        {info.name}. Son precios máximos que la aseguradora paga a las clínicas
        de su red. El precio final puede variar según el plan contratado.
        Última actualización: marzo 2026.
      </p>
    </div>
  );
}
