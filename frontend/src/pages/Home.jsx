import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Globe,
  Building2,
  Search,
  BarChart3,
  Target,
  ArrowRight,
  Sparkles,
  Database,
  Brain,
  Zap,
  Calculator,
  MapPin,
  Users,
  ChevronRight
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { formatCurrency, formatNumber } from '../utils/currency';
import api from '../api/axios';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, catRes] = await Promise.all([
          api.get('/salary/stats'),
          api.get('/jobs/categories')
        ]);
        setStats(statsRes.data.data);
        setCategories(catRes.data.data.slice(0, 6));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) window.location.href = `/explore?search=${encodeURIComponent(searchQuery)}`;
  };

  const categoryIcons = {
    'Data Science': '📊', 'Software Engineering': '💻', 'DevOps & Cloud': '☁️',
    'Product Management': '🚀', 'Design': '🎨', 'Security': '🔒',
    'Quality Assurance': '✅', 'Business Analysis': '📈', 'Management': '👔', 'Technology': '⚡',
  };

  const tools = [
    { icon: Target, label: 'Salary Predictor', desc: 'AI-powered CTC prediction', path: '/predictor', color: 'from-primary-500 to-blue-600', glow: 'rgba(26,184,255,0.3)', badge: 'AI Powered' },
    { icon: Calculator, label: 'CTC Calculator', desc: 'Detailed salary breakdown', path: '/calculator', color: 'from-accent-500 to-orange-600', glow: 'rgba(255,123,15,0.3)', badge: 'Tax Optimized' },
    { icon: MapPin, label: 'City Comparison', desc: 'Compare across Indian cities', path: '/city-comparison', color: 'from-success-500 to-emerald-600', glow: 'rgba(0,232,126,0.3)', badge: '6 Cities' },
    { icon: Brain, label: 'Skills Analysis', desc: 'Gap analysis & learning path', path: '/skills-analysis', color: 'from-violet-500 to-purple-600', glow: 'rgba(168,85,247,0.3)', badge: 'Personalized' },
  ];

  const statItems = [
    { icon: Database, label: 'Total Jobs', value: stats ? formatNumber(stats.totalJobs) : '50K+', color: 'text-primary-400', bg: 'bg-primary-500/10' },
    { icon: TrendingUp, label: 'Avg Salary', value: stats ? formatCurrency(stats.avgSalary * 83, 'INR') : '₹18L', color: 'text-accent-400', bg: 'bg-accent-500/10' },
    { icon: Globe, label: 'Countries', value: '50+', color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { icon: Building2, label: 'Companies', value: '2K+', color: 'text-success-400', bg: 'bg-success-500/10' },
  ];

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Orb backgrounds */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-accent-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-5 py-2 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary-400" />
              <span className="text-sm text-primary-300 font-medium">AI-Powered Career Intelligence Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-7xl font-heading font-black text-white mb-6 leading-tight text-shadow-glow"
            >
              Know Your Worth.
              <br />
              <span className="gradient-text">Navigate Your Career.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Unlock data-driven salary insights, explore career opportunities, and predict your earning potential.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-2xl mx-auto mb-10"
            >
              <div className="flex gap-3">
                <div className="flex-1">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search job titles... (e.g., Software Engineer)"
                  />
                </div>
                <button onClick={handleSearch} className="btn-primary px-6 py-3">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/predictor" className="btn-primary text-base px-7 py-3.5">
                <Target className="h-5 w-5 mr-2" />
                Predict My CTC
              </Link>
              <Link to="/skills-analysis" className="btn-secondary text-base px-7 py-3.5">
                <Brain className="h-5 w-5 mr-2" />
                Analyze Skills
              </Link>
              <Link to="/city-comparison" className="btn-secondary text-base px-7 py-3.5">
                <MapPin className="h-5 w-5 mr-2" />
                Compare Cities
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="stat-card text-center"
              >
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                {isLoading ? (
                  <div className="skeleton h-8 w-20 mx-auto mb-2" />
                ) : (
                  <div className={`text-2xl font-heading font-bold ${item.color} mb-1`}>{item.value}</div>
                )}
                <div className="text-gray-500 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-divider max-w-7xl mx-auto" />

      {/* ── Tools ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center space-x-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-4 py-2 mb-4">
              <Zap className="h-4 w-4 text-accent-400" />
              <span className="text-sm text-accent-300 font-medium">Powerful Career Tools</span>
            </div>
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Everything You Need to <span className="gradient-text-accent">Succeed</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Four powerful tools to help you make smarter career decisions and maximize your earning potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={tool.path} className="glass-card-hover p-6 block group h-full">
                  <div className="relative mb-5">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      style={{ boxShadow: `0 8px 24px ${tool.glow}` }}
                    >
                      <tool.icon className="h-7 w-7 text-white" />
                    </div>
                    <span className="absolute -top-1 -right-1 badge badge-gray text-xs">{tool.badge}</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {tool.label}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{tool.desc}</p>
                  <div className="flex items-center text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-divider max-w-7xl mx-auto" />

      {/* ── Categories ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center space-x-2 bg-success-500/10 border border-success-500/20 rounded-full px-4 py-2 mb-4">
              <BarChart3 className="h-4 w-4 text-success-400" />
              <span className="text-sm text-success-300 font-medium">Job Categories</span>
            </div>
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Explore by <span className="gradient-text-success">Category</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover salary insights across different job categories and find your perfect career path.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link to={`/explore?category=${encodeURIComponent(cat.category)}`} className="glass-card-hover p-6 block group">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl">{categoryIcons[cat.category] || '💼'}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-heading font-semibold text-white group-hover:text-primary-400 transition-colors truncate">
                        {cat.category}
                      </h3>
                      <p className="text-sm text-gray-500">{formatNumber(cat.count)} jobs</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold gradient-text">{formatCurrency(cat.avgSalary * 83, 'INR')}</div>
                      <div className="text-xs text-gray-500">Average salary</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/explore" className="btn-secondary">
              View All Categories <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="neon-divider max-w-7xl mx-auto" />

      {/* ── How It Works ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three simple steps to unlock your career potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Explore Jobs', desc: 'Browse thousands of real salary data points across different roles and companies.', color: 'text-primary-400', bg: 'bg-primary-500/10', num: '01' },
              { icon: Brain, title: 'Get Insights', desc: 'Analyze market trends, salary ranges, and growth opportunities in your field.', color: 'text-violet-400', bg: 'bg-violet-500/10', num: '02' },
              { icon: Target, title: 'Predict Your Worth', desc: 'Use our AI-powered predictor to estimate your expected CTC based on your profile.', color: 'text-accent-400', bg: 'bg-accent-500/10', num: '03' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center relative overflow-hidden group hover:border-white/10 transition-all"
              >
                <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.03] font-heading">{step.num}</div>
                <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card-glow p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-violet-500/5 to-accent-500/5" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '0 0 40px rgba(26,184,255,0.3)' }}>
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Ready to Discover Your Worth?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of professionals who have unlocked their career potential with CareerScope's AI-powered insights.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/predictor" className="btn-primary text-base px-8 py-4">
                  <Target className="h-5 w-5 mr-2" />
                  Calculate Your CTC
                </Link>
                <Link to="/skills-analysis" className="btn-secondary text-base px-8 py-4">
                  <Brain className="h-5 w-5 mr-2" />
                  Analyze Skills Gap
                </Link>
                <Link to="/dashboard" className="btn-secondary text-base px-8 py-4">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  View Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
