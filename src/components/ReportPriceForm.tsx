"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

interface Option {
  name: string;
  slug: string;
}

interface ReportPriceFormProps {
  treatments: Option[];
  cities: Option[];
}

export function ReportPriceForm({ treatments, cities }: ReportPriceFormProps) {
  const [form, setForm] = useState({
    treatmentSlug: "",
    citySlug: "",
    clinicName: "",
    pricePaid: "",
    hadInsurance: false,
    insuranceName: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/report-price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        pricePaid: parseFloat(form.pricePaid),
      }),
    });

    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <Card className="mt-8 text-center">
        <p className="text-lg font-semibold text-accent-600">
          Gracias por tu aportación
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Tu reporte será revisado y añadido a la base de datos.
        </p>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tratamiento *
          </label>
          <select
            value={form.treatmentSlug}
            onChange={(e) => setForm({ ...form, treatmentSlug: e.target.value })}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">Selecciona un tratamiento</option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ciudad *
          </label>
          <select
            value={form.citySlug}
            onChange={(e) => setForm({ ...form, citySlug: e.target.value })}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">Selecciona una ciudad</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio pagado (€) *
          </label>
          <input
            type="number"
            value={form.pricePaid}
            onChange={(e) => setForm({ ...form, pricePaid: e.target.value })}
            required
            min="0"
            step="0.01"
            placeholder="Ej: 1200"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre de la clínica (opcional)
          </label>
          <input
            type="text"
            value={form.clinicName}
            onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
            placeholder="Ej: Clínica Dental García"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hadInsurance"
            checked={form.hadInsurance}
            onChange={(e) =>
              setForm({ ...form, hadInsurance: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="hadInsurance" className="text-sm text-gray-700">
            Tenía seguro dental
          </label>
        </div>

        {form.hadInsurance && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ¿Qué aseguradora?
            </label>
            <input
              type="text"
              value={form.insuranceName}
              onChange={(e) =>
                setForm({ ...form, insuranceName: e.target.value })
              }
              placeholder="Ej: Sanitas, Adeslas..."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-red-600">
            Error al enviar. Inténtalo de nuevo.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-primary-600 py-2.5 font-medium text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? "Enviando..." : "Enviar reporte"}
        </button>

        <p className="text-xs text-gray-400">
          Tu IP se almacena como hash anónimo para prevenir abusos. No
          recopilamos datos personales.
        </p>
      </form>
    </Card>
  );
}
