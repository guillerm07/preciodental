import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Sobre nosotros — PrecioDental",
  description:
    "PrecioDental es el primer comparador transparente de precios dentales en España. Nuestra misión es que nadie pague de más por ir al dentista.",
  path: "/sobre-nosotros",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Sobre nosotros", href: "/sobre-nosotros" },
        ]}
      />

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance">
        Sobre PrecioDental
      </h1>
      <p className="mt-2 text-zinc-500 text-pretty">
        El primer comparador transparente de precios dentales en España.
      </p>

      <div className="mt-10 space-y-8">
        {/* El problema */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            El problema que resolvemos
          </h2>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            En España, los precios de los tratamientos dentales son un misterio
            para la mayoría de pacientes. Un mismo implante dental puede costar
            entre 600&euro; y 1.800&euro; dependiendo de la clínica, la ciudad y
            si tienes seguro dental. Según un estudio de FACUA, la diferencia
            de precio por un mismo tratamiento puede superar el 1.000%.
          </p>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            Esta falta de transparencia perjudica al paciente. Sin referencias
            claras, es imposible saber si un presupuesto es justo, caro o
            barato. Muchas personas retrasan tratamientos necesarios por miedo
            al coste, o aceptan presupuestos abusivos por desconocimiento.
          </p>
        </section>

        {/* Nuestra solución */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Nuestra solución
          </h2>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            <strong>PrecioDental.net</strong> recopila datos de precios de
            fuentes públicas y verificables: baremos oficiales de aseguradoras
            dentales, tarifas publicadas por cadenas y clínicas, y reportes de
            precios reales enviados por pacientes. Cruzamos, normalizamos y
            presentamos toda esta información de forma clara para que, antes de
            ir al dentista, sepas cuánto cuesta cada tratamiento en tu ciudad.
          </p>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            No somos una clínica, ni una aseguradora, ni un intermediario. No
            vendemos tratamientos ni derivamos pacientes. Solo ofrecemos
            información. Nuestro objetivo es que tengas las herramientas para
            tomar decisiones informadas sobre tu salud dental.
          </p>
        </section>

        {/* Valores */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Nuestros valores
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Transparencia",
                desc: "Todos nuestros datos provienen de fuentes públicas. Citamos las fuentes, explicamos nuestra metodología y reconocemos nuestras limitaciones. Si un dato puede ser inexacto, lo decimos.",
              },
              {
                title: "Objetividad",
                desc: "No favorecemos a ninguna clínica, cadena o aseguradora. Mostramos los datos tal como son, sin sesgo comercial. No aceptamos pagos de clínicas por posicionamiento.",
              },
              {
                title: "Privacidad",
                desc: "No pedimos datos personales para consultar precios. Los reportes de usuarios son anónimos. No compartimos ni vendemos información de nuestros visitantes.",
              },
              {
                title: "Independencia",
                desc: "PrecioDental no tiene vinculación con ninguna clínica dental, cadena, aseguradora ni colegio profesional. Nuestra independencia garantiza la imparcialidad de los datos.",
              },
            ].map((v) => (
              <Card key={v.title} padding="md">
                <h3 className="font-semibold text-zinc-900">{v.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed text-pretty">
                  {v.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Para quién */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Para quién es PrecioDental
          </h2>
          <p className="mt-3 text-zinc-600 leading-relaxed text-pretty">
            PrecioDental es útil para cualquier persona que necesite un
            tratamiento dental en España y quiera saber cuánto debería costar.
            Ya sea para comparar el presupuesto que te ha dado tu dentista,
            decidir si merece la pena contratar un seguro dental para un
            tratamiento concreto, o simplemente para hacerte una idea antes de
            pedir cita. Toda la información es gratuita y de libre acceso.
          </p>
        </section>

        {/* Contacto */}
        <section>
          <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-5">
            <h2 className="font-semibold text-zinc-900">Contacto</h2>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed text-pretty">
              Si tienes preguntas, sugerencias o detectas un error en nuestros
              datos, escríbenos a{" "}
              <a
                href="mailto:contacto@preciodental.net"
                className="font-medium text-zinc-900 underline underline-offset-2"
              >
                contacto@preciodental.net
              </a>
              . Valoramos cada mensaje y respondemos en un plazo máximo de
              48 horas laborables.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
