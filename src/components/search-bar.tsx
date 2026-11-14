import { Search } from "lucide-react";

type Props = { q?: string; guests?: string; type?: string; variant?: "hero" | "page" };

export function SearchBar({ q = "", guests = "", type, variant = "page" }: Props) {
  const shell =
    variant === "hero"
      ? "bg-white shadow-[0_18px_40px_-18px_rgba(20,27,23,0.45)]"
      : "bg-white border border-fog";
  return (
    <form
      action="/listings"
      role="search"
      className={`grid gap-2 rounded-2xl p-2 sm:grid-cols-[1fr_180px_auto] sm:rounded-full ${shell}`}
    >
      {type && <input type="hidden" name="type" value={type} />}
      <label className="flex flex-col rounded-full px-5 py-2.5 focus-within:bg-paper">
        <span className="text-sm font-semibold">Where</span>
        <input
          name="q"
          defaultValue={q}
          placeholder="City, region or country"
          className="bg-transparent text-base text-ink placeholder:text-moss focus:outline-none"
        />
      </label>
      <label className="flex flex-col rounded-full px-5 py-2.5 focus-within:bg-paper sm:border-l sm:border-fog">
        <span className="text-sm font-semibold">Guests</span>
        <select name="guests" defaultValue={guests} className="bg-transparent text-base text-ink focus:outline-none">
          <option value="">Any number</option>
          {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
            <option key={n} value={n}>
              {n}+ {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </label>
      <button className="btn-press flex items-center justify-center gap-2 rounded-full bg-marigold px-7 py-3.5 font-semibold text-ink hover:bg-marigold-deep">
        <Search size={18} aria-hidden strokeWidth={2.5} />
        Search homes
      </button>
    </form>
  );
}
