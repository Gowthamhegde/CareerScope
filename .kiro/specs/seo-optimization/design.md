# SEO Optimization Design Document

## Overview

This design document outlines the technical architecture and implementation strategy for transforming the SalaryComparision platform into an SEO-optimized website targeting competitive keywords in the salary prediction and comparison space. The solution focuses on React-based static generation, dynamic routing, schema markup, and content optimization.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   SEO Layer  │  │  Components  │  │   Routing    │     │
│  │              │  │              │  │              │     │
│  │ - Meta Tags  │  │ - Pages      │  │ - Dynamic    │     │
│  │ - Schema     │  │ - Widgets    │  │ - Static     │     │
│  │ - Sitemap    │  │ - Layouts    │  │ - Nested     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
├─────────────────────────────────────────────────────────────┤
│                     SEO Components                           │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ SEOHead      │  │ SchemaMarkup │  │ Breadcrumbs  │     │
│  │ Component    │  │ Generator    │  │ Component    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Content Data Layer                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Job Data     │  │ Country Data │  │  Blog Posts  │     │
│  │ (Static)     │  │ (Static)     │  │  (Markdown)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── components/
│   ├── SEO/
│   │   ├── SEOHead.jsx           # Meta tags manager
│   │   ├── SchemaMarkup.jsx      # JSON-LD schema generator
│   │   ├── Breadcrumbs.jsx       # Breadcrumb navigation
│   │   └── SocialShare.jsx       # Social sharing buttons
│   ├── Blog/
│   │   ├── BlogCard.jsx
│   │   ├── BlogPost.jsx
│   │   └── TableOfContents.jsx
│   └── Salary/
│       ├── SalaryWidget.jsx
│       ├── CountryComparison.jsx
│       └── JobSalaryCard.jsx
├── pages/
│   ├── Home.jsx                  # Optimized homepage
│   ├── SalaryPredictor.jsx       # Main tool page
│   ├── SalaryComparison.jsx      # Comparison tool
│   ├── SalaryByCountry.jsx       # Country listing
│   ├── CountrySalary.jsx         # Dynamic country page
│   ├── JobSalary.jsx             # Dynamic job page
│   ├── Blog.jsx                  # Blog listing
│   └── BlogPost.jsx              # Individual post
├── data/
│   ├── seoConfig.js              # SEO metadata
│   ├── jobsData.js               # Job salary data
│   ├── countriesData.js          # Country salary data
│   └── blogPosts.js              # Blog content
├── hooks/
│   └── useSEO.js                 # SEO hook
└── utils/
    ├── seoHelpers.js             # SEO utility functions
    └── schemaGenerator.js        # Schema markup helpers
```

## Components and Interfaces

### 1. SEOHead Component

**Purpose:** Centralized component for managing all meta tags, Open Graph, Twitter Cards, and canonical URLs.

**Interface:**
```javascript
<SEOHead
  title="Page Title"
  description="Page description"
  keywords={['keyword1', 'keyword2']}
  ogImage="/images/og-image.jpg"
  canonicalUrl="https://salarypredictor.ai/page"
  schema={schemaObject}
/>
```

**Props:**
- `title` (string, required): Page title
- `description` (string, required): Meta description
- `keywords` (array, optional): SEO keywords
- `ogImage` (string, optional): Open Graph image URL
- `canonicalUrl` (string, required): Canonical URL
- `schema` (object, optional): JSON-LD schema object
- `noindex` (boolean, optional): Prevent indexing

**Implementation Details:**
- Uses React Helmet or react-helmet-async for meta tag management
- Automatically appends site name to title
- Validates description length (150-160 chars)
- Generates Twitter Card tags from OG tags
- Injects JSON-LD schema into head

### 2. SchemaMarkup Component

**Purpose:** Generate and inject structured data (JSON-LD) for different page types.

**Interface:**
```javascript
<SchemaMarkup type="FAQ" data={faqData} />
<SchemaMarkup type="Product" data={productData} />
<SchemaMarkup type="Article" data={articleData} />
```

**Schema Types:**
- **FAQ Schema:** For homepage and help pages
- **Product Schema:** For salary predictor tool
- **Article Schema:** For blog posts
- **BreadcrumbList Schema:** For navigation
- **Organization Schema:** For brand information

**Example FAQ Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is a salary predictor?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A salary predictor is an AI-based tool..."
    }
  }]
}
```

### 3. Dynamic Route System

**Job Salary Pages:**
- Route: `/:jobRole-salary`
- Examples: `/software-engineer-salary`, `/data-scientist-salary`
- Component: `JobSalary.jsx`
- Data source: `jobsData.js`

**Country Salary Pages:**
- Route: `/salary-in-:country`
- Examples: `/salary-in-usa`, `/salary-in-india`
- Component: `CountrySalary.jsx`
- Data source: `countriesData.js`

**Blog Posts:**
- Route: `/blog/:slug`
- Component: `BlogPost.jsx`
- Data source: Markdown files or `blogPosts.js`

### 4. Breadcrumbs Component

**Purpose:** Provide navigation hierarchy and schema markup.

**Interface:**
```javascript
<Breadcrumbs
  items={[
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { label: 'Article Title', url: '/blog/article-slug' }
  ]}
/>
```

**Features:**
- Automatically generates BreadcrumbList schema
- Responsive design (collapses on mobile)
- Styled with Tailwind CSS
- Includes structured data

## Data Models

### SEO Configuration Model

```javascript
// src/data/seoConfig.js
export const seoConfig = {
  siteName: 'SalaryPredictor.ai',
  siteUrl: 'https://salarypredictor.ai',
  defaultTitle: 'AI Salary Predictor – Predict Your Salary Instantly',
  defaultDescription: 'Predict your salary instantly with SalaryPredictor.ai...',
  defaultOGImage: '/images/og-default.jpg',
  twitterHandle: '@salarypredictor',
  
  pages: {
    home: {
      title: 'AI Salary Predictor – Predict Your Salary Instantly with Smart AI | SalaryPredictor',
      description: 'Predict your salary instantly with SalaryPredictor.ai...',
      keywords: ['salary predictor', 'AI salary predictor', 'salary prediction tool'],
      h1: 'AI Salary Predictor',
      h2: [
        'Predict Your Salary in Seconds',
        'How Our AI Salary Predictor Works',
        'Accurate Salary Insights for Every Career',
        'Compare Salaries Across Countries',
        'Why Use SalaryPredictor.ai'
      ]
    },
    salaryPredictor: {
      title: 'AI Salary Predictor Tool – Check Your Expected Salary',
      description: 'Use our free AI-powered salary predictor...',
      keywords: ['salary calculator', 'expected salary', 'salary estimator']
    }
    // ... more pages
  }
};
```

### Job Data Model

```javascript
// src/data/jobsData.js
export const jobsData = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    description: 'Software engineers design, develop, and maintain software...',
    salaryRange: {
      min: 60000,
      max: 180000,
      currency: 'USD',
      average: 110000
    },
    byExperience: {
      entry: { min: 60000, max: 85000 },
      mid: { min: 85000, max: 130000 },
      senior: { min: 130000, max: 180000 }
    },
    byCountry: {
      usa: 110000,
      india: 12000,
      uk: 65000,
      canada: 85000
    },
    topSkills: ['JavaScript', 'Python', 'React', 'Node.js'],
    topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
    demandLevel: 'Very High',
    growthRate: '+15% YoY',
    relatedJobs: ['frontend-developer', 'backend-developer', 'full-stack-developer']
  }
  // ... more jobs
];
```

### Country Data Model

```javascript
// src/data/countriesData.js
export const countriesData = [
  {
    slug: 'usa',
    name: 'United States',
    code: 'US',
    currency: 'USD',
    averageSalary: 65000,
    costOfLivingIndex: 100,
    topCities: [
      { name: 'San Francisco', avgSalary: 120000 },
      { name: 'New York', avgSalary: 110000 },
      { name: 'Seattle', avgSalary: 105000 }
    ],
    topIndustries: [
      { name: 'Technology', avgSalary: 115000 },
      { name: 'Finance', avgSalary: 95000 },
      { name: 'Healthcare', avgSalary: 85000 }
    ],
    salaryByExperience: {
      entry: 55000,
      mid: 85000,
      senior: 130000
    }
  }
  // ... more countries
];
```

### Blog Post Model

```javascript
// src/data/blogPosts.js
export const blogPosts = [
  {
    slug: 'average-salary-usa-2026',
    title: 'Average Salary in USA 2026 (Complete Guide)',
    excerpt: 'Comprehensive guide to average salaries across industries...',
    content: '...', // Full markdown content
    author: 'SalaryPredictor Team',
    publishDate: '2026-01-15',
    updatedDate: '2026-01-20',
    readingTime: 8,
    category: 'Salary Guides',
    tags: ['USA', 'Salary', '2026'],
    featuredImage: '/images/blog/usa-salary-2026.jpg',
    seo: {
      title: 'Average Salary in USA 2026 - Complete Guide | SalaryPredictor',
      description: 'Discover average salaries in USA for 2026...',
      keywords: ['average salary usa', 'usa salary 2026', 'salary guide']
    }
  }
  // ... more posts
];
```

## Error Handling

### 404 Pages
- Custom 404 page with SEO-friendly content
- Suggestions for related pages
- Search functionality
- Proper 404 HTTP status code

### Redirect Strategy
- 301 redirects for old URLs
- Canonical tags for duplicate content
- Redirect map in configuration file

### Error Boundaries
- React error boundaries for component failures
- Fallback UI with SEO meta tags intact
- Error logging for monitoring

## Testing Strategy

### SEO Testing
1. **Meta Tag Validation**
   - Verify all pages have unique titles
   - Check description length (150-160 chars)
   - Validate Open Graph tags
   - Test Twitter Card preview

2. **Schema Markup Validation**
   - Use Google's Rich Results Test
   - Validate JSON-LD syntax
   - Test all schema types (FAQ, Product, Article)

3. **Performance Testing**
   - Lighthouse SEO audit (score > 95)
   - Core Web Vitals measurement
   - Mobile-friendliness test
   - Page speed insights

4. **Crawlability Testing**
   - Verify robots.txt accessibility
   - Test sitemap.xml generation
   - Check internal linking structure
   - Validate canonical URLs

### Automated Tests
```javascript
// Example test for SEOHead component
describe('SEOHead Component', () => {
  it('should render correct title tag', () => {
    render(<SEOHead title="Test Page" description="Test description" />);
    expect(document.title).toBe('Test Page | SalaryPredictor.ai');
  });

  it('should include meta description', () => {
    render(<SEOHead title="Test" description="Test description" />);
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc.content).toBe('Test description');
  });

  it('should inject JSON-LD schema', () => {
    const schema = { '@type': 'FAQPage' };
    render(<SEOHead title="Test" description="Test" schema={schema} />);
    const scriptTag = document.querySelector('script[type="application/ld+json"]');
    expect(JSON.parse(scriptTag.textContent)).toEqual(schema);
  });
});
```

### Manual Testing Checklist
- [ ] Google Search Console verification
- [ ] Bing Webmaster Tools verification
- [ ] Social media preview testing (Facebook, Twitter, LinkedIn)
- [ ] Mobile responsiveness check
- [ ] Accessibility audit (WCAG 2.1 AA)

## Implementation Phases

### Phase 1: Foundation (Week 1)
- Set up SEO component architecture
- Create SEOHead component
- Implement schema markup generator
- Configure seoConfig.js

### Phase 2: Core Pages (Week 2)
- Optimize homepage with new SEO structure
- Create /salary-predictor page
- Create /salary-comparison page
- Implement breadcrumbs component

### Phase 3: Dynamic Pages (Week 3)
- Build job salary page template
- Build country salary page template
- Create data files for 20+ jobs
- Create data files for 10+ countries

### Phase 4: Blog System (Week 4)
- Set up blog listing page
- Create blog post template
- Implement table of contents
- Add reading time calculator

### Phase 5: Technical SEO (Week 5)
- Generate dynamic sitemap.xml
- Create robots.txt
- Implement canonical URLs
- Add structured data to all pages

### Phase 6: Performance & Testing (Week 6)
- Optimize Core Web Vitals
- Implement lazy loading
- Code splitting optimization
- Comprehensive SEO testing

## Performance Considerations

### Code Splitting
```javascript
// Lazy load heavy components
const BlogPost = lazy(() => import('./pages/BlogPost'));
const JobSalary = lazy(() => import('./pages/JobSalary'));
```

### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading for below-fold images
- Optimize og:image sizes (1200x630px)
- Use CDN for image delivery

### Bundle Size Optimization
- Tree shaking for unused code
- Dynamic imports for routes
- Minimize third-party dependencies
- Use production builds

### Caching Strategy
- Cache static assets (1 year)
- Cache API responses (5 minutes)
- Service worker for offline support
- CDN caching for global delivery

## Security Considerations

- Sanitize user-generated content in blog comments
- Validate all external links
- Implement CSP headers
- Use HTTPS for all pages
- Prevent XSS in schema markup

## Monitoring and Analytics

### SEO Metrics to Track
- Organic traffic growth
- Keyword rankings
- Click-through rates (CTR)
- Bounce rate
- Average session duration
- Pages per session

### Tools Integration
- Google Analytics 4
- Google Search Console
- Bing Webmaster Tools
- SEMrush or Ahrefs for rank tracking
- Hotjar for user behavior

### Success Criteria
- Rank in top 10 for "salary predictor" within 6 months
- Achieve 10,000+ monthly organic visitors within 3 months
- Maintain Lighthouse SEO score > 95
- Core Web Vitals in "Good" range for 75% of page loads
