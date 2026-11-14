import Image from "next/image";
import Link from "next/link";
import { getListings, getStats, photo } from "@/lib/listings";
import { ListingGrid } from "@/components/listing-card";
import { SearchBar } from "@/components/search-bar";

const HERO_SLUG = "lakeside-boathouse-braies";

const steps = [
  {
    title: "Find a home that fits the trip",
    body: "Search by place and group size. Every listing is a whole home, so the kitchen, the porch and the quiet are yours.",
  },
  {
    title: "Send the host your dates",
    body: "Pick your nights and ask the host to confirm. You see the full nightly total before you send anything.",
  },
  {
    title: "Arrive and let yourself in",
    body: "Hosts share directions and door details before you travel. Your saved homes stay in your account for next time.",
  },
];

export default async function HomePage() {
  const [featured, stats] = await Promise.all([getListings({}, 7), getStats()]);

  return (
    <>
      {/* First viewport: pine field, the boathouse photo, and the search bar docked across the seam. */}
      <section className="relative bg-pine">
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:grid-cols-[calc((100vw-80rem)/2+33.33rem)_1fr]">
          <div className="px-4 pb-10 pt-12 text-on-pine sm:px-8 md:pb-40 md:pt-24 xl:pl-[calc((100vw-80rem)/2+2rem)]">
            <h1 className="max-w-[12ch] text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]">
              Whole homes to rent for your next trip
            </h1>
            <p className="mt-6 max-w-[38ch] text-lg text-on-pine-muted">
              <span className="tnum font-semibold text-on-pine">
                {stats.homes} homes in {stats.countries} countries
              </span>
              , from a boathouse in the Dolomites to a flat in Lisbon. No shared rooms, no strangers in the hall.
            </p>
          </div>
          <div className="hero-reveal relative min-h-[280px] md:min-h-0">
            <Image
              src={photo("https://images.unsplash.com/photo-1470770841072-f978cf4d019e", 1800)}
              alt="A timber boathouse on a still mountain lake, peaks rising behind it"
              fill
              priority
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative -mt-10 px-4 pb-0 sm:px-8 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:translate-y-1/2">
          <div className="mx-auto max-w-4xl translate-y-0 md:px-0">
            <SearchBar variant="hero" />
          </div>
        </div>
      </section>

      <section aria-labelledby="homes-heading" className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-8 md:pt-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 id="homes-heading" className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            Homes to rent now
          </h2>
          <Link href="/listings" className="font-semibold underline">
            See all {stats.homes} homes
          </Link>
        </div>
        <ListingGrid listings={featured.filter((l) => l.slug !== HERO_SLUG).slice(0, 6)} />
      </section>

      <section aria-labelledby="how-heading" className="border-y border-fog bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 lg:grid-cols-[1fr_2fr]">
          <h2 id="how-heading" className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            How renting works
          </h2>
          <ol className="grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="tnum text-5xl font-extrabold text-pine/25" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold leading-snug">{s.title}</h3>
                <p className="mt-2 text-moss">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="host-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="photo-frame relative aspect-[5/4] overflow-hidden rounded-2xl">
            <Image
              src={photo("https://images.unsplash.com/photo-1416331108676-a22ccb276e35", 1400)}
              alt="A whitewashed house with arched windows around a lit pool at dusk"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-md">
            <h2 id="host-heading" className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Rent out your home when you&apos;re away
            </h2>
            <p className="mt-4 text-lg text-moss">
              List a cabin, a cottage or a city flat. You set the nightly price, choose who stays, and keep your calendar.
            </p>
            <Link
              href="/host"
              className="btn-press mt-8 inline-block rounded-full bg-pine px-6 py-3.5 font-semibold text-on-pine hover:bg-pine-deep"
            >
              List your home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
