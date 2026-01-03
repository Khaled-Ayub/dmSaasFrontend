import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  Save,
  RefreshCw,
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
} from "lucide-react";

// Types
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
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState("dmauto");

  // Form state
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

  // Fetch settings
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
      console.error("Error fetching settings:", err);
      setError("Einstellungen konnten nicht geladen werden");
    } finally {
      setLoading(false);
    }
  };

  // Save settings
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
      console.error("Error saving settings:", err);
      setError("Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const models = [
    { value: "gpt-4o-mini", label: "GPT-4o Mini (Schnell & Günstig)", provider: "openai" },
    { value: "gpt-4o", label: "GPT-4o (Beste Qualität)", provider: "openai" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "openai" },
    { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet", provider: "anthropic" },
    { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku (Schnell)", provider: "anthropic" },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost gap-2">
            <img src="/logo.png" alt="DMAuto" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-lg hidden sm:inline">DMAuto</span>
          </Link>
        </div>
        
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li><Link to="/dashboard"><LayoutDashboard className="w-4 h-4" />Dashboard</Link></li>
            <li><Link to="/inbox"><Inbox className="w-4 h-4" />Inbox</Link></li>
            <li><Link to="/settings" className="active"><SettingsIcon className="w-4 h-4" />Einstellungen</Link></li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">AI-Einstellungen</h1>
            <p className="text-base-content/60">Konfiguriere wie deine KI antwortet</p>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="alert alert-error mb-6">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {saved && (
          <div className="alert alert-success mb-6">
            <CheckCircle className="w-5 h-5" />
            <span>Einstellungen erfolgreich gespeichert!</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* System Prompt */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">System Prompt</h3>
                    <p className="text-sm text-base-content/60">Die Haupt-Anweisungen für die KI</p>
                  </div>
                </div>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={5}
                  className="textarea textarea-bordered w-full"
                  placeholder="Du bist ein freundlicher Kundenservice-Assistent..."
                />
              </div>
            </div>

            {/* Personality & Language */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Persönlichkeit</h3>
                      <p className="text-sm text-base-content/60">Wie soll die KI klingen?</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="freundlich, hilfsbereit und professionell"
                  />
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                      <Languages className="w-5 h-5 text-info" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Sprache</h3>
                      <p className="text-sm text-base-content/60">Antwortsprache</p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="de">Deutsch</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Business Context */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business-Kontext</h3>
                    <p className="text-sm text-base-content/60">Infos über dein Business (Produkte, FAQ, Öffnungszeiten...)</p>
                  </div>
                </div>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={6}
                  className="textarea textarea-bordered w-full"
                  placeholder="Unser Shop verkauft handgemachte Schmuckstücke. Lieferzeit: 2-3 Werktage..."
                />
              </div>
            </div>

            {/* Model & Advanced */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Sliders className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Erweiterte Einstellungen</h3>
                    <p className="text-sm text-base-content/60">Modell und Parameter</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">KI-Modell</span>
                    </label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="select select-bordered"
                    >
                      {models.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Eskalations-Keywords</span>
                    </label>
                    <input
                      type="text"
                      value={escalationKeywords}
                      onChange={(e) => setEscalationKeywords(e.target.value)}
                      className="input input-bordered"
                      placeholder="beschwerde, anwalt, rückerstattung"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Temperatur</span>
                      <span className="label-text-alt badge badge-primary">{temperature}</span>
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
                    <div className="flex justify-between text-xs text-base-content/50 mt-1">
                      <span>Präzise</span>
                      <span>Kreativ</span>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Max Tokens</span>
                      <span className="label-text-alt badge badge-primary">{maxTokens}</span>
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
                    <div className="flex justify-between text-xs text-base-content/50 mt-1">
                      <span>100</span>
                      <span>2000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg">
              <div className="card-body">
                <h4 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Tipps für gute Prompts
                </h4>
                <ul className="text-sm text-primary-content/80 space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    Sei spezifisch: Beschreibe genau, wie die KI antworten soll
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    Füge Kontext hinzu: Je mehr Infos über dein Business, desto besser
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    Setze Grenzen: Definiere, was die KI NICHT tun soll
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    Teste regelmäßig: Sende Testnachrichten und passe an
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="btm-nav btm-nav-sm md:hidden bg-base-100 border-t border-base-300">
        <Link to="/dashboard"><LayoutDashboard className="w-5 h-5" /><span className="btm-nav-label text-xs">Dashboard</span></Link>
        <Link to="/inbox"><Inbox className="w-5 h-5" /><span className="btm-nav-label text-xs">Inbox</span></Link>
        <Link to="/settings" className="active text-primary"><SettingsIcon className="w-5 h-5" /><span className="btm-nav-label text-xs">Settings</span></Link>
      </div>
    </div>
  );
};

export default Settings;
