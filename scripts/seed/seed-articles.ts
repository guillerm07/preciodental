import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import * as schema from "../../src/lib/db/schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://preciodental:preciodental_dev@localhost:5432/preciodental";

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

// ── Article data ────────────────────────────────────────────────────────────────

interface ArticleData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  targetKeywords: string[];
}

const ARTICLES: ArticleData[] = [
  // ── Article 1: Implante dental ──────────────────────────────────────────────
  {
    title: "¿Cuánto cuesta un implante dental en España en 2026?",
    slug: "cuanto-cuesta-implante-dental-espana",
    excerpt:
      "Descubre los precios reales de un implante dental en España en 2026: desde 380 € solo el tornillo hasta 1.800 € con corona incluida. Analizamos qué incluye cada presupuesto, factores que influyen en el precio y cómo ahorrar.",
    metaTitle: "¿Cuánto cuesta un implante dental en España en 2026? Precios reales",
    metaDescription:
      "Precios actualizados de implantes dentales en España: de 380 € a 1.800 € según clínica y ciudad. Comparamos aseguradoras, cadenas y clínicas privadas.",
    targetKeywords: [
      "cuánto cuesta un implante dental",
      "precio implante dental",
      "implante dental precio españa",
    ],
    content: `## ¿Cuánto cuesta realmente un implante dental en España?

Si estás valorando ponerte un implante dental, lo primero que necesitas saber es que **no existe un precio único**. El coste varía enormemente según lo que incluya el presupuesto, la ciudad donde te trates y el tipo de clínica que elijas.

En 2026, el precio de un implante dental en España se mueve en estas horquillas:

- **Solo el implante (tornillo de titanio):** entre 380 € y 780 €
- **Implante completo con corona:** entre 900 € y 1.800 €
- **Rehabilitación All-on-4 (arcada completa):** entre 5.780 € y 10.500 €

Estas cifras reflejan el mercado real. Pero cuidado: muchas clínicas anuncian precios que solo incluyen el tornillo, sin la corona ni la cirugía. Antes de comparar, asegúrate de que estás comparando lo mismo.

## ¿Qué incluye el precio de un implante dental?

Un tratamiento de implante dental completo consta de varias fases, y cada una tiene su coste:

### 1. Diagnóstico previo

- **Radiografía panorámica:** entre 0 € y 100 € (muchas clínicas la incluyen gratis en la primera visita)
- **TAC dental (CBCT):** entre 100 € y 120 €
- **Estudio implantológico:** puede estar incluido o costar entre 50 € y 150 €

### 2. Cirugía de colocación del implante

Es la intervención donde se inserta el tornillo de titanio en el hueso maxilar. Incluye la anestesia local, el propio implante y los materiales quirúrgicos. Este es el componente que la mayoría de clínicas anuncia como "precio del implante": **entre 380 € y 780 €**.

### 3. Pilar y corona protésica

Una vez que el implante se ha osteointegrado (normalmente entre 3 y 6 meses), se coloca la corona definitiva. La **corona sobre implante** tiene un coste de entre 450 € y 665 €, dependiendo del material:

- **Metal-porcelana:** opción más económica, entre 290 € y 440 €
- **Circonio:** más estética y resistente, entre 399 € y 520 €

### 4. Procedimientos adicionales (si son necesarios)

No todos los pacientes necesitan estos pasos, pero si el hueso no es suficiente, hay que regenerarlo:

- **Elevación de seno maxilar:** entre 360 € y 900 €
- **Injerto óseo:** entre 300 € y 800 €
- **Regeneración ósea guiada:** entre 250 € y 600 €

Estos procedimientos pueden duplicar el coste total del tratamiento.

## Factores que afectan al precio del implante dental

### La ciudad importa (y mucho)

Barcelona y Madrid son las ciudades más caras. Un implante completo en Barcelona puede costar un 12 % más que la media nacional, mientras que en ciudades como Murcia o Sevilla los precios son entre un 8 % y un 10 % más bajos.

| Ciudad | Precio medio implante completo |
|--------|-------------------------------|
| Barcelona | 1.700 € |
| Madrid | 1.630 € |
| Bilbao | 1.670 € |
| Valencia | 1.470 € |
| Sevilla | 1.420 € |
| Murcia | 1.395 € |

### Tipo de clínica

- **Cadenas dentales** (Vitaldent, Dentix): precios competitivos, financiación agresiva. Implante completo desde 1.200 €.
- **Clínicas privadas medianas:** mayor personalización. Entre 1.400 € y 1.800 €.
- **Especialistas en implantología:** pueden superar los 2.000 €, pero con tecnología avanzada y mayor experiencia.

### Material del implante

La gran mayoría de implantes en España son de **titanio grado IV o V**. Los implantes de **circonio** (sin metal) son más recientes y suelen costar un 20-30 % más. Las marcas también influyen: Straumann o Nobel Biocare son más caras que marcas nacionales como Klockner o BTI.

## ¿Cuánto cuesta un implante dental con seguro?

Las aseguradoras dentales no suelen cubrir implantes en sus pólizas básicas, pero sí ofrecen precios reducidos a través de sus cuadros médicos:

- **Sanitas Dental:** implante (solo tornillo) desde 323 €
- **Adeslas Dental:** implante desde 334 €
- **Cigna Healthcare:** implante desde 342 €

Estas tarifas representan un ahorro de entre un 15 % y un 25 % respecto al precio de mercado. El coste mensual de un seguro dental está entre 8 € y 25 €, por lo que si necesitas un implante, el ahorro compensa con creces la prima anual.

## Financiación de implantes dentales

La mayoría de clínicas en España ofrecen financiación para implantes. Las condiciones más habituales son:

- **Financiación sin intereses:** entre 6 y 12 meses, disponible en la mayoría de cadenas
- **Financiación a largo plazo:** hasta 36 o 60 meses, con intereses del 7-12 % TAE
- **Pago por fases:** pagas cada etapa del tratamiento por separado (diagnóstico, cirugía, corona)

Un consejo: la financiación "sin intereses" a veces lleva aparejada una comisión de apertura. Pregunta siempre por el coste total final.

## ¿Cuándo merece la pena viajar a otra ciudad para un implante?

Si vives en Barcelona o Madrid y necesitas varios implantes, el ahorro de tratarte en una ciudad más económica puede compensar el desplazamiento. Por ejemplo, la diferencia entre Barcelona y Sevilla para un tratamiento All-on-4 puede superar los 1.500 €.

Eso sí, recuerda que el tratamiento de implantes requiere varias visitas a lo largo de meses, así que el ahorro tiene que compensar los viajes.

## Conclusión: ¿cuánto vas a pagar por tu implante?

Para un implante dental unitario completo en España en 2026, prepara un presupuesto de **entre 900 € y 1.800 €**. Si necesitas regeneración ósea o elevación de seno, la cifra puede subir hasta 2.500 €.

Nuestro consejo: pide al menos tres presupuestos, asegúrate de que todos incluyen lo mismo (diagnóstico, cirugía, corona y revisiones) y compara con los precios de aseguradoras. Y recuerda que el implante más barato no siempre es el mejor: la experiencia del cirujano y la calidad del material son factores que afectan directamente al resultado a largo plazo.`,
  },

  // ── Article 2: Ortodoncia invisible vs brackets ─────────────────────────────
  {
    title: "Ortodoncia invisible vs brackets: precio y diferencias",
    slug: "ortodoncia-invisible-vs-brackets-precio-diferencias",
    excerpt:
      "Comparativa completa entre ortodoncia invisible e Invisalign frente a brackets metálicos y de zafiro: precios en España en 2026, duración del tratamiento, ventajas y desventajas de cada sistema.",
    metaTitle: "Ortodoncia invisible vs brackets: precios y diferencias en 2026",
    metaDescription:
      "Brackets desde 2.400 € vs Invisalign desde 3.500 €. Comparamos precio, duración, comodidad y resultados de cada tipo de ortodoncia en España.",
    targetKeywords: [
      "ortodoncia invisible precio",
      "invisalign precio españa",
      "brackets vs invisalign",
    ],
    content: `## Brackets o alineadores invisibles: la gran decisión

Cada vez más adultos se lanzan a corregir su sonrisa, y la primera pregunta siempre es la misma: ¿brackets o ortodoncia invisible? La respuesta depende de tu caso clínico, tu presupuesto y tus prioridades estéticas. Vamos a desgranar todo lo que necesitas saber para tomar una decisión informada.

## Precios de ortodoncia en España en 2026

Antes de entrar en detalles, estas son las horquillas de precio actuales:

| Tipo de ortodoncia | Precio mínimo | Precio máximo | Media |
|---------------------|---------------|---------------|-------|
| **Brackets metálicos** | 2.400 € | 3.380 € | 2.700 € |
| **Brackets de zafiro** | 3.300 € | 4.290 € | 3.600 € |
| **Ortodoncia invisible (genérica)** | 3.500 € | 5.330 € | 4.200 € |
| **Invisalign Comprehensive** | 4.450 € | 6.695 € | 5.200 € |

A estos precios hay que sumarles los **retenedores** que se colocan al terminar el tratamiento, que cuestan entre 80 € y 200 €.

## ¿Qué son los brackets metálicos?

Los brackets metálicos son el sistema ortodóntico clásico. Pequeñas piezas de acero inoxidable se cementan a la superficie de cada diente y se conectan con un arco metálico que ejerce la fuerza necesaria para mover los dientes.

**Ventajas:**
- Son el sistema más económico
- Funcionan para prácticamente todos los casos, incluso los más complejos
- No dependen de la disciplina del paciente (no se quitan)
- Las citas de ajuste suelen ser más rápidas

**Desventajas:**
- Son visibles, lo que preocupa a muchos adultos
- Pueden causar rozaduras en labios y mejillas durante la adaptación
- Dificultan la higiene bucal (necesitas cepillos interdentales y más tiempo de limpieza)
- Restricciones alimentarias: nada de morder manzanas o comer palomitas

## ¿Qué es la ortodoncia invisible?

Los alineadores transparentes son férulas de plástico médico que se fabrican a medida y se van cambiando cada 1-2 semanas. El paciente recibe una serie de alineadores que mueven los dientes de forma progresiva.

**Invisalign** es la marca más conocida, pero existen alternativas más económicas como Spark, SureSmile o marcas propias de clínicas. Los resultados son comparables en la mayoría de los casos.

**Ventajas:**
- Prácticamente invisibles a distancia media
- Se quitan para comer y cepillarse los dientes
- Sin restricciones alimentarias
- Menos urgencias (no se rompen brackets ni se sueltan arcos)
- Citas de seguimiento más espaciadas

**Desventajas:**
- Requieren disciplina: hay que llevarlos puestos mínimo 22 horas al día
- Precio más elevado
- No todos los casos son tratables (maloclusiones severas pueden necesitar brackets)
- Los ataches (pequeños relieves de composite) pueden ser visibles de cerca

## ¿Qué factores afectan al precio de la ortodoncia?

### Complejidad del caso

Un apiñamiento leve se resuelve en 6-12 meses con un tratamiento sencillo. Una mordida cruzada con apiñamiento severo puede requerir 24-30 meses y múltiples refinamientos. Cuanto más complejo, más caro.

### Ciudad y tipo de clínica

Las diferencias geográficas son significativas. Un tratamiento Invisalign Comprehensive que cuesta 5.500 € en Barcelona puede encontrarse por 4.200 € en Sevilla o Murcia. Las cadenas dentales suelen ofrecer precios más ajustados que las clínicas boutique.

### Marca del sistema de alineadores

Invisalign es la marca premium y sus licencias de software son más caras para los ortodoncistas, lo que repercute en el precio final. Alternativas como Spark o sistemas propios de las clínicas pueden ser un 20-30 % más baratos con resultados equivalentes.

### Experiencia del ortodoncista

Un ortodoncista certificado como Diamond Provider de Invisalign (más de 150 casos al año) cobra más, pero su experiencia reduce el riesgo de refinamientos y alarga menos el tratamiento. En ortodoncia, la mano del profesional importa tanto como el sistema.

## Duración del tratamiento: ¿cuánto tardan?

- **Brackets metálicos:** entre 12 y 30 meses según la complejidad
- **Brackets de zafiro:** similar a los metálicos, a veces ligeramente más
- **Alineadores invisibles:** entre 6 y 24 meses, aunque los refinamientos pueden alargar el proceso

Para casos leves de apiñamiento anterior, existen tratamientos express con alineadores (tipo Invisalign Lite o i7) que duran entre 3 y 7 meses y cuestan significativamente menos (entre 2.000 € y 3.000 €).

## ¿Cuánto puedes ahorrar con un seguro dental?

Los seguros dentales no suelen cubrir la ortodoncia al completo, pero sí ofrecen descuentos sustanciales:

- **Sanitas:** descuentos de hasta el 25 % en ortodoncias a través de su cuadro médico
- **Adeslas:** paquetes de ortodoncia con descuentos del 15-22 %
- **Cigna:** tarifas preferentes del 20 % de descuento en alineadores

Teniendo en cuenta que la prima mensual ronda los 15-25 €, si ya sabes que vas a necesitar ortodoncia, contratar un seguro antes de empezar puede suponer un ahorro de 600-1.200 €.

## ¿Qué sistema elegir?

La decisión debería basarse en tres factores:

1. **Tu caso clínico:** consulta con un ortodoncista. Casos muy complejos pueden necesitar brackets sí o sí.
2. **Tu presupuesto:** si el dinero es un factor decisivo, los brackets metálicos ofrecen la mejor relación calidad-precio.
3. **Tu estilo de vida:** si la estética y la comodidad son prioritarias y puedes permitírtelo, los alineadores invisibles son la opción más cómoda para el día a día.

Un último apunte: independientemente del sistema que elijas, no escatimes en el ortodoncista. Un buen profesional con un sistema económico dará mejores resultados que un profesional mediocre con el sistema más caro del mercado. Pide al menos dos o tres valoraciones antes de decidirte.`,
  },

  // ── Article 3: Guía de precios dentales ─────────────────────────────────────
  {
    title: "Guía de precios dentales en España 2026",
    slug: "guia-precios-dentales-espana",
    excerpt:
      "Guía completa con los precios actualizados de todos los tratamientos dentales en España en 2026: desde una limpieza dental por 40 € hasta rehabilitaciones completas sobre implantes.",
    metaTitle: "Precios dentales en España 2026: guía completa por tratamiento",
    metaDescription:
      "Todos los precios de tratamientos dentales en España actualizados a 2026. Desde limpiezas (40 €) hasta implantes (1.800 €). Compara y ahorra.",
    targetKeywords: [
      "precios dentales españa",
      "cuánto cuesta ir al dentista",
      "precios tratamientos dentales",
    ],
    content: `## ¿Cuánto cuesta ir al dentista en España?

Ir al dentista sin saber lo que vas a pagar genera ansiedad. Y es normal: los precios dentales en España varían enormemente según la ciudad, el tipo de clínica y el tratamiento. Esta guía recoge los precios reales del mercado español en 2026 para que puedas hacerte una idea antes de sentarte en el sillón.

## Consultas y diagnóstico

Todo empieza por la primera visita. La buena noticia es que muchas clínicas ofrecen la primera consulta gratuita como gancho comercial.

| Tratamiento | Precio mín. | Precio máx. | Media |
|-------------|-------------|-------------|-------|
| Primera consulta dental | 0 € | 22 € | 15 € |
| Radiografía panorámica | 0 € | 100 € | 50 € |
| Radiografía periapical | 20 € | 30 € | 20 € |
| TAC dental (CBCT) | 100 € | 120 € | 110 € |

**Consejo:** muchas clínicas incluyen la radiografía panorámica en la primera visita gratuita. Pregunta antes de ir.

## Tratamientos preventivos y conservadores

Esta es la odontología del día a día: las limpiezas, los empastes y las revisiones que mantienen tu boca sana.

| Tratamiento | Precio mín. | Precio máx. | Media |
|-------------|-------------|-------------|-------|
| Limpieza dental (profilaxis) | 40 € | 100 € | 55 € |
| Empaste simple (amalgama/composite) | 44 € | 80 € | 55 € |
| Empaste compuesto (reconstrucción parcial) | 50 € | 150 € | 80 € |
| Reconstrucción dental | 60 € | 80 € | 70 € |
| Férula de descarga | 243 € | 383 € | 290 € |

La limpieza dental es el tratamiento más demandado y también el más variable en precio. Las clínicas de cadena suelen ofrecerla como reclamo desde 30-40 €, mientras que clínicas privadas de gama alta pueden cobrar hasta 100 €.

## Endodoncia (matar el nervio)

Cuando la caries llega al nervio, el empaste ya no basta. La endodoncia es el tratamiento para salvar el diente sin extraerlo.

| Tratamiento | Precio mín. | Precio máx. | Media |
|-------------|-------------|-------------|-------|
| Endodoncia unirradicular (1 conducto) | 100 € | 300 € | 230 € |
| Endodoncia birradicular (2 conductos) | 140 € | 350 € | 250 € |
| Endodoncia multirradicular (3+ conductos) | 190 € | 415 € | 280 € |

El precio varía sobre todo por el número de conductos del diente. Una muela tiene tres o cuatro conductos y es más laboriosa que un incisivo con un solo conducto.

## Periodoncia (encías)

Los problemas de encías afectan a más del 30 % de la población adulta española. Si no se tratan, pueden provocar la pérdida de dientes.

| Tratamiento | Precio mín. | Precio máx. | Media |
|-------------|-------------|-------------|-------|
| Curetaje dental (por cuadrante) | 60 € | 100 € | 70 € |
| Estudio periodontal completo | 100 € | 120 € | 110 € |
| Cirugía periodontal | 150 € | 250 € | 180 € |
| Injerto de encía | 180 € | 350 € | 250 € |

El curetaje es el tratamiento periodontal más frecuente. Se cobra por cuadrante (la boca se divide en cuatro), así que un curetaje completo cuesta entre 240 € y 400 €.

## Extracciones

A veces no queda otra que sacar el diente. El precio depende de la complejidad.

| Tratamiento | Precio mín. | Precio máx. | Media |
|-------------|-------------|-------------|-------|
| Extracción simple | 40 € | 90 € | 55 € |
| Extracción compleja (quirúrgica) | 60 € | 200 € | 100 € |
| Extracción muela del juicio | 50 € | 300 € | 150 € |

Las muelas del juicio incluidas (que no han salido completamente) son las más caras de extraer porque requieren cirugía.

## Implantes dentales

Los implantes son el tratamiento que más consultas de precio genera. Y el que más varía de una clínica a otra.

| Tratamiento | Precio mín. | Precio máx. | Media |
|-------------|-------------|-------------|-------|
| Implante dental (solo tornillo) | 380 € | 780 € | 530 € |
| Implante completo (con corona) | 900 € | 1.800 € | 1.550 € |
| Corona sobre implante | 450 € | 665 € | 540 € |
| Elevación de seno maxilar | 360 € | 900 € | 500 € |
| All-on-4 (arcada completa) | 5.780 € | 10.500 € | 8.000 € |

Lee nuestro artículo detallado sobre [cuánto cuesta un implante dental](/blog/cuanto-cuesta-implante-dental-espana) para un desglose completo.

## Ortodoncia

Corregir la posición de los dientes es una inversión a largo plazo. Los precios incluyen todo el tratamiento, normalmente durante 12-24 meses.

| Tratamiento | Precio mín. | Precio máx. | Media |
|-------------|-------------|-------------|-------|
| Brackets metálicos | 2.400 € | 3.380 € | 2.700 € |
| Brackets de zafiro | 3.300 € | 4.290 € | 3.600 € |
| Ortodoncia invisible | 3.500 € | 5.330 € | 4.200 € |
| Invisalign Comprehensive | 4.450 € | 6.695 € | 5.200 € |
| Retenedores | 80 € | 200 € | 130 € |

## Estética dental

Los tratamientos estéticos son los que más margen de variación tienen, porque dependen mucho de los materiales y la habilidad del profesional.

| Tratamiento | Precio mín. | Precio máx. | Media |
|-------------|-------------|-------------|-------|
| Blanqueamiento dental | 250 € | 553 € | 400 € |
| Carillas de composite (por pieza) | 120 € | 325 € | 200 € |
| Carillas de porcelana (por pieza) | 350 € | 773 € | 550 € |

## Prótesis dentales

Cuando se han perdido varios dientes y no se opta por implantes, las prótesis removibles siguen siendo una alternativa habitual.

| Tratamiento | Precio mín. | Precio máx. | Media |
|-------------|-------------|-------------|-------|
| Corona metal-porcelana | 290 € | 440 € | 350 € |
| Corona de circonio | 399 € | 520 € | 460 € |
| Prótesis removible completa | 450 € | 900 € | 600 € |
| Prótesis removible parcial | 300 € | 700 € | 450 € |
| Puente dental (3 piezas) | 600 € | 1.400 € | 900 € |

## Cómo ahorrar en el dentista

### 1. Compara presupuestos
Pide siempre al menos dos o tres presupuestos. Los precios varían hasta un 50 % entre clínicas de la misma ciudad.

### 2. Valora un seguro dental
Si necesitas tratamientos caros (implantes, ortodoncia), un seguro dental puede ahorrarte entre un 15 % y un 25 %. La cuota mensual está entre 8 € y 25 €.

### 3. Pregunta por paquetes y financiación
Muchas clínicas ofrecen precios cerrados que incluyen diagnóstico, tratamiento y revisiones. La financiación sin intereses a 6-12 meses es habitual.

### 4. No descuides la prevención
Una limpieza anual de 55 € y revisiones periódicas pueden evitarte un empaste de 80 € o una endodoncia de 280 €. La prevención siempre es más barata que el tratamiento.

### 5. Compara entre ciudades si el tratamiento lo justifica
Para tratamientos de alto coste como All-on-4 o múltiples implantes, la diferencia entre ciudades caras y económicas puede ser de miles de euros.`,
  },

  // ── Article 4: Seguro dental ────────────────────────────────────────────────
  {
    title: "¿Merece la pena un seguro dental? Análisis con precios reales",
    slug: "merece-la-pena-seguro-dental-analisis-precios",
    excerpt:
      "Analizamos con datos reales si un seguro dental compensa en España: comparamos el coste anual de las pólizas con el ahorro real en tratamientos dentales de las principales aseguradoras.",
    metaTitle: "¿Merece la pena un seguro dental? Análisis con precios reales 2026",
    metaDescription:
      "Seguro dental desde 8 €/mes. Analizamos si compensa con datos de Sanitas, Adeslas y Cigna. Descubre cuándo merece la pena y cuándo no.",
    targetKeywords: [
      "seguro dental merece la pena",
      "seguro dental precio",
      "ahorro seguro dental",
    ],
    content: `## La pregunta del millón: ¿compensa tener un seguro dental?

En España, la sanidad pública cubre muy pocos tratamientos dentales: básicamente extracciones en casos de urgencia y poco más. Todo lo demás sale de tu bolsillo. Ante esta realidad, cada vez más personas se plantean contratar un seguro dental. Pero, ¿realmente compensa económicamente?

La respuesta corta: **depende de cuánto uses el dentista**. La respuesta larga es lo que vamos a desarrollar en este artículo con números reales.

## ¿Cuánto cuesta un seguro dental en España?

Las pólizas dentales en España se mueven en una horquilla bastante estrecha:

| Aseguradora | Precio mensual | Precio anual | Carencia |
|-------------|---------------|-------------|----------|
| **Sanitas Dental** | 12 - 20 € | 144 - 240 € | 0-3 meses |
| **Adeslas Dental** | 10 - 18 € | 120 - 216 € | 0-6 meses |
| **Cigna Healthcare** | 8 - 15 € | 96 - 180 € | 0-3 meses |
| **DKV Dentisalud** | 9 - 16 € | 108 - 192 € | 0-3 meses |
| **Asisa Dental** | 8 - 14 € | 96 - 168 € | 0-6 meses |

La mayoría de seguros dentales rondan los **12-15 € al mes**, es decir, unos **150-180 € al año**. Es una cantidad modesta, pero hay que valorar si los descuentos que ofrecen compensan ese gasto.

## ¿Qué incluyen los seguros dentales?

Los seguros dentales en España funcionan con un sistema mixto:

### Tratamientos gratuitos (incluidos en la póliza)

- Primera consulta y revisiones anuales
- Radiografías panorámicas y periapicales
- Limpiezas dentales (1-2 al año)
- Extracciones simples
- Empastes en algunas pólizas

### Tratamientos con descuento (precio reducido por cuadro médico)

- Endodoncias: descuento del 15-25 %
- Implantes: descuento del 15-25 %
- Ortodoncia: descuento del 15-25 %
- Carillas y estética: descuento del 10-20 %
- Prótesis: descuento del 15-20 %

### Tratamientos no cubiertos

La mayoría de pólizas excluyen o limitan la odontología altamente especializada como regeneración ósea compleja o rehabilitaciones muy extensas.

## Caso práctico 1: paciente con necesidades básicas

Imaginemos a María, 35 años, sin problemas dentales graves. Al año necesita:

**Sin seguro:**
- 1 revisión con radiografía: 50 €
- 1 limpieza dental: 55 €
- **Total: 105 € al año**

**Con seguro (Sanitas, 15 €/mes = 180 €/año):**
- Revisión y radiografía: incluida
- Limpieza: incluida
- **Total: 180 € al año**

**Resultado: el seguro NO compensa.** María paga 75 € más con seguro. Para perfiles de bajo uso, el seguro dental no tiene sentido económico.

## Caso práctico 2: paciente con necesidades moderadas

Pedro, 45 años, necesita tratamiento periodontal y un empaste este año:

**Sin seguro:**
- 1 revisión con radiografía: 50 €
- 1 limpieza dental: 55 €
- 2 empastes: 110 €
- 1 curetaje (4 cuadrantes): 280 €
- **Total: 495 € al año**

**Con seguro (Adeslas, 14 €/mes = 168 €/año):**
- Revisión y radiografía: incluida
- Limpieza: incluida
- 2 empastes con descuento: 85 €
- Curetaje con descuento: 220 €
- **Total: 473 € al año**

**Resultado: ahorro marginal de 22 €.** El seguro prácticamente empata. No es un argumento suficiente para contratarlo solo por este motivo, pero sí ofrece la tranquilidad de tener cobertura ante imprevistos.

## Caso práctico 3: paciente con necesidades importantes

Laura, 55 años, necesita un implante dental y una corona este año:

**Sin seguro:**
- 1 revisión con TAC: 110 €
- 1 limpieza dental: 55 €
- 1 implante completo (con corona): 1.550 €
- **Total: 1.715 € al año**

**Con seguro (Cigna, 12 €/mes = 144 €/año):**
- Revisión y TAC: incluida
- Limpieza: incluida
- Implante completo con descuento (20 %): 1.240 €
- **Total: 1.384 € al año**

**Resultado: ahorro de 331 €.** Aquí sí compensa claramente. El ahorro triplica el coste del seguro.

## Caso práctico 4: familia con hijos que necesitan ortodoncia

La familia Gómez: padre, madre y dos hijos adolescentes que necesitan ortodoncia.

**Sin seguro:**
- 4 revisiones anuales: 200 €
- 4 limpiezas: 220 €
- 2 tratamientos de brackets metálicos: 5.400 €
- **Total: 5.820 €**

**Con seguro familiar (20 €/mes x 4 = 80 €/mes = 960 €/año):**
- Revisiones: incluidas
- Limpiezas: incluidas
- 2 tratamientos de brackets con descuento (20 %): 4.320 €
- **Total: 5.280 €**

**Resultado: ahorro de 540 €.** El seguro compensa, especialmente si los hijos necesitan ortodoncia.

## ¿Cuándo SÍ merece la pena un seguro dental?

El seguro dental compensa cuando:

- **Necesitas un tratamiento caro** (implantes, ortodoncia, rehabilitaciones)
- **Eres familia** con hijos en edad de ortodoncia
- **Tienes patología periodontal** que requiere mantenimientos frecuentes
- **Prefieres la tranquilidad** de saber que cualquier urgencia estará cubierta sin grandes desembolsos

## ¿Cuándo NO merece la pena?

El seguro dental no compensa cuando:

- **Tienes buena salud bucal** y solo necesitas revisiones y limpiezas anuales
- **Ya tienes un dentista de confianza** fuera del cuadro médico al que no quieres renunciar
- **No vas a usar el cuadro médico** de la aseguradora (por ubicación o preferencia)

## Comparativa rápida de aseguradoras

### Sanitas Dental Milenium
- **Punto fuerte:** red de clínicas propias muy amplia, app bien diseñada
- **Punto débil:** precio ligeramente superior
- **Ideal para:** quienes viven en grandes ciudades y valoran la comodidad

### Adeslas Dental
- **Punto fuerte:** cuadro médico muy extenso, buena cobertura geográfica
- **Punto débil:** periodos de carencia más largos en algunos tratamientos
- **Ideal para:** quienes buscan una buena relación cobertura-precio

### Cigna Healthcare
- **Punto fuerte:** precios competitivos, buen servicio de atención al cliente
- **Punto débil:** menor red de clínicas en ciudades pequeñas
- **Ideal para:** quienes buscan el precio más ajustado

## Conclusión: haz las cuentas con tus propios números

No existe una respuesta universal. Lo que sí podemos decir con datos es que:

- Si gastas **menos de 200 € al año** en el dentista, el seguro no te compensa
- Si gastas **entre 200 € y 500 €**, depende del tipo de tratamiento
- Si gastas **más de 500 €**, el seguro casi seguro te ahorra dinero

El consejo práctico es sencillo: antes de contratar un seguro dental, calcula cuánto te has gastado en el dentista en los últimos dos años. Si supera los 300-400 € anuales de media, merece la pena explorar opciones. Y si sabes que tienes un tratamiento grande por delante (implantes, ortodoncia), contrata el seguro con antelación suficiente para que pasen los periodos de carencia.`,
  },

  // ── Article 5: Blanqueamiento dental ────────────────────────────────────────
  {
    title: "Blanqueamiento dental: tipos, precios y lo que debes saber",
    slug: "blanqueamiento-dental-tipos-precios",
    excerpt:
      "Todo sobre el blanqueamiento dental en España: precios desde 250 € en clínica, tipos de tratamiento, duración de los resultados, riesgos y cómo elegir la mejor opción para tu caso.",
    metaTitle: "Blanqueamiento dental: tipos, precios y guía completa 2026",
    metaDescription:
      "Blanqueamiento dental en España desde 250 €. Comparamos los distintos tipos (LED, láser, férulas), su duración, riesgos y precios actualizados.",
    targetKeywords: [
      "blanqueamiento dental precio",
      "cuánto cuesta blanqueamiento dental",
      "blanqueamiento dental tipos",
    ],
    content: `## Blanqueamiento dental: la guía que tu dentista debería darte

El blanqueamiento dental es uno de los tratamientos estéticos más solicitados en las clínicas españolas. No es invasivo, los resultados son visibles desde la primera sesión y puede mejorar significativamente tu sonrisa. Pero hay mucha confusión sobre los diferentes tipos, los precios reales y lo que puedes esperar de forma realista.

## ¿Cuánto cuesta un blanqueamiento dental en España?

El precio de un blanqueamiento dental profesional en España en 2026 se sitúa entre **250 € y 553 €**, con una media de unos **400 €**. Pero hay matices importantes.

| Tipo de blanqueamiento | Precio mín. | Precio máx. | Media |
|------------------------|-------------|-------------|-------|
| En clínica (LED/láser) | 250 € | 553 € | 400 € |
| Ambulatorio con férulas | 150 € | 350 € | 250 € |
| Combinado (clínica + férulas) | 350 € | 650 € | 480 € |
| Blanqueamiento interno (diente endodonciado) | 80 € | 150 € | 100 € |

Los kits de blanqueamiento de farmacia o venta online cuestan entre 20 € y 80 €, pero sus resultados no son comparables a los profesionales y pueden dañar el esmalte si se usan incorrectamente.

## Tipos de blanqueamiento dental profesional

### Blanqueamiento en clínica (en consulta)

Es la opción más rápida. El dentista aplica un gel de peróxido de hidrógeno a alta concentración (25-40 %) sobre los dientes y lo activa con una lámpara LED o láser. El tratamiento dura entre 45 y 90 minutos y suele hacerse en una o dos sesiones.

**Ventajas:**
- Resultados inmediatos y visibles
- Supervisión profesional durante todo el proceso
- Control preciso de la concentración del agente blanqueador
- Protección de encías y tejidos blandos

**Desventajas:**
- Precio más elevado
- Mayor sensibilidad dental post-tratamiento (suele remitir en 24-72 horas)
- Puede requerir dos sesiones para casos de decoloración intensa

### Blanqueamiento ambulatorio (con férulas)

El dentista toma una impresión de tu boca y fabrica unas férulas de silicona a medida. Tú aplicas en casa un gel de peróxido de carbamida (10-16 %) dentro de las férulas y las llevas puestas entre 2 y 8 horas al día (muchos pacientes las usan para dormir) durante 2 a 4 semanas.

**Ventajas:**
- Más económico que el blanqueamiento en clínica
- Resultados progresivos y muy naturales
- Menor sensibilidad dental
- Las férulas sirven para retoques futuros (solo compras el gel)

**Desventajas:**
- Requiere constancia y disciplina
- Los resultados tardan semanas en ser visibles
- Necesitas guardar las férulas correctamente

### Blanqueamiento combinado

Muchos dentistas consideran que el protocolo ideal combina ambos: una o dos sesiones en clínica para un aclaramiento inicial rápido, seguidas de un tratamiento ambulatorio con férulas para perfeccionar y estabilizar el resultado.

Es la opción más completa, pero también la más cara (entre 350 € y 650 €).

### Blanqueamiento interno

Se utiliza exclusivamente en dientes que han sido endodonciados y se han oscurecido. El dentista coloca el agente blanqueador dentro del diente y lo sella temporalmente. Se cambia cada 3-5 días hasta alcanzar el tono deseado. Cuesta entre 80 € y 150 € por diente.

## ¿Cuánto dura el blanqueamiento dental?

Los resultados de un blanqueamiento profesional duran entre **1 y 3 años**, aunque esto varía mucho según tus hábitos:

**Factores que acortan la duración:**
- Tabaco (el principal enemigo del blanqueamiento)
- Café, té y vino tinto en exceso
- Mala higiene dental
- Alimentos con colorantes intensos (curry, salsa de soja, frutos rojos)

**Factores que alargan la duración:**
- No fumar
- Buena higiene (cepillado correcto, hilo dental)
- Retoques periódicos con férulas (una vez cada 6-12 meses, solo necesitas comprar el gel por 25-40 €)
- Enjuague con agua después de consumir bebidas pigmentantes

## ¿Quién puede hacerse un blanqueamiento dental?

El blanqueamiento no es para todo el mundo. Está contraindicado en:

- **Menores de 16 años:** el esmalte no está completamente formado
- **Embarazadas y mujeres en periodo de lactancia:** por precaución
- **Personas con caries activas o enfermedad periodontal:** hay que tratar primero la patología
- **Personas con restauraciones en dientes anteriores:** las carillas, empastes y coronas no se blanquean. Si blanqueas los dientes naturales, las restauraciones quedarán de un tono diferente
- **Sensibilidad dental severa:** el tratamiento puede empeorarla temporalmente

## Riesgos y efectos secundarios

El blanqueamiento dental profesional es seguro cuando lo realiza un odontólogo cualificado. Los efectos secundarios más comunes son:

- **Sensibilidad dental:** afecta al 60-70 % de los pacientes, pero es temporal (24-72 horas). Se puede mitigar con pastas desensibilizantes y con la concentración adecuada del gel.
- **Irritación de encías:** si el gel entra en contacto con las encías. En clínica, el dentista las protege con una barrera. Con férulas, es importante que estén bien ajustadas.
- **Resultados desiguales:** si hay empastes, coronas o carillas que no se blanquean al mismo ritmo.

Lo que **no** hace el blanqueamiento: no daña el esmalte, no debilita los dientes y no provoca caries. Estos son mitos que circulan en internet pero que no tienen respaldo científico cuando el tratamiento se hace correctamente.

## ¿Qué afecta al precio del blanqueamiento?

- **El tipo de sistema:** el LED es más económico que el láser, pero los resultados son comparables
- **La ciudad:** en Barcelona puede costar un 10-15 % más que en Sevilla o Murcia
- **El número de sesiones:** las decoloraciones severas (por tetraciclinas, fluorosis) pueden necesitar más sesiones
- **La clínica:** las clínicas de estética dental premium cobran más por la experiencia y los materiales

## Blanqueamiento dental con seguro: ¿hay descuento?

La mayoría de seguros dentales incluyen un descuento del 10-20 % en blanqueamiento dental a través de su cuadro médico. Esto puede suponer un ahorro de 40-80 €. No es un gran descuento, pero si ya tienes seguro dental por otros motivos, aprovéchalo.

## Nuestra recomendación

Si es tu primer blanqueamiento y buscas buena relación calidad-precio, el **blanqueamiento ambulatorio con férulas** es probablemente tu mejor opción. Es más económico, los resultados son igual de buenos (solo tardan más en verse) y te llevas las férulas para retoques futuros.

Si necesitas resultados rápidos para un evento (boda, reunión importante), el **blanqueamiento en clínica** te da un aclaramiento visible en una sola sesión.

Y un último consejo: antes de blanquearte los dientes, hazte una limpieza dental profesional. El sarro y las tinciones superficiales se eliminan con la limpieza, y el blanqueamiento actúa mejor sobre dientes limpios. Muchas clínicas ofrecen un paquete de limpieza + blanqueamiento a precio reducido.`,
  },

  // ── Article 6: Carillas dentales ────────────────────────────────────────────
  {
    title: "Carillas dentales: diferencias entre composite y porcelana",
    slug: "carillas-dentales-composite-vs-porcelana",
    excerpt:
      "Comparativa detallada entre carillas de composite (desde 120 €/pieza) y carillas de porcelana (desde 350 €/pieza): diferencias en precio, durabilidad, estética y cuándo elegir cada una.",
    metaTitle: "Carillas dentales: composite vs porcelana, precios y diferencias 2026",
    metaDescription:
      "Carillas de composite desde 120 € vs porcelana desde 350 € por pieza. Comparamos durabilidad, estética, precio y cuándo conviene cada tipo.",
    targetKeywords: [
      "carillas dentales precio",
      "carillas composite vs porcelana",
      "cuánto cuestan las carillas",
    ],
    content: `## Carillas dentales: todo lo que necesitas saber antes de decidirte

Las carillas dentales se han convertido en el tratamiento estrella de la estética dental. Permiten corregir el color, la forma y pequeñas imperfecciones de los dientes sin tratamientos invasivos. Pero no todas las carillas son iguales: la diferencia entre composite y porcelana es sustancial en precio, duración y resultado.

## ¿Cuánto cuestan las carillas dentales en España?

El precio de las carillas varía enormemente según el material. Estos son los precios por pieza en 2026:

| Tipo de carilla | Precio mín. | Precio máx. | Media |
|-----------------|-------------|-------------|-------|
| **Carilla de composite** | 120 € | 325 € | 200 € |
| **Carilla de porcelana** | 350 € | 773 € | 550 € |

Un dato importante: las carillas se colocan normalmente en los dientes visibles al sonreír, que suelen ser entre 6 y 10 piezas (de colmillo a colmillo, o de premolar a premolar). Esto significa que un tratamiento completo cuesta:

- **Composite (8 piezas):** entre 960 € y 2.600 €
- **Porcelana (8 piezas):** entre 2.800 € y 6.184 €

La diferencia es considerable, y es la razón principal por la que muchos pacientes optan por el composite.

## Carillas de composite: qué son y cómo se hacen

Las carillas de composite se fabrican directamente sobre el diente, capa a capa, usando una resina del mismo material que los empastes estéticos. El dentista esculpe la carilla in situ, moldeando la forma y el color durante la cita.

### Proceso de colocación

1. **Preparación mínima del diente:** en la mayoría de los casos no hace falta tallar el esmalte. Se hace un ligero pulido superficial.
2. **Aplicación del adhesivo:** se acondiciona la superficie del diente con ácido fosfórico y un adhesivo.
3. **Estratificación del composite:** el dentista aplica capas de resina de diferentes opacidades y colores para imitar la naturalidad del diente.
4. **Polimerización con luz:** cada capa se endurece con una lámpara de fotocurado.
5. **Pulido y ajuste de la oclusión.**

Todo el proceso se hace en una sola cita de 1 a 3 horas (dependiendo del número de dientes).

### Ventajas del composite

- **Precio significativamente menor** que la porcelana
- **Reversible:** al no tallar el esmalte (o tallarlo mínimamente), se puede volver al estado original
- **Se hace en una sola cita:** no hay que esperar a que el laboratorio fabrique nada
- **Fácil de reparar:** si se fractura una esquina, se puede recomponer en consulta
- **Conservador:** se preserva más estructura dental

### Desventajas del composite

- **Menor duración:** entre 5 y 8 años frente a los 10-20 de la porcelana
- **Se tiñen con el tiempo:** el composite absorbe pigmentos del café, vino, tabaco
- **Requieren mantenimiento:** pulidos periódicos cada 6-12 meses para mantener el brillo
- **Resultado estético inferior:** un buen composite puede ser excelente, pero la porcelana tiene un brillo y translucidez más natural
- **Dependen mucho del profesional:** el resultado final está directamente ligado a la habilidad manual del dentista

## Carillas de porcelana: qué son y cómo se hacen

Las carillas de porcelana (también llamadas carillas de cerámica) son láminas ultrafinas fabricadas en un laboratorio dental a partir de un molde de tu boca. Se cementan sobre la cara visible del diente con un adhesivo especial.

### Proceso de colocación

1. **Estudio y planificación:** se toman fotos, radiografías y un escáner digital o impresiones de la boca.
2. **Diseño digital (DSD):** muchas clínicas usan Diseño de Sonrisa Digital para que veas el resultado antes de empezar.
3. **Mock-up:** se fabrica una maqueta en resina sobre tus dientes para probar el diseño en boca.
4. **Preparación dental:** se talla una fina capa de esmalte (0,3-0,7 mm). En algunos casos de carillas ultrafinas (tipo Lumineers), el tallado es mínimo o nulo.
5. **Impresión definitiva y provisionales:** se toman los registros para el laboratorio y se colocan carillas provisionales.
6. **Fabricación en laboratorio:** entre 7 y 14 días.
7. **Cementado definitivo:** las carillas se pegan con un cemento de resina de alta adhesión.

El proceso completo requiere entre 2 y 4 citas a lo largo de 2-3 semanas.

### Ventajas de la porcelana

- **Estética superior:** la porcelana reproduce mejor la translucidez y el brillo natural del esmalte
- **Mayor duración:** entre 10 y 20 años con buen mantenimiento
- **No se tiñen:** la cerámica es resistente a los pigmentos
- **Resultado muy predecible:** al fabricarse en laboratorio, se controla cada detalle
- **Mantienen el brillo:** no necesitan pulidos periódicos

### Desventajas de la porcelana

- **Precio mucho mayor** que el composite
- **Requieren tallar el diente:** es un proceso irreversible en la mayoría de los casos
- **Más difíciles de reparar:** si se fractura una carilla, normalmente hay que sustituirla
- **Varias citas:** el proceso es más largo
- **Si alguna se despega o rompe, la reparación es cara**

## ¿Cuándo elegir composite y cuándo porcelana?

### Elige composite si:

- Tu presupuesto es limitado
- Quieres corregir pequeñas imperfecciones (un diente ligeramente girado, una fractura menor, cerrar un pequeño diastema)
- No quieres que se talle tu esmalte
- Eres joven y prefieres una opción reversible
- Solo necesitas carillas en 1-3 dientes

### Elige porcelana si:

- Buscas un cambio estético importante y duradero
- Quieres corregir el color, la forma y la alineación de toda la zona visible
- Puedes permitirte la inversión
- Priorizas un resultado que no requiera mantenimiento frecuente
- Fumas o consumes mucho café y te preocupa la tinción

## Factores que afectan al precio de las carillas

### El material específico

Dentro de la porcelana hay variaciones: las carillas de disilicato de litio (E.max) son las más populares. Las de feldespato son más artesanales y caras. Las de circonio se usan menos para carillas y más para coronas.

### El laboratorio dental

Un laboratorio de alta gama puede cobrar al dentista entre 200 € y 400 € por carilla, mientras que uno estándar cobra entre 80 € y 150 €. Esto repercute directamente en el precio final.

### La ciudad

Como en todo tratamiento dental, Barcelona y Madrid son las ciudades más caras. Un set de 8 carillas de porcelana puede costar 1.000-1.500 € más que en ciudades como Valencia, Sevilla o Zaragoza.

### El número de carillas

Algunas clínicas ofrecen precios por paquete: 6, 8 o 10 carillas con un precio unitario más bajo que si se hacen de forma individual.

## ¿Las carillas dañan los dientes?

Es la pregunta que más preocupa a los pacientes, y la respuesta tiene matices:

- **Carillas de composite sin tallado:** no dañan el diente en absoluto. Son completamente reversibles.
- **Carillas de composite con tallado mínimo:** el daño es insignificante.
- **Carillas de porcelana con tallado:** se elimina una fina capa de esmalte que no se regenera. El diente queda preparado y siempre necesitará una carilla o una corona encima. Esto no significa que esté "dañado" en el sentido patológico, pero sí que el tratamiento es irreversible.

## ¿Las carillas se pueden quitar?

Las de composite sí: se pulen y el diente queda como estaba (o casi). Las de porcelana, en principio no: el diente tallado necesita una restauración permanente. Sin embargo, las carillas ultrafinas tipo Lumineers que no requieren tallado sí pueden retirarse.

## Nuestra recomendación

Si estás empezando a explorar las carillas dentales, nuestro consejo es que pidas una valoración con un dentista especializado en estética dental y le pidas ver casos reales de su trabajo, tanto en composite como en porcelana. Las fotos de antes y después del propio profesional valen más que cualquier folleto comercial.

Y un dato práctico: si tu prioridad es cerrar un diastema (separación entre dientes) o corregir un diente ligeramente torcido, el composite probablemente sea suficiente. Si buscas un cambio de sonrisa completo, la porcelana dará un resultado más predecible y duradero, pero prepárate para una inversión considerable.`,
  },
];

// ── Seed function ───────────────────────────────────────────────────────────────

function countWords(text: string): number {
  return text
    .replace(/[#*|_\-\[\]()>]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

async function seedArticles() {
  console.log("📝 Seeding blog articles...\n");

  // Clear existing articles
  console.log("🗑️  Clearing existing articles...");
  await db.delete(schema.articles);
  console.log("   ✓ Existing articles cleared\n");

  // Insert articles
  for (const article of ARTICLES) {
    const wordCount = countWords(article.content);
    const readingTime = Math.ceil(wordCount / 200);

    console.log(`📄 Inserting: "${article.title}"`);
    console.log(`   Words: ${wordCount} | Reading time: ${readingTime} min`);

    await db.insert(schema.articles).values({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      metaTitle: article.metaTitle,
      metaDescription: article.metaDescription,
      targetKeywords: article.targetKeywords,
      wordCount,
      readingTime,
      status: "published",
      publishedAt: new Date("2026-03-10T00:00:00Z"),
    });

    console.log(`   ✓ Inserted\n`);
  }

  console.log(`✅ All ${ARTICLES.length} articles seeded successfully!`);
  process.exit(0);
}

seedArticles().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
