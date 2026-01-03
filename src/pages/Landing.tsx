import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Zap, 
  Bot, 
  Shield, 
  ArrowRight, 
  Check,
  Instagram,
  TrendingUp,
  Users,
  Sparkles,
  Play,
  Star
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Bot,
      title: "KI-gestützte Antworten",
      description: "Automatische, intelligente Antworten auf häufige Kundenanfragen rund um die Uhr.",
      gradient: "from-primary to-primary/60",
    },
    {
      icon: Zap,
      title: "Blitzschnelle Reaktion",
      description: "Antworten Sie in Sekunden statt Stunden und steigern Sie die Kundenzufriedenheit.",
      gradient: "from-warning to-highlight",
    },
    {
      icon: Shield,
      title: "Sicher & DSGVO-konform",
      description: "Ihre Daten werden verschlüsselt gespeichert und nach europäischen Standards geschützt.",
      gradient: "from-success to-success/60",
    },
    {
      icon: Users,
      title: "Team-Kollaboration",
      description: "Arbeiten Sie mit Ihrem Team zusammen und behalten Sie alle Gespräche im Blick.",
      gradient: "from-purple-500 to-primary",
    },
  ];

  const stats = [
    { value: "500+", label: "Zufriedene Kunden", icon: Users },
    { value: "2M+", label: "Nachrichten verarbeitet", icon: MessageSquare },
    { value: "95%", label: "Zeitersparnis", icon: TrendingUp },
    { value: "4.9", label: "Kundenbewertung", icon: Star },
  ];

  const testimonials = [
    {
      name: "Sarah Müller",
      role: "E-Commerce Inhaberin",
      text: "DMAuto hat unseren Kundenservice revolutioniert. Wir sparen täglich Stunden an Arbeit.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Markus Weber",
      role: "Social Media Manager",
      text: "Die KI versteht Kundenanfragen erstaunlich gut. Eskalationen sind um 70% gesunken.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Lisa Schmidt",
      role: "Startup Gründerin",
      text: "Endlich kann ich mich auf mein Kerngeschäft konzentrieren. DMAuto übernimmt den Rest.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-card">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="DMAuto Logo" className="w-10 h-10 rounded-xl" />
              <span className="text-xl font-bold text-foreground">DMAuto</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">So funktioniert's</a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Kundenstimmen</a>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
              >
                Anmelden
              </Link>
              <Link 
                to="/login?signup=true" 
                className="px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-xl hover:opacity-90 transition-all shadow-button"
              >
                Kostenlos starten
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl float opacity-60" />
          <div className="absolute top-40 right-20 w-80 h-80 bg-highlight/20 rounded-full blur-3xl float-delayed opacity-50" />
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl float opacity-40" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div 
                className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-8"
                style={{ animation: "slide-in-left 0.6s ease-out" }}
              >
                <Sparkles className="w-4 h-4 text-highlight" />
                <span className="text-foreground">Neu: GPT-4 Integration verfügbar</span>
              </div>
              
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1]"
                style={{ animation: "slide-in-left 0.6s ease-out 0.1s both" }}
              >
                Instagram DMs
                <br />
                <span className="gradient-text">automatisiert.</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg"
                style={{ animation: "slide-in-left 0.6s ease-out 0.2s both" }}
              >
                Beantworten Sie Kundenanfragen automatisch mit KI, sparen Sie Zeit und steigern Sie Ihre Verkäufe – 24/7.
              </p>
              
              <div 
                className="flex flex-col sm:flex-row items-start gap-4"
                style={{ animation: "slide-in-left 0.6s ease-out 0.3s both" }}
              >
                <Link 
                  to="/login?signup=true" 
                  className="group flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-2xl font-medium hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                >
                  14 Tage kostenlos testen
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="flex items-center gap-3 px-6 py-4 text-foreground font-medium hover:bg-secondary/50 rounded-2xl transition-colors group">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Play className="w-4 h-4 text-primary ml-0.5" />
                  </div>
                  Demo ansehen
                </button>
              </div>

              {/* Trust Badges */}
              <div 
                className="mt-12 flex items-center gap-6"
                style={{ animation: "slide-in-left 0.6s ease-out 0.4s both" }}
              >
                <div className="flex -space-x-3">
                  {["photo-1494790108377-be9c29b29330", "photo-1507003211169-0a1dd7228f2d", "photo-1438761681033-6461ffad8d80", "photo-1500648767791-00dcc994a43e"].map((id, i) => (
                    <img 
                      key={i}
                      src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&crop=face`}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">500+</span> zufriedene Kunden
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div 
              className="relative"
              style={{ animation: "slide-in-right 0.8s ease-out 0.2s both" }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-highlight/20 rounded-3xl blur-2xl opacity-60" />
              
              {/* Mock Dashboard */}
              <div className="relative glass rounded-3xl p-2 shadow-2xl">
                <div className="bg-card rounded-2xl overflow-hidden">
                  {/* Mock Header */}
                  <div className="bg-secondary/50 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-warning/60" />
                      <div className="w-3 h-3 rounded-full bg-success/60" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-background/50 rounded-lg px-4 py-1 text-xs text-muted-foreground">
                        app.dmauto.de/dashboard
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="p-6 space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Nachrichten", value: "284", change: "+12%" },
                        { label: "KI-Antworten", value: "156", change: "+23%" },
                        { label: "Antwortzeit", value: "< 5s", change: "-85%" },
                      ].map((stat, i) => (
                        <div key={i} className="bg-secondary/30 rounded-xl p-3">
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className="text-lg font-bold text-foreground">{stat.value}</p>
                          <p className="text-xs text-success">{stat.change}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Mock Chat */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="bg-secondary/50 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-foreground">Hallo, wie lange dauert die Lieferung? 📦</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 justify-end">
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                          <p className="text-sm">Die Lieferung dauert 2-3 Werktage. ✨</p>
                          <p className="text-xs opacity-70 mt-1 flex items-center gap-1">
                            <Bot className="w-3 h-3" /> KI-Antwort
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-lg float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                    <Check className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Nachricht beantwortet</p>
                    <p className="text-xs text-muted-foreground">vor 2 Sekunden</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-6 glass rounded-2xl p-4 shadow-lg float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">+156% Antworten</p>
                    <p className="text-xs text-muted-foreground">Diese Woche</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-highlight/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-4xl md:text-5xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Alles was Sie brauchen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leistungsstarke Funktionen für professionelles Instagram-Management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className="group relative glass rounded-3xl p-8 hover:shadow-hover transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-highlight/10 rounded-full text-sm font-medium text-highlight mb-4">
              So funktioniert's
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              In 3 einfachen Schritten
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Zur automatisierten Kundenkommunikation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-highlight" />
            
            {[
              {
                step: "01",
                icon: Instagram,
                title: "Account verbinden",
                description: "Verbinden Sie Ihren Instagram Business Account sicher mit DMAuto.",
                color: "from-primary to-primary/60",
              },
              {
                step: "02",
                icon: Bot,
                title: "KI trainieren",
                description: "Richten Sie automatische Antworten ein oder lassen Sie unsere KI lernen.",
                color: "from-purple-500 to-primary",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Ergebnisse sehen",
                description: "Beobachten Sie, wie Ihre Antwortzeiten sinken und Verkäufe steigen.",
                color: "from-highlight to-warning",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 text-6xl font-bold text-border/50">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-highlight/10 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-success/10 rounded-full text-sm font-medium text-success mb-4">
              Kundenstimmen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Was unsere Kunden sagen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tausende Unternehmen vertrauen bereits auf DMAuto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass rounded-3xl p-8 hover:shadow-hover transition-all group"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-border"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative rounded-[32px] p-12 md:p-16 text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(228, 35%, 15%) 0%, hsl(228, 40%, 22%) 100%)",
            }}
          >
            {/* Animated Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl float opacity-50" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-highlight/30 rounded-full blur-3xl float-delayed opacity-50" />
            
            {/* Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-white/80 mb-6">
                <Sparkles className="w-4 h-4 text-highlight" />
                Keine Kreditkarte erforderlich
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Bereit, Ihre DMs
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-highlight">
                  zu automatisieren?
                </span>
              </h2>
              
              <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
                Starten Sie noch heute kostenlos und erleben Sie, wie DMAuto Ihren Kundenservice transformiert.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/login?signup=true" 
                  className="group flex items-center gap-3 px-8 py-4 bg-white text-foreground rounded-2xl font-medium hover:scale-105 transition-all shadow-xl"
                >
                  Jetzt kostenlos starten
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#features" 
                  className="px-8 py-4 text-white font-medium hover:bg-white/10 rounded-2xl transition-colors"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="DMAuto Logo" className="w-10 h-10 rounded-xl" />
              <span className="text-xl font-bold text-foreground">DMAuto</span>
            </div>
              <p className="text-muted-foreground max-w-sm mb-6">
                Automatisieren Sie Ihre Instagram Direct Messages mit KI-Power und steigern Sie Ihre Verkäufe.
              </p>
              <div className="flex items-center gap-4">
                {["twitter", "instagram", "linkedin"].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produkt</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Preise</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrationen</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Rechtliches</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Datenschutz</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">AGB</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Kontakt</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 DMAuto. Alle Rechte vorbehalten.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ in Deutschland
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
