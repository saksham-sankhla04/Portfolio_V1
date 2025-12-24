import { Helmet } from "react-helmet-async";

const socialProfiles = {
  linkedin: "https://www.linkedin.com/in/saksham-sankhla/",
  github: "https://github.com/saksham-sankhla04",
  instagram: "https://www.instagram.com/sankhlakhush",
};

function HelmetSeo({
  title,
  description,
  canonical,
  keywords,
  ogType = "website",
  ogImage,
  twitterCard = "summary_large_image",
  robots = "index, follow",
}) {
  const siteUrl = "https://saksham-sankhla.vercel.app";
  const authorName = "Saksham Sankhla";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: authorName,
    url: siteUrl,
    sameAs: [socialProfiles.linkedin, socialProfiles.github, socialProfiles.instagram],
    jobTitle: "Full Stack Developer",
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={authorName} />
      <meta name="robots" content={robots} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={`${authorName} Portfolio`} />
      {canonical && (
        <meta property="og:url" content={`${siteUrl}${canonical}`} />
      )}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Social Profile Links */}
      <meta property="og:see_also" content={socialProfiles.linkedin} />
      <meta property="og:see_also" content={socialProfiles.github} />
      <meta property="og:see_also" content={socialProfiles.instagram} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

export default HelmetSeo;
