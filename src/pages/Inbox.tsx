// Inbox Page - DMAuto
// Komplett redesigned mit HeroUI Komponenten
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Avatar,
  Chip,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@heroui/react";
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  InboxIcon,
  ArrowPathIcon,
  CheckIcon,
  SparklesIcon,
  PauseIcon,
  PlayIcon,
  ArrowLeftIcon,
  SunIcon,
  MoonIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

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

const Inbox = () => {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldBeDark = savedTheme === "dark";
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
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
    <div className="h-screen bg-slate-100 dark:bg-slate-900 flex flex-col transition-colors">
      {/* ========== DESKTOP NAVBAR ========== */}
      <Navbar 
        maxWidth="full" 
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 hidden md:flex"
        isBlurred
      >
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <img src="/logo.png" alt="DMAuto" className="w-7 h-7 rounded-lg" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">DMAuto</span>
          </Link>
        </NavbarBrand>
        
        <NavbarContent className="gap-1" justify="center">
          <NavbarItem>
            <Button as={Link} to="/dashboard" variant="light" startContent={<Squares2X2Icon className="w-5 h-5" />}>
              Dashboard
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/inbox" variant="flat" color="primary" startContent={<InboxIcon className="w-5 h-5" />}>
              Inbox
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/settings" variant="light" startContent={<Cog6ToothIcon className="w-5 h-5" />}>
              Einstellungen
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button isIconOnly variant="light" onClick={toggleTheme} aria-label="Theme wechseln">
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* ========== MAIN CHAT LAYOUT ========== */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========== CONVERSATIONS SIDEBAR ========== */}
        <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 bg-white dark:bg-slate-800 flex-col border-r border-slate-200 dark:border-slate-700`}>
          {/* Search Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Chats</h1>
              <Button 
                isIconOnly 
                variant="light" 
                onClick={fetchConversations}
                size="sm"
              >
                <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
            
            {/* Search Input */}
            <Input
              placeholder="Suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<MagnifyingGlassIcon className="w-4 h-4 text-slate-400" />}
              classNames={{
                inputWrapper: "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600",
              }}
            />
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" color="primary" />
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-slate-400" />
                </div>
                <p className="font-medium text-slate-700 dark:text-slate-300">Keine Gespräche</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Neue Nachrichten erscheinen hier</p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                      selectedConversation?.id === conv.id 
                        ? "bg-primary-500/10 border border-primary-500/20" 
                        : "hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Avatar
                      name={getInitial(conv)}
                      classNames={{
                        base: "bg-gradient-to-br from-primary-500 to-secondary-500",
                        name: "text-white text-lg font-medium",
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold truncate text-slate-900 dark:text-white">{getDisplayName(conv)}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">{formatTime(conv.last_message_at)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {conv.ai_paused ? (
                          <Chip size="sm" color="warning" variant="flat" startContent={<PauseIcon className="w-2 h-2" />}>
                            Manuell
                          </Chip>
                        ) : conv.needs_human_review ? (
                          <Chip size="sm" color="danger" variant="flat">Wichtig</Chip>
                        ) : (
                          <Chip size="sm" color="success" variant="flat" startContent={<BotIcon className="w-2 h-2" />}>
                            KI
                          </Chip>
                        )}
                        {!conv.is_read && <span className="w-2 h-2 rounded-full bg-primary-500"></span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========== CHAT AREA ========== */}
        <div className={`${selectedConversation ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white dark:bg-slate-800`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => setSelectedConversation(null)}
                    className="md:hidden"
                    size="sm"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                  </Button>
                  <Avatar
                    name={getInitial(selectedConversation)}
                    size="sm"
                    classNames={{
                      base: "bg-gradient-to-br from-primary-500 to-secondary-500",
                      name: "text-white font-medium",
                    }}
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{getDisplayName(selectedConversation)}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Instagram</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="flat"
                    color={selectedConversation.ai_paused ? "warning" : "success"}
                    startContent={selectedConversation.ai_paused ? <PlayIcon className="w-4 h-4" /> : <PauseIcon className="w-4 h-4" />}
                    onClick={toggleAIPause}
                    size="sm"
                  >
                    <span className="hidden sm:inline">{selectedConversation.ai_paused ? "KI aktivieren" : "Manuell"}</span>
                  </Button>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light" size="sm">
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Optionen">
                      <DropdownItem key="unread">Als ungelesen markieren</DropdownItem>
                      <DropdownItem key="archive">Archivieren</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900 bg-dots">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.direction === "outbound" ? "justify-end" : "justify-start"} animate-message`}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className={`max-w-[80%] md:max-w-[70%] ${message.direction === "outbound" ? "order-2" : ""}`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.direction === "outbound"
                          ? "bg-primary-500 text-white rounded-br-md"
                          : "bg-white dark:bg-slate-800 shadow-sm rounded-bl-md text-slate-900 dark:text-white"
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        {message.is_ai_generated && (
                          <span className={`inline-flex items-center gap-1 text-xs mt-2 ${
                            message.direction === "outbound" ? "text-white/70" : "text-slate-500 dark:text-slate-400"
                          }`}>
                            <SparklesIcon className="w-3 h-3" /> KI-generiert
                          </span>
                        )}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 text-xs text-slate-400 ${
                        message.direction === "outbound" ? "justify-end" : ""
                      }`}>
                        {message.status === "delivered" && <CheckIcon className="w-3 h-3" />}
                        {formatTime(message.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 safe-pb">
                {selectedConversation.ai_paused && (
                  <Card className="mb-3 bg-amber-500/10 border border-amber-500/20" shadow="none">
                    <CardBody className="flex flex-row items-center gap-2 py-2 px-3">
                      <PauseIcon className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-amber-600 dark:text-amber-400">Du führst das Gespräch – KI ist pausiert</span>
                    </CardBody>
                  </Card>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Nachricht schreiben..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    classNames={{
                      inputWrapper: "bg-slate-100 dark:bg-slate-700",
                    }}
                    className="flex-1"
                  />
                  <Button
                    isIconOnly
                    color="primary"
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sending}
                  >
                    {sending ? <Spinner size="sm" color="current" /> : <PaperAirplaneIcon className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 bg-dots">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center mb-6 animate-float">
                <ChatBubbleLeftRightIcon className="w-10 h-10 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Wähle ein Gespräch</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center max-w-xs">
                Klicke auf ein Gespräch in der Liste, um die Nachrichten anzuzeigen
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========== MOBILE BOTTOM NAV ========== */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 safe-pb z-50">
        <div className="flex items-center justify-around py-2">
          <Link to="/dashboard" className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary-500">
            <Squares2X2Icon className="w-6 h-6" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link to="/inbox" className="flex flex-col items-center p-2 text-primary-500">
            <InboxIcon className="w-6 h-6" />
            <span className="text-xs font-medium mt-1">Inbox</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary-500">
            <Cog6ToothIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
