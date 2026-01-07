import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEO } from "../components/common/SEO";
import { BlogHero } from "../components/sections/blog/BlogHero";
import { BlogFeatured } from "../components/sections/blog/BlogFeatured";
import { BlogGrid } from "../components/sections/blog/BlogGrid";
import { BlogNewsletter } from "../components/sections/blog/BlogNewsletter";

export const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Intelligence Feed & Knowledge Base | SocialScale"
        description="Decoding the social algorithms. Expert analysis, technical frameworks, and high-velocity growth protocols for the digital frontier."
      />
      <Navbar />
      <main>
        <BlogHero />
        <BlogFeatured />
        <BlogGrid />
        <BlogNewsletter />
      </main>
      <Footer />
    </div>
  );
};
