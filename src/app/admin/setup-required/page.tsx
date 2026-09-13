export default function SetupRequiredPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-4 text-center">
      <h1 className="font-heading text-2xl font-bold">Admin dashboard not configured yet</h1>
      <p className="mt-3 text-muted-foreground">
        Set <code className="rounded bg-muted px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code> in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">.env.local</code>, run the migration in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">supabase/migrations/0001_init.sql</code>, and add
        yourself to <code className="rounded bg-muted px-1.5 py-0.5">admin_users</code> to sign in here.
      </p>
    </div>
  );
}
