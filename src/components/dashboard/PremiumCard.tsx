import { ArrowRight, Sparkles } from "lucide-react";

const PremiumCard = () => {
  return (
    <div
      className="rounded-[20px] p-6 animate-fade-in relative overflow-hidden"
      style={{
        animationDelay: "0.2s",
        background: "linear-gradient(135deg, hsl(228, 35%, 18%) 0%, hsl(228, 40%, 22%) 100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-highlight" />
          <span className="text-highlight text-sm font-medium">Premium</span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">
          KI-Funktionen freischalten
        </h3>
        <p className="text-white/70 text-sm mb-5">
          Aktivieren Sie automatische Antworten für alle Accounts
        </p>

        <button className="flex items-center gap-2 bg-white text-foreground px-5 py-2.5 rounded-xl font-medium text-sm hover:shadow-hover transition-all group">
          Jetzt aktivieren
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PremiumCard;
