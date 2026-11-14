import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">This page isn&apos;t here</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-moss">
        The home may have been removed, or the link has a typo. Browse what&apos;s available instead.
      </p>
      <Link
        href="/listings"
        className="btn-press mt-8 inline-block rounded-full bg-pine px-6 py-3.5 font-semibold text-on-pine hover:bg-pine-deep"
      >
        Browse homes
      </Link>
    </div>
  );
}
