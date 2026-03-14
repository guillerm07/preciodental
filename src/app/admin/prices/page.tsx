"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils/format";

interface PriceRow {
  id: number;
  treatmentName: string;
  cityName: string | null;
  sourceName: string;
  sourceType: string;
  priceMin: string | null;
  priceMax: string | null;
  priceExact: string | null;
  zone: string | null;
  year: number;
  verified: boolean;
}

export default function AdminPricesPage() {
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/prices")
      .then((r) => r.json())
      .then((data) => {
        setPrices(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de precios</h1>
        <p className="text-sm text-gray-500">{prices.length} registros</p>
      </div>

      <Card className="mt-6" padding="sm">
        {loading ? (
          <p className="p-6 text-gray-500">Cargando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-3 py-2 text-left font-semibold">Tratamiento</th>
                  <th className="px-3 py-2 text-left font-semibold">Ciudad</th>
                  <th className="px-3 py-2 text-left font-semibold">Fuente</th>
                  <th className="px-3 py-2 text-right font-semibold">Precio</th>
                  <th className="px-3 py-2 text-center font-semibold">Zona</th>
                  <th className="px-3 py-2 text-center font-semibold">Año</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prices.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{p.treatmentName}</td>
                    <td className="px-3 py-2 text-gray-500">{p.cityName || "Nacional"}</td>
                    <td className="px-3 py-2 text-gray-500">{p.sourceName}</td>
                    <td className="px-3 py-2 text-right font-medium">
                      {p.priceExact
                        ? formatPrice(Number(p.priceExact))
                        : `${formatPrice(Number(p.priceMin))} - ${formatPrice(Number(p.priceMax))}`}
                    </td>
                    <td className="px-3 py-2 text-center text-gray-500">{p.zone || "—"}</td>
                    <td className="px-3 py-2 text-center text-gray-500">{p.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
