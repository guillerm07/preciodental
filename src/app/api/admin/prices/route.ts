import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { prices, treatments, cities } from "@/lib/db/schema";
import { eq, asc, desc } from "drizzle-orm";

export async function GET() {
  const allPrices = await db
    .select({
      id: prices.id,
      treatmentName: treatments.name,
      cityName: cities.name,
      sourceName: prices.sourceName,
      sourceType: prices.sourceType,
      priceMin: prices.priceMin,
      priceMax: prices.priceMax,
      priceExact: prices.priceExact,
      zone: prices.zone,
      year: prices.year,
      verified: prices.verified,
      createdAt: prices.createdAt,
    })
    .from(prices)
    .leftJoin(treatments, eq(prices.treatmentId, treatments.id))
    .leftJoin(cities, eq(prices.cityId, cities.id))
    .orderBy(desc(prices.createdAt))
    .limit(500);

  return NextResponse.json(allPrices);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { treatmentId, cityId, sourceType, sourceName, priceMin, priceMax, priceExact, year, zone } = body;

  if (!treatmentId || !sourceType || !sourceName || !year) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [newPrice] = await db
    .insert(prices)
    .values({
      treatmentId,
      cityId: cityId || null,
      sourceType,
      sourceName,
      priceMin: priceMin ? String(priceMin) : null,
      priceMax: priceMax ? String(priceMax) : null,
      priceExact: priceExact ? String(priceExact) : null,
      year,
      zone: zone || null,
      verified: true,
    })
    .returning();

  return NextResponse.json(newPrice, { status: 201 });
}
