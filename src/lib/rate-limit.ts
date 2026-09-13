// Minimal in-memory rate limiter for API routes. Good enough for a single
// Vercel instance / low-traffic marketing site; swap for Upstash Redis if you
// scale to multiple regions/instances.

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > limit;
}
