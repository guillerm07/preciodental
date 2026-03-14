import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { priceReports, treatments, cities, rateLimits } from "@/lib/db/schema";
import { eq, and, gt, sql } from "drizzle-orm";
import { createHash } from "crypto";

function hashIP(ip: string): string {
  const salt = process.env.IP_SALT || "preciodental-salt";
  return createHash("sha256").update(`${ip}${salt}`).digest("hex");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { treatmentSlug, citySlug, clinicName, pricePaid, hadInsurance, insuranceName, dateOfTreatment } = body;

  if (!treatmentSlug || !citySlug || !pricePaid) {
    return NextResponse.json(
      { error: "treatmentSlug, citySlug, and pricePaid are required" },
      { status: 400 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashIP(ip);

  // Rate limiting: max 5 reports per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recentReports = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(priceReports)
    .where(and(eq(priceReports.ipHash, ipHash), gt(priceReports.createdAt, oneHourAgo)));

  if (Number(recentReports[0]?.count) >= 5) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }

  const treatment = await db.query.treatments.findFirst({
    where: eq(treatments.slug, treatmentSlug),
  });
  const city = await db.query.cities.findFirst({
    where: eq(cities.slug, citySlug),
  });

  if (!treatment || !city) {
    return NextResponse.json(
      { error: "Treatment or city not found" },
      { status: 404 }
    );
  }

  await db.insert(priceReports).values({
    treatmentId: treatment.id,
    cityId: city.id,
    clinicName: clinicName || null,
    pricePaid: String(pricePaid),
    hadInsurance: hadInsurance || false,
    insuranceName: insuranceName || null,
    dateOfTreatment: dateOfTreatment || null,
    ipHash,
    status: "pending",
  });

  return NextResponse.json({ success: true });
}
