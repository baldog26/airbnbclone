import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/database";
import { photo, placeName } from "@/lib/listings";

export function ListingCard({ listing, priority = false }: { listing: Listing; priority?: boolean }) {
  return (
    <Link href={`/listings/${listing.slug}`} className="group block rounded-xl">
      <div className="photo-frame relative aspect-[4/3] overflow-hidden rounded-xl bg-fog">
        <Image
          src={photo(listing.images[0], 900)}
          alt={listing.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug group-hover:underline">{listing.title}</h3>
          <p className="mt-0.5 truncate text-[15px] text-moss">{placeName(listing)}</p>
          <p className="mt-0.5 text-[15px] text-moss">
            Sleeps {listing.guests}, {listing.bedrooms} {listing.bedrooms === 1 ? "bedroom" : "bedrooms"}
          </p>
        </div>
        <p className="tnum shrink-0 text-right">
          <span className="font-semibold">${listing.price_per_night}</span>
          <span className="block text-sm text-moss">a night</span>
        </p>
      </div>
    </Link>
  );
}

export function ListingGrid({ listings }: { listings: Listing[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((l, i) => (
        <li key={l.id}>
          <ListingCard listing={l} priority={i < 3} />
        </li>
      ))}
    </ul>
  );
}
