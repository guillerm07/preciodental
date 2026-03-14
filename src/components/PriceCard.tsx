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
      <div className="relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:shadow-elevated hover:border-primary-200/60 hover:-translate-y-1 press-scale">
        
        {/* Subtle background glow effect on hover */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-100 opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-accent-900 group-hover:text-primary-700 transition-colors leading-snug">
              {treatmentName}
            </h3>
            <span className="shrink-0 text-xl font-bold text-accent-900 tabular-nums">
              {formatPrice(priceRange.avg)}
            </span>
          </div>

          <p className="mt-1 text-xs text-accent-400">Precio medio</p>

          {/* Mini range bar */}
          <div className="mt-5 relative">
            <div
              className="h-1.5 w-full rounded-full overflow-hidden shadow-inner bg-accent-100"
            >
              <div 
                className="h-full bg-gradient-to-r from-primary-400 via-primary-300 to-amber-400 transform origin-left transition-transform duration-700 delay-100 ease-out scale-x-0 group-hover:scale-x-100"
                style={{ width: "100%" }}
              />
              <div 
                className="h-full bg-gradient-to-r from-primary-400 via-primary-300 to-amber-400 absolute top-0 left-0"
                style={{ width: "100%", opacity: 0.5 }}
              />
            </div>
            
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out z-10"
              style={{ left: `${Math.min(Math.max(avgPos, 6), 94)}%` }}
            >
              <div className="w-3 h-3 rounded-full bg-accent-950 border-[2.5px] border-white shadow-sm ring-2 ring-transparent group-hover:ring-primary-200/50 transition-all" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-medium">
            <span className="text-primary-600 tabular-nums bg-primary-50 px-2 py-0.5 rounded-md">{formatPrice(priceRange.min)}</span>
            <span className="text-accent-400 font-normal">
              {priceRange.count} fuente{priceRange.count > 1 ? "s" : ""}
            </span>
            <span className="text-accent-500 tabular-nums bg-accent-50 px-2 py-0.5 rounded-md">{formatPrice(priceRange.max)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
