import type { treatments, cities, prices, priceReports, articles, clinics, clinicPrices } from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";

// ── DB Model Types ─────────────────────────────────────────────────────────────

export type Treatment = InferSelectModel<typeof treatments>;
export type City = InferSelectModel<typeof cities>;
export type Price = InferSelectModel<typeof prices>;
export type PriceReport = InferSelectModel<typeof priceReports>;
export type Article = InferSelectModel<typeof articles>;
export type Clinic = InferSelectModel<typeof clinics>;
export type ClinicPrice = InferSelectModel<typeof clinicPrices>;

// ── Aggregated Price Data ──────────────────────────────────────────────────────

export interface PriceRange {
  min: number;
  max: number;
  avg: number;
  count: number;
}

export interface TreatmentPriceData {
  treatment: Treatment;
  national: PriceRange;
  byCity?: Record<string, PriceRange>;
  bySources: {
    sourceName: string;
    sourceType: string;
    priceMin: number | null;
    priceMax: number | null;
    priceExact: number | null;
    zone: string | null;
  }[];
}

export interface CityTreatmentPriceData {
  treatment: Treatment;
  city: City;
  local: PriceRange;
  national: PriceRange;
  differencePercent: number;
  sources: {
    sourceName: string;
    sourceType: string;
    priceMin: number | null;
    priceMax: number | null;
    priceExact: number | null;
  }[];
}

// ── SEO Types ──────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ── Treatment Categories ───────────────────────────────────────────────────────

export type TreatmentCategory =
  | "diagnostico"
  | "odontologia-general"
  | "endodoncia"
  | "periodoncia"
  | "cirugia-oral"
  | "implantologia"
  | "ortodoncia"
  | "estetica"
  | "protesis";

export const TREATMENT_CATEGORY_LABELS: Record<TreatmentCategory, string> = {
  diagnostico: "Diagnóstico y Prevención",
  "odontologia-general": "Odontología General",
  endodoncia: "Endodoncia",
  periodoncia: "Periodoncia",
  "cirugia-oral": "Cirugía Oral",
  implantologia: "Implantología",
  ortodoncia: "Ortodoncia",
  estetica: "Estética Dental",
  protesis: "Prótesis",
};

// ── Insurance Zone ─────────────────────────────────────────────────────────────

export const ZONE_COMMUNITIES: Record<string, string[]> = {
  A: [
    "Andalucía",
    "Canarias",
    "Castilla-La Mancha",
    "Extremadura",
    "Región de Murcia",
  ],
  B: [
    "Comunidad de Madrid",
    "Cataluña",
    "País Vasco",
    "Comunidad Foral de Navarra",
    "Aragón",
    "Illes Balears",
    "La Rioja",
    "Cantabria",
    "Principado de Asturias",
    "Galicia",
    "Castilla y León",
    "Comunitat Valenciana",
  ],
};
