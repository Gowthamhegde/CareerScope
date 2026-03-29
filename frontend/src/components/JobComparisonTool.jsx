import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  RotateCcw, 
  Download, 
  ChevronRight, 
  ArrowRight,
  Star,
  Check,
  TrendingUp,
  MapPin,
  Clock,
  Briefcase,
  Lightbulb,
  AlertCircle,
  Trophy,
  LayoutGrid,
  PieChart,
  Scale,
  X
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { formatCurrency } from '../utils/currency';

const DEFAULT_WEIGHTS = {
  salary: 25,
  growth: 20,
  benefits: 15,
  skillMatch: 20,
  wlb: 10,
  reputation: 10
};

const BENEFITS_LIST = [
  'Health Insurance', 'PTO', 'Bonus', 'Stock/ESOPs', 
  'Gym', 'Food', 'Transport', 'Learning Budget'
];

const INITIAL_JOB = {
  id: Date.now(),
  company: '',
  title: '',
  salaryValue: '',
  salaryType: 'annual', // 'annual' or 'monthly'
  location: 'Remote',
  hours: 40,
  growth: 'Medium',
  benefits: [],
  skillMatch: 50,
  wlb: 3,
  reputation: 3,
  notes: ''
};

const JobComparisonTool = () => {
  const [jobs, setJobs] = useState([]);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [salaryView, setSalaryView] = useState('annual'); // 'annual', 'monthly', 'hourly'
  const [activeTab, setActiveTab] = useState('input'); // 'input', 'compare', 'scores'
  const [showWeightCustomizer, setShowWeightCustomizer] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem('careerscope_comparison_jobs');
    const savedWeights = localStorage.getItem('careerscope_comparison_weights');
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    else setJobs([{ ...INITIAL_JOB, id: Date.now() }, { ...INITIAL_JOB, id: Date.now() + 1 }]);
    if (savedWeights) setWeights(JSON.parse(savedWeights));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('careerscope_comparison_jobs', JSON.stringify(jobs));
    localStorage.setItem('careerscope_comparison_weights', JSON.stringify(weights));
  }, [jobs, weights]);

  const addJob = () => {
    if (jobs.length < 4) {
      setJobs([...jobs, { ...INITIAL_JOB, id: Date.now() }]);
    }
  };

  const removeJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const updateJob = (id, field, value) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, [field]: value } : j));
  };

  const resetAll = () => {
    if (window.confirm('Reset all job data? This cannot be undone.')) {
      setJobs([{ ...INITIAL_JOB, id: Date.now() }, { ...INITIAL_JOB, id: Date.now() + 1 }]);
      setWeights(DEFAULT_WEIGHTS);
    }
  };

  const calculateScore = (job) => {
    // 1. Salary Score (Normalized to max salary or arbitrary high ceiling)
    const annualSalary = job.salaryType === 'annual' ? Number(job.salaryValue) : Number(job.salaryValue) * 12;
    const maxSalaryArr = jobs.map(j => j.salaryType === 'annual' ? Number(j.salaryValue) : Number(j.salaryValue) * 12);
    const maxSalary = Math.max(...maxSalaryArr, 1000000); // Floor of 10L for normalization
    const salaryScore = (annualSalary / maxSalary) * weights.salary;

    // 2. Growth Score
    const growthMap = { 'Low': 0.25, 'Medium': 0.5, 'High': 0.75, 'Exceptional': 1 };
    const growthScore = (growthMap[job.growth] || 0.5) * weights.growth;

    // 3. Benefits Score
    const benefitsScore = (job.benefits.length / BENEFITS_LIST.length) * weights.benefits;

    // 4. Skill Match
    const skillScore = (job.skillMatch / 100) * weights.skillMatch;

    // 5. WLB
    const wlbScore = (job.wlb / 5) * weights.wlb;

    // 6. Reputation
    const repScore = (job.reputation / 5) * weights.reputation;

    const total = salaryScore + growthScore + benefitsScore + skillScore + wlbScore + repScore;
    return Math.round(total);
  };

  const getJobMetrics = (job) => {
    const annual = job.salaryType === 'annual' ? Number(job.salaryValue) : Number(job.salaryValue) * 12;
    const monthly = annual / 12;
    const hourly = annual / (job.hours * 52);
    
    // Total Comp: Base + Bonus (est 10%) + Benefits (est 5k/mo)
    const bonus = annual * 0.1;
    const benefitsVal = job.benefits.length * 5000 * 12; 
    const totalComp = annual + bonus + benefitsVal;

    return { annual, monthly, hourly, totalComp };
  };

  const getProsCons = (job) => {
    const pros = [];
    const cons = [];
    
    const metrics = getJobMetrics(job);
    if (metrics.annual > 2000000) pros.push('High Base Salary');
    if (job.growth === 'High' || job.growth === 'Exceptional') pros.push('Fast Career Growth');
    if (job.wlb >= 4) pros.push('Excellent WLB');
    if (job.location === 'Remote') pros.push('Work From Anywhere');
    if (job.benefits.length >= 5) pros.push('Rich Benefits Package');

    if (job.hours > 45) cons.push('Long Working Hours');
    if (job.wlb <= 2) cons.push('Burnout Risk');
    if (job.skillMatch < 40) cons.push('High Learning Curve');
    if (job.growth === 'Low') cons.push('Stagnant Growth');
    if (metrics.annual < 800000) cons.push('Below Market Avg');

    return { 
      pros: pros.length > 0 ? pros.slice(0, 3) : ['Steady Role', 'Industry Standard'],
      cons: cons.length > 0 ? cons.slice(0, 3) : ['Req. Commute', 'Fixed Schedule']
    };
  };

  const radarData = [
    { subject: 'Salary', fullMark: 100 },
    { subject: 'Growth', fullMark: 100 },
    { subject: 'Benefits', fullMark: 100 },
    { subject: 'Skill Match', fullMark: 100 },
    { subject: 'WLB', fullMark: 100 },
    { subject: 'Reputation', fullMark: 100 },
  ].map(axis => {
    const dataPoint = { subject: axis.subject };
    jobs.forEach((job, idx) => {
      let val = 0;
      if (axis.subject === 'Salary') {
        const annual = job.salaryType === 'annual' ? Number(job.salaryValue) : Number(job.salaryValue) * 12;
        val = (annual / 5000000) * 100; // Norm to 50L
      } else if (axis.subject === 'Growth') {
        val = { 'Low': 25, 'Medium': 50, 'High': 75, 'Exceptional': 100 }[job.growth];
      } else if (axis.subject === 'Benefits') {
        val = (job.benefits.length / BENEFITS_LIST.length) * 100;
      } else if (axis.subject === 'Skill Match') {
        val = job.skillMatch;
      } else if (axis.subject === 'WLB') {
        val = (job.wlb / 5) * 100;
      } else if (axis.subject === 'Reputation') {
        val = (job.reputation / 5) * 100;
      }
      dataPoint[`job${idx}`] = Math.min(val, 100);
    });
    return dataPoint;
  });

  const colors = ['var(--accent)', 'var(--pop)', '#3b82f6', '#a855f7'];

  const winningScore = Math.max(...jobs.map(calculateScore));

  const exportPDF = () => {
    window.print();
  };

  return (
    <section id="compare-jobs" className="py-24 px-6 relative bg-surface/10">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
        <LayoutGrid size={400} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl mb-6">
              Job <span className="text-cyan text-stroke-outline">Comparison</span>
            </h2>
            <p className="text-subtext text-xl font-light">
              Don't just choose a job. Choose a transformation. Compare up to 4 offers side-by-side with our advanced scoring engine.
            </p>
          </div>
          <div className="flex gap-4">
               <button onClick={resetAll} className="btn-outline !py-3 !px-6 flex items-center gap-2">
                 <RotateCcw size={16} /> Reset
               </button>
               <button onClick={exportPDF} className="btn-neon-magenta !py-3 !px-6 flex items-center gap-2">
                 <Download size={16} /> Export PDF
               </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-2 bg-surface-2/50 backdrop-blur-xl rounded-2xl mb-12 w-fit border border-white/5">
          {['input', 'compare', 'scores'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-cyan text-bg font-bold shadow-neon-cyan' : 'text-subtext hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {jobs.map((job, idx) => (
                <div key={job.id} className="glass-panel p-8 relative group no-print">
                   <button 
                     onClick={() => removeJob(job.id)}
                     className="absolute top-4 right-4 text-white/20 hover:text-pop transition-colors"
                   >
                     <Trash2 size={18} />
                   </button>
                   <div className="mb-8">
                     <span className="font-mono text-[10px] text-cyan uppercase tracking-widest mb-4 block">Offer #{idx + 1}</span>
                     <input
                       type="text"
                       placeholder="Company Name"
                       value={job.company}
                       onChange={(e) => updateJob(job.id, 'company', e.target.value)}
                       className="bg-transparent border-b border-white/10 w-full py-2 text-xl font-heading focus:border-cyan outline-none mb-4"
                     />
                     <input
                       type="text"
                       placeholder="Job Title"
                       value={job.title}
                       onChange={(e) => updateJob(job.id, 'title', e.target.value)}
                       className="bg-transparent border-b border-white/10 w-full py-2 text-subtext focus:border-cyan outline-none"
                     />
                   </div>

                   <div className="space-y-6">
                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">Salary & Frequency</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Value"
                            value={job.salaryValue}
                            onChange={(e) => updateJob(job.id, 'salaryValue', e.target.value)}
                            className="input-neon !py-2 !px-3 flex-1"
                          />
                          <select 
                            value={job.salaryType}
                            onChange={(e) => updateJob(job.id, 'salaryType', e.target.value)}
                            className="bg-surface-2 border border-white/10 rounded-xl px-2 text-xs text-white"
                          >
                            <option value="annual">Yearly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">Location & Type</label>
                        <select 
                          value={job.location}
                          onChange={(e) => updateJob(job.id, 'location', e.target.value)}
                          className="input-neon !py-2"
                        >
                          <option value="Remote">Remote</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="On-site">On-site</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 flex justify-between">
                          WLB Rating <span>{job.wlb}/5</span>
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star}
                              size={20}
                              fill={star <= job.wlb ? "var(--accent)" : "none"}
                              className={`${star <= job.wlb ? "text-cyan" : "text-white/10"} cursor-pointer hover:scale-110 transition-transform`}
                              onClick={() => updateJob(job.id, 'wlb', star)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 flex justify-between">
                          Skill Match <span>{job.skillMatch}%</span>
                        </label>
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={job.skillMatch}
                          onChange={(e) => updateJob(job.id, 'skillMatch', Number(e.target.value))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan"
                        />
                      </div>

                      <button 
                        onClick={() => setActiveTab('compare')}
                        className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
                      >
                        More Details <ArrowRight size={12} className="inline ml-1" />
                      </button>
                   </div>
                </div>
              ))}
              {jobs.length < 4 && (
                <button 
                  onClick={addJob}
                  className="border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 text-white/20 hover:text-cyan hover:border-cyan/50 hover:bg-cyan/5 transition-all p-12 group no-print"
                >
                  <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={32} />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest">Add Another Offer</span>
                </button>
              )}
            </motion.div>
          )}

          {activeTab === 'compare' && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="overflow-x-auto rounded-3xl border border-white/5 no-print">
                <table className="w-full text-left border-collapse bg-surface/30 backdrop-blur-xl">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-8 font-mono text-xs text-subtext uppercase tracking-widest">Factor</th>
                      {jobs.map((job, idx) => (
                        <th key={job.id} className="p-8">
                          <div className="font-heading text-xl text-white">{job.company || `Job ${idx+1}`}</div>
                          <div className="text-xs text-subtext uppercase tracking-wider">{job.title || 'Role'}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-8 font-mono text-[10px] uppercase tracking-widest">Base Salary</td>
                        {jobs.map(job => (
                          <td key={job.id} className="p-8 font-bold">
                            {formatCurrency(getJobMetrics(job).annual, 'INR')} <span className="text-[10px] opacity-40">/yr</span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-8 font-mono text-[10px] uppercase tracking-widest">Growth</td>
                        {jobs.map(job => (
                          <td key={job.id} className="p-8">
                            <span className={`px-3 py-1 rounded-full text-[10px] border ${
                              job.growth === 'Exceptional' ? 'border-cyan text-cyan' : 'border-white/10 text-subtext'
                            }`}>
                              {job.growth}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-8 font-mono text-[10px] uppercase tracking-widest">Skill Match</td>
                        {jobs.map(job => (
                          <td key={job.id} className="p-8">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan" style={{ width: `${job.skillMatch}%` }} />
                              </div>
                              <span className="font-mono text-xs">{job.skillMatch}%</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-8 font-mono text-[10px] uppercase tracking-widest">Pros & Cons</td>
                        {jobs.map(job => {
                          const { pros, cons } = getProsCons(job);
                          return (
                            <td key={job.id} className="p-8">
                              <div className="flex flex-col gap-2">
                                {pros.map(p => <span key={p} className="text-[9px] font-bold text-cyan flex items-center gap-1 uppercase tracking-tighter"><Check size={10} /> {p}</span>)}
                                {cons.map(c => <span key={c} className="text-[9px] font-bold text-pop/60 flex items-center gap-1 uppercase tracking-tighter"><AlertCircle size={10} /> {c}</span>)}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-10 h-[500px]">
                   <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-10">Offer Analysis Radar</h3>
                   <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      {jobs.map((job, idx) => (
                        <Radar
                          key={job.id}
                          name={job.company || `Job ${idx+1}`}
                          dataKey={`job${idx}`}
                          stroke={colors[idx]}
                          fill={colors[idx]}
                          fillOpacity={0.2}
                        />
                      ))}
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-6">
                   <div className="glass-panel p-10">
                      <div className="flex justify-between items-center mb-10">
                         <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest">Compensation Matrix</h3>
                         <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
                            {['annual', 'monthly', 'hourly'].map(v => (
                              <button 
                                key={v}
                                onClick={() => setSalaryView(v)}
                                className={`px-4 py-1.5 rounded-md text-[9px] font-mono uppercase tracking-widest transition-all ${
                                  salaryView === v ? 'bg-white text-black font-bold' : 'text-subtext hover:text-white'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-6">
                        {jobs.map((job, idx) => {
                          const metrics = getJobMetrics(job);
                          const value = salaryView === 'annual' ? metrics.annual : salaryView === 'monthly' ? metrics.monthly : metrics.hourly;
                          return (
                            <div key={job.id} className="flex justify-between items-center group">
                               <div className="flex items-center gap-4">
                                  <div className="w-1 h-12 rounded-full" style={{ backgroundColor: colors[idx] }} />
                                  <div>
                                     <div className="text-xs text-white uppercase tracking-wider font-bold">{job.company || `Job ${idx+1}`}</div>
                                     <div className="text-[10px] text-subtext font-mono">Total Package: {formatCurrency(metrics.totalComp, 'INR')}</div>
                                  </div>
                               </div>
                               <div className="text-2xl font-heading group-hover:text-cyan transition-colors">
                                 {formatCurrency(value, 'INR')}
                               </div>
                            </div>
                          );
                        })}
                      </div>
                   </div>

                   <button 
                     onClick={() => setShowWeightCustomizer(!showWeightCustomizer)}
                     className="w-full glass-panel p-8 flex justify-between items-center group hover:bg-white/5 transition-colors border-dashed"
                   >
                     <div className="flex items-center gap-4">
                        <Scale className="text-cyan" />
                        <div className="text-left">
                           <div className="text-xs font-bold uppercase tracking-widest">Weighting Engine</div>
                           <div className="text-[10px] text-subtext font-mono">Customize algorithm preference</div>
                        </div>
                     </div>
                     <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'scores' && (
            <motion.div
              key="scores"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {jobs.map((job, idx) => {
                const score = calculateScore(job);
                const isWinner = score === winningScore && jobs.length > 1;
                return (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`glass-panel p-10 relative text-center flex flex-col items-center ${
                      isWinner ? 'border-cyan shadow-neon-cyan ring-1 ring-cyan/50 animate-glow-border' : ''
                    }`}
                  >
                     {isWinner && (
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                          <Trophy className="text-cyan mb-2 fill-cyan/20 animate-bounce" size={40} />
                          <div className="bg-cyan text-bg px-4 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-[0.2em] shadow-neon-cyan">The Winner</div>
                       </div>
                     )}

                     <div className="relative w-48 h-48 flex items-center justify-center mb-10">
                        <svg className="w-full h-full -rotate-90">
                           <circle 
                             cx="96" cy="96" r="80" 
                             fill="transparent" 
                             stroke="rgba(255,255,255,0.05)" 
                             strokeWidth="12" 
                           />
                           <motion.circle 
                             cx="96" cy="96" r="80" 
                             fill="transparent" 
                             stroke={colors[idx]} 
                             strokeWidth="12" 
                             strokeDasharray={502.4}
                             initial={{ strokeDashoffset: 502.4 }}
                             animate={{ strokeDashoffset: 502.4 - (502.4 * score) / 100 }}
                             transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                             strokeLinecap="round"
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <motion.span 
                              className="text-6xl font-heading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1 }}
                           >
                             {score}
                           </motion.span>
                           <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-subtext">Index</span>
                        </div>
                     </div>

                     <h3 className="text-2xl mb-2 uppercase break-words px-2">{job.company || `Offer ${idx+1}`}</h3>
                     <p className="text-subtext font-light mb-10 uppercase tracking-widest text-[10px]">{job.title || 'Career Path'}</p>
                     
                     <div className="w-full space-y-3 pt-6 border-t border-white/5">
                        <div className="flex justify-between text-[10px] font-mono text-subtext uppercase">
                           <span>Base Alignment</span>
                           <span className="text-white">{job.skillMatch}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-cyan/40" style={{ width: `${job.skillMatch}%` }} />
                        </div>
                     </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weight Customizer Overlay */}
        <AnimatePresence>
          {showWeightCustomizer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-bg/80 backdrop-blur-3xl flex items-center justify-center p-6"
            >
              <div className="glass-panel max-w-lg w-full p-12 relative">
                <button 
                  onClick={() => setShowWeightCustomizer(false)}
                  className="absolute top-6 right-6 text-subtext hover:text-white transition-colors"
                >
                  <X />
                </button>
                <div className="text-center mb-10">
                   <h2 className="text-3xl mb-2">Algorithm Weights</h2>
                   <p className="text-subtext text-sm">Define what matters most in your job search.</p>
                </div>
                
                <div className="space-y-8">
                  {Object.entries(weights).map(([key, val]) => (
                    <div key={key}>
                       <div className="flex justify-between items-center mb-3">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-cyan">{key.replace(/([A-Z])/g, ' $1')}</label>
                          <span className="text-white font-mono">{val}%</span>
                       </div>
                       <input 
                         type="range" 
                         min="0" max="100" 
                         value={val}
                         onChange={(e) => {
                            const newVal = Number(e.target.value);
                            setWeights({ ...weights, [key]: newVal });
                         }}
                         className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-magenta"
                       />
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => setShowWeightCustomizer(false)}
                  className="w-full btn-neon-cyan mt-12"
                >
                  Apply Algorithm
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .glass-panel { border: 1px solid #eee !important; background: white !important; color: black !important; box-shadow: none !important; }
          .text-subtext { color: #666 !important; }
          .text-white { color: black !important; }
          .clip-slant { clip-path: none !important; }
          #compare-jobs { padding: 0 !important; }
          .text-cyan { color: #008888 !important; }
          .animate-glow-border { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default JobComparisonTool;
