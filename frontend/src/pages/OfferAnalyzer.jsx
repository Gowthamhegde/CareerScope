import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Award,
  XCircle,
  Info,
  ArrowRight
} from 'lucide-react';

const OfferAnalyzer = () => {
  const [offerData, setOfferData] = useState({
    jobTitle: '',
    ctc: '',
    baseSalary: '',
    bonus: '',
    stocks: '',
    joiningBonus: '',
    noticePeriod: '',
    probation: '',
    location: '',
    experience: ''
  });

  const [analysis, setAnalysis] = useState(null);

  const analyzeOffer = () => {
    const ctc = parseFloat(offerData.ctc) || 0;
    const base = parseFloat(offerData.baseSalary) || 0;
    const bonus = parseFloat(offerData.bonus) || 0;
    const stocks = parseFloat(offerData.stocks) || 0;
    
    // Calculate percentages
    const basePercent = (base / ctc) * 100;
    const variablePercent = ((bonus + stocks) / ctc) * 100;
    
    // Market benchmarks
    const marketRates = {
      'Software Engineer': { min: 8, max: 20, avg: 12 },
      'Data Scientist': { min: 10, max: 25, avg: 15 },
      'Product Manager': { min: 15, max: 35, avg: 22 },
      'DevOps Engineer': { min: 9, max: 22, avg: 14 },
      'Frontend Developer': { min: 7, max: 18, avg: 11 },
      'Backend Developer': { min: 8, max: 20, avg: 13 }
    };

    const market = marketRates[offerData.jobTitle] || { min: 5, max: 15, avg: 10 };
    
    // Red flags
    const redFlags = [];
    const greenFlags = [];
    const warnings = [];

    // Analyze base salary percentage
    if (basePercent < 60) {
      redFlags.push({
        issue: 'Low Base Salary',
        detail: `Base is only ${basePercent.toFixed(0)}% of CTC. Healthy offers have 70-80% base.`,
        impact: 'High risk - variable components may not materialize'
      });
    } else if (basePercent >= 70) {
      greenFlags.push({
        point: 'Good Base Salary',
        detail: `Base is ${basePercent.toFixed(0)}% of CTC - healthy structure`
      });
    }

    // Analyze CTC vs market
    if (ctc < market.min) {
      redFlags.push({
        issue: 'Below Market Rate',
        detail: `₹${ctc}L is below market minimum of ₹${market.min}L for ${offerData.jobTitle}`,
        impact: 'You may be underpaid by ₹${(market.avg - ctc).toFixed(1)}L'
      });
    } else if (ctc >= market.avg) {
      greenFlags.push({
        point: 'Competitive Salary',
        detail: `₹${ctc}L is at or above market average of ₹${market.avg}L`
      });
    }

    // Notice period
    if (parseInt(offerData.noticePeriod) > 90) {
      redFlags.push({
        issue: 'Long Notice Period',
        detail: `${offerData.noticePeriod} days notice is very long`,
        impact: 'Difficult to switch jobs in future'
      });
    } else if (parseInt(offerData.noticePeriod) <= 60) {
      greenFlags.push({
        point: 'Reasonable Notice Period',
        detail: `${offerData.noticePeriod} days is standard`
      });
    }

    // Probation
    if (parseInt(offerData.probation) > 6) {
      warnings.push({
        issue: 'Long Probation',
        detail: `${offerData.probation} months probation is longer than standard 3-6 months`
      });
    }

    // Variable pay
    if (variablePercent > 30) {
      warnings.push({
        issue: 'High Variable Component',
        detail: `${variablePercent.toFixed(0)}% of CTC is variable (bonus + stocks)`,
        note: 'Ask about payout history and conditions'
      });
    }

    // Calculate take-home
    const monthlyBase = base / 12;
    const pf = monthlyBase * 0.12;
    const tax = calculateTax(base);
    const monthlyTakeHome = (base - tax - (pf * 12)) / 12;
    const annualTakeHome = monthlyTakeHome * 12;

    setAnalysis({
      ctc,
      base,
      basePercent,
      variablePercent,
      monthlyTakeHome,
      annualTakeHome,
      market,
      redFlags,
      greenFlags,
      warnings,
      score: calculateScore(redFlags, greenFlags, warnings),
      recommendation: getRecommendation(redFlags, greenFlags, ctc, market)
    });
  };

  const calculateTax = (annual) => {
    // Simplified tax calculation (old regime)
    if (annual <= 250000) return 0;
    if (annual <= 500000) return (annual - 250000) * 0.05;
    if (annual <= 1000000) return 12500 + (annual - 500000) * 0.20;
    return 112500 + (annual - 1000000) * 0.30;
  };

  const calculateScore = (red, green, warn) => {
    let score = 70;
    score -= red.length * 15;
    score += green.length * 10;
    score -= warn.length * 5;
    return Math.max(0, Math.min(100, score));
  };

  const getRecommendation = (red, green, ctc, market) => {
    if (red.length >= 3) return 'reject';
    if (red.length >= 2) return 'negotiate';
    if (ctc >= market.avg && red.length === 0) return 'accept';
    return 'negotiate';
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-block px-4 py-1 border border-cyan/30 bg-cyan/10 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan tracking-widest uppercase flex items-center gap-2">
              <FileText size={14} /> Offer Letter Analysis
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6">
            Analyze Your <span className="gradient-text">Job Offer</span>
          </h1>
          <p className="text-xl text-subtext max-w-3xl">
            Get instant analysis of your offer letter. Identify red flags, compare with market rates, and make informed decisions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-heading mb-6">Enter Offer Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-subtext mb-2">Job Title</label>
                <select
                  value={offerData.jobTitle}
                  onChange={(e) => setOfferData({...offerData, jobTitle: e.target.value})}
                  className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
                >
                  <option value="">Select role</option>
                  <option>Software Engineer</option>
                  <option>Data Scientist</option>
                  <option>Product Manager</option>
                  <option>DevOps Engineer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Data Analyst</option>
                  <option>UI/UX Designer</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-subtext mb-2">Total CTC (LPA)</label>
                  <input
                    type="number"
                    value={offerData.ctc}
                    onChange={(e) => setOfferData({...offerData, ctc: e.target.value})}
                    placeholder="12"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-subtext mb-2">Base Salary (LPA)</label>
                  <input
                    type="number"
                    value={offerData.baseSalary}
                    onChange={(e) => setOfferData({...offerData, baseSalary: e.target.value})}
                    placeholder="9"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-subtext mb-2">Annual Bonus (LPA)</label>
                  <input
                    type="number"
                    value={offerData.bonus}
                    onChange={(e) => setOfferData({...offerData, bonus: e.target.value})}
                    placeholder="2"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-subtext mb-2">Stock/ESOP (LPA)</label>
                  <input
                    type="number"
                    value={offerData.stocks}
                    onChange={(e) => setOfferData({...offerData, stocks: e.target.value})}
                    placeholder="1"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-subtext mb-2">Notice Period (days)</label>
                  <input
                    type="number"
                    value={offerData.noticePeriod}
                    onChange={(e) => setOfferData({...offerData, noticePeriod: e.target.value})}
                    placeholder="60"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-subtext mb-2">Probation (months)</label>
                  <input
                    type="number"
                    value={offerData.probation}
                    onChange={(e) => setOfferData({...offerData, probation: e.target.value})}
                    placeholder="6"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-subtext mb-2">Location</label>
                <select
                  value={offerData.location}
                  onChange={(e) => setOfferData({...offerData, location: e.target.value})}
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

              <button
                onClick={analyzeOffer}
                className="w-full btn-neon-cyan py-4 text-lg"
              >
                Analyze Offer
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Score Card */}
              <div className="glass-panel p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-heading">Offer Score</h3>
                  <div className={`text-5xl font-bold ${
                    analysis.score >= 80 ? 'text-green-400' :
                    analysis.score >= 60 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {analysis.score}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="h-3 bg-surface/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        analysis.score >= 80 ? 'bg-green-400' :
                        analysis.score >= 60 ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}
                      style={{ width: `${analysis.score}%` }}
                    />
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  analysis.recommendation === 'accept' ? 'bg-green-500/20 border border-green-500/30' :
                  analysis.recommendation === 'negotiate' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                  'bg-red-500/20 border border-red-500/30'
                }`}>
                  <p className="text-lg font-heading mb-2">
                    {analysis.recommendation === 'accept' ? '✅ Good Offer - Consider Accepting' :
                     analysis.recommendation === 'negotiate' ? '⚠️ Negotiate Before Accepting' :
                     '❌ Reconsider This Offer'}
                  </p>
                  <p className="text-sm text-subtext">
                    {analysis.recommendation === 'accept' ? 'This offer is competitive and has minimal red flags.' :
                     analysis.recommendation === 'negotiate' ? 'Some concerns exist. Try negotiating key terms.' :
                     'Multiple red flags detected. Consider other opportunities.'}
                  </p>
                </div>
              </div>

              {/* Take Home */}
              <div className="glass-panel p-6">
                <h3 className="text-xl font-heading mb-4">Expected Take-Home</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-subtext">Monthly In-Hand</p>
                    <p className="text-2xl font-heading text-cyan">₹{analysis.monthlyTakeHome.toFixed(0).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-subtext">Annual In-Hand</p>
                    <p className="text-2xl font-heading text-magenta">₹{analysis.annualTakeHome.toFixed(0).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              {/* Red Flags */}
              {analysis.redFlags.length > 0 && (
                <div className="glass-panel p-6">
                  <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                    <XCircle className="text-red-400" /> Red Flags
                  </h3>
                  <div className="space-y-3">
                    {analysis.redFlags.map((flag, i) => (
                      <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <p className="font-medium text-red-400 mb-1">{flag.issue}</p>
                        <p className="text-sm text-subtext mb-2">{flag.detail}</p>
                        <p className="text-xs text-red-300">{flag.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Green Flags */}
              {analysis.greenFlags.length > 0 && (
                <div className="glass-panel p-6">
                  <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                    <CheckCircle className="text-green-400" /> Positive Points
                  </h3>
                  <div className="space-y-3">
                    {analysis.greenFlags.map((flag, i) => (
                      <div key={i} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <p className="font-medium text-green-400 mb-1">{flag.point}</p>
                        <p className="text-sm text-subtext">{flag.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Warnings */}
              {analysis.warnings.length > 0 && (
                <div className="glass-panel p-6">
                  <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-yellow-400" /> Points to Clarify
                  </h3>
                  <div className="space-y-3">
                    {analysis.warnings.map((warn, i) => (
                      <div key={i} className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <p className="font-medium text-yellow-400 mb-1">{warn.issue}</p>
                        <p className="text-sm text-subtext mb-2">{warn.detail}</p>
                        {warn.note && <p className="text-xs text-yellow-300">{warn.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferAnalyzer;
