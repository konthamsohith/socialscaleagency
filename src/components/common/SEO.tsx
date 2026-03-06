import { Helmet as HelmetData } from "react-helmet-async";

const Helmet = HelmetData as any;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: string;
  keywords?: string;
  schema?: Record<string, any>;
}

export const SEO = ({
  title = "SocialScale | High-Velocity Social Media Growth Engine",
  description = "Transform your social media presence into a powerful growth engine with our AI-driven strategies and technical growth protocols.",
  image = "/og-image.png", // Assuming an OG image exists or will be added
  canonical = "https://socialscale.agency",
  type = "website",
  keywords = "social media growth, AI marketing, instagram growth, linkedin scaling, tiktok strategy, social media agency",
  schema
}: SEOProps) => {
  const siteTitle = title.includes("SocialScale")
    ? title
    : `${title} | SocialScale`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SocialScale" />
      <meta name="twitter:creator" content="@SocialScale" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Industrial Tech Brand Meta */}
      <meta name="theme-color" content="#0037FF" />
      <meta name="robots" content="index, follow" />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
