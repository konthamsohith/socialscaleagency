import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEO } from "../components/common/SEO";
import { ContactHero } from "../components/sections/contact/ContactHero";
import { ContactForm } from "../components/sections/contact/ContactForm";
import { ContactInfo } from "../components/sections/contact/ContactInfo";
import { Integrations } from "../components/sections/Integrations";
import { useEffect } from "react";

export const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      <SEO 
        title="Initialize Uplink | Contact SocialScale"
        description="Secure a direct uplink with our growth architects. Start your scaling protocol today with SocialScale's enterprise-grade support."
        keywords="contact socialscale, get in touch, social media agency contact, hire digital agency"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact SocialScale",
          "description": "Secure a direct uplink with our growth architects.",
           "mainEntity": {
            "@type": "Organization",
            "name": "SocialScale Agency",
            "url": "https://socialscale.agency",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-0123",
              "contactType": "customer service",
              "areaServed": "Global"
            }
          }
        }}
      />
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
        <ContactInfo />
        <Integrations />
      </main>
      <Footer />
    </div>
  );
};
