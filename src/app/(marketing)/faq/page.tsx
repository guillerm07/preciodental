import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Preguntas frecuentes sobre precios dentales",
  description:
    "Respuestas a las preguntas más frecuentes sobre precios de tratamientos dentales en España. Seguros, financiación y cómo ahorrar.",
  path: "/faq",
});

const FAQ_ITEMS = [
  {
    question: "¿Los precios que muestran son exactos?",
    answer:
      "Los precios son orientativos y están basados en datos públicos de aseguradoras y clínicas. El precio final depende del diagnóstico del dentista, la complejidad del caso y los materiales utilizados. Siempre pide un presupuesto por escrito.",
  },
  {
    question: "¿De dónde sacan los datos de precios?",
    answer:
      "Recopilamos datos de baremos públicos de aseguradoras (Sanitas, Adeslas, Cigna...), precios publicados en webs de cadenas dentales y clínicas, y reportes de precios de usuarios. Consulta nuestra página de metodología para más detalle.",
  },
  {
    question: "¿Merece la pena un seguro dental?",
    answer:
      "Depende del tratamiento. Para tratamientos caros como implantes u ortodoncia, un seguro dental puede ahorrarte entre un 30% y un 50%. Para tratamientos menores como limpiezas o empastes, el ahorro es menor. Compara el coste anual del seguro con el ahorro esperado.",
  },
  {
    question: "¿Por qué hay tanta diferencia de precios entre clínicas?",
    answer:
      "Las diferencias se deben a la ubicación (Madrid y Barcelona son más caras), los materiales utilizados (circonio vs metal-porcelana), la experiencia del profesional, y si la clínica es independiente o pertenece a una cadena.",
  },
  {
    question: "¿Qué es la Zona A y Zona B de las aseguradoras?",
    answer:
      "Las aseguradoras dentales dividen España en dos zonas: Zona A (más barata) incluye Andalucía, Canarias, Castilla-La Mancha, Extremadura y Murcia. Zona B (más cara) incluye Madrid, Cataluña, País Vasco y el resto de comunidades.",
  },
  {
    question: "¿Se puede financiar un tratamiento dental?",
    answer:
      "Sí, la mayoría de clínicas ofrecen financiación para tratamientos costosos como implantes u ortodoncia. Es habitual encontrar opciones de financiación sin intereses a 12-24 meses.",
  },
  {
    question: "¿Puedo reportar el precio que he pagado?",
    answer:
      'Sí, en nuestra sección "Reportar precio" puedes indicar cuánto has pagado por un tratamiento. Esto nos ayuda a mejorar la precisión de los datos y a ayudar a otros pacientes.',
  },
  {
    question: "¿Con qué frecuencia actualizan los precios?",
    answer:
      "Actualizamos los datos cuando las aseguradoras publican nuevos baremos (generalmente una vez al año) y de forma continua con los datos de clínicas y reportes de usuarios.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Preguntas frecuentes", href: "/faq" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">
        Preguntas frecuentes
      </h1>
      <p className="mt-2 text-gray-600">
        Todo lo que necesitas saber sobre precios dentales en España.
      </p>

      <FAQSection items={FAQ_ITEMS} className="mt-8" />
    </div>
  );
}
