import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ListingGrid } from "@/components/listing-card";
import type { Listing } from "@/types/database";

export const metadata: Metadata = { title: "Your account" };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const [{ data: profile }, { data: favorites }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    supabase
      .from("favorites")
      .select("created_at, listings(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const saved = (favorites ?? []).map((f) => f.listings).filter((l): l is Listing => !!l);
  const name = profile?.full_name || user.email;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-8">
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Hello, {name}</h1>
      <p className="mt-2 text-moss">Signed in as {user.email}</p>

      <section aria-labelledby="saved" className="mt-14">
        <h2 id="saved" className="mb-8 text-2xl font-extrabold tracking-[-0.02em]">
          Saved homes
        </h2>
        {saved.length > 0 ? (
          <ListingGrid listings={saved} />
        ) : (
          <div className="rounded-2xl border border-dashed border-fog bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-semibold">You haven&apos;t saved any homes yet</h3>
            <p className="mx-auto mt-2 max-w-md text-moss">
              Open a home and choose Save home to keep it here.
            </p>
            <Link
              href="/listings"
              className="btn-press mt-6 inline-block rounded-full bg-pine px-6 py-3 font-semibold text-on-pine hover:bg-pine-deep"
            >
              Browse homes
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
