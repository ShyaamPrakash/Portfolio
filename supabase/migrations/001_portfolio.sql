begin;

create table public.portfolio_admin_allowlist (
  user_id uuid primary key references auth.users(id) on delete cascade,
  added_at timestamptz not null default now()
);
alter table public.portfolio_admin_allowlist enable row level security;
create policy owner_reads_membership on public.portfolio_admin_allowlist for select to authenticated using (user_id = auth.uid());
grant select on public.portfolio_admin_allowlist to authenticated;
revoke all on public.portfolio_admin_allowlist from anon;
revoke insert, update, delete on public.portfolio_admin_allowlist from authenticated;

create function public.is_portfolio_admin() returns boolean language sql stable security definer
set search_path = '' as $$
  select exists (select 1 from public.portfolio_admin_allowlist where user_id = auth.uid());
$$;
revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;

create table public.github_repo_snapshots (
  github_repo_id bigint primary key check (github_repo_id > 0),
  name text not null, description text not null default '', html_url text not null,
  language text, pushed_at timestamptz not null,
  is_fork boolean not null default false, is_archived boolean not null default false,
  is_public boolean not null default true, synced_at timestamptz not null default now(),
  check (html_url like 'https://github.com/ShyaamPrakash/%')
);
create table public.portfolio_project_settings (
  github_repo_id bigint primary key references public.github_repo_snapshots(github_repo_id),
  is_visible boolean not null default false, is_featured boolean not null default false,
  sort_order integer not null default 100 check (sort_order between 0 and 10000),
  slug text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  display_title text not null default '' check (length(display_title) <= 100),
  tagline text not null default '' check (length(tagline) <= 300),
  tech_tags text[] not null default '{}',
  art_direction text not null default 'topology' check (art_direction in ('topology','signal-red','ascii-terminal')),
  demo_url text not null default '' check (demo_url = '' or demo_url ~ '^https?://'),
  case_study_markdown text not null default '' check (length(case_study_markdown) <= 15000),
  updated_at timestamptz not null default now()
);
create table public.portfolio_site_settings (key text primary key, value jsonb not null, updated_at timestamptz not null default now());

alter table public.github_repo_snapshots enable row level security;
alter table public.portfolio_project_settings enable row level security;
alter table public.portfolio_site_settings enable row level security;
create policy owner_snapshots on public.github_repo_snapshots for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy owner_settings on public.portfolio_project_settings for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy owner_site_settings on public.portfolio_site_settings for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
revoke all on public.github_repo_snapshots, public.portfolio_project_settings, public.portfolio_site_settings from anon;
grant select, insert, update, delete on public.github_repo_snapshots, public.portfolio_project_settings, public.portfolio_site_settings to authenticated;

create view public.owner_projects with (security_invoker = true) as
select r.*, s.is_visible, s.is_featured, s.sort_order, s.slug, s.display_title, s.tagline,
  s.tech_tags, s.art_direction, s.demo_url, s.case_study_markdown
from public.github_repo_snapshots r join public.portfolio_project_settings s using (github_repo_id);
revoke all on public.owner_projects from anon;
grant select on public.owner_projects to authenticated;

-- Deliberate definer view: public callers see only this explicit publication projection.
create view public.published_projects with (security_barrier = true) as
select r.github_repo_id, r.name, r.description, r.html_url, r.language, r.pushed_at,
  r.is_fork, r.is_archived, r.is_public,
  s.is_visible, s.is_featured, s.sort_order, s.slug, s.display_title, s.tagline,
  s.tech_tags, s.art_direction, s.demo_url, s.case_study_markdown
from public.github_repo_snapshots r join public.portfolio_project_settings s using (github_repo_id)
where r.is_public = true and s.is_visible = true;
grant select on public.published_projects to anon, authenticated;

create function public.claim_github_sync() returns void language plpgsql security invoker set search_path = '' as $$
declare last_attempt timestamptz;
begin
  if not public.is_portfolio_admin() then raise exception 'Owner access required'; end if;
  perform pg_advisory_xact_lock(17293841);
  select updated_at into last_attempt from public.portfolio_site_settings where key = 'sync_attempt';
  if last_attempt > now() - interval '1 minute' then raise exception 'Please wait before syncing again'; end if;
  insert into public.portfolio_site_settings(key,value) values ('sync_attempt',to_jsonb(now()))
  on conflict(key) do update set value = excluded.value, updated_at = now();
end;
$$;

create function public.replace_github_snapshot(repositories jsonb) returns void language plpgsql security invoker set search_path = '' as $$
begin
  if not public.is_portfolio_admin() then raise exception 'Owner access required'; end if;
  if jsonb_typeof(repositories) <> 'array' then raise exception 'Expected repository array'; end if;
  perform pg_advisory_xact_lock(17293842);
  update public.github_repo_snapshots set is_public = false;
  insert into public.github_repo_snapshots(github_repo_id,name,description,html_url,language,pushed_at,is_fork,is_archived,is_public)
  select github_repo_id,name,description,html_url,language,pushed_at,is_fork,is_archived,true
  from jsonb_to_recordset(repositories) as r(github_repo_id bigint,name text,description text,html_url text,language text,pushed_at timestamptz,is_fork boolean,is_archived boolean)
  on conflict(github_repo_id) do update set name=excluded.name,description=excluded.description,
    html_url=excluded.html_url,language=excluded.language,pushed_at=excluded.pushed_at,
    is_fork=excluded.is_fork,is_archived=excluded.is_archived,is_public=true,synced_at=now();
  insert into public.portfolio_project_settings(github_repo_id,slug)
  select github_repo_id,'project-' || github_repo_id from public.github_repo_snapshots where is_public
  on conflict(github_repo_id) do nothing;
  insert into public.portfolio_site_settings(key,value) values ('last_sync',to_jsonb(now()))
  on conflict(key) do update set value=excluded.value,updated_at=now();
end;
$$;
revoke all on function public.claim_github_sync(), public.replace_github_snapshot(jsonb) from public;
grant execute on function public.claim_github_sync(), public.replace_github_snapshot(jsonb) to authenticated;
commit;
