"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { signOut } from "@/app/auth/actions";

export function MobileNav({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="-mr-2 grid size-11 place-items-center rounded-full"
      >
        {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-16 z-40 border-b border-fog bg-paper px-4 pb-6 pt-2 shadow-[0_12px_24px_-12px_rgba(20,27,23,0.25)]">
          <nav aria-label="Mobile" className="flex flex-col">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className="border-b border-fog py-4 text-lg font-semibold">
                {item.label}
              </Link>
            ))}
            {signedIn ? (
              <>
                <Link href="/account" onClick={close} className="border-b border-fog py-4 text-lg font-semibold">
                  Your account
                </Link>
                <form action={signOut} className="pt-4">
                  <button className="w-full rounded-full border border-ink/20 py-3 font-semibold">Log out</button>
                </form>
              </>
            ) : (
              <Link href="/login" onClick={close} className="mt-4 rounded-full bg-pine py-3 text-center font-semibold text-on-pine">
                Log in
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
