import { ImageResponse } from "next/og";
import { loadLora, loraFonts } from "@/lib/ogFonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Same mark as the header and favicon: serif "AC" with the amber dot. */
export default async function AppleIcon() {
  const lora = await loadLora(700, "AC");
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0B0F14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <span style={{ color: "#F3EFE7", fontFamily: "Lora", fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
          AC
        </span>
        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#C78A3B", alignSelf: "flex-end", marginBottom: 52 }} />
      </div>
    ),
    { ...size, fonts: loraFonts(lora, 700) }
  );
}
