import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEO } from "../components/common/SEO";
import { CaseStudiesHero } from "../components/sections/casestudies/CaseStudiesHero";
import { CaseStudiesGrid } from "../components/sections/casestudies/CaseStudiesGrid";
import { CaseStudiesStats } from "../components/sections/casestudies/CaseStudiesStats";
import { Integrations } from "../components/sections/Integrations";

export const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Client Intelligence Archive | SocialScale"
        description="Explore the empirical impact of our social deployment. Real benchmarks, high-velocity results, and architectural client case studies."
        keywords="case studies, social media results, client success stories, growth metrics, digital marketing case studies"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Client Intelligence Archive",
          "description": "Explore the empirical impact of our social deployment.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "url": "https://socialscale.agency/case-studies/tech-startup-growth" 
              },
               {
                "@type": "ListItem",
                "position": 2,
                "url": "https://socialscale.agency/case-studies/ecommerce-scaling" 
              }
            ]
          }
        }}
      />
      <Navbar />
      <main>
        <CaseStudiesHero />
        <CaseStudiesGrid />
        <CaseStudiesStats />
        <Integrations />
      </main>
      <Footer />
    </div>
  );
};
