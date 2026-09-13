import { z } from "zod";

// Shared client + server validation, per the plan (React Hook Form + Zod).

export const leadSourceEnum = z.enum(["enquiry", "site-visit", "contact", "brochure"]);

const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  projectSlug: z.string().trim().max(200).optional().or(z.literal("")),
  source: leadSourceEnum.default("enquiry"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  preferredDate: z.string().trim().optional().or(z.literal("")),
  preferredSlot: z.string().trim().optional().or(z.literal("")),
  utmSource: z.string().trim().max(200).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(200).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(200).optional().or(z.literal("")),
  // Honeypot — real users never fill this in; bots often do.
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

// z.input (not z.infer/output) so react-hook-form + zodResolver agree on the
// pre-parse shape — `source` has a Zod .default(), which stays optional here
// and is only filled in when the schema parses on submit.
export type LeadFormInput = z.input<typeof leadFormSchema>;

export const brochureFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  projectSlug: z.string().trim().min(1),
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type BrochureFormInput = z.infer<typeof brochureFormSchema>;

export const analyticsEventEnum = z.enum([
  "project_view",
  "brochure_click",
  "whatsapp_click",
  "call_click",
  "plan_view",
  "enquiry_submit",
]);

export const analyticsEventSchema = z.object({
  event: analyticsEventEnum,
  projectSlug: z.string().trim().max(200).optional().or(z.literal("")),
  path: z.string().trim().max(500).optional().or(z.literal("")),
  sessionId: z.string().trim().max(200).optional().or(z.literal("")),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
