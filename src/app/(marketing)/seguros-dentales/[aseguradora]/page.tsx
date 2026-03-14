import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { db } from "@/lib/db";
import { prices, treatments } from "@/lib/db/schema";
import { eq, asc, ilike } from "drizzle-orm";
import { generateInsuranceMetadata } from "@/lib/seo/metadata";
import { formatPrice } from "@/lib/utils/format";

interface Props {
  params: Promise<{ aseguradora: string }>;
}

interface InsuranceInfo {
  name: string;
  sourcePattern: string;
  description: string;
  longDescription: string;
  clinicCount: string;
  monthlyPrice: string;
  pros: string[];
  cons: string[];
  freeServices: string[];
  waitingPeriod: string;
  faq: { question: string; answer: string }[];
}

const INSURANCE_MAP: Record<string, InsuranceInfo> = {
  "sanitas-dental-milenium": {
    name: "Sanitas Dental Milenium",
    sourcePattern: "Sanitas%",
    description:
      "Red dental con más de 220 clínicas propias en España. Precios de baremo fijados por zona geográfica.",
    longDescription:
      "Sanitas Dental Milenium es uno de los seguros dentales más populares en España, respaldado por la red de clínicas propias más extensa del país. Con más de 220 centros Milenium y 2.000 clínicas concertadas adicionales, ofrece una cobertura geográfica difícil de igualar. Su modelo se basa en baremos de precios máximos diferenciados por Zona A y Zona B, lo que permite a los asegurados conocer de antemano el coste máximo de cada tratamiento. La póliza básica parte de unos 8-10 EUR al mes e incluye servicios gratuitos como revisiones, limpiezas y radiografías básicas. Para tratamientos más complejos como implantes u ortodoncia, el asegurado paga un copago según el baremo establecido, que suele ser entre un 30% y un 50% inferior al precio de mercado sin seguro.",
    clinicCount: "220+ propias + 2.000 concertadas",
    monthlyPrice: "8-15 €/mes",
    pros: [
      "La red de clínicas propias más grande de España (220+ centros Milenium)",
      "Primera consulta, revisiones y radiografías gratuitas incluidas",
      "App móvil para gestión de citas y acceso al cuadro médico",
      "Precios de baremo públicos y transparentes por zona",
      "Amplia cobertura en todas las provincias españolas",
    ],
    cons: [
      "Los copagos pueden ser elevados en tratamientos de implantología premium",
      "Los baremos varían entre Zona A y B, lo que puede generar confusión",
      "Algunas especialidades solo disponibles en clínicas propias, no concertadas",
      "Período de carencia de 3-6 meses para tratamientos complejos",
    ],
    freeServices: [
      "Primera consulta y diagnóstico",
      "Revisión dental anual",
      "Limpieza bucal anual",
      "Radiografías periapicales",
      "Urgencias dentales",
      "Aplicación de flúor (menores)",
    ],
    waitingPeriod: "Sin carencia para diagnóstico y prevención. 3 meses para odontología general. 6 meses para implantes y ortodoncia.",
    faq: [
      { question: "¿Cuánto cuesta el seguro Sanitas Dental Milenium al mes?", answer: "La póliza básica de Sanitas Dental parte de 8-10 EUR al mes por persona. Existen planes familiares y planes premium con mayor cobertura que pueden llegar a 15-20 EUR al mes." },
      { question: "¿Qué incluye gratis Sanitas Dental?", answer: "Sanitas Dental incluye sin copago: primera consulta y diagnóstico, revisión anual, limpieza bucal anual, radiografías periapicales, urgencias dentales y aplicación de flúor para menores." },
      { question: "¿Merece la pena Sanitas Dental para implantes?", answer: "Sí, especialmente si necesitas más de un implante. Con Sanitas, un implante puede costar entre 320-590 EUR (según zona), frente a 500-780 EUR sin seguro. El ahorro se multiplica en tratamientos como All-on-4." },
      { question: "¿Cuántas clínicas tiene Sanitas Dental?", answer: "Sanitas cuenta con más de 220 clínicas propias (centros Milenium) y más de 2.000 clínicas concertadas en toda España. Es la red dental propia más grande del país." },
    ],
  },
  "adeslas-dental": {
    name: "Adeslas Dental",
    sourcePattern: "Adeslas%",
    description:
      "Amplia red de clínicas concertadas con planes con y sin copago. Precios diferenciados por zona.",
    longDescription:
      "Adeslas Dental, del grupo SegurCaixa Adeslas, es una de las opciones más contratadas para seguro dental en España. Destaca por ofrecer dos modalidades: un plan básico con copago (más económico en la cuota mensual) y un plan completo sin copago para tratamientos básicos. Su red de clínicas concertadas supera las 1.800 en toda España, incluyendo centros propios Adeslas Dental. Los baremos de precios están diferenciados por Zona A y Zona B, y son de los más competitivos del mercado, especialmente en tratamientos de ortodoncia e implantología. Adeslas también ofrece ventajas adicionales como segunda opinión médica gratuita y acceso a la plataforma digital para gestión de citas.",
    clinicCount: "180+ propias + 1.800 concertadas",
    monthlyPrice: "7-14 €/mes",
    pros: [
      "Dos modalidades de plan: con copago (más barato) y sin copago",
      "Baremos muy competitivos, especialmente en ortodoncia e implantes",
      "Amplia red de más de 1.800 clínicas concertadas",
      "Segunda opinión dental gratuita incluida",
      "Gestión digital de citas y cuadro médico online",
    ],
    cons: [
      "En el plan con copago, los tratamientos complejos tienen coste adicional",
      "Menor número de clínicas propias comparado con Sanitas",
      "Período de carencia de hasta 6 meses en algunos tratamientos",
      "La disponibilidad de especialistas varía según la localidad",
    ],
    freeServices: [
      "Consulta de diagnóstico",
      "Revisión anual completa",
      "Limpieza dental anual",
      "Radiografía panorámica",
      "Urgencias dentales 24h",
      "Sellado de fisuras (menores)",
    ],
    waitingPeriod: "Sin carencia para prevención. 3 meses para conservadora. 6 meses para prótesis, implantes y ortodoncia.",
    faq: [
      { question: "¿Cuánto cuesta Adeslas Dental al mes?", answer: "Adeslas Dental tiene planes desde 7 EUR al mes (plan básico con copago). El plan completo sin copago para tratamientos básicos parte de 12-14 EUR al mes." },
      { question: "¿Qué diferencia hay entre Adeslas Dental con y sin copago?", answer: "El plan con copago tiene una cuota mensual más baja pero pagas un porcentaje por cada tratamiento. El plan sin copago tiene cuota más alta pero los tratamientos básicos (revisiones, limpiezas, empastes) son gratuitos." },
      { question: "¿Adeslas cubre ortodoncia invisible?", answer: "Sí, Adeslas cubre ortodoncia invisible con baremos específicos. El precio con seguro suele ser un 25-35% inferior al de mercado, dependiendo de la zona geográfica." },
      { question: "¿Puedo ir a cualquier dentista con Adeslas Dental?", answer: "Solo a las clínicas incluidas en el cuadro médico de Adeslas. Puedes consultar el cuadro médico en su web o app para encontrar clínicas cerca de ti." },
    ],
  },
  "cigna-dental": {
    name: "Cigna Healthcare Dental",
    sourcePattern: "Cigna%",
    description:
      "Seguro dental con precios diferenciados por Zona A y Zona B. Red de clínicas concertadas.",
    longDescription:
      "Cigna Healthcare Dental es la división dental de la multinacional estadounidense Cigna, con presencia en España desde hace más de 20 años. Se distingue por ofrecer baremos de precios muy transparentes, diferenciados claramente entre Zona A y Zona B, lo que permite al asegurado saber exactamente cuánto pagará antes de acudir al dentista. Su red de clínicas concertadas en España supera los 1.500 centros. Cigna apuesta por un modelo de copago reducido con especial atención a la prevención: incluye más servicios gratuitos que la media del mercado, como dos limpiezas anuales en lugar de una. Es una opción especialmente valorada por expatriados y empleados de multinacionales.",
    clinicCount: "150+ centros asociados + 1.500 concertadas",
    monthlyPrice: "9-16 €/mes",
    pros: [
      "Baremos de precios muy transparentes y fáciles de consultar",
      "Dos limpiezas dentales anuales incluidas (vs una en la mayoría)",
      "Buena cobertura en tratamientos preventivos",
      "Experiencia internacional: ideal para expatriados",
      "Sin cuestionario de salud para la contratación",
    ],
    cons: [
      "Red de clínicas propias más pequeña que Sanitas o Adeslas",
      "Menor presencia en ciudades pequeñas y zonas rurales",
      "Copagos algo superiores a la media en implantología",
      "Atención al cliente puede ser menos ágil que competidores nacionales",
    ],
    freeServices: [
      "Primera visita y diagnóstico",
      "Dos revisiones anuales",
      "Dos limpiezas dentales anuales",
      "Radiografías diagnósticas",
      "Urgencias dentales",
      "Educación en higiene oral",
    ],
    waitingPeriod: "Sin carencia para prevención y diagnóstico. 3 meses para tratamientos conservadores. 6 meses para prótesis e implantes.",
    faq: [
      { question: "¿Cigna Dental incluye dos limpiezas al año?", answer: "Sí, a diferencia de la mayoría de aseguradoras que solo incluyen una, Cigna Dental cubre dos limpiezas anuales sin coste adicional." },
      { question: "¿Cigna es buena opción para extranjeros en España?", answer: "Sí, Cigna es especialmente valorada por expatriados gracias a su experiencia internacional, atención en varios idiomas y facilidad de contratación sin cuestionario de salud." },
      { question: "¿Cómo son los precios de Cigna comparados con Sanitas?", answer: "Los baremos de Cigna son similares a los de Sanitas en la mayoría de tratamientos. En prevención suele ser mejor (dos limpiezas gratis), pero en implantes los copagos pueden ser ligeramente superiores." },
    ],
  },
  "caser-dental": {
    name: "Caser Dental",
    sourcePattern: "Caser%",
    description: "Plan Sonrisa con red de clínicas en toda España.",
    longDescription:
      "Caser Dental, conocido por su Plan Sonrisa, es la división dental del grupo asegurador Caser. Ofrece una relación calidad-precio muy competitiva, con una de las cuotas mensuales más bajas del mercado. Su red de clínicas concertadas cubre las principales ciudades españolas, aunque es más limitada que la de Sanitas o Adeslas en zonas rurales. Caser destaca por la sencillez de sus planes: un único baremo sin demasiadas variables, lo que facilita al asegurado entender exactamente cuánto va a pagar. Los tratamientos preventivos están cubiertos sin copago y los baremos para tratamientos complejos son competitivos, especialmente en coronas y prótesis.",
    clinicCount: "100+ centros concertados",
    monthlyPrice: "6-12 €/mes",
    pros: [
      "Una de las cuotas mensuales más bajas del mercado",
      "Baremo sencillo y fácil de entender",
      "Buenos precios en coronas y prótesis",
      "Contratación online rápida y sin papeleos",
      "Sin cuestionario de salud",
    ],
    cons: [
      "Red de clínicas más limitada que Sanitas o Adeslas",
      "Menor presencia en zonas rurales y ciudades pequeñas",
      "Menos servicios gratuitos incluidos que la competencia",
      "Atención telefónica con tiempos de espera variables",
    ],
    freeServices: [
      "Consulta de diagnóstico",
      "Revisión dental anual",
      "Limpieza bucal anual",
      "Radiografía panorámica",
      "Urgencias dentales",
    ],
    waitingPeriod: "Sin carencia para prevención. 3 meses para conservadora. 6 meses para implantes y ortodoncia.",
    faq: [
      { question: "¿Es Caser Dental el seguro dental más barato?", answer: "Caser es uno de los más económicos del mercado, con planes desde 6 EUR al mes. Sin embargo, hay que valorar también la red de clínicas disponible en tu zona." },
      { question: "¿Caser cubre implantes dentales?", answer: "Sí, Caser cubre implantes con un baremo de copago. Los precios son competitivos, aunque la red de especialistas en implantología puede ser más limitada en algunas ciudades." },
    ],
  },
  vitaldent: {
    name: "Vitaldent",
    sourcePattern: "Vitaldent%",
    description:
      "La cadena de clínicas dentales más grande de España con más de 450 centros.",
    longDescription:
      "Vitaldent no es una aseguradora sino la cadena de clínicas dentales más grande de España, con más de 450 centros en todo el país. Sus precios son públicos y estandarizados en toda su red, lo que ofrece una transparencia poco habitual en el sector. Vitaldent funciona como alternativa a los seguros dentales: en lugar de pagar una cuota mensual, el paciente paga directamente por cada tratamiento a precios generalmente inferiores a los de una clínica privada independiente. Ofrece financiación sin intereses en tratamientos costosos y primera consulta gratuita. Es una opción a considerar especialmente si no quieres comprometerte con una póliza mensual pero buscas precios competitivos y predecibles.",
    clinicCount: "450+ clínicas propias",
    monthlyPrice: "Sin cuota — pago por tratamiento",
    pros: [
      "Sin cuota mensual: pagas solo cuando vas al dentista",
      "Precios estandarizados y públicos en toda la red",
      "Primera consulta siempre gratuita",
      "450+ clínicas propias en toda España",
      "Financiación sin intereses disponible",
    ],
    cons: [
      "No es un seguro: no hay cobertura de accidentes o urgencias fuera de red",
      "Los precios pueden ser superiores a los baremos de aseguradoras",
      "Rotación de profesionales en algunas clínicas",
      "Experiencia variable entre diferentes centros",
    ],
    freeServices: [
      "Primera consulta y diagnóstico",
      "Revisión dental",
      "Presupuesto detallado sin compromiso",
    ],
    waitingPeriod: "Sin períodos de carencia. Al ser una cadena de clínicas, puedes acceder a cualquier tratamiento desde el primer día.",
    faq: [
      { question: "¿Vitaldent es un seguro dental?", answer: "No, Vitaldent es una cadena de clínicas dentales. No pagas cuota mensual, sino que abonas cada tratamiento cuando lo realizas. Sus precios son fijos y públicos." },
      { question: "¿Los precios de Vitaldent son iguales en toda España?", answer: "Sí, Vitaldent mantiene precios estandarizados en todas sus clínicas, independientemente de la ciudad. Esto es una ventaja frente a clínicas independientes donde los precios varían mucho." },
      { question: "¿Merece la pena Vitaldent frente a un seguro dental?", answer: "Depende de tu uso. Si vas al dentista pocas veces al año, Vitaldent puede salirte más económico que pagar una cuota mensual. Si necesitas tratamientos frecuentes o costosos, un seguro dental probablemente te ahorre más." },
    ],
  },
  "generali-dental": {
    name: "Generali Dental",
    sourcePattern: "Generali%",
    description:
      "Seguro dental con baremos por zona geográfica y red de clínicas concertadas.",
    longDescription:
      "Generali Dental es la oferta dental del grupo asegurador italiano Generali, uno de los mayores del mundo. En España, ofrece un seguro dental con baremos diferenciados por zona geográfica y una red de más de 1.200 clínicas concertadas. Generali destaca por su enfoque en la prevención y por incluir coberturas complementarias como accidentes dentales. Su cuota mensual se sitúa en la franja media del mercado y los baremos son competitivos, especialmente en tratamientos de odontología conservadora (empastes, endodoncias). Es una opción sólida para quienes buscan un equilibrio entre precio, cobertura y respaldo de una gran aseguradora.",
    clinicCount: "120+ propias + 1.200 concertadas",
    monthlyPrice: "8-14 €/mes",
    pros: [
      "Respaldo de uno de los mayores grupos aseguradores del mundo",
      "Baremos competitivos en odontología conservadora",
      "Cobertura de accidentes dentales incluida",
      "Red amplia de más de 1.200 clínicas",
      "Descuentos por contratación familiar",
    ],
    cons: [
      "Menor notoriedad de marca en dental comparada con Sanitas o Adeslas",
      "Red de clínicas propias limitada",
      "Baremos en implantología no tan competitivos como la competencia",
      "Gestión digital menos desarrollada que otros competidores",
    ],
    freeServices: [
      "Consulta y diagnóstico",
      "Revisión dental anual",
      "Limpieza dental anual",
      "Radiografías básicas",
      "Urgencias dentales",
    ],
    waitingPeriod: "Sin carencia para prevención. 3 meses para tratamientos generales. 6 meses para implantes, prótesis y ortodoncia.",
    faq: [
      { question: "¿Generali Dental cubre accidentes dentales?", answer: "Sí, a diferencia de muchos competidores, Generali incluye cobertura de accidentes dentales en su póliza estándar, lo que cubre restauraciones y tratamientos derivados de traumatismos." },
      { question: "¿Cuántas clínicas tiene Generali Dental?", answer: "Generali cuenta con una red de más de 1.200 clínicas concertadas en España, además de centros propios en las principales ciudades." },
    ],
  },
  "axa-dental": {
    name: "AXA Dental",
    sourcePattern: "AXA%",
    description: "Seguro dental con tarifa completa de tratamientos.",
    longDescription:
      "AXA Dental es la propuesta dental del grupo francés AXA, líder mundial en seguros. En España ofrece un seguro dental con una tarifa completa que cubre desde tratamientos preventivos hasta implantología y ortodoncia. AXA se diferencia por la solidez de su servicio de atención al cliente y por ofrecer baremos unificados sin diferenciación por zonas en algunos de sus planes, lo que simplifica la comprensión de los costes. Su red de clínicas concertadas cubre las principales ciudades y su cuota mensual se sitúa en la franja media-alta, compensada con unos baremos generalmente más favorables para el asegurado.",
    clinicCount: "100+ centros concertados",
    monthlyPrice: "10-18 €/mes",
    pros: [
      "Baremos sin diferenciación por zonas en algunos planes",
      "Atención al cliente de alta calidad",
      "Buena cobertura en implantología",
      "Posibilidad de combinar con otros seguros AXA (salud, hogar)",
      "Respaldo de una de las mayores aseguradoras del mundo",
    ],
    cons: [
      "Cuota mensual superior a la media del mercado",
      "Red de clínicas más reducida que Sanitas o Adeslas",
      "Menor presencia en ciudades pequeñas",
      "Proceso de autorización previa en algunos tratamientos complejos",
    ],
    freeServices: [
      "Consulta de diagnóstico",
      "Revisión anual completa",
      "Limpieza dental anual",
      "Radiografías diagnósticas",
      "Urgencias dentales",
    ],
    waitingPeriod: "Sin carencia para prevención y diagnóstico. 3-6 meses para tratamientos según complejidad.",
    faq: [
      { question: "¿AXA Dental diferencia precios por zona?", answer: "Depende del plan contratado. Algunos planes de AXA tienen baremos unificados sin diferenciación por zona geográfica, lo que simplifica saber cuánto vas a pagar independientemente de dónde vivas." },
      { question: "¿Puedo combinar el seguro dental de AXA con otros seguros?", answer: "Sí, AXA ofrece descuentos si combinas el seguro dental con otros productos como seguro de salud o de hogar." },
    ],
  },
  "mapfre-dental": {
    name: "Mapfre Dental",
    sourcePattern: "Mapfre%",
    description: "Baremo dental con precios máximos garantizados.",
    longDescription:
      "Mapfre Dental es la oferta dental de Mapfre, la mayor aseguradora española por volumen de primas. Su seguro dental se basa en baremos de precios máximos garantizados: el asegurado nunca pagará más de lo que indica el baremo por cada tratamiento. Mapfre tiene una de las redes más extensas de España gracias a su fuerte implantación territorial, con presencia en prácticamente todas las provincias. Es una opción especialmente atractiva para quienes viven fuera de las grandes ciudades, donde otras aseguradoras tienen menor cobertura. Los baremos son competitivos en tratamientos de prevención y odontología general.",
    clinicCount: "90+ propias + amplia red concertada",
    monthlyPrice: "7-13 €/mes",
    pros: [
      "La mayor implantación territorial de España (presente en casi todas las provincias)",
      "Precios máximos garantizados: nunca pagas más de lo que dice el baremo",
      "Buena opción para zonas rurales y ciudades pequeñas",
      "Cuota mensual competitiva",
      "Posibilidad de añadir dental al seguro de salud existente",
    ],
    cons: [
      "Baremos algo superiores a Sanitas o Adeslas en tratamientos complejos",
      "Menos clínicas propias que los líderes del mercado",
      "Plataforma digital mejorable",
      "Menor especialización dental comparada con Sanitas Milenium",
    ],
    freeServices: [
      "Consulta y revisión dental",
      "Limpieza bucal anual",
      "Radiografías básicas",
      "Urgencias dentales",
    ],
    waitingPeriod: "Sin carencia para prevención. 3 meses para conservadora. 6 meses para prótesis, implantes y ortodoncia.",
    faq: [
      { question: "¿Mapfre Dental tiene buena cobertura fuera de las grandes ciudades?", answer: "Sí, Mapfre tiene una de las mayores implantaciones territoriales de España. Es especialmente buena opción si vives en una ciudad mediana o zona rural donde otras aseguradoras tienen menos clínicas." },
      { question: "¿Puedo añadir el seguro dental a mi póliza de salud Mapfre?", answer: "Sí, si ya eres cliente de Mapfre salud, puedes añadir la cobertura dental a tu póliza existente, generalmente con un descuento en la cuota mensual." },
    ],
  },
};

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { aseguradora } = await params;
  const info = INSURANCE_MAP[aseguradora];
  if (!info) return {};
  return generateInsuranceMetadata(info.name, aseguradora);
}

export default async function InsurancePage({ params }: Props) {
  const { aseguradora } = await params;
  const info = INSURANCE_MAP[aseguradora];
  if (!info) notFound();

  const insurancePrices = await db
    .select({
      treatmentName: treatments.name,
      treatmentSlug: treatments.slug,
      sourceName: prices.sourceName,
      priceMin: prices.priceMin,
      priceMax: prices.priceMax,
      priceExact: prices.priceExact,
      zone: prices.zone,
      sourceType: prices.sourceType,
    })
    .from(prices)
    .innerJoin(treatments, eq(prices.treatmentId, treatments.id))
    .where(ilike(prices.sourceName, info.sourcePattern))
    .orderBy(asc(treatments.displayOrder));

  // Group by treatment, then by zone
  const byTreatment = new Map<
    string,
    {
      name: string;
      slug: string;
      zoneA: { min: number | null; max: number | null; exact: number | null } | null;
      zoneB: { min: number | null; max: number | null; exact: number | null } | null;
    }
  >();

  for (const p of insurancePrices) {
    if (!byTreatment.has(p.treatmentSlug)) {
      byTreatment.set(p.treatmentSlug, {
        name: p.treatmentName,
        slug: p.treatmentSlug,
        zoneA: null,
        zoneB: null,
      });
    }
    const entry = byTreatment.get(p.treatmentSlug)!;
    const priceData = {
      min: p.priceMin ? Number(p.priceMin) : null,
      max: p.priceMax ? Number(p.priceMax) : null,
      exact: p.priceExact ? Number(p.priceExact) : null,
    };

    if (p.zone === "A") entry.zoneA = priceData;
    else if (p.zone === "B") entry.zoneB = priceData;
    else {
      if (!entry.zoneA) entry.zoneA = priceData;
      if (!entry.zoneB) entry.zoneB = priceData;
    }
  }

  const treatmentList = Array.from(byTreatment.values());

  const otherInsurances = Object.entries(INSURANCE_MAP)
    .filter(([slug]) => slug !== aseguradora)
    .slice(0, 6);

  const formatInsPrice = (data: {
    min: number | null;
    max: number | null;
    exact: number | null;
  }) => {
    if (data.exact) return formatPrice(data.exact);
    if (data.min && data.max)
      return `${formatPrice(data.min)} - ${formatPrice(data.max)}`;
    if (data.min) return `desde ${formatPrice(data.min)}`;
    if (data.max) return `hasta ${formatPrice(data.max)}`;
    return "—";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Seguros dentales", href: "/seguros-dentales" },
          { label: info.name, href: `/seguros-dentales/${aseguradora}` },
        ]}
      />

      {/* Hero */}
      <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="lg:max-w-2xl">
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight text-balance sm:text-4xl">
            {info.name}
            <span className="block text-lg font-normal text-zinc-500 mt-1">
              Baremo de precios dentales 2026
            </span>
          </h1>
          <p className="mt-3 max-w-3xl text-zinc-500 text-pretty">{info.description}</p>
        </div>

        {/* Quick stats */}
        <div className="shrink-0 grid grid-cols-2 gap-3 lg:min-w-[280px]">
          <div className="rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-soft text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Clínicas</p>
            <p className="mt-1 text-sm font-bold text-zinc-900">{info.clinicCount}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-soft text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Precio</p>
            <p className="mt-1 text-sm font-bold text-primary-600">{info.monthlyPrice}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-soft text-center col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Tratamientos con precio</p>
            <p className="mt-1 text-sm font-bold text-zinc-900 tabular-nums">{treatmentList.length} tratamientos</p>
          </div>
        </div>
      </div>

      {/* Long description */}
      <section className="mt-8">
        <p className="text-zinc-600 leading-relaxed text-pretty">{info.longDescription}</p>
      </section>

      {/* Pros / Cons */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-green-200/60 bg-green-50/50 p-5">
          <h2 className="font-semibold text-zinc-900">Ventajas</h2>
          <ul className="mt-3 space-y-2">
            {info.pros.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-red-200/60 bg-red-50/50 p-5">
          <h2 className="font-semibold text-zinc-900">Desventajas</h2>
          <ul className="mt-3 space-y-2">
            {info.cons.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Free services + Waiting period */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-primary-200/60 bg-primary-50/50 p-5">
          <h3 className="font-semibold text-zinc-900">Servicios gratuitos incluidos</h3>
          <ul className="mt-3 space-y-1.5">
            {info.freeServices.map((s, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-5">
          <h3 className="font-semibold text-zinc-900">Períodos de carencia</h3>
          <p className="mt-3 text-sm text-zinc-600 leading-relaxed text-pretty">{info.waitingPeriod}</p>
          <p className="mt-3 text-xs text-zinc-400 text-pretty">
            La carencia es el tiempo que debes esperar desde la contratación del seguro
            hasta poder utilizar ciertos tratamientos.
          </p>
        </div>
      </div>

      {/* Price table */}
      {treatmentList.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-zinc-900 text-balance">
            Baremo de precios de {info.name}
          </h2>
          <p className="mt-1 text-sm text-zinc-400 text-pretty">
            Precios máximos que pagarás en las clínicas de su red. Diferenciados por zona geográfica.
          </p>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200/60 shadow-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-zinc-200 bg-zinc-50/50">
                  <th className="py-3 pl-5 pr-4 text-left font-bold text-zinc-900">
                    Tratamiento
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-primary-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary-500" />
                      Zona A
                    </span>
                  </th>
                  <th className="px-4 py-3 pr-5 text-right font-bold text-zinc-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-zinc-400" />
                      Zona B
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {treatmentList.map((t) => (
                  <tr
                    key={t.slug}
                    className="hover:bg-zinc-50 transition-colors"
                  >
                    <td className="py-3 pl-5 pr-4">
                      <Link
                        href={`/tratamientos/${t.slug}`}
                        className="press-scale font-medium text-zinc-900 hover:text-primary-600"
                      >
                        {t.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-primary-600 whitespace-nowrap tabular-nums">
                      {t.zoneA ? formatInsPrice(t.zoneA) : "—"}
                    </td>
                    <td className="px-4 py-3 pr-5 text-right font-semibold text-zinc-900 whitespace-nowrap tabular-nums">
                      {t.zoneB ? formatInsPrice(t.zoneB) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="mt-10 rounded-2xl border border-zinc-200/60 bg-zinc-50 p-8 text-center shadow-soft">
          <p className="text-zinc-500 text-pretty">
            Todavía no hemos procesado los datos de baremos de {info.name}.
          </p>
          <p className="mt-1 text-sm text-zinc-400 text-pretty">
            Estamos trabajando en importar los baremos de todas las aseguradoras.
          </p>
        </div>
      )}

      {/* All-inclusive advice callout */}
      <div className="mt-8 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-5">
        <div className="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 shrink-0 text-amber-600 mt-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <div>
            <p className="font-semibold text-zinc-900 text-sm">Consejo: pregunta si el precio es &ldquo;todo incluido&rdquo;</p>
            <p className="mt-1 text-sm text-zinc-600 text-pretty">
              Al comparar presupuestos con el baremo de {info.name}, verifica qué conceptos incluye
              cada precio. Algunas clínicas ofrecen precios &ldquo;todo incluido&rdquo; que cubren
              consulta, pruebas diagnósticas, el tratamiento en sí y las revisiones posteriores.
              Otras desglosan cada concepto por separado, lo que puede hacer que el precio final
              sea superior al baremo indicado.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      {info.faq.length > 0 && (
        <FAQSection items={info.faq} className="mt-10" />
      )}

      {/* Other insurances */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-zinc-900 text-balance">
          Comparar con otras aseguradoras
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherInsurances.map(([slug, ins]) => (
            <Link
              key={slug}
              href={`/seguros-dentales/${slug}`}
              className="press-scale group rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-soft hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <p className="font-medium text-zinc-900 group-hover:text-primary-700 transition-colors">
                {ins.name}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{ins.monthlyPrice} · {ins.clinicCount}</p>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/seguros-dentales"
            className="press-scale text-sm font-semibold text-primary-600 hover:text-primary-800"
          >
            Ver todas las aseguradoras →
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <p className="mt-10 text-xs text-zinc-400 leading-relaxed text-pretty">
        Los precios mostrados corresponden a los baremos publicados por{" "}
        {info.name}. Son precios máximos que la aseguradora paga a las clínicas
        de su red. El precio final puede variar según el plan contratado y la
        clínica elegida. Última actualización: marzo 2026.
      </p>
    </div>
  );
}
