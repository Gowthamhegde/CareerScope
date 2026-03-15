import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Briefcase, 
  Target,
  TrendingUp,
  Award,
  Building2,
  Globe,
  Home,
  Shuffle,
  Loader2,
  CheckCircle
} from 'lucide-react';
import SearchBar from './SearchBar';
import { formatCurrency, formatCurrencyDetailed } from '../utils/currency';
import api from '../api/axios';
import toast from 'react-hot-toast';

const CTCPredictor = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  
  const [formData, setFormData] = useState({
    // Step 1
    jobTitle: '',
    currentCTC: '',
    experienceLevel: '',
    yearsExperience: 2,
    
    // Step 2
    skills: [],
    targetJobTitle: '',
    companySize: '',
    remoteRatio: null,
  });

  const totalSteps = 3;

  const experienceLevels = [
    {
      value: 'EN',
      label: 'Entry Level',
      description: '0-2 years of experience',
      icon: '🌱',
    },
    {
      value: 'MI',
      label: 'Mid Level',
      description: '2-5 years of experience',
      icon: '🚀',
    },
    {
      value: 'SE',
      label: 'Senior Level',
      description: '5-10 years of experience',
      icon: '⭐',
    },
    {
      value: 'EX',
      label: 'Executive',
      description: '10+ years of experience',
      icon: '👑',
    },
  ];

  const companySizes = [
    {
      value: 'S',
      label: 'Small',
      description: '1-50 employees',
      icon: '🏠',
    },
    {
      value: 'M',
      label: 'Medium',
      description: '51-250 employees',
      icon: '🏢',
    },
    {
      value: 'L',
      label: 'Large',
      description: '250+ employees',
      icon: '🏗️',
    },
  ];

  const remoteOptions = [
    {
      value: 0,
      label: 'On-site',
      description: 'Work from office',
      icon: Home,
    },
    {
      value: 50,
      label: 'Hybrid',
      description: 'Mix of remote and office',
      icon: Shuffle,
    },
    {
      value: 100,
      label: 'Remote',
      description: 'Work from anywhere',
      icon: Globe,
    },
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      updateFormData('skills', [...formData.skills, skill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    updateFormData('skills', formData.skills.filter(skill => skill !== skillToRemove));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedFromStep1 = () => {
    return formData.jobTitle && formData.currentCTC && formData.experienceLevel;
  };

  const canProceedFromStep2 = () => {
    return formData.targetJobTitle && formData.companySize && formData.remoteRatio !== null;
  };

  const handlePredict = async () => {
    if (!canProceedFromStep2()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/salary/predict', {
        jobTitle: formData.targetJobTitle || formData.jobTitle,
        currentCTC: parseInt(formData.currentCTC),
        experienceLevel: formData.experienceLevel,
        yearsExperience: formData.yearsExperience,
        skills: formData.skills,
        companySize: formData.companySize,
        remoteRatio: formData.remoteRatio,
      });

      setResults(response.data.data);
      nextStep();
      toast.success('Salary prediction generated successfully!');
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to generate prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrencyValue = (amount) => {
    return formatCurrency(amount, 'INR');
  };

  const formatCurrencyDetailedValue = (amount) => {
    return formatCurrencyDetailed(amount, 'INR');
  };

  const CountUpAnimation = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{formatCurrencyValue(count)}</span>;
  };

  const CircularProgress = ({ percentage }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#00D4C8"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">
              {percentage}%
            </div>
            <div className="text-xs text-gray-400">Percentile</div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <User className="h-12 w-12 text-primary-400 mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Your Current Role
        </h2>
        <p className="text-gray-400">
          Tell us about your current position and experience
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Current Job Title *
          </label>
          <SearchBar
            value={formData.jobTitle}
            onChange={(value) => updateFormData('jobTitle', value)}
            placeholder="e.g., Software Engineer, Data Scientist"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Current CTC (INR) *
          </label>
          <input
            type="number"
            value={formData.currentCTC}
            onChange={(e) => updateFormData('currentCTC', e.target.value)}
            placeholder="e.g., 800000 (₹8 Lakhs)"
            className="input-field w-full"
          />
          <p className="text-xs text-gray-400 mt-1">Enter your annual salary in Indian Rupees</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-4">
            Experience Level *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {experienceLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => updateFormData('experienceLevel', level.value)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.experienceLevel === level.value
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{level.icon}</span>
                  <div>
                    <div className="font-medium text-white">{level.label}</div>
                    <div className="text-sm text-gray-400">{level.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-4">
            Years of Experience: {formData.yearsExperience}
          </label>
          <input
            type="range"
            min="0"
            max="30"
            value={formData.yearsExperience}
            onChange={(e) => updateFormData('yearsExperience', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0 years</span>
            <span>30+ years</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Briefcase className="h-12 w-12 text-primary-400 mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Your Skills & Preferences
        </h2>
        <p className="text-gray-400">
          Help us understand your skills and target preferences
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Skills
          </label>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Type a skill and press Enter"
              className="input-field w-full"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-primary cursor-pointer hover:bg-primary-600/20"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} ×
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Target Job Title *
          </label>
          <SearchBar
            value={formData.targetJobTitle}
            onChange={(value) => updateFormData('targetJobTitle', value)}
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-4">
            Preferred Company Size *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {companySizes.map((size) => (
              <button
                key={size.value}
                onClick={() => updateFormData('companySize', size.value)}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  formData.companySize === size.value
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="text-3xl mb-2">{size.icon}</div>
                <div className="font-medium text-white">{size.label}</div>
                <div className="text-sm text-gray-400">{size.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-4">
            Remote Work Preference *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {remoteOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => updateFormData('remoteRatio', option.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    formData.remoteRatio === option.value
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary-400" />
                  <div className="font-medium text-white">{option.label}</div>
                  <div className="text-sm text-gray-400">{option.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <Target className="h-12 w-12 text-primary-400 mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Your Salary Prediction
        </h2>
        <p className="text-gray-400">
          Based on your profile and market data
        </p>
      </div>

      {results && (
        <div className="space-y-6">
          {/* Main Prediction */}
          <div className="glass-card p-8 text-center">
            <div className="text-4xl font-heading font-bold gradient-text mb-2">
              <CountUpAnimation end={results.predictedCTC} />
            </div>
            <div className="text-gray-400 mb-4">Predicted Annual CTC</div>
            
            {/* Salary Range */}
            <div className="relative bg-gray-700 rounded-full h-4 mb-4">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"
                style={{ width: '60%' }}
              />
              <div className="absolute top-6 left-0 text-xs text-gray-400">
                {formatCurrencyValue(results.minRange)}
              </div>
              <div className="absolute top-6 right-0 text-xs text-gray-400">
                {formatCurrencyValue(results.maxRange)}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Percentile */}
            <div className="glass-card p-6 text-center">
              <CircularProgress percentage={results.percentile} />
              <div className="mt-4">
                <div className="text-sm text-gray-400">Market Position</div>
                <div className="text-lg font-semibold text-white">
                  Top {100 - results.percentile}%
                </div>
              </div>
            </div>

            {/* Market Average */}
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-accent-400 mb-2">
                {formatCurrencyValue(results.marketAvg)}
              </div>
              <div className="text-sm text-gray-400">Market Average</div>
              <div className="text-lg font-semibold text-white">
                {results.predictedCTC > results.marketAvg ? 'Above' : 'Below'} Average
              </div>
            </div>

            {/* Growth */}
            <div className="glass-card p-6 text-center">
              <div className={`text-3xl font-bold mb-2 ${
                results.growthPercent >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {results.growthPercent >= 0 ? '+' : ''}{results.growthPercent}%
              </div>
              <div className="text-sm text-gray-400">vs Current CTC</div>
              <div className="text-lg font-semibold text-white">
                Growth Potential
              </div>
            </div>
          </div>

          {/* Insights */}
          {results.insights && results.insights.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center">
                <Award className="h-5 w-5 text-primary-400 mr-2" />
                Key Insights
              </h3>
              <ul className="space-y-2">
                {results.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/explore'}
              className="btn-primary"
            >
              Explore Jobs in this Range
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="glass-card p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </AnimatePresence>

        {/* Navigation */}
        {currentStep < 3 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {currentStep === 1 && (
              <button
                onClick={nextStep}
                disabled={!canProceedFromStep1()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            )}

            {currentStep === 2 && (
              <button
                onClick={handlePredict}
                disabled={!canProceedFromStep2() || isLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Predict Salary
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CTCPredictor;