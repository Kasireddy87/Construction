import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.LEADS_EMAIL_FROM || "leads@yourdomain.example";
const salesTo = process.env.SALES_NOTIFICATION_EMAIL;

export const isEmailConfigured = Boolean(apiKey && salesTo);

const resend = apiKey ? new Resend(apiKey) : null;

export async function notifySalesOfLead(params: {
  name: string;
  phone: string;
  email?: string;
  projectSlug?: string;
  source: string;
  message?: string;
}) {
  if (!resend || !salesTo) {
    console.warn("[email] RESEND_API_KEY / SALES_NOTIFICATION_EMAIL not set — skipping lead email.", params);
    return;
  }
  await resend.emails.send({
    from,
    to: salesTo,
    subject: `New ${params.source} lead${params.projectSlug ? ` — ${params.projectSlug}` : ""}`,
    text: [
      `Name: ${params.name}`,
      `Phone: ${params.phone}`,
      params.email ? `Email: ${params.email}` : null,
      params.projectSlug ? `Project: ${params.projectSlug}` : null,
      `Source: ${params.source}`,
      params.message ? `Message: ${params.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
