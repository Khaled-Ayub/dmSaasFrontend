import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Bot,
  LayoutDashboard,
  Inbox,
  Settings,
  Users,
  Zap,
  ArrowUpRight,
  RefreshCw,
  Clock,
  Activity,
  Sparkles,
  Power,
  PowerOff,
  Instagram,
  TrendingUp,
  Sun,
  Moon,
} from "lucide-react";

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || "https://dmsaas-production.up.railway.app";

// Interface für den Instagram Account
interface InstagramAccount {
  id: string;
  username: string;
  profile_picture_url: string | null;
  is_active: boolean;
  auto_reply_enabled: boolean;
  conversation_count: number;
  unread_count: number;
}

interface Stats {
  total_messages: number;
  ai_messages: number;
  conversations: number;
  avg_response_time: string;
}

const Index = () => {
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

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "dmauto" ? "dmautodark" : "dmauto";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dmauto";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Fetch stats
  const fetchStats = async () => {
    try {
      const convResponse = await fetch(`${API_URL}/api/v1/conversations/`);
      if (convResponse.ok) {
        const conversations = await convResponse.json();
        
        let totalMessages = 0;
        let aiMessages = 0;
        
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
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch connected Instagram account
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
      console.error("Error fetching account:", error);
    }
  };

  // Toggle global AI
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
      console.error("Error toggling AI:", error);
    } finally {
      setTogglingAI(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchAccount();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

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

  const statCards = [
    {
      label: "Nachrichten",
      value: stats.total_messages,
      icon: MessageSquare,
      color: "primary",
    },
    {
      label: "KI-Antworten",
      value: stats.ai_messages,
      icon: Sparkles,
      color: "secondary",
    },
    {
      label: "Gespräche",
      value: stats.conversations,
      icon: Users,
      color: "accent",
    },
    {
      label: "Antwortzeit",
      value: stats.avg_response_time,
      icon: Zap,
      color: "warning",
    },
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
            <li>
              <Link to="/dashboard" className="active">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/inbox">
                <Inbox className="w-4 h-4" />
                Inbox
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <Settings className="w-4 h-4" />
                Einstellungen
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "dmauto" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          {/* AI Toggle */}
          <button
            onClick={toggleGlobalAI}
            disabled={togglingAI}
            className={`btn btn-sm gap-2 ${aiEnabled ? "btn-success" : "btn-error"}`}
          >
            {togglingAI ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : aiEnabled ? (
              <Power className="w-4 h-4" />
            ) : (
              <PowerOff className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{aiEnabled ? "KI aktiv" : "KI aus"}</span>
          </button>

          {/* Account Avatar */}
          {account && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {account.profile_picture_url ? (
                    <img src={account.profile_picture_url} alt={account.username} />
                  ) : (
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-full h-full flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-lg">
                <li className="menu-title">@{account.username}</li>
                <li><Link to="/settings">Einstellungen</Link></li>
                <li><a>Abmelden</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="text-base-content/60 mt-1">Übersicht über deine Instagram DMs</p>
          </div>
          <button onClick={fetchStats} className="btn btn-ghost btn-sm gap-2 mt-4 md:mt-0">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Aktualisieren
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center mb-2`}>
                    <IconComponent className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  <div className="stat-value text-2xl md:text-3xl">
                    {loading ? <span className="loading loading-dots loading-sm"></span> : stat.value}
                  </div>
                  <div className="stat-desc text-base-content/60">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Conversations */}
          <div className="lg:col-span-2 card bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title">
                  <Activity className="w-5 h-5 text-primary" />
                  Letzte Gespräche
                </h2>
                <Link to="/inbox" className="btn btn-ghost btn-sm gap-1">
                  Alle anzeigen
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 mx-auto text-base-content/30 mb-3" />
                  <p className="text-base-content/60">Noch keine Gespräche</p>
                  <p className="text-sm text-base-content/40">Sende eine Nachricht an deinen Instagram Account</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentActivity.map((activity) => (
                    <Link
                      key={activity.id}
                      to="/inbox"
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-200 transition-colors"
                    >
                      <div className="avatar placeholder">
                        <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-10">
                          <span>{activity.name.charAt(0).toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{activity.name}</p>
                        <p className="text-sm text-base-content/60 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(activity.time)}
                        </p>
                      </div>
                      {activity.unread && (
                        <span className="badge badge-primary badge-xs"></span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            {/* AI Card */}
            <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg">
              <div className="card-body">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="card-title">KI-Prompt anpassen</h3>
                <p className="text-primary-content/80 text-sm">
                  Konfiguriere wie deine KI auf Nachrichten antwortet
                </p>
                <div className="card-actions justify-end mt-2">
                  <Link to="/settings" className="btn btn-sm bg-white/20 border-0 hover:bg-white/30">
                    Einstellungen
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Statistiken
                </h3>
                <div className="space-y-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/60">Automatisierung</span>
                    <span className="font-semibold">
                      {stats.total_messages > 0 
                        ? Math.round((stats.ai_messages / stats.total_messages) * 100) 
                        : 0}%
                    </span>
                  </div>
                  <progress 
                    className="progress progress-success" 
                    value={stats.total_messages > 0 ? (stats.ai_messages / stats.total_messages) * 100 : 0} 
                    max="100"
                  ></progress>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg">💡 Schnelltipps</h3>
                <ul className="space-y-2 text-sm text-base-content/70 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="badge badge-primary badge-xs mt-1.5"></span>
                    Füge Business-Kontext hinzu für bessere Antworten
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="badge badge-primary badge-xs mt-1.5"></span>
                    Setze Eskalations-Keywords für wichtige Anfragen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="badge badge-primary badge-xs mt-1.5"></span>
                    Teste den Prompt mit verschiedenen Fragen
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="btm-nav btm-nav-sm md:hidden bg-base-100 border-t border-base-300">
        <Link to="/dashboard" className="active text-primary">
          <LayoutDashboard className="w-5 h-5" />
          <span className="btm-nav-label text-xs">Dashboard</span>
        </Link>
        <Link to="/inbox">
          <Inbox className="w-5 h-5" />
          <span className="btm-nav-label text-xs">Inbox</span>
        </Link>
        <button onClick={toggleGlobalAI} className={aiEnabled ? "text-success" : "text-error"}>
          <Bot className="w-5 h-5" />
          <span className="btm-nav-label text-xs">{aiEnabled ? "KI An" : "KI Aus"}</span>
        </button>
        <Link to="/settings">
          <Settings className="w-5 h-5" />
          <span className="btm-nav-label text-xs">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Index;
