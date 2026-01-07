import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEO } from "../components/common/SEO";
import { AboutHero } from "../components/sections/about/AboutHero";
import { AboutStats } from "../components/sections/about/AboutStats";
import { AboutMissionVision } from "../components/sections/about/AboutMissionVision";
import { AboutStory } from "../components/sections/about/AboutStory";
import { AboutCulture } from "../components/sections/about/AboutCulture";
import { AboutTeam } from "../components/sections/about/AboutTeam";
import { AboutTestimonials } from "../components/sections/about/AboutTestimonials";
import { Integrations } from "../components/sections/Integrations";

export const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About The Collective | SocialScale Intelligence"
        description="Meet the architects behind the social algorithms. Our mission is to engineer the future of influence through predictive modeling and neural synergy."
      />
      <Navbar />
      <main>
        <AboutHero />
        <AboutStats />
        <AboutMissionVision />
        <AboutStory />
        <AboutCulture />
        <AboutTeam />
        <AboutTestimonials />
        <Integrations />
      </main>
      <Footer />
    </div>
  );
};
