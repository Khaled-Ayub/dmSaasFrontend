// HeroUI Konfiguration für Tailwind CSS v4
// Diese Datei definiert die HeroUI Komponenten und Themes
import { heroui } from "@heroui/react";

// HeroUI Plugin Export für CSS
export const heroUIPlugin = heroui({
  // Prefix für alle HeroUI Klassen
  prefix: "heroui",
  
  // Theme-Konfiguration
  themes: {
    // Light Theme - DMAuto Branding
    light: {
      colors: {
        // Primärfarbe: Indigo
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        // Sekundärfarbe: Pink
        secondary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          DEFAULT: "#ec4899",
          foreground: "#ffffff",
        },
        // Akzentfarbe: Teal
        success: {
          DEFAULT: "#14b8a6",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f59e0b",
          foreground: "#1e293b",
        },
        danger: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        // Hintergrundfarben
        background: "#ffffff",
        foreground: "#0f172a",
        // Focus Ring
        focus: "#6366f1",
      },
    },
    // Dark Theme
    dark: {
      colors: {
        primary: {
          50: "#312e81",
          100: "#3730a3",
          200: "#4338ca",
          300: "#4f46e5",
          400: "#6366f1",
          500: "#818cf8",
          600: "#a5b4fc",
          700: "#c7d2fe",
          800: "#e0e7ff",
          900: "#eef2ff",
          DEFAULT: "#818cf8",
          foreground: "#0f172a",
        },
        secondary: {
          DEFAULT: "#f472b6",
          foreground: "#0f172a",
        },
        success: {
          DEFAULT: "#2dd4bf",
          foreground: "#0f172a",
        },
        warning: {
          DEFAULT: "#fbbf24",
          foreground: "#0f172a",
        },
        danger: {
          DEFAULT: "#f87171",
          foreground: "#0f172a",
        },
        background: "#0f172a",
        foreground: "#f1f5f9",
        focus: "#818cf8",
      },
    },
  },
  // Layout-Variablen
  layout: {
    radius: {
      small: "0.5rem",
      medium: "0.75rem",
      large: "1rem",
    },
    borderWidth: {
      small: "1px",
      medium: "2px",
      large: "3px",
    },
  },
});

