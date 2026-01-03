import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Search,
  Send,
  Bot,
  User,
  Settings,
  LayoutDashboard,
  Inbox as InboxIcon,
  RefreshCw,
  CheckCheck,
  Clock,
  AlertCircle,
  Sparkles,
  Pause,
  Play,
  Star,
  MoreHorizontal,
  Plus,
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
  messages?: Message[];
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Fetch messages for a conversation
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

  // Toggle AI pause/resume
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
        setSelectedConversation({
          ...selectedConversation,
          ai_paused: newPausedState,
        });
        setConversations(prev =>
          prev.map(c =>
            c.id === selectedConversation.id
              ? { ...c, ai_paused: newPausedState }
              : c
          )
        );
      }
    } catch (error) {
      console.error("Error toggling AI pause:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fetch messages when conversation selected
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      const interval = setInterval(() => fetchMessages(selectedConversation.id), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    const name = conv.participant_name || conv.participant_username || conv.participant_ig_id;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Format time
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

  // Get user initials or first letter
  const getInitials = (conv: Conversation) => {
    const name = conv.participant_name || conv.participant_username;
    if (name) return name.charAt(0).toUpperCase();
    return conv.participant_ig_id.slice(-2).toUpperCase();
  };

  // Generate avatar color based on ID
  const getAvatarColor = (id: string) => {
    const colors = [
      "from-blue-500 to-cyan-400",
      "from-purple-500 to-pink-400",
      "from-orange-500 to-yellow-400",
      "from-green-500 to-emerald-400",
      "from-rose-500 to-red-400",
      "from-indigo-500 to-blue-400",
    ];
    const index = id.charCodeAt(id.length - 1) % colors.length;
    return colors[index];
  };

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
            to="/inbox"
            className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-all hover:scale-105"
          >
            <InboxIcon className="w-5 h-5" />
          </Link>
          <Link
            to="/dashboard"
            className="w-11 h-11 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-all"
          >
            <LayoutDashboard className="w-5 h-5" />
          </Link>
          <Link
            to="/settings"
            className="w-11 h-11 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-all"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </nav>

        {/* Bottom - AI Status */}
        <div className="mt-auto flex flex-col items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
        </div>
      </aside>

      {/* Conversations Panel */}
      <div className="w-[320px] bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col h-full">
        {/* Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-slate-800">Chats</h1>
            <button className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/80 border-0 rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <RefreshCw className="w-5 h-5 text-slate-400 animate-spin" />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400">
              <MessageSquare className="w-10 h-10 mb-2 opacity-50" />
              <p className="text-sm">Keine Gespräche</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-3 flex items-center gap-3 rounded-xl transition-all text-left group ${
                    selectedConversation?.id === conversation.id
                      ? "bg-blue-50 shadow-sm"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-11 h-11 bg-gradient-to-br ${getAvatarColor(conversation.id)} rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm`}>
                      {getInitials(conversation)}
                    </div>
                    {!conversation.is_read && (
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`font-medium text-sm truncate ${
                        selectedConversation?.id === conversation.id ? "text-blue-900" : 
                        !conversation.is_read ? "text-slate-800" : "text-slate-600"
                      }`}>
                        {conversation.participant_name || conversation.participant_username || `User ${conversation.participant_ig_id.slice(-4)}`}
                      </span>
                      <span className="text-xs text-slate-400 flex-shrink-0 ml-2">
                        {formatTime(conversation.last_message_at)}
                      </span>
                    </div>
                    
                    {/* Status badges */}
                    <div className="flex items-center gap-2">
                      {conversation.ai_paused ? (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                          <Pause className="w-3 h-3" />
                          Manuell
                        </span>
                      ) : conversation.needs_human_review ? (
                        <span className="inline-flex items-center gap-1 text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3" />
                          Wichtig
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <Bot className="w-3 h-3" />
                          KI aktiv
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={fetchConversations}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Aktualisieren
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full min-h-0 bg-white/50">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-[72px] bg-white border-b border-slate-200/60 flex items-center justify-between px-6 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 bg-gradient-to-br ${getAvatarColor(selectedConversation.id)} rounded-full flex items-center justify-center text-white font-medium shadow-sm`}>
                  {getInitials(selectedConversation)}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {selectedConversation.participant_name || selectedConversation.participant_username || `User ${selectedConversation.participant_ig_id.slice(-4)}`}
                  </h2>
                  <p className="text-xs text-slate-400">Instagram • Online</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* AI Toggle */}
                <button
                  onClick={toggleAIPause}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedConversation.ai_paused
                      ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  {selectedConversation.ai_paused ? (
                    <>
                      <Play className="w-4 h-4" />
                      KI aktivieren
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4" />
                      Selbst antworten
                    </>
                  )}
                </button>
                
                <button className="w-9 h-9 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors">
                  <Star className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 min-h-0">
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.direction === "outbound" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.direction === "outbound"
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                          : "bg-white text-slate-800 shadow-sm border border-slate-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <div className={`flex items-center gap-2 mt-2 text-xs ${
                        message.direction === "outbound" ? "text-blue-100" : "text-slate-400"
                      }`}>
                        {message.is_ai_generated && (
                          <span className="flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded-full">
                            <Sparkles className="w-3 h-3" />
                            KI
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          {message.status === "delivered" ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {formatTime(message.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-slate-200/60 flex-shrink-0">
              <div className="max-w-3xl mx-auto">
                {/* AI Paused Warning */}
                {selectedConversation.ai_paused && (
                  <div className="mb-3 px-4 py-2.5 bg-amber-50 border border-amber-200/60 rounded-xl flex items-center gap-2 text-sm text-amber-700">
                    <Pause className="w-4 h-4" />
                    Du führst das Gespräch – KI-Antworten sind pausiert
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Nachricht schreiben..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 bg-slate-100/80 border-0 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:outline-none transition-all"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="h-11 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Senden
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/10">
              <MessageSquare className="w-9 h-9 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Wähle ein Gespräch</h3>
            <p className="text-sm text-slate-400">Klicke auf ein Gespräch um die Nachrichten zu sehen</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
