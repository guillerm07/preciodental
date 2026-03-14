"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

interface Stats {
  treatments: number;
  cities: number;
  prices: number;
  priceReports: number;
  pendingReports: number;
  articles: number;
  contacts: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) {
    return <p className="text-gray-500">Cargando...</p>;
  }

  const cards = [
    { label: "Tratamientos", value: stats.treatments, color: "text-primary-600" },
    { label: "Ciudades", value: stats.cities, color: "text-primary-600" },
    { label: "Precios", value: stats.prices, color: "text-accent-600" },
    { label: "Reportes usuarios", value: stats.priceReports, color: "text-orange-600" },
    { label: "Pendientes de revisión", value: stats.pendingReports, color: "text-red-600" },
    { label: "Artículos", value: stats.articles, color: "text-purple-600" },
    { label: "Mensajes", value: stats.contacts, color: "text-gray-600" },
    { label: "Suscriptores", value: stats.subscribers, color: "text-green-600" },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className={`mt-1 text-3xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
