import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  Award,
  Zap,
  CheckCircle,
  XCircle,
  Plus,
  ExternalLink,
  Star,
  Clock,
  DollarSign,
  Trash2,
  BarChart3,
  Lightbulb
} from 'lucide-react';

const skillsDatabase = {
  'Software Engineer': {
    required: ['JavaScript', 'React', 'Node.js', 'Git', 'HTML/CSS'],
    preferred: ['TypeScript', 'Docker', 'AWS', 'MongoDB', 'Testing'],
    emerging: ['Next.js', 'GraphQL', 'Kubernetes', 'Microservices'],
    avgSalary: 1200000
  },
  'Data Scientist': {
    required: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Pandas'],
    preferred: ['R', 'TensorFlow', 'PyTorch', 'Tableau', 'Jupyter'],
    emerging: ['MLOps', 'Deep Learning', 'NLP', 'Computer Vision'],
    avgSalary: 1500000
  },
  'DevOps Engineer': {
    required: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    preferred: ['Terraform', 'Ansible', 'Jenkins', 'Monitoring', 'Scripting'],
    emerging: ['GitOps', 'Service Mesh', 'Observability', 'Infrastructure as Code'],
    avgSalary: 1400000
  },
  'Product Manager': {
    required: ['Strategy', 'Analytics', 'Roadmapping', 'Stakeholder Management', 'User Research'],
    preferred: ['SQL', 'A/B Testing', 'Wireframing', 'Agile', 'Market Research'],
    emerging: ['AI/ML Understanding', 'Growth Hacking', 'Data Science', 'UX Design'],
    avgSalary: 1800000
  },
  'Frontend Developer': {
    required: ['JavaScript', 'React', 'HTML/CSS', 'Responsive Design', 'Git'],
    preferred: ['TypeScript', 'Vue.js', 'Sass', 'Webpack', 'Testing'],
    emerging: ['Web3', 'PWA', 'WebAssembly', 'Micro-frontends'],
    avgSalary: 1000000
  },
  'Backend Developer': {
    required: ['Python/Java', 'APIs', 'Databases', 'Server Management', 'Git'],
    preferred: ['Docker', 'Redis', 'Microservices', 'Testing', 'Cloud'],
    emerging: ['GraphQL', 'Serverless', 'Event Streaming', 'Container Orchestration'],
    avgSalary: 1100000
  }
};

const learningResources = {
  'JavaScript': { courses: ['JavaScript Fundamentals - Coursera', 'Modern JavaScript - Udemy'], time: '2-3 months', difficulty: 'Beginner', salaryImpact: '+15%', priority: 'High' },
  'React': { courses: ['React Complete Guide - Udemy', 'React Nanodegree - Udacity'], time: '1-2 months', difficulty: 'Intermediate', salaryImpact: '+20%', priority: 'High' },
  'Python': { courses: ['Python for Everybody - Coursera', 'Complete Python Bootcamp - Udemy'], time: '2-4 months', difficulty: 'Beginner', salaryImpact: '+25%', priority: 'High' },
  'AWS': { courses: ['AWS Solutions Architect - A Cloud Guru', 'AWS Certified Developer - Udemy'], time: '3-4 months', difficulty: 'Advanced', salaryImpact: '+30%', priority: 'Medium' },
  'Machine Learning': { courses: ['ML Course - Andrew Ng', 'Applied ML - Coursera'], time: '4-6 months', difficulty: 'Advanced', salaryImpact: '+35%', priority: 'High' }
};

const difficultyStyle = { Beginner: 'text-success-400 bg-success-500/20 border-success-500/30', Intermediate: 'text-accent-400 bg-accent-500/20 border-accent-500/30', Advanced: 'text-red-400 bg-red-500/20 border-red-500/30' };
const priorityStyle = { High: 'text-red-400 bg-red-500/20 border-red-500/30', Medium: 'text-accent-400 bg-accent-500/20 border-accent-500/30', Low: 'text-success-400 bg-success-500/20 border-success-500/30' };

const SkillsAnalysis = () => {
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [currentSkills, setCurrentSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !currentSkills.includes(newSkill.trim())) {
      setCurrentSkills([...currentSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (s) => setCurrentSkills(currentSkills.filter(x => x !== s));

  const analyzeSkills = () => {
    if (!targetRole || currentSkills.length === 0) return;
    setIsLoading(true);
    setTimeout(() => {
      const db = skillsDatabase[targetRole];
      const all = [...db.required, ...db.preferred];
      const matching = currentSkills.filter(s => all.some(r => r.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(r.toLowerCase())));
      const missingReq = db.required.filter(s => !currentSkills.some(u => s.toLowerCase().includes(u.toLowerCase()) || u.toLowerCase().includes(s.toLowerCase())));
      const missingPref = db.preferred.filter(s => !currentSkills.some(u => s.toLowerCase().includes(u.toLowerCase()) || u.toLowerCase().includes(s.toLowerCase())));
      const skillMatch = Math.round((matching.length / all.length) * 100);
      const readiness = Math.round(Math.min(100, (matching.length / db.required.length) * 100));
      const multiplier = 0.8 + (skillMatch / 100) * 0.4;
      setAnalysis({
        db, matching, missingReq, missingPref, skillMatch, readiness,
        salary: Math.round(db.avgSalary * multiplier),
        path: [...missingReq, ...missingPref].slice(0, 5).map(skill => ({
          skill,
          res: learningResources[skill] || { courses: [`Learn ${skill} - Online Course`], time: '2-3 months', difficulty: 'Intermediate', salaryImpact: '+20%', priority: 'Medium' }
        }))
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <Brain className="h-4 w-4 text-primary-400" />
            <span className="text-sm text-primary-300">AI Career Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 text-shadow-glow">
            Skills <span className="gradient-text">Gap Analysis</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Analyze your skills against your target role and get a personalized learning roadmap
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left — Input */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">

            {/* Role Selection */}
            <div className="glass-card-glow p-8">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <Target className="h-6 w-6 text-primary-400 mr-3" />
                Target Role
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Role (Optional)</label>
                  <input
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="e.g., Junior Developer"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Role *</label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="" className="bg-dark-900">Select target role</option>
                    {Object.keys(skillsDatabase).map(role => (
                      <option key={role} value={role} className="bg-dark-900">{role}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Skills Input */}
            <div className="glass-card-glow p-8">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <Zap className="h-6 w-6 text-accent-400 mr-3" />
                Your Current Skills
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill (e.g., JavaScript, Python)"
                    className="input-field flex-1"
                  />
                  <button onClick={addSkill} className="btn-primary px-4 py-3">
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  <AnimatePresence>
                    {currentSkills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="badge badge-primary flex items-center gap-2"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-primary-400 hover:text-red-400 transition-colors">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <button
                onClick={analyzeSkills}
                disabled={!targetRole || currentSkills.length === 0 || isLoading}
                className="btn-primary w-full mt-6 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />Analyzing...</>
                ) : (
                  <><BarChart3 className="h-5 w-5 mr-2" />Analyze Skills Gap</>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right — Results */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            {analysis ? (
              <>
                {/* Score Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-success-500/10 to-emerald-500/5" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Skill Match</p>
                        <p className="text-4xl font-heading font-bold gradient-text-success">{analysis.skillMatch}%</p>
                      </div>
                      <CheckCircle className="h-10 w-10 text-success-500/40" />
                    </div>
                  </div>
                  <div className="glass-card p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/5" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Readiness</p>
                        <p className="text-4xl font-heading font-bold gradient-text">{analysis.readiness}%</p>
                      </div>
                      <Target className="h-10 w-10 text-primary-500/40" />
                    </div>
                  </div>
                </div>

                {/* Salary Estimate */}
                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-orange-500/5" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Estimated Salary</p>
                      <p className="text-3xl font-heading font-bold gradient-text-accent">
                        ₹{(analysis.salary / 100000).toFixed(1)}L
                      </p>
                      <p className="text-gray-500 text-xs mt-1">Based on your skill match</p>
                    </div>
                    <DollarSign className="h-10 w-10 text-accent-500/40" />
                  </div>
                </div>

                {/* Skills Breakdown */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center">
                    <Award className="h-5 w-5 text-accent-400 mr-2" />
                    Skills Breakdown
                  </h3>
                  <div className="space-y-4">
                    {analysis.matching.length > 0 && (
                      <div>
                        <p className="text-success-400 text-sm font-medium mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" /> Matching ({analysis.matching.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.matching.map(s => <span key={s} className="badge badge-success">{s}</span>)}
                        </div>
                      </div>
                    )}
                    {analysis.missingReq.length > 0 && (
                      <div>
                        <p className="text-red-400 text-sm font-medium mb-2 flex items-center">
                          <XCircle className="h-4 w-4 mr-1" /> Missing Required ({analysis.missingReq.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.missingReq.map(s => (
                            <span key={s} className="badge bg-red-500/20 text-red-300 border border-red-500/30">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {analysis.missingPref.length > 0 && (
                      <div>
                        <p className="text-accent-400 text-sm font-medium mb-2 flex items-center">
                          <Star className="h-4 w-4 mr-1" /> Missing Preferred ({analysis.missingPref.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.missingPref.map(s => <span key={s} className="badge badge-accent">{s}</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Learning Path */}
                {analysis.path.length > 0 && (
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center">
                      <Lightbulb className="h-5 w-5 text-accent-400 mr-2" />
                      Learning Roadmap
                    </h3>
                    <div className="space-y-3">
                      {analysis.path.map((item, i) => (
                        <motion.div
                          key={item.skill}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="glass-card p-4 hover:border-primary-500/30 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-white">{item.skill}</h4>
                            <div className="flex gap-2">
                              <span className={`badge text-xs border ${priorityStyle[item.res.priority] || 'badge-gray'}`}>{item.res.priority}</span>
                              <span className={`badge text-xs border ${difficultyStyle[item.res.difficulty] || 'badge-gray'}`}>{item.res.difficulty}</span>
                            </div>
                          </div>
                          <div className="flex gap-4 text-xs text-gray-400 mb-3">
                            <span className="flex items-center"><Clock className="h-3 w-3 mr-1 text-primary-400" />{item.res.time}</span>
                            <span className="flex items-center"><TrendingUp className="h-3 w-3 mr-1 text-success-400" />{item.res.salaryImpact}</span>
                            <span className="flex items-center"><BookOpen className="h-3 w-3 mr-1 text-accent-400" />{item.res.courses.length} courses</span>
                          </div>
                          <div className="space-y-1">
                            {item.res.courses.map((c, idx) => (
                              <div key={idx} className="flex items-center text-xs text-primary-400 hover:text-primary-300 cursor-pointer transition-colors">
                                <ExternalLink className="h-3 w-3 mr-1 flex-shrink-0" />{c}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emerging Skills */}
                <div className="glass-card p-6 bg-gradient-to-br from-primary-500/5 to-accent-500/5">
                  <h3 className="text-lg font-heading font-semibold text-white mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 text-primary-400 mr-2" />
                    Emerging Skills for {targetRole}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">Stay ahead with these trending skills</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.db.emerging.map(s => (
                      <span key={s} className="badge badge-primary flex items-center">
                        <Star className="h-3 w-3 mr-1" />{s}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="glass-card p-16 text-center">
                <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-10 w-10 text-primary-500/50" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2">Ready to Analyze</h3>
                <p className="text-gray-500">Select your target role and add your current skills to get started</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsAnalysis;
