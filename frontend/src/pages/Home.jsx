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
  ChevronRight,
  FileText,
  MessageSquare,
  Briefcase
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import JobComparisonTool from '../components/JobComparisonTool';
import { DisplayAd } from '../components/AdSense';
import { MultiplexAd } from '../components/AdSense';
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
        setCategories(catRes.data.data);
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
    { icon: Target, label: 'Salary Predictor', desc: 'Data-driven CTC prediction', path: '/predictor', color: 'from-cyan/20 to-cyan/5', glow: 'var(--accent)', badge: 'Smart' },
    { icon: Calculator, label: 'CTC Calculator', desc: 'Detailed salary breakdown', path: '/calculator', color: 'from-magenta/20 to-magenta/5', glow: 'var(--pop)', badge: 'Tax Optimized' },
    { icon: MapPin, label: 'City Comparison', desc: 'Compare across Indian cities', path: '/city-comparison', color: 'from-blue-500/20 to-blue-500/5', glow: '#3b82f6', badge: '6 Cities' },
    { icon: Brain, label: 'Skills Analysis', desc: 'Gap analysis & learning path', path: '/skills-analysis', color: 'from-purple-500/20 to-purple-500/5', glow: '#a855f7', badge: 'Personalized' },
    { icon: Users, label: 'Career Advisor', desc: 'Solve real career problems', path: '/career-advisor', color: 'from-yellow-500/20 to-yellow-500/5', glow: '#eab308', badge: '6 Scenarios' },
    { icon: FileText, label: 'Offer Analyzer', desc: 'Analyze job offers instantly', path: '/offer-analyzer', color: 'from-green-500/20 to-green-500/5', glow: '#22c55e', badge: 'Red Flags' },
    { icon: TrendingUp, label: 'Resume Estimator', desc: 'Know your market value', path: '/resume-estimator', color: 'from-orange-500/20 to-orange-500/5', glow: '#f97316', badge: 'Instant' },
    { icon: MessageSquare, label: 'Interview Prep', desc: 'Salary negotiation tips', path: '/interview-prep', color: 'from-pink-500/20 to-pink-500/5', glow: '#ec4899', badge: 'Scripts' },
    { icon: Briefcase, label: 'Freelance Calculator', desc: 'Calculate freelance rates', path: '/freelance-calculator', color: 'from-indigo-500/20 to-indigo-500/5', glow: '#6366f1', badge: 'Pricing' },
  ];

  const statItems = [
    { label: 'Total Jobs', value: stats ? formatNumber(stats.totalJobs) : '50K+', color: 'text-cyan' },
    { label: 'Avg Salary', value: stats ? formatCurrency(stats.avgSalary * 83, 'INR') : '₹18L', color: 'text-magenta' },
    { label: 'Countries', value: '50+', color: 'text-white' },
    { label: 'Companies', value: '2K+', color: 'text-cyan' },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden clip-slant bg-surface/30">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1 border border-cyan/30 bg-cyan/10 rounded-full mb-8">
              <span className="text-xs font-mono text-cyan tracking-widest uppercase flex items-center gap-2">
                <Sparkles size={14} /> Career Intelligence Platform
              </span>
            </div>

            <h1 className="text-6xl md:text-[9rem] leading-[0.85] mb-8 max-w-5xl">
              Know Your <span className="text-stroke-outline">Worth.</span><br />
              <span className="gradient-text">Navigate Your Career.</span>
            </h1>

            <p className="text-xl md:text-2xl text-subtext max-w-2xl mb-12 font-light">
              Unlock data-driven salary insights, explore career opportunities, and predict your earning potential with precision.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex-1 max-w-lg relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan to-magenta rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search job titles... (e.g., Software Engineer)"
                    className="input-neon py-4 pl-6 pr-20"
                  />
                  <button 
                    onClick={handleSearch}
                    className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-lg font-bold hover:bg-cyan transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Link to="/predictor" className="btn-neon-cyan">
                  <Target className="mr-2 inline" size={18} /> Predict My CTC
                </Link>
                <Link to="/explore" className="btn-outline">
                  Browse Jobs
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="border-y border-white/5 py-4 overflow-hidden bg-surface-2/50 backdrop-blur-sm">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="inline-flex items-center gap-8 mx-8">
              <span className="text-sm font-mono text-white/40 uppercase tracking-widest">Market Benchmark</span>
              <span className="text-xl font-heading text-cyan">SDET: ₹24L/yr</span>
              <span className="text-sm font-mono text-white/40 uppercase tracking-widest">Trending Skill</span>
              <span className="text-xl font-heading text-magenta">Rust: +40%</span>
              <span className="text-sm font-mono text-white/40 uppercase tracking-widest">Hot Location</span>
              <span className="text-xl font-heading text-white">Bangalore</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats Bento ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel p-8 text-center md:text-left hover:bg-white/5 transition-colors group"
              >
                <p className="text-subtext font-mono text-xs uppercase tracking-widest mb-2">{item.label}</p>
                <h3 className={`text-4xl font-heading ${item.color} group-hover:scale-110 transition-transform origin-left`}>
                  {isLoading ? '...' : item.value}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Bento ── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl mb-6">
              Everything You Need<br />
              <span className="text-magenta neon-text">to Succeed</span>
            </h2>
            <p className="text-subtext text-xl max-w-2xl font-light">
              Nine powerful tools to help you make smarter career decisions and maximize your earning potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.path}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={tool.path} className="glass-panel-hover glass-panel p-8 block h-full group">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                      <tool.icon size={28} className="text-white" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-tighter px-2 py-1 border border-white/10 rounded">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl mb-3 group-hover:text-cyan transition-colors">{tool.label}</h3>
                  <p className="text-subtext font-light text-sm mb-6 group-hover:text-white transition-colors">{tool.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Launch <ChevronRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Scroll ── */}
      <section className="py-32 px-6 bg-surface-2/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl mb-6">Explore by <br /><span className="text-cyan">Category</span></h2>
              <p className="text-subtext text-xl font-light">Discover salary insights across different job categories and find your perfect career path.</p>
            </div>
            <Link to="/explore" className="btn-outline mb-2">View All Categories</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link to={`/explore?category=${encodeURIComponent(cat.category)}`} className="glass-panel-hover glass-panel p-8 block group border-l-4 border-l-magenta">
                  <div className="text-5xl mb-6">{categoryIcons[cat.category] || '💼'}</div>
                  <h3 className="text-2xl mb-1 group-hover:text-cyan transition-colors">{cat.category}</h3>
                  <p className="text-subtext font-mono text-xs uppercase mb-8">{formatNumber(cat.count)} Active Data Points</p>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl group-hover:bg-white/10 transition-colors">
                    <span className="text-subtext text-sm">Avg. Package</span>
                    <span className="text-2xl font-heading text-white">{formatCurrency(cat.avgSalary * 83, 'INR')}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ad Placement ── */}
      <div className="max-w-7xl mx-auto px-6">
        <DisplayAd slot="1275578947" />
      </div>

      {/* ── CTA ── */}
      {/* Job Comparison Tool */}
      <JobComparisonTool />

      {/* ── Multiplex Ad (Related Content) ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <MultiplexAd slot="1084007256" />
      </div>

      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan/20 via-magenta/20 to-cyan/20 rounded-[40px] blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="glass-panel p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Zap size={240} className="text-cyan" />
            </div>
            <h2 className="text-5xl md:text-8xl mb-8 leading-none">Ready to Discover<br /><span className="text-cyan italic">Your Worth?</span></h2>
            <p className="text-subtext text-xl mb-12 max-w-2xl mx-auto font-light">
              Join thousands of professionals who have unlocked their career potential with SalaryPredictor's data-driven insights.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/predictor" className="btn-neon-cyan text-lg px-12 py-6">Calculate Your CTC</Link>
              <Link to="/dashboard" className="btn-outline text-lg px-12 py-6">View Global Dashboard</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
