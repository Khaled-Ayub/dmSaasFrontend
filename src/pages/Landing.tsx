import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  BoltIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  UserGroupIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
  PlayIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

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

// Custom Instagram Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

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

  // Features
  const features = [
    {
      icon: BotIcon,
      title: "KI-Automatisierung",
      description: "Intelligente Antworten auf Kundenanfragen rund um die Uhr – ohne Pause",
      color: "primary",
    },
    {
      icon: BoltIcon,
      title: "Blitzschnell",
      description: "Durchschnittliche Antwortzeit unter 5 Sekunden – bevor Kunden abspringen",
      color: "warning",
    },
    {
      icon: ShieldCheckIcon,
      title: "Smart Eskalation",
      description: "Erkennt wichtige Anfragen automatisch zur manuellen Bearbeitung",
      color: "error",
    },
    {
      icon: ChartBarIcon,
      title: "Statistiken",
      description: "Detaillierte Einblicke in deine Konversationen und KI-Performance",
      color: "success",
    },
  ];

  // Benefits
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
      avatar: "SM",
    },
    {
      name: "Max K.",
      role: "Content Creator",
      text: "Mit über 100 DMs täglich war ich überfordert. Jetzt antwortet die KI und ich konzentriere mich auf Content.",
      rating: 5,
      avatar: "MK",
    },
    {
      name: "Lisa B.",
      role: "Freelancerin",
      text: "Die Eskalationsfunktion ist genial – wichtige Anfragen erkenne ich sofort, der Rest läuft automatisch.",
      rating: 5,
      avatar: "LB",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* ========== NAVBAR ========== */}
      <div className="navbar bg-base-100/80 backdrop-blur-xl border-b border-base-200/50 sticky top-0 z-50 px-4 lg:px-8">
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <img src="/logo.png" alt="DMAuto" className="w-8 h-8 rounded-lg" />
            </div>
            <span className="font-bold text-xl hidden sm:inline">DMAuto</span>
          </Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            <li><a href="#features" className="hover:bg-base-200/50 rounded-xl">Features</a></li>
            <li><a href="#benefits" className="hover:bg-base-200/50 rounded-xl">Vorteile</a></li>
            <li><a href="#testimonials" className="hover:bg-base-200/50 rounded-xl">Kundenstimmen</a></li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm">
            {theme === "dmauto" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
          <Link to="/dashboard" className="btn btn-primary btn-sm gap-2 shadow-md">
            Dashboard
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-soft delay-500"></div>

        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
              <SparklesIcon className="w-4 h-4" />
              KI-gestützte Instagram Automatisierung
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in delay-100">
              Deine Instagram DMs
              <br />
              <span className="gradient-text">auf Autopilot</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
              DMAuto beantwortet Kundenanfragen automatisch mit KI – 
              24/7, personalisiert und in Sekundenschnelle. 
              Mehr Verkäufe, weniger Stress.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Link to="/dashboard" className="btn btn-primary btn-lg gap-2 shadow-lg glow-primary">
                Jetzt starten
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <a href="#features" className="btn btn-outline btn-lg gap-2">
                <PlayIcon className="w-5 h-5" />
                Mehr erfahren
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 animate-fade-in delay-400">
              <div className="flex -space-x-3">
                {["SK", "MK", "LB", "JM", "PH"].map((initials, i) => (
                  <div key={i} className="avatar placeholder">
                    <div className="w-11 h-11 bg-gradient-to-br from-primary to-secondary text-white rounded-full ring-2 ring-base-100 shadow-md">
                      <span className="text-xs font-medium">{initials}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarSolid key={i} className="w-5 h-5 text-warning" />
                  ))}
                  <span className="ml-2 font-semibold">4.9/5</span>
                </div>
                <p className="text-sm text-base-content/60">Von 500+ Creators geliebt</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="py-20 lg:py-28 bg-base-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="badge badge-secondary badge-lg gap-2 mb-4">
              <BoltIcon className="w-3 h-3" />
              Features
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
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
                <div 
                  key={index} 
                  className="card bg-base-100 shadow-sm card-hover shine animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-body p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-7 h-7 text-${feature.color}`} />
                    </div>
                    <h3 className="card-title text-lg mb-2">{feature.title}</h3>
                    <p className="text-base-content/60 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-20 lg:py-28 bg-base-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="badge badge-accent badge-lg gap-2 mb-4">
              <ChatBubbleLeftRightIcon className="w-3 h-3" />
              So funktioniert's
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              In 3 Schritten startklar
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { step: "01", title: "Instagram verbinden", desc: "Business Account mit DMAuto verknüpfen – dauert nur 2 Minuten" },
              { step: "02", title: "KI anpassen", desc: "Tonfall, Sprache und Business-Kontext nach deinen Wünschen einstellen" },
              { step: "03", title: "Autopilot aktivieren", desc: "Lehne dich zurück – die KI übernimmt deine DMs automatisch" },
            ].map((item, i) => (
              <div key={i} className="relative animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2">{item.step}</div>
                <div className="relative pt-8">
                  <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-base-content/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section id="benefits" className="py-20 lg:py-28 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in">
              <div className="badge bg-white/10 border-white/20 text-white gap-2 mb-6">
                <ArrowTrendingUpIcon className="w-3 h-3" />
                Vorteile
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Warum DMAuto?
              </h2>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                Instagram Creators und Shops verbringen durchschnittlich 3+ Stunden 
                täglich mit DMs. Mit DMAuto sparst du diese Zeit und verpasst 
                trotzdem keine wichtige Anfrage.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircleIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="animate-slide-up delay-200">
              <div className="card bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
                <div className="card-body p-8">
                  <div className="space-y-8">
                    {[
                      { value: "3h+", label: "Zeitersparnis", sublabel: "pro Tag" },
                      { value: "<5s", label: "Antwortzeit", sublabel: "durchschnittlich" },
                      { value: "98%", label: "Zufriedenheit", sublabel: "der Nutzer" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-5xl font-bold mb-1">{stat.value}</div>
                        <div className="text-white/60 text-sm">{stat.label}</div>
                        <div className="text-white/40 text-xs">{stat.sublabel}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section id="testimonials" className="py-20 lg:py-28 bg-base-200/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="badge badge-primary badge-lg gap-2 mb-4">
              <UserGroupIcon className="w-3 h-3" />
              Kundenstimmen
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Was unsere Nutzer sagen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="card bg-base-100 shadow-sm card-hover animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="card-body p-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarSolid key={i} className="w-5 h-5 text-warning" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-base-content/80 italic leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="avatar placeholder">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-md">
                        <span className="font-medium">{testimonial.avatar}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-base-content/50">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 lg:py-28 bg-base-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        
        <div className="container mx-auto px-4 max-w-3xl text-center relative">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-8 shadow-xl glow-primary animate-float">
            <InstagramIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Bereit für Autopilot?
          </h2>
          <p className="text-base-content/60 mb-10 max-w-xl mx-auto text-lg">
            Starte jetzt und lass deine Instagram DMs intelligent bearbeiten. 
            Mehr Zeit für das, was du liebst.
          </p>
          <Link to="/dashboard" className="btn btn-primary btn-lg gap-2 shadow-lg glow-primary">
            Zum Dashboard
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 bg-base-200 border-t border-base-300/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
                <img src="/logo.png" alt="DMAuto" className="w-8 h-8 rounded-lg" />
              </div>
              <div>
                <p className="font-bold">DMAuto</p>
                <p className="text-sm text-base-content/50">KI-gestützte Instagram DM Automatisierung</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-base-content/60">
              <a href="#" className="hover:text-primary transition-colors">Impressum</a>
              <a href="#" className="hover:text-primary transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-primary transition-colors">Kontakt</a>
            </div>
            
            <p className="text-sm text-base-content/50">
              © {new Date().getFullYear()} DMAuto – Made with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
