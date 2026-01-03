// Settings Page - DMAuto
// Komplett redesigned mit HeroUI Komponenten
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
  Slider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
} from "@heroui/react";
import {
  DocumentArrowDownIcon,
  Squares2X2Icon,
  InboxIcon,
  Cog6ToothIcon,
  SparklesIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  BoltIcon,
  LanguageIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
  MoonIcon,
  LightBulbIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";

// TypeScript Interface für AI-Einstellungen
interface AISettings {
  id: string;
  provider: string;
  model: string;
  system_prompt: string;
  personality: string;
  context: string;
  language: string;
  max_tokens: number;
  temperature: number;
  escalation_keywords: string;
}

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || "https://dmsaas-production.up.railway.app";

// Custom Bot Icon
const BotIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
  </svg>
);

// Custom Brain Icon
const BrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
    <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
    <path d="M6 18a4 4 0 0 1-1.967-.516"/>
    <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
  </svg>
);

const Settings = () => {
  // State
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Form State
  const [systemPrompt, setSystemPrompt] = useState("");
  const [personality, setPersonality] = useState("");
  const [context, setContext] = useState("");
  const [language, setLanguage] = useState("de");
  const [model, setModel] = useState("gpt-4o-mini");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(500);
  const [escalationKeywords, setEscalationKeywords] = useState("");

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldBeDark = savedTheme === "dark";
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  // Fetch Settings
  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/ai-settings/`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const s = data[0];
          setSettings(s);
          setSystemPrompt(s.system_prompt || "");
          setPersonality(s.personality || "");
          setContext(s.context || "");
          setLanguage(s.language || "de");
          setModel(s.model || "gpt-4o-mini");
          setTemperature(s.temperature || 0.7);
          setMaxTokens(s.max_tokens || 500);
          setEscalationKeywords(s.escalation_keywords || "");
        }
      }
    } catch (err) {
      console.error("Fehler beim Laden:", err);
      setError("Einstellungen konnten nicht geladen werden");
    } finally {
      setLoading(false);
    }
  };

  // Save Settings
  const saveSettings = async () => {
    if (!settings) return;

    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      const response = await fetch(`${API_URL}/api/v1/ai-settings/${settings.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_prompt: systemPrompt,
          personality,
          context,
          language,
          model,
          temperature,
          max_tokens: maxTokens,
          escalation_keywords: escalationKeywords,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError("Speichern fehlgeschlagen");
      }
    } catch (err) {
      console.error("Fehler:", err);
      setError("Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Verfügbare KI-Modelle
  const models = [
    { value: "gpt-4o-mini", label: "GPT-4o Mini", desc: "Schnell & Günstig", provider: "OpenAI" },
    { value: "gpt-4o", label: "GPT-4o", desc: "Beste Qualität", provider: "OpenAI" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo", desc: "Sehr leistungsfähig", provider: "OpenAI" },
  ];

  // Sprachen
  const languages = [
    { value: "de", label: "🇩🇪 Deutsch" },
    { value: "en", label: "🇬🇧 English" },
    { value: "fr", label: "🇫🇷 Français" },
    { value: "es", label: "🇪🇸 Español" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 bg-dots transition-colors">
      {/* ========== NAVBAR ========== */}
      <Navbar 
        maxWidth="xl" 
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50"
        isBlurred
      >
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <img src="/logo.png" alt="DMAuto" className="w-7 h-7 rounded-lg" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white hidden sm:inline">DMAuto</span>
          </Link>
        </NavbarBrand>
        
        <NavbarContent className="hidden md:flex gap-1" justify="center">
          <NavbarItem>
            <Button as={Link} to="/dashboard" variant="light" startContent={<Squares2X2Icon className="w-5 h-5" />}>
              Dashboard
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/inbox" variant="light" startContent={<InboxIcon className="w-5 h-5" />}>
              Inbox
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/settings" variant="flat" color="primary" startContent={<Cog6ToothIcon className="w-5 h-5" />}>
              Einstellungen
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2">
          <NavbarItem>
            <Button isIconOnly variant="light" onClick={toggleTheme} aria-label="Theme wechseln">
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              color="primary"
              startContent={saving ? <Spinner size="sm" color="current" /> : <DocumentArrowDownIcon className="w-4 h-4" />}
              onClick={saveSettings}
              disabled={saving || !settings}
              size="sm"
            >
              <span className="hidden sm:inline">Speichern</span>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* ========== MAIN CONTENT ========== */}
      <div className="container mx-auto px-4 py-8 pb-28 md:pb-8 max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center shadow-lg glow-secondary">
            <BrainIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">KI-Einstellungen</h1>
            <p className="text-slate-500 dark:text-slate-400">Konfiguriere wie deine KI antwortet</p>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <Card className="mb-6 bg-red-500/10 border border-red-500/20 animate-scale-in" shadow="none">
            <CardBody className="flex flex-row items-center gap-2 py-3">
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
              <span className="text-red-600 dark:text-red-400">{error}</span>
            </CardBody>
          </Card>
        )}
        {saved && (
          <Card className="mb-6 bg-green-500/10 border border-green-500/20 animate-scale-in" shadow="none">
            <CardBody className="flex flex-row items-center gap-2 py-3">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span className="text-green-600 dark:text-green-400">Einstellungen erfolgreich gespeichert!</span>
            </CardBody>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* System Prompt */}
            <Card className="card-hover animate-slide-up bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" shadow="sm">
              <CardBody className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-500/10 flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-6 h-6 text-secondary-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">System Prompt</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Die Haupt-Anweisungen für die KI – definiert das grundlegende Verhalten</p>
                  </div>
                </div>
                <Textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  minRows={5}
                  placeholder="Du bist ein freundlicher Kundenservice-Assistent für [Unternehmen]. Deine Aufgabe ist es, Kunden professionell und hilfsbereit zu unterstützen..."
                  classNames={{
                    inputWrapper: "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600",
                  }}
                />
              </CardBody>
            </Card>

            {/* Personality & Language Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-hover animate-slide-up delay-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" shadow="sm">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <BotIcon className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Persönlichkeit</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Tonfall der KI</p>
                    </div>
                  </div>
                  <Input
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    placeholder="freundlich, hilfsbereit und professionell"
                    classNames={{
                      inputWrapper: "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600",
                    }}
                  />
                </CardBody>
              </Card>

              <Card className="card-hover animate-slide-up delay-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" shadow="sm">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <LanguageIcon className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Sprache</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Antwortsprache</p>
                    </div>
                  </div>
                  <Select
                    selectedKeys={[language]}
                    onChange={(e) => setLanguage(e.target.value)}
                    classNames={{
                      trigger: "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600",
                    }}
                  >
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </Select>
                </CardBody>
              </Card>
            </div>

            {/* Business Context */}
            <Card className="card-hover animate-slide-up delay-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" shadow="sm">
              <CardBody className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <BoltIcon className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Business-Kontext</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Wichtige Informationen über dein Business (Produkte, Preise, FAQ, Öffnungszeiten...)</p>
                  </div>
                </div>
                <Textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  minRows={6}
                  placeholder={`Unser Shop verkauft handgemachte Schmuckstücke aus recycelten Materialien.

Preise: Ohrringe 25-45€, Ketten 35-65€, Armbänder 20-40€
Lieferzeit: 2-3 Werktage innerhalb Deutschlands
Versandkosten: Ab 50€ kostenlos, sonst 4,90€
Rückgabe: 14 Tage Widerrufsrecht...`}
                  classNames={{
                    inputWrapper: "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600",
                  }}
                />
              </CardBody>
            </Card>

            {/* Model Selection */}
            <Card className="card-hover animate-slide-up delay-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" shadow="sm">
              <CardBody className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <AdjustmentsHorizontalIcon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Erweiterte Einstellungen</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">KI-Modell und Parameter anpassen</p>
                  </div>
                </div>

                {/* Model Select */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">KI-Modell</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {models.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setModel(m.value)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          model === m.value 
                            ? "border-primary-500 bg-primary-500/5" 
                            : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                        }`}
                      >
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">{m.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{m.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Escalation Keywords */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white mb-2">
                    <FlagIcon className="w-4 h-4 text-red-500" />
                    Eskalations-Keywords
                  </label>
                  <Input
                    value={escalationKeywords}
                    onChange={(e) => setEscalationKeywords(e.target.value)}
                    placeholder="beschwerde, anwalt, rückerstattung, reklamation"
                    description="Bei diesen Keywords wird das Gespräch zur manuellen Bearbeitung markiert (kommagetrennt)"
                    classNames={{
                      inputWrapper: "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600",
                    }}
                  />
                </div>

                {/* Sliders */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-slate-900 dark:text-white">Temperatur</label>
                      <Chip size="sm" color="primary" variant="flat">{temperature}</Chip>
                    </div>
                    <Slider
                      value={temperature}
                      onChange={(val) => setTemperature(val as number)}
                      minValue={0}
                      maxValue={1}
                      step={0.1}
                      color="primary"
                      className="max-w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                      <span>Präzise</span>
                      <span>Kreativ</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-slate-900 dark:text-white">Max Tokens</label>
                      <Chip size="sm" color="primary" variant="flat">{maxTokens}</Chip>
                    </div>
                    <Slider
                      value={maxTokens}
                      onChange={(val) => setMaxTokens(val as number)}
                      minValue={100}
                      maxValue={2000}
                      step={100}
                      color="primary"
                      className="max-w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                      <span>Kurz (100)</span>
                      <span>Lang (2000)</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Tips Card */}
            <Card className="animate-slide-up delay-500 bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg shine" shadow="lg">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <LightBulbIcon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg">Tipps für bessere Prompts</h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "Sei spezifisch: Beschreibe genau, wie die KI antworten soll",
                    "Füge Kontext hinzu: Je mehr Infos über dein Business, desto besser",
                    "Setze Grenzen: Definiere, was die KI NICHT tun soll",
                    "Teste regelmäßig: Sende Testnachrichten und optimiere den Prompt",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {i + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        )}
      </div>

      {/* ========== MOBILE BOTTOM NAV ========== */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 safe-pb z-50">
        <div className="flex items-center justify-around py-2">
          <Link to="/dashboard" className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary-500">
            <Squares2X2Icon className="w-6 h-6" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link to="/inbox" className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary-500">
            <InboxIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Inbox</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center p-2 text-primary-500">
            <Cog6ToothIcon className="w-6 h-6" />
            <span className="text-xs font-medium mt-1">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
