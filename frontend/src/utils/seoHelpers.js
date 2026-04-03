import { seoConfig } from '../data/seoConfig';

/**
 * Generate a properly formatted page title
 * @param {string} title - The page title
 * @param {boolean} includeSiteName - Whether to include site name
 * @returns {string} Formatted title
 */
export const generateTitle = (title, includeSiteName = true) => {
  if (!title) return seoConfig.defaultTitle;
  
  if (includeSiteName && !title.includes(seoConfig.siteName)) {
    return `${title} | ${seoConfig.siteName}`;
  }
  
  return title;
};

/**
 * Validate and truncate description to optimal length
 * @param {string} description - The meta description
 * @param {number} maxLength - Maximum length (default: 160)
 * @returns {string} Validated description
 */
export const validateDescription = (description, maxLength = 160) => {
  if (!description) return seoConfig.defaultDescription;
  
  if (description.length <= maxLength) {
    return description;
  }
  
  // Truncate at word boundary
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? `${truncated.substring(0, lastSpace)}...`
    : `${truncated}...`;
};

/**
 * Generate canonical URL
 * @param {string} path - The page path
 * @returns {string} Full canonical URL
 */
export const generateCanonicalUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${seoConfig.siteUrl}${cleanPath}`;
};

/**
 * Generate Open Graph image URL
 * @param {string} imagePath - Relative or absolute image path
 * @returns {string} Full OG image URL
 */
export const generateOGImageUrl = (imagePath) => {
  if (!imagePath) return `${seoConfig.siteUrl}${seoConfig.defaultOGImage}`;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${seoConfig.siteUrl}${cleanPath}`;
};

/**
 * Replace template variables in strings
 * @param {string} template - Template string with {variable} placeholders
 * @param {object} variables - Object with variable values
 * @returns {string} String with variables replaced
 */
export const replaceTemplateVariables = (template, variables) => {
  let result = template;
  
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(regex, variables[key]);
  });
  
  return result;
};

/**
 * Generate SEO metadata for job role pages
 * @param {string} role - Job role name
 * @returns {object} SEO metadata
 */
export const generateJobRoleSEO = (role) => {
  const template = seoConfig.jobRoleTemplate;
  
  return {
    title: replaceTemplateVariables(template.titleTemplate, { role }),
    description: replaceTemplateVariables(template.descriptionTemplate, { role }),
    keywords: template.keywords.map(kw => replaceTemplateVariables(kw, { role }))
  };
};

/**
 * Generate SEO metadata for country pages
 * @param {string} country - Country name
 * @returns {object} SEO metadata
 */
export const generateCountrySEO = (country) => {
  const template = seoConfig.countryTemplate;
  
  return {
    title: replaceTemplateVariables(template.titleTemplate, { country }),
    description: replaceTemplateVariables(template.descriptionTemplate, { country }),
    keywords: template.keywords.map(kw => replaceTemplateVariables(kw, { country }))
  };
};

/**
 * Extract keywords from text
 * @param {string} text - Text to extract keywords from
 * @param {number} count - Number of keywords to extract
 * @returns {array} Array of keywords
 */
export const extractKeywords = (text, count = 5) => {
  if (!text) return [];
  
  // Remove common words
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word));
  
  // Count word frequency
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
};

export default {
  generateTitle,
  validateDescription,
  generateCanonicalUrl,
  generateOGImageUrl,
  replaceTemplateVariables,
  generateJobRoleSEO,
  generateCountrySEO,
  extractKeywords
};
