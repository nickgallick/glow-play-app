import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Support from "./pages/Support";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import ParentalGate from "./pages/ParentalGate";
import Home from "./pages/Home";
import Camera from "./pages/Camera";
import Review from "./pages/Review";
import Themes from "./pages/Themes";
import Closet from "./pages/Closet";
import Favorites from "./pages/Favorites";
import Parents from "./pages/Parents";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public landing & legal pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/support" element={<Support />} />
          {/* App pages */}
          <Route path="/app" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/gate" element={<ParentalGate />} />
          <Route path="/home" element={<Home />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/review" element={<Review />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/closet" element={<Closet />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
