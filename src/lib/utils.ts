export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(value);
}

export function clampText(text: string, max = 140) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}
