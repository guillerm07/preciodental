import Link from "next/link";
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

  const range = priceRange.max - priceRange.min;
  const avgPos = range > 0 ? ((priceRange.avg - priceRange.min) / range) * 100 : 50;

  return (
    <Link href={href} className={`block group ${className}`}>
      <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
            {treatmentName}
          </h3>
          <span className="shrink-0 text-xl font-extrabold text-primary-600">
            {formatPrice(priceRange.avg)}
          </span>
        </div>

        {/* Mini range bar */}
        <div className="mt-3 relative">
          <div
            className="h-2 w-full rounded-full overflow-hidden"
            style={{
              background: "linear-gradient(to right, #10b981, #3b82f6, #ef4444)",
            }}
          />
          {/* Average marker */}
          <div
            className="absolute top-0 -translate-x-1/2"
            style={{ left: `${Math.min(Math.max(avgPos, 5), 95)}%` }}
          >
            <div className="w-0.5 h-4 -mt-1 bg-gray-800 rounded-full" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-accent-600 font-semibold">{formatPrice(priceRange.min)}</span>
          <span className="text-gray-400">{priceRange.count} fuente{priceRange.count > 1 ? "s" : ""}</span>
          <span className="text-gray-500">{formatPrice(priceRange.max)}</span>
        </div>
      </div>
    </Link>
  );
}
