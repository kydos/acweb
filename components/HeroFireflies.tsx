"use client";

import dynamic from "next/dynamic";

/*
 * Client-only, and split into its own chunk that loads after hydration, so the
 * animation never competes with the headline for LCP. The wrapper is sized by
 * the hero and absolutely positioned, so the late canvas causes no layout shift.
 */
const FireflySync = dynamic(() => import("./FireflySync").then((m) => m.FireflySync), {
  ssr: false,
});

export function HeroFireflies() {
  return (
    <div aria-hidden="true" className="hero-fireflies pointer-events-none absolute inset-0 -z-10">
      <FireflySync className="h-full w-full" />
    </div>
  );
}
