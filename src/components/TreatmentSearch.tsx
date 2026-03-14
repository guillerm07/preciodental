"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface TreatmentOption {
  name: string;
  slug: string;
  category: string;
}

interface CityOption {
  name: string;
  slug: string;
}

interface TreatmentSearchProps {
  treatments: TreatmentOption[];
  cities: CityOption[];
}

const PLACEHOLDER_EXAMPLES = [
  "Implante dental",
  "Ortodoncia invisible",
  "Blanqueamiento dental",
  "Limpieza dental",
  "Corona de zirconio",
];

export function TreatmentSearch({ treatments, cities }: TreatmentSearchProps) {
  const router = useRouter();
  const [treatmentQuery, setTreatmentQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [showTreatments, setShowTreatments] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDER_EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredTreatments = useMemo(() => {
    if (!treatmentQuery) return treatments.slice(0, 8);
    const q = treatmentQuery.toLowerCase();
    return treatments.filter((t) => t.name.toLowerCase().includes(q)).slice(0, 8);
  }, [treatmentQuery, treatments]);

  const filteredCities = useMemo(() => {
    if (!cityQuery) return cities.slice(0, 8);
    const q = cityQuery.toLowerCase();
    return cities.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 8);
  }, [cityQuery, cities]);

  function handleSearch() {
    if (selectedTreatment && selectedCity) {
      router.push(`/tratamientos/${selectedTreatment.slug}/${selectedCity.slug}`);
    } else if (selectedTreatment) {
      router.push(`/tratamientos/${selectedTreatment.slug}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className="w-full max-w-3xl mx-auto relative z-20">
      {/* Glow behind the search bar */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-teal-300 to-accent-300 rounded-[28px] blur-lg opacity-30 animate-pulse" />
      
      <div className="relative flex flex-col gap-2 sm:flex-row sm:gap-0 p-2 glass-panel rounded-3xl">
        {/* Treatment input */}
        <div className="relative flex-[1.5]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
            <div className="bg-primary-50 p-1.5 rounded-lg text-primary-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder={`¿Qué buscas? ej: ${PLACEHOLDER_EXAMPLES[placeholderIndex]}`}
            value={treatmentQuery}
            onChange={(e) => {
              setTreatmentQuery(e.target.value);
              setSelectedTreatment(null);
              setShowTreatments(true);
            }}
            onFocus={() => setShowTreatments(true)}
            onBlur={() => setTimeout(() => setShowTreatments(false), 200)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-2xl h-16 sm:rounded-r-none bg-transparent pl-16 pr-4 text-base font-medium text-accent-900 placeholder-accent-400 focus:outline-none focus:bg-white/50 transition-all"
          />
          {/* Vertical divider on desktop */}
          <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-accent-200" />
          
          {showTreatments && filteredTreatments.length > 0 && (
            <ul className="absolute z-20 mt-3 w-full rounded-2xl border border-white bg-white/95 backdrop-blur-md shadow-2xl max-h-[320px] overflow-auto py-2 animate-in fade-in slide-in-from-top-2">
              <li className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent-400">Tratamientos sugeridos</li>
              {filteredTreatments.map((t) => (
                <li key={t.slug}>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSelectedTreatment(t);
                      setTreatmentQuery(t.name);
                      setShowTreatments(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-accent-700 hover:bg-primary-50/80 hover:text-primary-700 transition-colors flex items-center gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <span className="font-semibold block text-accent-900">{t.name}</span>
                      <span className="text-xs text-accent-400">{t.category}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* City input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 sm:pl-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-accent-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="En España (O tu ciudad)"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setSelectedCity(null);
              setShowCities(true);
            }}
            onFocus={() => setShowCities(true)}
            onBlur={() => setTimeout(() => setShowCities(false), 200)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-2xl h-16 sm:rounded-none bg-transparent pl-14 pr-4 text-base font-medium text-accent-900 placeholder-accent-400 focus:outline-none focus:bg-white/50 transition-all"
          />
          {showCities && filteredCities.length > 0 && (
            <ul className="absolute z-20 mt-3 w-full rounded-2xl border border-white bg-white/95 backdrop-blur-md shadow-2xl max-h-[320px] overflow-auto py-2 animate-in fade-in slide-in-from-top-2">
              <li className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent-400">Ciudades</li>
              {filteredCities.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSelectedCity(c);
                      setCityQuery(c.name);
                      setShowCities(false);
                    }}
                    className="w-full px-4 py-3 test-left text-sm text-accent-700 font-medium hover:bg-primary-50/80 hover:text-primary-700 transition-colors flex items-center gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-accent-500">{c.name.charAt(0)}</span>
                    </div>
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={!selectedTreatment}
          className="rounded-2xl bg-primary-600 px-8 py-0 h-16 font-bold text-white shadow-[0_8px_16px_rgba(20,184,166,0.3)] hover:bg-primary-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all press-scale whitespace-nowrap overflow-hidden relative group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full skew-x-[30deg] group-hover:animate-[shimmer_2s_infinite]" />
          <span className="relative flex items-center gap-2">
            Ver precios
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
