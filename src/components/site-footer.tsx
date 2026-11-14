import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-pine text-on-pine">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-4 text-on-pine-muted">{site.description}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h2 className="font-semibold">Explore</h2>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-on-pine-muted hover:text-on-pine hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold">Your trips</h2>
          <Link href="/login" className="text-on-pine-muted hover:text-on-pine hover:underline">Log in</Link>
          <Link href="/account" className="text-on-pine-muted hover:text-on-pine hover:underline">Saved homes</Link>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <p className="border-t border-white/10 py-6 text-sm text-on-pine-muted">
          Photos from Unsplash. Listings shown are sample data.
        </p>
      </div>
    </footer>
  );
}
