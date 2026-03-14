import type { TreatmentCategory } from "@/types";

export interface TreatmentSeed {
  name: string;
  slug: string;
  category: TreatmentCategory;
  description: string;
  displayOrder: number;
}

export const TREATMENTS: TreatmentSeed[] = [
  // Diagnóstico y Prevención
  {
    name: "Primera consulta dental",
    slug: "primera-consulta-dental",
    category: "diagnostico",
    description: "Revisión inicial con exploración bucal completa y diagnóstico.",
    displayOrder: 1,
  },
  {
    name: "Radiografía panorámica",
    slug: "radiografia-panoramica",
    category: "diagnostico",
    description: "Ortopantomografía que muestra todos los dientes, mandíbula y maxilar en una sola imagen.",
    displayOrder: 2,
  },
  {
    name: "Radiografía periapical",
    slug: "radiografia-periapical",
    category: "diagnostico",
    description: "Radiografía de uno o varios dientes con detalle de raíz y hueso circundante.",
    displayOrder: 3,
  },
  {
    name: "TAC dental",
    slug: "tac-dental",
    category: "diagnostico",
    description: "Tomografía computarizada 3D para planificación de implantes y cirugías.",
    displayOrder: 4,
  },
  {
    name: "Limpieza dental",
    slug: "limpieza-dental",
    category: "diagnostico",
    description: "Profilaxis profesional para eliminar sarro y placa bacteriana.",
    displayOrder: 5,
  },

  // Odontología General
  {
    name: "Empaste dental",
    slug: "empaste-dental",
    category: "odontologia-general",
    description: "Obturación o restauración dental para tratar caries.",
    displayOrder: 10,
  },
  {
    name: "Empaste compuesto",
    slug: "empaste-compuesto",
    category: "odontologia-general",
    description: "Restauración con composite estético de mayor tamaño.",
    displayOrder: 11,
  },
  {
    name: "Reconstrucción dental",
    slug: "reconstruccion-dental",
    category: "odontologia-general",
    description: "Restauración completa de un diente dañado o fracturado.",
    displayOrder: 12,
  },
  {
    name: "Férula de descarga",
    slug: "ferula-de-descarga",
    category: "odontologia-general",
    description: "Dispositivo para tratar el bruxismo y proteger los dientes del desgaste nocturno.",
    displayOrder: 13,
  },

  // Endodoncia
  {
    name: "Endodoncia unirradicular",
    slug: "endodoncia-unirradicular",
    category: "endodoncia",
    description: "Tratamiento de conductos en dientes con una sola raíz (incisivos, caninos).",
    displayOrder: 20,
  },
  {
    name: "Endodoncia birradicular",
    slug: "endodoncia-birradicular",
    category: "endodoncia",
    description: "Tratamiento de conductos en dientes con dos raíces (premolares).",
    displayOrder: 21,
  },
  {
    name: "Endodoncia multirradicular",
    slug: "endodoncia-multirradicular",
    category: "endodoncia",
    description: "Tratamiento de conductos en molares con tres o más raíces.",
    displayOrder: 22,
  },

  // Periodoncia
  {
    name: "Curetaje dental",
    slug: "curetaje-dental",
    category: "periodoncia",
    description: "Raspado y alisado radicular para tratar enfermedad periodontal.",
    displayOrder: 30,
  },
  {
    name: "Estudio periodontal",
    slug: "estudio-periodontal",
    category: "periodoncia",
    description: "Diagnóstico completo del estado de las encías y el hueso de soporte.",
    displayOrder: 31,
  },
  {
    name: "Cirugía periodontal",
    slug: "cirugia-periodontal",
    category: "periodoncia",
    description: "Intervención quirúrgica para tratar periodontitis avanzada.",
    displayOrder: 32,
  },
  {
    name: "Injerto de encía",
    slug: "injerto-de-encia",
    category: "periodoncia",
    description: "Cirugía para recuperar encía perdida por recesión gingival.",
    displayOrder: 33,
  },

  // Cirugía Oral
  {
    name: "Extracción dental simple",
    slug: "extraccion-dental-simple",
    category: "cirugia-oral",
    description: "Extracción de un diente erupcionado sin complicaciones.",
    displayOrder: 40,
  },
  {
    name: "Extracción dental compleja",
    slug: "extraccion-dental-compleja",
    category: "cirugia-oral",
    description: "Extracción quirúrgica de dientes fracturados o con raíces complicadas.",
    displayOrder: 41,
  },
  {
    name: "Extracción muela del juicio",
    slug: "extraccion-muela-del-juicio",
    category: "cirugia-oral",
    description: "Extracción del tercer molar, incluida o semi-incluida.",
    displayOrder: 42,
  },

  // Implantología
  {
    name: "Implante dental",
    slug: "implante-dental",
    category: "implantologia",
    description: "Tornillo de titanio o circonio que sustituye la raíz del diente perdido.",
    displayOrder: 50,
  },
  {
    name: "Implante dental completo",
    slug: "implante-dental-completo",
    category: "implantologia",
    description: "Implante con tornillo, pilar y corona. Solución completa para sustituir un diente.",
    displayOrder: 51,
  },
  {
    name: "Corona sobre implante",
    slug: "corona-sobre-implante",
    category: "implantologia",
    description: "Prótesis fija que se coloca sobre el implante para restaurar la función y estética.",
    displayOrder: 52,
  },
  {
    name: "Elevación de seno maxilar",
    slug: "elevacion-de-seno-maxilar",
    category: "implantologia",
    description: "Cirugía para aumentar el hueso del maxilar superior antes de colocar implantes.",
    displayOrder: 53,
  },
  {
    name: "All-on-4",
    slug: "all-on-4",
    category: "implantologia",
    description: "Rehabilitación de una arcada completa con solo 4 implantes.",
    displayOrder: 54,
  },
  {
    name: "Prótesis sobre implantes (arcada completa)",
    slug: "protesis-sobre-implantes-arcada-completa",
    category: "implantologia",
    description: "Rehabilitación de ambas arcadas con implantes para boca completa.",
    displayOrder: 55,
  },

  // Ortodoncia
  {
    name: "Brackets metálicos",
    slug: "brackets-metalicos",
    category: "ortodoncia",
    description: "Ortodoncia convencional con brackets de metal. Tratamiento completo.",
    displayOrder: 60,
  },
  {
    name: "Brackets de zafiro",
    slug: "brackets-de-zafiro",
    category: "ortodoncia",
    description: "Ortodoncia estética con brackets transparentes de zafiro.",
    displayOrder: 61,
  },
  {
    name: "Ortodoncia invisible",
    slug: "ortodoncia-invisible",
    category: "ortodoncia",
    description: "Alineadores transparentes removibles tipo Invisalign.",
    displayOrder: 62,
  },
  {
    name: "Invisalign Comprehensive",
    slug: "invisalign-comprehensive",
    category: "ortodoncia",
    description: "Plan completo de Invisalign para casos moderados a complejos.",
    displayOrder: 63,
  },
  {
    name: "Retenedores dentales",
    slug: "retenedores-dentales",
    category: "ortodoncia",
    description: "Dispositivos fijos o removibles para mantener el resultado de la ortodoncia.",
    displayOrder: 64,
  },

  // Estética Dental
  {
    name: "Blanqueamiento dental",
    slug: "blanqueamiento-dental",
    category: "estetica",
    description: "Tratamiento para aclarar el color de los dientes en clínica.",
    displayOrder: 70,
  },
  {
    name: "Carillas de composite",
    slug: "carillas-de-composite",
    category: "estetica",
    description: "Láminas de resina compuesta para mejorar la estética dental.",
    displayOrder: 71,
  },
  {
    name: "Carillas de porcelana",
    slug: "carillas-de-porcelana",
    category: "estetica",
    description: "Láminas ultrafinas de cerámica para transformar la sonrisa.",
    displayOrder: 72,
  },

  // Prótesis
  {
    name: "Corona dental metal-porcelana",
    slug: "corona-dental-metal-porcelana",
    category: "protesis",
    description: "Funda dental con estructura metálica y recubrimiento de porcelana.",
    displayOrder: 80,
  },
  {
    name: "Corona dental de circonio",
    slug: "corona-dental-de-circonio",
    category: "protesis",
    description: "Funda dental de circonio, más estética y biocompatible.",
    displayOrder: 81,
  },
  {
    name: "Prótesis removible completa",
    slug: "protesis-removible-completa",
    category: "protesis",
    description: "Dentadura postiza completa removible para una arcada.",
    displayOrder: 82,
  },
  {
    name: "Prótesis removible parcial",
    slug: "protesis-removible-parcial",
    category: "protesis",
    description: "Prótesis esquelética removible para reemplazar varios dientes.",
    displayOrder: 83,
  },
  {
    name: "Puente dental",
    slug: "puente-dental",
    category: "protesis",
    description: "Prótesis fija que reemplaza uno o más dientes apoyándose en los adyacentes.",
    displayOrder: 84,
  },
];
