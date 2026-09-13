"use client";

import { useState, type ReactElement } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EnquiryForm } from "@/components/site/enquiry-form";
import type { LeadFormInput } from "@/lib/validation";

export function EnquiryDialog({
  trigger,
  title = "Enquire Now",
  projectSlug,
  projectName,
  source = "enquiry",
  showSiteVisitFields = false,
}: {
  trigger: ReactElement;
  title?: string;
  projectSlug?: string;
  projectName?: string;
  source?: LeadFormInput["source"];
  showSiteVisitFields?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <EnquiryForm
          projectSlug={projectSlug}
          projectName={projectName}
          source={source}
          showSiteVisitFields={showSiteVisitFields}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
