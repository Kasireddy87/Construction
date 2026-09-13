import type { Metadata } from "next";
import Image from "next/image";

import { getCompanyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Our story, milestones and the team behind every project.",
};

export default async function AboutPage() {
  const company = await getCompanyInfo();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-accent">About {company.name}</p>
      <h1 className="mt-1 font-heading text-4xl font-bold">{company.aboutTitle}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{company.aboutBody}</p>

      <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-secondary/40 p-8 sm:grid-cols-4">
        {company.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-2xl">
        <Image src={company.logoUrl} alt={company.name} fill className="object-cover" />
      </div>

      <div className="mt-16">
        <h2 className="font-heading text-2xl font-bold">Our Offices</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {company.offices.map((office) => (
            <div key={office.label} className="rounded-xl border border-border p-5">
              <p className="font-semibold">{office.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{office.address}</p>
              <p className="mt-2 text-sm">{office.phone}</p>
              <p className="text-sm">{office.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
