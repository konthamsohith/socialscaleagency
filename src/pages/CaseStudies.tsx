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
