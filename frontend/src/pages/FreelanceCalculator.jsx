import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, TrendingUp } from 'lucide-react';

const FreelanceCalculator = () => {
  const [fullTimeSalary, setFullTimeSalary] = useState('');
  const [workingDays, setWorkingDays] = useState('22');
  const [workingHours, setWorkingHours] = useState('8');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const annual = parseFloat(fullTimeSalary) * 100000 || 0;
    const days = parseFloat(workingDays) || 22;
    const hours = parseFloat(workingHours) || 8;

    // Calculate rates
    const monthlyRate = annual / 12;
    const dailyRate = monthlyRate / days;
    const hourlyRate = dailyRate / hours;

    // Freelance markup (30-50% more for benefits, taxes, etc.)
    const freelanceHourly = hourlyRate * 1.4;
    const freelanceDaily = dailyRate * 1.4;
    const freelanceMonthly = monthlyRate * 1.4;

    // Project rates
    const smallProject = freelanceHourly * 40; // 1 week project
    const mediumProject = freelanceHourly * 160; // 1 month project
    const largeProject = freelanceHourly * 480; // 3 month project

    setResult({
      hourly: Math.round(hourlyRate),
      daily: Math.round(dailyRate),
      monthly: Math.round(monthlyRate),
      freelanceHourly: Math.round(freelanceHourly),
      freelanceDaily: Math.round(freelanceDaily),
      freelanceMonthly: Math.round(freelanceMonthly),
      smallProject: Math.round(smallProject),
      mediumProject: Math.round(mediumProject),
      largeProject: Math.round(largeProject)
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-block px-4 py-1 border border-cyan/30 bg-cyan/10 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan tracking-widest uppercase flex items-center gap-2">
              <Calculator size={14} /> Freelance Rate Calculator
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6">
            Calculate Your <span className="gradient-text">Freelance Rates</span>
          </h1>
          <p className="text-xl text-subtext max-w-3xl">
            Convert your full-time salary to hourly, daily, and project rates for freelancing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-heading mb-6">Your Full-Time Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-subtext mb-2">Current Annual Salary (LPA)</label>
                <input
                  type="number"
                  value={fullTimeSalary}
                  onChange={(e) => setFullTimeSalary(e.target.value)}
                  placeholder="12"
                  className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white text-2xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-subtext mb-2">Working Days/Month</label>
                  <input
                    type="number"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(e.target.value)}
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-subtext mb-2">Hours/Day</label>
                  <input
                    type="number"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <button onClick={calculate} className="w-full btn-neon-cyan py-4 text-lg">
                Calculate Rates
              </button>

              <div className="bg-cyan/10 border border-cyan/30 rounded-lg p-4">
                <p className="text-sm text-cyan">
                  💡 Freelance rates are typically 30-50% higher than full-time equivalent to account for benefits, taxes, and business expenses.
                </p>
              </div>
            </div>
          </div>

          {result && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                  <DollarSign className="text-cyan" /> Full-Time Equivalent
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-subtext">Hourly</span>
                    <span className="text-xl font-heading">₹{result.hourly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-subtext">Daily</span>
                    <span className="text-xl font-heading">₹{result.daily.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-subtext">Monthly</span>
                    <span className="text-xl font-heading">₹{result.monthly.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 bg-cyan/10 border-cyan/30">
                <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                  <TrendingUp className="text-cyan" /> Recommended Freelance Rates
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-subtext">Hourly Rate</span>
                    <span className="text-2xl font-heading text-cyan">₹{result.freelanceHourly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-subtext">Daily Rate</span>
                    <span className="text-2xl font-heading text-magenta">₹{result.freelanceDaily.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-subtext">Monthly Rate</span>
                    <span className="text-2xl font-heading text-green-400">₹{result.freelanceMonthly.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                  <Clock className="text-magenta" /> Project Pricing Guide
                </h3>
                <div className="space-y-3">
                  <div className="bg-surface/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Small Project (1 week)</span>
                      <span className="text-xl font-heading text-cyan">₹{result.smallProject.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-subtext">~40 hours of work</p>
                  </div>
                  <div className="bg-surface/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Medium Project (1 month)</span>
                      <span className="text-xl font-heading text-magenta">₹{result.mediumProject.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-subtext">~160 hours of work</p>
                  </div>
                  <div className="bg-surface/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Large Project (3 months)</span>
                      <span className="text-xl font-heading text-green-400">₹{result.largeProject.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-subtext">~480 hours of work</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 bg-yellow-500/10 border-yellow-500/30">
                <h4 className="font-heading mb-3">💡 Pricing Tips</h4>
                <ul className="space-y-2 text-sm text-subtext">
                  <li>• Start with these rates and adjust based on client budget</li>
                  <li>• Charge more for rush projects (1.5-2x)</li>
                  <li>• Offer package deals for long-term clients</li>
                  <li>• Include revisions limit in your quote</li>
                  <li>• Always get 30-50% advance payment</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelanceCalculator;
