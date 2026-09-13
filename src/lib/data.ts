import "server-only";

import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  allProjectsQuery,
  allProjectSlugsQuery,
  companyInfoQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  testimonialsQuery,
} from "@/sanity/queries";
import {
  companyInfo as sampleCompanyInfo,
  getProjectBySlug as sampleGetProjectBySlug,
  projects as sampleProjects,
  testimonials as sampleTestimonials,
} from "@/lib/sample-data";
import type { CompanyInfo, Project, Testimonial } from "@/types/project";

// ---------------------------------------------------------------------------
// Single data-access layer used by every page/component. Nothing outside
// this file (and src/sanity, src/lib/sample-data.ts) should know or care
// whether content is coming from Sanity or the local sample data — that
// makes wiring up the real CMS later a one-file change.
//
// Behavior: if NEXT_PUBLIC_SANITY_PROJECT_ID is set, fetch from Sanity; if
// the fetch fails or the CMS has no content yet, fall back to sample data so
// the site never breaks.
// ---------------------------------------------------------------------------

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (err) {
    console.error("[sanity] fetch failed, falling back to sample data:", err);
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  if (isSanityConfigured) {
    const data = await safeFetch<Project[]>(allProjectsQuery);
    if (data && data.length > 0) return data;
  }
  return [...sampleProjects].sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (isSanityConfigured) {
    const data = await safeFetch<Project[]>(featuredProjectsQuery);
    if (data && data.length > 0) return data;
  }
  return sampleProjects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (isSanityConfigured) {
    const data = await safeFetch<Project>(projectBySlugQuery, { slug });
    if (data) return data;
  }
  return sampleGetProjectBySlug(slug);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    const data = await safeFetch<{ slug: string }[]>(allProjectSlugsQuery);
    if (data && data.length > 0) return data.map((d) => d.slug);
  }
  return sampleProjects.map((p) => p.slug);
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  if (isSanityConfigured) {
    const data = await safeFetch<CompanyInfo>(companyInfoQuery);
    if (data) return data;
  }
  return sampleCompanyInfo;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (isSanityConfigured) {
    const data = await safeFetch<Testimonial[]>(testimonialsQuery);
    if (data && data.length > 0) return data;
  }
  return sampleTestimonials;
}

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  const all = await getAllProjects();
  return all
    .filter((p) => p.slug !== project.slug && (p.city === project.city || p.projectType === project.projectType))
    .slice(0, limit);
}
