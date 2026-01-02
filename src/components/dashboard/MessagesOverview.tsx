import { MessageCircle, ChevronDown, TrendingUp } from "lucide-react";

const MessagesOverview = () => {
  const days = ["S", "M", "D", "M", "D", "F", "S"];
  const values = [45, 72, 58, 89, 127, 95, 68];
  const maxValue = Math.max(...values);

  return (
    <div className="card-dashboard animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Nachrichten-Übersicht</h2>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
          Woche
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Verfolgen Sie eingehende Nachrichten und KI-Antworten
      </p>

      <div className="flex items-end justify-between gap-8">
        {/* Stat */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-success" />
            <span className="text-3xl font-bold text-success">+20%</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-[140px]">
            Diese Woche mehr als letzte Woche
          </p>
        </div>

        {/* Chart */}
        <div className="flex-1 flex items-end justify-end gap-3">
          {days.map((day, index) => {
            const height = (values[index] / maxValue) * 120;
            const isHighlighted = index === 4;

            return (
              <div key={index} className="flex flex-col items-center gap-2 relative group">
                {isHighlighted && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                    127 Nachrichten
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
                  </div>
                )}
                <div className="w-2 h-2 rounded-full bg-highlight opacity-0 group-hover:opacity-100 transition-opacity" />
                <div
                  className={`w-8 rounded-lg transition-all ${
                    isHighlighted
                      ? "bg-gradient-to-t from-highlight to-highlight/70"
                      : "bg-primary/20 group-hover:bg-primary/40"
                  }`}
                  style={{ height: `${height}px` }}
                />
                <span className="text-xs text-muted-foreground font-medium">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessagesOverview;
