# Threshold: whole-home rentals (Next.js + Supabase)

A short-term rental site: marketing pages, browsable listings with search and filters, a details page per home, and email/password login through Supabase Auth with saved homes.

"Threshold" is a placeholder brand name. Change it in `src/config/site.ts`.

## Stack
- Next.js 15 (App Router, Server Components, Server Actions), Tailwind CSS v4
- Supabase: Postgres + Row Level Security + Auth, via `@supabase/ssr` cookie sessions

## Run locally
```bash
cp .env.example .env.local   # fill in your Supabase URL and publishable key
npm install
npm run dev
```

## Pages
| Route | What it is |
|---|---|
| `/` | Marketing home: hero with search, featured homes, how renting works, host band |
| `/listings` | All homes; filter with `?q=` (place), `?guests=`, `?type=` |
| `/listings/[slug]` | Home details: gallery, facts, amenities, host, price card with a nightly total |
| `/login` | Log in or create an account |
| `/account` | Signed-in only: your saved homes |
| `/host`, `/about` | Marketing shell pages |

## Database
Schema is in `supabase/migrations/`. Tables: `listings` (public read), `profiles` (created by trigger on sign-up, owner-only), `favorites` (owner-only).

**The 12 seeded listings are sample data**: the hosts, prices and descriptions are made up for development. Photos are from Unsplash.

## Not built yet
- Booking: "Request to book" shows the nightly total but doesn't send or store a request.
- Host tools: `/host` is a marketing page only.
