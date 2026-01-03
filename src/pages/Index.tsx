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
} from "lucide-react";

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || "https://dmsaas-production.up.railway.app";

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

  // Fetch account status (global AI toggle)
  const fetchAccountStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/account/status`);
      if (response.ok) {
        const data = await response.json();
        setAiEnabled(data.auto_reply_enabled);
      } else if (response.status === 404) {
        // Kein Account vorhanden - Standard: AI aktiviert
        setAiEnabled(true);
      }
    } catch (error) {
      console.error("Error fetching account status:", error);
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
      } else if (response.status === 404) {
        // Kein Account vorhanden - zeige Hinweis
        alert("Noch kein Instagram-Account verbunden. Der Account wird automatisch erstellt, wenn du die erste Nachricht erhältst.");
      }
    } catch (error) {
      console.error("Error toggling AI:", error);
    } finally {
      setTogglingAI(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchAccountStatus();
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

  const getAvatarColor = (id: string) => {
    const colors = [
      "from-blue-500 to-cyan-400",
      "from-purple-500 to-pink-400",
      "from-orange-500 to-yellow-400",
      "from-green-500 to-emerald-400",
      "from-rose-500 to-red-400",
    ];
    if (!id) return colors[0];
    const index = id.charCodeAt(id.length - 1) % colors.length;
    return colors[index];
  };

  const statCards = [
    {
      label: "Nachrichten Gesamt",
      value: stats.total_messages,
      icon: MessageSquare,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      label: "KI-Antworten",
      value: stats.ai_messages,
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      label: "Gespräche",
      value: stats.conversations,
      icon: Users,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      label: "Ø Antwortzeit",
      value: stats.avg_response_time,
      icon: Zap,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex overflow-hidden">
      {/* Icon Sidebar */}
      <aside className="w-[72px] bg-white border-r border-slate-200/60 flex flex-col items-center py-4 shadow-sm">
        {/* Logo */}
        <Link to="/" className="mb-8">
          <img src="/logo.png" alt="DMAuto Logo" className="w-11 h-11 rounded-2xl shadow-lg shadow-blue-500/25" />
        </Link>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col items-center gap-2">
          <Link
            to="/dashboard"
            className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-all hover:scale-105"
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
            className="w-11 h-11 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-all"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </nav>

        {/* Bottom - AI Status Indicator */}
        <div className="mt-auto flex flex-col items-center gap-3">
          <button
            onClick={toggleGlobalAI}
            disabled={togglingAI}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              aiEnabled
                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                : "bg-rose-50 text-rose-600 hover:bg-rose-100"
            }`}
            title={aiEnabled ? "KI aktiv - Klicken zum Deaktivieren" : "KI deaktiviert - Klicken zum Aktivieren"}
          >
            {togglingAI ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Bot className="w-5 h-5" />
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-5">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Übersicht über deine Instagram DMs
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Global AI Toggle */}
              <button
                onClick={toggleGlobalAI}
                disabled={togglingAI}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  aiEnabled
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                } ${togglingAI ? "opacity-50" : ""}`}
              >
                {togglingAI ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : aiEnabled ? (
                  <Power className="w-4 h-4" />
                ) : (
                  <PowerOff className="w-4 h-4" />
                )}
                {aiEnabled ? "KI aktiv" : "KI deaktiviert"}
              </button>

              <button
                onClick={fetchStats}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Aktualisieren
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-w-6xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {statCards.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md transition-all`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-800 mb-1">
                    {loading ? "..." : stat.value}
                  </p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Letzte Gespräche
                  </h2>
                </div>
                <Link
                  to="/inbox"
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
                >
                  Alle anzeigen
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                  <MessageSquare className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-sm">Noch keine Gespräche</p>
                  <p className="text-xs mt-1">
                    Sende eine Nachricht an deinen Instagram Account
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <Link
                      key={activity.id}
                      to="/inbox"
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className={`w-11 h-11 bg-gradient-to-br ${getAvatarColor(activity.ig_id || activity.id)} rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm`}>
                        {activity.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-700 truncate">
                          {activity.name}
                        </p>
                        <p className="text-sm text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(activity.time)}
                        </p>
                      </div>
                      {activity.unread && (
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                      )}
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-5">
              {/* AI Settings Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  KI-Prompt anpassen
                </h3>
                <p className="text-sm text-blue-100 mb-5">
                  Konfiguriere wie deine KI auf Nachrichten antwortet
                </p>
                <Link
                  to="/settings"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors"
                >
                  Einstellungen öffnen
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Tips Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  Schnelltipps
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                    <span>Füge Business-Kontext hinzu für bessere Antworten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                    <span>Setze Eskalations-Keywords für wichtige Anfragen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                    <span>Teste den Prompt mit verschiedenen Fragen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
