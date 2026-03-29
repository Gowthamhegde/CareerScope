import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Award, Briefcase, Code, DollarSign } from 'lucide-react';

const ResumeSalaryEstimator = () => {
  const [resumeData, setResumeData] = useState({
    role: '',
    experience: '',
    skills: [],
    education: '',
    location: '',
    currentSalary: ''
  });

  const [estimate, setEstimate] = useState(null);

  const skillsList = [
    'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes',
    'Machine Learning', 'Data Science', 'SQL', 'MongoDB', 'TypeScript',
    'Angular', 'Vue.js', 'Go', 'Rust', 'DevOps', 'CI/CD', 'Terraform'
  ];

  const calculateEstimate = () => {
    const exp = parseFloat(resumeData.experience) || 0;
    const skillCount = resumeData.skills.length;
    
    // Base salary by experience
    let baseSalary = 400000; // 4 LPA for freshers
    if (exp >= 1) baseSalary = 600000;
    if (exp >= 2) baseSalary = 900000;
    if (exp >= 3) baseSalary = 1200000;
    if (exp >= 5) baseSalary = 1800000;
    if (exp >= 7) baseSalary = 2500000;
    if (exp >= 10) baseSalary = 3500000;

    // Skill multiplier
    const highValueSkills = ['AWS', 'Machine Learning', 'Data Science', 'Kubernetes', 'Go', 'Rust'];
    const hasHighValueSkills = resumeData.skills.some(s => highValueSkills.includes(s));
    const skillMultiplier = 1 + (skillCount * 0.05) + (hasHighValueSkills ? 0.15 : 0);

    // Education multiplier
    const eduMultiplier = resumeData.education === 'Masters' ? 1.15 : 
                         resumeData.education === 'PhD' ? 1.25 : 1.0;

    // Location multiplier
    const locMultiplier = {
      'Bangalore': 1.15,
      'Mumbai': 1.10,
      'Delhi/NCR': 1.08,
      'Hyderabad': 1.05,
      'Pune': 1.03,
      'Chennai': 1.0
    }[resumeData.location] || 1.0;

    const estimatedSalary = baseSalary * skillMultiplier * eduMultiplier * locMultiplier;
    const minSalary = estimatedSalary * 0.85;
    const maxSalary = estimatedSalary * 1.20;

    setEstimate({
      min: Math.round(minSalary / 100000),
      avg: Math.round(estimatedSalary / 100000),
      max: Math.round(maxSalary / 100000),
      factors: {
        experience: exp,
        skills: skillCount,
        hasHighValue: hasHighValueSkills,
        education: resumeData.education,
        location: resumeData.location
      }
    });
  };

  const toggleSkill = (skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-block px-4 py-1 border border-cyan/30 bg-cyan/10 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan tracking-widest uppercase flex items-center gap-2">
              <FileText size={14} /> Resume Salary Estimator
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6">
            Know Your <span className="gradient-text">Market Value</span>
          </h1>
          <p className="text-xl text-subtext max-w-3xl">
            Based on your skills, experience, and location - get an instant salary estimate.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-panel p-8 space-y-6">
            <div>
              <label className="block text-sm text-subtext mb-2">Current Role</label>
              <input
                type="text"
                value={resumeData.role}
                onChange={(e) => setResumeData({...resumeData, role: e.target.value})}
                placeholder="e.g., Software Engineer"
                className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-subtext mb-2">Years of Experience</label>
              <input
                type="number"
                value={resumeData.experience}
                onChange={(e) => setResumeData({...resumeData, experience: e.target.value})}
                placeholder="3"
                className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-subtext mb-2">Select Your Skills</label>
              <div className="flex flex-wrap gap-2">
                {skillsList.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      resumeData.skills.includes(skill)
                        ? 'bg-cyan text-dark'
                        : 'bg-surface/50 text-subtext hover:bg-surface'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-subtext mb-2">Education</label>
              <select
                value={resumeData.education}
                onChange={(e) => setResumeData({...resumeData, education: e.target.value})}
                className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
              >
                <option value="">Select</option>
                <option>Bachelors</option>
                <option>Masters</option>
                <option>PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-subtext mb-2">Location</label>
              <select
                value={resumeData.location}
                onChange={(e) => setResumeData({...resumeData, location: e.target.value})}
                className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
              >
                <option value="">Select city</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Delhi/NCR</option>
                <option>Hyderabad</option>
                <option>Pune</option>
                <option>Chennai</option>
              </select>
            </div>

            <button onClick={calculateEstimate} className="w-full btn-neon-cyan py-4 text-lg">
              Calculate My Worth
            </button>
          </div>

          {estimate && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-panel p-8">
                <h3 className="text-2xl font-heading mb-6">Your Estimated Salary Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-subtext">Minimum</span>
                    <span className="text-2xl font-heading text-cyan">₹{estimate.min}L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-subtext">Average</span>
                    <span className="text-3xl font-heading text-magenta">₹{estimate.avg}L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-subtext">Maximum</span>
                    <span className="text-2xl font-heading text-green-400">₹{estimate.max}L</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h4 className="font-heading mb-4">Factors Considered</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Briefcase size={16} className="text-cyan" />
                    {estimate.factors.experience} years experience
                  </p>
                  <p className="flex items-center gap-2">
                    <Code size={16} className="text-magenta" />
                    {estimate.factors.skills} skills
                    {estimate.factors.hasHighValue && ' (including high-value skills)'}
                  </p>
                  <p className="flex items-center gap-2">
                    <Award size={16} className="text-yellow-400" />
                    {estimate.factors.education || 'Education'}
                  </p>
                  <p className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-green-400" />
                    {estimate.factors.location}
                  </p>
                </div>
              </div>

              <div className="glass-panel p-6 bg-cyan/10 border-cyan/30">
                <p className="text-sm text-cyan">
                  💡 Tip: This is an estimate based on market data. Your actual worth may vary based on company, specific skills, and negotiation.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeSalaryEstimator;
