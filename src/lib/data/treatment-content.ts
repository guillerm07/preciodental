export interface TreatmentContent {
  longDescription: string;
  includes: string[];
  excludes: string[];
  duration: string;
  recovery: string;
  factorsAffectingPrice: string[];
}

export const TREATMENT_CONTENT: Record<string, TreatmentContent> = {
  "implante-dental": {
    longDescription:
      "El implante dental es una raíz artificial de titanio que se inserta en el hueso maxilar o mandibular para sustituir un diente perdido. Es la solución más duradera y funcional para reemplazar piezas dentales, ya que se integra con el hueso mediante un proceso llamado osteointegración. El precio de un implante dental en España varía considerablemente según la clínica, la marca del implante y la ciudad.\n\nEl procedimiento consta de varias fases: diagnóstico con radiografía o TAC, colocación quirúrgica del implante, período de osteointegración (entre 3 y 6 meses) y, finalmente, la colocación de la corona definitiva. Cuánto cuesta un implante dental depende en gran medida de si se necesitan procedimientos adicionales como elevación de seno o regeneración ósea.\n\nLos implantes dentales tienen una tasa de éxito superior al 95% a largo plazo y, con un mantenimiento adecuado, pueden durar toda la vida. Es fundamental acudir a un implantólogo cualificado y utilizar marcas de implantes reconocidas para garantizar los mejores resultados.",
    includes: [
      "Estudio radiográfico inicial (ortopantomografía)",
      "Cirugía de colocación del implante",
      "Implante de titanio",
      "Tornillo de cicatrización",
      "Revisiones postoperatorias",
    ],
    excludes: [
      "Corona o prótesis sobre implante (se presupuesta aparte)",
      "Pilar protésico (abutment)",
      "TAC 3D o escáner CBCT (si es necesario)",
      "Regeneración ósea o injerto de hueso",
      "Elevación de seno maxilar",
      "Sedación consciente",
    ],
    duration: "La cirugía de colocación dura entre 30 y 60 minutos por implante. El proceso completo, incluyendo la osteointegración y la colocación de la corona, se extiende entre 3 y 8 meses.",
    recovery: "Las molestias postoperatorias duran entre 3 y 7 días, controlables con antiinflamatorios. La osteointegración completa requiere de 3 a 6 meses antes de poder colocar la corona definitiva.",
    factorsAffectingPrice: [
      "Marca y gama del implante (premium vs. económico)",
      "Necesidad de regeneración ósea o injerto",
      "Elevación de seno maxilar",
      "Experiencia y formación del implantólogo",
      "Ciudad y ubicación de la clínica",
      "Tecnología disponible (cirugía guiada, escáner intraoral)",
      "Tipo de corona que se colocará posteriormente",
    ],
  },

  "implante-dental-completo": {
    longDescription:
      "El implante dental completo incluye tanto el implante de titanio como el pilar protésico y la corona definitiva, ofreciendo una solución integral para reemplazar un diente perdido. El precio de un implante dental completo en España abarca todas las fases del tratamiento, desde el diagnóstico hasta la restauración final.\n\nEste tratamiento es la opción preferida por la mayoría de los pacientes, ya que evita presupuestos fraccionados y ofrece un coste global más claro. Cuánto cuesta un implante dental completo depende del tipo de corona elegida (circonio, metal-porcelana o porcelana pura) y de la marca del implante utilizado. Las coronas de circonio ofrecen la mejor estética, mientras que las de metal-porcelana son más económicas.\n\nEl resultado final es un diente artificial prácticamente indistinguible del natural, tanto en aspecto como en funcionalidad. Un implante completo bien colocado permite masticar, hablar y sonreír con total normalidad, recuperando la calidad de vida que se pierde con la ausencia dental.",
    includes: [
      "Estudio diagnóstico y planificación",
      "Implante de titanio",
      "Pilar protésico (abutment)",
      "Corona definitiva (material según presupuesto)",
      "Tornillo de cicatrización",
      "Provisionales durante la osteointegración",
      "Revisiones y seguimiento",
    ],
    excludes: [
      "Regeneración ósea o injerto (si es necesario)",
      "Elevación de seno maxilar",
      "TAC 3D (en algunas clínicas)",
      "Extracción previa del diente dañado",
      "Sedación consciente",
    ],
    duration: "El proceso completo dura entre 4 y 8 meses. La cirugía de colocación requiere entre 30 y 60 minutos. La toma de impresiones y colocación de la corona definitiva se realiza en 2-3 citas adicionales.",
    recovery: "Molestias leves durante la primera semana tras la cirugía. Se requieren de 3 a 6 meses de osteointegración antes de colocar la corona definitiva. Durante ese tiempo se puede llevar un provisional.",
    factorsAffectingPrice: [
      "Material de la corona (circonio, metal-porcelana, porcelana feldespática)",
      "Marca del implante (Straumann, Nobel Biocare, Osstem, MIS, etc.)",
      "Necesidad de procedimientos adicionales (injerto óseo, elevación de seno)",
      "Tipo de pilar (estándar, personalizado, de circonio)",
      "Tecnología de la clínica (escáner digital, fresado CAD/CAM)",
      "Ubicación geográfica de la clínica",
    ],
  },

  "ortodoncia-invisible": {
    longDescription:
      "La ortodoncia invisible es un tratamiento de alineación dental que utiliza férulas transparentes removibles, fabricadas a medida, para corregir la posición de los dientes de forma discreta. El precio de la ortodoncia invisible en España varía según la complejidad del caso y la marca del sistema utilizado.\n\nA diferencia de los brackets tradicionales, los alineadores transparentes son prácticamente imperceptibles y se pueden retirar para comer e higienizarse. El tratamiento consiste en una serie de férulas que se cambian cada 1-2 semanas, moviendo los dientes gradualmente hasta alcanzar la posición deseada. Cuánto cuesta la ortodoncia invisible depende principalmente de si el caso es leve (apiñamiento menor, pequeños espacios) o complejo (mordida cruzada, sobremordida severa).\n\nExisten diversas marcas en el mercado español: Invisalign es la más reconocida, pero también hay alternativas como Spark, Alineadent o SureSmile que ofrecen resultados comparables a precios más competitivos. Es imprescindible que el tratamiento sea supervisado por un ortodoncista cualificado, independientemente de la marca elegida.",
    includes: [
      "Estudio de ortodoncia completo (fotografías, modelos, cefalometría)",
      "Escáner intraoral 3D",
      "Planificación digital del tratamiento (ClinCheck o equivalente)",
      "Juego completo de alineadores",
      "Ataches (si son necesarios)",
      "Revisiones periódicas durante el tratamiento",
    ],
    excludes: [
      "Retenedores fijos o removibles al finalizar",
      "Refinamientos adicionales (según el plan contratado)",
      "Stripping o reducción interproximal",
      "Tratamientos previos (limpiezas, empastes, extracciones)",
      "Blanqueamiento dental posterior",
    ],
    duration: "La duración media es de 12 a 24 meses para casos moderados. Los casos leves pueden resolverse en 6-8 meses, mientras que los complejos pueden requerir hasta 30 meses.",
    recovery: "No hay período de recuperación como tal. Las primeras 48-72 horas con cada juego de alineadores nuevo pueden causar presión y ligeras molestias. Se recomienda llevar los alineadores un mínimo de 22 horas al día.",
    factorsAffectingPrice: [
      "Complejidad del caso (leve, moderado o severo)",
      "Marca del sistema (Invisalign, Spark, Alineadent, etc.)",
      "Número de alineadores necesarios",
      "Inclusión o no de refinamientos",
      "Experiencia del ortodoncista (certificación, categoría de proveedor)",
      "Ciudad y tipo de clínica",
    ],
  },

  "invisalign-comprehensive": {
    longDescription:
      "Invisalign Comprehensive es el plan más completo de la marca Invisalign, diseñado para corregir maloclusiones moderadas y severas. El precio de Invisalign Comprehensive en España es superior al de otros planes de la misma marca, pero incluye alineadores ilimitados durante el período de tratamiento, lo que garantiza que se alcance el resultado óptimo.\n\nEste plan está indicado para pacientes con apiñamiento severo, espacios interdentales, mordida cruzada, sobremordida o mordida abierta. Cuánto cuesta Invisalign Comprehensive depende del ortodoncista y de su categoría como proveedor certificado (Silver, Gold, Platinum o Diamond), lo que refleja su experiencia con el sistema.\n\nLa ventaja principal de Invisalign Comprehensive frente a otros planes (Lite, Moderate) es que incluye refinamientos ilimitados durante un máximo de 5 años. Esto significa que si los dientes no alcanzan la posición ideal con la primera tanda de alineadores, se pueden solicitar tandas adicionales sin coste extra. El sistema ClinCheck permite al paciente ver una simulación 3D del resultado final antes de comenzar el tratamiento.",
    includes: [
      "Estudio ortodóncico completo con registros digitales",
      "Escáner intraoral iTero",
      "Planificación ClinCheck con simulación 3D",
      "Alineadores ilimitados durante el tratamiento",
      "Refinamientos ilimitados (hasta 5 años)",
      "Ataches y elásticos si son necesarios",
      "Revisiones periódicas (cada 4-8 semanas)",
    ],
    excludes: [
      "Retenedores Vivera u otros retenedores finales",
      "Stripping o IPR (reducción interproximal del esmalte)",
      "Extracciones dentales previas",
      "Tratamientos complementarios (implantes, carillas)",
      "Microtornillos de anclaje (si fueran necesarios)",
    ],
    duration: "Entre 18 y 36 meses de media, dependiendo de la complejidad del caso. Se realizan revisiones cada 4-8 semanas para supervisar el progreso.",
    recovery: "No requiere recuperación. Puede haber molestias leves los primeros días con cada nuevo alineador. Los ataches pueden generar ligera irritación en labios y mejillas al inicio.",
    factorsAffectingPrice: [
      "Categoría del proveedor Invisalign (Silver, Gold, Platinum, Diamond)",
      "Severidad de la maloclusión",
      "Número de arcadas a tratar (una o ambas)",
      "Ciudad y reputación de la clínica",
      "Inclusión de retenedores en el precio final",
      "Necesidad de microtornillos o auxiliares adicionales",
    ],
  },

  "blanqueamiento-dental": {
    longDescription:
      "El blanqueamiento dental es un tratamiento estético que aclara el color de los dientes eliminando manchas y decoloraciones causadas por el café, el té, el tabaco, el vino tinto o el envejecimiento natural. El precio del blanqueamiento dental en España varía según la técnica utilizada: en clínica con lámpara LED, en casa con férulas personalizadas o tratamiento combinado.\n\nEl blanqueamiento en clínica utiliza peróxido de hidrógeno en concentraciones profesionales (hasta el 6% según la normativa europea vigente), activado con luz LED o láser, y ofrece resultados visibles en una sola sesión. Cuánto cuesta un blanqueamiento dental depende principalmente de si se realiza exclusivamente en clínica, solo en casa o combinando ambos métodos para un resultado más duradero.\n\nEs importante tener en cuenta que el blanqueamiento solo actúa sobre el esmalte natural, no sobre empastes, coronas ni carillas. Antes de realizar el tratamiento es necesario tener una boca sana, sin caries ni enfermedad periodontal activa. Los resultados suelen durar entre 1 y 3 años, dependiendo de los hábitos del paciente.",
    includes: [
      "Revisión dental previa para descartar contraindicaciones",
      "Limpieza dental (en muchas clínicas)",
      "Aplicación del agente blanqueador profesional",
      "Sesión con lámpara LED o láser (blanqueamiento en clínica)",
      "Férulas personalizadas y gel (blanqueamiento domiciliario)",
      "Instrucciones de cuidado posterior",
    ],
    excludes: [
      "Tratamiento de caries o enfermedad periodontal previa",
      "Sesiones de mantenimiento o repaso",
      "Blanqueamiento interno de dientes endodonciados",
      "Sustitución de empastes antiguos que no coincidan con el nuevo tono",
    ],
    duration: "El blanqueamiento en clínica dura entre 45 y 90 minutos en una sola sesión. El blanqueamiento domiciliario requiere entre 10 y 14 días de uso diario (30-60 minutos al día). El combinado suma ambos tiempos.",
    recovery: "No requiere recuperación. Es habitual experimentar sensibilidad dental durante las 24-72 horas posteriores. Se recomienda evitar alimentos y bebidas con colorantes intensos durante las primeras 48 horas.",
    factorsAffectingPrice: [
      "Tipo de blanqueamiento (en clínica, domiciliario o combinado)",
      "Tecnología utilizada (LED, láser, fotoactivación)",
      "Concentración y marca del agente blanqueador",
      "Inclusión o no de limpieza dental previa",
      "Grado de decoloración inicial",
      "Ubicación y categoría de la clínica",
    ],
  },

  "carillas-de-porcelana": {
    longDescription:
      "Las carillas de porcelana son láminas ultrafinas de cerámica que se adhieren a la cara visible de los dientes para mejorar su forma, color, tamaño y alineación. El precio de las carillas de porcelana en España se calcula por unidad, y generalmente se colocan entre 6 y 10 carillas para conseguir una sonrisa armónica.\n\nExisten distintos tipos de cerámica: las carillas de feldespato se tallan a mano en el laboratorio, las de disilicato de litio (e.max) ofrecen mayor resistencia, y las de porcelana estratificada proporcionan la estética más natural. Cuánto cuestan las carillas de porcelana depende del material cerámico elegido, del laboratorio protésico y de la experiencia del odontólogo.\n\nA diferencia de las carillas de composite, las de porcelana son más resistentes a las manchas, tienen un brillo más natural y su durabilidad es significativamente mayor (entre 10 y 20 años con buen cuidado). Sin embargo, requieren un ligero tallado del esmalte dental, lo que las convierte en un tratamiento irreversible. El proceso completo requiere al menos dos visitas: una para la preparación y toma de impresiones, y otra para la cementación definitiva.",
    includes: [
      "Estudio estético y diseño de sonrisa digital (DSD)",
      "Preparación dental (tallado mínimo del esmalte)",
      "Impresiones digitales o convencionales",
      "Fabricación de las carillas en laboratorio",
      "Prueba estética con provisionales (mock-up)",
      "Cementación adhesiva definitiva",
      "Revisiones de ajuste",
    ],
    excludes: [
      "Tratamientos previos necesarios (blanqueamiento, endodoncias)",
      "Carillas provisionales de larga duración",
      "Reposición por rotura fuera de garantía",
      "Férula de protección nocturna (recomendada si hay bruxismo)",
    ],
    duration: "El proceso completo requiere entre 2 y 4 semanas, con un mínimo de 2-3 citas. Cada cita dura entre 60 y 120 minutos dependiendo del número de carillas.",
    recovery: "No hay período de recuperación como tal. Puede haber sensibilidad dental leve durante los primeros días tras el tallado. La adaptación completa a las carillas es inmediata.",
    factorsAffectingPrice: [
      "Tipo de cerámica (feldespato, disilicato de litio, porcelana estratificada)",
      "Número de carillas necesarias",
      "Laboratorio protésico utilizado (nacional vs. premium)",
      "Experiencia del odontólogo en estética dental",
      "Necesidad de mock-up o prueba estética previa",
      "Complejidad del caso (correcciones de forma, cierre de diastemas)",
      "Ciudad y perfil de la clínica",
    ],
  },

  "carillas-de-composite": {
    longDescription:
      "Las carillas de composite son restauraciones estéticas realizadas directamente sobre los dientes con resina compuesta, un material moldeable que el dentista esculpe y polimeriza en la propia consulta. El precio de las carillas de composite en España es considerablemente inferior al de las carillas de porcelana, lo que las convierte en una alternativa accesible para mejorar la sonrisa.\n\nEl composite se aplica por capas sobre la superficie del diente, modelándose para corregir la forma, el color, pequeñas fracturas o espacios interdentales. Cuánto cuestan las carillas de composite depende del número de dientes a tratar y de la técnica empleada: las carillas directas se realizan en una sola sesión, mientras que las indirectas se fabrican en laboratorio sobre un modelo.\n\nLa principal ventaja de las carillas de composite es que, en muchos casos, no requieren tallar el esmalte dental, lo que las convierte en un tratamiento reversible. Sin embargo, su durabilidad es menor que las de porcelana (entre 5 y 8 años) y son más susceptibles a las manchas por alimentos y bebidas. Requieren pulidos periódicos para mantener su brillo y aspecto natural.",
    includes: [
      "Estudio estético previo",
      "Preparación dental mínima o nula",
      "Aplicación directa del composite por capas",
      "Polimerización con lámpara de luz",
      "Pulido y ajuste oclusal",
      "Revisión de control posterior",
    ],
    excludes: [
      "Blanqueamiento dental previo (recomendado para igualar el tono)",
      "Pulidos de mantenimiento periódicos",
      "Reparaciones por fracturas o desgaste",
      "Férula de protección nocturna",
    ],
    duration: "Las carillas directas se realizan en una sola cita de entre 60 y 180 minutos, dependiendo del número de dientes. Las indirectas requieren 2 citas separadas por 1-2 semanas.",
    recovery: "No requiere recuperación. El paciente puede comer y hacer vida normal inmediatamente. Se recomienda evitar alimentos muy duros y morderse las uñas para prolongar la durabilidad.",
    factorsAffectingPrice: [
      "Técnica empleada (directa o indirecta)",
      "Número de carillas",
      "Calidad y marca del composite utilizado",
      "Experiencia del dentista en estética dental",
      "Complejidad del caso",
      "Inclusión o no de mantenimiento posterior",
    ],
  },

  "corona-dental-de-circonio": {
    longDescription:
      "La corona dental de circonio es una funda protésica fabricada en óxido de circonio, un material cerámico de alta resistencia que ofrece una estética superior y una biocompatibilidad excelente. El precio de una corona de circonio en España es más elevado que el de las coronas de metal-porcelana, pero sus ventajas estéticas y funcionales lo justifican en la mayoría de los casos.\n\nEl circonio permite fabricar coronas sin base metálica, eliminando la línea oscura en el margen gingival que a veces se observa con las coronas de metal-porcelana. Cuánto cuesta una corona de circonio depende de si se trata de circonio monolítico (más resistente, ideal para molares) o circonio estratificado con porcelana (más estético, ideal para dientes anteriores).\n\nEstas coronas se diseñan y fresan mediante tecnología CAD/CAM, lo que garantiza un ajuste preciso y una reproducción fiel del color y la anatomía dental. Su durabilidad es excelente, con una vida útil media de 15 a 25 años. Están especialmente indicadas para dientes endodonciados, dientes con gran destrucción o como restauración sobre implantes.",
    includes: [
      "Tallado y preparación del diente",
      "Impresiones digitales o convencionales",
      "Corona provisional mientras se fabrica la definitiva",
      "Diseño y fabricación CAD/CAM en laboratorio",
      "Prueba de ajuste y color",
      "Cementación definitiva",
      "Revisiones posteriores",
    ],
    excludes: [
      "Endodoncia previa (si el diente lo requiere)",
      "Poste y muñón intrarradicular",
      "Alargamiento de corona quirúrgico",
      "Reconstrucción del muñón con composite",
    ],
    duration: "El proceso completo requiere entre 1 y 2 semanas, con 2-3 citas. El tallado y la toma de impresiones se realizan en la primera cita (45-60 minutos). La cementación definitiva en la última (30-45 minutos).",
    recovery: "No requiere recuperación significativa. Puede haber sensibilidad al frío durante los primeros días. Es habitual un breve período de adaptación a la mordida que se resuelve con un pequeño ajuste oclusal.",
    factorsAffectingPrice: [
      "Tipo de circonio (monolítico vs. estratificado con porcelana)",
      "Laboratorio protésico (nacional, premium o importado)",
      "Tecnología CAD/CAM de la clínica",
      "Ubicación del diente (anterior vs. posterior)",
      "Necesidad de poste intrarradicular",
      "Complejidad del caso (retallado, cambio de angulación)",
    ],
  },

  "corona-dental-metal-porcelana": {
    longDescription:
      "La corona dental de metal-porcelana combina una estructura interna metálica (generalmente una aleación de cromo-cobalto o níquel-cromo) con un recubrimiento exterior de porcelana que imita el color natural del diente. El precio de una corona de metal-porcelana en España es más asequible que el de las coronas de circonio, lo que la convierte en una opción muy popular.\n\nEste tipo de corona ofrece una buena combinación de resistencia mecánica (gracias a la subestructura metálica) y estética aceptable (por el recubrimiento cerámico). Cuánto cuesta una corona de metal-porcelana varía según el tipo de aleación utilizada: las aleaciones nobles (con contenido en oro o paladio) son más caras pero más biocompatibles que las aleaciones base.\n\nEntre sus limitaciones, destaca la posible aparición de una línea grisácea en el margen gingival con el tiempo, sobre todo si la encía se retrae. Además, la translucidez es menor que la de las coronas cerámicas puras, lo que puede notarse en dientes anteriores con buena iluminación. Aun así, su durabilidad es excelente (10-15 años de media) y siguen siendo una opción fiable y contrastada.",
    includes: [
      "Tallado del diente",
      "Impresiones (digitales o con silicona)",
      "Corona provisional de resina",
      "Fabricación en laboratorio (estructura metálica + porcelana)",
      "Prueba de metal y ajuste",
      "Cementación definitiva",
    ],
    excludes: [
      "Endodoncia (si es necesaria)",
      "Poste y muñón intrarradicular",
      "Reconstrucción del muñón dental",
      "Aleaciones nobles (oro, paladio) — suplemento adicional",
    ],
    duration: "Se necesitan 2-3 citas repartidas en 7-14 días. La preparación del diente dura unos 45 minutos y la cementación final unos 30 minutos.",
    recovery: "Sin período de recuperación. Posible sensibilidad térmica temporal los primeros días. Adaptación a la mordida rápida, con ajuste oclusal si fuera necesario.",
    factorsAffectingPrice: [
      "Tipo de aleación metálica (base vs. noble vs. seminoble)",
      "Laboratorio protésico",
      "Posición del diente (anterior vs. posterior)",
      "Necesidad de reconstrucción previa del muñón",
      "Endodoncia y poste si el diente lo requiere",
      "Ubicación de la clínica dental",
    ],
  },

  "limpieza-dental": {
    longDescription:
      "La limpieza dental profesional, también llamada profilaxis o tartrectomía, consiste en la eliminación del sarro (cálculo dental) y la placa bacteriana acumulada en los dientes y encías mediante instrumental ultrasónico y manual. El precio de una limpieza dental en España es uno de los más accesibles de la odontología, y muchas clínicas la ofrecen como parte de planes de prevención.\n\nEl sarro no puede eliminarse con el cepillado doméstico, por lo que se recomienda realizar una limpieza profesional al menos una o dos veces al año. Cuánto cuesta una limpieza dental depende de la cantidad de sarro acumulado, del tiempo necesario y de si incluye pulido y fluorización.\n\nMás allá de la estética, la limpieza dental es fundamental para prevenir la gingivitis y la periodontitis, enfermedades de las encías que, sin tratamiento, pueden provocar la pérdida de dientes. Durante la sesión, el higienista o el dentista también pueden detectar caries incipientes, problemas de encías u otras patologías de forma precoz.",
    includes: [
      "Eliminación de sarro supragingival con ultrasonidos",
      "Eliminación de manchas superficiales",
      "Pulido dental con pasta profiláctica",
      "Revisión del estado de encías",
      "Instrucciones de higiene oral personalizadas",
    ],
    excludes: [
      "Curetaje o raspado subgingival (tratamiento periodontal)",
      "Aplicación de flúor profesional (en algunas clínicas es extra)",
      "Radiografías diagnósticas",
      "Tratamiento de caries detectadas",
      "Blanqueamiento dental",
    ],
    duration: "Entre 30 y 60 minutos, dependiendo de la cantidad de sarro acumulado.",
    recovery: "No requiere recuperación. Puede haber sensibilidad dental leve durante 24-48 horas, especialmente al frío. Las encías pueden sangrar ligeramente si había inflamación previa (gingivitis).",
    factorsAffectingPrice: [
      "Cantidad de sarro acumulado",
      "Inclusión de pulido y/o fluorización",
      "Si la realiza un higienista o un odontólogo",
      "Tipo de clínica (cadena dental vs. clínica privada)",
      "Si forma parte de un plan de mantenimiento o es sesión suelta",
      "Ubicación geográfica",
    ],
  },

  "empaste-dental": {
    longDescription:
      "El empaste dental, también conocido como obturación, es el tratamiento para restaurar un diente dañado por caries. Consiste en eliminar el tejido dental afectado y rellenar la cavidad con un material restaurador, habitualmente composite (resina compuesta) del color del diente. El precio de un empaste dental en España depende del tamaño de la caries y del número de superficies afectadas del diente.\n\nEl procedimiento se realiza bajo anestesia local y es completamente indoloro. Cuánto cuesta un empaste dental varía según si la caries es pequeña (una superficie), mediana (dos superficies) o grande (tres o más superficies o reconstrucción). Los empastes de amalgama (metal plateado) están en desuso en España, siendo el composite estético el material estándar.\n\nDetectar y tratar las caries a tiempo es crucial para evitar tratamientos más complejos y costosos como las endodoncias o las coronas. Una caries pequeña se resuelve en pocos minutos; si se deja avanzar hasta afectar el nervio, el tratamiento necesario será significativamente más invasivo y caro.",
    includes: [
      "Anestesia local",
      "Eliminación del tejido cariado",
      "Desinfección de la cavidad",
      "Obturación con composite estético",
      "Pulido y ajuste de la mordida",
    ],
    excludes: [
      "Radiografías diagnósticas",
      "Endodoncia (si la caries ha alcanzado el nervio)",
      "Corona dental (si la destrucción es muy extensa)",
      "Reconstrucción con poste (en dientes muy dañados)",
    ],
    duration: "Entre 20 y 45 minutos por diente, dependiendo del tamaño y localización de la caries.",
    recovery: "No requiere recuperación. La anestesia se pasa en 1-3 horas. Se puede comer con normalidad una vez desaparezca el efecto anestésico. Es normal cierta sensibilidad al frío durante unos días.",
    factorsAffectingPrice: [
      "Tamaño de la caries (número de superficies afectadas)",
      "Localización del diente (anterior vs. posterior)",
      "Material utilizado (composite estándar vs. alta gama)",
      "Si requiere reconstrucción parcial del diente",
      "Tipo de clínica y ciudad",
    ],
  },

  "endodoncia-unirradicular": {
    longDescription:
      "La endodoncia unirradicular es un tratamiento de conductos que se realiza en dientes con una sola raíz, como los incisivos y caninos. Consiste en eliminar el nervio (pulpa dental) infectado o inflamado, limpiar y desinfectar el conducto radicular e incluye su sellado con un material biocompatible. El precio de una endodoncia unirradicular en España es el más bajo de los tres tipos de endodoncia, al implicar un solo conducto.\n\nEste tratamiento es necesario cuando la caries ha avanzado hasta afectar el nervio del diente, provocando dolor intenso, sensibilidad prolongada al frío o al calor, o infección (absceso dental). Cuánto cuesta una endodoncia unirradicular depende de la complejidad del conducto, la experiencia del profesional y la tecnología utilizada.\n\nGracias a la endodoncia, se evita la extracción del diente, conservando su estructura natural. Un diente endodonciado puede durar toda la vida si se restaura correctamente, aunque al perder su irrigación sanguínea se vuelve más frágil, por lo que en muchos casos se recomienda colocar una corona protectora.",
    includes: [
      "Radiografía periapical diagnóstica",
      "Anestesia local",
      "Aislamiento con dique de goma",
      "Apertura cameral y localización del conducto",
      "Instrumentación y limpieza del conducto",
      "Irrigación con desinfectantes (hipoclorito de sodio)",
      "Obturación del conducto con gutapercha",
      "Radiografía de control final",
    ],
    excludes: [
      "Reconstrucción del diente posterior a la endodoncia",
      "Corona dental protectora",
      "Poste intrarradicular (si es necesario)",
      "Retratamiento endodóncico (si fracasa)",
      "Medicación postoperatoria",
    ],
    duration: "Se realiza habitualmente en una sola sesión de 45 a 60 minutos. En casos de infección aguda puede requerir dos sesiones con medicación intraconducto entre ambas.",
    recovery: "Molestias leves a la masticación durante 2-5 días, controlables con ibuprofeno o paracetamol. Es normal notar cierta sensibilidad a la presión. Si aparece dolor intenso o hinchazón, debe consultarse al dentista.",
    factorsAffectingPrice: [
      "Uso de microscopio operatorio o lupas de aumento",
      "Instrumentación rotatoria (níquel-titanio) vs. manual",
      "Experiencia del endodoncista",
      "Complejidad del conducto (curvaturas, calcificaciones)",
      "Número de sesiones necesarias",
      "Ciudad y tipo de clínica",
    ],
  },

  "endodoncia-birradicular": {
    longDescription:
      "La endodoncia birradicular se realiza en dientes con dos raíces y, por tanto, dos conductos radiculares, principalmente premolares superiores e inferiores. El precio de una endodoncia birradicular en España es superior al de una unirradicular, ya que requiere el tratamiento de dos conductos independientes, lo que incrementa la complejidad y el tiempo del procedimiento.\n\nEl tratamiento sigue el mismo principio: eliminar el tejido pulpar dañado, limpiar y conformar cada conducto e incluye el sellado hermético de ambos con gutapercha. Cuánto cuesta una endodoncia birradicular depende de la anatomía de los conductos, que puede presentar variaciones (conductos curvos, bifurcaciones o conductos accesorios) que complican el tratamiento.\n\nLa endodoncia birradicular es esencial para salvar premolares comprometidos por caries profundas, traumatismos o infecciones. Sin este tratamiento, la única alternativa sería la extracción. Los premolares son dientes funcionales importantes para la masticación, por lo que conservarlos mediante endodoncia y una buena restauración posterior es siempre la opción preferible.",
    includes: [
      "Radiografías diagnósticas",
      "Anestesia local",
      "Aislamiento absoluto con dique de goma",
      "Localización y tratamiento de los dos conductos",
      "Instrumentación mecanizada",
      "Irrigación y desinfección de ambos conductos",
      "Obturación con gutapercha y sellador",
      "Radiografía de control",
    ],
    excludes: [
      "Reconstrucción del diente",
      "Corona dental",
      "Poste de fibra de vidrio",
      "Retratamiento en caso de fracaso",
      "Medicación (antibióticos, antiinflamatorios)",
    ],
    duration: "Entre 60 y 90 minutos en una sesión, aunque casos complejos pueden requerir dos sesiones separadas.",
    recovery: "Molestias moderadas durante 3-5 días, con posible sensibilidad a la mordida. Se trata con analgésicos convencionales. Es importante no masticar alimentos duros con el diente hasta su restauración definitiva.",
    factorsAffectingPrice: [
      "Anatomía de los conductos (variaciones, curvaturas)",
      "Uso de microscopio endodóncico",
      "Sistema de instrumentación utilizado",
      "Si lo realiza un endodoncista especialista o un dentista generalista",
      "Número de sesiones",
      "Necesidad de localizador de ápice electrónico",
    ],
  },

  "endodoncia-multirradicular": {
    longDescription:
      "La endodoncia multirradicular es el tratamiento de conductos en dientes con tres o más raíces, como los molares superiores (que suelen tener tres raíces y tres o cuatro conductos) y algunos molares inferiores (con dos raíces pero frecuentemente tres o cuatro conductos). El precio de una endodoncia multirradicular en España es el más alto de los tres tipos por su mayor complejidad técnica y duración.\n\nTratar múltiples conductos requiere una habilidad considerable, ya que cada conducto puede tener una anatomía diferente: curvaturas, bifurcaciones, conductos calcificados o forámenes apicales múltiples. Cuánto cuesta una endodoncia multirradicular refleja la dificultad de localizar y tratar todos los conductos, algo en lo que el uso del microscopio operatorio es especialmente valioso.\n\nSalvar un molar mediante endodoncia es siempre preferible a la extracción, ya que los molares son imprescindibles para la masticación y su pérdida desencadena desplazamientos del resto de dientes. Tras la endodoncia multirradicular, es prácticamente obligatorio restaurar el diente con una corona, ya que la pérdida de estructura suele ser considerable.",
    includes: [
      "Estudio radiográfico completo",
      "Anestesia local (puede requerir técnicas complementarias)",
      "Aislamiento con dique de goma",
      "Localización de todos los conductos (3-4 habituales)",
      "Instrumentación y limpieza de cada conducto",
      "Irrigación con protocolos avanzados",
      "Obturación de todos los conductos",
      "Radiografía de control final",
    ],
    excludes: [
      "Reconstrucción con composite",
      "Corona dental (muy recomendada en molares)",
      "Poste intrarradicular",
      "Retratamiento endodóncico",
      "Apicectomía (cirugía endodóncica)",
    ],
    duration: "Entre 90 y 120 minutos. Es habitual realizarla en una o dos sesiones, dependiendo de la complejidad.",
    recovery: "Las molestias pueden ser moderadas durante 3-7 días, con mayor sensibilidad a la presión que en endodoncias de menos conductos. El uso de antiinflamatorios durante los primeros días es habitual.",
    factorsAffectingPrice: [
      "Número real de conductos (3, 4 o más)",
      "Presencia de conductos calcificados o curvos",
      "Uso de microscopio operatorio",
      "Formación especializada del profesional",
      "Tecnología utilizada (localizador apical, sistema rotatorio)",
      "Número de sesiones necesarias",
      "Ciudad y tipo de clínica",
    ],
  },

  "extraccion-muela-del-juicio": {
    longDescription:
      "La extracción de la muela del juicio es uno de los procedimientos quirúrgicos más frecuentes en odontología. Las muelas del juicio (terceros molares) suelen erupcionar entre los 17 y 25 años, y con frecuencia lo hacen de forma incorrecta: parcialmente incluidas, impactadas contra el segundo molar o retenidas dentro del hueso. El precio de la extracción de la muela del juicio en España varía significativamente según la dificultad del caso.\n\nLas indicaciones más habituales para la extracción son la pericoronaritis (infección del tejido que cubre parcialmente la muela), la caries en una posición inaccesible para restaurar, la afectación del molar adyacente o la indicación ortodóncica. Cuánto cuesta extraer una muela del juicio depende fundamentalmente de si es una extracción simple (muela erupcionada) o quirúrgica (muela incluida o semiincluida que requiere osteotomía y odontosección).\n\nLa extracción quirúrgica de cordales incluidos es un procedimiento más complejo que requiere realizar un colgajo en la encía, retirar hueso alrededor de la muela y, en muchos casos, fragmentarla para extraerla por partes. Se recomienda que sea realizada por un cirujano oral o maxilofacial.",
    includes: [
      "Radiografía panorámica o periapical diagnóstica",
      "Anestesia local",
      "Extracción de la muela (simple o quirúrgica)",
      "Sutura (si es necesaria)",
      "Instrucciones postoperatorias detalladas",
      "Revisión y retirada de puntos (a los 7-10 días)",
    ],
    excludes: [
      "TAC 3D (necesario en casos complejos con proximidad al nervio dentario)",
      "Sedación consciente o anestesia general",
      "Medicación postoperatoria (antibióticos, antiinflamatorios)",
      "Membrana de colágeno o regeneración ósea",
      "Extracción de las demás muelas del juicio (se presupuestan individualmente)",
    ],
    duration: "Una extracción simple dura entre 15 y 30 minutos. Una extracción quirúrgica de muela incluida puede requerir entre 30 y 60 minutos.",
    recovery: "La recuperación completa tarda entre 7 y 14 días. La inflamación máxima se produce a las 48-72 horas. Es habitual presentar hinchazón, molestias y dificultad para abrir la boca durante los primeros 3-5 días. Se recomienda dieta blanda, frío local y reposo relativo.",
    factorsAffectingPrice: [
      "Grado de inclusión (erupcionada, semiincluida, incluida en hueso)",
      "Posición de la muela (horizontal, vertical, mesioangular)",
      "Proximidad al nervio dentario inferior",
      "Si la realiza un dentista generalista o un cirujano oral",
      "Necesidad de TAC 3D previo",
      "Uso de sedación consciente",
      "Ciudad y tipo de clínica",
    ],
  },

  "curetaje-dental": {
    longDescription:
      "El curetaje dental, también llamado raspado y alisado radicular, es un tratamiento periodontal no quirúrgico que consiste en la eliminación del sarro y las bacterias acumuladas por debajo de la línea de las encías, en las llamadas bolsas periodontales. El precio del curetaje dental en España se suele presupuestar por cuadrante (la boca se divide en cuatro cuadrantes) o por arcada.\n\nEste tratamiento es necesario cuando el paciente presenta periodontitis (enfermedad periodontal), que se manifiesta con sangrado de encías, mal aliento persistente, retracción gingival y formación de bolsas periodontales superiores a 4 mm. Cuánto cuesta un curetaje dental depende del número de cuadrantes afectados y de la severidad de la enfermedad periodontal.\n\nA diferencia de la limpieza dental convencional, que elimina el sarro visible por encima de la encía, el curetaje actúa en profundidad dentro de las bolsas periodontales. Se realiza bajo anestesia local y puede requerir varias sesiones. Es un tratamiento imprescindible para detener la progresión de la periodontitis, que, sin intervención, acaba provocando la pérdida de los dientes por destrucción del hueso que los soporta.",
    includes: [
      "Sondaje periodontal completo (periodontograma)",
      "Anestesia local",
      "Raspado subgingival con curetas y/o ultrasonidos",
      "Alisado radicular",
      "Instrucciones de higiene periodontal",
      "Revisión de reevaluación (a las 4-6 semanas)",
    ],
    excludes: [
      "Radiografías periapicales o panorámica (estudio periodontal previo)",
      "Cirugía periodontal (si las bolsas persisten tras el curetaje)",
      "Regeneración ósea guiada",
      "Mantenimiento periodontal posterior (cada 3-6 meses)",
      "Ferulización de dientes con movilidad",
    ],
    duration: "Cada cuadrante requiere entre 30 y 45 minutos. Un tratamiento completo (4 cuadrantes) suele repartirse en 2 sesiones de 60-90 minutos, tratando dos cuadrantes por sesión.",
    recovery: "Las encías pueden estar sensibles y sangrar ligeramente durante 2-3 días. La sensibilidad dental al frío puede aumentar temporalmente al quedar expuestas superficies radiculares. Se recomienda cepillado suave y enjuague con clorhexidina durante 10-15 días.",
    factorsAffectingPrice: [
      "Número de cuadrantes afectados",
      "Severidad de la enfermedad periodontal",
      "Si se realiza con curetas manuales, ultrasonidos o láser",
      "Inclusión de reevaluación posterior",
      "Experiencia del periodoncista",
      "Uso de antibióticos locales en las bolsas (Periochip, Atridox)",
    ],
  },

  "brackets-metalicos": {
    longDescription:
      "Los brackets metálicos son el sistema de ortodoncia fija más utilizado y contrastado. Consisten en pequeñas piezas de acero inoxidable adheridas a la superficie de cada diente, unidas por un arco metálico que ejerce fuerzas controladas para mover los dientes a su posición correcta. El precio de los brackets metálicos en España es generalmente el más económico dentro de las opciones de ortodoncia fija.\n\nEste sistema es eficaz para tratar prácticamente cualquier tipo de maloclusión: apiñamiento, separaciones entre dientes, mordida cruzada, sobremordida, mordida abierta y problemas de alineación severos. Cuánto cuestan los brackets metálicos depende de la duración estimada del tratamiento, la complejidad del caso y si se trata uno o ambos maxilares.\n\nAunque su principal desventaja es la estética (son los más visibles), los brackets metálicos ofrecen una relación calidad-precio excelente y permiten un control muy preciso de los movimientos dentales. Los sistemas actuales utilizan brackets de perfil bajo y arcos de alta tecnología (níquel-titanio termoactivos) que reducen las molestias y acortan los tiempos de tratamiento respecto a décadas anteriores.",
    includes: [
      "Estudio de ortodoncia (radiografías, fotografías, modelos)",
      "Cefalometría y trazado cefalométrico",
      "Plan de tratamiento personalizado",
      "Colocación de brackets y arcos",
      "Revisiones mensuales de ajuste durante todo el tratamiento",
      "Retirada de brackets al finalizar",
    ],
    excludes: [
      "Retenedores fijos y/o removibles al finalizar",
      "Extracciones dentales (si el plan lo requiere)",
      "Microtornillos de anclaje",
      "Tratamientos complementarios (empastes, limpiezas durante el tratamiento)",
      "Cera de ortodoncia y productos de higiene especiales",
    ],
    duration: "La duración media del tratamiento es de 18 a 24 meses, aunque puede variar entre 12 meses (casos leves) y 36 meses (casos complejos).",
    recovery: "No hay recuperación como tal. Las primeras 3-5 días tras la colocación y cada ajuste mensual pueden causar molestias y sensibilidad. Es necesario adaptar la higiene bucal (cepillos interdentales, irrigador) y evitar alimentos duros o pegajosos.",
    factorsAffectingPrice: [
      "Complejidad del caso ortodóncico",
      "Duración estimada del tratamiento",
      "Tratamiento de una o ambas arcadas",
      "Tipo de brackets (convencionales vs. autoligables)",
      "Necesidad de extracciones o microtornillos",
      "Experiencia del ortodoncista",
      "Ciudad y tipo de clínica",
    ],
  },

  "brackets-de-zafiro": {
    longDescription:
      "Los brackets de zafiro son una variante estética de la ortodoncia fija que utiliza brackets fabricados en cristal de zafiro monocristalino, un material transparente que se mimetiza con el color del diente. El precio de los brackets de zafiro en España es superior al de los metálicos, pero ofrece una apariencia mucho más discreta manteniendo la eficacia del tratamiento.\n\nEl zafiro monocristalino es uno de los materiales más transparentes y resistentes a las manchas disponibles para brackets estéticos, superando en este aspecto a los brackets de cerámica convencional, que tienden a volverse amarillentos con el tiempo. Cuánto cuestan los brackets de zafiro depende de los mismos factores que los metálicos (complejidad, duración, ciudad), con un suplemento por el material del bracket.\n\nEstos brackets están especialmente indicados para pacientes adultos que necesitan ortodoncia pero prefieren un tratamiento más discreto que los brackets metálicos. Su transparencia los hace prácticamente invisibles, sobre todo si se combinan con arcos estéticos recubiertos de teflón blanco. La eficacia del tratamiento es comparable a la de los brackets metálicos, aunque los tiempos de tratamiento pueden ser ligeramente superiores en algunos casos debido a la mayor fricción del material.",
    includes: [
      "Estudio ortodóncico completo",
      "Cefalometría y planificación del tratamiento",
      "Brackets de zafiro monocristalino",
      "Arcos de ortodoncia (metálicos o estéticos según fase)",
      "Revisiones periódicas de ajuste",
      "Retirada de aparatología al finalizar",
    ],
    excludes: [
      "Retenedores fijos y removibles",
      "Arcos estéticos blancos (suplemento en algunas clínicas)",
      "Extracciones o microtornillos",
      "Limpiezas dentales durante el tratamiento",
      "Sustitución de brackets rotos por el paciente",
    ],
    duration: "Entre 18 y 30 meses de media. Los casos leves pueden tratarse en 12-15 meses y los complejos pueden superar los 30 meses.",
    recovery: "Similar a los brackets metálicos. Molestias leves los primeros días tras la colocación y tras cada ajuste. Pueden producir menos irritación en labios y mejillas que los metálicos al tener bordes más redondeados.",
    factorsAffectingPrice: [
      "Marca de los brackets de zafiro (Inspire ICE, Radiance, Pure, etc.)",
      "Duración y complejidad del caso",
      "Uso de arcos estéticos adicionales",
      "Tratamiento de una o ambas arcadas",
      "Inclusión de retenedores en el precio",
      "Reputación del ortodoncista",
    ],
  },

  "all-on-4": {
    longDescription:
      "El All-on-4 es una técnica de rehabilitación oral completa que permite sustituir todos los dientes de una arcada (superior, inferior o ambas) mediante una prótesis fija anclada sobre solo cuatro implantes dentales estratégicamente colocados. El precio del All-on-4 en España representa una inversión significativa, pero es considerablemente menor que colocar un implante individual para cada diente perdido.\n\nLa innovación del protocolo All-on-4 radica en la inclinación de los dos implantes posteriores a 45 grados, lo que permite aprovechar al máximo el hueso disponible y, en muchos casos, evitar injertos óseos. Cuánto cuesta un All-on-4 depende del tipo de prótesis (resina, cerámica híbrida o circonio), del número de arcadas a rehabilitar y de si se ofrece carga inmediata (dientes provisionales el mismo día de la cirugía).\n\nEsta técnica está especialmente indicada para pacientes edéntulos (sin dientes) o con dentición terminal (dientes que no pueden conservarse) que buscan una solución fija sin necesidad de prótesis removible. La carga inmediata permite al paciente salir de la clínica el mismo día con una prótesis provisional fija, recuperando la función masticatoria y la estética de forma inmediata.",
    includes: [
      "Estudio completo con TAC 3D y planificación digital",
      "Extracciones de dientes remanentes (si los hay)",
      "Colocación de 4 implantes por arcada",
      "Prótesis provisional de carga inmediata (dientes el mismo día)",
      "Revisiones postoperatorias",
      "Prótesis definitiva (a los 4-6 meses)",
    ],
    excludes: [
      "Sedación consciente o anestesia general",
      "Regeneración ósea (normalmente no necesaria, pero posible)",
      "Tratamiento de la arcada contraria",
      "Prótesis definitiva en circonio (suplemento significativo)",
      "Mantenimiento anual de la prótesis (rebasados, ajustes)",
    ],
    duration: "La cirugía dura entre 2 y 4 horas por arcada. El paciente sale con dientes provisionales fijos el mismo día. La prótesis definitiva se coloca entre 4 y 6 meses después, tras la osteointegración completa.",
    recovery: "La primera semana es la más delicada: inflamación significativa, molestias y dieta líquida o muy blanda. La recuperación progresiva se completa en 2-3 semanas. Dieta blanda durante el primer mes. No fumar durante al menos 2 semanas.",
    factorsAffectingPrice: [
      "Material de la prótesis definitiva (resina, cerámica híbrida, circonio completo)",
      "Marca de los implantes",
      "Una o dos arcadas",
      "Inclusión de sedación",
      "Necesidad de extracciones previas",
      "Uso de cirugía guiada digital",
      "Experiencia del equipo quirúrgico",
      "Ciudad y prestigio de la clínica",
    ],
  },

  "protesis-removible-completa": {
    longDescription:
      "La prótesis removible completa, comúnmente llamada dentadura postiza, es un aparato protésico que sustituye todos los dientes de una arcada y se apoya directamente sobre la mucosa y el hueso alveolar. El precio de una prótesis removible completa en España es la opción más económica para rehabilitar una boca completamente edéntula, siendo accesible para la mayoría de los pacientes.\n\nExisten diferentes tipos de prótesis removibles completas según el material de la base: las de resina acrílica son las más habituales y económicas, mientras que las de base metálica (esquelética) ofrecen mayor resistencia y menor grosor. Cuánto cuesta una prótesis removible completa depende del material, del laboratorio protésico y de si incluye dientes de resina estándar o dientes de alta gama con mejor estética y resistencia al desgaste.\n\nAunque las prótesis fijas sobre implantes ofrecen mayor confort y estabilidad, la prótesis removible sigue siendo una solución válida para muchos pacientes, especialmente cuando la colocación de implantes no es posible por motivos de salud o económicos. Su principal inconveniente es la menor estabilidad y la necesidad de adaptación por parte del paciente, sobre todo en la arcada inferior.",
    includes: [
      "Toma de impresiones primarias y funcionales",
      "Registro de mordida y planchas de articulación",
      "Prueba de dientes en cera",
      "Prótesis definitiva con dientes de resina",
      "Ajustes iniciales post-entrega",
    ],
    excludes: [
      "Extracciones previas de dientes remanentes",
      "Regulación de la cresta alveolar (cirugía preprotésica)",
      "Rebasados periódicos (ajuste al hueso cambiante)",
      "Adhesivo para prótesis",
      "Prótesis sobre implantes (sobredentadura)",
      "Reparaciones por fractura",
    ],
    duration: "El proceso de fabricación requiere entre 3 y 5 citas repartidas en 2-4 semanas. Cada cita dura entre 30 y 60 minutos.",
    recovery: "El período de adaptación es de 2-4 semanas, durante las cuales es habitual tener dificultades al hablar y masticar. Pueden aparecer rozaduras que requieren ajustes en la clínica. La capacidad masticatoria se recupera entre un 60% y un 80% respecto a la dentición natural.",
    factorsAffectingPrice: [
      "Material de la base (resina acrílica vs. base metálica)",
      "Calidad de los dientes protésicos (estándar, gama media, alta gama)",
      "Laboratorio protésico",
      "Número de ajustes incluidos",
      "Necesidad de cirugía preprotésica",
      "Ciudad y tipo de clínica",
    ],
  },

  "ferula-de-descarga": {
    longDescription:
      "La férula de descarga es un dispositivo removible de resina rígida que se coloca sobre los dientes durante la noche para protegerlos del bruxismo (apretamiento o rechinamiento involuntario). El precio de una férula de descarga en España varía según el tipo de férula y el método de fabricación, pero es una inversión que previene daños mucho más costosos.\n\nEl bruxismo afecta a un porcentaje significativo de la población adulta y puede provocar desgaste dental severo, fracturas de dientes y restauraciones, dolor en la articulación temporomandibular (ATM), cefaleas y tensión muscular. Cuánto cuesta una férula de descarga depende de si es una férula tipo Michigan (rígida, la más recomendada), una férula blanda (menos duradera) o una férula articular (para problemas de ATM más complejos).\n\nEs fundamental que la férula sea confeccionada a medida por un odontólogo, tomando impresiones y realizando ajustes oclusales precisos. Las férulas prefabricadas de farmacia no ofrecen los mismos beneficios y pueden incluso empeorar el problema. Una férula de descarga bien ajustada no solo protege los dientes, sino que también relaja la musculatura y reduce la presión sobre la articulación temporomandibular.",
    includes: [
      "Exploración y diagnóstico de bruxismo",
      "Toma de impresiones (digitales o convencionales)",
      "Fabricación personalizada en laboratorio",
      "Entrega con ajuste oclusal preciso",
      "Revisiones de ajuste iniciales",
    ],
    excludes: [
      "Tratamiento de la articulación temporomandibular (ATM)",
      "Fisioterapia o tratamiento miofuncional",
      "Restauración de dientes ya dañados por el bruxismo",
      "Toxina botulínica (Botox) en maseteros",
      "Reposición de la férula por pérdida o desgaste",
    ],
    duration: "Requiere 2 citas: una para la toma de impresiones (20-30 minutos) y otra para la entrega y ajuste (30-45 minutos), separadas por 7-14 días.",
    recovery: "No hay recuperación. La adaptación a dormir con la férula puede llevar unos días. Algunas personas experimentan ligera molestia muscular los primeros días, que es señal de que la férula está cumpliendo su función.",
    factorsAffectingPrice: [
      "Tipo de férula (Michigan rígida, semirrígida, blanda, articular)",
      "Material utilizado (resina termoconformada, fresada por CAD/CAM)",
      "Laboratorio protésico",
      "Complejidad del ajuste oclusal",
      "Inclusión de revisiones de seguimiento",
      "Si incluye caja de almacenamiento y productos de limpieza",
    ],
  },

  "puente-dental": {
    longDescription:
      "El puente dental es una prótesis fija que reemplaza uno o varios dientes ausentes apoyándose en los dientes naturales adyacentes (dientes pilares). El precio de un puente dental en España depende del número de piezas que lo componen y del material utilizado, siendo una alternativa a los implantes dentales para reponer dientes perdidos.\n\nEl puente más común es el de tres piezas: dos coronas que cubren los dientes pilares tallados y una pieza intermedia (póntico) que sustituye al diente ausente. Los materiales más utilizados son el metal-porcelana y el circonio. Cuánto cuesta un puente dental varía significativamente según se elija circonio (más estético y biocompatible) o metal-porcelana (más económico).\n\nLa principal ventaja del puente dental es que no requiere cirugía, a diferencia de los implantes, y el tratamiento se completa en pocas semanas. Sin embargo, tiene el inconveniente de que los dientes pilares deben tallarse (reducir su tamaño), sacrificando estructura dental sana. Por ello, los implantes suelen ser la opción preferida cuando las condiciones lo permiten. Aun así, el puente dental sigue siendo una solución fiable con una vida útil de 10 a 15 años.",
    includes: [
      "Tallado de los dientes pilares",
      "Impresiones digitales o convencionales",
      "Puente provisional mientras se fabrica el definitivo",
      "Fabricación en laboratorio",
      "Prueba de ajuste y color",
      "Cementación definitiva del puente",
    ],
    excludes: [
      "Endodoncias en los dientes pilares (si son necesarias)",
      "Reconstrucción de los dientes pilares",
      "Alargamiento de corona (si los pilares son cortos)",
      "Reposición por descementación o fractura fuera de garantía",
    ],
    duration: "Entre 2 y 3 semanas, con 2-3 citas. El tallado y toma de impresiones dura unos 60 minutos. La cementación final unos 30-45 minutos.",
    recovery: "Sin período de recuperación. Puede haber sensibilidad en los dientes tallados durante unos días, especialmente con alimentos fríos. La adaptación a la masticación es rápida.",
    factorsAffectingPrice: [
      "Número de piezas del puente (3, 4 o más)",
      "Material (metal-porcelana, circonio monolítico, circonio estratificado)",
      "Necesidad de endodoncias previas en los pilares",
      "Laboratorio protésico",
      "Ubicación en la boca (zona anterior vs. posterior)",
      "Ciudad y tipo de clínica dental",
    ],
  },

  "extraccion-dental-simple": {
    longDescription:
      "La extracción dental simple es la retirada de un diente que ha erupcionado completamente y cuya raíz no presenta complicaciones significativas. El precio de una extracción dental simple en España es uno de los tratamientos más asequibles y se realiza de forma rutinaria en cualquier consulta dental.\n\nEste procedimiento está indicado cuando un diente no puede ser restaurado por caries muy extensa, fractura irreparable, enfermedad periodontal avanzada con movilidad severa o por indicación ortodóncica. Cuánto cuesta una extracción dental simple depende de la dificultad prevista: un diente con movilidad por periodontitis se extrae con mayor facilidad que un diente firmemente anclado con raíces largas o curvas.\n\nLa extracción se realiza bajo anestesia local, utilizando fórceps (pinzas) y elevadores para luxar y retirar el diente de su alveolo. A diferencia de la extracción quirúrgica, no requiere colgajo, osteotomía ni odontosección. El alveolo cicatriza de forma natural en 1-2 semanas y la remodelación ósea completa se produce en 2-3 meses, momento en el que se puede planificar la reposición del diente con un implante, puente u otra prótesis.",
    includes: [
      "Radiografía periapical del diente",
      "Anestesia local",
      "Extracción con fórceps y/o elevadores",
      "Compresión y hemostasia",
      "Instrucciones postoperatorias",
      "Revisión si aparecen complicaciones",
    ],
    excludes: [
      "Medicación (antiinflamatorios, antibióticos si procede)",
      "Reposición del diente (implante, puente, prótesis)",
      "Regeneración ósea del alveolo (preservación alveolar)",
      "Extracción quirúrgica (si se complica)",
    ],
    duration: "Entre 10 y 20 minutos, incluyendo el tiempo de espera para que la anestesia haga efecto.",
    recovery: "Las molestias son leves y duran 1-3 días, controlables con analgésicos. El sangrado cesa en las primeras horas con la formación del coágulo. Se recomienda no enjuagar, no fumar ni beber con pajita durante las primeras 24 horas para evitar la alveolitis seca.",
    factorsAffectingPrice: [
      "Dificultad de la extracción (movilidad del diente, anatomía radicular)",
      "Posición del diente (anterior vs. posterior)",
      "Estado del diente (destruido, fracturado, con endodoncia previa)",
      "Si la realiza un dentista generalista o un cirujano",
      "Ciudad y tipo de clínica",
    ],
  },

  "primera-consulta-dental": {
    longDescription:
      "La primera consulta dental es la visita inicial al dentista en la que se realiza una exploración completa de la boca, se diagnostican los problemas existentes y se elabora un plan de tratamiento personalizado. El precio de la primera consulta dental en España varía considerablemente: muchas clínicas la ofrecen de forma gratuita como estrategia comercial, mientras que otras cobran un precio que incluye exploración y radiografías.\n\nDurante la primera visita, el odontólogo examina los dientes, las encías, la mucosa oral, la articulación temporomandibular y la oclusión (mordida). Cuánto cuesta la primera consulta dental suele depender de si incluye pruebas complementarias: una ortopantomografía (radiografía panorámica), radiografías periapicales o un escáner intraoral suponen un coste adicional en muchas clínicas.\n\nEsta visita es fundamental para establecer una relación de confianza con el profesional y conocer el estado real de la salud bucodental. Un buen diagnóstico inicial permite priorizar los tratamientos necesarios, presentar un presupuesto transparente y evitar sorpresas futuras. Se recomienda acudir al dentista para una revisión al menos una vez al año, incluso sin síntomas.",
    includes: [
      "Exploración clínica visual y táctil completa",
      "Evaluación de encías y tejidos blandos",
      "Valoración de la mordida (oclusión)",
      "Diagnóstico inicial y explicación de hallazgos",
      "Plan de tratamiento y presupuesto",
    ],
    excludes: [
      "Ortopantomografía (radiografía panorámica) — incluida en muchas clínicas, extra en otras",
      "Radiografías periapicales adicionales",
      "TAC 3D o escáner CBCT",
      "Limpieza dental (se programa aparte)",
      "Cualquier tratamiento dental",
    ],
    duration: "Entre 20 y 45 minutos, dependiendo de si incluye radiografías y del número de hallazgos a comentar con el paciente.",
    recovery: "No aplica. La primera consulta es un procedimiento diagnóstico sin ningún tipo de intervención.",
    factorsAffectingPrice: [
      "Si la clínica ofrece primera visita gratuita o de pago",
      "Inclusión de radiografía panorámica",
      "Inclusión de fotografías intraorales o escáner 3D",
      "Tipo de clínica (cadena dental vs. clínica privada)",
      "Tiempo dedicado por el profesional",
      "Ubicación geográfica de la clínica",
    ],
  },
};
