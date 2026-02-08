import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Packages from "./pages/Packages";
import Legal from "./pages/Legal";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Videos from "./pages/admin/Videos";
import Posters from "./pages/admin/Posters";
import Contacts from "./pages/admin/Contacts";
import Content from "./pages/admin/Content";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/admin/ResetPassword";
 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
             <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/videos" element={<Videos />} />
            <Route path="/admin/posters" element={<Posters />} />
            <Route path="/admin/contacts" element={<Contacts />} />
            <Route path="/admin/content" element={<Content />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
