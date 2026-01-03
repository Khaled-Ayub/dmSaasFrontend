# DMAuto - Instagram DM Automation SaaS

## 📋 Projektübersicht

**DMAuto** ist eine Full-Stack SaaS-Anwendung zur Automatisierung von Instagram Direct Messages mittels KI. Die Plattform ermöglicht es Creators, Online-Shops und Freelancern, Kundenanfragen automatisch und intelligent zu beantworten – 24/7.

---

## 🚀 Live-URLs

| Umgebung | URL |
|----------|-----|
| **Frontend (Production)** | https://frontend-one-phi-41.vercel.app |
| **Backend API** | https://dmsaas-production.up.railway.app |

---

## 🛠️ Tech-Stack

### Frontend

| Technologie | Version | Beschreibung |
|-------------|---------|--------------|
| **React** | 18.3.1 | UI-Framework |
| **TypeScript** | 5.8.3 | Type-Safety |
| **Vite** | 5.4.19 | Build-Tool & Dev-Server |
| **Tailwind CSS** | 4.x | Utility-First CSS Framework |
| **HeroUI** | 3.x | React Component Library (von NextUI-Team) |
| **Framer Motion** | 11.x | Animationen |
| **Heroicons** | 2.2.0 | Icon-Bibliothek (von Tailwind Labs) |
| **React Router DOM** | 6.30.1 | Client-Side Routing |
| **TanStack Query** | 5.83.0 | Server-State Management |
| **React Hook Form** | 7.61.1 | Formular-Handling |
| **Zod** | 3.25.76 | Schema-Validierung |
| **Recharts** | 2.15.4 | Diagramme & Charts |

### Backend

| Technologie | Beschreibung |
|-------------|--------------|
| **Python 3.11+** | Programmiersprache |
| **FastAPI** | Web-Framework |
| **Uvicorn** | ASGI Server |
| **PostgreSQL** | Datenbank |
| **SQLAlchemy** | ORM |
| **Alembic** | Datenbank-Migrationen |
| **Celery** | Task Queue |
| **Redis** | Message Broker & Cache |
| **LiteLLM** | Multi-Provider LLM Integration |
| **httpx** | HTTP Client |

### Deployment

| Service | Verwendung |
|---------|------------|
| **Vercel** | Frontend Hosting |
| **Railway** | Backend Hosting & PostgreSQL |
| **GitHub** | Version Control |

---

## ✅ Was funktioniert

### Frontend

- [x] **Landing Page** - Komplette Marketing-Seite mit Hero, Features, Testimonials
- [x] **Dashboard** - Statistiken, letzte Gespräche, KI-Status, Quick Actions
- [x] **Inbox** - Chat-Interface für Konversationen mit Echtzeit-Updates
- [x] **Settings** - KI-Einstellungen (Prompt, Persönlichkeit, Modell, etc.)
- [x] **Responsive Design** - Mobile-First mit Bottom-Navigation
- [x] **Dark/Light Mode** - Theme-Toggle mit LocalStorage-Persistenz
- [x] **PWA-Ready** - Manifest, Meta-Tags, Safe-Area für iOS

### Backend-Integration

- [x] **Konversationen laden** - GET `/api/v1/conversations/`
- [x] **Nachrichten laden** - GET `/api/v1/conversations/{id}/messages`
- [x] **Nachricht senden** - POST `/api/v1/conversations/{id}/messages`
- [x] **KI pausieren** - PUT `/api/v1/conversations/{id}/ai-pause`
- [x] **KI-Einstellungen** - GET/PUT `/api/v1/ai-settings/`
- [x] **Instagram Account** - GET `/api/v1/accounts`
- [x] **Globaler KI-Toggle** - PUT `/api/v1/account/toggle-ai`

### Design-System

- [x] **HeroUI Komponenten** - Button, Card, Navbar, Avatar, Chip, Input, Textarea, Select, Slider, Progress, Dropdown, Spinner
- [x] **Custom Animations** - fade-in, slide-up, scale-in, float, pulse-soft, shimmer
- [x] **Gradient Effects** - Primary-to-Secondary Gradients, Glow-Effects
- [x] **Glass Morphism** - Backdrop-Blur für Navbar und Modals
- [x] **Background Patterns** - Dot-Pattern, Grid-Pattern

---

## 🎨 Design-System Details

### Farbpalette

#### Light Theme
```
Primary:    #6366f1 (Indigo)
Secondary:  #ec4899 (Pink)
Accent:     #14b8a6 (Teal)
Background: #ffffff / #f8fafc / #f1f5f9
Text:       #0f172a (Slate 900)
```

#### Dark Theme
```
Primary:    #818cf8 (Indigo 400)
Secondary:  #f472b6 (Pink 400)
Accent:     #2dd4bf (Teal 400)
Background: #0f172a / #1e293b / #334155
Text:       #f1f5f9 (Slate 100)
```

### Typografie

- **Font:** Plus Jakarta Sans (Google Fonts)
- **Weights:** 400, 500, 600, 700, 800

### Border Radius

- Small: 0.5rem
- Medium: 0.75rem
- Large: 1rem
- XL: 1.25rem
- 2XL: 1.5rem

---

## 📁 Projektstruktur

```
dmsAntwort/
├── frontend/
│   ├── public/
│   │   ├── logo.png
│   │   ├── logofavicon.png
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/          # shadcn/ui Komponenten (Legacy)
│   │   ├── pages/
│   │   │   ├── Landing.tsx  # Marketing-Seite
│   │   │   ├── Index.tsx    # Dashboard
│   │   │   ├── Inbox.tsx    # Chat-Interface
│   │   │   ├── Settings.tsx # KI-Einstellungen
│   │   │   ├── Login.tsx    # Auth (TODO)
│   │   │   └── NotFound.tsx # 404-Seite
│   │   ├── App.tsx          # Router & Providers
│   │   ├── main.tsx         # Entry Point
│   │   └── index.css        # Tailwind v4 Styles
│   ├── hero.ts              # HeroUI Konfiguration
│   ├── tailwind.config.ts   # Tailwind Konfiguration
│   ├── vite.config.ts       # Vite Konfiguration
│   ├── postcss.config.js    # PostCSS Konfiguration
│   ├── vercel.json          # Vercel Deployment Config
│   └── package.json
│
└── backend/
    ├── app/
    │   ├── api/
    │   │   └── v1/
    │   │       ├── conversations.py
    │   │       ├── messages.py
    │   │       ├── ai_settings.py
    │   │       └── accounts.py
    │   ├── models/
    │   ├── schemas/
    │   ├── services/
    │   │   └── ai_service.py
    │   └── main.py
    └── requirements.txt
```

---

## 🔧 Konfiguration

### Umgebungsvariablen (Frontend)

```env
VITE_API_URL=https://dmsaas-production.up.railway.app
```

### Vercel Konfiguration

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📱 Seiten-Übersicht

### 1. Landing Page (`/`)

**Features:**
- Responsive Navbar mit Logo, Navigation, Theme-Toggle, CTA-Button
- Hero-Section mit animiertem Badge, Headline, Subheadline, Dual-CTAs
- Social Proof mit Avatar-Stack und Rating
- Feature-Cards (4 Stück) mit Icons und Beschreibungen
- "So funktioniert's" - 3-Schritte-Anleitung
- Benefits-Section mit Gradient-Hintergrund und Stats-Card
- Testimonials (3 Kunden-Reviews)
- Final CTA mit schwebendem Icon
- Footer mit Links

### 2. Dashboard (`/dashboard`)

**Features:**
- Navbar mit Navigation, Theme-Toggle, KI-Status-Button, Account-Dropdown
- Willkommens-Header mit Aktualisieren-Button
- 4 Statistik-Cards (Nachrichten, KI-Antworten, Gespräche, Antwortzeit)
- Letzte Gespräche Liste mit Avatar, Name, Zeit, Status
- KI-Anpassen Card (Gradient) mit Link zu Settings
- Automatisierungs-Rate mit Progress-Bar
- Schnelltipps Card
- Mobile Bottom-Navigation (4 Tabs)

### 3. Inbox (`/inbox`)

**Features:**
- Desktop: Split-View (Sidebar + Chat-Bereich)
- Mobile: Vollbild-Chat mit Back-Button
- Konversations-Liste mit Suche, Avatar, Status-Chips (KI/Manuell/Wichtig)
- Chat-Header mit KI-Pause-Toggle und Optionen-Dropdown
- Nachrichten-Bubbles mit KI-Indikator und Zeitstempel
- Message-Input mit Enter-Submit
- Warnung wenn KI pausiert ist
- Auto-Refresh alle 5/10 Sekunden

### 4. Settings (`/settings`)

**Features:**
- System-Prompt Textarea
- Persönlichkeit Input
- Sprach-Auswahl (DE, EN, FR, ES)
- Business-Kontext Textarea
- KI-Modell Auswahl (GPT-4o Mini, GPT-4o, GPT-4 Turbo)
- Eskalations-Keywords Input
- Temperatur-Slider (0.0 - 1.0)
- Max-Tokens-Slider (100 - 2000)
- Tipps-Card mit Best Practices
- Speichern-Button in Navbar

---

## 🔄 API-Endpunkte

### Konversationen

| Methode | Endpoint | Beschreibung |
|---------|----------|--------------|
| GET | `/api/v1/conversations/` | Alle Konversationen |
| GET | `/api/v1/conversations/{id}/messages` | Nachrichten einer Konversation |
| POST | `/api/v1/conversations/{id}/messages` | Nachricht senden |
| PUT | `/api/v1/conversations/{id}/ai-pause` | KI pausieren/aktivieren |

### KI-Einstellungen

| Methode | Endpoint | Beschreibung |
|---------|----------|--------------|
| GET | `/api/v1/ai-settings/` | Einstellungen laden |
| PUT | `/api/v1/ai-settings/{id}` | Einstellungen speichern |

### Account

| Methode | Endpoint | Beschreibung |
|---------|----------|--------------|
| GET | `/api/v1/accounts` | Verbundene Instagram Accounts |
| PUT | `/api/v1/account/toggle-ai` | Globaler KI-Toggle |

---

## 🚧 Noch zu implementieren (TODOs)

### Hohe Priorität
- [ ] **Authentication** - Login/Signup mit JWT
- [ ] **Instagram OAuth** - Account-Verbindung
- [ ] **Webhook-Handler** - Eingehende Instagram-Nachrichten
- [ ] **Backend Deployment** - GitHub Repo & CI/CD

### Mittlere Priorität
- [ ] **Multi-Account Support** - Mehrere Instagram Accounts
- [ ] **Billing/Subscription** - Stripe Integration
- [ ] **Analytics Dashboard** - Detaillierte Statistiken
- [ ] **Notification System** - Email/Push bei Eskalation

### Nice-to-have
- [ ] **Canned Responses** - Vorlagen-Bibliothek
- [ ] **Team-Funktionen** - Mehrere Nutzer
- [ ] **API-Dokumentation** - Swagger/OpenAPI
- [ ] **E2E Tests** - Playwright/Cypress

---

## 📦 Installation (Lokal)

### Frontend

```bash
cd frontend
npm install
npm run dev
# Läuft auf http://localhost:8080
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# Läuft auf http://localhost:8000
```

---

## 🔐 CORS-Konfiguration

Das Backend erlaubt Requests von:
- `http://localhost:3000`
- `http://localhost:8080`
- `https://frontend-one-phi-41.vercel.app`

---

## 📈 Performance

### Bundle-Größen (Production Build)

| Datei | Größe | Gzip |
|-------|-------|------|
| index.html | 1.82 kB | 0.72 kB |
| CSS | ~170 kB | ~25 kB |
| JS (Main) | ~55 kB | ~19 kB |
| JS (Vendor) | ~892 kB | ~249 kB |

> ⚠️ Der Vendor-Chunk ist groß wegen HeroUI. Code-Splitting mit `React.lazy()` wird empfohlen.

---

## 👨‍💻 Entwickler-Hinweise

### Theme wechseln
```typescript
// Dark Mode aktivieren
document.documentElement.classList.add("dark");
localStorage.setItem("theme", "dark");

// Light Mode aktivieren
document.documentElement.classList.remove("dark");
localStorage.setItem("theme", "light");
```

### HeroUI Komponenten importieren
```typescript
import {
  Button,
  Card,
  CardBody,
  Input,
  // ... etc
} from "@heroui/react";
```

### API-Calls
```typescript
const API_URL = import.meta.env.VITE_API_URL || "https://dmsaas-production.up.railway.app";

const response = await fetch(`${API_URL}/api/v1/conversations/`);
const data = await response.json();
```

---

## 📄 Lizenz

Proprietär - © 2026 DMAuto

---

## 🤝 Kontakt

Bei Fragen oder Problemen:
- GitHub: [Khaled-Ayub/dmSaasFrontend](https://github.com/Khaled-Ayub/dmSaasFrontend)

