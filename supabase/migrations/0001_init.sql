-- Marketing site backend schema.
-- Run in the Supabase SQL editor (or `supabase db push`) after creating the project.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  project_slug text,
  source text not null check (source in ('enquiry', 'site-visit', 'contact', 'brochure')),
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'visited', 'closed', 'lost')),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  notes text
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_project_slug_idx on leads (project_slug);
create index if not exists leads_status_idx on leads (status);

-- ---------------------------------------------------------------------------
-- site_visits
-- ---------------------------------------------------------------------------
create table if not exists site_visits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid references leads (id) on delete cascade,
  preferred_date date,
  preferred_slot text,
  confirmed boolean not null default false
);

-- ---------------------------------------------------------------------------
-- brochure_requests
-- ---------------------------------------------------------------------------
create table if not exists brochure_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  project_slug text not null,
  downloaded_at timestamptz
);

create index if not exists brochure_requests_project_slug_idx on brochure_requests (project_slug);

-- ---------------------------------------------------------------------------
-- analytics_events
-- ---------------------------------------------------------------------------
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event text not null check (
    event in ('project_view', 'brochure_click', 'whatsapp_click', 'call_click', 'plan_view', 'enquiry_submit')
  ),
  project_slug text,
  path text,
  referrer text,
  session_id text
);

create index if not exists analytics_events_created_at_idx on analytics_events (created_at desc);
create index if not exists analytics_events_project_slug_idx on analytics_events (project_slug);
create index if not exists analytics_events_event_idx on analytics_events (event);

-- ---------------------------------------------------------------------------
-- admin_users — allowlist of emails permitted to view /admin
-- ---------------------------------------------------------------------------
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null default 'sales' check (role in ('sales', 'owner'))
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table leads enable row level security;
alter table site_visits enable row level security;
alter table brochure_requests enable row level security;
alter table analytics_events enable row level security;
alter table admin_users enable row level security;

-- Public (anon key, used by API routes) may only INSERT — never read back.
create policy "public insert leads" on leads for insert to anon with check (true);
create policy "public insert site_visits" on site_visits for insert to anon with check (true);
create policy "public insert brochure_requests" on brochure_requests for insert to anon with check (true);
create policy "public insert analytics_events" on analytics_events for insert to anon with check (true);

-- Authenticated admins (checked against admin_users) may read everything.
-- The service-role client used by /admin bypasses RLS entirely, so these
-- policies mainly guard against a future switch to the anon/user JWT client.
create policy "admins read leads" on leads for select to authenticated
  using (exists (select 1 from admin_users a where a.email = auth.jwt() ->> 'email'));
create policy "admins update leads" on leads for update to authenticated
  using (exists (select 1 from admin_users a where a.email = auth.jwt() ->> 'email'));
create policy "admins read site_visits" on site_visits for select to authenticated
  using (exists (select 1 from admin_users a where a.email = auth.jwt() ->> 'email'));
create policy "admins update site_visits" on site_visits for update to authenticated
  using (exists (select 1 from admin_users a where a.email = auth.jwt() ->> 'email'));
create policy "admins read brochure_requests" on brochure_requests for select to authenticated
  using (exists (select 1 from admin_users a where a.email = auth.jwt() ->> 'email'));
create policy "admins read analytics_events" on analytics_events for select to authenticated
  using (exists (select 1 from admin_users a where a.email = auth.jwt() ->> 'email'));

-- A signed-in user may only check their OWN row — this is what lets
-- getCurrentAdminEmail() in the app verify "is this logged-in user an admin?"
-- without granting them the ability to list every admin's email.
create policy "self read admin_users" on admin_users for select to authenticated
  using (email = auth.jwt() ->> 'email');

-- Seed your own login before you can see /admin:
-- insert into admin_users (email, role) values ('you@example.com', 'owner');
