import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { EnquiryForm } from "@/components/site/enquiry-form";
import { getCompanyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach our sales team, or visit one of our offices.",
};

export default async function ContactPage() {
  const company = await getCompanyInfo();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-accent">Get in touch</p>
      <h1 className="mt-1 font-heading text-4xl font-bold">Contact Us</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Have a question about a project, pricing or a site visit? Send us a message and our sales team will
        get back within one business day.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <EnquiryForm source="contact" />
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent/15">
              <Phone className="size-5 text-accent-foreground" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Call us</p>
              <p className="font-medium">{company.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent/15">
              <Mail className="size-5 text-accent-foreground" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Email us</p>
              <p className="font-medium">{company.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            {company.offices.map((office) => (
              <div key={office.label} className="flex gap-3 border-t border-border pt-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent-foreground" />
                <div>
                  <p className="font-medium">{office.label}</p>
                  <p className="text-sm text-muted-foreground">{office.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {office.phone} · {office.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
