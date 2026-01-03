import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Moderne, professionelle Font-Kombination
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyUI Konfiguration mit Premium-Look
  daisyui: {
    themes: [
      {
        // Elegantes Light Theme - Soft & Professional
        dmauto: {
          "primary": "#6366f1",           // Indigo - Modern & Trustworthy
          "primary-content": "#ffffff",
          "secondary": "#ec4899",         // Pink - Energetisch
          "secondary-content": "#ffffff",
          "accent": "#14b8a6",            // Teal - Frisch
          "accent-content": "#ffffff",
          "neutral": "#1e293b",           // Slate 800
          "neutral-content": "#f8fafc",
          "base-100": "#ffffff",          // Reines Weiß
          "base-200": "#f8fafc",          // Slate 50
          "base-300": "#f1f5f9",          // Slate 100
          "base-content": "#0f172a",      // Slate 900
          "info": "#06b6d4",              // Cyan
          "info-content": "#ffffff",
          "success": "#10b981",           // Emerald
          "success-content": "#ffffff",
          "warning": "#f59e0b",           // Amber
          "warning-content": "#1e293b",
          "error": "#ef4444",             // Red
          "error-content": "#ffffff",
        },
      },
      {
        // Elegantes Dark Theme - Premium & Sleek
        dmautodark: {
          "primary": "#818cf8",           // Indigo 400
          "primary-content": "#0f172a",
          "secondary": "#f472b6",         // Pink 400
          "secondary-content": "#0f172a",
          "accent": "#2dd4bf",            // Teal 400
          "accent-content": "#0f172a",
          "neutral": "#334155",           // Slate 700
          "neutral-content": "#f8fafc",
          "base-100": "#0f172a",          // Slate 900
          "base-200": "#1e293b",          // Slate 800
          "base-300": "#334155",          // Slate 700
          "base-content": "#f1f5f9",      // Slate 100
          "info": "#22d3ee",              // Cyan 400
          "info-content": "#0f172a",
          "success": "#34d399",           // Emerald 400
          "success-content": "#0f172a",
          "warning": "#fbbf24",           // Amber 400
          "warning-content": "#0f172a",
          "error": "#f87171",             // Red 400
          "error-content": "#0f172a",
        },
      },
    ],
    darkTheme: "dmautodark",
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
} satisfies Config;
