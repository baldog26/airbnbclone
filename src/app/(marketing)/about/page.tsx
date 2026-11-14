import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 md:py-24">
      <div className="max-w-[68ch]">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
          A place to rent whole homes, nothing shared
        </h1>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-moss">
          <p>
            {site.name} lists homes that guests get to themselves: a cabin with its own stove, a farmhouse with a long
            kitchen table, a flat with the morning light. No rooms in someone else&apos;s house, no shared bathrooms.
          </p>
          <p>
            Every listing shows the full nightly price, how many people it sleeps, and what&apos;s in the home, so you
            can compare places without opening a dozen tabs.
          </p>
          <p>
            We&apos;re starting small, with a short list of homes in a handful of countries. More will follow as hosts
            join.
          </p>
        </div>
        <Link
          href="/listings"
          className="btn-press mt-10 inline-block rounded-full bg-pine px-6 py-3.5 font-semibold text-on-pine hover:bg-pine-deep"
        >
          Browse homes
        </Link>
      </div>
    </div>
  );
}
