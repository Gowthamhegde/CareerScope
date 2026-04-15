import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

const GITHUB_URL = 'https://github.com/Gowthamhegde';
const CONTACT_EMAIL = 'gowthamhegde@salarypredictor.in';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', type: 'bug', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = form.type === 'bug'
      ? `Bug Report from ${form.name}`
      : `Feature Request from ${form.name}`;
    const body = `Name: ${form.name}%0AEmail: ${form.email}%0AType: ${form.type}%0A%0ADescription:%0A${encodeURIComponent(form.description)}`;
    window.open(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`);
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="max-w-2xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-subtext hover:text-cyan transition-colors mb-10 text-sm font-mono">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-4xl font-heading font-bold text-white mb-2">Contact Us</h1>
        <p className="text-subtext text-sm font-mono mb-12">We'd love to hear from you</p>

        {/* Quick contact links */}
        <div className="space-y-4 mb-12">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 glass-panel p-5 rounded-xl border border-white/10 hover:border-cyan/40 transition-all group"
          >
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-cyan/10 transition-colors">
              <Github size={20} className="text-white group-hover:text-cyan transition-colors" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">GitHub</div>
              <div className="text-subtext text-xs">Open an issue or contribute to the project</div>
            </div>
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-5 glass-panel p-5 rounded-xl border border-white/10 hover:border-cyan/40 transition-all group"
          >
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-cyan/10 transition-colors">
              <Mail size={20} className="text-white group-hover:text-cyan transition-colors" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Email</div>
              <div className="text-subtext text-xs">{CONTACT_EMAIL}</div>
            </div>
          </a>
        </div>

        {/* Bug report form */}
        <div className="glass-panel rounded-2xl border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare size={22} className="text-magenta" />
            <h2 className="text-xl font-heading font-semibold text-white">Report a Bug / Feature Request</h2>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-10 text-center"
            >
              <CheckCircle size={48} className="text-cyan mb-4" />
              <p className="text-white font-semibold text-lg mb-2">Thanks for reaching out!</p>
              <p className="text-subtext text-sm">Your email client should have opened. If not, email us directly at <span className="text-cyan">{CONTACT_EMAIL}</span></p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', type: 'bug', description: '' }); }}
                className="mt-6 text-sm text-subtext hover:text-white transition-colors underline"
              >
                Submit another report
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan/50 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan/50 transition-colors text-sm appearance-none cursor-pointer"
                >
                  <option value="bug" className="bg-gray-900">🐛 Bug Report</option>
                  <option value="feature" className="bg-gray-900">✨ Feature Request</option>
                  <option value="other" className="bg-gray-900">💬 General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder={form.type === 'bug' ? 'Describe the bug — what happened, what you expected, and steps to reproduce...' : 'Describe your idea or feedback...'}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan/50 transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-cyan text-bg font-semibold py-3 rounded-lg hover:bg-cyan/90 transition-colors"
              >
                <Send size={16} />
                Send Report
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
