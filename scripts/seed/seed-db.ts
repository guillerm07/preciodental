import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../src/lib/db/schema";
import { TREATMENTS } from "../../src/lib/data/treatments";
import { CITIES } from "../../src/lib/data/cities";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://preciodental:preciodental_dev@localhost:5432/preciodental";

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

// Precios base del mercado español 2025-2026
const BASE_PRICES: Record<string, { min: number; max: number; avg: number }> = {
  "primera-consulta-dental": { min: 0, max: 22, avg: 15 },
  "radiografia-panoramica": { min: 0, max: 100, avg: 50 },
  "radiografia-periapical": { min: 20, max: 30, avg: 20 },
  "tac-dental": { min: 100, max: 120, avg: 110 },
  "limpieza-dental": { min: 40, max: 100, avg: 55 },
  "empaste-dental": { min: 44, max: 80, avg: 55 },
  "empaste-compuesto": { min: 50, max: 150, avg: 80 },
  "reconstruccion-dental": { min: 60, max: 80, avg: 70 },
  "ferula-de-descarga": { min: 243, max: 383, avg: 290 },
  "endodoncia-unirradicular": { min: 100, max: 300, avg: 230 },
  "endodoncia-birradicular": { min: 140, max: 350, avg: 250 },
  "endodoncia-multirradicular": { min: 190, max: 415, avg: 280 },
  "curetaje-dental": { min: 60, max: 100, avg: 70 },
  "estudio-periodontal": { min: 100, max: 120, avg: 110 },
  "cirugia-periodontal": { min: 150, max: 250, avg: 180 },
  "injerto-de-encia": { min: 180, max: 350, avg: 250 },
  "extraccion-dental-simple": { min: 40, max: 90, avg: 55 },
  "extraccion-dental-compleja": { min: 60, max: 200, avg: 100 },
  "extraccion-muela-del-juicio": { min: 50, max: 300, avg: 150 },
  "implante-dental": { min: 380, max: 780, avg: 530 },
  "implante-dental-completo": { min: 900, max: 1800, avg: 1550 },
  "corona-sobre-implante": { min: 450, max: 665, avg: 540 },
  "elevacion-de-seno-maxilar": { min: 360, max: 900, avg: 500 },
  "all-on-4": { min: 5780, max: 10500, avg: 8000 },
  "protesis-sobre-implantes-arcada-completa": { min: 7000, max: 16880, avg: 12000 },
  "brackets-metalicos": { min: 2400, max: 3380, avg: 2700 },
  "brackets-de-zafiro": { min: 3300, max: 4290, avg: 3600 },
  "ortodoncia-invisible": { min: 3500, max: 5330, avg: 4200 },
  "invisalign-comprehensive": { min: 4450, max: 6695, avg: 5200 },
  "retenedores-dentales": { min: 80, max: 200, avg: 130 },
  "blanqueamiento-dental": { min: 250, max: 553, avg: 400 },
  "carillas-de-composite": { min: 120, max: 325, avg: 200 },
  "carillas-de-porcelana": { min: 350, max: 773, avg: 550 },
  "corona-dental-metal-porcelana": { min: 290, max: 440, avg: 350 },
  "corona-dental-de-circonio": { min: 399, max: 520, avg: 460 },
  "protesis-removible-completa": { min: 450, max: 900, avg: 600 },
  "protesis-removible-parcial": { min: 300, max: 700, avg: 450 },
  "puente-dental": { min: 600, max: 1400, avg: 900 },
};

async function seed() {
  console.log("🦷 Seeding PrecioDental database...\n");

  // 1. Insert treatments
  console.log("📋 Inserting treatments...");
  const insertedTreatments = await db
    .insert(schema.treatments)
    .values(
      TREATMENTS.map((t) => ({
        name: t.name,
        slug: t.slug,
        category: t.category,
        description: t.description,
        displayOrder: t.displayOrder,
      }))
    )
    .onConflictDoNothing()
    .returning();
  console.log(`   ✓ ${insertedTreatments.length} treatments inserted`);

  // 2. Insert cities
  console.log("🏙️  Inserting cities...");
  const insertedCities = await db
    .insert(schema.cities)
    .values(
      CITIES.map((c) => ({
        name: c.name,
        slug: c.slug,
        province: c.province,
        community: c.community,
        communitySlug: c.communitySlug,
        zone: c.zone as "A" | "B",
        population: c.population,
        latitude: String(c.latitude),
        longitude: String(c.longitude),
      }))
    )
    .onConflictDoNothing()
    .returning();
  console.log(`   ✓ ${insertedCities.length} cities inserted`);

  // 3. Get all treatments and cities for ID mapping
  const allTreatments = await db.query.treatments.findMany();
  const allCities = await db.query.cities.findMany();
  const treatmentMap = new Map(allTreatments.map((t) => [t.slug, t.id]));
  const cityMap = new Map(allCities.map((c) => [c.slug, c.id]));

  // 4. Insert base prices (national level)
  console.log("💰 Inserting base prices...");
  const priceValues = [];

  for (const [slug, range] of Object.entries(BASE_PRICES)) {
    const treatmentId = treatmentMap.get(slug);
    if (!treatmentId) continue;

    // National average price (from general market data)
    priceValues.push({
      treatmentId,
      cityId: null,
      sourceType: "manual" as const,
      sourceName: "Media mercado España",
      priceMin: String(range.min),
      priceMax: String(range.max),
      priceExact: null,
      year: 2026,
      zone: null,
      verified: true,
    });

    // Simulate Sanitas prices (slightly lower)
    priceValues.push({
      treatmentId,
      cityId: null,
      sourceType: "insurance_pdf" as const,
      sourceName: "Sanitas Dental Milenium",
      priceMin: String(Math.round(range.min * 0.85)),
      priceMax: String(Math.round(range.max * 0.75)),
      priceExact: null,
      year: 2026,
      zone: "B" as const,
      verified: true,
    });

    // Simulate Adeslas prices
    priceValues.push({
      treatmentId,
      cityId: null,
      sourceType: "insurance_pdf" as const,
      sourceName: "Adeslas Dental",
      priceMin: String(Math.round(range.min * 0.88)),
      priceMax: String(Math.round(range.max * 0.78)),
      priceExact: null,
      year: 2026,
      zone: "B" as const,
      verified: true,
    });

    // Simulate Cigna prices
    priceValues.push({
      treatmentId,
      cityId: null,
      sourceType: "insurance_pdf" as const,
      sourceName: "Cigna Healthcare",
      priceMin: String(Math.round(range.min * 0.9)),
      priceMax: String(Math.round(range.max * 0.8)),
      priceExact: null,
      year: 2026,
      zone: "B" as const,
      verified: true,
    });

    // Vitaldent prices (slightly above average)
    priceValues.push({
      treatmentId,
      cityId: null,
      sourceType: "chain_website" as const,
      sourceName: "Vitaldent",
      priceMin: null,
      priceMax: null,
      priceExact: String(range.avg),
      year: 2026,
      zone: null,
      verified: true,
    });
  }

  // 5. Insert city-specific prices for top cities
  const topCitySlugs = [
    "madrid",
    "barcelona",
    "valencia",
    "sevilla",
    "bilbao",
    "zaragoza",
    "malaga",
    "murcia",
  ];

  // City price multipliers (relative to national average)
  const cityMultipliers: Record<string, number> = {
    barcelona: 1.12,
    madrid: 1.05,
    "palma-de-mallorca": 1.10,
    bilbao: 1.08,
    "san-sebastian": 1.10,
    valencia: 0.95,
    sevilla: 0.92,
    malaga: 0.94,
    granada: 0.88,
    zaragoza: 0.97,
    murcia: 0.90,
    badajoz: 0.85,
  };

  for (const citySlug of topCitySlugs) {
    const cityId = cityMap.get(citySlug);
    if (!cityId) continue;

    const multiplier = cityMultipliers[citySlug] || 1.0;

    for (const [slug, range] of Object.entries(BASE_PRICES)) {
      const treatmentId = treatmentMap.get(slug);
      if (!treatmentId) continue;

      priceValues.push({
        treatmentId,
        cityId,
        sourceType: "manual" as const,
        sourceName: "Estimación local",
        priceMin: String(Math.round(range.min * multiplier)),
        priceMax: String(Math.round(range.max * multiplier)),
        priceExact: null,
        year: 2026,
        zone: null,
        verified: true,
      });
    }
  }

  // Insert all prices in batches
  const BATCH_SIZE = 100;
  let inserted = 0;
  for (let i = 0; i < priceValues.length; i += BATCH_SIZE) {
    const batch = priceValues.slice(i, i + BATCH_SIZE);
    await db.insert(schema.prices).values(batch).onConflictDoNothing();
    inserted += batch.length;
  }
  console.log(`   ✓ ${inserted} prices inserted`);

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
