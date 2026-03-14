import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Política de cookies",
  path: "/cookies",
  noIndex: true,
});

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Cookies", href: "/cookies" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">Política de cookies</h1>

      <div className="mt-6 prose prose-gray max-w-none">
        <h2>¿Qué cookies utilizamos?</h2>
        <p>
          PrecioDental.net utiliza las mínimas cookies necesarias para el
          funcionamiento del sitio:
        </p>
        <ul>
          <li>
            <strong>admin_auth:</strong> Cookie de sesión para el panel de
            administración. Solo se establece cuando un administrador inicia
            sesión.
          </li>
        </ul>

        <h2>Analítica</h2>
        <p>
          Utilizamos Plausible Analytics, un servicio de analítica web que
          respeta la privacidad y <strong>no utiliza cookies</strong>. No
          recopila datos personales ni rastrea a los usuarios.
        </p>

        <h2>Cookies de terceros</h2>
        <p>No utilizamos cookies de terceros, publicidad ni tracking.</p>
      </div>
    </div>
  );
}
