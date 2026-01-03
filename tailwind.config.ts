import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

// Tailwind CSS v4 Konfiguration mit HeroUI
// Die meiste Konfiguration erfolgt jetzt in der CSS-Datei mit @theme
export default {
  // Content-Pfade für Tailwind CSS Klassen-Scanning
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // HeroUI Komponenten einbeziehen
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // Dark Mode über Klasse steuern
  darkMode: "class",
  // HeroUI Plugin
  plugins: [heroui()],
} satisfies Config;
