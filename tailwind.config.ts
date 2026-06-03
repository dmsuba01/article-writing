// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7D4E57",
          dark: "#5C3640",
          light: "#A67580",
        },
        accent: "#C4A4A9",
        bg: {
          DEFAULT: "#F5F0EB",
          card: "#FFFFFF",
          muted: "#EDE8E3",
        },
        text: {
          DEFAULT: "#1A1A1A",
          muted: "#6B6B6B",
          light: "#9B9B9B",
        },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body: ["Palatino Linotype", "Book Antiqua", "Palatino", "serif"],
        sans: ["'Gill Sans'", "Optima", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 20px rgba(125, 78, 87, 0.08)",
        "card-hover": "0 8px 40px rgba(125, 78, 87, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
