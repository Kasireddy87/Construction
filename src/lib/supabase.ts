import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Two clients:
//  - `supabaseAnon`  — safe to use from API routes for public writes (leads,
//    brochure requests, analytics events). Respects Row-Level Security, so it
//    can only INSERT into the tables RLS allows (see supabase/migrations).
//  - `getSupabaseAdmin()` — service-role client for the /admin dashboard and
//    server actions that need to READ leads/analytics. Never import this into
//    client components or expose the key to the browser.
//
// Both are `null` until the corresponding env vars are set, so the rest of
// the app (and `npm run dev`) works today without a Supabase project — API
// routes return a friendly "not configured" response instead of crashing.
// ---------------------------------------------------------------------------

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabaseAnon: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

let adminClient: SupabaseClient | null = null;

/** Server-only. Throws if called outside a server context or without the service role key. */
export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getSupabaseAdmin() must only be called on the server");
  }
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    );
  }
  if (!adminClient) {
    adminClient = createClient(url, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return adminClient;
}
