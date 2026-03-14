import { formatPrice, formatPercent } from "@/lib/utils/format";
import { Card } from "@/components/ui/Card";

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

  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3 ${className}`}>
      <Card className="text-center">
        <p className="text-sm font-medium text-gray-500">Sin seguro</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">
          {formatPrice(withoutInsurance.min)} - {formatPrice(withoutInsurance.max)}
        </p>
      </Card>
      <Card className="text-center border-accent-200 bg-accent-50">
        <p className="text-sm font-medium text-accent-700">Con seguro dental</p>
        <p className="mt-1 text-2xl font-bold text-accent-600">
          {formatPrice(withInsurance.min)} - {formatPrice(withInsurance.max)}
        </p>
      </Card>
      <Card className="text-center">
        <p className="text-sm font-medium text-gray-500">Ahorro medio</p>
        <p className="mt-1 text-2xl font-bold text-green-600">
          ~{formatPercent(savingsPercent).replace("+", "")}
        </p>
      </Card>
    </div>
  );
}
