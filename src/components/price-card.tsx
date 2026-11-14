"use client";

import { useMemo, useState } from "react";

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
const input =
  "mt-1 block w-full rounded-lg border border-fog bg-white px-3 py-2.5 text-base text-ink focus:border-pine focus:outline-none";

export function PriceCard({ price, maxGuests }: { price: number; maxGuests: number }) {
  const today = new Date().toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(Math.min(2, maxGuests));
  const [requested, setRequested] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000;
    return diff > 0 ? Math.round(diff) : 0;
  }, [checkIn, checkOut]);

  return (
    <div className="overflow-hidden rounded-2xl border border-fog bg-white shadow-[0_18px_40px_-24px_rgba(20,27,23,0.35)]">
      <div className="bg-pine px-6 py-5 text-on-pine">
        <p className="tnum text-3xl font-extrabold tracking-tight">
          {fmt(price)} <span className="text-base font-normal text-on-pine-muted">a night</span>
        </p>
      </div>
      <form
        className="space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setRequested(true);
        }}
      >
        <div className="grid gap-3 min-[420px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <label className="text-sm font-semibold">
            Check in
            <input
              type="date"
              required
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setRequested(false);
                if (checkOut && e.target.value >= checkOut) setCheckOut("");
              }}
              className={input}
            />
          </label>
          <label className="text-sm font-semibold">
            Check out
            <input
              type="date"
              required
              min={checkIn ? addDays(checkIn, 1) : today}
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setRequested(false);
              }}
              className={input}
            />
          </label>
        </div>
        <label className="block text-sm font-semibold">
          Guests
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={input}>
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>

        {nights > 0 && (
          <dl className="tnum space-y-2 border-t border-fog pt-4 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-moss">
                {fmt(price)} × {nights} {nights === 1 ? "night" : "nights"}
              </dt>
              <dd>{fmt(price * nights)}</dd>
            </div>
            <div className="flex justify-between font-semibold">
              <dt>Total before taxes</dt>
              <dd>{fmt(price * nights)}</dd>
            </div>
          </dl>
        )}

        <button className="btn-press w-full rounded-full bg-marigold py-3.5 font-semibold text-ink hover:bg-marigold-deep">
          Request to book
        </button>
        {requested ? (
          <p role="status" className="rounded-lg bg-pine/10 px-4 py-3 text-[15px] text-pine">
            Booking isn&apos;t open yet in this preview, so no request was sent. Your dates stay here while you look
            around.
          </p>
        ) : (
          <p className="text-center text-sm text-moss">You won&apos;t be charged.</p>
        )}
      </form>
    </div>
  );
}
