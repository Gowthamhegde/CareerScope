# Implementation Plan

- [ ] 1. Set up SEO infrastructure and core components
  - Create SEO component directory structure
  - Implement reusable SEO utilities
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 1.1 Create SEOHead component


  - Build SEOHead.jsx component with props for title, description, keywords, ogImage, canonicalUrl, schema
  - Integrate react-helmet-async for meta tag management
  - Add automatic title suffix with site name
  - Implement description length validation (150-160 characters)
  - Generate Twitter Card tags from Open Graph tags
  - Add JSON-LD schema injection functionality
  - _Requirements: 1.1, 1.2, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 1.2 Create SchemaMarkup component


  - Build SchemaMarkup.jsx component supporting FAQ, Product, Article, BreadcrumbList, and Organization schemas
  - Implement schema type validation
  - Create helper functions for each schema type
  - Add schema validation against schema.org standards
  - _Requirements: 1.5, 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 1.3 Create Breadcrumbs component


  - Build Breadcrumbs.jsx component with items prop
  - Generate BreadcrumbList schema automatically
  - Implement responsive design (collapse on mobile)
  - Style with Tailwind CSS matching site theme
  - _Requirements: 3.4, 4.3_

- [x] 1.4 Create SEO configuration file


  - Create src/data/seoConfig.js with site-wide SEO settings
  - Define default meta tags, site name, URLs
  - Configure page-specific SEO metadata for all major pages
  - Include H1 and H2 structure for homepage
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 1.5 Create SEO utility functions



  - Create src/utils/seoHelpers.js with helper functions
  - Implement generateTitle() function
  - Implement validateDescription() function
  - Implement generateCanonicalUrl() function
  - Create src/utils/schemaGenerator.js for schema creation helpers
  - _Requirements: 1.1, 1.2, 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 2. Optimize homepage for SEO
  - Update Home.jsx with SEO-optimized structure
  - Implement all required meta tags and schema markup
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 2.1 Update homepage meta tags and title
  - Integrate SEOHead component in Home.jsx
  - Set title to "AI Salary Predictor – Predict Your Salary Instantly with Smart AI | SalaryPredictor"
  - Set meta description to exact specification
  - Add keywords array with primary keywords
  - Set og:image and canonical URL
  - _Requirements: 1.1, 1.2_

- [ ] 2.2 Restructure homepage headings
  - Update H1 to "AI Salary Predictor"
  - Add H2 sections: "Predict Your Salary in Seconds", "How Our AI Salary Predictor Works", "Accurate Salary Insights for Every Career", "Compare Salaries Across Countries", "Why Use SalaryPredictor.ai"
  - Ensure proper heading hierarchy (no skipped levels)
  - _Requirements: 1.3, 1.4_

- [ ] 2.3 Add FAQ section with schema markup
  - Create FAQ section on homepage with at least 4 questions
  - Questions: "What is a salary predictor?", "Is SalaryPredictor.ai free?", "How accurate is the salary prediction?", "Can I compare salaries globally?"
  - Integrate SchemaMarkup component with FAQ schema
  - Style FAQ section with accordion or expandable design
  - _Requirements: 1.5, 3.1_

- [ ] 2.4 Add internal linking on homepage
  - Add at least 5 internal links to key pages (/salary-predictor, /salary-comparison, /blog)
  - Use descriptive anchor text with keywords
  - Implement "Related Tools" section
  - _Requirements: 4.1, 4.2, 4.4_

- [ ] 3. Create core salary tool pages
  - Build dedicated pages for main tools
  - Implement proper SEO and schema markup
  - _Requirements: 2.1, 2.2, 3.2, 4.1, 4.2, 4.4_

- [ ] 3.1 Create /salary-predictor page
  - Create new SalaryPredictor.jsx page component (or update existing)
  - Add SEOHead with title "AI Salary Predictor Tool – Check Your Expected Salary"
  - Implement Product schema markup for the tool
  - Add breadcrumbs navigation
  - Include internal links to related tools
  - Add "How it works" section with step-by-step guide
  - _Requirements: 2.1, 3.2, 4.1, 4.2, 4.3, 4.4_

- [ ] 3.2 Create /salary-comparison page
  - Create SalaryComparison.jsx page component
  - Add SEOHead with title "Compare Salaries Worldwide – Free Salary Comparison Tool"
  - Implement comparison tool interface
  - Add breadcrumbs navigation
  - Include links to job and country salary pages
  - _Requirements: 2.2, 4.1, 4.2, 4.3, 4.4_

- [ ] 3.3 Create /salary-by-country listing page
  - Create SalaryByCountry.jsx page component
  - Display grid of country cards with flags and average salaries
  - Link to individual country pages
  - Add SEOHead with appropriate meta tags
  - Implement breadcrumbs
  - _Requirements: 2.3, 4.3_

- [ ] 4. Implement dynamic job salary pages
  - Create template and data for job-specific salary pages
  - Generate routes for multiple job roles
  - _Requirements: 2.5, 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 4.1 Create job salary data file
  - Create src/data/jobsData.js with salary data for 20+ job roles
  - Include: software-engineer, data-scientist, ai-engineer, product-manager, devops-engineer, frontend-developer, backend-developer, full-stack-developer, ui-ux-designer, data-analyst, business-analyst, project-manager, scrum-master, qa-engineer, mobile-developer, cloud-architect, cybersecurity-analyst, network-engineer, database-administrator, machine-learning-engineer
  - For each job: slug, title, description, salaryRange, byExperience, byCountry, topSkills, topCompanies, demandLevel, growthRate, relatedJobs
  - _Requirements: 6.1, 6.2, 6.5_

- [ ] 4.2 Create JobSalary page component
  - Create src/pages/JobSalary.jsx component
  - Use useParams to get job slug from URL
  - Fetch job data from jobsData.js
  - Display salary range, experience breakdown, location variations
  - Add salary calculator widget
  - Show related job roles with links
  - Implement SEOHead with dynamic title and description
  - Add breadcrumbs navigation
  - _Requirements: 6.2, 6.3, 6.4_

- [ ] 4.3 Add dynamic routes for job pages
  - Update App.jsx to include route pattern "/:jobRole-salary"
  - Configure route to render JobSalary component
  - Implement 404 handling for invalid job slugs
  - _Requirements: 2.5, 6.1_

- [ ] 4.4 Create salary visualization components
  - Create SalaryRangeChart component using Recharts
  - Create ExperienceBreakdownChart component
  - Create LocationComparisonChart component
  - Integrate charts into JobSalary page
  - _Requirements: 6.2_

- [ ] 5. Implement dynamic country salary pages
  - Create template and data for country-specific pages
  - Generate routes for multiple countries
  - _Requirements: 2.4, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 5.1 Create country salary data file
  - Create src/data/countriesData.js with data for 10+ countries
  - Include: USA, India, UK, Canada, Australia, Germany, Singapore, UAE, Netherlands, France
  - For each country: slug, name, code, currency, averageSalary, costOfLivingIndex, topCities, topIndustries, salaryByExperience
  - _Requirements: 7.1, 7.5_

- [ ] 5.2 Create CountrySalary page component
  - Create src/pages/CountrySalary.jsx component
  - Use useParams to get country slug from URL
  - Fetch country data from countriesData.js
  - Display average salaries by job category, cost of living index, top paying cities
  - Add currency converter widget
  - Show salary comparison chart across experience levels
  - Link to at least 5 job-specific salary pages
  - Implement SEOHead with dynamic title and description
  - Add breadcrumbs navigation
  - _Requirements: 7.2, 7.3, 7.4, 7.5_

- [ ] 5.3 Add dynamic routes for country pages
  - Update App.jsx to include route pattern "/salary-in-:country"
  - Configure route to render CountrySalary component
  - Implement 404 handling for invalid country slugs
  - _Requirements: 2.4, 7.1_

- [ ] 5.4 Create country comparison components
  - Create CostOfLivingWidget component
  - Create CurrencyConverter component
  - Create TopCitiesChart component using Recharts
  - Integrate components into CountrySalary page
  - _Requirements: 7.2, 7.3, 7.4_

- [ ] 6. Build blog system
  - Create blog infrastructure for content marketing
  - Implement blog listing and individual post pages
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 6.1 Create blog posts data file
  - Create src/data/blogPosts.js with initial blog posts
  - Include posts: "Average Salary in USA 2026 (Complete Guide)", "Top 10 Highest Paying Jobs in the World", "Software Engineer Salary by Country (2026)", "How to Predict Your Salary Before Job Interview"
  - For each post: slug, title, excerpt, content, author, publishDate, updatedDate, readingTime, category, tags, featuredImage, seo metadata
  - _Requirements: 5.1, 5.2_

- [ ] 6.2 Create Blog listing page
  - Create src/pages/Blog.jsx component
  - Display all published blog posts in grid layout
  - Add filtering by category and tags
  - Implement search functionality
  - Add SEOHead with blog-specific meta tags
  - Include breadcrumbs navigation
  - _Requirements: 5.1_

- [ ] 6.3 Create BlogPost page component
  - Create src/pages/BlogPost.jsx component
  - Use useParams to get post slug from URL
  - Fetch post data from blogPosts.js
  - Render markdown content
  - Display estimated reading time
  - Add table of contents for posts > 1000 words
  - Implement Article schema markup
  - Add Open Graph tags for social sharing
  - Include breadcrumbs navigation
  - Add related posts section
  - _Requirements: 5.2, 5.3, 5.4, 5.5_

- [ ] 6.4 Add dynamic routes for blog
  - Update App.jsx to include routes "/blog" and "/blog/:slug"
  - Configure routes to render Blog and BlogPost components
  - Implement 404 handling for invalid post slugs
  - _Requirements: 5.1, 5.2_

- [ ] 6.5 Create blog components
  - Create BlogCard component for post previews
  - Create TableOfContents component
  - Create ReadingTime component
  - Create SocialShare component
  - Integrate components into blog pages
  - _Requirements: 5.3, 5.4, 5.5_

- [ ] 7. Implement sitemap and robots.txt
  - Generate dynamic sitemap for search engines
  - Configure robots.txt for crawler instructions
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 7.1 Create sitemap generator
  - Create src/utils/sitemapGenerator.js
  - Generate XML sitemap including all static pages, job pages, country pages, blog posts
  - Set appropriate priority values (homepage: 1.0, main tools: 0.9, job/country pages: 0.8, blog: 0.7)
  - Set changefreq values (homepage: daily, tools: weekly, job/country: monthly, blog: weekly)
  - Include lastmod dates
  - _Requirements: 10.1, 10.2, 10.5_

- [ ] 7.2 Create sitemap route
  - Add route "/sitemap.xml" in App.jsx or server configuration
  - Serve dynamically generated sitemap XML
  - Set proper content-type header (application/xml)
  - _Requirements: 10.1_

- [ ] 7.3 Create robots.txt file
  - Create public/robots.txt file
  - Allow all crawlers (User-agent: *)
  - Include sitemap reference
  - Disallow admin or private routes if any
  - _Requirements: 10.3, 10.4_

- [ ] 8. Optimize performance and Core Web Vitals
  - Implement performance optimizations
  - Ensure fast page loads and smooth interactions
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 8.1 Implement code splitting
  - Use React.lazy() for route-based code splitting
  - Split heavy components (charts, blog editor)
  - Implement Suspense with loading fallbacks
  - Analyze bundle size with webpack-bundle-analyzer
  - _Requirements: 9.5_

- [ ] 8.2 Optimize images
  - Implement lazy loading for below-fold images
  - Use loading="lazy" attribute on img tags
  - Optimize og:image sizes (1200x630px)
  - Convert images to WebP format with fallbacks
  - _Requirements: 9.4_

- [ ] 8.3 Optimize Core Web Vitals
  - Reduce Largest Contentful Paint (LCP) to < 2.5s
  - Minimize First Input Delay (FID) to < 100ms
  - Reduce Cumulative Layout Shift (CLS) to < 0.1
  - Use font-display: swap for web fonts
  - Preload critical resources
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 8.4 Implement caching strategy
  - Configure cache headers for static assets
  - Implement service worker for offline support
  - Cache API responses appropriately
  - _Requirements: 9.1_

- [ ]* 8.5 Run performance audits
  - Run Lighthouse audit (target SEO score > 95)
  - Test Core Web Vitals with PageSpeed Insights
  - Verify mobile-friendliness
  - Check accessibility score
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 9. Update branding to SalaryPredictor
  - Rename project from SalaryComparision to SalaryPredictor throughout
  - Update all brand references
  - _Requirements: 1.1, 1.2, 8.3_

- [ ] 9.1 Update package.json and configuration files
  - Change "name" in frontend/package.json to "salary-predictor"
  - Update any project name references in configuration files
  - _Requirements: 1.1_

- [ ] 9.2 Update HTML meta tags
  - Update title in frontend/index.html
  - Update og:site_name meta tag
  - Update any other brand references in HTML
  - _Requirements: 1.1, 1.2, 8.3_

- [ ] 9.3 Update Navbar branding
  - Change logo text from "CAREERSCOPE" to "SALARYPREDICTOR" in Navbar.jsx
  - Update aria-labels with new brand name
  - _Requirements: 1.1_

- [ ] 9.4 Update Footer branding
  - Change brand name from "CareerScope" to "SalaryPredictor" in Footer.jsx
  - Update copyright text
  - Update any brand mentions in footer description
  - _Requirements: 1.1_

- [ ] 9.5 Update README and documentation
  - Change project title in README.md to "SalaryPredictor.ai"
  - Update project description
  - Update any references to old brand name
  - _Requirements: 1.1_

- [ ] 9.6 Search and replace remaining references
  - Search codebase for "careerscope" (case-insensitive)
  - Replace with "salarypredictor" or "SalaryPredictor" as appropriate
  - Check comments, console.logs, and localStorage keys
  - _Requirements: 1.1_

- [ ]* 10. Testing and validation
  - Comprehensive testing of SEO implementation
  - Validate all requirements are met
  - _Requirements: All_

- [ ]* 10.1 Validate meta tags
  - Check all pages have unique titles
  - Verify description lengths (150-160 chars)
  - Test Open Graph tags with Facebook Debugger
  - Test Twitter Cards with Twitter Card Validator
  - _Requirements: 1.1, 1.2, 8.1, 8.2, 8.3, 8.4_

- [ ]* 10.2 Validate schema markup
  - Test all pages with Google Rich Results Test
  - Validate JSON-LD syntax
  - Check FAQ, Product, Article, BreadcrumbList schemas
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 10.3 Test internal linking
  - Verify all pages have appropriate internal links
  - Check breadcrumbs on all pages
  - Ensure no page is more than 3 clicks from homepage
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]* 10.4 Test dynamic routes
  - Verify all job salary pages load correctly
  - Verify all country salary pages load correctly
  - Test 404 handling for invalid slugs
  - Check blog post routing
  - _Requirements: 2.4, 2.5, 5.2, 6.1, 6.2, 7.1, 7.2_

- [ ]* 10.5 Validate sitemap and robots.txt
  - Check sitemap.xml is accessible and valid XML
  - Verify all pages are included in sitemap
  - Test robots.txt accessibility
  - Submit sitemap to Google Search Console
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ]* 10.6 Performance testing
  - Run Lighthouse audit on all major pages
  - Verify Core Web Vitals are in "Good" range
  - Test mobile responsiveness
  - Check page load times
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
