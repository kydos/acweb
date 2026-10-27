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
      /* Golden-ratio spacing scale, base 16px, each step x1.618.
         Used for the site's vertical rhythm so block spacing compounds
         consistently instead of being picked per component. */
      spacing: {
        "phi-xs": "0.625rem",  //  10px
        "phi-sm": "1rem",      //  16px
        "phi-md": "1.625rem",  //  26px
        "phi-lg": "2.625rem",  //  42px
        "phi-xl": "4.25rem",   //  68px
        "phi-2xl": "6.875rem", // 110px
      },
      /* Hero rail: content is 1104px at the 1152px shell, so a phi-lg gutter
         leaves 1062px, split phi:1 as 656 / 406. */
      gridTemplateColumns: {
        "hero-phi": "minmax(0, 1fr) 406px",
      },
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
      /* Semantic tokens. Values live in app/globals.css as RGB channels so
         Tailwind's opacity modifiers (`bg-accent/10`) keep working, and the
         FireflySync canvas reads the same variables at runtime.
         `accent` is the one accent: primary CTA, stat numbers, the animation,
         and link hover. Nothing else should be amber. */
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          fg: "rgb(var(--on-accent) / <alpha-value>)",
        },
        cream: "#F3EFE7",
        sand: "#C9C2B8",
        fog: "#A7AFBA",
        ash: "#8E97A3",
        ink: {
          DEFAULT: "#0B0F14",  // page ground
          card: "#121821",     // raised surface (cards, inputs)
          shell: "#2B3545",    // interactive outlines (btn-ghost)
          /* Hairline for static outlines. #1F2937 sat at 1.21 against the card,
             which made bordered boxes all but invisible on the dark ground —
             the WCAG ratio understates how weak a hairline reads down here.
             1.40 matches how the light-mode stone-200 hairline reads, and stays
             just under `shell` so interactive outlines remain the stronger cue. */
          wire: "#293345",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            a: {
              color: "rgb(var(--fg))",
              textDecoration: "underline",
              textDecorationColor: "rgb(var(--muted) / 0.5)",
              textUnderlineOffset: "3px",
              "&:hover": {
                color: "rgb(var(--accent))",
                textDecorationColor: "rgb(var(--accent))",
              },
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
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
