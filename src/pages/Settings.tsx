import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Settings as SettingsIcon,
  Bot,
  Save,
  RefreshCw,
  LayoutDashboard,
  Inbox,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Zap,
  Brain,
  Languages,
  Sliders,
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

  // Form state
  const [systemPrompt, setSystemPrompt] = useState("");
  const [personality, setPersonality] = useState("");
  const [context, setContext] = useState("");
  const [language, setLanguage] = useState("de");
  const [model, setModel] = useState("gpt-4o-mini");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(500);
  const [escalationKeywords, setEscalationKeywords] = useState("");

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
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex flex-col md:flex-row overflow-hidden">
      {/* Desktop Sidebar - versteckt auf Mobile */}
      <aside className="hidden md:flex w-[72px] bg-white border-r border-slate-200/60 flex-col items-center py-4 shadow-sm">
        {/* Logo */}
        <Link to="/" className="mb-8">
          <img src="/logo.png" alt="DMAuto Logo" className="w-11 h-11 rounded-2xl shadow-lg shadow-blue-500/25" />
        </Link>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col items-center gap-2">
          <Link
            to="/dashboard"
            className="w-11 h-11 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-all"
          >
            <LayoutDashboard className="w-5 h-5" />
          </Link>
          <Link
            to="/inbox"
            className="w-11 h-11 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-all"
          >
            <Inbox className="w-5 h-5" />
          </Link>
          <Link
            to="/settings"
            className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-all hover:scale-105"
          >
            <SettingsIcon className="w-5 h-5" />
          </Link>
        </nav>

        {/* Bottom - AI Status */}
        <div className="mt-auto flex flex-col items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 md:px-8 py-4 md:py-5">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-slate-800">AI-Einstellungen</h1>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5 hidden sm:block">
                  Konfiguriere wie deine KI antwortet
                </p>
              </div>
            </div>
            
            <button
              onClick={saveSettings}
              disabled={saving || !settings}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-xs md:text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:shadow-none"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Speichern</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 text-slate-400 animate-spin" />
          </div>
        ) : (
          <div className="p-4 md:p-8 max-w-4xl mx-auto">
            {/* Notifications */}
            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200/60 rounded-xl flex items-center gap-3 text-rose-700">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}
            {saved && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200/60 rounded-xl flex items-center gap-3 text-emerald-700">
                <CheckCircle className="w-5 h-5" />
                Einstellungen erfolgreich gespeichert!
              </div>
            )}

            {/* System Prompt Card */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">System Prompt</h3>
                  <p className="text-sm text-slate-500">Die Haupt-Anweisungen für die KI</p>
                </div>
              </div>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={5}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 focus:outline-none resize-none transition-all"
                placeholder="Du bist ein freundlicher Kundenservice-Assistent..."
              />
            </div>

            {/* Personality & Context Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Persönlichkeit</h3>
                    <p className="text-sm text-slate-500">Wie soll die KI klingen?</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 focus:outline-none transition-all"
                  placeholder="freundlich, hilfsbereit und professionell"
                />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Languages className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Sprache</h3>
                    <p className="text-sm text-slate-500">Antwortsprache</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 focus:outline-none transition-all"
                >
                  <option value="de">Deutsch</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>

            {/* Business Context Card */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Business-Kontext</h3>
                  <p className="text-sm text-slate-500">Infos über dein Business (Produkte, FAQ, Öffnungszeiten...)</p>
                </div>
              </div>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={6}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 focus:outline-none resize-none transition-all"
                placeholder="Unser Shop verkauft handgemachte Schmuckstücke. Lieferzeit: 2-3 Werktage. Rückgabe innerhalb 14 Tagen möglich..."
              />
            </div>

            {/* Model & Advanced Settings */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Sliders className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Erweiterte Einstellungen</h3>
                  <p className="text-sm text-slate-500">Modell und Parameter</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    KI-Modell
                  </label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 focus:outline-none transition-all"
                  >
                    {models.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Eskalations-Keywords
                  </label>
                  <input
                    type="text"
                    value={escalationKeywords}
                    onChange={(e) => setEscalationKeywords(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 focus:outline-none transition-all"
                    placeholder="beschwerde, anwalt, rückerstattung"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Temperatur: <span className="text-blue-600">{temperature}</span>
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      (0 = präzise, 1 = kreativ)
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Max Tokens: <span className="text-blue-600">{maxTokens}</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Tipps für gute Prompts
              </h4>
              <ul className="text-sm text-blue-100 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-300">•</span>
                  Sei spezifisch: Beschreibe genau, wie die KI antworten soll
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-300">•</span>
                  Füge Kontext hinzu: Je mehr Infos über dein Business, desto besser
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-300">•</span>
                  Setze Grenzen: Definiere, was die KI NICHT tun soll
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-300">•</span>
                  Teste regelmäßig: Sende Testnachrichten und passe an
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 safe-area-pb">
        <div className="flex items-center justify-around">
          <Link
            to="/dashboard"
            className="flex flex-col items-center gap-1 py-2 px-4 text-slate-400"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs font-medium">Dashboard</span>
          </Link>
          <Link
            to="/inbox"
            className="flex flex-col items-center gap-1 py-2 px-4 text-slate-400"
          >
            <Inbox className="w-5 h-5" />
            <span className="text-xs font-medium">Inbox</span>
          </Link>
          <Link
            to="/settings"
            className="flex flex-col items-center gap-1 py-2 px-4 text-blue-600"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="text-xs font-medium">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Settings;
