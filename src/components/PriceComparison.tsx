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

export function PriceComparison({ prices, className = "" }: PriceComparisonProps) {
  if (prices.length === 0) return null;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Fuente</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Tipo</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-900">Precio</th>
            {prices.some((p) => p.zone) && (
              <th className="px-4 py-3 text-center font-semibold text-gray-900">Zona</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {prices.map((price, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900">
                {price.sourceName}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {SOURCE_TYPE_LABELS[price.sourceType] || price.sourceType}
              </td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">
                {price.priceExact
                  ? formatPrice(price.priceExact)
                  : price.priceMin != null || price.priceMax != null
                  ? `${formatPrice(price.priceMin)} - ${formatPrice(price.priceMax)}`
                  : "Consultar"}
              </td>
              {prices.some((p) => p.zone) && (
                <td className="px-4 py-3 text-center">
                  {price.zone && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                      Zona {price.zone}
                    </span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
