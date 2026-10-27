/**
 * Google Fonts for build-time images (icons, OG cards). Satori — the renderer
 * behind next/og — cannot read woff2, and Google Fonts serves TrueType to a
 * request without a browser User-Agent. `text` subsets the font to just the
 * glyphs drawn. Returns null when offline, so the image falls back to Satori's
 * default sans rather than failing the build.
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(cssUrl)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

export const loadLora = (weight: number, text: string) => loadGoogleFont("Lora", weight, text);

type Font = { name: string; data: ArrayBuffer; weight: 400 | 500 | 600 | 700; style: "normal" };

/** ImageResponse `fonts` from whichever loads succeeded (undefined if none did). */
export function fontList(...fonts: [string, ArrayBuffer | null, Font["weight"]][]): Font[] | undefined {
  const list = fonts
    .filter((f): f is [string, ArrayBuffer, Font["weight"]] => f[1] !== null)
    .map(([name, data, weight]) => ({ name, data, weight, style: "normal" as const }));
  return list.length ? list : undefined;
}

export const loraFonts = (data: ArrayBuffer | null, weight: 700) => fontList(["Lora", data, weight]);
