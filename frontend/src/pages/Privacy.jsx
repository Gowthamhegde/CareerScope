import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-subtext hover:text-cyan transition-colors mb-10 text-sm font-mono">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-4xl font-heading font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-subtext text-sm font-mono mb-12">Last updated: April 15, 2026</p>

        <div className="space-y-10 text-subtext leading-relaxed">

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>SalaryPredictor.in does not require account registration. We collect only the information you voluntarily provide when using our tools — such as job title, experience level, skills, and location — solely to generate salary predictions and insights. We do not store this input data on our servers.</p>
            <p className="mt-3">We may automatically collect non-personal technical data such as browser type, device type, pages visited, and time spent on pages through standard analytics tools (e.g., Google Analytics). This data is aggregated and cannot identify you personally.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide salary predictions, comparisons, and career insights</li>
              <li>To improve the accuracy and performance of our tools</li>
              <li>To understand how users interact with the platform</li>
              <li>To display relevant advertisements via Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">3. Cookies</h2>
            <p>We use cookies to enhance your experience. These include functional cookies (to remember your preferences) and analytics cookies (to understand usage patterns). Third-party services like Google AdSense may also set cookies for ad personalization. You can disable cookies in your browser settings, though some features may not function correctly.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services that have their own privacy policies:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong className="text-white">Google Analytics</strong> — for usage analytics</li>
              <li><strong className="text-white">Google AdSense</strong> — for displaying advertisements</li>
              <li><strong className="text-white">Supabase</strong> — for salary data storage and retrieval</li>
              <li><strong className="text-white">Vercel</strong> — for hosting and deployment</li>
            </ul>
            <p className="mt-3">We do not sell, trade, or rent your personal information to any third party.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">5. Data Security</h2>
            <p>We take reasonable measures to protect any data processed through our platform. All data is transmitted over HTTPS. Since we do not store personal user inputs, the risk of data exposure is minimal.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">6. Children's Privacy</h2>
            <p>SalaryPredictor.in is not directed at children under the age of 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">8. Contact</h2>
            <p>If you have any questions about this Privacy Policy, you can reach us via our <a href="https://github.com/gowtham-hegde" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">GitHub</a>.</p>
          </section>

        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;
