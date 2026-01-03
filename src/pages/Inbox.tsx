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
} from "lucide-react";

// Types
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

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/conversations/`);
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages
  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/conversations/${conversationId}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send message
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
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  // Toggle AI pause
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
      console.error("Error toggling AI pause:", error);
    }
  };

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

  const filteredConversations = conversations.filter((conv) => {
    const name = conv.participant_name || conv.participant_username || conv.participant_ig_id;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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

  const getInitials = (conv: Conversation) => {
    const name = conv.participant_name || conv.participant_username;
    if (name) return name.charAt(0).toUpperCase();
    return conv.participant_ig_id.slice(-2).toUpperCase();
  };

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      {/* Desktop Navbar - nur auf Desktop */}
      <div className="navbar bg-base-100 shadow-sm hidden md:flex">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost gap-2">
            <img src="/logo.png" alt="DMAuto" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-lg">DMAuto</span>
          </Link>
        </div>
        
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li><Link to="/dashboard"><LayoutDashboard className="w-4 h-4" />Dashboard</Link></li>
            <li><Link to="/inbox" className="active"><InboxIcon className="w-4 h-4" />Inbox</Link></li>
            <li><Link to="/settings"><Settings className="w-4 h-4" />Einstellungen</Link></li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "dmauto" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Chat Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 bg-base-100 flex-col border-r border-base-300`}>
          {/* Search Header */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-bold">Chats</h1>
              <button onClick={fetchConversations} className="btn btn-ghost btn-sm btn-circle">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
            <div className="join w-full">
              <div className="join-item flex items-center pl-3 bg-base-200 rounded-l-lg">
                <Search className="w-4 h-4 text-base-content/50" />
              </div>
              <input
                type="text"
                placeholder="Suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-sm bg-base-200 join-item flex-1 focus:outline-none"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto text-base-content/30 mb-3" />
                <p className="text-base-content/60">Keine Gespräche</p>
              </div>
            ) : (
              <ul className="menu p-2 gap-1">
                {filteredConversations.map((conv) => (
                  <li key={conv.id}>
                    <button
                      onClick={() => setSelectedConversation(conv)}
                      className={`flex items-center gap-3 p-3 ${selectedConversation?.id === conv.id ? "active" : ""}`}
                    >
                      <div className="avatar placeholder">
                        <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-10">
                          <span>{getInitials(conv)}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">
                            {conv.participant_name || conv.participant_username || `User ${conv.participant_ig_id.slice(-4)}`}
                          </span>
                          <span className="text-xs text-base-content/50">{formatTime(conv.last_message_at)}</span>
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
                          {!conv.is_read && <span className="badge badge-primary badge-xs"></span>}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${selectedConversation ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-base-100`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="navbar bg-base-100 border-b border-base-300 min-h-0 px-4 py-2">
                <div className="navbar-start gap-2">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="btn btn-ghost btn-sm btn-circle md:hidden"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="avatar placeholder">
                    <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-10">
                      <span>{getInitials(selectedConversation)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {selectedConversation.participant_name || selectedConversation.participant_username || `User ${selectedConversation.participant_ig_id.slice(-4)}`}
                    </p>
                    <p className="text-xs text-base-content/50">Instagram</p>
                  </div>
                </div>
                <div className="navbar-end gap-1">
                  <button
                    onClick={toggleAIPause}
                    className={`btn btn-sm gap-1 ${selectedConversation.ai_paused ? "btn-warning" : "btn-success"}`}
                  >
                    {selectedConversation.ai_paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    <span className="hidden sm:inline">{selectedConversation.ai_paused ? "KI aktivieren" : "Manuell"}</span>
                  </button>
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-lg">
                      <li><a>Als ungelesen markieren</a></li>
                      <li><a>Archivieren</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-base-200/50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`chat ${message.direction === "outbound" ? "chat-end" : "chat-start"} animate-message-in`}
                  >
                    <div className={`chat-bubble ${
                      message.direction === "outbound" 
                        ? "chat-bubble-primary" 
                        : "bg-base-100"
                    }`}>
                      {message.content}
                      {message.is_ai_generated && (
                        <span className="badge badge-ghost badge-xs gap-1 ml-2">
                          <Sparkles className="w-2 h-2" /> KI
                        </span>
                      )}
                    </div>
                    <div className="chat-footer opacity-50 text-xs flex items-center gap-1">
                      {message.status === "delivered" ? <CheckCheck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {formatTime(message.created_at)}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 bg-base-100 border-t border-base-300 safe-area-pb">
                {selectedConversation.ai_paused && (
                  <div className="alert alert-warning mb-3 py-2">
                    <Pause className="w-4 h-4" />
                    <span className="text-sm">Du führst das Gespräch – KI ist pausiert</span>
                  </div>
                )}
                <div className="join w-full">
                  <input
                    type="text"
                    placeholder="Nachricht schreiben..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="input input-bordered join-item flex-1"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="btn btn-primary join-item"
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
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wähle ein Gespräch</h3>
              <p className="text-base-content/60">Klicke auf ein Gespräch um die Nachrichten zu sehen</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="btm-nav btm-nav-sm md:hidden bg-base-100 border-t border-base-300">
        <Link to="/dashboard"><LayoutDashboard className="w-5 h-5" /><span className="btm-nav-label text-xs">Dashboard</span></Link>
        <Link to="/inbox" className="active text-primary"><InboxIcon className="w-5 h-5" /><span className="btm-nav-label text-xs">Inbox</span></Link>
        <Link to="/settings"><Settings className="w-5 h-5" /><span className="btm-nav-label text-xs">Settings</span></Link>
      </div>
    </div>
  );
};

export default Inbox;
