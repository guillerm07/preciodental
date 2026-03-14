"use client";

import { formatPrice } from "@/lib/utils/format";

interface PriceRangeBarProps {
  min: number;
  max: number;
  avg: number;
  highlightValue?: number;
  highlightLabel?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceRangeBar({
  min,
  max,
  avg,
  highlightValue,
  highlightLabel,
  size = "md",
  className = "",
}: PriceRangeBarProps) {
  const range = max - min;
  const avgPosition = range > 0 ? ((avg - min) / range) * 100 : 50;
  const highlightPosition =
    highlightValue && range > 0
      ? ((highlightValue - min) / range) * 100
      : null;

  const heights = { sm: "h-2", md: "h-3", lg: "h-4" };

  return (
    <div className={`w-full ${className}`}>
      {/* Labels */}
      {size !== "sm" && (
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Mínimo</p>
            <p className="text-lg font-semibold text-primary-600 tabular-nums">{formatPrice(min)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Media</p>
            <p className="text-2xl font-bold text-zinc-900 tabular-nums">{formatPrice(avg)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Máximo</p>
            <p className="text-lg font-semibold text-zinc-500 tabular-nums">{formatPrice(max)}</p>
          </div>
        </div>
      )}

      {/* Bar */}
      <div className="relative">
        <div
          className={`w-full rounded-full ${heights[size]} overflow-hidden`}
          style={{
            background: "linear-gradient(to right, #22c55e, #facc15, #ef4444)",
          }}
        />

        {/* Average marker */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${Math.min(Math.max(avgPosition, 4), 96)}%` }}
        >
          <div className={`rounded-full bg-zinc-900 border-2 border-white shadow-md ${
            size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"
          }`} />
        </div>

        {/* Highlight marker */}
        {highlightPosition != null && highlightValue && (
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${Math.min(Math.max(highlightPosition, 4), 96)}%`,
            }}
          >
            <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-white shadow-md" />
            {size !== "sm" && (
              <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                {highlightLabel || formatPrice(highlightValue)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Scale labels */}
      {size !== "sm" && (
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-zinc-300 tabular-nums">{formatPrice(min)}</span>
          <span className="text-[10px] text-zinc-300 tabular-nums">{formatPrice(max)}</span>
        </div>
      )}
    </div>
  );
}
