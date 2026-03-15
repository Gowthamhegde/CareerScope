import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const tools = [
    { name: 'Salary Predictor', path: '/predictor' },
    { name: 'CTC Calculator', path: '/calculator' },
    { name: 'City Comparison', path: '/city-comparison' },
    { name: 'Skills Analysis', path: '/skills-analysis' },
  ];

  const links = [
    { name: 'Explore Jobs', path: '/explore' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/[0.06]">
      {/* Top glow line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <Link to="/" className="flex items-center space-x-2 group w-fit">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(26,184,255,0.3)' }}>
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-white">
                Career<span className="gradient-text">Scope</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Know your worth. Navigate your career with data-driven salary insights and AI-powered predictions built on real market data.
            </p>
            <div className="flex space-x-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 glass-card flex items-center justify-center text-gray-500 hover:text-primary-400 hover:border-primary-500/30 transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Tools</h3>
            <ul className="space-y-2.5">
              {tools.map((t) => (
                <li key={t.path}>
                  <Link to={t.path} className="text-gray-500 hover:text-primary-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-gray-500 hover:text-primary-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.name}
                  </Link>
                </li>
              ))}
              {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© {year} CareerScope. All rights reserved.</p>
          <p className="text-gray-600 text-sm">Built with <span className="text-primary-500">♥</span> for career growth</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
