// Landing Page - DMAuto
// Komplett redesigned mit HeroUI Komponenten
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Avatar,
  Chip,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Divider,
} from "@heroui/react";
import {
  ChatBubbleLeftRightIcon,
  BoltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ArrowRightIcon,
  SparklesIcon,
  UserGroupIcon,
  SunIcon,
  MoonIcon,
  PlayIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

// Custom Bot Icon - HeroUI hat keine Bot Icons
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
  // State für Theme und Mobile Menu
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme aus localStorage laden und anwenden
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  // Theme Toggle Funktion
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Feature Daten
  const features = [
    {
      icon: BotIcon,
      title: "KI-Automatisierung",
      description: "Intelligente Antworten auf Kundenanfragen rund um die Uhr – ohne Pause",
      color: "primary" as const,
    },
    {
      icon: BoltIcon,
      title: "Blitzschnell",
      description: "Durchschnittliche Antwortzeit unter 5 Sekunden – bevor Kunden abspringen",
      color: "warning" as const,
    },
    {
      icon: ShieldCheckIcon,
      title: "Smart Eskalation",
      description: "Erkennt wichtige Anfragen automatisch zur manuellen Bearbeitung",
      color: "danger" as const,
    },
    {
      icon: ChartBarIcon,
      title: "Statistiken",
      description: "Detaillierte Einblicke in deine Konversationen und KI-Performance",
      color: "success" as const,
    },
  ];

  // Vorteile Liste
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
      initials: "SM",
    },
    {
      name: "Max K.",
      role: "Content Creator",
      text: "Mit über 100 DMs täglich war ich überfordert. Jetzt antwortet die KI und ich konzentriere mich auf Content.",
      rating: 5,
      initials: "MK",
    },
    {
      name: "Lisa B.",
      role: "Freelancerin",
      text: "Die Eskalationsfunktion ist genial – wichtige Anfragen erkenne ich sofort, der Rest läuft automatisch.",
      rating: 5,
      initials: "LB",
    },
  ];

  // Nav Items
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Vorteile", href: "#benefits" },
    { label: "Kundenstimmen", href: "#testimonials" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* ========== NAVBAR ========== */}
      <Navbar 
        maxWidth="xl" 
        isMenuOpen={isMenuOpen} 
        onMenuOpenChange={setIsMenuOpen}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50"
        isBlurred
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
                <img src="/logo.png" alt="DMAuto" className="w-8 h-8 rounded-lg" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">DMAuto</span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <a 
                href={item.href} 
                className="text-slate-600 dark:text-slate-300 hover:text-primary-500 transition-colors"
              >
                {item.label}
              </a>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onClick={toggleTheme}
              aria-label="Theme wechseln"
            >
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              to="/dashboard"
              color="primary"
              endContent={<ArrowRightIcon className="w-4 h-4" />}
            >
              Dashboard
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl pt-6">
          {navItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <a
                href={item.href}
                className="w-full text-lg text-slate-700 dark:text-slate-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5"></div>
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        
        {/* Floating Blurs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-soft delay-500"></div>

        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="animate-fade-in mb-8">
              <Chip
                startContent={<SparklesIcon className="w-4 h-4" />}
                variant="flat"
                color="primary"
                size="lg"
              >
                KI-gestützte Instagram Automatisierung
              </Chip>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in delay-100 text-slate-900 dark:text-white">
              Deine Instagram DMs
              <br />
              <span className="gradient-text">auf Autopilot</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
              DMAuto beantwortet Kundenanfragen automatisch mit KI – 
              24/7, personalisiert und in Sekundenschnelle. 
              Mehr Verkäufe, weniger Stress.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Button
                as={Link}
                to="/dashboard"
                color="primary"
                size="lg"
                endContent={<ArrowRightIcon className="w-5 h-5" />}
                className="shadow-lg glow-primary font-semibold"
              >
                Jetzt starten
              </Button>
              <Button
                as="a"
                href="#features"
                variant="bordered"
                size="lg"
                startContent={<PlayIcon className="w-5 h-5" />}
              >
                Mehr erfahren
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 animate-fade-in delay-400">
              <div className="flex -space-x-3">
                {["SK", "MK", "LB", "JM", "PH"].map((initials, i) => (
                  <Avatar
                    key={i}
                    name={initials}
                    size="md"
                    className="ring-2 ring-white dark:ring-slate-900"
                    classNames={{
                      base: "bg-gradient-to-br from-primary-500 to-secondary-500",
                      name: "text-white text-xs font-medium",
                    }}
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarSolid key={i} className="w-5 h-5 text-amber-400" />
                  ))}
                  <span className="ml-2 font-semibold text-slate-900 dark:text-white">4.9/5</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Von 500+ Creators geliebt</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="py-20 lg:py-28 bg-white dark:bg-slate-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Chip color="secondary" variant="flat" className="mb-4">
              <BoltIcon className="w-3 h-3 mr-1 inline" />
              Features
            </Chip>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Alles was du brauchst
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Leistungsstarke Tools um deine Instagram DMs zu automatisieren 
              und mehr Zeit für das Wesentliche zu haben.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="card-hover shine animate-slide-up bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                  shadow="sm"
                >
                  <CardBody className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-7 h-7 text-${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Chip color="success" variant="flat" className="mb-4">
              <ChatBubbleLeftRightIcon className="w-3 h-3 mr-1 inline" />
              So funktioniert's
            </Chip>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
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
                <div className="text-7xl font-bold text-primary-500/10 absolute -top-4 -left-2">{item.step}</div>
                <div className="relative pt-8">
                  <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section id="benefits" className="py-20 lg:py-28 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in">
              <Chip variant="flat" className="bg-white/10 text-white mb-6">
                <ArrowTrendingUpIcon className="w-3 h-3 mr-1 inline" />
                Vorteile
              </Chip>
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
              <Card className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
                <CardBody className="p-8">
                  <div className="space-y-8">
                    {[
                      { value: "3h+", label: "Zeitersparnis", sublabel: "pro Tag" },
                      { value: "<5s", label: "Antwortzeit", sublabel: "durchschnittlich" },
                      { value: "98%", label: "Zufriedenheit", sublabel: "der Nutzer" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-5xl font-bold mb-1 text-white">{stat.value}</div>
                        <div className="text-white/60 text-sm">{stat.label}</div>
                        <div className="text-white/40 text-xs">{stat.sublabel}</div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section id="testimonials" className="py-20 lg:py-28 bg-white dark:bg-slate-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Chip color="primary" variant="flat" className="mb-4">
              <UserGroupIcon className="w-3 h-3 mr-1 inline" />
              Kundenstimmen
            </Chip>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Was unsere Nutzer sagen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="card-hover animate-slide-up bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                style={{ animationDelay: `${index * 100}ms` }}
                shadow="sm"
              >
                <CardBody className="p-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarSolid key={i} className="w-5 h-5 text-amber-400" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <Avatar
                      name={testimonial.initials}
                      classNames={{
                        base: "bg-gradient-to-br from-primary-500 to-secondary-500",
                        name: "text-white font-medium",
                      }}
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"></div>
        
        <div className="container mx-auto px-4 max-w-3xl text-center relative">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-8 shadow-xl glow-primary animate-float">
            <InstagramIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Bereit für Autopilot?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto text-lg">
            Starte jetzt und lass deine Instagram DMs intelligent bearbeiten. 
            Mehr Zeit für das, was du liebst.
          </p>
          <Button
            as={Link}
            to="/dashboard"
            color="primary"
            size="lg"
            endContent={<ArrowRightIcon className="w-5 h-5" />}
            className="shadow-lg glow-primary font-semibold"
          >
            Zum Dashboard
          </Button>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
                <img src="/logo.png" alt="DMAuto" className="w-8 h-8 rounded-lg" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">DMAuto</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">KI-gestützte Instagram DM Automatisierung</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-primary-500 transition-colors">Impressum</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Kontakt</a>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} DMAuto – Made with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
