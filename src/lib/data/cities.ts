export interface CitySeed {
  name: string;
  slug: string;
  province: string;
  community: string;
  communitySlug: string;
  zone: "A" | "B";
  population: number;
  latitude: number;
  longitude: number;
}

export const CITIES: CitySeed[] = [
  // Zona B — Comunidad de Madrid
  { name: "Madrid", slug: "madrid", province: "Madrid", community: "Comunidad de Madrid", communitySlug: "comunidad-de-madrid", zone: "B", population: 3400000, latitude: 40.4168, longitude: -3.7038 },
  { name: "Alcalá de Henares", slug: "alcala-de-henares", province: "Madrid", community: "Comunidad de Madrid", communitySlug: "comunidad-de-madrid", zone: "B", population: 196000, latitude: 40.4819, longitude: -3.3635 },
  { name: "Móstoles", slug: "mostoles", province: "Madrid", community: "Comunidad de Madrid", communitySlug: "comunidad-de-madrid", zone: "B", population: 210000, latitude: 40.3223, longitude: -3.8651 },
  { name: "Getafe", slug: "getafe", province: "Madrid", community: "Comunidad de Madrid", communitySlug: "comunidad-de-madrid", zone: "B", population: 185000, latitude: 40.3088, longitude: -3.7328 },

  // Zona B — Cataluña
  { name: "Barcelona", slug: "barcelona", province: "Barcelona", community: "Cataluña", communitySlug: "cataluna", zone: "B", population: 1660000, latitude: 41.3851, longitude: 2.1734 },
  { name: "Hospitalet de Llobregat", slug: "hospitalet-de-llobregat", province: "Barcelona", community: "Cataluña", communitySlug: "cataluna", zone: "B", population: 264000, latitude: 41.3596, longitude: 2.0997 },
  { name: "Badalona", slug: "badalona", province: "Barcelona", community: "Cataluña", communitySlug: "cataluna", zone: "B", population: 223000, latitude: 41.4500, longitude: 2.2474 },
  { name: "Terrassa", slug: "terrassa", province: "Barcelona", community: "Cataluña", communitySlug: "cataluna", zone: "B", population: 223000, latitude: 41.5631, longitude: 2.0089 },
  { name: "Sabadell", slug: "sabadell", province: "Barcelona", community: "Cataluña", communitySlug: "cataluna", zone: "B", population: 215000, latitude: 41.5463, longitude: 2.1080 },
  { name: "Tarragona", slug: "tarragona", province: "Tarragona", community: "Cataluña", communitySlug: "cataluna", zone: "B", population: 135000, latitude: 41.1189, longitude: 1.2445 },
  { name: "Girona", slug: "girona", province: "Girona", community: "Cataluña", communitySlug: "cataluna", zone: "B", population: 103000, latitude: 41.9794, longitude: 2.8214 },
  { name: "Lleida", slug: "lleida", province: "Lleida", community: "Cataluña", communitySlug: "cataluna", zone: "B", population: 140000, latitude: 41.6176, longitude: 0.6200 },

  // Zona B — Comunitat Valenciana
  { name: "Valencia", slug: "valencia", province: "Valencia", community: "Comunitat Valenciana", communitySlug: "comunitat-valenciana", zone: "B", population: 800000, latitude: 39.4699, longitude: -0.3763 },
  { name: "Alicante", slug: "alicante", province: "Alicante", community: "Comunitat Valenciana", communitySlug: "comunitat-valenciana", zone: "B", population: 337000, latitude: 38.3452, longitude: -0.4810 },
  { name: "Elche", slug: "elche", province: "Alicante", community: "Comunitat Valenciana", communitySlug: "comunitat-valenciana", zone: "B", population: 234000, latitude: 38.2669, longitude: -0.6983 },
  { name: "Castellón de la Plana", slug: "castellon-de-la-plana", province: "Castellón", community: "Comunitat Valenciana", communitySlug: "comunitat-valenciana", zone: "B", population: 174000, latitude: 39.9864, longitude: -0.0513 },

  // Zona B — País Vasco
  { name: "Bilbao", slug: "bilbao", province: "Vizcaya", community: "País Vasco", communitySlug: "pais-vasco", zone: "B", population: 347000, latitude: 43.2630, longitude: -2.9350 },
  { name: "Vitoria-Gasteiz", slug: "vitoria-gasteiz", province: "Álava", community: "País Vasco", communitySlug: "pais-vasco", zone: "B", population: 253000, latitude: 42.8469, longitude: -2.6716 },
  { name: "San Sebastián", slug: "san-sebastian", province: "Guipúzcoa", community: "País Vasco", communitySlug: "pais-vasco", zone: "B", population: 187000, latitude: 43.3183, longitude: -1.9812 },

  // Zona B — Aragón
  { name: "Zaragoza", slug: "zaragoza", province: "Zaragoza", community: "Aragón", communitySlug: "aragon", zone: "B", population: 681000, latitude: 41.6488, longitude: -0.8891 },

  // Zona B — Illes Balears
  { name: "Palma de Mallorca", slug: "palma-de-mallorca", province: "Illes Balears", community: "Illes Balears", communitySlug: "illes-balears", zone: "B", population: 416000, latitude: 39.5696, longitude: 2.6502 },

  // Zona B — Navarra
  { name: "Pamplona", slug: "pamplona", province: "Navarra", community: "Comunidad Foral de Navarra", communitySlug: "comunidad-foral-de-navarra", zone: "B", population: 203000, latitude: 42.8125, longitude: -1.6458 },

  // Zona B — Cantabria
  { name: "Santander", slug: "santander", province: "Cantabria", community: "Cantabria", communitySlug: "cantabria", zone: "B", population: 172000, latitude: 43.4623, longitude: -3.8100 },

  // Zona B — Asturias
  { name: "Gijón", slug: "gijon", province: "Asturias", community: "Principado de Asturias", communitySlug: "principado-de-asturias", zone: "B", population: 270000, latitude: 43.5322, longitude: -5.6611 },
  { name: "Oviedo", slug: "oviedo", province: "Asturias", community: "Principado de Asturias", communitySlug: "principado-de-asturias", zone: "B", population: 220000, latitude: 43.3619, longitude: -5.8494 },

  // Zona B — Galicia
  { name: "Vigo", slug: "vigo", province: "Pontevedra", community: "Galicia", communitySlug: "galicia", zone: "B", population: 295000, latitude: 42.2406, longitude: -8.7207 },
  { name: "A Coruña", slug: "a-coruna", province: "A Coruña", community: "Galicia", communitySlug: "galicia", zone: "B", population: 245000, latitude: 43.3623, longitude: -8.4115 },
  { name: "Santiago de Compostela", slug: "santiago-de-compostela", province: "A Coruña", community: "Galicia", communitySlug: "galicia", zone: "B", population: 98000, latitude: 42.8782, longitude: -8.5448 },

  // Zona B — Castilla y León
  { name: "Valladolid", slug: "valladolid", province: "Valladolid", community: "Castilla y León", communitySlug: "castilla-y-leon", zone: "B", population: 298000, latitude: 41.6523, longitude: -4.7245 },
  { name: "Burgos", slug: "burgos", province: "Burgos", community: "Castilla y León", communitySlug: "castilla-y-leon", zone: "B", population: 176000, latitude: 42.3440, longitude: -3.6969 },
  { name: "Salamanca", slug: "salamanca", province: "Salamanca", community: "Castilla y León", communitySlug: "castilla-y-leon", zone: "B", population: 144000, latitude: 40.9701, longitude: -5.6635 },
  { name: "León", slug: "leon", province: "León", community: "Castilla y León", communitySlug: "castilla-y-leon", zone: "B", population: 124000, latitude: 42.5987, longitude: -5.5671 },

  // Zona B — La Rioja
  { name: "Logroño", slug: "logrono", province: "La Rioja", community: "La Rioja", communitySlug: "la-rioja", zone: "B", population: 152000, latitude: 42.4627, longitude: -2.4447 },

  // Zona A — Andalucía
  { name: "Sevilla", slug: "sevilla", province: "Sevilla", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 685000, latitude: 37.3891, longitude: -5.9845 },
  { name: "Málaga", slug: "malaga", province: "Málaga", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 578000, latitude: 36.7213, longitude: -4.4214 },
  { name: "Granada", slug: "granada", province: "Granada", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 232000, latitude: 37.1773, longitude: -3.5986 },
  { name: "Córdoba", slug: "cordoba", province: "Córdoba", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 325000, latitude: 37.8882, longitude: -4.7794 },
  { name: "Jerez de la Frontera", slug: "jerez-de-la-frontera", province: "Cádiz", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 212000, latitude: 36.6850, longitude: -6.1263 },
  { name: "Almería", slug: "almeria", province: "Almería", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 200000, latitude: 36.8340, longitude: -2.4637 },
  { name: "Huelva", slug: "huelva", province: "Huelva", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 145000, latitude: 37.2614, longitude: -6.9447 },
  { name: "Jaén", slug: "jaen", province: "Jaén", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 112000, latitude: 37.7796, longitude: -3.7849 },
  { name: "Cádiz", slug: "cadiz", province: "Cádiz", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 116000, latitude: 36.5271, longitude: -6.2886 },
  { name: "Marbella", slug: "marbella", province: "Málaga", community: "Andalucía", communitySlug: "andalucia", zone: "A", population: 147000, latitude: 36.5099, longitude: -4.8865 },

  // Zona A — Canarias
  { name: "Las Palmas de Gran Canaria", slug: "las-palmas-de-gran-canaria", province: "Las Palmas", community: "Canarias", communitySlug: "canarias", zone: "A", population: 379000, latitude: 28.1235, longitude: -15.4363 },
  { name: "Santa Cruz de Tenerife", slug: "santa-cruz-de-tenerife", province: "Santa Cruz de Tenerife", community: "Canarias", communitySlug: "canarias", zone: "A", population: 207000, latitude: 28.4636, longitude: -16.2518 },

  // Zona A — Región de Murcia
  { name: "Murcia", slug: "murcia", province: "Murcia", community: "Región de Murcia", communitySlug: "region-de-murcia", zone: "A", population: 460000, latitude: 37.9922, longitude: -1.1307 },
  { name: "Cartagena", slug: "cartagena", province: "Murcia", community: "Región de Murcia", communitySlug: "region-de-murcia", zone: "A", population: 216000, latitude: 37.6057, longitude: -0.9913 },

  // Zona A — Castilla-La Mancha
  { name: "Albacete", slug: "albacete", province: "Albacete", community: "Castilla-La Mancha", communitySlug: "castilla-la-mancha", zone: "A", population: 174000, latitude: 38.9942, longitude: -1.8585 },
  { name: "Toledo", slug: "toledo", province: "Toledo", community: "Castilla-La Mancha", communitySlug: "castilla-la-mancha", zone: "A", population: 85000, latitude: 39.8628, longitude: -4.0273 },
  { name: "Ciudad Real", slug: "ciudad-real", province: "Ciudad Real", community: "Castilla-La Mancha", communitySlug: "castilla-la-mancha", zone: "A", population: 75000, latitude: 38.9848, longitude: -3.9274 },

  // Zona A — Extremadura
  { name: "Badajoz", slug: "badajoz", province: "Badajoz", community: "Extremadura", communitySlug: "extremadura", zone: "A", population: 150000, latitude: 38.8794, longitude: -6.9707 },
  { name: "Cáceres", slug: "caceres", province: "Cáceres", community: "Extremadura", communitySlug: "extremadura", zone: "A", population: 96000, latitude: 39.4753, longitude: -6.3724 },
];
