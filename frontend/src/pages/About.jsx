import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Target, Users, TrendingUp } from 'lucide-react';

const About = () => {
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

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-cyan text-bg rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,255,224,0.4)]">
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white">About Us</h1>
        </div>

        <p className="text-subtext text-sm font-mono mb-12">Building the future of career intelligence</p>

        <div className="space-y-8 text-subtext leading-relaxed text-lg">
          <p>
            Welcome to <span className="text-white font-semibold">SalaryPredictor</span>, your trusted AI-powered platform for accurate salary insights and career growth analysis.
          </p>
          <p>
            In today's competitive job market, understanding your true earning potential is essential. SalaryPredictor uses advanced Artificial Intelligence and real-time data analysis to provide precise salary predictions based on your skills, experience, job role, and location.
          </p>
          <p>
            Our platform is designed to help students, job seekers, and professionals make informed decisions about their careers and salaries with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-panel p-6 rounded-xl border border-white/10">
            <Target className="text-cyan mb-4" size={28} />
            <h3 className="text-white font-heading font-semibold mb-2">Our Mission</h3>
            <p className="text-subtext text-sm">Empower every professional with transparent, data-driven salary intelligence to negotiate better and grow faster.</p>
          </div>
          <div className="glass-panel p-6 rounded-xl border border-white/10">
            <Users className="text-magenta mb-4" size={28} />
            <h3 className="text-white font-heading font-semibold mb-2">Who We Serve</h3>
            <p className="text-subtext text-sm">Students entering the workforce, job seekers evaluating offers, and professionals planning their next career move.</p>
          </div>
          <div className="glass-panel p-6 rounded-xl border border-white/10">
            <TrendingUp className="text-cyan mb-4" size={28} />
            <h3 className="text-white font-heading font-semibold mb-2">Our Data</h3>
            <p className="text-subtext text-sm">Built on thousands of real salary data points across industries, roles, and locations — updated regularly to reflect current market trends.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
