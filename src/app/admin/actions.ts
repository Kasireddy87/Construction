"use server";

import { revalidatePath } from "next/cache";

import { getCurrentAdminEmail } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase";

async function assertAdmin() {
  const email = await getCurrentAdminEmail();
  if (!email) throw new Error("Not authorized");
}

export async function updateLeadStatus(id: string, status: string) {
  await assertAdmin();
  const { error } = await getSupabaseAdmin().from("leads").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function updateLeadNotes(id: string, notes: string) {
  await assertAdmin();
  const { error } = await getSupabaseAdmin().from("leads").update({ notes }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function confirmSiteVisit(id: string, confirmed: boolean) {
  await assertAdmin();
  const { error } = await getSupabaseAdmin().from("site_visits").update({ confirmed }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/site-visits");
}
