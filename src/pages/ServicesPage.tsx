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
        keywords="growth protocols, social media services, algorithmic scaling, platform synchronization, content deployment, digital agency"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Social Media Marketing",
          "provider": {
            "@type": "Organization",
            "name": "SocialScale Agency",
             "url": "https://socialscale.agency"
          },
          "areaServed": "Global",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Growth Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Algorithmic Scaling"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Platform Synchronization"
                }
              },
               {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "High-Velocity Content Deployment"
                }
              }
            ]
          }
        }}
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
