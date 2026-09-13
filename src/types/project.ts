// Domain types for the marketing site.
// These mirror the Sanity content schema 1:1 (see src/sanity/schemas) so that
// swapping the data layer in src/lib/data.ts from sample data to live Sanity
// queries requires no changes to any component.

export type ProjectStatus =
  | "new-launch"
  | "under-construction"
  | "ready-to-move"
  | "completed";

export type ProjectType = "apartment" | "villa" | "plot" | "commercial";

export type GalleryCategory =
  | "elevation"
  | "amenity"
  | "interior"
  | "construction-progress";

export interface GalleryImage {
  url: string;
  caption?: string;
  category: GalleryCategory;
  date?: string; // ISO date, used for construction-progress entries
}

export interface UnitVariant {
  label: string; // e.g. "Type A"
  carpetAreaSqft: number;
  builtUpAreaSqft: number;
  price?: number;
}

export interface UnitPlan {
  configLabel: string; // "2 BHK", "3 BHK", "Shop", etc.
  carpetAreaSqft: number;
  builtUpAreaSqft: number;
  planImage: string;
  facing?: string;
  towerInfo?: string;
  variants?: UnitVariant[];
}

export interface Amenity {
  name: string;
  icon: string; // lucide icon name
  category: string;
}

export interface ConnectivityItem {
  label: string;
  category: "transit" | "education" | "healthcare" | "retail" | "business" | "other";
  distanceKm?: number;
  timeMin?: number;
}

export interface PricingRow {
  config: string;
  carpetAreaSqft: number;
  price: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Geo {
  lat: number;
  lng: number;
}

export interface ProjectSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  projectType: ProjectType;
  city: string;
  locality: string;
  address: string;
  geo: Geo;
  reraNumber?: string;
  possessionDate?: string; // ISO date
  featured: boolean;
  order: number;
  heroImage: string;
  heroVideoUrl?: string;
  gallery: GalleryImage[];
  walkthroughVideoUrl?: string;
  tourEmbedUrl?: string;
  overview: string; // rendered as paragraphs; portable text in real CMS
  highlights: string[];
  keyFacts: { label: string; value: string }[];
  configs: UnitPlan[];
  masterPlanImage?: string;
  sitePlanImage?: string;
  amenities: Amenity[];
  connectivity: ConnectivityItem[];
  priceRange: { min: number; max: number; perSqft?: number };
  pricingTable: PricingRow[];
  constructionTimeline?: { label: string; date: string; complete: boolean }[];
  brochureUrl?: string;
  faqs: FaqItem[];
  seo?: ProjectSeo;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Office {
  label: string;
  address: string;
  phone: string;
  email: string;
}

export interface CompanyInfo {
  name: string;
  logoUrl: string;
  aboutTitle: string;
  aboutBody: string;
  stats: Stat[];
  offices: Office[];
  whatsappNumber: string; // digits only, with country code, e.g. "919876543210"
  phone: string;
  email: string;
  socials: { label: string; url: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  photoUrl?: string;
  projectSlug?: string;
}
