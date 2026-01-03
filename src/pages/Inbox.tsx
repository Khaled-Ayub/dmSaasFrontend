import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Search,
  Send,
  Bot,
  Settings,
  LayoutDashboard,
  Inbox as InboxIcon,
  RefreshCw,
  CheckCheck,
  Clock,
  Sparkles,
  Pause,
  Play,
  ArrowLeft,
  Sun,
  Moon,
  MoreVertical,
  User,
} from "lucide-react";

// TypeScript Interfaces
interface Message {
  id: string;
  content: string;
  direction: "inbound" | "outbound";
  is_ai_generated: boolean;
  created_at: string;
  status: string;
}

interface Conversation {
  id: string;
  participant_ig_id: string;
  participant_name: string | null;
  participant_username: string | null;
  is_read: boolean;
  needs_human_review: boolean;
  ai_paused: boolean;
  last_message_at: string;
}

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || "https://dmsaas-production.up.railway.app";

const Inbox = () => {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("dmauto");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Fetch Conversations
  const fetchConversations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/conversations/`);
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Fehler beim Laden:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Messages
  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/conversations/${conversationId}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Fehler beim Laden:", error);
    }
  };

  // Send Message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setSending(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/conversations/${selectedConversation.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage }),
      });

      if (response.ok) {
        setNewMessage("");
        fetchMessages(selectedConversation.id);
      }
    } catch (error) {
      console.error("Fehler beim Senden:", error);
    } finally {
      setSending(false);
    }
  };

  // Toggle AI Pause
  const toggleAIPause = async () => {
    if (!selectedConversation) return;

    const newPausedState = !selectedConversation.ai_paused;
    
    try {
      const response = await fetch(`${API_URL}/api/v1/conversations/${selectedConversation.id}/ai-pause`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ai_paused: newPausedState }),
      });

      if (response.ok) {
        setSelectedConversation({ ...selectedConversation, ai_paused: newPausedState });
        setConversations(prev =>
          prev.map(c => c.id === selectedConversation.id ? { ...c, ai_paused: newPausedState } : c)
        );
      }
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  // Effects
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      const interval = setInterval(() => fetchMessages(selectedConversation.id), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filtered Conversations
  const filteredConversations = conversations.filter((conv) => {
    const name = conv.participant_name || conv.participant_username || conv.participant_ig_id;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Helper Functions
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return "Jetzt";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
  };

  const getDisplayName = (conv: Conversation) => {
    return conv.participant_name || conv.participant_username || `User ${conv.participant_ig_id.slice(-4)}`;
  };

  const getInitial = (conv: Conversation) => {
    const name = conv.participant_name || conv.participant_username;
    if (name) return name.charAt(0).toUpperCase();
    return conv.participant_ig_id.slice(-2).toUpperCase();
  };

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      {/* ========== DESKTOP NAVBAR ========== */}
      <div className="navbar bg-base-100/80 backdrop-blur-xl border-b border-base-300/50 hidden md:flex">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost gap-2 hover:bg-transparent">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <img src="/logo.png" alt="DMAuto" className="w-7 h-7 rounded-lg" />
            </div>
            <span className="font-bold text-lg">DMAuto</span>
          </Link>
        </div>
        
        <div className="navbar-center">
          <ul className="menu menu-horizontal gap-1">
            <li><Link to="/dashboard" className="hover:bg-base-200"><LayoutDashboard className="w-4 h-4" />Dashboard</Link></li>
            <li><Link to="/inbox" className="bg-primary/10 text-primary font-medium"><InboxIcon className="w-4 h-4" />Inbox</Link></li>
            <li><Link to="/settings" className="hover:bg-base-200"><Settings className="w-4 h-4" />Einstellungen</Link></li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm">
            {theme === "dmauto" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ========== MAIN CHAT LAYOUT ========== */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========== CONVERSATIONS SIDEBAR ========== */}
        <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 bg-base-100 flex-col border-r border-base-300/50`}>
          {/* Search Header */}
          <div className="p-4 border-b border-base-300/50">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Chats</h1>
              <button onClick={fetchConversations} className="btn btn-ghost btn-sm btn-circle">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
              <input
                type="text"
                placeholder="Suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10 bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-base-200 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-base-content/30" />
                </div>
                <p className="font-medium text-base-content/70">Keine Gespräche</p>
                <p className="text-sm text-base-content/50 mt-1">Neue Nachrichten erscheinen hier</p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                      selectedConversation?.id === conv.id 
                        ? "bg-primary/10 border border-primary/20" 
                        : "hover:bg-base-200/70"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="avatar placeholder">
                      <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-full w-12 h-12 shadow-sm">
                        <span className="text-lg font-medium">{getInitial(conv)}</span>
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold truncate">{getDisplayName(conv)}</span>
                        <span className="text-xs text-base-content/50 flex-shrink-0">{formatTime(conv.last_message_at)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {conv.ai_paused ? (
                          <span className="badge badge-warning badge-xs gap-1">
                            <Pause className="w-2 h-2" /> Manuell
                          </span>
                        ) : conv.needs_human_review ? (
                          <span className="badge badge-error badge-xs">Wichtig</span>
                        ) : (
                          <span className="badge badge-success badge-xs gap-1">
                            <Bot className="w-2 h-2" /> KI
                          </span>
                        )}
                        {!conv.is_read && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========== CHAT AREA ========== */}
        <div className={`${selectedConversation ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-base-100`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-b border-base-300/50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="btn btn-ghost btn-sm btn-circle md:hidden"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="avatar placeholder">
                    <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-full w-10 h-10 shadow-sm">
                      <span>{getInitial(selectedConversation)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{getDisplayName(selectedConversation)}</p>
                    <p className="text-xs text-base-content/50">Instagram</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleAIPause}
                    className={`btn btn-sm gap-2 ${
                      selectedConversation.ai_paused 
                        ? "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20" 
                        : "bg-success/10 text-success hover:bg-success/20 border-success/20"
                    }`}
                  >
                    {selectedConversation.ai_paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    <span className="hidden sm:inline">{selectedConversation.ai_paused ? "KI aktivieren" : "Manuell"}</span>
                  </button>
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-2xl z-10 w-52 p-2 shadow-xl border border-base-200">
                      <li><a className="rounded-xl">Als ungelesen markieren</a></li>
                      <li><a className="rounded-xl">Archivieren</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-base-200/30 bg-dots">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.direction === "outbound" ? "justify-end" : "justify-start"} animate-message`}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className={`max-w-[80%] md:max-w-[70%] ${message.direction === "outbound" ? "order-2" : ""}`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.direction === "outbound"
                          ? "bg-primary text-primary-content rounded-br-md"
                          : "bg-base-100 shadow-sm rounded-bl-md"
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        {message.is_ai_generated && (
                          <span className={`inline-flex items-center gap-1 text-xs mt-2 ${
                            message.direction === "outbound" ? "text-primary-content/70" : "text-base-content/50"
                          }`}>
                            <Sparkles className="w-3 h-3" /> KI-generiert
                          </span>
                        )}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 text-xs text-base-content/40 ${
                        message.direction === "outbound" ? "justify-end" : ""
                      }`}>
                        {message.status === "delivered" && <CheckCheck className="w-3 h-3" />}
                        {formatTime(message.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 bg-base-100 border-t border-base-300/50 safe-pb">
                {selectedConversation.ai_paused && (
                  <div className="alert bg-warning/10 border border-warning/20 mb-3 py-3 rounded-xl">
                    <Pause className="w-4 h-4 text-warning" />
                    <span className="text-sm text-warning">Du führst das Gespräch – KI ist pausiert</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nachricht schreiben..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="input input-bordered flex-1 bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="btn btn-primary btn-square"
                  >
                    {sending ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center bg-base-200/30 bg-dots">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 animate-float">
                <MessageSquare className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wähle ein Gespräch</h3>
              <p className="text-base-content/60 text-center max-w-xs">
                Klicke auf ein Gespräch in der Liste, um die Nachrichten anzuzeigen
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========== MOBILE BOTTOM NAV ========== */}
      <div className="btm-nav btm-nav-sm md:hidden bg-base-100/90 backdrop-blur-xl border-t border-base-300/50 safe-pb">
        <Link to="/dashboard" className="hover:bg-base-200/50">
          <LayoutDashboard className="w-5 h-5" />
          <span className="btm-nav-label text-xs">Dashboard</span>
        </Link>
        <Link to="/inbox" className="text-primary bg-primary/10">
          <InboxIcon className="w-5 h-5" />
          <span className="btm-nav-label text-xs font-medium">Inbox</span>
        </Link>
        <Link to="/settings" className="hover:bg-base-200/50">
          <Settings className="w-5 h-5" />
          <span className="btm-nav-label text-xs">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Inbox;
