import type { Metadata } from "next";
import Link from "next/link";
import { getListings, PROPERTY_TYPES } from "@/lib/listings";
import { ListingGrid } from "@/components/listing-card";
import { SearchBar } from "@/components/search-bar";

export const metadata: Metadata = { title: "Homes" };

type Params = { q?: string; type?: string; guests?: string };

const typeLabel: Record<string, string> = {
  cabin: "Cabins",
  house: "Houses",
  villa: "Villas",
  cottage: "Cottages",
  apartment: "Apartments",
};

export default async function ListingsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const guests = Number(params.guests) || undefined;
  const listings = await getListings({ q: params.q, type: params.type, guests });

  const hrefFor = (type?: string) => {
    const sp = new URLSearchParams();
    if (params.q) sp.set("q", params.q);
    if (params.guests) sp.set("guests", params.guests);
    if (type) sp.set("type", type);
    const s = sp.toString();
    return s ? `/listings?${s}` : "/listings";
  };

  const heading = params.q ? `Homes matching “${params.q}”` : "All homes";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-8">
      <SearchBar q={params.q} guests={params.guests} type={params.type} />

      <nav aria-label="Home type" className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {[undefined, ...PROPERTY_TYPES].map((t) => {
          const active = (params.type ?? undefined) === t;
          return (
            <Link
              key={t ?? "all"}
              href={hrefFor(t)}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors ${
                active ? "border-pine bg-pine text-on-pine" : "border-fog bg-white text-ink hover:border-ink"
              }`}
            >
              {t ? typeLabel[t] : "All types"}
            </Link>
          );
        })}
      </nav>

      <div className="mb-8 mt-10 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{heading}</h1>
        <p className="tnum text-moss">
          {listings.length} {listings.length === 1 ? "home" : "homes"}
        </p>
      </div>

      {listings.length > 0 ? (
        <ListingGrid listings={listings} />
      ) : (
        <div className="rounded-2xl border border-dashed border-fog bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-semibold">No homes match these filters</h2>
          <p className="mx-auto mt-2 max-w-md text-moss">
            Try a nearby region, fewer guests, or a different home type.
          </p>
          <Link href="/listings" className="mt-6 inline-block font-semibold underline">
            Clear filters
          </Link>
        </div>
      )}
    </div>
  );
}
