import { randomUUID } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { notifySalesOfLead } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";
import { isSupabaseConfigured, supabaseAnon } from "@/lib/supabase";
import { leadFormSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`leads:${ip}`)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = leadFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot: a real visitor never fills the hidden "company" field.
  if (data.company) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  if (!isSupabaseConfigured || !supabaseAnon) {
    console.warn("[api/leads] Supabase not configured — lead not persisted:", data);
    return NextResponse.json(
      { error: "The lead-capture backend isn't configured yet. Set NEXT_PUBLIC_SUPABASE_URL / ANON_KEY." },
      { status: 503 },
    );
  }

  // Generate the id ourselves rather than reading it back via `.select()`.
  // The anon role can only INSERT on `leads` (never SELECT, to keep other
  // visitors' contact details private), and under RLS a `RETURNING`-style
  // read-back is blocked by the same policy that protects direct reads —
  // Postgres then reports the whole insert as an RLS violation even though
  // the insert itself would have succeeded.
  const id = randomUUID();

  const { error } = await supabaseAnon.from("leads").insert({
    id,
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    project_slug: data.projectSlug || null,
    source: data.source,
    message: data.message || null,
    utm_source: data.utmSource || null,
    utm_medium: data.utmMedium || null,
    utm_campaign: data.utmCampaign || null,
  });

  if (error) {
    console.error("[api/leads] insert failed:", error);
    return NextResponse.json({ error: "Could not save your enquiry. Please try again." }, { status: 500 });
  }

  if (data.source === "site-visit" && (data.preferredDate || data.preferredSlot)) {
    const { error: visitError } = await supabaseAnon.from("site_visits").insert({
      lead_id: id,
      preferred_date: data.preferredDate || null,
      preferred_slot: data.preferredSlot || null,
    });
    if (visitError) console.error("[api/leads] site_visits insert failed:", visitError);
  }

  await notifySalesOfLead({
    name: data.name,
    phone: data.phone,
    email: data.email || undefined,
    projectSlug: data.projectSlug || undefined,
    source: data.source,
    message: data.message || undefined,
  }).catch((err) => console.error("[api/leads] email notification failed:", err));

  return NextResponse.json({ ok: true, id });
}
