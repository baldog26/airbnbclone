-- Applied to the Supabase project via the Supabase MCP on 2026-11-14.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  description text not null,
  city text not null,
  region text,
  country text not null,
  property_type text not null check (property_type in ('cabin','house','villa','apartment','cottage')),
  guests int not null check (guests > 0),
  bedrooms int not null check (bedrooms >= 0),
  beds int not null check (beds > 0),
  baths numeric(3,1) not null check (baths >= 0),
  price_per_night int not null check (price_per_night > 0),
  amenities text[] not null default '{}',
  images text[] not null default '{}',
  host_name text not null,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now()
);
comment on table public.listings is 'Rental listings. Seeded rows are SAMPLE data for development.';
comment on column public.listings.price_per_night is 'Whole US dollars per night.';

create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);
create index favorites_listing_id_idx on public.favorites(listing_id);

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.favorites enable row level security;

create policy "Listings are public" on public.listings for select to anon, authenticated using (true);
create policy "Read own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "Update own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "Read own favorites" on public.favorites for select to authenticated using ((select auth.uid()) = user_id);
create policy "Add own favorites" on public.favorites for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Remove own favorites" on public.favorites for delete to authenticated using ((select auth.uid()) = user_id);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
