"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { leadFormSchema, type LeadFormInput } from "@/lib/validation";

export function EnquiryForm({
  projectSlug,
  projectName,
  source = "enquiry",
  showSiteVisitFields = false,
  onSuccess,
}: {
  projectSlug?: string;
  projectName?: string;
  source?: LeadFormInput["source"];
  showSiteVisitFields?: boolean;
  onSuccess?: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { source, projectSlug: projectSlug ?? "" },
  });

  async function onSubmit(values: LeadFormInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.formErrors?.[0] || json?.error || "Something went wrong");

      trackEvent("enquiry_submit", projectSlug);
      toast.success("Thanks! Our sales team will reach out shortly.");
      reset();
      onSuccess?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {projectName && (
        <p className="text-sm text-muted-foreground">
          Enquiring about <span className="font-medium text-foreground">{projectName}</span>
        </p>
      )}
      {/* Honeypot field — hidden from real users via CSS, bots often fill every input */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
        {...register("company")}
      />

      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" placeholder="Your name" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+91 98765 43210" {...register("phone")} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      {showSiteVisitFields && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="preferredDate">Preferred date</Label>
            <Input id="preferredDate" type="date" {...register("preferredDate")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="preferredSlot">Preferred time</Label>
            <Input id="preferredSlot" placeholder="e.g. Morning, 4–6 PM" {...register("preferredSlot")} />
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea id="message" rows={3} placeholder="Any specific requirements?" {...register("message")} />
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Submitting…" : showSiteVisitFields ? "Book Site Visit" : "Submit Enquiry"}
      </Button>
    </form>
  );
}
