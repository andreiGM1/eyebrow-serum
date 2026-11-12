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
        teal: {
          50: "#F0F7F5",
          100: "#DCEEEA",
          200: "#B8DCD4",
          300: "#8AC4B8",
          400: "#5AA79A",
          500: "#388B7E",
          600: "#276F64",
          700: "#1E574E",
          800: "#17443E",
          900: "#133732",
          950: "#091D1A",
        },
        sage: {
          50: "#F5F8F6",
          100: "#E9F0EB",
          200: "#D3E1D7",
          300: "#B4CBBC",
          400: "#8FAFA7",
          500: "#6B9289",
          600: "#52756E",
          700: "#415C56",
          800: "#344844",
          900: "#2A3936",
        },
        evergreen: {
          50: "#EEF6F4",
          100: "#D7ECE7",
          200: "#AFD9D0",
          300: "#7FBEB2",
          400: "#4F9F92",
          500: "#328275",
          600: "#24665C",
          700: "#1B4F47",
          800: "#143C37",
          900: "#0F2E2A",
          950: "#071816",
        },
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
          50: "#F0F6F4",
          100: "#DCEEE8",
          200: "#BCDCD2",
          300: "#94C4B6",
          400: "#69A898",
          500: "#468B7C",
          600: "#346F63",
          700: "#29564D",
          800: "#1D3B35",
          900: "#122521",
          950: "#0A1513",
        },
        obsidian: {
          950: "#060E0C",
          900: "#0A1513",
          850: "#0F1E1B",
          800: "#152824",
          700: "#213C36",
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

