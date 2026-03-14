import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Metodología — Cómo recopilamos y verificamos los precios dentales",
  description:
    "Nuestra metodología para recopilar, normalizar y verificar precios dentales en España. Tres fuentes de datos, proceso de verificación, zonas geográficas y limitaciones.",
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

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance">
        Metodología: cómo recopilamos los precios dentales
      </h1>
      <p className="mt-2 text-zinc-500 text-pretty">
        Transparencia total sobre nuestras fuentes, procesos de verificación y
        las limitaciones de los datos que mostramos.
      </p>

      <div className="mt-10 space-y-10">
        {/* Fuentes de datos */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Nuestras tres fuentes de datos
          </h2>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            Para ofrecer rangos de precios fiables, cruzamos información de tres
            fuentes independientes. Ninguna fuente por sí sola ofrece una imagen
            completa del mercado, pero combinándolas conseguimos una
            aproximación realista.
          </p>

          <div className="mt-6 grid gap-4">
            <Card padding="md">
              <h3 className="font-semibold text-zinc-900">
                1. Baremos de aseguradoras (PDFs oficiales)
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed text-pretty">
                Las aseguradoras dentales (Sanitas, Adeslas, Cigna, Caser,
                Generali, AXA, Mapfre, entre otras) publican anualmente sus
                baremos de precios máximos en formato PDF. Estos documentos
                detallan el precio máximo que las clínicas de su cuadro médico
                pueden cobrar por cada tratamiento. Descargamos estos PDFs y los
                procesamos mediante inteligencia artificial (Gemini Vision) para
                extraer automáticamente cada tratamiento y su precio. Después,
                un proceso de revisión manual verifica que la extracción sea
                correcta, especialmente en tratamientos con nomenclatura
                ambigua.
              </p>
            </Card>

            <Card padding="md">
              <h3 className="font-semibold text-zinc-900">
                2. Webs de cadenas y clínicas dentales
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed text-pretty">
                Muchas cadenas dentales como Vitaldent, Sanitas Dental o Adeslas
                Dental publican sus tarifas en sus páginas web. También hay
                clínicas independientes que, apostando por la transparencia,
                muestran sus precios online. Recopilamos esta información de
                forma periódica para tener datos actualizados del mercado
                privado sin seguro.
              </p>
            </Card>

            <Card padding="md">
              <h3 className="font-semibold text-zinc-900">
                3. Reportes de pacientes (crowdsourcing)
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed text-pretty">
                Los usuarios de PrecioDental pueden reportar el precio real que
                han pagado por un tratamiento a través de nuestro formulario.
                Estos datos son especialmente valiosos porque reflejan precios
                reales de mercado, incluyendo clínicas que no publican sus
                tarifas online. Antes de incluir un reporte en nuestros
                cálculos, verificamos que el precio esté dentro de un rango
                razonable para evitar errores o datos falsos.
              </p>
            </Card>
          </div>
        </section>

        {/* Proceso de normalización */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Proceso de normalización y verificación
          </h2>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            Cada aseguradora, cadena y clínica utiliza nombres diferentes para
            los mismos tratamientos. Lo que Sanitas llama &ldquo;obturación
            compuesta de una superficie&rdquo;, Adeslas puede denominarlo
            &ldquo;empaste composite simple&rdquo;. Nuestro proceso de
            normalización agrupa estas variaciones bajo un mismo tratamiento
            estandarizado para que la comparación sea justa.
          </p>
          <div className="mt-5 rounded-2xl border border-zinc-200/60 bg-white shadow-soft overflow-hidden">
            <ol className="divide-y divide-zinc-100">
              {[
                {
                  step: "Extracción",
                  desc: "Los PDFs de aseguradoras se procesan con IA (Gemini Vision) para extraer tratamientos y precios de forma automática.",
                },
                {
                  step: "Verificación manual",
                  desc: "Un revisor comprueba que los datos extraídos son correctos, corrigiendo errores de OCR o interpretación.",
                },
                {
                  step: "Normalización",
                  desc: "Los nombres de tratamientos se mapean a nuestra taxonomía unificada, agrupando variantes y sinónimos.",
                },
                {
                  step: "Cálculo de rangos",
                  desc: "Para cada tratamiento y localización se calcula el precio mínimo, máximo y medio ponderado.",
                },
                {
                  step: "Publicación y monitorización",
                  desc: "Los datos se publican en la web y se monitorizan para detectar anomalías o datos desactualizados.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 px-5 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-500">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-medium text-zinc-900">
                      {item.step}
                    </span>
                    <p className="mt-0.5 text-sm text-zinc-500 text-pretty">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </ol>
          </div>
        </section>

        {/* Zonas geográficas */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Zonas geográficas: Zona A y Zona B
          </h2>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            La mayoría de aseguradoras dentales en España dividen el territorio
            en dos zonas con baremos de precios diferentes. Esta división
            refleja las diferencias reales en el coste de vida y los gastos
            operativos de las clínicas según la ubicación.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Card padding="md">
              <h3 className="font-semibold text-zinc-900">
                Zona A (precios más bajos)
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed text-pretty">
                Incluye comunidades con menor coste de vida: Andalucía, Canarias,
                Castilla-La Mancha, Castilla y León, Extremadura y Murcia. Los
                precios suelen ser entre un 10% y un 20% más bajos que en Zona B.
              </p>
            </Card>
            <Card padding="md">
              <h3 className="font-semibold text-zinc-900">
                Zona B (precios más altos)
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed text-pretty">
                Incluye comunidades con mayor coste de vida: Madrid, Cataluña,
                País Vasco, Navarra, Aragón, Baleares, Comunidad Valenciana,
                Cantabria, Galicia, Asturias y La Rioja. Los alquileres y
                salarios más altos se reflejan en el precio final.
              </p>
            </Card>
          </div>
          <p className="mt-4 text-sm text-zinc-500 text-pretty">
            En PrecioDental, cuando consultas precios por ciudad, aplicamos
            automáticamente la zona correspondiente para que los rangos sean lo
            más precisos posible.
          </p>
        </section>

        {/* Qué significan los rangos */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Qué significan los rangos de precios
          </h2>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            Para cada tratamiento mostramos tres valores: precio mínimo, precio
            medio y precio máximo. El <strong>mínimo</strong> representa el
            precio más bajo que hemos encontrado en nuestras fuentes para ese
            tratamiento en esa zona, generalmente correspondiente a baremos de
            aseguradoras o promociones de cadenas. El{" "}
            <strong>precio medio</strong> es la media ponderada de todas
            nuestras fuentes, dando más peso a datos más recientes. El{" "}
            <strong>máximo</strong> refleja el precio más alto registrado, que
            suele corresponder a clínicas privadas premium o tratamientos con
            materiales de gama alta.
          </p>
        </section>

        {/* Frecuencia de actualización */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Frecuencia de actualización
          </h2>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            Los baremos de aseguradoras se actualizan generalmente una vez al
            año, normalmente en el primer trimestre. Cuando se publican nuevos
            baremos, los incorporamos en un plazo de dos a cuatro semanas. Los
            precios de cadenas y clínicas se revisan trimestralmente. Los
            reportes de usuarios se procesan de forma continua. En la ficha de
            cada tratamiento puedes ver la fecha de la última actualización de
            datos.
          </p>
        </section>

        {/* Limitaciones */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Limitaciones y aviso importante
          </h2>
          <div className="mt-4 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-5">
            <p className="text-sm text-zinc-700 leading-relaxed text-pretty">
              <strong>Los precios que mostramos son orientativos.</strong> El
              precio final de cualquier tratamiento dental depende de múltiples
              factores que solo el profesional puede evaluar tras un
              diagnóstico: la complejidad del caso, los materiales empleados, la
              necesidad de tratamientos complementarios, la experiencia del
              especialista y la ubicación exacta de la clínica.
            </p>
            <p className="mt-3 text-sm text-zinc-700 leading-relaxed text-pretty">
              PrecioDental no es una clínica dental, ni una aseguradora, ni
              intermediario. No ofrecemos diagnósticos, recomendaciones médicas
              ni derivamos pacientes. Nuestro único objetivo es recopilar y
              mostrar datos públicos de precios de forma clara y accesible.
            </p>
            <p className="mt-3 text-sm text-zinc-700 leading-relaxed text-pretty">
              <strong>
                Recomendamos siempre solicitar un presupuesto detallado y por
                escrito
              </strong>{" "}
              antes de iniciar cualquier tratamiento dental. Compara al menos
              dos o tres presupuestos de clínicas diferentes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
