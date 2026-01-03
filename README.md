# DMS Antwort - Frontend

Instagram DM Automation Dashboard - Automatisiere deine Instagram Direct Messages mit KI.

## Tech Stack

- **Vite** - Build Tool
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI Components
- **TanStack Query** - Data Fetching
- **React Router** - Routing

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die App läuft dann auf `http://localhost:8080`

## Build

```bash
# Production Build erstellen
npm run build

# Preview des Builds
npm run preview
```

## Umgebungsvariablen

Erstelle eine `.env` Datei im Root-Verzeichnis:

```env
VITE_API_URL=https://dmsaas-production.up.railway.app
```

## Projektstruktur

```
src/
├── components/     # Wiederverwendbare UI-Komponenten
│   ├── ui/        # shadcn/ui Basis-Komponenten
│   └── dashboard/ # Dashboard-spezifische Komponenten
├── pages/         # Seiten-Komponenten
│   ├── Landing.tsx
│   ├── Index.tsx  # Dashboard
│   ├── Inbox.tsx  # Chat-Ansicht
│   └── Settings.tsx
├── hooks/         # Custom React Hooks
├── lib/           # Utility Funktionen
└── App.tsx        # Root Component mit Routing
```

## Features

- 🤖 KI-gestützte automatische Antworten
- 💬 Inbox mit Chat-Interface
- ⚙️ AI-Einstellungen konfigurierbar
- 📊 Dashboard mit Statistiken
- 🌐 Komplett auf Deutsch

## Deployment

Das Frontend wird auf Vercel gehostet mit automatischen Deployments bei jedem Push.
