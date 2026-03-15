import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 flex items-center justify-center"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Illustration */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-8xl font-heading font-bold gradient-text mb-4"
            >
              404
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl mb-6"
            >
              🔍
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-heading font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-400 mb-6 leading-relaxed">
              Oops! The page you're looking for seems to have wandered off into the digital void. 
              Don't worry, even the best career paths have unexpected detours.
            </p>
            <p className="text-gray-500">
              The page might have been moved, deleted, or you might have entered the wrong URL.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/" className="btn-primary">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
            
            <Link to="/explore" className="btn-secondary">
              <Search className="h-5 w-5 mr-2" />
              Explore Jobs
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 glass-card p-6"
          >
            <h3 className="text-lg font-heading font-semibold text-white mb-4">
              While you're here, why not try:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <Link
                to="/predictor"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <span className="text-primary-400 text-lg">💰</span>
                </div>
                <div>
                  <div className="text-white font-medium">Salary Predictor</div>
                  <div className="text-gray-400 text-sm">Calculate your expected CTC</div>
                </div>
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center group-hover:bg-accent-500/30 transition-colors">
                  <span className="text-accent-400 text-lg">📊</span>
                </div>
                <div>
                  <div className="text-white font-medium">Market Dashboard</div>
                  <div className="text-gray-400 text-sm">View salary trends and insights</div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 italic">
              Fun fact: 404 errors got their name from room 404 at CERN, where the web was born! 🌐
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;