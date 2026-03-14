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
      <div className="rounded-2xl border border-zinc-200/60 bg-white p-5 shadow-soft transition-all duration-200 hover:shadow-elevated hover:border-zinc-300/60 press-scale">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-zinc-900 group-hover:text-primary-700 transition-colors leading-snug">
            {treatmentName}
          </h3>
          <span className="shrink-0 text-xl font-bold text-zinc-900 tabular-nums">
            {formatPrice(priceRange.avg)}
          </span>
        </div>

        {/* Mini range bar */}
        <div className="mt-4 relative">
          <div
            className="h-1.5 w-full rounded-full overflow-hidden"
            style={{
              background: "linear-gradient(to right, #22c55e, #facc15, #ef4444)",
            }}
          />
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${Math.min(Math.max(avgPos, 6), 94)}%` }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border-2 border-white shadow-sm" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-xs">
          <span className="text-primary-600 font-medium tabular-nums">{formatPrice(priceRange.min)}</span>
          <span className="text-zinc-400">
            {priceRange.count} fuente{priceRange.count > 1 ? "s" : ""}
          </span>
          <span className="text-zinc-500 tabular-nums">{formatPrice(priceRange.max)}</span>
        </div>
      </div>
    </Link>
  );
}
