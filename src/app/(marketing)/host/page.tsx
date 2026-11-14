import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photo } from "@/lib/listings";

export const metadata: Metadata = { title: "List your home" };

const points = [
  { title: "You set the price", body: "Choose a nightly rate and change it whenever you like." },
  { title: "You choose who stays", body: "Every stay starts as a request. Nothing is booked until you say yes." },
  { title: "You keep your calendar", body: "Block the weeks you're home. Guests only see the nights you open." },
];

export default function HostPage() {
  return (
    <>
      <section className="bg-pine text-on-pine">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-8 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
              Rent out your home while you&apos;re away
            </h1>
            <p className="mt-6 max-w-[42ch] text-lg text-on-pine-muted">
              Cabins, cottages, villas and city flats. If guests can have the whole place, it belongs here.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={photo("https://images.unsplash.com/photo-1475855581690-80accde3ae2b", 1400)}
              alt="A half-timbered house with a red tiled roof and a green lawn"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <ul className="grid gap-10 md:grid-cols-3">
          {points.map((p) => (
            <li key={p.title} className="border-t-2 border-pine pt-6">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-moss">{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 rounded-2xl bg-white px-6 py-12 sm:px-12">
          <h2 className="text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">Host sign-up opens soon</h2>
          <p className="mt-3 max-w-[56ch] text-moss">
            We&apos;re adding homes by hand while the listing tools are built. Create an account now and you&apos;ll be
            able to add your home from it once hosting opens.
          </p>
          <Link
            href="/login"
            className="btn-press mt-8 inline-block rounded-full bg-marigold px-6 py-3.5 font-semibold text-ink hover:bg-marigold-deep"
          >
            Create an account
          </Link>
        </div>
      </section>
    </>
  );
}
