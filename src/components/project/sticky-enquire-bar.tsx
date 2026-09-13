"use client";

import { Calendar, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrochureButton } from "@/components/project/brochure-button";
import { EnquiryDialog } from "@/components/site/enquiry-dialog";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { trackEvent } from "@/lib/analytics";
import type { Project } from "@/types/project";

export function StickyEnquireBar({ project, phoneDigits }: { project: Project; phoneDigits: string }) {
  return (
    <>
      {/* Desktop sidebar card */}
      <aside className="hidden lg:block">
        <div className="sticky top-32 space-y-4 rounded-xl border border-border bg-card p-6">
          <div>
            <p className="text-xs text-muted-foreground">Pricing</p>
            <p className="font-heading text-2xl font-bold">Price on Quote</p>
          </div>
          <div className="space-y-2">
            <EnquiryDialog
              trigger={<Button className="w-full">Enquire Now</Button>}
              projectSlug={project.slug}
              projectName={project.name}
            />
            <EnquiryDialog
              trigger={
                <Button variant="outline" className="w-full">
                  <Calendar className="size-4" />
                  Book Site Visit
                </Button>
              }
              title="Book a Site Visit"
              source="site-visit"
              showSiteVisitFields
              projectSlug={project.slug}
              projectName={project.name}
            />
            <BrochureButton projectSlug={project.slug} projectName={project.name} />
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-border pt-4">
            <a
              href={`tel:${phoneDigits}`}
              onClick={() => trackEvent("call_click", project.slug)}
              className="flex items-center justify-center gap-1.5 rounded-md border border-border py-2 text-sm font-medium hover:bg-muted"
            >
              <Phone className="size-4" />
              Call
            </a>
            <WhatsAppButton
              phoneDigits={phoneDigits}
              projectSlug={project.slug}
              message={`Hi, I'm interested in ${project.name}.`}
              variant="inline"
              className="flex items-center justify-center gap-1.5 rounded-md border border-border py-2 text-sm font-medium hover:bg-muted"
            />
          </div>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border bg-background p-3 lg:hidden">
        <a
          href={`tel:${phoneDigits}`}
          onClick={() => trackEvent("call_click", project.slug)}
          aria-label="Call"
          className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border"
        >
          <Phone className="size-4" />
        </a>
        <WhatsAppButton
          phoneDigits={phoneDigits}
          projectSlug={project.slug}
          message={`Hi, I'm interested in ${project.name}.`}
          variant="inline"
          className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border [&>span]:hidden"
        />
        <EnquiryDialog
          trigger={<Button className="flex-1">Enquire Now</Button>}
          projectSlug={project.slug}
          projectName={project.name}
        />
      </div>
      <div className="h-16 lg:hidden" />
    </>
  );
}
