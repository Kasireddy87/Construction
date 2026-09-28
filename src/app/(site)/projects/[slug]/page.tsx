import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, LandPlot } from "lucide-react";

import { AmenitiesGrid } from "@/components/project/amenities-grid";
import { FaqAccordion } from "@/components/project/faq-accordion";
import { Gallery } from "@/components/project/gallery";
import { Lightbox } from "@/components/project/lightbox";
import { LocationMap } from "@/components/project/location-map";
import { PlanTabs } from "@/components/project/plan-tabs";
import { PricingTable } from "@/components/project/pricing-table";
import { ProgressTimeline } from "@/components/project/progress-timeline";
import { RelatedProjects } from "@/components/project/related-projects";
import { SectionNav } from "@/components/project/section-nav";
import { StickyEnquireBar } from "@/components/project/sticky-enquire-bar";
import { ViewTracker } from "@/components/project/view-tracker";
import { StatusPill } from "@/components/site/status-pill";
import { formatDate, formatPriceDisplay } from "@/lib/format";
import { getAllProjectSlugs, getCompanyInfo, getProjectBySlug, getRelatedProjects } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.seo?.metaTitle || `${project.name} — ${project.locality}, ${project.city}`,
    description: project.seo?.metaDescription || project.tagline,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      url: `/projects/${project.slug}`,
      images: project.seo?.ogImage ? [project.seo.ogImage] : [project.heroImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, company] = await Promise.all([getProjectBySlug(slug), getCompanyInfo()]);
  if (!project) notFound();

  const related = await getRelatedProjects(project);
  const phoneDigits = company.whatsappNumber;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.name,
    description: project.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.city,
      streetAddress: project.address,
    },
    geo: { "@type": "GeoCoordinates", latitude: project.geo.lat, longitude: project.geo.lng },
    image: project.heroImage,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ViewTracker slug={project.slug} />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full">
        <Image src={project.heroImage} alt={project.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 text-white sm:px-6 lg:px-8">
          <StatusPill status={project.status} />
          <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">{project.name}</h1>
          <p className="mt-2 text-white/85">{project.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <LandPlot className="size-4" /> {project.locality}, {project.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" /> Possession {formatDate(project.possessionDate)}
            </span>
            {project.reraNumber && <span>RERA: {project.reraNumber}</span>}
            <span className="font-semibold text-white">{formatPriceDisplay(project)}</span>
          </div>
        </div>
      </section>

      <SectionNav />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="min-w-0 space-y-16">
          {/* Overview */}
          <section id="overview" className="scroll-mt-32 space-y-6">
            <h2 className="font-heading text-2xl font-bold">Overview</h2>
            <p className="text-muted-foreground">{project.overview}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
              {project.keyFacts.map((f) => (
                <div key={f.label}>
                  <p className="text-xs text-muted-foreground">{f.label}</p>
                  <p className="mt-0.5 text-sm font-semibold">{f.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Plans */}
          <section id="plans" className="scroll-mt-32 space-y-6">
            <h2 className="font-heading text-2xl font-bold">Floor Plans</h2>
            <PlanTabs configs={project.configs} projectSlug={project.slug} />
            {(project.masterPlanImage || project.sitePlanImage) && (
              <div className="grid gap-6 pt-4 sm:grid-cols-2">
                {project.masterPlanImage && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Master Plan</p>
                    <Lightbox src={project.masterPlanImage} alt="Master plan" aspect="aspect-[4/3]" imgClassName="object-contain bg-muted" />
                  </div>
                )}
                {project.sitePlanImage && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Site / Layout Plan</p>
                    <Lightbox src={project.sitePlanImage} alt="Site plan" aspect="aspect-[4/3]" imgClassName="object-contain bg-muted" />
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Gallery */}
          <section id="gallery" className="scroll-mt-32 space-y-6">
            <h2 className="font-heading text-2xl font-bold">Elevation & Gallery</h2>
            <Gallery
              images={project.gallery}
              walkthroughVideoUrl={project.walkthroughVideoUrl}
              tourEmbedUrl={project.tourEmbedUrl}
            />
          </section>

          {/* Amenities */}
          <section id="amenities" className="scroll-mt-32 space-y-6">
            <h2 className="font-heading text-2xl font-bold">Amenities</h2>
            <AmenitiesGrid amenities={project.amenities} />
          </section>

          {/* Location */}
          <section id="location" className="scroll-mt-32 space-y-6">
            <h2 className="font-heading text-2xl font-bold">Location & Connectivity</h2>
            <LocationMap geo={project.geo} address={project.address} connectivity={project.connectivity} />
          </section>

          {/* Pricing */}
          <section id="pricing" className="scroll-mt-32 space-y-8">
            <h2 className="font-heading text-2xl font-bold">Pricing & Availability</h2>
            {!project.priceConfirmed && (
              <p className="text-sm text-muted-foreground">
                Pricing depends on configuration, finishes and current material costs — enquire or book a
                site visit for a detailed quote.
              </p>
            )}
            {project.projectType === "apartment" ? (
              // Apartments have genuinely distinct, separately-sold flat types — show each one's rate.
              <PricingTable
                rows={project.pricingTable}
                priceConfirmed={project.priceConfirmed}
                projectType={project.projectType}
                perSqft={project.priceRange.perSqft}
              />
            ) : (
              // A single house is bought as one property — don't itemize a per-floor amount,
              // just point back to the overall price shown above.
              project.priceConfirmed && (
                <p className="text-sm text-muted-foreground">
                  The price above is for the complete property, all floors included.
                </p>
              )
            )}
            {project.constructionTimeline && (
              <div>
                <h3 className="mb-4 font-heading text-lg font-semibold">Construction Status</h3>
                <ProgressTimeline steps={project.constructionTimeline} />
              </div>
            )}
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-32 space-y-6">
            <h2 className="font-heading text-2xl font-bold">Frequently Asked Questions</h2>
            <FaqAccordion faqs={project.faqs} />
          </section>

          <RelatedProjects projects={related} />
        </div>

        <StickyEnquireBar project={project} phoneDigits={phoneDigits} />
      </div>
    </div>
  );
}
