"use client";

import { useState, useMemo } from "react";
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

export function TreatmentSearch({ treatments, cities }: TreatmentSearchProps) {
  const router = useRouter();
  const [treatmentQuery, setTreatmentQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [showTreatments, setShowTreatments] = useState(false);
  const [showCities, setShowCities] = useState(false);

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

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Treatment input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tratamiento (ej: implante dental)"
            value={treatmentQuery}
            onChange={(e) => {
              setTreatmentQuery(e.target.value);
              setSelectedTreatment(null);
              setShowTreatments(true);
            }}
            onFocus={() => setShowTreatments(true)}
            onBlur={() => setTimeout(() => setShowTreatments(false), 200)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          {showTreatments && filteredTreatments.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto">
              {filteredTreatments.map((t) => (
                <li key={t.slug}>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSelectedTreatment(t);
                      setTreatmentQuery(t.name);
                      setShowTreatments(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* City input */}
        <div className="relative flex-1">
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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          {showCities && filteredCities.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto">
              {filteredCities.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSelectedCity(c);
                      setCityQuery(c.name);
                      setShowCities(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors"
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
          className="rounded-lg bg-primary-600 px-8 py-3 font-medium text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          Comparar precios
        </button>
      </div>
    </div>
  );
}
