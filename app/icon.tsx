import { ImageResponse } from "next/og";
import { loadLora, loraFonts } from "@/lib/ogFonts";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/* Same mark as the header: serif "AC" with the amber dot. */
export default async function Icon() {
  const lora = await loadLora(700, "AC");
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0B0F14",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span style={{ color: "#F3EFE7", fontFamily: "Lora", fontSize: 17, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1 }}>
          AC
        </span>
        <div style={{ position: "absolute", right: 3, bottom: 8, width: 4, height: 4, borderRadius: 2, background: "#C78A3B" }} />
      </div>
    ),
    { ...size, fonts: loraFonts(lora, 700) }
  );
}
