import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PortfolioManager from "./pages/admin/PortfolioManager";
import ServiceManager from "./pages/admin/ServiceManager";
import ContentEditor from "./pages/admin/ContentEditor";
import MessagesPage from "./pages/admin/MessagesPage";
import MediaUpload from "./pages/admin/MediaUpload";

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
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/portfolio" element={<AdminLayout><PortfolioManager /></AdminLayout>} />
              <Route path="/admin/services" element={<AdminLayout><ServiceManager /></AdminLayout>} />
              <Route path="/admin/content" element={<AdminLayout><ContentEditor /></AdminLayout>} />
              <Route path="/admin/messages" element={<AdminLayout><MessagesPage /></AdminLayout>} />
              <Route path="/admin/media" element={<AdminLayout><MediaUpload /></AdminLayout>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
