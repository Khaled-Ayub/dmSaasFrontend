import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSignup, setIsSignup] = useState(searchParams.get("signup") === "true");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: isSignup ? "Account erstellt!" : "Willkommen zurück!",
      description: isSignup 
        ? "Ihr Account wurde erfolgreich erstellt." 
        : "Sie werden zum Dashboard weitergeleitet.",
    });

    setIsLoading(false);
    navigate("/dashboard");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-base-100 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
              <img src="/logo.png" alt="DMAuto" className="w-8 h-8 rounded-lg" />
            </div>
            <span className="text-xl font-semibold">DMAuto</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {isSignup ? "Account erstellen" : "Willkommen zurück"}
            </h1>
            <p className="text-base-content/60">
              {isSignup 
                ? "Starten Sie noch heute mit DMAuto" 
                : "Melden Sie sich an, um fortzufahren"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <div className="animate-fade-in">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Vollständiger Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Max Mustermann"
                    className="input input-bordered w-full pl-12 bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100"
                    required={isSignup}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-Mail Adresse
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@beispiel.de"
                  className="input input-bordered w-full pl-12 bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Passwort
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12 pr-12 bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              {!isSignup && (
                <div className="mt-2 text-right">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Passwort vergessen?
                  </a>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full gap-2"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  {isSignup ? "Account erstellen" : "Anmelden"}
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-8">oder</div>

          {/* Social Login */}
          <button className="btn btn-outline w-full gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Mit Google fortfahren
          </button>

          {/* Toggle */}
          <p className="text-center mt-8 text-base-content/60">
            {isSignup ? "Bereits registriert?" : "Noch kein Account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary font-medium hover:underline"
            >
              {isSignup ? "Anmelden" : "Jetzt registrieren"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div 
        className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-primary to-secondary"
      >
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-md text-center text-white">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
            <ChatBubbleLeftRightIcon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Automatisieren Sie Ihren Instagram-Kundenservice
          </h2>
          <p className="text-white/80 text-lg">
            Sparen Sie Zeit, steigern Sie Verkäufe und begeistern Sie Ihre Kunden – rund um die Uhr.
          </p>

          {/* Testimonial */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left">
            <p className="text-white/90 italic mb-4">
              "DMAuto hat unsere Antwortzeit von 4 Stunden auf unter 5 Minuten reduziert. Unsere Kunden lieben es!"
            </p>
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="w-10 h-10 bg-white/20 rounded-full">
                  <span className="text-sm">SM</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-sm">Sarah Müller</p>
                <p className="text-white/60 text-xs">E-Commerce Inhaberin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
