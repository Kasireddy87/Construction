import { groq } from "next-sanity";

// Projected directly into the shape of src/types/project.ts so callers never
// see raw Sanity image refs — urlFor() is resolved once, here.
const projectProjection = groq`{
  "id": _id,
  "slug": slug.current,
  name,
  tagline,
  status,
  projectType,
  city,
  locality,
  address,
  "geo": { "lat": geo.lat, "lng": geo.lng },
  reraNumber,
  possessionDate,
  featured,
  order,
  "heroImage": heroImage.asset->url,
  heroVideoUrl,
  "gallery": gallery[]{
    "url": image.asset->url,
    caption,
    category,
    date
  },
  walkthroughVideoUrl,
  tourEmbedUrl,
  "overview": pt::text(overview),
  highlights,
  keyFacts,
  "configs": configs[]{
    configLabel,
    carpetAreaSqft,
    builtUpAreaSqft,
    "planImage": planImage.asset->url,
    facing,
    towerInfo,
    variants
  },
  "masterPlanImage": masterPlanImage.asset->url,
  "sitePlanImage": sitePlanImage.asset->url,
  "amenities": amenities[]->{ name, icon, category },
  connectivity,
  priceRange,
  pricingTable,
  constructionTimeline,
  "brochureUrl": brochure.asset->url,
  faqs,
  "seo": { metaTitle, metaDescription, "ogImage": ogImage.asset->url }
}`;

export const allProjectsQuery = groq`*[_type == "project"] | order(order asc) ${projectProjection}`;

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc) ${projectProjection}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] ${projectProjection}`;

export const allProjectSlugsQuery = groq`*[_type == "project"]{"slug": slug.current}`;

export const companyInfoQuery = groq`*[_type == "companyInfo"][0]{
  name,
  "logoUrl": logo.asset->url,
  aboutTitle,
  aboutBody,
  stats,
  offices,
  whatsappNumber,
  phone,
  email,
  socials
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"]{
  "id": _id,
  name,
  role,
  quote,
  "photoUrl": photo.asset->url,
  "projectSlug": project->slug.current
}`;
