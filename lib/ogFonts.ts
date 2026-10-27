/**
 * Lora for build-time images (icons, OG cards). Satori — the renderer behind
 * next/og — cannot read woff2, and Google Fonts serves TrueType to a request
 * without a browser User-Agent. `text` subsets the font to just the glyphs
 * drawn. Returns null when offline, so the image falls back to Satori's
 * default sans rather than failing the build.
 */
export async function loadLora(weight: 400 | 600 | 700, text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Lora:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(cssUrl)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

export function loraFonts(data: ArrayBuffer | null, weight: 400 | 600 | 700) {
  return data ? [{ name: "Lora", data, weight, style: "normal" as const }] : undefined;
}
