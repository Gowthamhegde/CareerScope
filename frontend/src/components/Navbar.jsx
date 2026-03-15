import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Explore Jobs', path: '/explore' },
  {
    name: 'Tools',
    children: [
      { name: 'Salary Predictor', path: '/predictor', icon: '🎯', desc: 'AI-powered CTC prediction' },
      { name: 'CTC Calculator', path: '/calculator', icon: '🧮', desc: 'Detailed salary breakdown' },
      { name: 'City Comparison', path: '/city-comparison', icon: '🏙️', desc: 'Compare Indian cities' },
      { name: 'Skills Analysis', path: '/skills-analysis', icon: '🧠', desc: 'Gap analysis & learning' },
    ]
  },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Compare', path: '/', hash: 'compare-jobs' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;
  const isGroupActive = (children) => children?.some(c => location.pathname === c.path);

  const handleNavClick = (link) => {
    if (link.hash) {
      if (location.pathname !== '/') {
        // Navigate to home first, then scroll
        window.location.href = `/#${link.hash}`;
      } else {
        // Already on home, just scroll
        const element = document.getElementById(link.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl border ${
          isScrolled
            ? 'glass-panel py-2 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-4 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              className="w-10 h-10 bg-cyan text-bg rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,255,224,0.4)]"
            >
              <Zap size={20} fill="currentColor" />
            </motion.div>
            <span className="text-2xl font-heading tracking-tighter text-white">
              CAREER<span className="text-cyan italic">SCOPE</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.name} className="relative group/dropdown">
                  <button
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all ${
                      isGroupActive(link.children) ? 'text-cyan bg-cyan/5' : 'text-subtext hover:text-white'
                    }`}
                  >
                    {link.name} <ChevronDown size={12} />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 translate-y-2 group-hover/dropdown:translate-y-0">
                    <div className="glass-panel p-2 border-white/10 shadow-2xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group/item"
                        >
                          <span className="text-2xl">{child.icon}</span>
                          <div>
                            <div className="text-sm font-bold text-white group-hover/item:text-cyan">{child.name}</div>
                            <div className="text-[10px] text-subtext leading-tight">{child.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : link.hash ? (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all ${
                    isActive(link.path) ? 'text-magenta bg-magenta/5 border border-magenta/20' : 'text-subtext hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all ${
                    isActive(link.path) ? 'text-magenta bg-magenta/5 border border-magenta/20' : 'text-subtext hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Action */}
          <div className="flex items-center gap-4">
            <Link to="/predictor" className="hidden md:block btn-neon-cyan !py-2 !px-6 text-xs !rounded-lg">
              Predict Salary
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel mx-4 mt-2 overflow-hidden border-white/10"
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.children ? (
                      <div className="space-y-1">
                        <div className="px-4 py-2 text-[10px] font-mono text-subtext uppercase tracking-widest">{link.name}</div>
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5"
                          >
                            <span>{child.icon}</span>
                            <span className="text-sm font-bold">{child.name}</span>
                          </Link>
                        ))}
                      </div>
                    ) : link.hash ? (
                      <button
                        onClick={() => handleNavClick(link)}
                        className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-bold w-full text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-bold"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 px-4 pb-2">
                  <Link to="/predictor" className="btn-neon-cyan block text-center">Predict Salary</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
