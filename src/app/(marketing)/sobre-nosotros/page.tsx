import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Sobre nosotros",
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

      <h1 className="text-3xl font-bold text-gray-900">Sobre PrecioDental</h1>

      <div className="mt-6 space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong>PrecioDental.net</strong> es el primer comparador transparente
          de precios de tratamientos dentales en España. Nuestra misión es
          sencilla: que nadie pague de más por ir al dentista.
        </p>

        <p>
          En España, la diferencia de precio por un mismo tratamiento dental
          puede llegar al <strong>1.036%</strong> según un estudio de FACUA. Un
          implante dental puede costar desde 900€ hasta 1.800€ dependiendo de la
          clínica y la ciudad. Esa falta de transparencia perjudica al paciente.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">Cómo funciona</h2>
        <p>
          Recopilamos datos de precios de fuentes públicas: baremos de
          aseguradoras (Sanitas, Adeslas, Cigna...), precios de cadenas dentales
          (Vitaldent) y clínicas que publican sus tarifas. Los agregamos,
          normalizamos y los mostramos de forma clara.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">
          Nuestros valores
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          {[
            { title: "Transparencia", desc: "Datos públicos, fuentes citadas, metodología abierta." },
            { title: "Independencia", desc: "No somos clínica ni aseguradora. Comparamos para ti." },
            { title: "Actualización", desc: "Datos actualizados con las tarifas más recientes." },
          ].map((v) => (
            <Card key={v.title}>
              <h3 className="font-semibold text-gray-900">{v.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{v.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
