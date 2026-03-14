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
    <div className="w-full max-w-2xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
        {/* Treatment input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-zinc-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder={`ej: ${PLACEHOLDER_EXAMPLES[placeholderIndex]}`}
            value={treatmentQuery}
            onChange={(e) => {
              setTreatmentQuery(e.target.value);
              setSelectedTreatment(null);
              setShowTreatments(true);
            }}
            onFocus={() => setShowTreatments(true)}
            onBlur={() => setTimeout(() => setShowTreatments(false), 200)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl sm:rounded-r-none border border-zinc-200 bg-white pl-10 pr-4 py-3.5 text-zinc-900 placeholder-zinc-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
          />
          {showTreatments && filteredTreatments.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full rounded-xl border border-zinc-200/60 bg-white shadow-elevated max-h-64 overflow-auto">
              {filteredTreatments.map((t) => (
                <li key={t.slug}>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSelectedTreatment(t);
                      setTreatmentQuery(t.name);
                      setShowTreatments(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    <span className="font-medium">{t.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* City input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-zinc-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Ciudad (opcional)"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setSelectedCity(null);
              setShowCities(true);
            }}
            onFocus={() => setShowCities(true)}
            onBlur={() => setTimeout(() => setShowCities(false), 200)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl sm:rounded-none sm:border-l-0 border border-zinc-200 bg-white pl-10 pr-4 py-3.5 text-zinc-900 placeholder-zinc-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
          />
          {showCities && filteredCities.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full rounded-xl border border-zinc-200/60 bg-white shadow-elevated max-h-64 overflow-auto">
              {filteredCities.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSelectedCity(c);
                      setCityQuery(c.name);
                      setShowCities(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
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
          className="rounded-xl sm:rounded-l-none bg-zinc-900 px-6 py-3.5 font-medium text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all press-scale whitespace-nowrap"
        >
          Ver precios
        </button>
      </div>
    </div>
  );
}
