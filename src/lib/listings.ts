import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/types/database";

export const PROPERTY_TYPES = ["cabin", "house", "villa", "cottage", "apartment"] as const;

export type ListingFilters = { q?: string; type?: string; guests?: number };

export async function getListings(filters: ListingFilters = {}, limit?: number): Promise<Listing[]> {
  const supabase = await createClient();
  let query = supabase.from("listings").select("*").order("created_at", { ascending: true });

  const q = filters.q?.trim().replace(/[%,()]/g, " ");
  if (q) {
    query = query.or(`city.ilike.%${q}%,region.ilike.%${q}%,country.ilike.%${q}%,title.ilike.%${q}%`);
  }
  if (filters.type && (PROPERTY_TYPES as readonly string[]).includes(filters.type)) {
    query = query.eq("property_type", filters.type);
  }
  if (filters.guests && filters.guests > 0) query = query.gte("guests", filters.guests);
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Could not load homes: ${error.message}`);
  return data;
}

export async function getListing(slug: string): Promise<Listing | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("listings").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`Could not load this home: ${error.message}`);
  return data;
}

export async function getStats() {
  const supabase = await createClient();
  const { data } = await supabase.from("listings").select("country");
  const rows = data ?? [];
  return { homes: rows.length, countries: new Set(rows.map((r) => r.country)).size };
}

export async function getFavoriteIds(): Promise<Set<string>> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Set();
  const { data } = await supabase.from("favorites").select("listing_id").eq("user_id", user.id);
  return new Set((data ?? []).map((f) => f.listing_id));
}

export function placeName(l: Pick<Listing, "city" | "region" | "country">) {
  return [l.city, l.region, l.country].filter(Boolean).join(", ");
}

export function photo(url: string, w = 1200) {
  return `${url}?auto=format&fit=crop&w=${w}&q=75`;
}
