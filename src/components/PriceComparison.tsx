import { formatPrice } from "@/lib/utils/format";

interface PriceRow {
  sourceName: string;
  sourceType: string;
  priceMin: number | null;
  priceMax: number | null;
  priceExact: number | null;
  zone: string | null;
}

interface PriceComparisonProps {
  prices: PriceRow[];
  className?: string;
}

const SOURCE_TYPE_LABELS: Record<string, string> = {
  insurance_pdf: "Aseguradora",
  chain_website: "Cadena dental",
  clinic_website: "Clínica",
  crowdsource: "Usuario",
  manual: "Manual",
};

interface GroupedSource {
  sourceName: string;
  sourceType: string;
  min: number;
  max: number;
  avg: number;
  count: number;
  hasZones: boolean;
  zones: string[];
}

function groupPricesBySource(prices: PriceRow[]): GroupedSource[] {
  const groups = new Map<string, PriceRow[]>();
  for (const p of prices) {
    const key = p.sourceName;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }

  return Array.from(groups.entries()).map(([name, rows]) => {
    const allPrices: number[] = [];
    const zones: string[] = [];
    for (const r of rows) {
      if (r.priceExact != null) allPrices.push(r.priceExact);
      if (r.priceMin != null) allPrices.push(r.priceMin);
      if (r.priceMax != null) allPrices.push(r.priceMax);
      if (r.zone && !zones.includes(r.zone)) zones.push(r.zone);
    }
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    return {
      sourceName: name,
      sourceType: rows[0].sourceType,
      min,
      max,
      avg: Math.round((min + max) / 2),
      count: rows.length,
      hasZones: zones.length > 0,
      zones: zones.sort(),
    };
  }).sort((a, b) => a.min - b.min);
}

export function PriceComparison({ prices, className = "" }: PriceComparisonProps) {
  if (prices.length === 0) return null;

  const grouped = groupPricesBySource(prices);
  const globalMin = Math.min(...grouped.map((g) => g.min));
  const globalMax = Math.max(...grouped.map((g) => g.max));
  const range = globalMax - globalMin || 1;

  return (
    <div className={className}>
      <div className="space-y-2 p-1">
        {grouped.map((source) => {
          const leftPct = ((source.min - globalMin) / range) * 100;
          const widthPct = Math.max(((source.max - source.min) / range) * 100, 2);

          return (
            <div
              key={source.sourceName}
              className="rounded-xl border border-zinc-100 bg-white p-4 hover:border-zinc-200 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {source.sourceName}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-zinc-400">
                      {SOURCE_TYPE_LABELS[source.sourceType] || source.sourceType}
                    </span>
                    {source.hasZones && (
                      <span className="text-xs text-zinc-300">
                        · Zona {source.zones.join(", ")}
                      </span>
                    )}
                    {source.count > 1 && (
                      <span className="text-xs text-zinc-300">
                        · {source.count} datos
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-zinc-900 tabular-nums">
                    {source.min === source.max
                      ? formatPrice(source.min)
                      : `${formatPrice(source.min)} — ${formatPrice(source.max)}`}
                  </p>
                </div>
              </div>

              {/* Visual bar */}
              <div className="mt-3 relative h-2 rounded-full bg-zinc-100">
                <div
                  className="absolute h-2 rounded-full bg-primary-400/70"
                  style={{
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 px-4 text-xs text-zinc-400">
        {grouped.length} fuentes · {prices.length} datos de precios en total
      </p>
    </div>
  );
}
