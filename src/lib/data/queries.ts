import { db } from "@/lib/db";
import { treatments, cities, prices } from "@/lib/db/schema";
import { eq, sql, and, isNull, asc, desc } from "drizzle-orm";
import type { PriceRange } from "@/types";

// ── Treatments ─────────────────────────────────────────────────────────────────

export async function getAllTreatments() {
  return db.query.treatments.findMany({
    orderBy: [asc(treatments.displayOrder)],
  });
}

export async function getTreatmentBySlug(slug: string) {
  return db.query.treatments.findFirst({
    where: eq(treatments.slug, slug),
  });
}

export async function getTreatmentsByCategory() {
  const all = await getAllTreatments();
  const grouped: Record<string, typeof all> = {};
  for (const t of all) {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  }
  return grouped;
}

// ── Cities ─────────────────────────────────────────────────────────────────────

export async function getAllCities() {
  return db.query.cities.findMany({
    orderBy: [desc(cities.population)],
  });
}

export async function getCityBySlug(slug: string) {
  return db.query.cities.findFirst({
    where: eq(cities.slug, slug),
  });
}

// ── Prices ─────────────────────────────────────────────────────────────────────

export async function getNationalPriceRange(treatmentId: number): Promise<PriceRange | null> {
  const result = await db
    .select({
      min: sql<number>`COALESCE(MIN(LEAST(COALESCE(${prices.priceMin}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMin}))), 0)`,
      max: sql<number>`COALESCE(MAX(GREATEST(COALESCE(${prices.priceMax}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMax}))), 0)`,
      avg: sql<number>`COALESCE(AVG(COALESCE(${prices.priceExact}, (COALESCE(${prices.priceMin}, 0) + COALESCE(${prices.priceMax}, 0)) / 2.0)), 0)`,
      count: sql<number>`COUNT(*)`,
    })
    .from(prices)
    .where(eq(prices.treatmentId, treatmentId));

  if (!result[0] || result[0].count === 0) return null;
  return {
    min: Number(result[0].min),
    max: Number(result[0].max),
    avg: Math.round(Number(result[0].avg)),
    count: Number(result[0].count),
  };
}

export async function getCityPriceRange(
  treatmentId: number,
  cityId: number
): Promise<PriceRange | null> {
  const result = await db
    .select({
      min: sql<number>`COALESCE(MIN(LEAST(COALESCE(${prices.priceMin}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMin}))), 0)`,
      max: sql<number>`COALESCE(MAX(GREATEST(COALESCE(${prices.priceMax}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMax}))), 0)`,
      avg: sql<number>`COALESCE(AVG(COALESCE(${prices.priceExact}, (COALESCE(${prices.priceMin}, 0) + COALESCE(${prices.priceMax}, 0)) / 2.0)), 0)`,
      count: sql<number>`COUNT(*)`,
    })
    .from(prices)
    .where(and(eq(prices.treatmentId, treatmentId), eq(prices.cityId, cityId)));

  if (!result[0] || result[0].count === 0) return null;
  return {
    min: Number(result[0].min),
    max: Number(result[0].max),
    avg: Math.round(Number(result[0].avg)),
    count: Number(result[0].count),
  };
}

export async function getPricesByTreatment(treatmentId: number) {
  return db.query.prices.findMany({
    where: eq(prices.treatmentId, treatmentId),
    with: { city: true },
    orderBy: [asc(prices.sourceName)],
  });
}

export async function getPricesByTreatmentAndCity(
  treatmentId: number,
  cityId: number
) {
  return db.query.prices.findMany({
    where: and(eq(prices.treatmentId, treatmentId), eq(prices.cityId, cityId)),
    orderBy: [asc(prices.sourceName)],
  });
}

export async function getPricesByCity(cityId: number) {
  return db
    .select({
      treatmentId: prices.treatmentId,
      treatmentName: treatments.name,
      treatmentSlug: treatments.slug,
      min: sql<number>`MIN(LEAST(COALESCE(${prices.priceMin}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMin})))`,
      max: sql<number>`MAX(GREATEST(COALESCE(${prices.priceMax}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMax})))`,
      avg: sql<number>`AVG(COALESCE(${prices.priceExact}, (COALESCE(${prices.priceMin}, 0) + COALESCE(${prices.priceMax}, 0)) / 2.0))`,
      count: sql<number>`COUNT(*)`,
    })
    .from(prices)
    .innerJoin(treatments, eq(prices.treatmentId, treatments.id))
    .where(eq(prices.cityId, cityId))
    .groupBy(prices.treatmentId, treatments.name, treatments.slug)
    .orderBy(asc(treatments.displayOrder));
}

export async function getTreatmentsWithNationalPrices() {
  return db
    .select({
      treatmentId: prices.treatmentId,
      treatmentName: treatments.name,
      treatmentSlug: treatments.slug,
      category: treatments.category,
      min: sql<number>`MIN(LEAST(COALESCE(${prices.priceMin}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMin})))`,
      max: sql<number>`MAX(GREATEST(COALESCE(${prices.priceMax}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMax})))`,
      avg: sql<number>`AVG(COALESCE(${prices.priceExact}, (COALESCE(${prices.priceMin}, 0) + COALESCE(${prices.priceMax}, 0)) / 2.0))`,
      count: sql<number>`COUNT(*)`,
    })
    .from(prices)
    .innerJoin(treatments, eq(prices.treatmentId, treatments.id))
    .groupBy(prices.treatmentId, treatments.name, treatments.slug, treatments.category, treatments.displayOrder)
    .orderBy(asc(treatments.displayOrder));
}
