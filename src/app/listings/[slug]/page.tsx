import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  Car,
  Coffee,
  DoorOpen,
  Flame,
  Laptop,
  Mountain,
  PawPrint,
  Snowflake,
  Trees,
  Users,
  UtensilsCrossed,
  Waves,
  WashingMachine,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { getFavoriteIds, getListing, photo, placeName } from "@/lib/listings";
import { createClient } from "@/lib/supabase/server";
import { FavoriteButton } from "@/components/favorite-button";
import { PriceCard } from "@/components/price-card";

type Props = { params: Promise<{ slug: string }> };

const amenityIcon: [RegExp, LucideIcon][] = [
  [/wifi/i, Wifi],
  [/pool|lake|pond|boat|sea/i, Waves],
  [/kitchen/i, UtensilsCrossed],
  [/fire|stove/i, Flame],
  [/parking/i, Car],
  [/air conditioning/i, Snowflake],
  [/hot tub/i, Bath],
  [/washer/i, WashingMachine],
  [/workspace/i, Laptop],
  [/pets/i, PawPrint],
  [/garden|yard|porch|terrace/i, Trees],
  [/coffee/i, Coffee],
  [/ski|view/i, Mountain],
];
const iconFor = (a: string) => amenityIcon.find(([re]) => re.test(a))?.[1] ?? DoorOpen;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) return { title: "Home not found" };
  return {
    title: listing.title,
    description: listing.summary,
    openGraph: { images: [photo(listing.images[0], 1200)] },
  };
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();

  const supabase = await createClient();
  const [
    {
      data: { user },
    },
    favoriteIds,
  ] = await Promise.all([supabase.auth.getUser(), getFavoriteIds()]);

  const [lead, ...rest] = listing.images;
  const facts = [
    { icon: Users, text: `Sleeps ${listing.guests}` },
    { icon: DoorOpen, text: `${listing.bedrooms} ${listing.bedrooms === 1 ? "bedroom" : "bedrooms"}` },
    { icon: BedDouble, text: `${listing.beds} ${listing.beds === 1 ? "bed" : "beds"}` },
    { icon: Bath, text: `${Number(listing.baths)} ${Number(listing.baths) === 1 ? "bathroom" : "bathrooms"}` },
  ];

  return (
    <article className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-8">
      <Link href="/listings" className="text-[15px] font-semibold text-moss hover:text-ink hover:underline">
        Back to all homes
      </Link>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-5xl">{listing.title}</h1>
          <p className="mt-2 text-lg text-moss">{placeName(listing)}</p>
        </div>
        {user ? (
          <FavoriteButton listingId={listing.id} slug={listing.slug} saved={favoriteIds.has(listing.id)} />
        ) : (
          <Link
            href={`/login?next=${encodeURIComponent(`/listings/${listing.slug}`)}`}
            className="btn-press rounded-full border border-ink/20 px-4 py-2 text-[15px] font-semibold hover:border-ink"
          >
            Log in to save
          </Link>
        )}
      </header>

      <div className="mt-8 grid gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2 sm:gap-3 md:h-[520px]">
        <div className="photo-frame relative aspect-[4/3] overflow-hidden sm:col-span-3 sm:row-span-2 sm:aspect-auto">
          <Image
            src={photo(lead, 1800)}
            alt={`${listing.title}, main photo`}
            fill
            priority
            sizes="(min-width: 640px) 75vw, 100vw"
            className="object-cover"
          />
        </div>
        {rest.slice(0, 2).map((src, i) => (
          <div key={src} className="photo-frame relative hidden overflow-hidden sm:block">
            <Image
              src={photo(src, 800)}
              alt={`${listing.title}, photo ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 border-b border-fog pb-8">
            {facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 font-semibold">
                <Icon size={20} aria-hidden className="text-pine" />
                {text}
              </li>
            ))}
          </ul>

          <section className="border-b border-fog py-8">
            <p className="text-xl font-semibold leading-snug">{listing.summary}</p>
            <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-moss">{listing.description}</p>
          </section>

          <section aria-labelledby="amenities" className="border-b border-fog py-8">
            <h2 id="amenities" className="text-2xl font-extrabold tracking-[-0.02em]">
              What&apos;s in the home
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {listing.amenities.map((a) => {
                const Icon = iconFor(a);
                return (
                  <li key={a} className="flex items-center gap-3">
                    <Icon size={22} aria-hidden className="text-pine" />
                    {a}
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="host" className="py-8">
            <h2 id="host" className="text-2xl font-extrabold tracking-[-0.02em]">
              Your host
            </h2>
            <div className="mt-5 flex items-center gap-4">
              <span
                aria-hidden
                className="grid size-14 place-items-center rounded-full bg-pine text-xl font-extrabold text-on-pine"
              >
                {listing.host_name.charAt(0)}
              </span>
              <div>
                <p className="text-lg font-semibold">{listing.host_name}</p>
                <p className="text-moss">Hosts this home in {listing.city}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <PriceCard price={listing.price_per_night} maxGuests={listing.guests} />
        </aside>
      </div>
    </article>
  );
}
