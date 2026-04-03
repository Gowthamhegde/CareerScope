/**
 * Generate FAQ Schema
 * @param {array} questions - Array of {question, answer} objects
 * @returns {object} FAQ Schema
 */
export const generateFAQSchema = (questions) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };
};

/**
 * Generate Product/Software Application Schema
 * @param {object} product - Product details
 * @returns {object} Product Schema
 */
export const generateProductSchema = (product) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: product.price || '0',
      priceCurrency: product.currency || 'USD'
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      ratingCount: product.rating.count,
      bestRating: '5',
      worstRating: '1'
    } : undefined
  };
};

/**
 * Generate Article Schema
 * @param {object} article - Article details
 * @returns {object} Article Schema
 */
export const generateArticleSchema = (article) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    author: {
      '@type': article.author?.type || 'Person',
      name: article.author?.name || 'SalaryPredictor Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SalaryPredictor.ai',
      logo: {
        '@type': 'ImageObject',
        url: article.publisherLogo || 'https://salarypredictor.ai/logo.png'
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
};

/**
 * Generate Breadcrumb Schema
 * @param {array} items - Array of {name, url} objects
 * @returns {object} Breadcrumb Schema
 */
export const generateBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

/**
 * Generate Organization Schema
 * @param {object} org - Organization details
 * @returns {object} Organization Schema
 */
export const generateOrganizationSchema = (org = {}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name || 'SalaryPredictor.ai',
    url: org.url || 'https://salarypredictor.ai',
    logo: org.logo || 'https://salarypredictor.ai/logo.png',
    description: org.description || 'AI-powered salary prediction and comparison tool for career professionals',
    sameAs: org.socialLinks || [
      'https://twitter.com/salarypredictor',
      'https://linkedin.com/company/salarypredictor',
      'https://facebook.com/salarypredictor'
    ],
    contactPoint: org.contactPoint ? {
      '@type': 'ContactPoint',
      telephone: org.contactPoint.telephone,
      contactType: org.contactPoint.type || 'customer service',
      email: org.contactPoint.email
    } : undefined
  };
};

/**
 * Generate WebSite Schema with Search Action
 * @param {object} site - Site details
 * @returns {object} WebSite Schema
 */
export const generateWebSiteSchema = (site = {}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name || 'SalaryPredictor.ai',
    url: site.url || 'https://salarypredictor.ai',
    description: site.description || 'AI-powered salary prediction and comparison tool',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url || 'https://salarypredictor.ai'}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

/**
 * Generate HowTo Schema
 * @param {object} howTo - HowTo details
 * @returns {object} HowTo Schema
 */
export const generateHowToSchema = (howTo) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    totalTime: howTo.totalTime,
    estimatedCost: howTo.estimatedCost ? {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: howTo.estimatedCost
    } : undefined,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image
    }))
  };
};

export default {
  generateFAQSchema,
  generateProductSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateHowToSchema
};
