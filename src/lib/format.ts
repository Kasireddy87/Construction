/** Formats a rupee amount the way Indian real-estate listings conventionally do (e.g. ₹85.00 L, ₹2.10 Cr). */
export function formatInrCompact(amount: number): string {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatInr(amount: number): string {
  return amount.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

export function formatDate(iso?: string): string {
  if (!iso) return "TBD";
  return new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "long" });
}

export function formatStatus(status: string): string {
  return status
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatSqft(n: number): string {
  return `${n.toLocaleString("en-IN")} sq.ft`;
}
