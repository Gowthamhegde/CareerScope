import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SchemaMarkup = ({ type, data }) => {
  const generateSchema = () => {
    const baseContext = 'https://schema.org';

    switch (type) {
      case 'FAQ':
        return {
          '@context': baseContext,
          '@type': 'FAQPage',
          mainEntity: data.questions.map(q => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer
            }
          }))
        };

      case 'Product':
        return {
          '@context': baseContext,
          '@type': 'SoftwareApplication',
          name: data.name,
          description: data.description,
          applicationCategory: 'BusinessApplication',
          offers: {
            '@type': 'Offer',
            price: data.price || '0',
            priceCurrency: 'USD'
          },
          aggregateRating: data.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating.value,
            ratingCount: data.rating.count
          } : undefined
        };

      case 'Article':
        return {
          '@context': baseContext,
          '@type': 'Article',
          headline: data.headline,
          description: data.description,
          image: data.image,
          author: {
            '@type': data.author?.type || 'Person',
            name: data.author?.name || 'SalaryPredictor Team'
          },
          publisher: {
            '@type': 'Organization',
            name: 'SalaryPredictor.ai',
            logo: {
              '@type': 'ImageObject',
              url: data.publisherLogo || '/logo.png'
            }
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished
        };

      case 'BreadcrumbList':
        return {
          '@context': baseContext,
          '@type': 'BreadcrumbList',
          itemListElement: data.items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      case 'Organization':
        return {
          '@context': baseContext,
          '@type': 'Organization',
          name: data.name || 'SalaryPredictor.ai',
          url: data.url || 'https://salarypredictor.ai',
          logo: data.logo || 'https://salarypredictor.ai/logo.png',
          description: data.description || 'AI-powered salary prediction and comparison tool',
          sameAs: data.socialLinks || []
        };

      default:
        console.warn(`Unknown schema type: ${type}`);
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

SchemaMarkup.propTypes = {
  type: PropTypes.oneOf(['FAQ', 'Product', 'Article', 'BreadcrumbList', 'Organization']).isRequired,
  data: PropTypes.object.isRequired
};

export default SchemaMarkup;
