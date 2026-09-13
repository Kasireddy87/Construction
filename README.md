# Sri Balaji Constructions — Marketing Website

A Next.js marketing site for Sri Balaji Constructions (Hyderabad-based design + build): browse
every project, drill into floor plans / elevations / location / pricing, and capture leads — with
an admin dashboard for sales. See [`.claude/plans`](../../.claude/plans) in the parent Claude Code
session for the full architecture writeup, or the summary below.

## Stack

- **Frontend**: Next.js 15 (App Router, TypeScript), Tailwind CSS v4, shadcn/ui (Base UI)
- **Content (CMS)**: [Sanity](https://sanity.io) — projects, unit plans, amenities, company info
- **Backend**: Next.js API routes + [Supabase](https://supabase.com) Postgres (leads, site visits,
  brochure requests, analytics events, admin auth)
- **Email**: [Resend](https://resend.com) for new-lead notifications
- **Maps**: Google Maps iframe embed (no API key required)

**The site works today with none of these configured** — content comes from
[`src/lib/sample-data.ts`](src/lib/sample-data.ts) and forms show a friendly "not configured yet"
message instead of crashing. Wire up each service when you're ready; nothing else changes.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. All 10 sample projects (including one real project — Vanastalipuram
Residence, with actual floor plans and elevation), the homepage, listing/filters, and every
project detail page work out of the box.

## Wiring up the real services

Copy `.env.example` to `.env.local` and fill in what you need:

### 1. Content — Sanity CMS

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`.
3. Run the Studio (a separate app from the Next.js site — see `sanity.config.ts`):
   ```bash
   npm run studio          # local editor at http://localhost:3333
   npm run studio:deploy   # host free at https://<project>.sanity.studio
   ```
4. Add your projects, amenities, company info and testimonials. The Next.js site automatically
   switches from sample data to live Sanity content once `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
   (see [`src/lib/data.ts`](src/lib/data.ts)) — restart `npm run dev` to pick up the env var.

The content model (schemas) lives in [`src/sanity/schemas`](src/sanity/schemas).

### 2. Backend — Supabase (leads, site visits, brochure requests, analytics, admin login)

1. Create a free project at [supabase.com](https://supabase.com).
2. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
   `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
3. Run [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) in the Supabase
   SQL editor — creates `leads`, `site_visits`, `brochure_requests`, `analytics_events`,
   `admin_users` and their Row-Level Security policies.
4. Add yourself as an admin:
   ```sql
   insert into admin_users (email, role) values ('you@example.com', 'owner');
   ```
5. Enable email OTP sign-in in Supabase Auth settings (enabled by default). Visit `/admin`, sign
   in with that email, and you'll land in the leads/analytics dashboard.

### 3. Email notifications — Resend

Set `RESEND_API_KEY`, `LEADS_EMAIL_FROM` (a domain you've verified with Resend) and
`SALES_NOTIFICATION_EMAIL` to get an email every time someone submits an enquiry, books a site
visit, or requests a brochure.

## Project structure

```
src/app/(site)/            Public marketing site (home, /projects, /projects/[slug], about, contact, legal)
src/app/admin/             Sales dashboard — (protected)/ requires admin login, login/ + setup-required/ don't
src/app/api/                leads, brochure, analytics endpoints
src/components/site/        Header, footer, project card, enquiry form/dialog, WhatsApp button
src/components/project/     Project detail page sections (plans, gallery, location, EMI calc, ...)
src/components/admin/       Leads table, site-visits table, stat cards, trend chart
src/lib/data.ts             Single data-access layer — Sanity if configured, else sample data
src/lib/sample-data.ts      10 seed projects (1 real) + company info + testimonials
public/projects/             Real project assets (floor plans, elevation photos)
src/lib/validation.ts       Shared Zod schemas (client + server)
src/sanity/                 Sanity client, GROQ queries, env
src/sanity/schemas/         Sanity Studio content model
sanity.config.ts            Standalone Studio config (run via `npm run studio`)
supabase/migrations/        Postgres schema + RLS policies
```

## Deploying

- **Site**: push to GitHub, import into [Vercel](https://vercel.com), add the env vars from
  `.env.example`, set `NEXT_PUBLIC_SITE_URL` to your production domain.
- **Studio**: `npm run studio:deploy` hosts it free at `https://<project>.sanity.studio` — no
  separate server needed.
- **Supabase / Resend**: already cloud-hosted once configured above.

## Notes

- Brochure "gating": the PDF link is only ever returned after a visitor submits the download
  form — it's lead-capture gating, not access control (Sanity file assets are on a public CDN).
- Analytics are first-party (your own Supabase table), not a third-party tracker.
- `/admin` uses Supabase magic-link (passwordless) sign-in, restricted to emails in `admin_users`.
