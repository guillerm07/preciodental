import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Buscar",
  path: "/buscar",
  noIndex: true,
});

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Buscar", href: "/buscar" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">Buscar</h1>
      <p className="mt-2 text-gray-600">
        Busca tratamientos, ciudades y artículos.
      </p>

      <div className="mt-8" id="search">
        {/* Pagefind UI will be injected here after build */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-500">
            La búsqueda estará disponible después del primer build de producción
            (Pagefind indexa las páginas estáticas).
          </p>
        </div>
      </div>
    </div>
  );
}
