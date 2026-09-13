export const apiVersion = "2026-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// The site runs perfectly well without a Sanity project configured — see
// src/lib/data.ts, which falls back to src/lib/sample-data.ts whenever
// `projectId` is unset. Set NEXT_PUBLIC_SANITY_PROJECT_ID (and run the Studio
// at /studio) once you're ready to manage real project content.
export const isSanityConfigured = Boolean(projectId);
