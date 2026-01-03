import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  Save,
  LayoutDashboard,
  Inbox,
  Settings as SettingsIcon,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Zap,
  Brain,
  Languages,
  Sliders,
  Sun,
  Moon,
  MessageSquare,
  Lightbulb,
  Target,
} from "lucide-react";

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

const Settings = () => {
  // State
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState("dmauto");

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
    const newTheme = theme === "dmauto" ? "dmautodark" : "dmauto";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dmauto";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
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
    { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet", desc: "Hohe Qualität", provider: "Anthropic" },
    { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku", desc: "Schnell", provider: "Anthropic" },
  ];

  return (
    <div className="min-h-screen bg-base-200 bg-dots">
      {/* ========== NAVBAR ========== */}
      <div className="navbar bg-base-100/80 backdrop-blur-xl border-b border-base-300/50 sticky top-0 z-50">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost gap-2 hover:bg-transparent">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <img src="/logo.png" alt="DMAuto" className="w-7 h-7 rounded-lg" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">DMAuto</span>
          </Link>
        </div>
        
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1">
            <li><Link to="/dashboard" className="hover:bg-base-200"><LayoutDashboard className="w-4 h-4" />Dashboard</Link></li>
            <li><Link to="/inbox" className="hover:bg-base-200"><Inbox className="w-4 h-4" />Inbox</Link></li>
            <li><Link to="/settings" className="bg-primary/10 text-primary font-medium"><SettingsIcon className="w-4 h-4" />Einstellungen</Link></li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm">
            {theme === "dmauto" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={saveSettings}
            disabled={saving || !settings}
            className="btn btn-primary btn-sm gap-2"
          >
            {saving ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Speichern</span>
          </button>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="container mx-auto px-4 py-8 pb-28 md:pb-8 max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg glow-secondary">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">KI-Einstellungen</h1>
            <p className="text-base-content/60">Konfiguriere wie deine KI antwortet</p>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="alert bg-error/10 border border-error/20 text-error mb-6 rounded-2xl animate-scale-in">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {saved && (
          <div className="alert bg-success/10 border border-success/20 text-success mb-6 rounded-2xl animate-scale-in">
            <CheckCircle className="w-5 h-5" />
            <span>Einstellungen erfolgreich gespeichert!</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* System Prompt */}
            <div className="card bg-base-100 shadow-sm card-hover animate-slide-up">
              <div className="card-body">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">System Prompt</h3>
                    <p className="text-sm text-base-content/60">Die Haupt-Anweisungen für die KI – definiert das grundlegende Verhalten</p>
                  </div>
                </div>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={5}
                  className="textarea textarea-bordered w-full bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100 resize-none"
                  placeholder="Du bist ein freundlicher Kundenservice-Assistent für [Unternehmen]. Deine Aufgabe ist es, Kunden professionell und hilfsbereit zu unterstützen..."
                />
              </div>
            </div>

            {/* Personality & Language Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-base-100 shadow-sm card-hover animate-slide-up delay-100">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-bold">Persönlichkeit</h3>
                      <p className="text-xs text-base-content/50">Tonfall der KI</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    className="input input-bordered w-full bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100"
                    placeholder="freundlich, hilfsbereit und professionell"
                  />
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm card-hover animate-slide-up delay-200">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                      <Languages className="w-5 h-5 text-info" />
                    </div>
                    <div>
                      <h3 className="font-bold">Sprache</h3>
                      <p className="text-xs text-base-content/50">Antwortsprache</p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="select select-bordered w-full bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100"
                  >
                    <option value="de">🇩🇪 Deutsch</option>
                    <option value="en">🇬🇧 English</option>
                    <option value="fr">🇫🇷 Français</option>
                    <option value="es">🇪🇸 Español</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Business Context */}
            <div className="card bg-base-100 shadow-sm card-hover animate-slide-up delay-300">
              <div className="card-body">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Business-Kontext</h3>
                    <p className="text-sm text-base-content/60">Wichtige Informationen über dein Business (Produkte, Preise, FAQ, Öffnungszeiten...)</p>
                  </div>
                </div>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={6}
                  className="textarea textarea-bordered w-full bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100 resize-none"
                  placeholder="Unser Shop verkauft handgemachte Schmuckstücke aus recycelten Materialien.

Preise: Ohrringe 25-45€, Ketten 35-65€, Armbänder 20-40€
Lieferzeit: 2-3 Werktage innerhalb Deutschlands
Versandkosten: Ab 50€ kostenlos, sonst 4,90€
Rückgabe: 14 Tage Widerrufsrecht..."
                />
              </div>
            </div>

            {/* Model Selection */}
            <div className="card bg-base-100 shadow-sm card-hover animate-slide-up delay-400">
              <div className="card-body">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sliders className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Erweiterte Einstellungen</h3>
                    <p className="text-sm text-base-content/60">KI-Modell und Parameter anpassen</p>
                  </div>
                </div>

                {/* Model Select */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium">KI-Modell</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {models.slice(0, 3).map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setModel(m.value)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          model === m.value 
                            ? "border-primary bg-primary/5" 
                            : "border-base-300/50 hover:border-base-300"
                        }`}
                      >
                        <p className="font-semibold text-sm">{m.label}</p>
                        <p className="text-xs text-base-content/50">{m.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Escalation Keywords */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Target className="w-4 h-4 text-error" />
                      Eskalations-Keywords
                    </span>
                    <span className="label-text-alt">Kommagetrennt</span>
                  </label>
                  <input
                    type="text"
                    value={escalationKeywords}
                    onChange={(e) => setEscalationKeywords(e.target.value)}
                    className="input input-bordered bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100"
                    placeholder="beschwerde, anwalt, rückerstattung, reklamation"
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/50">Bei diesen Keywords wird das Gespräch zur manuellen Bearbeitung markiert</span>
                  </label>
                </div>

                {/* Sliders */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Temperatur</span>
                      <span className="badge badge-primary">{temperature}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="range range-primary range-sm"
                    />
                    <div className="flex justify-between text-xs text-base-content/50 mt-2 px-1">
                      <span>Präzise</span>
                      <span>Kreativ</span>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Max Tokens</span>
                      <span className="badge badge-primary">{maxTokens}</span>
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="100"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="range range-primary range-sm"
                    />
                    <div className="flex justify-between text-xs text-base-content/50 mt-2 px-1">
                      <span>Kurz (100)</span>
                      <span>Lang (2000)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-lg animate-slide-up delay-500 shine">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5" />
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
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========== MOBILE BOTTOM NAV ========== */}
      <div className="btm-nav btm-nav-sm md:hidden bg-base-100/90 backdrop-blur-xl border-t border-base-300/50 safe-pb">
        <Link to="/dashboard" className="hover:bg-base-200/50">
          <LayoutDashboard className="w-5 h-5" />
          <span className="btm-nav-label text-xs">Dashboard</span>
        </Link>
        <Link to="/inbox" className="hover:bg-base-200/50">
          <Inbox className="w-5 h-5" />
          <span className="btm-nav-label text-xs">Inbox</span>
        </Link>
        <Link to="/settings" className="text-primary bg-primary/10">
          <SettingsIcon className="w-5 h-5" />
          <span className="btm-nav-label text-xs font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
