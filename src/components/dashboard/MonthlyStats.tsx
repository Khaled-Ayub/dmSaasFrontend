import { ChevronDown, MessageCircle, Bot, AlertTriangle } from "lucide-react";

const MonthlyStats = () => {
  const stats = [
    {
      label: "Nachrichten",
      value: "284",
      icon: MessageCircle,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "KI-Antworten",
      value: "156",
      icon: Bot,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Eskaliert",
      value: "8",
      icon: AlertTriangle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];

  // Activity heatmap data (31 days)
  const activityData = Array.from({ length: 31 }, () => Math.random() * 100);

  return (
    <div className="card-dashboard animate-fade-in" style={{ animationDelay: "0.25s" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-foreground">Monatsstatistik</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
          Januar 2026
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="text-center">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <IconComponent className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Activity Heatmap */}
      <div>
        <p className="text-xs text-muted-foreground mb-3">Tägliche Aktivität</p>
        <div className="flex flex-wrap gap-1">
          {activityData.map((value, index) => {
            const intensity = value / 100;
            return (
              <div
                key={index}
                className="w-3 h-3 rounded-sm transition-colors hover:ring-2 hover:ring-primary/20"
                style={{
                  backgroundColor: `hsl(12, 100%, ${64 + (1 - intensity) * 30}%)`,
                  opacity: 0.3 + intensity * 0.7,
                }}
                title={`Tag ${index + 1}: ${Math.round(value)}% Aktivität`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">Weniger</span>
          <span className="text-xs text-muted-foreground">Mehr</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStats;
