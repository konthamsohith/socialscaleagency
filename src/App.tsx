import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { CookiePolicy } from "./pages/CookiePolicy";
import { CancellationAndRefund } from "./pages/CancellationAndRefund";
import { ServicesPage } from "./pages/ServicesPage";
import { PricingPage } from "./pages/PricingPage";
import { CaseStudies } from "./pages/CaseStudies";
import { BlogPost } from "./pages/BlogPost";

import { SmoothScroll } from "./components/ui/SmoothScroll";
import { ScrollToTop } from "./components/layout/ScrollToTop";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Onboarding } from "./pages/Onboarding";
import { AuthCallback } from "./pages/AuthCallback";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { Admin } from "./components/dashboard/Admin";
import { Profile } from "./components/dashboard/Profile";
import { MyOrders } from "./components/dashboard/MyOrders";
import { Support } from "./components/dashboard/Support";
import { MassOrder } from "./components/dashboard/MassOrder";
import { SuperAdmin } from "./components/dashboard/SuperAdmin";
import { Notifications } from "./components/dashboard/Notifications";
import { PlaceOrder } from "./components/dashboard/PlaceOrder";
import { Credits } from "./pages/Credits";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <SmoothScroll>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/cancellation-refund" element={<CancellationAndRefund />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/case-studies" element={<CaseStudies />} />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Protected onboarding */}
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } 
            />

            {/* Protected dashboard routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Admin />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="mass-order" element={<MassOrder />} />
              <Route path="credits" element={<Credits />} />
              <Route path="support" element={<Support />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Profile />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="place-order" element={<PlaceOrder />} />
              
              {/* Admin only routes */}
              <Route 
                path="admin-panel" 
                element={
                  <ProtectedRoute requireAdmin>
                    <SuperAdmin />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </SmoothScroll>
      </AuthProvider>
    </Router>
  );
}

export default App;
