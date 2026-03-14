export function formatPrice(price: number | string | null | undefined): string {
  if (price == null) return "—";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "—";
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatPriceRange(min: number | null, max: number | null): string {
  if (min == null && max == null) return "Consultar";
  if (min != null && max != null) {
    if (min === max) return formatPrice(min);
    return `${formatPrice(min)} - ${formatPrice(max)}`;
  }
  if (min != null) return `desde ${formatPrice(min)}`;
  return `hasta ${formatPrice(max)}`;
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("es-ES").format(num);
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${Math.round(value)}%`;
}
