import type { Treatment, City } from "@/types";

interface InternalLink {
  text: string;
  href: string;
}

export function getTreatmentLinks(
  treatments: Pick<Treatment, "name" | "slug">[],
  exclude?: string
): InternalLink[] {
  return treatments
    .filter((t) => t.slug !== exclude)
    .map((t) => ({
      text: `Precio ${t.name.toLowerCase()}`,
      href: `/tratamientos/${t.slug}`,
    }));
}

export function getCityLinks(
  cities: Pick<City, "name" | "slug">[],
  treatmentSlug: string,
  exclude?: string
): InternalLink[] {
  return cities
    .filter((c) => c.slug !== exclude)
    .map((c) => ({
      text: c.name,
      href: `/tratamientos/${treatmentSlug}/${c.slug}`,
    }));
}
