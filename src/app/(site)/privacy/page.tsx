import type { Metadata } from "next";

import { getCompanyInfo } from "@/lib/data";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  const company = await getCompanyInfo();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

      <div className="prose prose-neutral mt-8 max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          {company.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects the information you submit through our
          enquiry, site-visit and brochure-download forms — name, phone number, email address and any message
          you include — solely to respond to your enquiry and share relevant project information.
        </p>
        <p>
          We do not sell your personal data. Information may be shared with our internal sales team and, where
          necessary, our home-loan banking partners at your request. We retain enquiry data for as long as
          needed to service your request and for our internal records.
        </p>
        <p>
          This site uses first-party analytics to understand which projects visitors are interested in
          (page views, clicks on WhatsApp/Call/Brochure) — no data is sold to third-party advertisers.
        </p>
        <p>
          To request access to, correction of, or deletion of your data, contact us at {company.email}.
        </p>
      </div>
    </div>
  );
}
