import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminSignOutButton } from "@/components/admin/sign-out-button";
import { getCurrentAdminEmail, isSupabaseAuthConfigured } from "@/lib/supabase-server";

// Every /admin page reads the signed-in admin's session and live data from
// Supabase — never statically prerender this section.
export const dynamic = "force-dynamic";

const navLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/site-visits", label: "Site Visits" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseAuthConfigured) redirect("/admin/setup-required");

  const email = await getCurrentAdminEmail();
  if (!email) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-4 text-center">
        <h1 className="font-heading text-2xl font-bold">Not authorized</h1>
        <p className="mt-3 text-muted-foreground">
          You&apos;re signed in, but this email isn&apos;t on the admin allowlist. Ask an owner to add you to
          the <code className="rounded bg-muted px-1.5 py-0.5">admin_users</code> table.
        </p>
        <AdminSignOutButton className="mt-6" />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-secondary/30 p-4 md:block">
        <p className="px-2 font-heading text-lg font-bold">Admin</p>
        <nav className="mt-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-border pt-4">
          <p className="truncate px-3 text-xs text-muted-foreground">{email}</p>
          <AdminSignOutButton className="mt-2 w-full" />
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto p-6">{children}</main>
    </div>
  );
}
