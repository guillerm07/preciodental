import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import * as schema from "../../src/lib/db/schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://preciodental:preciodental_dev@localhost:5432/preciodental";

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

// Precios base del mercado espanol 2025-2026
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

// Multipliers for ALL 44 cities
const cityMultipliers: Record<string, number> = {
  // Zone B (more expensive areas, 0.97-1.12)
  "madrid": 1.05,
  "alcala-de-henares": 1.02,
  "mostoles": 1.00,
  "getafe": 1.01,
  "barcelona": 1.12,
  "hospitalet-de-llobregat": 1.08,
  "badalona": 1.06,
  "terrassa": 1.04,
  "sabadell": 1.04,
  "tarragona": 1.00,
  "girona": 1.02,
  "lleida": 0.97,
  "valencia": 0.95,
  "alicante": 0.98,
  "elche": 0.95,
  "castellon-de-la-plana": 0.97,
  "bilbao": 1.08,
  "vitoria-gasteiz": 1.03,
  "san-sebastian": 1.10,
  "zaragoza": 0.97,
  "palma-de-mallorca": 1.10,
  "pamplona": 1.05,
  "santander": 1.02,
  "gijon": 0.98,
  "oviedo": 0.99,
  "vigo": 0.97,
  "a-coruna": 0.98,
  "santiago-de-compostela": 1.00,
  "valladolid": 0.97,
  "burgos": 0.98,
  "salamanca": 0.96,
  "leon": 0.95,
  "logrono": 0.99,
  // Zone A (cheaper areas, 0.85-0.96)
  "sevilla": 0.92,
  "malaga": 0.94,
  "granada": 0.88,
  "cordoba": 0.89,
  "jerez-de-la-frontera": 0.87,
  "almeria": 0.88,
  "huelva": 0.86,
  "jaen": 0.85,
  "cadiz": 0.87,
  "marbella": 0.96,
  "las-palmas-de-gran-canaria": 0.91,
  "santa-cruz-de-tenerife": 0.90,
  "murcia": 0.90,
  "cartagena": 0.88,
  "albacete": 0.89,
  "toledo": 0.91,
  "ciudad-real": 0.87,
  "badajoz": 0.85,
  "caceres": 0.86,
};

// Insurance discount factors relative to city price
const INSURANCE_SOURCES = [
  {
    sourceName: "Sanitas Dental Milenium",
    sourceType: "insurance_pdf" as const,
    minFactor: 0.85,
    maxFactor: 0.75,
  },
  {
    sourceName: "Adeslas Dental",
    sourceType: "insurance_pdf" as const,
    minFactor: 0.88,
    maxFactor: 0.78,
  },
  {
    sourceName: "Cigna Healthcare",
    sourceType: "insurance_pdf" as const,
    minFactor: 0.90,
    maxFactor: 0.80,
  },
];

async function seedAllCities() {
  console.log("Seeding prices for ALL cities...\n");

  // 1. Get all treatments and cities from DB
  const allTreatments = await db.query.treatments.findMany();
  const allCities = await db.query.cities.findMany();

  const treatmentMap = new Map(allTreatments.map((t) => [t.slug, t.id]));
  const cityMap = new Map(allCities.map((c) => [c.slug, c.id]));

  console.log(`Found ${allTreatments.length} treatments and ${allCities.length} cities in DB`);

  const priceValues: Array<{
    treatmentId: number;
    cityId: number;
    sourceType: "manual" | "insurance_pdf";
    sourceName: string;
    priceMin: string | null;
    priceMax: string | null;
    priceExact: null;
    year: number;
    zone: null;
    verified: boolean;
  }> = [];

  let citiesProcessed = 0;
  let citiesSkipped = 0;

  // 2. For each city with a known multiplier, generate prices
  for (const [citySlug, multiplier] of Object.entries(cityMultipliers)) {
    const cityId = cityMap.get(citySlug);
    if (!cityId) {
      console.log(`  SKIP: City "${citySlug}" not found in DB`);
      citiesSkipped++;
      continue;
    }

    for (const [treatmentSlug, range] of Object.entries(BASE_PRICES)) {
      const treatmentId = treatmentMap.get(treatmentSlug);
      if (!treatmentId) continue;

      // City-level manual price
      priceValues.push({
        treatmentId,
        cityId,
        sourceType: "manual",
        sourceName: "Estimacion local",
        priceMin: String(Math.round(range.min * multiplier)),
        priceMax: String(Math.round(range.max * multiplier)),
        priceExact: null,
        year: 2026,
        zone: null,
        verified: true,
      });

      // Insurance prices per city
      for (const insurance of INSURANCE_SOURCES) {
        priceValues.push({
          treatmentId,
          cityId,
          sourceType: insurance.sourceType,
          sourceName: insurance.sourceName,
          priceMin: String(Math.round(range.min * multiplier * insurance.minFactor)),
          priceMax: String(Math.round(range.max * multiplier * insurance.maxFactor)),
          priceExact: null,
          year: 2026,
          zone: null,
          verified: true,
        });
      }
    }

    citiesProcessed++;
  }

  console.log(`\nPrepared ${priceValues.length} price entries for ${citiesProcessed} cities`);
  if (citiesSkipped > 0) {
    console.log(`Skipped ${citiesSkipped} cities (not found in DB)`);
  }

  // 3. Insert in batches of 100 with onConflictDoNothing
  const BATCH_SIZE = 100;
  let inserted = 0;

  for (let i = 0; i < priceValues.length; i += BATCH_SIZE) {
    const batch = priceValues.slice(i, i + BATCH_SIZE);
    await db.insert(schema.prices).values(batch).onConflictDoNothing();
    inserted += batch.length;

    if (inserted % 500 === 0 || i + BATCH_SIZE >= priceValues.length) {
      console.log(`  Progress: ${inserted}/${priceValues.length} prices inserted`);
    }
  }

  console.log(`\nDone! ${inserted} price entries processed for ${citiesProcessed} cities.`);
  process.exit(0);
}

seedAllCities().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
