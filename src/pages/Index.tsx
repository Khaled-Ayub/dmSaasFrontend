// Dashboard Page - DMAuto
// Komplett redesigned mit HeroUI Komponenten
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Chip,
  Progress,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  Spinner,
} from "@heroui/react";
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

// API Base URL - Backend-Verbindung
const API_URL = import.meta.env.VITE_API_URL || "https://dmsaas-production.up.railway.app";

// TypeScript Interfaces
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

// Custom Instagram Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

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
  const [isDark, setIsDark] = useState(false);

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Theme aus localStorage laden
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldBeDark = savedTheme === "dark";
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  // Statistiken vom Backend laden
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
      console.error("Fehler beim Laden der Statistiken:", error);
    } finally {
      setLoading(false);
    }
  };

  // Instagram Account laden
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

  // KI Toggle Funktion
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

  // Initiales Laden
  useEffect(() => {
    fetchStats();
    fetchAccount();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Zeit formatieren
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

  // Stats Karten Daten
  const statCards = [
    { label: "Nachrichten", value: stats.total_messages, icon: ChatBubbleLeftRightIcon, color: "primary" as const, badge: "Gesamt" },
    { label: "KI-Antworten", value: stats.ai_messages, icon: SparklesIcon, color: "secondary" as const, badge: "KI" },
    { label: "Gespräche", value: stats.conversations, icon: UserGroupIcon, color: "success" as const, badge: "Aktiv" },
    { label: "Antwortzeit", value: stats.avg_response_time, icon: BoltIcon, color: "warning" as const, badge: "Schnell" },
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
        
        {/* Desktop Navigation */}
        <NavbarContent className="hidden md:flex gap-1" justify="center">
          <NavbarItem>
            <Button
              as={Link}
              to="/dashboard"
              variant="flat"
              color="primary"
              startContent={<Squares2X2Icon className="w-5 h-5" />}
            >
              Dashboard
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              to="/inbox"
              variant="light"
              startContent={<InboxIcon className="w-5 h-5" />}
            >
              Inbox
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              to="/settings"
              variant="light"
              startContent={<Cog6ToothIcon className="w-5 h-5" />}
            >
              Einstellungen
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2">
          {/* Theme Toggle */}
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onClick={toggleTheme}
              aria-label="Theme wechseln"
            >
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </Button>
          </NavbarItem>
          
          {/* KI Status Toggle */}
          <NavbarItem>
            <Button
              variant="flat"
              color={aiEnabled ? "success" : "danger"}
              startContent={togglingAI ? <Spinner size="sm" color="current" /> : <PowerIcon className="w-4 h-4" />}
              onClick={toggleGlobalAI}
              disabled={togglingAI}
              size="sm"
            >
              <span className="hidden sm:inline">{aiEnabled ? "KI aktiv" : "KI aus"}</span>
            </Button>
          </NavbarItem>

          {/* Account Dropdown */}
          {account && (
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    src={account.profile_picture_url || undefined}
                    name={account.username?.slice(0, 2).toUpperCase()}
                    size="sm"
                    classNames={{
                      base: "bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-primary-500/20 ring-offset-2 ring-offset-white dark:ring-offset-slate-900",
                      name: "text-white text-xs font-medium",
                    }}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Account Aktionen">
                  <DropdownItem key="profile" className="h-14 gap-2" textValue="Profil">
                    <p className="text-xs text-slate-500">Angemeldet als</p>
                    <p className="font-semibold">@{account.username}</p>
                  </DropdownItem>
                  <DropdownItem key="settings" as={Link} to="/settings">
                    Einstellungen
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Abmelden
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>

      {/* ========== MAIN CONTENT ========== */}
      <div className="container mx-auto px-4 py-8 pb-28 md:pb-8 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div className="animate-fade-in">
            <p className="text-primary-500 font-medium mb-1">Willkommen zurück 👋</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          </div>
          <Button 
            onClick={fetchStats}
            variant="light"
            startContent={<ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />}
            size="sm"
            className="self-start md:self-auto animate-fade-in"
          >
            Aktualisieren
          </Button>
        </div>

        {/* ========== STATS GRID ========== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index} 
                className="card-hover animate-fade-in bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                style={{ animationDelay: `${index * 100}ms` }}
                shadow="sm"
              >
                <CardBody className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-11 h-11 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 text-${stat.color}`} />
                    </div>
                    <Chip size="sm" color={stat.color} variant="flat">
                      {stat.badge}
                    </Chip>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {loading ? <Spinner size="sm" /> : stat.value}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* ========== MAIN GRID ========== */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Letzte Gespräche */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" shadow="sm">
              <CardHeader className="flex justify-between items-center px-6 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-900 dark:text-white">Letzte Gespräche</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Aktuelle Konversationen</p>
                  </div>
                </div>
                <Button
                  as={Link}
                  to="/inbox"
                  variant="light"
                  color="primary"
                  endContent={<ArrowRightIcon className="w-4 h-4" />}
                  size="sm"
                >
                  Alle
                </Button>
              </CardHeader>
              <CardBody className="px-6 pb-6">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <Spinner size="lg" color="primary" />
                  </div>
                ) : recentActivity.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">Noch keine Gespräche</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Nachrichten erscheinen hier</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentActivity.map((activity, index) => (
                      <Link
                        key={activity.id}
                        to="/inbox"
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all group"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Avatar
                          name={activity.name.charAt(0).toUpperCase()}
                          classNames={{
                            base: "bg-gradient-to-br from-primary-500 to-secondary-500",
                            name: "text-white text-lg font-medium",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold truncate text-slate-900 dark:text-white">{activity.name}</p>
                            {activity.unread && (
                              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {formatTime(activity.time)}
                          </p>
                        </div>
                        <ArrowUpRightIcon className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* KI Prompt Card */}
            <Card className="animate-slide-up delay-100 bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg glow-primary shine" shadow="lg">
              <CardBody className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
                  <BotIcon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">KI anpassen</h3>
                <p className="text-white/80 text-sm mb-4">
                  Konfiguriere wie deine KI antwortet
                </p>
                <Button
                  as={Link}
                  to="/settings"
                  className="bg-white/20 border-0 hover:bg-white/30 text-white w-full"
                  endContent={<ArrowRightIcon className="w-4 h-4" />}
                >
                  Einstellungen
                </Button>
              </CardBody>
            </Card>

            {/* Automatisierung Card */}
            <Card className="animate-slide-up delay-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" shadow="sm">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Automatisierung</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">KI-Anteil an Antworten</p>
                  </div>
                </div>
                
                <div className="flex items-end justify-between mb-2">
                  <span className="text-4xl font-bold text-green-500">{automationRate}%</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">automatisiert</span>
                </div>
                
                <Progress 
                  value={automationRate} 
                  color="success"
                  size="md"
                  className="h-3"
                />
              </CardBody>
            </Card>

            {/* Quick Tips Card */}
            <Card className="animate-slide-up delay-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" shadow="sm">
              <CardBody className="p-6">
                <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
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
                      <div className="w-5 h-5 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary-500 font-bold">{i + 1}</span>
                      </div>
                      <span className="text-slate-600 dark:text-slate-400">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* ========== MOBILE BOTTOM NAVIGATION ========== */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 safe-pb z-50">
        <div className="flex items-center justify-around py-2">
          <Link to="/dashboard" className="flex flex-col items-center p-2 text-primary-500">
            <Squares2X2Icon className="w-6 h-6" />
            <span className="text-xs font-medium mt-1">Dashboard</span>
          </Link>
          <Link to="/inbox" className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary-500">
            <InboxIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Inbox</span>
          </Link>
          <button 
            onClick={toggleGlobalAI}
            className={`flex flex-col items-center p-2 ${aiEnabled ? "text-green-500" : "text-red-500"}`}
          >
            <BotIcon className="w-6 h-6" />
            <span className="text-xs mt-1">{aiEnabled ? "KI An" : "KI Aus"}</span>
          </button>
          <Link to="/settings" className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary-500">
            <Cog6ToothIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
