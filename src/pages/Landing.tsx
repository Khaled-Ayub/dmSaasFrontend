import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Bot,
  MessageSquare,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Instagram,
  Sparkles,
  Users,
  BarChart3,
  Sun,
  Moon,
} from "lucide-react";

const Landing = () => {
  const [theme, setTheme] = useState("dmauto");

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

  // Features für die Karussell-Animation
  const features = [
    {
      icon: Bot,
      title: "KI-Automatisierung",
      description: "Intelligente Antworten auf Kundenanfragen – 24/7 ohne Pause",
      color: "primary",
    },
    {
      icon: Zap,
      title: "Blitzschnell",
      description: "Durchschnittliche Antwortzeit unter 5 Sekunden",
      color: "warning",
    },
    {
      icon: Shield,
      title: "Eskalation",
      description: "Automatische Erkennung wichtiger Anfragen zur manuellen Bearbeitung",
      color: "error",
    },
    {
      icon: BarChart3,
      title: "Statistiken",
      description: "Umfassende Einblicke in deine Konversationen und KI-Leistung",
      color: "success",
    },
  ];

  // Vorteile
  const benefits = [
    "Mehr Zeit für kreative Arbeit",
    "Kunden bekommen sofort Antworten",
    "Weniger verpasste Verkäufe",
    "Skaliert mit deinem Wachstum",
    "Keine Programmierung nötig",
    "Vollständig anpassbar",
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Online Shop Inhaberin",
      text: "Seitdem ich DMAuto nutze, verpasse ich keine Kundenanfrage mehr. Mein Umsatz ist um 30% gestiegen!",
      rating: 5,
    },
    {
      name: "Max K.",
      role: "Influencer",
      text: "Mit über 100 DMs täglich war ich überfordert. Jetzt antwortet die KI und ich konzentriere mich auf Content.",
      rating: 5,
    },
    {
      name: "Lisa B.",
      role: "Freelancerin",
      text: "Die Eskalationsfunktion ist genial – wichtige Anfragen erkenne ich sofort, der Rest läuft automatisch.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <div className="navbar bg-base-100/80 backdrop-blur-lg sticky top-0 z-50 border-b border-base-200">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost gap-2">
            <img src="/logo.png" alt="DMAuto" className="w-10 h-10 rounded-xl" />
            <span className="font-bold text-xl hidden sm:inline">DMAuto</span>
          </Link>
        </div>
        
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a href="#features">Features</a></li>
            <li><a href="#benefits">Vorteile</a></li>
            <li><a href="#testimonials">Kundenstimmen</a></li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm">
            {theme === "dmauto" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <Link to="/dashboard" className="btn btn-primary btn-sm">
            Dashboard
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero min-h-[85vh] bg-gradient-to-br from-base-100 via-primary/5 to-secondary/5">
        <div className="hero-content text-center py-12">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="badge badge-lg badge-primary gap-2 mb-6">
              <Sparkles className="w-4 h-4" />
              KI-gestützte Instagram Automatisierung
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Deine Instagram DMs
              <br />
              <span className="gradient-text">auf Autopilot</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
              DMAuto beantwortet Kundenanfragen automatisch mit KI – 
              24/7, personalisiert und in Sekundenschnelle. 
              Mehr Verkäufe, weniger Stress.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="btn btn-primary btn-lg gap-2">
                Jetzt ausprobieren
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" className="btn btn-outline btn-lg">
                Mehr erfahren
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="avatar placeholder">
                    <div className="w-10 bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full ring ring-base-100">
                      <span className="text-xs">{["SK", "MK", "LB", "JM", "PH"][i - 1]}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-base-content/60">Von 500+ Creatorn geliebt</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="badge badge-secondary gap-2 mb-4">
              <Zap className="w-3 h-3" />
              Funktionen
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Alles was du brauchst
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Leistungsstarke Tools um deine Instagram DMs zu automatisieren 
              und mehr Zeit für das Wesentliche zu haben.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="card-body">
                    <div className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-7 h-7 text-${feature.color}`} />
                    </div>
                    <h3 className="card-title text-lg">{feature.title}</h3>
                    <p className="text-base-content/60 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="badge badge-accent gap-2 mb-4">
              <MessageSquare className="w-3 h-3" />
              So funktioniert's
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              In 3 Schritten startklar
            </h2>
          </div>

          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary">
              <div className="text-left lg:text-center mt-4 lg:mt-8">
                <h3 className="font-bold text-lg">Instagram verbinden</h3>
                <p className="text-base-content/60 text-sm mt-1">
                  Business Account mit DMAuto verknüpfen
                </p>
              </div>
            </li>
            <li className="step step-primary">
              <div className="text-left lg:text-center mt-4 lg:mt-8">
                <h3 className="font-bold text-lg">KI anpassen</h3>
                <p className="text-base-content/60 text-sm mt-1">
                  Tonfall und Business-Kontext einstellen
                </p>
              </div>
            </li>
            <li className="step step-primary">
              <div className="text-left lg:text-center mt-4 lg:mt-8">
                <h3 className="font-bold text-lg">Autopilot aktivieren</h3>
                <p className="text-base-content/60 text-sm mt-1">
                  Lehne dich zurück – die KI übernimmt
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-content">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-outline text-primary-content border-primary-content/30 gap-2 mb-4">
                <TrendingUp className="w-3 h-3" />
                Vorteile
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Warum DMAuto?
              </h2>
              <p className="text-primary-content/80 mb-8">
                Instagram Creators und Shops verbringen durchschnittlich 3+ Stunden 
                täglich mit DMs. Mit DMAuto sparst du diese Zeit und verpasst 
                trotzdem keine wichtige Anfrage.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-white/10 backdrop-blur-lg">
              <div className="card-body">
                <div className="stats stats-vertical shadow bg-transparent">
                  <div className="stat place-items-center">
                    <div className="stat-title text-primary-content/60">Zeitersparnis</div>
                    <div className="stat-value">3h+</div>
                    <div className="stat-desc text-primary-content/60">pro Tag</div>
                  </div>
                  <div className="stat place-items-center">
                    <div className="stat-title text-primary-content/60">Antwortzeit</div>
                    <div className="stat-value">&lt;5s</div>
                    <div className="stat-desc text-primary-content/60">durchschnittlich</div>
                  </div>
                  <div className="stat place-items-center">
                    <div className="stat-title text-primary-content/60">Zufriedenheit</div>
                    <div className="stat-value">98%</div>
                    <div className="stat-desc text-primary-content/60">der Nutzer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="badge badge-primary gap-2 mb-4">
              <Users className="w-3 h-3" />
              Kundenstimmen
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Was unsere Nutzer sagen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-base-content/80 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="avatar placeholder">
                      <div className="w-10 bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full">
                        <span>{testimonial.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-base-content/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Instagram className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit für Autopilot?
          </h2>
          <p className="text-base-content/60 mb-8 max-w-xl mx-auto">
            Starte jetzt und lass deine Instagram DMs intelligent bearbeiten. 
            Mehr Zeit für das, was du liebst.
          </p>
          <Link to="/dashboard" className="btn btn-primary btn-lg gap-2">
            Zum Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <aside>
          <img src="/logo.png" alt="DMAuto" className="w-12 h-12 rounded-xl mb-4" />
          <p className="font-bold">
            DMAuto
          </p>
          <p>KI-gestützte Instagram DM Automatisierung</p>
          <p className="text-base-content/60 mt-4">
            © {new Date().getFullYear()} DMAuto – Made with ❤️
          </p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a className="link link-hover">Impressum</a>
            <a className="link link-hover">Datenschutz</a>
            <a className="link link-hover">Kontakt</a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Landing;
