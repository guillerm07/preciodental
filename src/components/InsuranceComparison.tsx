import { formatPrice, formatPercent } from "@/lib/utils/format";

interface InsuranceComparisonProps {
  withoutInsurance: { min: number; max: number };
  withInsurance: { min: number; max: number };
  className?: string;
}

export function InsuranceComparison({
  withoutInsurance,
  withInsurance,
  className = "",
}: InsuranceComparisonProps) {
  const avgWithout = (withoutInsurance.min + withoutInsurance.max) / 2;
  const avgWith = (withInsurance.min + withInsurance.max) / 2;
  const savingsPercent = avgWithout > 0 ? ((avgWithout - avgWith) / avgWithout) * 100 : 0;
  const savingsAmount = avgWithout - avgWith;

  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3 ${className}`}>
      <div className="rounded-2xl border border-zinc-200/60 bg-white p-5 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Sin seguro</p>
        <p className="mt-2 text-2xl font-bold text-zinc-900 tabular-nums">
          {formatPrice(withoutInsurance.min)} — {formatPrice(withoutInsurance.max)}
        </p>
        <p className="mt-1 text-sm text-zinc-500">Precio de mercado</p>
      </div>
      <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5 shadow-glow-primary">
        <p className="text-xs font-medium uppercase tracking-wider text-primary-600">Con seguro dental</p>
        <p className="mt-2 text-2xl font-bold text-primary-700 tabular-nums">
          {formatPrice(withInsurance.min)} — {formatPrice(withInsurance.max)}
        </p>
        <p className="mt-1 text-sm text-primary-600/70">Baremo aseguradoras</p>
      </div>
      <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50 p-5 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Ahorro medio</p>
        <p className="mt-2 text-2xl font-bold text-zinc-900 tabular-nums">
          ~{formatPrice(Math.round(savingsAmount))}
        </p>
        <p className="mt-1 text-sm font-semibold text-primary-600">
          ~{Math.round(savingsPercent)}% menos
        </p>
      </div>
    </div>
  );
}
