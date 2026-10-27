import { ImageResponse } from "next/og";
import { fontList, loadGoogleFont } from "@/lib/ogFonts";

/*
 * 1200×630 social card in the site's look: ink ground, a serif headline, and
 * a static frame of the homepage's firefly swarm — mostly in phase, so it
 * reads as "synchronised". Dark-theme token values, inlined because Satori
 * can't read CSS variables.
 */
const INK = "#0B0F14";
const CREAM = "#F3EFE7";
const MUTED = "#8A8F98";
const AMBER = "199, 138, 59";

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Jittered grid over the right of the card; brightness from a near-synchronised phase. */
function dots() {
  const rand = rng(42);
  const cols = 12;
  const rows = 8;
  const out: { x: number; y: number; r: number; b: number }[] = [];
  for (let i = 0; i < cols * rows; i++) {
    const x = 560 + ((i % cols) + 0.15 + 0.7 * rand()) * (640 / cols);
    const y = ((Math.floor(i / cols) + 0.15 + 0.7 * rand()) * 630) / rows;
    const phase = (rand() - 0.5) * (rand() < 0.85 ? 0.9 : 6); // most in step, a few stragglers
    out.push({ x, y, r: 2.5 + 1.5 * rand(), b: Math.max(0, Math.cos(phase)) ** 8 });
  }
  return out;
}

export async function ogCard({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer: string;
}) {
  const [lora, mono] = await Promise.all([
    loadGoogleFont("Lora", 600, title),
    loadGoogleFont("JetBrains Mono", 400, `${eyebrow}${footer}`.toUpperCase() + `${eyebrow}${footer}`),
  ]);
  const size = title.length > 70 ? 54 : title.length > 45 ? 64 : 76;

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", background: INK, position: "relative" }}>
        {dots().map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x - d.r,
              top: d.y - d.r,
              width: d.r * 2,
              height: d.r * 2,
              borderRadius: d.r,
              // Fade towards the text column, like the hero's CSS mask.
              background: `rgba(${AMBER}, ${(0.15 + 0.85 * d.b) * Math.min(1, (d.x - 520) / 420)})`,
              boxShadow: d.b > 0.6 ? `0 0 ${10 + 8 * d.b}px rgba(${AMBER}, ${0.5 * d.b})` : "none",
            }}
          />
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 22, letterSpacing: 5, color: MUTED }}>
            {eyebrow.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 820,
              fontFamily: "Lora",
              fontWeight: 600,
              fontSize: size,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: CREAM,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "JetBrains Mono", fontSize: 22, color: MUTED }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: `rgb(${AMBER})` }} />
            {footer}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontList(["Lora", lora, 600], ["JetBrains Mono", mono, 400]),
    }
  );
}
