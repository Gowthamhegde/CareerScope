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
    <footer className="relative mt-40 border-t border-white/5 bg-surface-2/30">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-10 h-10 bg-cyan text-bg rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,255,224,0.4)]">
                <Zap size={22} fill="currentColor" />
              </div>
              <span className="text-3xl font-heading tracking-tighter text-white uppercase">
                SALARY<span className="text-cyan italic">PREDICTOR</span>
              </span>
            </Link>
            <p className="text-subtext text-xl font-light leading-relaxed max-w-md mb-8">
              Know your worth. Navigate your career with data-driven salary insights and smart predictions built on real market data.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 glass-panel flex items-center justify-center text-white hover:text-cyan hover:border-cyan/50 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em] mb-8">System Tools</h3>
            <ul className="space-y-4">
              {tools.map((t) => (
                <li key={t.path}>
                  <Link to={t.path} className="text-subtext hover:text-magenta transition-colors font-bold flex items-center group">
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em] mb-8">Navigation</h3>
            <ul className="space-y-4">
              {links.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-subtext hover:text-cyan transition-colors font-bold flex items-center group">
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {l.name}
                  </Link>
                </li>
              ))}
              {['Privacy', 'Terms', 'Connect'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-subtext hover:text-white transition-colors font-bold flex items-center group">
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-sm font-mono">© {year} SalaryPredictor. All rights reserved.</p>
          <div className="flex items-center gap-2 text-white/20 text-sm">
            Made with ❤️ for career growth
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
