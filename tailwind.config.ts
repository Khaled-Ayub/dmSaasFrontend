import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyUI Konfiguration
  daisyui: {
    themes: [
      {
        // Eigenes DMAuto Theme
        dmauto: {
          "primary": "#3b82f6",          // Blau
          "primary-content": "#ffffff",
          "secondary": "#8b5cf6",         // Violett
          "secondary-content": "#ffffff",
          "accent": "#f97316",            // Orange
          "accent-content": "#ffffff",
          "neutral": "#1f2937",           // Dark Gray
          "neutral-content": "#f3f4f6",
          "base-100": "#ffffff",          // Weiß
          "base-200": "#f8fafc",          // Sehr helles Grau
          "base-300": "#e2e8f0",          // Helles Grau
          "base-content": "#1e293b",      // Dunkelgrau Text
          "info": "#0ea5e9",              // Sky Blue
          "info-content": "#ffffff",
          "success": "#22c55e",           // Grün
          "success-content": "#ffffff",
          "warning": "#eab308",           // Gelb
          "warning-content": "#1f2937",
          "error": "#ef4444",             // Rot
          "error-content": "#ffffff",
        },
      },
      {
        // Dark Theme
        dmautodark: {
          "primary": "#60a5fa",           // Hellblau
          "primary-content": "#1e293b",
          "secondary": "#a78bfa",         // Hell-Violett
          "secondary-content": "#1e293b",
          "accent": "#fb923c",            // Hell-Orange
          "accent-content": "#1e293b",
          "neutral": "#374151",           // Gray
          "neutral-content": "#f9fafb",
          "base-100": "#0f172a",          // Sehr dunkel
          "base-200": "#1e293b",          // Dunkel
          "base-300": "#334155",          // Mittel-Dunkel
          "base-content": "#f1f5f9",      // Heller Text
          "info": "#38bdf8",
          "info-content": "#1e293b",
          "success": "#4ade80",
          "success-content": "#1e293b",
          "warning": "#facc15",
          "warning-content": "#1e293b",
          "error": "#f87171",
          "error-content": "#1e293b",
        },
      },
      "light",
      "dark",
      "cupcake",
      "corporate",
      "synthwave",
      "cyberpunk",
      "night",
      "coffee",
    ],
    darkTheme: "dmautodark",
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
} satisfies Config;
