"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthState } from "@/app/auth/actions";

const field =
  "mt-1.5 block w-full rounded-lg border border-fog bg-white px-3.5 py-3 text-base text-ink placeholder:text-moss/80 focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/20";

export function AuthForm({ next, linkError }: { next: string; linkError: boolean }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signInState, signInAction, signingIn] = useActionState<AuthState, FormData>(signIn, {});
  const [signUpState, signUpAction, signingUp] = useActionState<AuthState, FormData>(signUp, {});
  const state = mode === "signin" ? signInState : signUpState;
  const pending = signingIn || signingUp;

  return (
    <div>
      <div role="tablist" aria-label="Account" className="grid grid-cols-2 rounded-full border border-fog bg-white p-1">
        {(["signin", "signup"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full py-2.5 text-[15px] font-semibold transition-colors ${
              mode === m ? "bg-pine text-on-pine" : "text-moss hover:text-ink"
            }`}
          >
            {m === "signin" ? "Log in" : "Create account"}
          </button>
        ))}
      </div>

      {linkError && mode === "signin" && !state.error && (
        <p role="alert" className="mt-6 rounded-lg bg-marigold/20 px-4 py-3 text-[15px]">
          That confirmation link has expired or was already used. Log in, or create your account again.
        </p>
      )}

      <form action={mode === "signin" ? signInAction : signUpAction} className="mt-6 space-y-5" noValidate>
        <input type="hidden" name="next" value={next} />
        {mode === "signup" && (
          <label className="block text-[15px] font-semibold">
            Full name
            <input name="full_name" autoComplete="name" className={field} />
          </label>
        )}
        <label className="block text-[15px] font-semibold">
          Email
          <input name="email" type="email" autoComplete="email" required className={field} />
        </label>
        <label className="block text-[15px] font-semibold">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={mode === "signup" ? 8 : undefined}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className={field}
          />
          {mode === "signup" && <span className="mt-1.5 block text-sm font-normal text-moss">At least 8 characters.</span>}
        </label>

        {state.error && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-[15px] text-red-800">
            {state.error}
          </p>
        )}
        {state.message && (
          <p role="status" className="rounded-lg bg-pine/10 px-4 py-3 text-[15px] text-pine">
            {state.message}
          </p>
        )}

        <button
          disabled={pending}
          className="btn-press w-full rounded-full bg-marigold py-3.5 font-semibold text-ink hover:bg-marigold-deep disabled:opacity-60"
        >
          {pending ? "One moment…" : mode === "signin" ? "Log in" : "Create account"}
        </button>
      </form>
    </div>
  );
}
