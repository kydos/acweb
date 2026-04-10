/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "'Noto Sans JP'",
          "'Noto Sans KR'",
          "'Noto Sans SC'",
          "sans-serif",
        ],
        serif: ["var(--font-lora)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#C78A3B",
          hover: "#E0A95A",
          dark: "#C78A3B",
        },
        sky: "#8BC3EB",
        azure: "#5FA3D6",
        cream: "#F3EFE7",
        sand: "#C9C2B8",
        fog: "#A7AFBA",
        ash: "#8E97A3",
        ink: {
          DEFAULT: "#0B0F14",
          card: "#121821",
          shell: "#2B3545",
          wire: "#1F2937",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            a: {
              color: "#5FA3D6",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              "&:hover": { color: "#8BC3EB" },
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
        invert: {
          css: {
            a: {
              color: "#8BC3EB",
              "&:hover": { color: "#5FA3D6" },
            },
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up-fade": "slideUpFade 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUpFade: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
