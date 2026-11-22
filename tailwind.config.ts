import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--sc-canvas, #0B0B0D)",
        foreground: "var(--sc-ink, #F8F7F4)",
        surface: "var(--sc-surface, #141414)",
        "surface-strong": "var(--surface-strong, #1e1e24)",
        "ink-soft": "var(--sc-ink-soft, #A1A1AA)",
        line: "var(--line, rgba(255, 255, 255, 0.12))",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "terminal-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "terminal-blink": "terminal-blink 1.06s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
