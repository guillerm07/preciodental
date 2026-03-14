import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Aviso legal",
  path: "/aviso-legal",
  noIndex: true,
});

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Aviso legal", href: "/aviso-legal" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">Aviso legal</h1>

      <div className="mt-6 prose prose-gray max-w-none">
        <h2>Titularidad del sitio web</h2>
        <p>
          PrecioDental.net es un servicio de información y comparación de precios
          de tratamientos dentales. Correo electrónico: contacto@preciodental.net
        </p>

        <h2>Condiciones de uso</h2>
        <p>
          La información ofrecida en PrecioDental.net tiene carácter meramente
          informativo y orientativo. Los precios mostrados están basados en datos
          públicos de aseguradoras, cadenas dentales y clínicas que publican sus
          tarifas.
        </p>

        <h2>Limitación de responsabilidad</h2>
        <p>
          PrecioDental.net no garantiza la exactitud ni la actualidad de los
          precios mostrados. El precio final de cualquier tratamiento dental
          depende del diagnóstico del profesional. No nos hacemos responsables de
          las decisiones tomadas en base a la información publicada.
        </p>

        <h2>Propiedad intelectual</h2>
        <p>
          Los datos de precios provienen de fuentes públicas. El diseño, código y
          contenido original de PrecioDental.net están protegidos por derechos de
          propiedad intelectual.
        </p>
      </div>
    </div>
  );
}
