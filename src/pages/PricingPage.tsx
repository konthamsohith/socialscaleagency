import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEO } from "../components/common/SEO";
import { PricingHero } from "../components/sections/pricing/PricingHero";
import { PricingPlans } from "../components/sections/pricing/PricingPlans";
import { PricingEnterprise } from "../components/sections/pricing/PricingEnterprise";
import { PricingFAQ } from "../components/sections/pricing/PricingFAQ";
import { Integrations } from "../components/sections/Integrations";

export const PricingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Deployment Investment & Pricing | SocialScale"
        description="Transparent pricing for high-impact social growth. Choose your protocol: Standard, Enterprise, or Custom Support Modules."
      />
      <Navbar />
      <main>
        <PricingHero />
        <PricingPlans />
        <PricingEnterprise />
        <PricingFAQ />
        <Integrations />
      </main>
      <Footer />
    </div>
  );
};
