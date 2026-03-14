import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://preciodental.net";
const SITE_NAME = "PrecioDental";
const DEFAULT_DESCRIPTION =
  "Compara precios de tratamientos dentales en España. Datos reales de aseguradoras, cadenas y clínicas. Implantes, ortodoncia, blanqueamiento y más.";

interface MetadataParams {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  noIndex = false,
}: MetadataParams): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function generateTreatmentMetadata(
  treatmentName: string,
  slug: string
): Metadata {
  return generatePageMetadata({
    title: `Precio ${treatmentName} en España (2026)`,
    description: `¿Cuánto cuesta ${treatmentName.toLowerCase()} en España? Compara precios de ${treatmentName.toLowerCase()} entre aseguradoras y clínicas. Rango de precios actualizado 2026.`,
    path: `/tratamientos/${slug}`,
  });
}

export function generateTreatmentCityMetadata(
  treatmentName: string,
  treatmentSlug: string,
  cityName: string,
  citySlug: string,
  priceMin?: number,
  priceMax?: number
): Metadata {
  const priceText =
    priceMin && priceMax
      ? ` desde ${priceMin}€ hasta ${priceMax}€`
      : "";
  return generatePageMetadata({
    title: `Precio ${treatmentName} en ${cityName} (2026)`,
    description: `Precio de ${treatmentName.toLowerCase()} en ${cityName}${priceText}. Compara precios entre aseguradoras y clínicas en ${cityName}. Datos actualizados 2026.`,
    path: `/tratamientos/${treatmentSlug}/${citySlug}`,
  });
}

export function generateCityMetadata(
  cityName: string,
  slug: string
): Metadata {
  return generatePageMetadata({
    title: `Precios dentales en ${cityName} (2026)`,
    description: `Todos los precios de tratamientos dentales en ${cityName}. Compara implantes, ortodoncia, blanqueamiento y más en ${cityName}. Datos actualizados 2026.`,
    path: `/ciudades/${slug}`,
  });
}

export function generateInsuranceMetadata(
  insuranceName: string,
  slug: string
): Metadata {
  return generatePageMetadata({
    title: `Precios dentales ${insuranceName} (2026)`,
    description: `Tarifas y precios de tratamientos dentales con ${insuranceName}. Baremo completo actualizado 2026 con todos los tratamientos.`,
    path: `/seguros-dentales/${slug}`,
  });
}
