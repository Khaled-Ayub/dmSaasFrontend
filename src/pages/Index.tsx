import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  Squares2X2Icon,
  InboxIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  BoltIcon,
  ArrowUpRightIcon,
  ArrowPathIcon,
  ClockIcon,
  PowerIcon,
  SunIcon,
  MoonIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  SparklesIcon as SparklesSolid,
  BoltIcon as BoltSolid,
} from "@heroicons/react/24/solid";

// API Base URL - Backend-Verbindung
const API_URL = import.meta.env.VITE_API_URL || "https://dmsaas-production.up.railway.app";

// TypeScript Interface für Instagram Account Daten
interface InstagramAccount {
  id: string;
  username: string;
  profile_picture_url: string | null;
  is_active: boolean;
  auto_reply_enabled: boolean;
  conversation_count: number;
  unread_count: number;
}

// Interface für Dashboard Statistiken
interface Stats {
  total_messages: number;
  ai_messages: number;
  conversations: number;
  avg_response_time: string;
}

// Custom Instagram Icon (Heroicons hat keine Social Media Icons)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Custom Bot/Robot Icon
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

const Index = () => {
  // State Management
  const [stats, setStats] = useState<Stats>({
    total_messages: 0,
    ai_messages: 0,
    conversations: 0,
    avg_response_time: "< 5s",
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [togglingAI, setTogglingAI] = useState(false);
  const [account, setAccount] = useState<InstagramAccount | null>(null);
  const [theme, setTheme] = useState("dmauto");

  // Theme Toggle - Wechselt zwischen Hell und Dunkel
  const toggleTheme = () => {
    const newTheme = theme === "dmauto" ? "dmautodark" : "dmauto";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Theme beim Laden aus LocalStorage holen
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dmauto";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Statistiken vom Backend laden
  const fetchStats = async () => {
    try {
      const convResponse = await fetch(`${API_URL}/api/v1/conversations/`);
      if (convResponse.ok) {
        const conversations = await convResponse.json();
        
        let totalMessages = 0;
        let aiMessages = 0;
        
        // Für jede Konversation die Nachrichten zählen
        for (const conv of conversations) {
          const msgResponse = await fetch(`${API_URL}/api/v1/conversations/${conv.id}/messages`);
          if (msgResponse.ok) {
            const messages = await msgResponse.json();
            totalMessages += messages.length;
            aiMessages += messages.filter((m: any) => m.is_ai_generated).length;
          }
        }

        setStats({
          total_messages: totalMessages,
          ai_messages: aiMessages,
          conversations: conversations.length,
          avg_response_time: "< 5s",
        });

        // Letzte 5 Aktivitäten für die Liste
        setRecentActivity(
          conversations.slice(0, 5).map((c: any) => ({
            id: c.id,
            name: c.participant_name || c.participant_username || `User ${c.participant_ig_id?.slice(-4)}`,
            time: c.last_message_at,
            unread: !c.is_read,
            ig_id: c.participant_ig_id,
          }))
        );
      }
    } catch (error) {
      console.error("Fehler beim Laden der Statistiken:", error);
    } finally {
      setLoading(false);
    }
  };

  // Verbundenen Instagram Account laden
  const fetchAccount = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/accounts`);
      if (response.ok) {
        const data = await response.json();
        if (data.accounts && data.accounts.length > 0) {
          setAccount(data.accounts[0]);
          setAiEnabled(data.accounts[0].auto_reply_enabled);
        }
      }
    } catch (error) {
      console.error("Fehler beim Laden des Accounts:", error);
    }
  };

  // Globale KI An/Aus Funktion
  const toggleGlobalAI = async () => {
    setTogglingAI(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/account/toggle-ai`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auto_reply_enabled: !aiEnabled }),
      });

      if (response.ok) {
        setAiEnabled(!aiEnabled);
      }
    } catch (error) {
      console.error("Fehler beim Umschalten der KI:", error);
    } finally {
      setTogglingAI(false);
    }
  };

  // Initiales Laden und Auto-Refresh alle 30 Sekunden
  useEffect(() => {
    fetchStats();
    fetchAccount();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Zeit formatieren (z.B. "vor 5m")
  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return "Jetzt";
    if (minutes < 60) return `vor ${minutes}m`;
    if (hours < 24) return `vor ${hours}h`;
    return date.toLocaleDateString("de-DE");
  };

  // Automatisierungsrate berechnen
  const automationRate = stats.total_messages > 0 
    ? Math.round((stats.ai_messages / stats.total_messages) * 100) 
    : 0;

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
        
        {/* Desktop Navigation */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1">
            <li>
              <Link to="/dashboard" className="bg-primary/10 text-primary font-medium">
                <Squares2X2Icon className="w-5 h-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/inbox" className="hover:bg-base-200">
                <InboxIcon className="w-5 h-5" />
                Inbox
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:bg-base-200">
                <Cog6ToothIcon className="w-5 h-5" />
                Einstellungen
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="btn btn-ghost btn-circle btn-sm"
            aria-label="Theme wechseln"
          >
            {theme === "dmauto" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
          
          {/* KI Status Toggle */}
          <button
            onClick={toggleGlobalAI}
            disabled={togglingAI}
            className={`btn btn-sm gap-2 ${
              aiEnabled 
                ? "bg-success/10 text-success hover:bg-success/20 border-success/20" 
                : "bg-error/10 text-error hover:bg-error/20 border-error/20"
            }`}
          >
            {togglingAI ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <PowerIcon className="w-4 h-4" />
            )}
            <span className="hidden sm:inline font-medium">{aiEnabled ? "KI aktiv" : "KI aus"}</span>
          </button>

          {/* Account Avatar Dropdown */}
          {account && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
                  {account.profile_picture_url ? (
                    <img src={account.profile_picture_url} alt={account.username} />
                  ) : (
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-full h-full flex items-center justify-center">
                      <InstagramIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-2xl z-10 w-56 p-2 shadow-xl border border-base-200">
                <li className="menu-title px-4 py-2">
                  <span className="text-xs text-base-content/50">Angemeldet als</span>
                  <span className="font-semibold text-base-content">@{account.username}</span>
                </li>
                <div className="divider my-0"></div>
                <li><Link to="/settings" className="rounded-xl">Einstellungen</Link></li>
                <li><a className="rounded-xl text-error">Abmelden</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="container mx-auto px-4 py-8 pb-28 md:pb-8 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div className="animate-fade-in">
            <p className="text-primary font-medium mb-1">Willkommen zurück 👋</p>
            <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
          </div>
          <button 
            onClick={fetchStats} 
            className="btn btn-ghost btn-sm gap-2 self-start md:self-auto animate-fade-in"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Aktualisieren
          </button>
        </div>

        {/* ========== STATS GRID ========== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Stat Card: Nachrichten */}
          <div className="card bg-base-100 shadow-sm card-hover animate-fade-in">
            <div className="card-body p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-primary" />
                </div>
                <span className="badge badge-primary badge-sm">Gesamt</span>
              </div>
              <div className="text-3xl font-bold">
                {loading ? <span className="loading loading-dots loading-sm"></span> : stats.total_messages}
              </div>
              <p className="text-sm text-base-content/60">Nachrichten</p>
            </div>
          </div>

          {/* Stat Card: KI-Antworten */}
          <div className="card bg-base-100 shadow-sm card-hover animate-fade-in delay-100">
            <div className="card-body p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-secondary" />
                </div>
                <span className="badge badge-secondary badge-sm">KI</span>
              </div>
              <div className="text-3xl font-bold">
                {loading ? <span className="loading loading-dots loading-sm"></span> : stats.ai_messages}
              </div>
              <p className="text-sm text-base-content/60">KI-Antworten</p>
            </div>
          </div>

          {/* Stat Card: Gespräche */}
          <div className="card bg-base-100 shadow-sm card-hover animate-fade-in delay-200">
            <div className="card-body p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-accent" />
                </div>
                <span className="badge badge-accent badge-sm">Aktiv</span>
              </div>
              <div className="text-3xl font-bold">
                {loading ? <span className="loading loading-dots loading-sm"></span> : stats.conversations}
              </div>
              <p className="text-sm text-base-content/60">Gespräche</p>
            </div>
          </div>

          {/* Stat Card: Antwortzeit */}
          <div className="card bg-base-100 shadow-sm card-hover animate-fade-in delay-300">
            <div className="card-body p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-warning/10 flex items-center justify-center">
                  <BoltIcon className="w-5 h-5 text-warning" />
                </div>
                <span className="badge badge-warning badge-sm">Schnell</span>
              </div>
              <div className="text-3xl font-bold">{stats.avg_response_time}</div>
              <p className="text-sm text-base-content/60">Antwortzeit</p>
            </div>
          </div>
        </div>

        {/* ========== MAIN GRID ========== */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Letzte Gespräche - 2 Spalten */}
          <div className="lg:col-span-2 card bg-base-100 shadow-sm animate-slide-up">
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Letzte Gespräche</h2>
                    <p className="text-sm text-base-content/50">Aktuelle Konversationen</p>
                  </div>
                </div>
                <Link to="/inbox" className="btn btn-ghost btn-sm gap-1 text-primary">
                  Alle
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-base-200 flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-base-content/30" />
                  </div>
                  <p className="font-medium text-base-content/70">Noch keine Gespräche</p>
                  <p className="text-sm text-base-content/50 mt-1">Nachrichten erscheinen hier</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentActivity.map((activity, index) => (
                    <Link
                      key={activity.id}
                      to="/inbox"
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-base-200/70 transition-all group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="avatar placeholder">
                        <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-full w-12 h-12 shadow-md">
                          <span className="text-lg font-medium">{activity.name.charAt(0).toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold truncate">{activity.name}</p>
                          {activity.unread && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                          )}
                        </div>
                        <p className="text-sm text-base-content/50 flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {formatTime(activity.time)}
                        </p>
                      </div>
                      <ArrowUpRightIcon className="w-5 h-5 text-base-content/30 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* KI Prompt Card */}
            <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-lg glow-primary animate-slide-up delay-100 shine">
              <div className="card-body">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
                  <BotIcon className="w-7 h-7" />
                </div>
                <h3 className="card-title text-xl">KI anpassen</h3>
                <p className="text-white/80 text-sm mb-4">
                  Konfiguriere wie deine KI antwortet
                </p>
                <Link to="/settings" className="btn bg-white/20 border-0 hover:bg-white/30 gap-2 w-full">
                  Einstellungen
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Automatisierung Card */}
            <div className="card bg-base-100 shadow-sm animate-slide-up delay-200">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-bold">Automatisierung</h3>
                    <p className="text-xs text-base-content/50">KI-Anteil an Antworten</p>
                  </div>
                </div>
                
                <div className="flex items-end justify-between mb-2">
                  <span className="text-4xl font-bold text-success">{automationRate}%</span>
                  <span className="text-sm text-base-content/50">automatisiert</span>
                </div>
                
                <progress 
                  className="progress progress-success h-3" 
                  value={automationRate} 
                  max="100"
                ></progress>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="card bg-base-100 shadow-sm animate-slide-up delay-300">
              <div className="card-body">
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <span className="text-xl">💡</span>
                  Schnelltipps
                </h3>
                <ul className="space-y-3">
                  {[
                    "Business-Kontext hinzufügen für bessere Antworten",
                    "Eskalations-Keywords für wichtige Anfragen setzen",
                    "Prompt regelmäßig testen und optimieren",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary font-bold">{i + 1}</span>
                      </div>
                      <span className="text-base-content/70">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE BOTTOM NAVIGATION ========== */}
      <div className="btm-nav btm-nav-sm md:hidden bg-base-100/90 backdrop-blur-xl border-t border-base-300/50 safe-pb">
        <Link to="/dashboard" className="text-primary bg-primary/10">
          <Squares2X2Icon className="w-5 h-5" />
          <span className="btm-nav-label text-xs font-medium">Dashboard</span>
        </Link>
        <Link to="/inbox" className="hover:bg-base-200/50">
          <InboxIcon className="w-5 h-5" />
          <span className="btm-nav-label text-xs">Inbox</span>
        </Link>
        <button 
          onClick={toggleGlobalAI} 
          className={aiEnabled ? "text-success" : "text-error"}
        >
          <BotIcon className="w-5 h-5" />
          <span className="btm-nav-label text-xs">{aiEnabled ? "KI An" : "KI Aus"}</span>
        </button>
        <Link to="/settings" className="hover:bg-base-200/50">
          <Cog6ToothIcon className="w-5 h-5" />
          <span className="btm-nav-label text-xs">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Index;
