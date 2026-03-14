import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils/format";
import type { PriceRange } from "@/types";

interface PriceCardProps {
  treatmentName: string;
  treatmentSlug: string;
  citySlug?: string;
  priceRange: PriceRange;
  className?: string;
}

export function PriceCard({
  treatmentName,
  treatmentSlug,
  citySlug,
  priceRange,
  className = "",
}: PriceCardProps) {
  const href = citySlug
    ? `/tratamientos/${treatmentSlug}/${citySlug}`
    : `/tratamientos/${treatmentSlug}`;

  return (
    <Link href={href} className={`block group ${className}`}>
      <Card className="transition-shadow hover:shadow-md group-hover:border-primary-300">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {treatmentName}
        </h3>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">Desde</p>
            <p className="text-xl font-bold text-accent-600">
              {formatPrice(priceRange.min)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Media</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(priceRange.avg)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Hasta</p>
            <p className="text-lg font-semibold text-gray-500">
              {formatPrice(priceRange.max)}
            </p>
          </div>
        </div>

        {priceRange.count > 0 && (
          <p className="mt-2 text-xs text-gray-400">
            Basado en {priceRange.count} fuente{priceRange.count > 1 ? "s" : ""}
          </p>
        )}
      </Card>
    </Link>
  );
}
