"use client";

import { useEffect, useRef } from "react";

/**
 * Fireflies that start out of step and pull into sync — the coupled-oscillator
 * idea behind the "Coupling Clocks" post.
 *
 * Kuramoto model in mean-field form, so each frame is O(N):
 *   r·e^{iψ} = (1/N) Σ e^{iθ_j}
 *   θ_i += (ω_i + K(t)·r·sin(ψ − θ_i))·dt
 * ω_i ~ N(2π·0.5 Hz, 0.15·mean). K ramps from 0 to 2·K_c over 6 s, where
 * K_c = 2 / (π·g(0)) is the critical coupling for a Gaussian g — enough to
 * lock most of the swarm in ~10 s while a few stragglers keep drifting.
 *
 * Decorative only: aria-hidden, paused off screen and in hidden tabs, and a
 * single static (synchronised) frame under prefers-reduced-motion. Colours
 * come from the --accent token and are re-read when the theme class changes.
 * Clicking empty space in the enclosing <section> resets the phases.
 */

const TAU = Math.PI * 2;
const MEAN = TAU * 0.5;
const SD = 0.15 * MEAN;
const K_MAX = 2 * ((2 * SD * Math.sqrt(TAU)) / Math.PI);
const RAMP_S = 6;

/** mulberry32 — seeded, so the layout is the same on every visit. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Swarm = { x: Float32Array; y: Float32Array; r: Float32Array; w: Float32Array; th: Float32Array };

/** Jittered grid in unit coordinates: fills the area, never lines up. */
function makeSwarm(n: number, aspect: number): Swarm {
  const rand = rng(n);
  const cols = Math.max(1, Math.round(Math.sqrt(n * aspect)));
  const rows = Math.ceil(n / cols);
  const s: Swarm = {
    x: new Float32Array(n), y: new Float32Array(n), r: new Float32Array(n),
    w: new Float32Array(n), th: new Float32Array(n),
  };
  for (let i = 0; i < n; i++) {
    s.x[i] = ((i % cols) + 0.15 + 0.7 * rand()) / cols;
    s.y[i] = (Math.floor(i / cols) + 0.15 + 0.7 * rand()) / rows;
    s.r[i] = 1.5 + rand();
    // Box–Muller
    s.w[i] = MEAN + SD * Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(TAU * rand());
  }
  scatter(s, rand);
  return s;
}

function scatter(s: Swarm, rand: () => number = Math.random) {
  for (let i = 0; i < s.th.length; i++) s.th[i] = rand() * TAU;
}

function step(s: Swarm, k: number, dt: number) {
  const n = s.th.length;
  let c = 0;
  let sn = 0;
  for (let i = 0; i < n; i++) {
    c += Math.cos(s.th[i]);
    sn += Math.sin(s.th[i]);
  }
  const r = Math.hypot(c, sn) / n;
  const psi = Math.atan2(sn, c);
  for (let i = 0; i < n; i++) s.th[i] = (s.th[i] + (s.w[i] + k * r * Math.sin(psi - s.th[i])) * dt) % TAU;
}

export function FireflySync({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let swarm: Swarm | null = null;
    let w = 0;
    let h = 0;
    let rgb = "199 138 59";
    let glow: HTMLCanvasElement | null = null;
    let t = 0;
    let last = 0;
    let raf = 0;
    let onScreen = true;

    const readColour = () => {
      rgb = getComputedStyle(canvas).getPropertyValue("--accent").trim() || rgb;
      // Pre-rendered halo sprite: one drawImage per flash instead of a gradient per dot.
      glow = document.createElement("canvas");
      glow.width = glow.height = 32;
      const g = glow.getContext("2d")!;
      const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, `rgb(${rgb} / 0.55)`);
      grad.addColorStop(1, `rgb(${rgb} / 0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, 32, 32);
    };

    const draw = () => {
      if (!swarm) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgb(${rgb})`;
      for (let i = 0; i < swarm.th.length; i++) {
        const b = Math.max(0, Math.cos(swarm.th[i])) ** 8;
        const x = swarm.x[i] * w;
        const y = swarm.y[i] * h;
        if (b > 0.6 && glow) {
          ctx.globalAlpha = b;
          ctx.drawImage(glow, x - 12, y - 12, 24, 24);
        }
        ctx.globalAlpha = 0.15 + 0.85 * b;
        ctx.beginPath();
        ctx.arc(x, y, swarm.r[i], 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    /** Settle the swarm, then park it just past a flash so the still frame is calm. */
    const synchronise = () => {
      if (!swarm) return;
      for (let i = 0; i < 900; i++) step(swarm, K_MAX, 1 / 30);
      let c = 0;
      let sn = 0;
      for (let i = 0; i < swarm.th.length; i++) {
        c += Math.cos(swarm.th[i]);
        sn += Math.sin(swarm.th[i]);
      }
      const shift = 0.5 - Math.atan2(sn, c); // b ≈ 0.36: lit, but below the halo threshold
      for (let i = 0; i < swarm.th.length; i++) swarm.th[i] += shift;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 640 ? 60 : 120;
      if (!swarm || swarm.th.length !== n) {
        swarm = makeSwarm(n, w / Math.max(h, 1));
        if (still) synchronise();
      }
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      if (swarm) step(swarm, K_MAX * Math.min(1, t / RAMP_S), dt);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const run = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (still || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    readColour();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      run();
    });
    io.observe(canvas);
    const theme = new MutationObserver(() => {
      readColour();
      draw();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", run);

    // Easter egg: click empty space to scatter the phases and watch them sync again.
    const host = canvas.closest("section") ?? canvas.parentElement;
    const reset = (e: MouseEvent) => {
      if (still || !swarm || (e.target as Element).closest("a,button,h1,p")) return;
      scatter(swarm);
      t = 0;
    };
    host?.addEventListener("click", reset);

    run();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", run);
      host?.removeEventListener("click", reset);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
