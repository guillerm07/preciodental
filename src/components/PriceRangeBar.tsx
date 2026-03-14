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

  const heights = { sm: "h-3", md: "h-4", lg: "h-6" };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };

  return (
    <div className={`w-full ${className}`}>
      {/* Labels */}
      <div className={`flex items-end justify-between mb-2 ${textSizes[size]}`}>
        <div>
          <p className="text-gray-400 text-xs">Mínimo</p>
          <p className="font-bold text-accent-600">{formatPrice(min)}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs">Media</p>
          <p className="font-bold text-primary-600 text-lg">{formatPrice(avg)}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs">Máximo</p>
          <p className="font-bold text-gray-500">{formatPrice(max)}</p>
        </div>
      </div>

      {/* Bar */}
      <div className="relative">
        <div
          className={`w-full rounded-full ${heights[size]} overflow-hidden`}
          style={{
            background: "linear-gradient(to right, #10b981, #3b82f6, #ef4444)",
          }}
        />

        {/* Average marker */}
        <div
          className="absolute top-0 -translate-x-1/2"
          style={{ left: `${Math.min(Math.max(avgPosition, 5), 95)}%` }}
        >
          <div
            className={`w-1 bg-primary-800 rounded-full ${
              size === "lg" ? "h-8 -mt-1" : "h-6 -mt-1"
            }`}
          />
          <div className="text-xs font-semibold text-primary-700 mt-0.5 whitespace-nowrap -translate-x-1/4">
            Media
          </div>
        </div>

        {/* Highlight marker */}
        {highlightPosition != null && highlightValue && (
          <div
            className="absolute top-0 -translate-x-1/2"
            style={{
              left: `${Math.min(Math.max(highlightPosition, 5), 95)}%`,
            }}
          >
            <div className="w-2 h-8 -mt-1 bg-yellow-500 rounded-full border-2 border-white shadow" />
            <div className="text-xs font-bold text-yellow-700 mt-0.5 whitespace-nowrap">
              {highlightLabel || formatPrice(highlightValue)}
            </div>
          </div>
        )}
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-300">{formatPrice(min)}</span>
        <span className="text-[10px] text-gray-300">{formatPrice(max)}</span>
      </div>
    </div>
  );
}
