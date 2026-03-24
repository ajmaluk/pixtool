-- PixTool production schema for Supabase
-- ==========================================
-- SETUP PROCESS:
-- 1. Create a Supabase project at https://supabase.com/
-- 2. Go to SQL Editor > New Query
-- 3. Paste this entire file and Run
-- 4. In Settings > API, copy URL and anon key to your .env:
--    VITE_SUPABASE_URL=https://qqkguvtujmiajoamuqor.supabase.co
--    VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxa2d1dnR1am1pYWpvYW11cW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDczMTksImV4cCI6MjA4OTgyMzMxOX0.zlqGivZngxtYiFw4SD-YQa5VqAh45yuUt2CPyk5E3Co
-- 5. Set up Edge Functions (Optional for Admin/Metrics):
--    - Install Supabase CLI: brew install supabase/tap/supabase
--    - Login & Link: supabase login && supabase link --project-ref your-project-id
--    - Set secrets:
--      supabase secrets set ADMIN_USERNAME=ajmal ADMIN_PASSWORD=Ajmal@123 ADMIN_SESSION_SECRET=ajmaluk123pixtool.in-2026
--    - Deploy: supabase functions deploy
-- ==========================================

create extension if not exists pgcrypto;

create table if not exists tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ratings (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references tools(id) on delete cascade,
  user_id text not null,
  ip_hash text,
  rating int not null check (rating >= 1 and rating <= 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tool_id, user_id)
);

create table if not exists tool_stats (
  tool_id uuid primary key references tools(id) on delete cascade,
  avg_rating float not null default 0,
  total_votes int not null default 0,
  rating_1 int not null default 0,
  rating_2 int not null default 0,
  rating_3 int not null default 0,
  rating_4 int not null default 0,
  rating_5 int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  tool_id uuid references tools(id) on delete set null,
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists rate_limits (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  ip_hash text,
  action text not null,
  created_at timestamptz not null default now()
);

alter table rate_limits
  add column if not exists ip_hash text;

create index if not exists idx_tools_slug on tools(slug);
create index if not exists idx_ratings_tool_id on ratings(tool_id);
create index if not exists idx_ratings_created_at on ratings(created_at desc);
create index if not exists idx_testimonials_tool_id on testimonials(tool_id);
create index if not exists idx_testimonials_approved_created on testimonials(approved, created_at desc);
create index if not exists idx_testimonials_tool_approved_created on testimonials(tool_id, approved, created_at desc);
create index if not exists idx_testimonials_feed_created on testimonials(created_at desc) where approved = true;
create index if not exists idx_contacts_created_at on contacts(created_at desc);
create index if not exists idx_contacts_status_created_at on contacts(status, created_at desc);
create index if not exists idx_contacts_new_created on contacts(created_at desc) where status = 'new';
create index if not exists idx_rate_limits_user_action_created on rate_limits(user_id, action, created_at desc);
create index if not exists idx_rate_limits_ip_action_created on rate_limits(ip_hash, action, created_at desc) where ip_hash is not null;
create index if not exists idx_rate_limits_created_at on rate_limits(created_at);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'contacts_status_check'
  ) then
    alter table contacts
      add constraint contacts_status_check
      check (status in ('new', 'read', 'replied'));
  end if;
end $$;

create or replace function touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tr_tools_updated_at on tools;
create trigger tr_tools_updated_at
before update on tools
for each row execute function touch_updated_at();

drop trigger if exists tr_ratings_updated_at on ratings;
create trigger tr_ratings_updated_at
before update on ratings
for each row execute function touch_updated_at();

drop trigger if exists tr_tool_stats_updated_at on tool_stats;
create trigger tr_tool_stats_updated_at
before update on tool_stats
for each row execute function touch_updated_at();

drop trigger if exists tr_testimonials_updated_at on testimonials;
create trigger tr_testimonials_updated_at
before update on testimonials
for each row execute function touch_updated_at();

drop trigger if exists tr_contacts_updated_at on contacts;
create trigger tr_contacts_updated_at
before update on contacts
for each row execute function touch_updated_at();

create or replace function recalc_tool_stats(p_tool_id uuid)
returns void
language plpgsql
as $$
declare
  v_total int := 0;
  v_avg float := 0;
  v1 int := 0;
  v2 int := 0;
  v3 int := 0;
  v4 int := 0;
  v5 int := 0;
begin
  select
    count(*)::int,
    coalesce(avg(rating)::float, 0),
    count(*) filter (where rating = 1)::int,
    count(*) filter (where rating = 2)::int,
    count(*) filter (where rating = 3)::int,
    count(*) filter (where rating = 4)::int,
    count(*) filter (where rating = 5)::int
  into v_total, v_avg, v1, v2, v3, v4, v5
  from ratings
  where tool_id = p_tool_id;

  insert into tool_stats (tool_id, avg_rating, total_votes, rating_1, rating_2, rating_3, rating_4, rating_5)
  values (p_tool_id, v_avg, v_total, v1, v2, v3, v4, v5)
  on conflict (tool_id)
  do update set
    avg_rating = excluded.avg_rating,
    total_votes = excluded.total_votes,
    rating_1 = excluded.rating_1,
    rating_2 = excluded.rating_2,
    rating_3 = excluded.rating_3,
    rating_4 = excluded.rating_4,
    rating_5 = excluded.rating_5,
    updated_at = now();
end;
$$;

create or replace function handle_rating_stats()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'DELETE' then
    perform recalc_tool_stats(old.tool_id);
  elsif tg_op = 'UPDATE' then
    if new.tool_id <> old.tool_id then
      perform recalc_tool_stats(old.tool_id);
    end if;
    perform recalc_tool_stats(new.tool_id);
  else
    perform recalc_tool_stats(new.tool_id);
  end if;
  return coalesce(new, old);
end;
$$;

drop trigger if exists tr_ratings_stats on ratings;
create trigger tr_ratings_stats
after insert or update or delete on ratings
for each row execute function handle_rating_stats();

create or replace view overall_tool_rating as
select
  case when sum(total_votes) > 0
    then sum(avg_rating * total_votes) / sum(total_votes)
    else 0
  end as avg_rating,
  coalesce(sum(total_votes), 0) as total_votes
from tool_stats;

create or replace function get_public_seo_metrics()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'generated_at', now(),
    'tools_total', coalesce((select count(*) from tools), 0),
    'rated_tools_total', coalesce((select count(*) from tool_stats where total_votes > 0), 0),
    'ratings_total', coalesce((select count(*) from ratings), 0),
    'overall_avg_rating', coalesce((select avg_rating from overall_tool_rating), 0),
    'overall_total_votes', coalesce((select total_votes from overall_tool_rating), 0),
    'approved_testimonials_total', coalesce((select count(*) from testimonials where approved = true), 0),
    'approved_testimonials_last_30d', coalesce((select count(*) from testimonials where approved = true and created_at > now() - interval '30 days'), 0)
  );
$$;

grant execute on function get_public_seo_metrics() to anon;
grant execute on function get_public_seo_metrics() to authenticated;

create or replace function cleanup_rate_limits(
  p_retention_days int default 7,
  p_batch_limit int default 5000
)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted int := 0;
  v_retention_days int;
  v_batch_limit int;
begin
  v_retention_days := greatest(1, least(coalesce(p_retention_days, 7), 365));
  v_batch_limit := greatest(100, least(coalesce(p_batch_limit, 5000), 50000));

  with stale_rows as (
    select ctid
    from rate_limits
    where created_at < now() - make_interval(days => v_retention_days)
    limit v_batch_limit
  )
  delete from rate_limits r
  using stale_rows s
  where r.ctid = s.ctid;

  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

create or replace function submit_tool_rating(
  p_tool_slug text,
  p_user_id text,
  p_ip_hash text,
  p_rating int,
  p_window_seconds int default 10
)
returns table(
  avg_rating float,
  total_votes int,
  rating_1 int,
  rating_2 int,
  rating_3 int,
  rating_4 int,
  rating_5 int,
  already_rated boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tool_id uuid;
  v_last_attempt timestamptz;
  v_effective_slug text;
  v_window_seconds int;
begin
  v_effective_slug := lower(trim(coalesce(p_tool_slug, '')));
  v_window_seconds := greatest(1, least(coalesce(p_window_seconds, 10), 300));

  if v_effective_slug = '' then
    raise exception 'Tool not found';
  end if;

  if p_rating is null or p_rating < 1 or p_rating > 5 then
    raise exception 'Invalid rating';
  end if;

  if coalesce(char_length(trim(p_user_id)), 0) < 8 then
    raise exception 'Invalid user id';
  end if;

  select id into v_tool_id
  from tools
  where slug = v_effective_slug
  limit 1;

  if v_tool_id is null then
    raise exception 'Tool not found';
  end if;

  select created_at
  into v_last_attempt
  from rate_limits
  where action = 'rating:' || v_effective_slug
    and (
      user_id = p_user_id
      or (p_ip_hash is not null and ip_hash = p_ip_hash)
    )
  order by created_at desc
  limit 1;

  if v_last_attempt is not null and v_last_attempt > now() - make_interval(secs => v_window_seconds) then
    raise exception 'Rate limited';
  end if;

  insert into rate_limits (user_id, ip_hash, action)
  values (p_user_id, p_ip_hash, 'rating:' || v_effective_slug);

  begin
    insert into ratings (tool_id, user_id, ip_hash, rating)
    values (v_tool_id, p_user_id, p_ip_hash, p_rating);
  exception
    when unique_violation then
      return query
      select
        ts.avg_rating,
        ts.total_votes,
        ts.rating_1,
        ts.rating_2,
        ts.rating_3,
        ts.rating_4,
        ts.rating_5,
        true
      from tool_stats ts
      where ts.tool_id = v_tool_id;
      return;
  end;

  return query
  select
    ts.avg_rating,
    ts.total_votes,
    ts.rating_1,
    ts.rating_2,
    ts.rating_3,
    ts.rating_4,
    ts.rating_5,
    false
  from tool_stats ts
  where ts.tool_id = v_tool_id;
end;
$$;

grant execute on function submit_tool_rating(text, text, text, int, int) to anon;
grant execute on function submit_tool_rating(text, text, text, int, int) to authenticated;

-- RLS
alter table tools enable row level security;
alter table ratings enable row level security;
alter table tool_stats enable row level security;
alter table testimonials enable row level security;
alter table contacts enable row level security;
alter table rate_limits enable row level security;

-- public read policies
drop policy if exists tools_read_all on tools;
create policy tools_read_all on tools
for select using (true);

drop policy if exists tool_stats_read_all on tool_stats;
create policy tool_stats_read_all on tool_stats
for select using (true);

drop policy if exists testimonials_read_approved on testimonials;
create policy testimonials_read_approved on testimonials
for select using (approved = true);

-- public insert policies
drop policy if exists ratings_insert_public on ratings;
create policy ratings_insert_public on ratings
for insert with check (rating between 1 and 5 and char_length(user_id) > 0);

drop policy if exists testimonials_insert_public on testimonials;
create policy testimonials_insert_public on testimonials
for insert with check (char_length(name) > 1 and char_length(message) > 4);

drop policy if exists contacts_insert_public on contacts;
create policy contacts_insert_public on contacts
for insert with check (position('@' in email) > 1 and char_length(name) > 1 and char_length(message) > 4);

drop policy if exists rate_limits_insert_public on rate_limits;
create policy rate_limits_insert_public on rate_limits
for insert with check (
  action like 'rating:%'
  and char_length(coalesce(user_id, '')) >= 8
  and (ip_hash is null or char_length(ip_hash) = 64)
);

-- optional: disallow anon update/delete directly
drop policy if exists ratings_no_update on ratings;
create policy ratings_no_update on ratings
for update using (false);
drop policy if exists ratings_no_delete on ratings;
create policy ratings_no_delete on ratings
for delete using (false);

drop policy if exists testimonials_no_update on testimonials;
create policy testimonials_no_update on testimonials
for update using (false);
drop policy if exists testimonials_no_delete on testimonials;
create policy testimonials_no_delete on testimonials
for delete using (false);

drop policy if exists contacts_no_update on contacts;
create policy contacts_no_update on contacts
for update using (false);
drop policy if exists contacts_no_delete on contacts;
create policy contacts_no_delete on contacts
for delete using (false);

-- Seed tools from frontend catalog (safe for multiple runs)
insert into tools (name, slug) values
  ('Resize Image', 'image-tools/resize'),
  ('Crop Image', 'image-tools/crop'),
  ('Rotate Image', 'image-tools/rotate'),
  ('Compress Image', 'image-tools/compress'),
  ('Convert Format', 'image-tools/convert'),
  ('Add Watermark', 'image-tools/watermark'),
  ('Flip Image', 'image-tools/flip'),
  ('Grayscale', 'image-tools/grayscale'),
  ('AI Upscaler', 'image-tools/upscale'),
  ('Photo Restoration', 'image-tools/restore'),
  ('Image to PDF', 'image-tools/image-to-pdf'),
  ('BG Remover', 'image-tools/remove-background'),
  ('Merge PDF', 'pdf-tools/merge'),
  ('Split PDF', 'pdf-tools/split'),
  ('Compress PDF', 'pdf-tools/compress'),
  ('PDF to Images', 'pdf-tools/convert'),
  ('Protect PDF', 'pdf-tools/protect'),
  ('Watermark PDF', 'pdf-tools/watermark'),
  ('Reorder Pages', 'pdf-tools/reorder'),
  ('PDF to Word', 'pdf-tools/to-word'),
  ('PDF to Excel', 'pdf-tools/to-excel'),
  ('PDF to PPT', 'pdf-tools/to-ppt'),
  ('Unlock PDF', 'pdf-tools/unlock'),
  ('PDF OCR', 'pdf-tools/ocr'),
  ('PDF Editor', 'pdf-tools/edit'),
  ('Temp Mail', 'temp-mail'),
  ('10 Minute Mail', 'temp-mail/10-minute-mail'),
  ('Change Email', 'temp-mail/change-email'),
  ('Fake Email', 'fake-email'),
  ('Disposable Email', 'disposable-email'),
  ('Throwaway Email', 'throwaway-email'),
  ('QR Scanner', 'qr-scanner'),
  ('QR Generator', 'qr-generator'),
  ('Typing Test', 'typing-test'),
  ('Code Diff', 'code-diff'),
  ('JSON Formatter', 'json-formatter'),
  ('Unit Converter', 'unit-converter'),
  ('Password Generator', 'password-generator')
on conflict (slug) do nothing;

-- Setup complete.
-- ==========================================
