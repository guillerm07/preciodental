export const dynamic = "force-dynamic";

import Link from "next/link";
import { TreatmentSearch } from "@/components/TreatmentSearch";
import { PriceRangeBar } from "@/components/PriceRangeBar";
import AnimatedCounter from "@/components/AnimatedCounter";
import SourceTicker from "@/components/SourceTicker";
import {
  getAllTreatments,
  getAllCities,
  getTreatmentsWithNationalPrices,
  getGlobalStats,
} from "@/lib/data/queries";
import { formatPrice } from "@/lib/utils/format";

export default async function HomePage() {
  const [treatments, cities, treatmentsWithPrices, stats] = await Promise.all([
    getAllTreatments(),
    getAllCities(),
    getTreatmentsWithNationalPrices(),
    getGlobalStats(),
  ]);

  const topCities = cities.slice(0, 12);

  const popularSlugs = [
    "implante-dental",
    "ortodoncia-invisible",
    "blanqueamiento-dental",
    "brackets-metalicos",
    "carillas-de-porcelana",
  ];

  const popularLinks = popularSlugs
    .map((slug) => {
      const t = treatmentsWithPrices.find((t) => t.treatmentSlug === slug);
      if (!t) return null;
      return { slug: t.treatmentSlug, name: t.treatmentName };
    })
    .filter(Boolean) as { slug: string; name: string }[];

  const topTreatments = treatmentsWithPrices.slice(0, 6);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-visible pb-12 pt-16">
        <div
          className="absolute inset-0 bg-mesh-gradient opacity-80"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-50/50 to-accent-50" />

        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mt-12 sm:mt-24 lg:mt-32">
          <div className="text-center max-w-4xl mx-auto space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md border border-white px-4 py-1.5 shadow-sm text-sm font-medium text-accent-700 mx-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
              </span>
              Datos actualizados a {new Date().getFullYear()}
            </div>
            
            <h1
              className="text-5xl font-extrabold tracking-tight text-accent-950 sm:text-6xl lg:text-7xl text-balance"
              style={{ lineHeight: "1.1" }}
            >
              Compara precios dentales en España. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-400">Sin sorpresas.</span>
            </h1>

            <p className="text-lg sm:text-xl text-accent-600 max-w-2xl mx-auto text-pretty leading-relaxed">
              Basado en <span className="font-semibold text-accent-900 border-b-2 border-primary-300">{stats.prices}+ precios reales</span> extraídos de aseguradoras, cadenas y clínicas en <span className="font-semibold text-accent-900">{stats.cities} ciudades</span>.
            </p>

            {/* Search */}
            <div className="pt-8 pb-4">
              <TreatmentSearch
                treatments={treatments.map((t) => ({
                  name: t.name,
                  slug: t.slug,
                  category: t.category,
                }))}
                cities={cities.map((c) => ({ name: c.name, slug: c.slug }))}
              />
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm max-w-2xl mx-auto">
              <span className="text-accent-400">Más buscados:</span>
              {popularLinks.map((link, i) => (
                <span key={link.slug} className="flex items-center gap-2">
                  <Link
                    href={`/tratamientos/${link.slug}`}
                    className="text-accent-600 hover:text-primary-700 underline underline-offset-4 decoration-accent-200 hover:decoration-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                  {i < popularLinks.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-accent-300" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats counter floating bar */}
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-accent-200/50 justify-between items-center text-center gap-6 sm:gap-0">
            <div className="flex-1 w-full px-4">
              <div className="flex items-center justify-center gap-2 text-primary-600 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <AnimatedCounter target={stats.prices} suffix="+" />
              <p className="mt-1 text-sm font-medium text-accent-500">Precios indexados</p>
            </div>
            <div className="flex-1 w-full px-4 pt-6 sm:pt-0">
               <div className="flex items-center justify-center gap-2 text-primary-600 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <AnimatedCounter target={stats.sources} suffix="+" />
              <p className="mt-1 text-sm font-medium text-accent-500">Fuentes analizadas</p>
            </div>
            <div className="flex-1 w-full px-4 pt-6 sm:pt-0">
               <div className="flex items-center justify-center gap-2 text-primary-600 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <AnimatedCounter target={stats.cities} />
              <p className="mt-1 text-sm font-medium text-accent-500">Ciudades cubiertas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Source Ticker ── */}
      <section className="py-10 border-y border-accent-200/50 bg-white">
        <div className="text-center mb-6">
          <p className="text-sm font-bold uppercase tracking-widest text-accent-400">Datos públicos extraídos de</p>
        </div>
        <SourceTicker
          sources={[
            "Sanitas",
            "Adeslas",
            "Cigna",
            "Vitaldent",
            "Caser",
            "Generali",
            "AXA",
            "Mapfre",
            "Clínicas Independientes"
          ]}
        />
      </section>

      {/* ── Popular Treatments ── */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-600 mb-4">
            Los más consultados
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-accent-950 sm:text-4xl text-balance">
            Tarifas de referencia en España
          </h2>
          <p className="mt-4 text-lg text-accent-500 text-pretty leading-relaxed">
            Hemos analizado miles de tarifas para mostrarte exactamente 
            lo que deberías estar pagando. Ni un euro de más.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topTreatments.map((t) => (
            <Link
              key={t.treatmentSlug}
              href={`/tratamientos/${t.treatmentSlug}`}
              className="group relative overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block press-scale border border-accent-100 hover:border-primary-200"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                <div className="bg-primary-50 w-10 h-10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>

              <p className="text-sm font-bold uppercase tracking-wider text-accent-400 group-hover:text-primary-600 transition-colors">
                Tratamiento
              </p>
              <h3 className="mt-2 text-xl font-bold text-accent-900 group-hover:text-primary-700 transition-colors line-clamp-1">
                {t.treatmentName}
              </h3>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-accent-950 tabular-nums">
                  {formatPrice(Math.round(Number(t.avg)))}
                </span>
                <span className="text-sm font-medium text-accent-400">precio medio</span>
              </div>
              
              <div className="mt-8">
                <PriceRangeBar
                  min={Number(t.min)}
                  max={Number(t.max)}
                  avg={Math.round(Number(t.avg))}
                  size="sm"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-sm font-medium">
                <span className="text-primary-600 tabular-nums bg-primary-50 px-2 py-0.5 rounded-md">
                  {formatPrice(Number(t.min))}
                </span>
                <span className="text-accent-400 bg-accent-50 px-2 py-0.5 rounded-full text-xs">
                  {Number(t.count)} fuentes
                </span>
                <span className="text-accent-600 tabular-nums bg-accent-50 px-2 py-0.5 rounded-md">
                  {formatPrice(Number(t.max))}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/tratamientos"
            className="group inline-flex items-center gap-2 rounded-2xl bg-accent-950 px-8 py-4 text-sm font-bold text-white hover:bg-accent-800 transition-all press-scale shadow-lg hover:shadow-xl"
          >
            Ver catálogo completo ({treatmentsWithPrices.length} tratamientos)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Insurance Savings Split Screen ── */}
      <section className="bg-accent-950 border-y border-transparent relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-mesh-gradient-dark opacity-100" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Datos Reales de Aseguradoras
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
                El seguro dental reduce tu factura hasta un <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-teal-200">50%</span>
              </h2>
              
              <p className="text-lg text-accent-300 text-pretty leading-relaxed">
                Las aseguradoras negocian precios máximos estrictos con su red de clínicas.
                Hemos extraído y cruzado las tarifas de Sanitas, Adeslas, Cigna y más para mostrarte
                exactamente cuánto dinero ahorras con una póliza.
              </p>
              
              <Link
                href="/seguros-dentales"
                className="inline-flex items-center gap-2 text-base font-bold text-primary-400 hover:text-primary-300 transition-colors group"
              >
                Comparar todas las aseguradoras
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Savings examples - Glass cards on dark */}
            <div className="space-y-4">
              {[
                { name: "Implante dental completo", without: 1550, with: 980 },
                { name: "Corona de zirconio", without: 600, with: 350 },
                { name: "Endodoncia multirradicular", without: 280, with: 145 },
              ].map((item, i) => {
                const savings = Math.round(
                  ((item.without - item.with) / item.without) * 100
                );
                return (
                  <div
                    key={item.name}
                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 hover:bg-white/10 transition-all duration-300"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-base font-bold text-white group-hover:text-primary-200 transition-colors">
                        {item.name}
                      </p>
                      <span className="rounded-full bg-primary-500/20 border border-primary-500/30 px-3 py-1.5 text-xs font-bold text-primary-400">
                        Ahorras {savings}%
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6 pt-2">
                       <div className="flex items-end gap-2">
                         <span className="text-4xl font-extrabold text-white tabular-nums leading-none">
                           {formatPrice(item.with)}
                         </span>
                         <span className="text-sm font-medium text-primary-400 mb-1">
                           con seguro
                         </span>
                       </div>
                       <div className="flex items-center gap-2 mb-1 opacity-60">
                         <span className="text-lg text-accent-400 line-through tabular-nums decoration-accent-500">
                           {formatPrice(item.without)}
                         </span>
                         <span className="text-xs text-accent-400">sin seguro</span>
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cities ── */}
      <section className="border-t border-accent-200/50 bg-accent-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-accent-950 sm:text-4xl">
                Impacto geográfico en los precios
              </h2>
              <p className="mt-4 text-lg text-accent-500">
                Tu código postal determina lo que pagas. Las clínicas en Zona A (Ej. Andalucía) 
                tienen tarifas significativamente inferiores a las de Zona B (Ej. Madrid o Cataluña).
              </p>
            </div>
            <Link
              href="/ciudades"
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-white border border-accent-200 px-6 py-3.5 text-sm font-bold text-accent-900 shadow-sm hover:bg-accent-50 transition-all press-scale"
            >
              Ver las {cities.length} ciudades
            </Link>
          </div>

          <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/ciudades/${city.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-accent-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block press-scale"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-100 text-lg font-bold text-accent-500 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                  {city.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-accent-900 group-hover:text-primary-700 transition-colors truncate">
                    {city.name}
                  </p>
                  <p className="text-xs font-medium text-accent-400 mt-0.5 truncate">{city.community}</p>
                </div>
                <span
                  className={`shrink-0 inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-bold border ${
                    city.zone === "A"
                      ? "bg-primary-50 text-primary-700 border-primary-200/50"
                      : "bg-accent-50 text-accent-600 border-accent-200/50"
                  }`}
                  title={`Zona de tarificación ${city.zone}`}
                >
                  Zona {city.zone}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              href="/ciudades"
              className="flex items-center justify-center w-full rounded-xl bg-white border border-accent-200 px-6 py-4 text-sm font-bold text-accent-900 shadow-sm hover:bg-accent-50 press-scale"
            >
              Ver las {cities.length} ciudades disponibles
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA (Vibrant) ── */}
      <section className="border-t border-accent-200/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600" />
        <div className="absolute inset-0 bg-mesh-gradient opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-5xl text-balance leading-tight">
              La transparencia empieza por ti. <br/>¿Cuánto te ha costado el dentista?
            </h2>
            <p className="mt-6 text-xl text-primary-100 text-pretty leading-relaxed">
              Sube el precio que has pagado. Es 100% anónimo y ayuda a evitar que 
              otros pacientes paguen sobrecostes por el mismo tratamiento médico.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/reportar-precio"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-bold text-primary-700 hover:bg-primary-50 hover:scale-105 transition-all press-scale shadow-[0_8px_30px_rgba(255,255,255,0.3)]"
              >
                Añadir mi factura (Anónimo)
              </Link>
              <Link
                href="/comparar"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-primary-400/50 bg-primary-700/30 backdrop-blur-md px-8 py-4 text-base font-bold text-white hover:bg-primary-700/50 hover:border-primary-400 transition-all press-scale"
              >
                Seguir comparando
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="bg-white px-4 py-10 border-t border-accent-100">
        <div className="mx-auto max-w-4xl flex gap-4 p-4 rounded-xl bg-accent-50/50 border border-accent-100">
          <svg className="w-5 h-5 shrink-0 text-accent-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-xs font-medium text-accent-500 leading-relaxed text-pretty">
            Los precios mostrados son orientativos y se derivan de datos
            públicos de aseguradoras, cadenas dentales y clínicas. El precio final de cualquier tratamiento depende intrínsecamente del
            diagnóstico clínico individualizado del profesional médico. Solicita siempre un
            presupuesto certificado antes de iniciar cualquier procedimiento.
            Valores mostrados con IVA incluido salvo indicación de la fuente.
          </p>
        </div>
      </section>
    </>
  );
}
