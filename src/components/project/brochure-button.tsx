"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";
import { brochureFormSchema, type BrochureFormInput } from "@/lib/validation";

export function BrochureButton({ projectSlug, projectName }: { projectSlug: string; projectName: string }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrochureFormInput>({
    resolver: zodResolver(brochureFormSchema),
    defaultValues: { projectSlug },
  });

  async function onSubmit(values: BrochureFormInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.formErrors?.[0] || json?.error || "Something went wrong");

      trackEvent("brochure_click", projectSlug);
      if (json.brochureUrl) {
        window.open(json.brochureUrl, "_blank", "noopener,noreferrer");
        toast.success("Thanks! Your brochure download has started.");
        setOpen(false);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not fetch the brochure. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="w-full">
            <Download className="size-4" />
            Download Brochure
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get the {projectName} brochure</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="b-name">Full name</Label>
            <Input id="b-name" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="b-phone">Phone</Label>
            <Input id="b-phone" {...register("phone")} />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="b-email">Email (optional)</Label>
            <Input id="b-email" {...register("email")} />
          </div>
          <input type="text" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" {...register("company")} />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Preparing…" : "Download Brochure"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
