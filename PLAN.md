# PrecioDental.net — Plan Maestro

## Qué es PrecioDental

El primer comparador transparente de precios dentales en España. El usuario busca un tratamiento y una ciudad, y ve al instante el rango de precios (mín/media/máx) con datos reales de aseguradoras, cadenas y clínicas independientes. El "GoodRx / FAIR Health Consumer" del dental español.

**Dominio:** preciodental.net
**Público:** España (principal), LATAM (futuro)
**Diferenciación:** Nadie en España muestra precios dentales de forma abierta y agregada. ComparadorDentistas pide formularios. InversaDental usa subastas inversas. Nosotros mostramos los datos directamente.

---

## Por qué funciona

- **Diferencias de precio de hasta 1.036%** entre clínicas por el mismo tratamiento (estudio FACUA)
- **Hasta 433% de diferencia** entre ciudades
- **La CNMC promueve activamente** la transparencia de precios en servicios dentales
- **No existe un comparador transparente** — solo formularios y esperas
- **Los datos están disponibles**: PDFs de aseguradoras públicos, webs de clínicas con precios, cadenas con listados completos
- **302.420 búsquedas mensuales** en España sobre precios dentales
- **KD = 0** en casi todas las keywords de precio dental — competencia SEO inexistente

---

## Stack Técnico (Exacto — basado en eligedentista y smilepedia)

| Componente | Tecnología | Versión exacta |
|------------|-----------|----------------|
| Framework | Next.js (App Router, standalone output) | 16.1.6 |
| React | React + React DOM | 19.2.3 |
| Styling | Tailwind CSS v4 + @tailwindcss/postcss | ^4 |
| Typography | @tailwindcss/typography | ^0.5.19 |
| Base de datos | PostgreSQL Alpine | 16 |
| ORM | Drizzle ORM + Drizzle Kit | ^0.45.1 / ^0.31.9 |
| DB Driver | postgres (postgres.js) | ^3.4.8 |
| IA | @google/genai (Gemini 2.5 Flash) | ^1.43.0 |
| Validación | Zod | ^4.3.6 |
| Formularios | react-hook-form + @hookform/resolvers | ^7.71.2 / ^5.2.2 |
| Imágenes | Sharp | ^0.34.5 |
| Gráficos | Recharts | ^3.7.0 |
| Markdown | rehype + remark + remark-gfm + remark-html | ^13 / ^15 / ^4 / ^16 |
| SEO links | rehype-autolink-headings + rehype-slug | ^7 / ^6 |
| Schema.org | schema-dts | ^1.1.5 |
| Sitemap | next-sitemap | ^4.2.3 |
| Búsqueda | Pagefind | ^1.4.0 |
| Env | dotenv | ^17.3.1 |
| Scripts | tsx | ^4.21.0 |
| Scraping | Playwright | (nuevo — para scraping de webs) |
| PDF parsing | pdf-parse + pdf-to-img | (nuevo — para PDFs de aseguradoras) |
| Analytics | Plausible | (externo) |
| Hosting | Hetzner VPS + Coolify | (existente) |
| CDN/DNS | Cloudflare | (existente) |
| TypeScript | TypeScript | ^5 |
| ESLint | eslint + eslint-config-next | ^9 / 16.1.6 |
| Runtime | Node.js Alpine | 20 |

---

## Configuración del Proyecto

### package.json

```json
{
  "name": "preciodental",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "postbuild": "next-sitemap && pagefind --site .next/server/app --output-path public/pagefind",
    "start": "next start",
    "lint": "eslint",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:seed": "tsx scripts/seed-db.ts",
    "scrape:pdfs": "tsx scripts/scrape/download-insurance-pdfs.ts",
    "scrape:parse-pdfs": "tsx scripts/scrape/parse-insurance-pdfs.ts",
    "scrape:sanitas": "tsx scripts/scrape/scrape-sanitas.ts",
    "scrape:vitaldent": "tsx scripts/scrape/scrape-vitaldent.ts",
    "scrape:adeslas": "tsx scripts/scrape/scrape-adeslas.ts",
    "scrape:clinics": "tsx scripts/scrape/scrape-clinic-page.ts",
    "import:prices": "tsx scripts/seed/import-prices.ts",
    "generate:articles": "tsx scripts/generate/generate-articles.ts",
    "generate:images": "tsx scripts/generate/generate-images.ts",
    "build:links": "tsx scripts/build-internal-links.ts"
  },
  "dependencies": {
    "@google/genai": "^1.43.0",
    "@hookform/resolvers": "^5.2.2",
    "dotenv": "^17.3.1",
    "drizzle-orm": "^0.45.1",
    "next": "16.1.6",
    "next-sitemap": "^4.2.3",
    "postgres": "^3.4.8",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.71.2",
    "recharts": "^3.7.0",
    "rehype": "^13.0.2",
    "rehype-autolink-headings": "^7.1.0",
    "rehype-slug": "^6.0.0",
    "rehype-stringify": "^10.0.1",
    "remark": "^15.0.1",
    "remark-gfm": "^4.0.1",
    "remark-html": "^16.0.1",
    "schema-dts": "^1.1.5",
    "sharp": "^0.34.5",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@tailwindcss/typography": "^0.5.19",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "drizzle-kit": "^0.31.9",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "pagefind": "^1.4.0",
    "playwright": "^1.50.0",
    "pdf-parse": "^1.1.1",
    "tailwindcss": "^4",
    "tsx": "^4.21.0",
    "typescript": "^5"
  }
}
```

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/webp", "image/avif"],
  },
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### postcss.config.mjs

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### drizzle.config.ts

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://preciodental:preciodental_dev@localhost:5432/preciodental",
  },
});
```

### src/lib/db/index.ts

```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://preciodental:preciodental_dev@localhost:5432/preciodental";

const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 5,
});

export const db = drizzle(client, { schema });
```

### .env.example

```env
DATABASE_URL=postgresql://preciodental:preciodental_dev@localhost:5432/preciodental
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_PASSWORD=cambiar_en_produccion
GEMINI_API_KEY=tu_api_key_aqui
IP_SALT=cadena_aleatoria_para_hash_ip
```

### next-sitemap.config.js

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://preciodental.net",
  generateRobotsTxt: false,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*", "/api/*", "/buscar"],
  generateIndexSitemap: true,
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/tratamientos") {
      priority = 0.9;
      changefreq = "daily";
    } else if (path.match(/^\/tratamientos\/[^/]+$/)) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path.match(/^\/tratamientos\/[^/]+\/[^/]+$/)) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.match(/^\/ciudades\/[^/]+$/)) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.startsWith("/seguros-dentales")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/blog/")) {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path === "/comparar" || path === "/reportar-precio") {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path === "/sobre-nosotros" || path === "/metodologia") {
      priority = 0.5;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
```

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── (marketing)/              ← Route group público
│   │   ├── page.tsx              ← Landing "Compara precios dentales"
│   │   ├── tratamientos/
│   │   │   ├── page.tsx          ← Listado de tratamientos
│   │   │   └── [slug]/
│   │   │       ├── page.tsx      ← Precio de tratamiento nacional
│   │   │       └── [ciudad]/
│   │   │           └── page.tsx  ← Precio tratamiento × ciudad (2.000 páginas)
│   │   ├── ciudades/
│   │   │   ├── page.tsx          ← Listado de ciudades
│   │   │   └── [ciudad]/
│   │   │       └── page.tsx      ← Todos los precios en una ciudad
│   │   ├── seguros-dentales/
│   │   │   ├── page.tsx          ← Comparativa de seguros
│   │   │   └── [aseguradora]/
│   │   │       └── page.tsx      ← Tarifas de cada aseguradora
│   │   ├── comparar/
│   │   │   └── page.tsx          ← Herramienta de comparación interactiva
│   │   ├── reportar-precio/
│   │   │   └── page.tsx          ← Crowdsourcing "¿Cuánto pagaste?"
│   │   ├── blog/
│   │   │   ├── page.tsx          ← Listado de artículos
│   │   │   └── [slug]/
│   │   │       └── page.tsx      ← Artículo individual
│   │   ├── buscar/
│   │   │   └── page.tsx          ← Búsqueda Pagefind
│   │   ├── sobre-nosotros/
│   │   │   └── page.tsx
│   │   ├── metodologia/
│   │   │   └── page.tsx          ← Cómo recopilamos datos
│   │   ├── privacidad/
│   │   │   └── page.tsx
│   │   ├── aviso-legal/
│   │   │   └── page.tsx
│   │   ├── cookies/
│   │   │   └── page.tsx
│   │   └── faq/
│   │       └── page.tsx
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── page.tsx              ← Dashboard: escaneos, leads, precios
│   │   ├── prices/
│   │   │   └── page.tsx          ← Gestión de precios
│   │   └── articles/
│   │       └── page.tsx          ← Gestión de artículos
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/route.ts
│   │   │   ├── prices/route.ts
│   │   │   └── stats/route.ts
│   │   ├── prices/route.ts       ← API pública de precios
│   │   ├── report-price/route.ts ← Crowdsourcing
│   │   ├── contact/route.ts
│   │   ├── newsletter/route.ts
│   │   ├── health/route.ts
│   │   └── og/route.tsx          ← OG images dinámicas
│   ├── layout.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── ui/                       ← Componentes base (Button, Input, Card, etc.)
│   ├── PriceCard.tsx             ← Tarjeta de precio de tratamiento
│   ├── PriceChart.tsx            ← Gráfico Recharts de distribución
│   ├── PriceComparison.tsx       ← Tabla comparativa
│   ├── CityMap.tsx               ← Mapa de precios por ciudad
│   ├── InsuranceComparison.tsx   ← Con/sin seguro
│   ├── TreatmentSearch.tsx       ← Buscador de tratamientos
│   ├── ReportPriceForm.tsx       ← Formulario crowdsourcing
│   ├── FAQSection.tsx            ← FAQ con Schema markup
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Breadcrumbs.tsx
├── lib/
│   ├── db/
│   │   ├── index.ts              ← Conexión DB
│   │   └── schema.ts             ← Schema Drizzle
│   ├── ai/
│   │   └── gemini.ts             ← Cliente Gemini
│   ├── seo/
│   │   └── metadata.ts           ← Generador de metadata
│   ├── utils/
│   │   ├── format.ts             ← formatDate, formatPrice, formatPhone
│   │   ├── slugify.ts            ← NFD normalization, kebab-case
│   │   ├── markdown.ts           ← Markdown → HTML
│   │   └── internal-linking.ts   ← Link building
│   └── data/
│       ├── treatments.ts         ← Lista de tratamientos con slugs
│       └── cities.ts             ← Lista de ciudades con zonas
├── middleware.ts                  ← Auth admin + HTTPS/www redirects
└── types/
    └── index.ts
scripts/
├── seed/
│   ├── seed-db.ts                ← Seed tratamientos + ciudades
│   └── import-prices.ts          ← Importar precios a DB
├── scrape/
│   ├── download-insurance-pdfs.ts
│   ├── parse-insurance-pdfs.ts
│   ├── scrape-sanitas.ts
│   ├── scrape-vitaldent.ts
│   ├── scrape-adeslas.ts
│   ├── scrape-clinic-page.ts
│   └── normalize-treatments.ts
├── generate/
│   ├── generate-articles.ts
│   ├── generate-images.ts
│   └── generate-city-data.ts
└── build-internal-links.ts
```

---

## Middleware (src/middleware.ts)

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("host") || "";

  // HTTP → HTTPS redirect
  if (proto === "http") {
    const cleanHost = host.replace(/^www\./, "");
    return NextResponse.redirect(
      `https://${cleanHost}${pathname}${request.nextUrl.search}`,
      301
    );
  }

  // www → non-www redirect
  if (host.startsWith("www.")) {
    return NextResponse.redirect(
      `https://${host.replace(/^www\./, "")}${pathname}${request.nextUrl.search}`,
      301
    );
  }

  // Protect admin routes (except login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminSession = request.cookies.get("admin_auth");
    if (!adminSession || adminSession.value !== process.env.ADMIN_PASSWORD) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|pagefind).*)"],
};
```

---

## Base de Datos — Schema

```
treatments (tratamientos)
  - id (serial, pk)
  - name ("Implante dental completo")
  - slug ("implante-dental", unique)
  - category ("implantologia")
  - description (text)
  - meta_title
  - meta_description
  - hero_image_url (nullable)
  - display_order (integer)
  - created_at (timestamp)
  - updated_at (timestamp)

treatment_aliases (nombres alternativos)
  - id (serial, pk)
  - treatment_id (fk → treatments)
  - alias ("obturación simple", "restauración con composite")
  - source ("sanitas", "vitaldent")

cities (ciudades)
  - id (serial, pk)
  - name ("Madrid")
  - slug ("madrid", unique)
  - province ("Madrid")
  - community ("Comunidad de Madrid")
  - community_slug ("comunidad-de-madrid")
  - zone ("A" | "B")  -- Zona de aseguradoras
  - population (integer)
  - latitude (decimal)
  - longitude (decimal)

prices (precios recopilados)
  - id (serial, pk)
  - treatment_id (fk → treatments)
  - city_id (fk → cities, nullable — null = precio nacional)
  - source_type enum("insurance_pdf", "chain_website", "clinic_website", "crowdsource", "manual")
  - source_name ("Sanitas Milenium", "Vitaldent", "usuario")
  - source_url (text, nullable)
  - price_min (decimal, nullable)
  - price_max (decimal, nullable)
  - price_exact (decimal, nullable)
  - currency ("EUR", default)
  - year (integer — 2025, 2026)
  - zone ("A" | "B", nullable)
  - includes_tax (boolean, default true)
  - notes (text, nullable)
  - verified (boolean, default false)
  - scraped_at (timestamp)
  - created_at (timestamp)

price_reports (reportes de usuarios — crowdsourcing)
  - id (serial, pk)
  - treatment_id (fk → treatments)
  - city_id (fk → cities)
  - clinic_name (text, nullable)
  - price_paid (decimal)
  - had_insurance (boolean)
  - insurance_name (text, nullable)
  - date_of_treatment (date)
  - receipt_uploaded (boolean, default false)
  - ip_hash (varchar)
  - status enum("pending", "approved", "rejected")
  - created_at (timestamp)

clinics (clínicas que se dan de alta — fase 4)
  - id (serial, pk)
  - name
  - slug (unique)
  - city_id (fk → cities)
  - address (text)
  - phone
  - website (nullable)
  - google_maps_url (nullable)
  - claimed (boolean, default false)
  - active (boolean, default true)
  - created_at (timestamp)
  - updated_at (timestamp)

clinic_prices (precios publicados por clínicas)
  - id (serial, pk)
  - clinic_id (fk → clinics)
  - treatment_id (fk → treatments)
  - price_from (decimal)
  - price_to (decimal, nullable)
  - includes_financing (boolean, default false)
  - last_updated (timestamp)

articles (blog)
  - id (serial, pk)
  - title
  - slug (unique)
  - content (text — markdown)
  - excerpt (text)
  - meta_title
  - meta_description
  - featured_image_url (nullable)
  - table_of_contents (jsonb, nullable)
  - faq (jsonb, nullable)
  - treatment_id (fk → treatments, nullable)
  - city_id (fk → cities, nullable)
  - target_keywords (text[], nullable)
  - word_count (integer)
  - reading_time (integer)
  - status enum("draft", "published", "archived")
  - published_at (timestamp, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)

keywords (keywords de Ahrefs importadas)
  - id (serial, pk)
  - keyword (text)
  - volume (integer)
  - kd (integer, nullable)
  - cpc (decimal, nullable)
  - treatment_id (fk → treatments, nullable)
  - city_id (fk → cities, nullable)
  - intent ("informational" | "commercial" | "transactional")
  - is_question (boolean)
  - is_branded (boolean)
  - source ("ahrefs_explorer" | "cleardent_organic" | "vitaldent_organic")
  - created_at (timestamp)

images (imágenes generadas)
  - id (serial, pk)
  - article_id (fk → articles, nullable)
  - treatment_id (fk → treatments, nullable)
  - url (text)
  - alt_text (text)
  - width (integer)
  - height (integer)
  - created_at (timestamp)

newsletter_subscribers
  - id (serial, pk)
  - email (unique)
  - subscribed_at (timestamp)
  - confirmed (boolean)

contact_messages
  - id (serial, pk)
  - name
  - email
  - subject
  - message (text)
  - created_at (timestamp)
  - read (boolean, default false)

rate_limits
  - id (serial, pk)
  - ip_hash (varchar)
  - action (varchar)
  - window_start (timestamp)
  - count (integer)
```

---

## Fuentes de Datos

### Prioridad 1 — PDFs de Aseguradoras (datos más completos y estructurados)

Las aseguradoras publican baremos/tarifas en PDF con TODOS los tratamientos dentales y precios máximos, separados por zona geográfica.

| Aseguradora | URL del PDF | Notas |
|-------------|-------------|-------|
| Sanitas Dental Milenium | https://www.sanitas.es/media/sden/documento/doc-dental-milenium-precios-tratamientos/sd-milenium-servicios-y-tarifas.pdf | Tarifa 2025 |
| Sanitas Dental Premium | https://www.sanitas.es/media/sden/documento/sanitas-premium-precios-tratamientos/sd-premium-servicios-y-tarifas.pdf | Tarifa 2025 |
| Sanitas Dental (empresas) | https://www.sanitas.es/colectivos/empresas/media/cobrandeds/doc/archivo/franquicias-sanitas-dental/sanitas-dental-servicios-y-tarifas.pdf | 2025 |
| Adeslas Plus Dental | https://www.segurcaixaadeslas.es/sites/default/files/2025-01/plus-dental-25.pdf | 2025, con/sin copago |
| Adeslas Dental Total | https://www.segurcaixaadeslas.es/sites/default/files/2024-12/nota-informativa-adeslas-dental-total-25.pdf | 2025 |
| Cigna Healthcare 2026 | https://www.cignasalud.es/sites/default/files/2025-11/TD-Tarifas_dentales_26V1_ES.pdf | Zona A y B |
| Cigna Healthcare 2025 | https://www.cignasalud.es/sites/default/files/2024-11/TD-Tarifas_dentales_Zona_B_25V1_ES%20(1).pdf | Zona B |
| Caser Dental 2026 | https://www.caser.es/documents/473773/15908584/Precios-servicios-franquicias-clinicas-dentales-caser-seguros.pdf | Plan Sonrisa |
| Generali Dental (Zona A) | https://cppm.es/wp-content/uploads/2020/01/baremo-2020-generali-basico_zona-a.pdf | Andalucía, Canarias, etc. |
| Generali Dental (Zona B) | https://cppm.es/wp-content/uploads/2020/01/baremo-2020-generali-basico_zona-b.pdf | Madrid, Cataluña, etc. |
| AXA Dental | https://servicios.axa.es/documents/776357/18016030/Tarifa_dental.pdf | Tarifa completa |
| Mapfre Dental | https://www.seguros-dentales.es/descargas/mapfre-precios-dental.pdf | Baremo |
| DentyCard (El Corte Inglés) | https://www.dentycard.es/Colectivos/ECI_TARJETA/Pages/Baremo.aspx | Precios máximos |

**Zonas geográficas de las aseguradoras:**
- **Zona A** (más barata): Andalucía, Canarias, Castilla-La Mancha, Extremadura, Murcia
- **Zona B** (más cara): Madrid, Cataluña, País Vasco, Navarra, Aragón, Baleares, La Rioja

**Cómo extraer:**
1. Descargar PDF
2. Convertir cada página a imagen
3. Enviar a Gemini Vision: "Extrae todos los tratamientos y precios de esta tabla en JSON"
4. Parsear respuesta → normalizar → cargar en DB

### Prioridad 2 — Webs de Cadenas (HTML estructurado)

| Cadena | URL de precios | Cobertura |
|--------|---------------|-----------|
| Sanitas Dental | https://www.sanitas.es/dental/precios-tratamientos-dentales | 220+ clínicas |
| Vitaldent | https://www.vitaldent.com/es/precios-de-tratamientos-dentales/ | 450+ clínicas |
| Adeslas Dental | https://www.adeslasdental.es/en/price-list/ | Red nacional |
| Abaden Dentistas | https://www.abadendentistas.com/precios-de-los-tratamientos-dentales/ | Multi-sede |

**Cómo extraer:** Scraping con Playwright → parsear tablas HTML → normalizar → cargar en DB.

### Prioridad 3 — Clínicas Independientes con Precios Públicos

| Clínica | URL | Ciudad |
|---------|-----|--------|
| Dr. Ferrer (Dental Medics) | https://www.dentalmedics.es/precios/ | Madrid |
| Dr. Estevez | https://www.clinicaestevez.org/en/lista-de-precios | Madrid |
| Ferrus & Bratos | https://www.clinicaferrusbratos.com/odontologia-general/precios-tratamientos-dentales/ | Madrid |
| Propdental | https://www.propdental.es/precios/ | Barcelona |
| Clinica Corona | https://clinicacorona.com/en/article/116.html | - |
| Centro Dental | https://centrodental.es/tarifas.html | - |

### Prioridad 4 — Crowdsourcing "¿Cuánto pagaste?" (Fase 2)
### Prioridad 5 — Clínicas se dan de alta (Fase 3)

---

## Datos de Precios Base por Tratamiento

Rangos de precios reales en España 2025-2026:

### Diagnóstico y Prevención
| Tratamiento | Rango | Media |
|-------------|-------|-------|
| Primera consulta / revisión | GRATIS - 22€ | ~15€ |
| Radiografía panorámica | GRATIS - 100€ | ~50€ |
| Radiografía periapical | 20€ - 30€ | ~20€ |
| TAC dental completo | 100€ - 120€ | ~110€ |
| Limpieza dental (profilaxis) | 40€ - 100€ | ~55€ |

### Odontología General
| Tratamiento | Rango | Media |
|-------------|-------|-------|
| Empaste simple | 44€ - 80€ | ~55€ |
| Empaste compuesto | 50€ - 150€ | ~80€ |
| Reconstrucción dental | 60€ - 80€ | ~70€ |
| Férula de descarga | 243€ - 383€ | ~290€ |

### Endodoncia
| Tratamiento | Rango | Media |
|-------------|-------|-------|
| Endodoncia 1 conducto | 100€ - 300€ | ~230€ |
| Endodoncia 2 conductos | 140€ - 350€ | ~250€ |
| Endodoncia 3+ conductos | 190€ - 415€ | ~280€ |

### Periodoncia
| Tratamiento | Rango | Media |
|-------------|-------|-------|
| Curetaje por cuadrante | 60€ - 100€ | ~70€ |
| Estudio periodontal | 100€ - 120€ | ~110€ |
| Cirugía periodontal | 150€ - 250€ | ~180€ |
| Injerto de encía | 180€ - 350€ | ~250€ |

### Cirugía Oral
| Tratamiento | Rango | Media |
|-------------|-------|-------|
| Extracción simple | 40€ - 90€ | ~55€ |
| Extracción compleja | 60€ - 200€ | ~100€ |
| Muela del juicio (simple) | 50€ - 120€ | ~90€ |
| Muela del juicio (incluida) | 150€ - 300€ | ~210€ |

### Implantología
| Tratamiento | Rango | Media |
|-------------|-------|-------|
| Implante (tornillo solo) | 380€ - 780€ | ~530€ |
| Corona sobre implante (metal-porcelana) | 450€ - 550€ | ~480€ |
| Corona sobre implante (circonio) | 510€ - 665€ | ~600€ |
| **Implante completo (tornillo+pilar+corona)** | **900€ - 1.800€** | **~1.550€** |
| Elevación de seno maxilar | 360€ - 900€ | ~500€ |
| All-on-4 (arcada completa) | 5.780€ - 10.500€ | ~8.000€ |
| Boca completa (ambas arcadas) | 7.000€ - 16.880€ | ~12.000€ |

### Ortodoncia
| Tratamiento | Rango | Media |
|-------------|-------|-------|
| Brackets metálicos | 2.400€ - 3.380€ | ~2.700€ |
| Brackets de zafiro | 3.300€ - 4.290€ | ~3.600€ |
| Invisalign Lite | 3.500€ - 5.330€ | ~4.200€ |
| Invisalign Comprehensive | 4.450€ - 6.695€ | ~5.200€ |

### Estética Dental
| Tratamiento | Rango | Media |
|-------------|-------|-------|
| Blanqueamiento en clínica | 250€ - 553€ | ~400€ |
| Carilla de composite | 120€ - 325€ | ~200€ |
| Carilla de porcelana | 350€ - 773€ | ~550€ |

### Prótesis
| Tratamiento | Rango | Media |
|-------------|-------|-------|
| Corona metal-porcelana | 290€ - 440€ | ~350€ |
| Corona de circonio | 399€ - 520€ | ~460€ |
| Prótesis removible completa | 450€ - 900€ | ~600€ |

### Variación por Ciudad
**Ciudades más caras:** Barcelona, Las Palmas, Palma de Mallorca
**Ciudades más baratas:** Granada, Badajoz, Valencia

---

## Estrategia SEO — Keywords Completas

**Archivo de referencia:** `keywords-preciodental-completo.md` (11.643 líneas, 4.154 keywords totales)

### Resumen de keywords por fuente

| Fuente | Total keywords | Sobre precios |
|--------|---------------|---------------|
| Google ES (Keyword Explorer) | 1.800 | 1.800 (todas) |
| Cleardent.es (orgánicas) | 15.817 | 2.352 |
| Vitaldent.com (orgánicas) | 17.421 | 2.002 |
| **Total únicas** | | **~4.154** |

### Top 50 keywords por volumen (Google ES)

| # | Keyword | Vol | KD |
|---|---------|-----|-----|
| 1 | precio implante dental | 2.900 | 0 |
| 2 | precio blanqueamiento dental | 2.200 | 0 |
| 3 | precio endodoncia | 2.000 | 0 |
| 4 | cuanto cuesta un implante dental | 1.800 | 0 |
| 5 | precio limpieza dental | 1.700 | 0 |
| 6 | precio carillas dentales | 1.600 | 0 |
| 7 | cuanto cuesta una endodoncia | 1.200 | 0 |
| 8 | precio implante dental vitaldent | 1.200 | 1 |
| 9 | cuanto cuesta un empaste | 1.200 | 0 |
| 10 | precio ortodoncia invisible | 1.000 | 0 |
| 11 | precio corona dental | 800 | 0 |
| 12 | precio protesis dental removible vitaldent | 700 | 0 |
| 13 | precio ortodoncia | 700 | 0 |
| 14 | precio implante dental completo | 600 | 0 |
| 15 | precio carillas dentales vitaldent | 450 | 9 |
| 16 | precio endodoncia y reconstrucción | 450 | 0 |
| 17 | precio endodoncia vitaldent | 400 | 4 |
| 18 | precio blanqueamiento dental vitaldent | 350 | 0 |
| 19 | precio limpieza dental vitaldent | 350 | 5 |
| 20 | precio implante dental sanitas | 350 | 0 |
| 21 | precio funda dental | 300 | 0 |
| 22 | precio ortodoncia invisible vitaldent | 300 | 2 |
| 23 | precio protesis dental | 250 | 0 |
| 24 | precio endodoncia madrid | 250 | 0 |
| 25 | cuanto cuesta una endodoncia en españa | 250 | 0 |
| 26 | precio limpieza dental profunda con anestesia | 200 | 0 |
| 27 | precio endodoncia y reconstruccion | 200 | - |
| 28 | precio endodoncia muela | 200 | 0 |
| 29 | precio corona dental vitaldent | 200 | 1 |
| 30 | precio implante dental madrid | 200 | 0 |
| 31 | precio implante dental muela | 200 | 1 |
| 32 | cuanto cuesta un implante dental en españa | 200 | 2 |
| 33 | precio empaste dental | 150 | 0 |
| 34 | cuanto cuesta una endodoncia en madrid | 150 | 0 |
| 35 | precio implante dental adeslas | 150 | 1 |
| 36 | precio endodoncia barcelona | 150 | 0 |
| 37 | precio protesis dental fija | 150 | 0 |
| 38 | precio corona dental euros | 150 | 0 |
| 39 | cuanto cuesta un empaste en españa | 150 | 0 |
| 40 | precio implante dental 3 piezas | 150 | 0 |
| 41 | precio implante dental barcelona | 150 | 0 |
| 42 | cuanto cuesta un puente dental | 150 | 0 |
| 43 | precio carillas dentales españa | 150 | 0 |
| 44 | seguro dental precios | 150 | 2 |
| 45 | cuanto cuesta un empaste dental | 150 | 0 |
| 46 | precio ortodoncia invisible adeslas | 150 | 0 |
| 47 | cuanto cuesta un empaste en madrid | 150 | 0 |
| 48 | precio protesis dental removible completa | 100 | 0 |
| 49 | precio ortodoncia infantil | 100 | 0 |
| 50 | precio ortodoncia invisible españa | 100 | 0 |

### Keywords por tratamiento (con volumen total)

| Tratamiento | Keywords | Volumen total | Keyword principal |
|-------------|----------|---------------|-------------------|
| Implante dental | ~350 | ~12.000 | "precio implante dental" (2.900) |
| Endodoncia | ~200 | ~8.000 | "precio endodoncia" (2.000) |
| Blanqueamiento | ~120 | ~5.500 | "precio blanqueamiento dental" (2.200) |
| Carillas | ~150 | ~5.000 | "precio carillas dentales" (1.600) |
| Ortodoncia / Invisalign | ~180 | ~6.500 | "precio ortodoncia invisible" (1.000) |
| Limpieza dental | ~80 | ~4.000 | "precio limpieza dental" (1.700) |
| Empaste | ~90 | ~3.500 | "cuanto cuesta un empaste" (1.200) |
| Corona / Funda | ~100 | ~3.000 | "precio corona dental" (800) |
| Prótesis | ~100 | ~3.000 | "precio protesis dental" (250) |
| Extracción / Muela juicio | ~60 | ~1.500 | "precio muela del juicio" |
| Brackets | ~60 | ~2.000 | "precio brackets" |

### Keywords por ciudad (con volumen)

| Ciudad | Keywords | Volumen total | Ejemplo |
|--------|----------|---------------|---------|
| Madrid | ~80 | ~2.500 | "precio endodoncia madrid" (250) |
| Barcelona | ~60 | ~1.800 | "precio implante dental barcelona" (150) |
| Valencia | ~30 | ~800 | "precio implante dental valencia" (100) |
| Zaragoza | ~20 | ~500 | "precio implante dental zaragoza" (70) |
| Sevilla | ~15 | ~400 | "dentista barato sevilla" |
| Málaga | ~15 | ~350 | "dentista barato malaga" |
| Bilbao | ~10 | ~200 | "dentista barato bilbao" |

### Keywords de marca/aseguradora (con volumen)

| Marca | Keywords | Volumen total | Ejemplo |
|-------|----------|---------------|---------|
| Vitaldent | ~120 | ~5.000 | "precio implante dental vitaldent" (1.200) |
| Sanitas | ~40 | ~1.200 | "precio implante dental sanitas" (350) |
| Adeslas | ~30 | ~800 | "precio implante dental adeslas" (150) |
| Asisa | ~10 | ~200 | "precio ortodoncia asisa" |

### Keywords donde ambos competidores rankean mal (oportunidad directa)

| Keyword | Volumen | Cleardent Pos | Vitaldent Pos |
|---------|---------|---------------|---------------|
| carillas dentales precio | 3.500 | 33 | 8 |
| protesis dental fija precio | 2.100 | 7 | 15 |
| precio carillas dentales | 1.800 | 20 | 19 |
| alineadores invisibles precio | 600 | 23 | 6 |
| protesis dental removible precio | 600 | 11 | 12 |
| cuanto cuesta una dentadura postiza | 500 | 5 | 11 |
| perno dental precio | 400 | 13 | 18 |
| cuanto cuesta invisalign | 400 | 49 | 78 |

### Keywords donde NINGUNO rankea (1.633 keywords huérfanas)

Ejemplos clave:
- precio implante dental completo (600)
- precio implante dental sanitas (350)
- precio endodoncia y reconstruccion (200)
- precio implante dental adeslas (150)
- seguro dental precios (150)
- dentista barato cerca de mi (100)
- precio ortodoncia infantil (100)
- financiar tratamiento dental (80)

### Páginas SEO prioritarias por volumen

| Página | Keywords que captura | Volumen combinado |
|--------|---------------------|-------------------|
| /tratamientos/implante-dental | implante precio, cuanto cuesta implante, implante completo | ~12.000 |
| /tratamientos/ortodoncia-invisible | invisalign, ortodoncia invisible, alineadores | ~6.500 |
| /tratamientos/carillas-dentales | carillas precio, carillas composite/porcelana | ~5.000 |
| /tratamientos/blanqueamiento-dental | blanqueamiento precio, cuanto cuesta blanqueamiento | ~5.500 |
| /tratamientos/endodoncia | endodoncia precio, cuanto cuesta endodoncia | ~8.000 |
| /tratamientos/limpieza-dental | limpieza dental precio, limpieza profunda | ~4.000 |
| /tratamientos/empaste | empaste precio, cuanto cuesta empaste | ~3.500 |
| /tratamientos/protesis-dental | protesis fija/removible, dentadura postiza precio | ~3.000 |
| /tratamientos/corona-dental | corona precio, funda dental precio | ~3.000 |
| /tratamientos/brackets | brackets metálicos/zafiro precio | ~2.000 |
| /seguros-dentales/vitaldent | precios vitaldent (todos los tratamientos) | ~5.000 |
| /seguros-dentales/sanitas | precios sanitas dental | ~1.200 |
| /seguros-dentales/adeslas | precios adeslas dental | ~800 |
| /tratamientos/implante-dental/madrid | implante dental madrid | ~500 |
| /tratamientos/endodoncia/madrid | endodoncia madrid | ~400 |
| /tratamientos/implante-dental/barcelona | implante dental barcelona | ~400 |

**Volumen total atacable solo con las páginas programáticas: ~60.000+ búsquedas/mes**

---

## SEO Programático — Modelo de Página

### Ejemplo: `/tratamientos/implante-dental/madrid`

```
<h1>Precio de implante dental en Madrid (2026)</h1>

[Rango de precios visual — componente Recharts]
  Mínimo: 900€  |  Media: 1.300€  |  Máximo: 1.800€

[Comparativa con media nacional]
  Madrid: 1.300€ media  vs  España: 1.550€ media
  "Los implantes en Madrid son un 16% más baratos que la media nacional"

[Tabla: Precios por tipo de implante]
  Implante (tornillo solo): 450€ - 780€
  Corona sobre implante (metal-porcelana): 450€ - 550€
  Corona sobre implante (circonio): 510€ - 665€
  Implante completo: 900€ - 1.800€
  All-on-4: 5.780€ - 10.500€

[Gráfico Recharts: Distribución de precios por fuente]

[Tabla: Precios por aseguradora en Madrid (Zona B)]
  Sanitas Milenium: desde 380€ (tornillo)
  Adeslas: desde 420€ (tornillo)
  Cigna: desde 390€ (tornillo)

[Con seguro vs Sin seguro]
  Sin seguro: 1.100€ - 1.500€
  Con seguro dental: 600€ - 900€
  Ahorro medio: ~40%

[FAQ — Schema markup FAQPage]
  ¿Cuánto cuesta un implante dental en Madrid?
  ¿Qué incluye el precio del implante?
  ¿Cuánto se tarda en poner un implante?
  ¿Merece la pena un seguro dental para implantes?

[CTA]
  "Escanea tu boca gratis con IA" → DentalScore.net
  "Solicita presupuesto personalizado" → formulario lead

[Fuentes]
  Datos actualizados a [fecha]. Fuentes: Sanitas, Adeslas, Cigna, [N] clínicas.
  "¿Eres dentista? Actualiza tus precios"
```

---

## Competencia en España

| Plataforma | Modelo | Debilidad | Nuestra ventaja |
|------------|--------|-----------|-----------------|
| ComparadorDentistas.com | Solicitud de presupuesto (formularios) | Hay que esperar, no ves precios | Precios visibles al instante |
| InversaDental.com | Subasta inversa (clínicas pujan) | 3 días de espera | Información inmediata |
| ComparadorDental.es | Compara seguros dentales | No compara tratamientos | Comparamos tratamientos |
| Cleardent.es | Blog de precios (solo sus clínicas) | Sesgo hacia sus propios precios | Datos agregados de todas las fuentes |
| Vitaldent.com | Página hub de precios (solo sus clínicas) | Sesgo hacia sus propios precios | Comparativa independiente |
| Ferrus & Bratos | Blog de precios excelente | Solo una clínica de Madrid | Datos nacionales |
| Doctoralia / TopDoctors | Reviews y reservas | No hay transparencia de precio | Precio como dato central |

**Ventaja competitiva clave:** Cleardent y Vitaldent son clínicas — su contenido de precios solo habla de SUS precios para atraer a SUS clínicas. PrecioDental es un comparador independiente. Eso es exactamente lo que busca el usuario cuando escribe "precio implante dental vitaldent" (1.200 búsquedas/mes) — quiere comparar, no que le vendan.

---

## Legal

### Scraping: Es legal (con condiciones)

- Los precios publicados en webs son **datos factuales públicos**, no protegidos por copyright
- La CNMC promueve activamente la transparencia de precios dentales
- FACUA ha pedido transparencia obligatoria de precios dentales
- PDFs de aseguradoras son documentos públicos descargables por cualquiera

**Requisitos:**
1. Respetar robots.txt
2. Rate limiting en el scraping
3. No scraper datos personales de pacientes
4. Atribución de fuentes y fechas
5. Mecanismo para que clínicas corrijan/actualicen sus datos
6. Disclaimers claros

### Disclaimer obligatorio

> Los precios mostrados son orientativos y están basados en datos públicos de aseguradoras, cadenas dentales y clínicas que publican sus tarifas. El precio final de cualquier tratamiento depende del diagnóstico individualizado del profesional. Solicita siempre un presupuesto personalizado antes de iniciar cualquier tratamiento. Precios con IVA incluido salvo indicación contraria. Última actualización: [fecha].

---

## Fases de Desarrollo

### FASE 1 — MVP con datos de aseguradoras (Semanas 1-3)
- [ ] Setup proyecto (copiar estructura de eligedentista/smilepedia)
- [ ] npm install con las dependencias exactas
- [ ] Configurar DB: schema Drizzle + migrations
- [ ] Seed de tratamientos (~40) y ciudades (~50) con zonas A/B
- [ ] Descargar y parsear PDFs de aseguradoras con Gemini Vision
- [ ] Normalizar tratamientos y cargar precios en DB
- [ ] Landing page con buscador: tratamiento + ciudad
- [ ] Páginas de tratamiento (40 páginas)
- [ ] Páginas de ciudad (50 páginas)
- [ ] Páginas tratamiento×ciudad (2.000 páginas programáticas)
- [ ] Componentes: PriceCard, PriceChart (Recharts), PriceComparison
- [ ] Schema markup (AggregateOffer, FAQ)
- [ ] Sitemap + robots.txt
- [ ] Middleware: admin auth + HTTPS/www redirects
- [ ] Panel admin básico
- [ ] Despliegue en Hetzner/Coolify
- [ ] Alta en Google Search Console + Plausible

### FASE 2 — Scraping de clínicas + crowdsourcing (Semanas 4-6)
- [ ] Scraping de Sanitas, Vitaldent, Adeslas (webs HTML)
- [ ] Scraping de clínicas independientes (Playwright)
- [ ] Normalización automática con IA (treatment_aliases)
- [ ] Formulario "¿Cuánto pagaste?" (crowdsourcing)
- [ ] Panel admin para verificar datos
- [ ] Comparativa con/sin seguro en cada página
- [ ] Páginas de aseguradoras (/seguros-dentales/vitaldent, /sanitas, /adeslas)

### FASE 3 — Contenido + Lead Gen (Semanas 7-9)
- [ ] Blog: artículos SEO por tratamiento ("Precio implante dental 2026: guía completa")
- [ ] Blog: artículos por ciudad ("Precios dentista Madrid 2026")
- [ ] Blog: artículos de seguros ("¿Merece la pena un seguro dental?")
- [ ] Generación de imágenes con Gemini 2.5 Flash Image
- [ ] Formulario de solicitud de presupuesto (lead gen)
- [ ] Conexión con DentalScore ("Escanea tu boca gratis")
- [ ] Pagefind para búsqueda interna
- [ ] Internal linking automático
- [ ] Newsletter
- [ ] Dashboard interno con métricas

### FASE 4 — Clínicas se dan de alta (Mes 3+)
- [ ] Registro de clínicas
- [ ] Panel de clínica: actualizar precios
- [ ] Listing gratuito vs premium (monetización)
- [ ] Verificación de clínicas
- [ ] Reviews de pacientes

---

## Despliegue en Hetzner + Coolify

### Lecciones de eligedentista y smilepedia

#### 1. DevDependencies en Docker
Forzar `NODE_ENV=development` en el stage de deps:
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN NODE_ENV=development npm ci --ignore-scripts
```

#### 2. NEXT_PUBLIC_* en build time
Pasarlas como ARG en Dockerfile:
```dockerfile
ARG NEXT_PUBLIC_SITE_URL=https://preciodental.net
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
```

#### 3. Cookies/SSL con Coolify reverse proxy
Coolify hace de proxy (HTTP interno). Detectar `x-forwarded-proto` en middleware para redirect HTTPS. Smilepedia lo tiene implementado correctamente.

#### 4. Imágenes persistentes
Volumen Docker para imágenes generadas:
```yaml
volumes:
  - app_images:/app/public/images
```

#### 5. Base de datos
Usar PostgreSQL de Coolify por red interna Docker:
```
DATABASE_URL=postgresql://preciodental:PASSWORD@db:5432/preciodental
```

#### 6. outputFileTracingRoot
Smilepedia usa `outputFileTracingRoot: __dirname` en next.config.ts para mejor compatibilidad con Docker standalone. Incluirlo.

#### 7. Pagefind en postbuild
Smilepedia genera el índice de Pagefind en postbuild. Funciona bien con el standalone output.

### Dockerfile

```dockerfile
# ============================================================================
# PrecioDental.net — Multi-Stage Docker Build
# ============================================================================

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN NODE_ENV=development npm ci --ignore-scripts

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ARG NEXT_PUBLIC_SITE_URL=https://preciodental.net
ARG ADMIN_PASSWORD

ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}
ENV NEXT_TELEMETRY_DISABLED=1

RUN NODE_ENV=production npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p public/images/articles public/images/treatments && \
    chown -R nextjs:nodejs public/images

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

### docker-compose.yml (desarrollo)

```yaml
services:
  db:
    image: postgres:16-alpine
    container_name: preciodental-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: preciodental
      POSTGRES_USER: preciodental
      POSTGRES_PASSWORD: preciodental_dev
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U preciodental"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

### docker-compose.prod.yml (producción)

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        DATABASE_URL: postgresql://preciodental:${DB_PASSWORD}@db:5432/preciodental
        NEXT_PUBLIC_SITE_URL: https://preciodental.net
        ADMIN_PASSWORD: ${ADMIN_PASSWORD}
    container_name: preciodental-app
    restart: unless-stopped
    ports:
      - "${APP_PORT:-3000}:3000"
    environment:
      DATABASE_URL: postgresql://preciodental:${DB_PASSWORD}@db:5432/preciodental
      NEXT_PUBLIC_SITE_URL: https://preciodental.net
      ADMIN_PASSWORD: ${ADMIN_PASSWORD}
      GEMINI_API_KEY: ${GEMINI_API_KEY}
      NODE_ENV: production
    volumes:
      - app_images:/app/public/images
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    container_name: preciodental-db-prod
    restart: unless-stopped
    environment:
      POSTGRES_DB: preciodental
      POSTGRES_USER: preciodental
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata_prod:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U preciodental"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata_prod:
  app_images:
```

### Checklist de despliegue

```
ANTES DE DESPLEGAR:
  [ ] Comprar dominio preciodental.net
  [ ] Configurar DNS en Cloudflare → IP del servidor Hetzner
  [ ] SSL/TLS en Cloudflare: modo Full (strict)

EN COOLIFY:
  [ ] Crear nuevo proyecto "PrecioDental"
  [ ] Crear servicio PostgreSQL 16
      - DB name: preciodental
      - User: preciodental
      - Password: (generar segura)
  [ ] Crear servicio desde GitHub repo
      - Build pack: Dockerfile
      - Puerto: 3000
  [ ] Variables de entorno:
      - DATABASE_URL
      - GEMINI_API_KEY
      - NEXT_PUBLIC_SITE_URL=https://preciodental.net
      - ADMIN_PASSWORD
      - IP_SALT
  [ ] Configurar dominio: preciodental.net
  [ ] SSL automático

DESPUÉS DE DESPLEGAR:
  [ ] Verificar /api/health → {"status":"ok"}
  [ ] Verificar HTTPS y redirect www → non-www
  [ ] Ejecutar db:push para crear tablas
  [ ] Ejecutar db:seed para cargar tratamientos y ciudades
  [ ] Ejecutar scrape:pdfs + scrape:parse-pdfs para cargar precios
  [ ] Verificar páginas programáticas generadas
  [ ] Alta en Google Search Console
  [ ] Alta en Plausible Analytics
  [ ] Enviar sitemap a Google
```

---

## Conexión con el Ecosistema

```
DentalScore (escáner IA)
    ↓ "Necesitas un implante"
    ↓
PrecioDental (precios)
    ↓ "Un implante cuesta 900-1.800€ en tu ciudad"
    ↓ "En Valencia es un 20% más barato"
    ↓
DentalTrip (turismo dental)
    ↓ "¿Y si te lo haces en España por la mitad?"
```

---

## Modelo de Ingresos

| Canal | Fase | Estimación |
|-------|------|-----------|
| Leads a Cleardent (propio) | Fase 1 | Valor interno |
| Leads a clínicas (CPA) | Fase 3 | 10-30€ por lead cualificado |
| Listings premium | Fase 4 | 50-200€/mes por clínica |
| Afiliación seguros dentales | Fase 2 | Comisión por póliza vendida |
| Publicidad dental | Fase 3 | CPM / CPC |
| Datos agregados para aseguradoras | Fase 4 | Licencia de datos |

---

## Referencias

### Estudios de precios
- FACUA: diferencias de hasta 433% entre ciudades
- FACUA: diferencias de hasta 1.036% entre clínicas

### Modelo a seguir
- FAIR Health Consumer (USA): https://www.fairhealthconsumer.org/dental

### Directorios
- GuíaDentistas (oficial): https://guiadentistas.es/ (44.202 dentistas)
- Doctoralia: https://www.doctoralia.es/dentista
- TopDoctors: https://www.topdoctors.es/clinica-dental/

### Legal
- Scraping legal en EU: discoverdigitallaw.com
- Regulación publicidad España: mariscal-abogados.com
- Honorarios dentales normativa: odontologia33.com
