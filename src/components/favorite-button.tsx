"use client";

import { useOptimistic, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/app/auth/actions";

export function FavoriteButton({ listingId, slug, saved }: { listingId: string; slug: string; saved: boolean }) {
  const [optimisticSaved, setOptimistic] = useOptimistic(saved);
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-pressed={optimisticSaved}
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          setOptimistic(!optimisticSaved);
          await toggleFavorite(listingId, slug);
        })
      }
      className="btn-press inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-[15px] font-semibold hover:border-ink"
    >
      <Heart
        size={18}
        aria-hidden
        className={optimisticSaved ? "fill-marigold-deep text-marigold-deep" : "text-ink"}
      />
      {optimisticSaved ? "Saved" : "Save home"}
    </button>
  );
}
