"use client";

import { useEffect } from "react";

/**
 * Fades `[data-reveal]` blocks in once (opacity + 8px, 400ms) as they scroll
 * into view. Only blocks that start below the fold are hidden, and only once
 * this has run — so content is never invisible without JS, nothing already on
 * screen flickers, and the hero (the LCP) is never touched. Under
 * prefers-reduced-motion it does nothing at all.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-reveal", "shown");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.setAttribute("data-reveal", "hidden");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
