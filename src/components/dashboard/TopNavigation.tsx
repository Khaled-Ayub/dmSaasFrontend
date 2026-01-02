import { Search, Settings, Bell, MessageSquare } from "lucide-react";

const TopNavigation = () => {
  const navLinks = [
    { name: "Home", active: true },
    { name: "Inbox", active: false },
    { name: "Accounts", active: false },
    { name: "KI-Einstellungen", active: false },
  ];

  return (
    <nav className="bg-card shadow-card px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-semibold text-foreground">DMAuto</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href="#"
            className={`text-sm font-medium transition-colors relative py-2 ${
              link.active
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-secondary rounded-xl px-4 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Suchen..."
            className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-muted-foreground"
          />
        </div>

        {/* Icons */}
        <button className="p-2.5 rounded-xl hover:bg-secondary transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-2.5 rounded-xl hover:bg-secondary transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-highlight rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-highlight overflow-hidden ring-2 ring-card">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="Profil"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
