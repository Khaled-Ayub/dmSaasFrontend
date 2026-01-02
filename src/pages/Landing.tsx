import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Zap, 
  Bot, 
  Shield, 
  ArrowRight, 
  Check,
  Instagram,
  Clock,
  TrendingUp,
  Users
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Bot,
      title: "KI-gestützte Antworten",
      description: "Automatische, intelligente Antworten auf häufige Kundenanfragen rund um die Uhr.",
    },
    {
      icon: Zap,
      title: "Blitzschnelle Reaktion",
      description: "Antworten Sie in Sekunden statt Stunden und steigern Sie die Kundenzufriedenheit.",
    },
    {
      icon: Shield,
      title: "Sicher & DSGVO-konform",
      description: "Ihre Daten werden verschlüsselt gespeichert und nach europäischen Standards geschützt.",
    },
    {
      icon: Users,
      title: "Team-Kollaboration",
      description: "Arbeiten Sie mit Ihrem Team zusammen und behalten Sie alle Gespräche im Blick.",
    },
  ];

  const stats = [
    { value: "500+", label: "Zufriedene Kunden" },
    { value: "2M+", label: "Nachrichten verarbeitet" },
    { value: "95%", label: "Zeitersparnis" },
    { value: "4.9★", label: "Kundenbewertung" },
  ];

  const testimonials = [
    {
      name: "Sarah Müller",
      role: "E-Commerce Inhaberin",
      text: "DMAuto hat unseren Kundenservice revolutioniert. Wir sparen täglich Stunden an Arbeit.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Markus Weber",
      role: "Social Media Manager",
      text: "Die KI versteht Kundenanfragen erstaunlich gut. Eskalationen sind um 70% gesunken.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Lisa Schmidt",
      role: "Startup Gründerin",
      text: "Endlich kann ich mich auf mein Kerngeschäft konzentrieren. DMAuto übernimmt den Rest.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-md shadow-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">DMAuto</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">So funktioniert's</a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Kundenstimmen</a>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                Anmelden
              </Link>
              <Link 
                to="/login?signup=true" 
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
              >
                Kostenlos starten
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-highlight/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Instagram className="w-4 h-4" />
              Instagram DM Automation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in leading-tight">
              Automatisieren Sie Ihre
              <span className="text-primary"> Instagram DMs</span>
              <br />mit KI-Power
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.1s" }}>
              Beantworten Sie Kundenanfragen automatisch, sparen Sie Zeit und steigern Sie Ihre Verkäufe – 24/7, ohne zusätzliches Personal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Link 
                to="/login?signup=true" 
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all shadow-button hover:shadow-hover group"
              >
                14 Tage kostenlos testen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#how-it-works" 
                className="px-6 py-3 text-foreground font-medium hover:bg-secondary rounded-xl transition-colors"
              >
                Mehr erfahren
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Alles was Sie brauchen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leistungsstarke Funktionen für professionelles Instagram-Management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className="card-dashboard group hover:scale-[1.02] transition-transform"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              So einfach funktioniert's
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In nur drei Schritten zur automatisierten Kundenkommunikation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Instagram,
                title: "Account verbinden",
                description: "Verbinden Sie Ihren Instagram Business Account sicher mit DMAuto.",
              },
              {
                step: "02",
                icon: Bot,
                title: "KI trainieren",
                description: "Richten Sie automatische Antworten ein oder lassen Sie unsere KI lernen.",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Ergebnisse sehen",
                description: "Beobachten Sie, wie Ihre Antwortzeiten sinken und Verkäufe steigen.",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="text-6xl font-bold text-primary/10 absolute -top-4 left-0">
                    {item.step}
                  </div>
                  <div className="pt-12">
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-button">
                      <IconComponent className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Was unsere Kunden sagen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tausende Unternehmen vertrauen bereits auf DMAuto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-dashboard">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-foreground/80 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="rounded-[24px] p-8 md:p-12 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(228, 35%, 18%) 0%, hsl(228, 40%, 25%) 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Bereit, Ihre DMs zu automatisieren?
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Starten Sie noch heute kostenlos und erleben Sie, wie DMAuto Ihren Kundenservice transformiert.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/login?signup=true" 
                  className="flex items-center gap-2 px-6 py-3 bg-white text-foreground rounded-xl font-medium hover:shadow-hover transition-all group"
                >
                  Jetzt kostenlos starten
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <p className="text-white/50 text-sm mt-4">
                <Check className="w-4 h-4 inline mr-1" />
                Keine Kreditkarte erforderlich
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">DMAuto</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-foreground transition-colors">AGB</a>
              <a href="#" className="hover:text-foreground transition-colors">Impressum</a>
              <a href="#" className="hover:text-foreground transition-colors">Kontakt</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 DMAuto. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
