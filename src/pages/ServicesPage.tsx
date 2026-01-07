import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEO } from "../components/common/SEO";
import { ServicesHero } from "../components/sections/services/ServicesHero";
import { ServicesMainGrid } from "../components/sections/services/ServicesMainGrid";
import { ServicesTechnicalProtocols } from "../components/sections/services/ServicesTechnicalProtocols";
import { ServicesProcess } from "../components/sections/services/ServicesProcess";
import { Integrations } from "../components/sections/Integrations";

export const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Growth Protocols & Services | SocialScale"
        description="Advanced social media growth services including algorithmic scaling, platform synchronization, and high-velocity content deployment."
      />
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesMainGrid />
        <ServicesTechnicalProtocols />
        <ServicesProcess />
        <Integrations />
      </main>
      <Footer />
    </div>
  );
};
