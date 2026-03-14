import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Política de privacidad",
  path: "/privacidad",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Privacidad", href: "/privacidad" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">Política de privacidad</h1>

      <div className="mt-6 prose prose-gray max-w-none">
        <p>Última actualización: marzo 2026</p>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          PrecioDental.net es un proyecto informativo de comparación de precios
          dentales. Correo de contacto: contacto@preciodental.net
        </p>

        <h2>2. Datos que recopilamos</h2>
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> nombre, email, asunto y
            mensaje.
          </li>
          <li>
            <strong>Reporte de precios:</strong> tratamiento, ciudad, precio
            pagado (no recopilamos datos personales del paciente).
          </li>
          <li>
            <strong>Newsletter:</strong> dirección de email.
          </li>
          <li>
            <strong>Datos de navegación:</strong> utilizamos Plausible Analytics,
            que es privado por diseño y no utiliza cookies.
          </li>
        </ul>

        <h2>3. Finalidad</h2>
        <p>
          Los datos se utilizan exclusivamente para responder consultas, mejorar
          la base de datos de precios y enviar newsletters si el usuario se ha
          suscrito voluntariamente.
        </p>

        <h2>4. Derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión y
          portabilidad enviando un email a contacto@preciodental.net.
        </p>

        <h2>5. Seguridad</h2>
        <p>
          Los datos se almacenan en servidores seguros. Las direcciones IP se
          almacenan como hash irreversible para prevenir abusos.
        </p>
      </div>
    </div>
  );
}
