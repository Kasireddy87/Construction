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

/**
 * The single source of truth for how a project's price shows up anywhere on
 * the site (card, hero, sticky sidebar). Real disclosed prices only appear
 * when `priceConfirmed` is true — everything else reads "Price on Quote"
 * rather than showing an internal cost estimate as if it were a real price.
 *
 * For apartment/flat projects, only the per-sq.ft rate is shown — never the
 * total amount for a specific unit.
 */
export function formatPriceDisplay(project: {
  priceConfirmed?: boolean;
  projectType?: string;
  priceRange: { min: number; max: number; negotiable?: boolean; perSqft?: number };
}): string {
  if (!project.priceConfirmed) return "Price on Quote";
  if (project.projectType === "apartment") {
    return project.priceRange.perSqft ? `${formatInr(project.priceRange.perSqft)} / sq.ft` : "Price on Quote";
  }
  const price = formatInrCompact(project.priceRange.min);
  return project.priceRange.negotiable ? `${price} (Negotiable)` : price;
}

/**
 * Per-row price display for PricingTable — same apartment-hides-total rule
 * as formatPriceDisplay. For apartments this shows the project's actual
 * quoted per-sq.ft rate (never derived from row.price ÷ carpet area, which
 * would be wrong whenever the total includes flat charges like an amenities
 * fee, or carpet/built-up area don't match what the rate was quoted against).
 */
export function formatRowPrice(row: { price: number }, projectType?: string, perSqft?: number): string {
  if (projectType === "apartment") {
    return perSqft ? `${formatInr(perSqft)} / sq.ft` : "On Quote";
  }
  return formatInrCompact(row.price);
}
