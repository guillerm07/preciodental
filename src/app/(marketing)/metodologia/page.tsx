import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Metodología — Cómo recopilamos los datos",
  description:
    "Nuestra metodología para recopilar y verificar precios dentales en España. Fuentes, proceso de normalización y actualización.",
  path: "/metodologia",
});

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Metodología", href: "/metodologia" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">Metodología</h1>

      <div className="mt-6 prose prose-gray max-w-none">
        <h2>Fuentes de datos</h2>
        <p>
          Los precios que mostramos provienen de fuentes públicas y verificables:
        </p>
        <ul>
          <li>
            <strong>Baremos de aseguradoras:</strong> PDFs públicos de Sanitas,
            Adeslas, Cigna, Caser, Generali, AXA y Mapfre que detallan los
            precios máximos por tratamiento.
          </li>
          <li>
            <strong>Webs de cadenas dentales:</strong> Precios publicados en las
            webs de Vitaldent, Sanitas Dental, Adeslas Dental y otras cadenas.
          </li>
          <li>
            <strong>Clínicas independientes:</strong> Precios publicados en webs
            de clínicas que eligen mostrar sus tarifas.
          </li>
          <li>
            <strong>Reportes de usuarios:</strong> Precios reales pagados por
            pacientes a través de nuestro formulario de crowdsourcing.
          </li>
        </ul>

        <h2>Proceso</h2>
        <ol>
          <li>Descargamos los PDFs de baremos de aseguradoras.</li>
          <li>
            Extraemos los datos con IA (Gemini Vision) y los verificamos
            manualmente.
          </li>
          <li>
            Normalizamos los nombres de tratamientos para poder comparar entre
            fuentes (cada aseguradora usa nomenclaturas diferentes).
          </li>
          <li>
            Calculamos rangos (mínimo, máximo, media) por tratamiento y ciudad.
          </li>
          <li>
            Actualizamos los datos cuando las aseguradoras publican nuevos
            baremos.
          </li>
        </ol>

        <h2>Zonas geográficas</h2>
        <p>
          Las aseguradoras dividen España en dos zonas con precios diferentes:
        </p>
        <ul>
          <li>
            <strong>Zona A</strong> (precios más bajos): Andalucía, Canarias,
            Castilla-La Mancha, Extremadura, Murcia.
          </li>
          <li>
            <strong>Zona B</strong> (precios más altos): Madrid, Cataluña, País
            Vasco, Navarra, Aragón, Baleares, y resto de comunidades.
          </li>
        </ul>

        <h2>Limitaciones</h2>
        <p>
          Los precios que mostramos son orientativos. El precio final de un
          tratamiento depende del diagnóstico del profesional, la complejidad del
          caso, los materiales utilizados y otros factores. Recomendamos siempre
          solicitar un presupuesto por escrito antes de iniciar cualquier
          tratamiento.
        </p>
      </div>
    </div>
  );
}
