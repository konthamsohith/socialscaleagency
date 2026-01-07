import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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

function App() {
  return (
    <HelmetProvider>
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
          </Routes>
        </SmoothScroll>
      </Router>
    </HelmetProvider>
  );
}

export default App;
