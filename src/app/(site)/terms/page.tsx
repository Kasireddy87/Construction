import type { Metadata } from "next";

import { getCompanyInfo } from "@/lib/data";

export const metadata: Metadata = { title: "Terms of Use" };

export default async function TermsPage() {
  const company = await getCompanyInfo();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

      <div className="prose prose-neutral mt-8 max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          This website is published by {company.name} for informational purposes only. Project layouts,
          renders, floor plans, amenities and pricing shown here are indicative and subject to change without
          notice; the final Agreement for Sale and RERA-registered documents govern all transactions.
        </p>
        <p>
          Images marked as renders/elevations are artistic impressions and may differ from the final
          construction. Areas quoted are approximate and subject to the tolerance permitted under applicable
          law.
        </p>
        <p>
          By submitting an enquiry, site-visit or brochure-download form you consent to being contacted by our
          sales team by phone, email or WhatsApp regarding the project(s) you enquired about.
        </p>
        <p>For queries about these terms, contact {company.email}.</p>
      </div>
    </div>
  );
}
