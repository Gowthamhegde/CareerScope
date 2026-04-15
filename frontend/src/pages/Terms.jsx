import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
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

        <h1 className="text-4xl font-heading font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-subtext text-sm font-mono mb-12">Last updated: April 15, 2026</p>

        <div className="space-y-10 text-subtext leading-relaxed">

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using SalaryPredictor.in, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">2. Description of Service</h2>
            <p>SalaryPredictor.in provides AI-powered salary prediction, comparison, and career insight tools based on publicly available and aggregated market data. The platform includes tools such as:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Salary Predictor</li>
              <li>CTC Calculator</li>
              <li>City Cost Comparison</li>
              <li>Skills Analysis</li>
              <li>Career Advisor</li>
              <li>Offer Analyzer</li>
              <li>Resume Salary Estimator</li>
              <li>Interview Prep</li>
              <li>Freelance Calculator</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">3. Disclaimer of Accuracy</h2>
            <p>All salary predictions and estimates provided by SalaryPredictor.in are for informational purposes only. They are based on aggregated market data and statistical models and should not be treated as guaranteed compensation figures. Actual salaries vary based on employer, negotiation, location, and many other factors.</p>
            <p className="mt-3">We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of any data or predictions on this platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Use the platform for any unlawful purpose</li>
              <li>Scrape, crawl, or systematically extract data from the platform without permission</li>
              <li>Attempt to reverse-engineer or interfere with the platform's functionality</li>
              <li>Use the platform to mislead others about salary expectations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">5. Intellectual Property</h2>
            <p>All content, design, code, and data on SalaryPredictor.in are the property of SalaryPredictor.in unless otherwise stated. You may not reproduce, distribute, or create derivative works without explicit written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">6. Limitation of Liability</h2>
            <p>SalaryPredictor.in shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform, including but not limited to career decisions made based on salary predictions.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">7. Third-Party Links</h2>
            <p>The platform may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Continued use of the platform after changes are posted constitutes your acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">9. Governing Law</h2>
            <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-white mb-3">10. Contact</h2>
            <p>For any questions regarding these Terms, reach us via our <a href="https://github.com/gowtham-hegde" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">GitHub</a>.</p>
          </section>

        </div>
      </div>
    </motion.div>
  );
};

export default Terms;
