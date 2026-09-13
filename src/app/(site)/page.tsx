import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/site/enquiry-dialog";
import { ProjectCard } from "@/components/site/project-card";
import { getAllProjects, getCompanyInfo, getFeaturedProjects, getTestimonials } from "@/lib/data";

export default async function HomePage() {
  const [featured, allProjects, company, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getAllProjects(),
    getCompanyInfo(),
    getTestimonials(),
  ]);

  const heroProject = featured[0] ?? allProjects[0];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-primary text-primary-foreground">
        {heroProject && (
          <Image
            src={heroProject.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {company.stats[0]?.value} Years · {company.stats[1]?.value} Projects Delivered
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Homes and spaces built to last a lifetime
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Explore {allProjects.length}+ residential and commercial projects across South India —
            floor plans, elevations, amenities and live availability, all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<Link href="/projects" />}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Explore Projects <ArrowRight className="size-4" />
            </Button>
            <EnquiryDialog
              trigger={
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white">
                  Talk to Sales
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {company.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-accent">Featured</p>
              <h2 className="mt-1 font-heading text-3xl font-bold">Flagship Projects</h2>
            </div>
            <Link href="/projects" className="flex items-center gap-1 text-sm font-medium hover:underline">
              View all projects <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* All projects preview */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-accent">Our Portfolio</p>
              <h2 className="mt-1 font-heading text-3xl font-bold">{allProjects.length} Projects Across South India</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allProjects.slice(0, 8).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button render={<Link href="/projects" />} size="lg" variant="outline">
              View All {allProjects.length} Projects <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-accent">About {company.name}</p>
            <h2 className="mt-1 font-heading text-3xl font-bold">{company.aboutTitle}</h2>
            <p className="mt-4 text-muted-foreground">{company.aboutBody}</p>
            <Button render={<Link href="/about" />} className="mt-6" variant="outline">
              Learn more about us <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src={company.logoUrl} alt={company.name} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-medium uppercase tracking-wide text-accent">Testimonials</p>
            <h2 className="mt-1 text-center font-heading text-3xl font-bold">What our homeowners say</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-2xl bg-white/5 p-6">
                  <Quote className="size-6 text-accent" />
                  <p className="mt-4 text-sm text-white/85">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3">
                    {t.photoUrl && (
                      <div className="relative size-10 overflow-hidden rounded-full">
                        <Image src={t.photoUrl} alt={t.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-white/60">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-accent px-6 py-14 text-center text-accent-foreground sm:px-16">
          <MapPin className="size-8" />
          <h2 className="max-w-xl font-heading text-3xl font-bold">Find the right home, in the right location</h2>
          <p className="max-w-lg text-accent-foreground/80">
            Book a site visit or speak with our sales team — we&apos;ll help you shortlist the project that fits your budget and city.
          </p>
          <EnquiryDialog
            source="site-visit"
            showSiteVisitFields
            title="Book a Site Visit"
            trigger={
              <Button size="lg" variant="secondary">
                Book a Site Visit
              </Button>
            }
          />
        </div>
      </section>
    </>
  );
}
