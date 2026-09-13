import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseAuthConfigured = Boolean(url && anonKey);

/** Cookie-aware Supabase client for Server Components / Route Handlers — reads the admin's session. */
export async function getSupabaseServerClient() {
  if (!url || !anonKey) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // setAll called from a Server Component — safe to ignore, middleware refreshes the session.
        }
      },
    },
  });
}

/** Returns the signed-in admin's email if they're both authenticated and allowlisted in admin_users, else null. */
export async function getCurrentAdminEmail(): Promise<string | null> {
  if (!isSupabaseAuthConfigured) return null;
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const { data } = await supabase.from("admin_users").select("email").eq("email", user.email).maybeSingle();
  return data ? user.email : null;
}
