import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEOHead = ({
  title,
  description,
  keywords = [],
  ogImage,
  canonicalUrl,
  schema,
  noindex = false,
  siteName = 'SalaryPredictor.ai'
}) => {
  // Validate and format title
  const formattedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  // Validate description length (150-160 characters is optimal)
  const validatedDescription = description.length > 160 
    ? `${description.substring(0, 157)}...` 
    : description;

  // Generate Twitter Card tags from Open Graph tags
  const twitterCard = {
    card: 'summary_large_image',
    title: formattedTitle,
    description: validatedDescription,
    image: ogImage
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={validatedDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={validatedDescription} />
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard.card} />
      <meta name="twitter:title" content={twitterCard.title} />
      <meta name="twitter:description" content={twitterCard.description} />
      {twitterCard.image && <meta name="twitter:image" content={twitterCard.image} />}

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

SEOHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  ogImage: PropTypes.string,
  canonicalUrl: PropTypes.string,
  schema: PropTypes.object,
  noindex: PropTypes.bool,
  siteName: PropTypes.string
};

export default SEOHead;
