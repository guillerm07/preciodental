import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceComparison } from "@/components/PriceComparison";
import { Card } from "@/components/ui/Card";
import { db } from "@/lib/db";
import { prices, treatments } from "@/lib/db/schema";
import { eq, asc, ilike } from "drizzle-orm";
import { generateInsuranceMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ aseguradora: string }>;
}

const INSURANCE_MAP: Record<string, { name: string; sourcePattern: string }> = {
  "sanitas-dental-milenium": { name: "Sanitas Dental Milenium", sourcePattern: "Sanitas%" },
  "adeslas-dental": { name: "Adeslas Dental", sourcePattern: "Adeslas%" },
  "cigna-dental": { name: "Cigna Healthcare Dental", sourcePattern: "Cigna%" },
  "caser-dental": { name: "Caser Dental", sourcePattern: "Caser%" },
  "vitaldent": { name: "Vitaldent", sourcePattern: "Vitaldent%" },
  "generali-dental": { name: "Generali Dental", sourcePattern: "Generali%" },
  "axa-dental": { name: "AXA Dental", sourcePattern: "AXA%" },
  "mapfre-dental": { name: "Mapfre Dental", sourcePattern: "Mapfre%" },
};

export async function generateStaticParams() {
  return Object.keys(INSURANCE_MAP).map((aseguradora) => ({ aseguradora }));
}

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

  const byTreatment = new Map<string, typeof insurancePrices>();
  for (const p of insurancePrices) {
    const existing = byTreatment.get(p.treatmentSlug) || [];
    existing.push(p);
    byTreatment.set(p.treatmentSlug, existing);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Seguros dentales", href: "/seguros-dentales" },
          { label: info.name, href: `/seguros-dentales/${aseguradora}` },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">
        Precios dentales {info.name} (2026)
      </h1>
      <p className="mt-2 text-gray-600">
        Baremo completo de precios de tratamientos dentales con {info.name}.
      </p>

      {insurancePrices.length > 0 ? (
        <Card className="mt-8" padding="sm">
          <PriceComparison
            prices={insurancePrices.map((p) => ({
              sourceName: p.treatmentName,
              sourceType: p.sourceType,
              priceMin: p.priceMin ? Number(p.priceMin) : null,
              priceMax: p.priceMax ? Number(p.priceMax) : null,
              priceExact: p.priceExact ? Number(p.priceExact) : null,
              zone: p.zone,
            }))}
          />
        </Card>
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
    </div>
  );
}
