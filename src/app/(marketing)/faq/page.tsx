import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Preguntas frecuentes sobre precios dentales en España",
  description:
    "Respuestas a las 15 preguntas más frecuentes sobre precios de tratamientos dentales en España: IVA, seguros, zonas, financiación y cómo ahorrar.",
  path: "/faq",
});

const FAQ_ITEMS = [
  {
    question: "¿Los precios que muestran incluyen IVA?",
    answer:
      "Los tratamientos dentales realizados por profesionales sanitarios están exentos de IVA en España según el artículo 20 de la Ley del IVA. Esto incluye la mayoría de tratamientos: empastes, endodoncias, extracciones, implantes, ortodoncia, etc. Sin embargo, los tratamientos puramente estéticos (como el blanqueamiento dental) sí llevan un 21% de IVA. Los precios que mostramos en PrecioDental reflejan los importes tal como aparecen en los baremos de las aseguradoras y en las tarifas de las clínicas, que generalmente ya incluyen el IVA cuando es aplicable.",
  },
  {
    question: "¿Los precios que muestran son exactos?",
    answer:
      "Los precios son orientativos y están basados en datos públicos de aseguradoras, cadenas dentales y reportes de pacientes. El precio final de un tratamiento depende de muchos factores que solo el dentista puede evaluar tras un diagnóstico: la complejidad del caso, los materiales elegidos, si se necesitan tratamientos complementarios y la experiencia del profesional. Nuestros rangos te sirven como referencia para saber si un presupuesto está dentro de lo normal. Siempre recomendamos pedir un presupuesto detallado y por escrito antes de iniciar cualquier tratamiento.",
  },
  {
    question: "¿De dónde sacan los datos de precios?",
    answer:
      "Utilizamos tres fuentes principales. Primera: los baremos oficiales de aseguradoras dentales (Sanitas, Adeslas, Cigna, Caser, Generali, AXA, Mapfre y otras), que son documentos PDF públicos donde detallan los precios máximos por tratamiento. Segunda: los precios publicados en las páginas web de cadenas dentales y clínicas independientes. Tercera: los reportes de precios reales enviados por pacientes a través de nuestro formulario. Puedes consultar todos los detalles en nuestra página de metodología.",
  },
  {
    question: "¿Con qué frecuencia se actualizan los precios?",
    answer:
      "Los baremos de aseguradoras se actualizan generalmente una vez al año, habitualmente en el primer trimestre. Cuando se publican nuevos baremos, los incorporamos en un plazo de dos a cuatro semanas. Los precios de cadenas y clínicas se revisan trimestralmente. Los reportes de usuarios se procesan de forma continua. En cada ficha de tratamiento puedes ver la fecha de la última actualización.",
  },
  {
    question: "¿Qué es la Zona A y la Zona B? ¿Qué zona me corresponde?",
    answer:
      "Las aseguradoras dentales dividen España en dos zonas con precios diferentes. La Zona A (precios más bajos) incluye Andalucía, Canarias, Castilla-La Mancha, Castilla y León, Extremadura y Murcia. La Zona B (precios más altos) incluye Madrid, Cataluña, País Vasco, Navarra, Aragón, Baleares, Comunidad Valenciana, Cantabria, Galicia, Asturias y La Rioja. Esta división refleja las diferencias en el coste de vida y los gastos operativos de las clínicas. Cuando consultas precios por ciudad en PrecioDental, aplicamos automáticamente la zona que corresponde.",
  },
  {
    question: "¿Merece la pena contratar un seguro dental?",
    answer:
      "Depende del tratamiento que necesites. Para tratamientos costosos como implantes dentales (ahorro del 30-50%), coronas, puentes u ortodoncia, un seguro dental suele compensar con creces su coste anual (entre 100€ y 300€/año). Para tratamientos menores como limpiezas o empastes, el ahorro es menor y puede que no compense. Nuestro consejo: suma el coste anual del seguro más los copagos de los tratamientos que necesitas con seguro, y compáralo con el precio sin seguro. Ten en cuenta que muchos seguros tienen periodos de carencia de 3 a 6 meses para tratamientos complejos.",
  },
  {
    question: "¿Por qué hay tanta diferencia de precios entre clínicas?",
    answer:
      "Las diferencias de precio se deben a varios factores. La ubicación es el más importante: una clínica en el centro de Madrid o Barcelona tiene costes operativos mucho más altos que una en una ciudad pequeña. Los materiales también influyen: una corona de circonio cuesta más que una de metal-porcelana, pero es más estética y duradera. La experiencia y especialización del profesional, la tecnología de la clínica (escáner 3D, microscopio, láser) y si es una clínica independiente o parte de una cadena también afectan al precio. Por eso mostramos rangos en lugar de un precio único.",
  },
  {
    question: "¿Puedo reportar el precio que he pagado?",
    answer:
      "Sí, y te animamos a hacerlo. En nuestra sección \"Reportar precio\" puedes indicar cuánto has pagado por un tratamiento, en qué ciudad y si tenías seguro dental. El reporte es completamente anónimo: no pedimos tu nombre, email ni datos de la clínica. Esta información nos ayuda a mejorar la precisión de nuestros datos y a ofrecer rangos más representativos del mercado real. Cada reporte pasa por un proceso de validación antes de incorporarse a nuestros cálculos.",
  },
  {
    question: "¿Cómo puedo ahorrar en el dentista?",
    answer:
      "Hay varias estrategias efectivas. Primera: pide siempre al menos dos o tres presupuestos de clínicas diferentes y compáralos con nuestros rangos de precios. Segunda: valora contratar un seguro dental si necesitas tratamientos costosos (implantes, ortodoncia, prótesis). Tercera: pregunta por opciones de financiación sin intereses, que muchas clínicas ofrecen a 12-24 meses. Cuarta: no descuides la prevención, ya que una limpieza anual (50-80€) puede evitarte tratamientos mucho más caros. Quinta: considera clínicas universitarias, que ofrecen tratamientos supervisados a precios reducidos. Y sexta: pregunta siempre por materiales alternativos que puedan reducir el coste sin comprometer la calidad.",
  },
  {
    question: "¿Se puede financiar un tratamiento dental?",
    answer:
      "Sí, la mayoría de clínicas dentales ofrecen financiación para tratamientos costosos como implantes, ortodoncia o rehabilitaciones completas. Lo más habitual es encontrar financiación sin intereses a 12 meses, aunque algunas clínicas ofrecen plazos de hasta 24 o 36 meses (estos últimos suelen tener intereses). Pide siempre las condiciones por escrito y comprueba si hay comisión de apertura o gastos adicionales. Algunas cadenas dentales tienen acuerdos con financieras específicas que ofrecen condiciones preferentes.",
  },
  {
    question: "¿PrecioDental está afiliado a alguna clínica o aseguradora?",
    answer:
      "No. PrecioDental es completamente independiente. No tenemos vinculación comercial con ninguna clínica dental, cadena, aseguradora ni colegio profesional. No recibimos comisiones por derivar pacientes, no vendemos tratamientos y no aceptamos pagos de clínicas por aparecer o posicionarse en nuestro comparador. Nuestra única fuente de ingresos es la publicidad no intrusiva. Esta independencia es fundamental para garantizar la objetividad de los datos que mostramos.",
  },
  {
    question: "¿Qué hago si el presupuesto de mi dentista es más caro que vuestro rango máximo?",
    answer:
      "Un presupuesto por encima de nuestro rango máximo no significa necesariamente que sea abusivo. Puede deberse a la complejidad de tu caso particular, al uso de materiales premium, a la necesidad de tratamientos complementarios o a la especialización del profesional. Te recomendamos: pide al dentista que te explique el desglose del presupuesto; solicita un segundo presupuesto en otra clínica para comparar; y pregunta si existen alternativas de materiales o técnicas que puedan reducir el coste sin comprometer el resultado.",
  },
  {
    question: "¿Cubrís todas las ciudades de España?",
    answer:
      "Actualmente mostramos precios para las principales ciudades españolas, cubriendo las 50 capitales de provincia y otras ciudades con más de 50.000 habitantes. Los precios por ciudad reflejan la zona geográfica (A o B) y, cuando tenemos suficientes datos locales, ajustamos los rangos a la realidad del mercado de esa ciudad concreta. Estamos trabajando continuamente para ampliar la cobertura geográfica y mejorar la granularidad de los datos locales.",
  },
  {
    question: "¿Qué diferencia hay entre precio con seguro y sin seguro?",
    answer:
      "Los precios con seguro dental son los que pagan los pacientes asegurados en las clínicas del cuadro médico de su compañía. Estos precios están fijados por los baremos de la aseguradora y suelen ser entre un 20% y un 50% más bajos que los precios de mercado sin seguro. Sin embargo, el paciente asegurado también paga una cuota mensual o anual por el seguro. En PrecioDental mostramos ambos rangos cuando los datos están disponibles, para que puedas calcular cuál es la opción más económica en tu caso.",
  },
  {
    question: "¿Cómo sé si un tratamiento dental es necesario o me lo están vendiendo?",
    answer:
      "Es una preocupación legítima. Nuestro consejo: ante cualquier tratamiento costoso o no urgente, pide una segunda opinión en otra clínica. Un buen profesional no tendrá problema en que consultes con otro dentista. Desconfía si te presionan para decidir en el momento, si no te explican las alternativas o si el presupuesto no está detallado por escrito. Los colegios de dentistas de cada comunidad autónoma tienen servicios de mediación y reclamación si consideras que has recibido un tratamiento innecesario.",
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

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance">
        Preguntas frecuentes
      </h1>
      <p className="mt-2 text-zinc-500 text-pretty">
        Todo lo que necesitas saber sobre precios dentales en España: cómo
        funcionan, cómo ahorrar y cómo usar PrecioDental.
      </p>

      <FAQSection items={FAQ_ITEMS} className="mt-8" />
    </div>
  );
}
