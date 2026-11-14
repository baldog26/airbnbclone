import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthForm } from "./auth-form";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next = "/account", error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect(next.startsWith("/") ? next : "/account");

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-8 md:grid-cols-2 md:py-20">
      <div className="max-w-md">
        <h1 className="text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">Log in to save homes</h1>
        <p className="mt-4 text-lg text-moss">Keep a shortlist of places for your next trip and come back to it on any device.</p>
        <div className="mt-10">
          <AuthForm next={next} linkError={error === "link"} />
        </div>
      </div>
      <div className="photo-frame relative hidden min-h-[520px] overflow-hidden rounded-2xl md:block">
        <Image
          src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=75"
          alt="A small red-roofed hut alone on a grassy hillside"
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
