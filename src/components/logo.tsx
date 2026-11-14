import Link from "next/link";
import { site } from "@/config/site";

// A doorway: two jambs and a lintel, the threshold left open.
export function Logo({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const color = tone === "light" ? "text-on-pine" : "text-pine";
  return (
    <Link href="/" className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${color}`}>
      <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true" fill="none">
        <path d="M3 23V3h16v20" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M0 23h22" stroke="#F2B43A" strokeWidth="3" />
      </svg>
      <span className="text-lg">{site.name}</span>
    </Link>
  );
}
