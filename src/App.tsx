import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { CookiePolicy } from "./pages/CookiePolicy";
import { ServicesPage } from "./pages/ServicesPage";
import { PricingPage } from "./pages/PricingPage";
import { CaseStudies } from "./pages/CaseStudies";
import { BlogPost } from "./pages/BlogPost";

import { SmoothScroll } from "./components/ui/SmoothScroll";
import { ScrollToTop } from "./components/layout/ScrollToTop";

import { Login } from "./pages/Login";
import { Onboarding } from "./pages/Onboarding";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { Admin } from "./components/dashboard/Admin";
import { Profile } from "./components/dashboard/Profile";
import { MyOrders } from "./components/dashboard/MyOrders";
import { Support } from "./components/dashboard/Support";
import { MassOrder } from "./components/dashboard/MassOrder";
import { SuperAdmin } from "./components/dashboard/SuperAdmin";
import { Notifications } from "./components/dashboard/Notifications";
import { PlaceOrder } from "./components/dashboard/PlaceOrder";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/case-studies" element={<CaseStudies />} />

          {/* Auth & Dashboard Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Admin />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="mass-order" element={<MassOrder />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Profile />} />
            <Route path="admin-panel" element={<SuperAdmin />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="place-order" element={<PlaceOrder />} />
            {/* Add more dashboard routes here */}
          </Route>
        </Routes>
      </SmoothScroll>
    </Router>
  );
}

export default App;
