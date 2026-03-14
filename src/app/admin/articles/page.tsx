"use client";

import { Card } from "@/components/ui/Card";

export default function AdminArticlesPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">Gestión de artículos</h1>
      <Card className="mt-6 text-center">
        <p className="text-gray-600">
          La gestión de artículos estará disponible en la Fase 3.
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Los artículos se generan con Gemini 2.5 Flash y se almacenan en la base de datos.
        </p>
      </Card>
    </>
  );
}
