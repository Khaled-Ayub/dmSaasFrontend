// DMAuto - Main App Component
// Mit HeroUI Provider für Tailwind v4 Komponenten
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Index";
import Inbox from "./pages/Inbox";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Query Client für React Query
const queryClient = new QueryClient();

// Inner App mit Router-Zugriff für HeroUI Navigation
const AppContent = () => {
  const navigate = useNavigate();

  return (
    // HeroUIProvider mit navigate Funktion für HeroUI Link-Komponenten
    <HeroUIProvider navigate={navigate}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </HeroUIProvider>
  );
};

// Main App Component - BrowserRouter muss außerhalb von HeroUIProvider sein
const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
