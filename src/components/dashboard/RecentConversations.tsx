import { ChevronRight, Instagram, MessageSquare, ShoppingBag } from "lucide-react";

const RecentConversations = () => {
  const conversations = [
    {
      name: "Max Müller",
      status: "Beantwortet",
      statusType: "success" as const,
      lastMessage: "vor 2 Stunden",
      tags: ["Instagram", "Produktanfrage"],
      description: "Kunde fragt nach Lieferzeit für Bestellung #1234",
      location: "Deutschland",
      icon: ShoppingBag,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      name: "Laura Becker",
      status: "Offen",
      statusType: "warning" as const,
      lastMessage: "vor 30 Minuten",
      tags: ["Instagram", "Reklamation"],
      description: "Möchte Bestellung stornieren und Geld zurück",
      location: "Österreich",
      icon: MessageSquare,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
    {
      name: "Stefan Hofer",
      status: "KI",
      statusType: "primary" as const,
      lastMessage: "vor 5 Minuten",
      tags: ["Instagram", "Allgemein"],
      description: "Frage zu Öffnungszeiten - automatisch beantwortet",
      location: "Schweiz",
      icon: Instagram,
      iconBg: "bg-highlight/10",
      iconColor: "text-highlight",
    },
  ];

  const getStatusClass = (type: string) => {
    switch (type) {
      case "success":
        return "badge-success";
      case "warning":
        return "badge-warning";
      case "primary":
        return "badge-primary";
      default:
        return "badge-primary";
    }
  };

  return (
    <div className="card-dashboard animate-fade-in" style={{ animationDelay: "0.15s" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-foreground">Aktuelle Gespräche</h2>
        <a href="#" className="text-sm text-primary hover:underline font-medium">
          Alle anzeigen
        </a>
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {conversations.map((conv, index) => {
          const IconComponent = conv.icon;
          return (
            <div
              key={index}
              className="p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-button transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${conv.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className={`w-5 h-5 ${conv.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{conv.name}</span>
                    <span className={getStatusClass(conv.statusType)}>{conv.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Letzte Nachricht {conv.lastMessage}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {conv.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-0.5 bg-secondary rounded-md text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-foreground/80 mb-2 line-clamp-1">{conv.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      📍 {conv.location} | {conv.lastMessage}
                    </span>
                  </div>
                </div>

                {/* Expand */}
                <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentConversations;
