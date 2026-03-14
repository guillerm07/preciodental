# PrecioDental.net

Comparador transparente de precios dentales en España. El usuario busca un tratamiento + ciudad y ve al instante el rango de precios (mín/media/máx) con datos de aseguradoras, cadenas y clínicas.

## Stack

- Next.js 16.1.6 (App Router, standalone output)
- React 19.2.3
- Tailwind CSS v4 con @tailwindcss/postcss
- PostgreSQL 16 + Drizzle ORM
- Gemini 2.5 Flash (IA para parsing de PDFs y generación de contenido)
- Recharts (gráficos de precios)
- Pagefind (búsqueda)
- Docker multi-stage → Hetzner + Coolify

## Convenciones

- Route groups: `(marketing)` para público, `admin` para panel
- Patrón de middleware: HTTPS/www redirects + admin auth cookie
- DB connection: postgres.js con pool max 10, idle 20s, connect 5s
- Imágenes: WebP + AVIF, procesadas con Sharp
- SEO: next-sitemap, schema-dts, FAQ Schema markup
- Slugs: NFD normalization → kebab-case
- Scripts: en `/scripts/` ejecutados con tsx

## Estructura clave

- `/tratamientos/[slug]` — Página de tratamiento nacional
- `/tratamientos/[slug]/[ciudad]` — Precio tratamiento × ciudad (2.000 páginas programáticas)
- `/ciudades/[ciudad]` — Todos los precios de una ciudad
- `/seguros-dentales/[aseguradora]` — Tarifas por aseguradora
- `/blog/[slug]` — Artículos SEO

## Datos

- Los PDFs de aseguradoras se descargan y parsean con Gemini Vision
- Los datos de Ahrefs están en `/datos/`
- El plan completo está en `PLAN.md`
- Las 4.154 keywords completas están en `KEYWORDS.md`

## Deployment

- Dockerfile multi-stage: deps (NODE_ENV=development) → builder → runner
- NEXT_PUBLIC_SITE_URL se pasa como ARG en build time
- PostgreSQL por red interna Docker (db:5432)
- Volumen persistente para imágenes
- Middleware detecta x-forwarded-proto para redirect HTTPS (Coolify proxy)

## Problemas conocidos (de otros proyectos)

- NODE_ENV=development obligatorio en stage deps (sino no instala devDependencies)
- NEXT_PUBLIC_* deben ser ARG en Dockerfile (se embeben en build)
- Cookies secure: Coolify hace proxy HTTP interno, usar x-forwarded-proto
- Imágenes: montar volumen o se pierden al redesplegar
