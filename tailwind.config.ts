import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: "#FAF7EE",
          100: "#F4ECD4",
          200: "#E9D9AB",
          300: "#DEC581",
          400: "#D3B258",
          500: "#C5A03C",
          600: "#9E7E2C",
          700: "#775D1F",
          800: "#503D13",
          900: "#2B2008",
        },
        botanical: {
          50: "#F3F7F4",
          100: "#E2EDE5",
          200: "#C5DBCB",
          300: "#9EC1A8",
          400: "#70A17E",
          500: "#4D835C",
          600: "#3B6748",
          700: "#2F513A",
          800: "#1A2B20",
          900: "#0D1711",
          950: "#070C09",
        },
        obsidian: {
          950: "#070908",
          900: "#0D1110",
          850: "#131816",
          800: "#1A201E",
          700: "#28322F",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

