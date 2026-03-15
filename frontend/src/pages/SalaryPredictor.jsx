import React from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, TrendingUp, Sparkles } from 'lucide-react';
import CTCPredictor from '../components/CTCPredictor';

const SalaryPredictor = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary-400" />
            <span className="text-sm text-primary-300">AI-Powered Prediction</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Salary <span className="gradient-text">Predictor</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover your market worth with our advanced AI algorithm. Get personalized salary predictions 
            in Indian Rupees (₹) based on your skills, experience, and career preferences.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass-card p-6 text-center">
            <Brain className="h-12 w-12 text-primary-400 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-white mb-2">
              AI-Powered Analysis
            </h3>
            <p className="text-gray-400 text-sm">
              Our machine learning model analyzes thousands of data points to provide accurate predictions
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <Target className="h-12 w-12 text-accent-400 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-white mb-2">
              Personalized Results
            </h3>
            <p className="text-gray-400 text-sm">
              Get tailored salary ranges based on your unique profile and career goals
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-white mb-2">
              Market Insights
            </h3>
            <p className="text-gray-400 text-sm">
              Understand your position in the market and identify growth opportunities
            </p>
          </div>
        </motion.div>

        {/* Predictor Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CTCPredictor />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              How Our Prediction Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI model considers multiple factors to provide you with the most accurate salary prediction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-400 font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                Experience Analysis
              </h3>
              <p className="text-gray-400 text-sm">
                We analyze your experience level and years in the field to establish a baseline
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent-400 font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                Skills Matching
              </h3>
              <p className="text-gray-400 text-sm">
                Your skills are matched against market demand to determine value multipliers
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-400 font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                Market Factors
              </h3>
              <p className="text-gray-400 text-sm">
                Company size, remote work, and location preferences are factored into the calculation
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-400 font-bold text-lg">4</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                Final Prediction
              </h3>
              <p className="text-gray-400 text-sm">
                All factors are combined using our proprietary algorithm to generate your prediction
              </p>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-6 max-w-4xl mx-auto">
            <p className="text-sm text-gray-400 leading-relaxed">
              <strong className="text-white">Disclaimer:</strong> Salary predictions are estimates based on available market data 
              and should be used as a reference point. Actual salaries may vary based on company policies, 
              negotiation skills, additional benefits, and other factors not captured in our model. 
              We recommend using these predictions as part of your overall career planning strategy.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SalaryPredictor;