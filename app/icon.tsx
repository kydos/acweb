import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0a0a0f",
          borderRadius: 6,
          border: "1.5px solid rgba(129,140,248,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Lightning bolt — same path as the header badge */}
        <svg
          width="12"
          height="24"
          viewBox="0 0 12 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 0 L0 14 H6 L2 24 L12 10 H6 Z" fill="#818cf8" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
