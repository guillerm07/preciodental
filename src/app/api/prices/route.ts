import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { prices, treatments, cities } from "@/lib/db/schema";
import { eq, and, asc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const treatmentSlug = searchParams.get("treatment");
  const citySlug = searchParams.get("city");

  if (!treatmentSlug) {
    return NextResponse.json(
      { error: "treatment parameter is required" },
      { status: 400 }
    );
  }

  const treatment = await db.query.treatments.findFirst({
    where: eq(treatments.slug, treatmentSlug),
  });

  if (!treatment) {
    return NextResponse.json(
      { error: "Treatment not found" },
      { status: 404 }
    );
  }

  let conditions = eq(prices.treatmentId, treatment.id);

  if (citySlug) {
    const city = await db.query.cities.findFirst({
      where: eq(cities.slug, citySlug),
    });
    if (city) {
      conditions = and(conditions, eq(prices.cityId, city.id))!;
    }
  }

  const results = await db.query.prices.findMany({
    where: conditions,
    with: { city: true },
    orderBy: [asc(prices.sourceName)],
  });

  const aggregate = await db
    .select({
      min: sql<number>`MIN(LEAST(COALESCE(${prices.priceMin}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMin})))`,
      max: sql<number>`MAX(GREATEST(COALESCE(${prices.priceMax}, ${prices.priceExact}), COALESCE(${prices.priceExact}, ${prices.priceMax})))`,
      avg: sql<number>`AVG(COALESCE(${prices.priceExact}, (COALESCE(${prices.priceMin}, 0) + COALESCE(${prices.priceMax}, 0)) / 2.0))`,
      count: sql<number>`COUNT(*)`,
    })
    .from(prices)
    .where(conditions);

  return NextResponse.json({
    treatment: {
      name: treatment.name,
      slug: treatment.slug,
    },
    priceRange: aggregate[0]
      ? {
          min: Number(aggregate[0].min),
          max: Number(aggregate[0].max),
          avg: Math.round(Number(aggregate[0].avg)),
          count: Number(aggregate[0].count),
        }
      : null,
    prices: results.map((p) => ({
      sourceName: p.sourceName,
      sourceType: p.sourceType,
      priceMin: p.priceMin ? Number(p.priceMin) : null,
      priceMax: p.priceMax ? Number(p.priceMax) : null,
      priceExact: p.priceExact ? Number(p.priceExact) : null,
      zone: p.zone,
      city: p.city?.name || null,
    })),
  });
}
