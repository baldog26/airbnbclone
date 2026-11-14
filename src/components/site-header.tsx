import Link from "next/link";
import { site } from "@/config/site";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-fog bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[15px] font-semibold text-ink hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link href="/account" className="text-[15px] font-semibold hover:underline">
                Your account
              </Link>
              <form action={signOut}>
                <button className="btn-press rounded-full border border-ink/20 px-4 py-2 text-[15px] font-semibold hover:border-ink">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="btn-press rounded-full bg-pine px-5 py-2 text-[15px] font-semibold text-on-pine hover:bg-pine-deep"
            >
              Log in
            </Link>
          )}
        </div>
        <MobileNav signedIn={!!user} />
      </div>
    </header>
  );
}
