import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X, 
  RotateCcw,
  Building2,
  Users,
  Globe,
  Calendar,
  DollarSign,
  MapPin,
  Briefcase,
  Sparkles
} from 'lucide-react';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  isOpen,
  onToggle,
  className = ""
}) => {
  const experienceLevels = [
    { value: 'EN', label: 'Entry', icon: '🌱', color: 'from-green-500 to-emerald-600' },
    { value: 'MI', label: 'Mid', icon: '🚀', color: 'from-blue-500 to-cyan-600' },
    { value: 'SE', label: 'Senior', icon: '⭐', color: 'from-yellow-500 to-orange-600' },
    { value: 'EX', label: 'Executive', icon: '👑', color: 'from-purple-500 to-pink-600' },
  ];

  const employmentTypes = [
    { value: 'FT', label: 'Full-time', icon: '💼' },
    { value: 'PT', label: 'Part-time', icon: '⏰' },
    { value: 'CT', label: 'Contract', icon: '📋' },
    { value: 'FL', label: 'Freelance', icon: '🎯' },
  ];

  const companySizes = [
    { value: 'S', label: 'Small', icon: '🏠', desc: '1-50' },
    { value: 'M', label: 'Medium', icon: '🏢', desc: '51-250' },
    { value: 'L', label: 'Large', icon: '🏗️', desc: '250+' },
  ];

  const remoteOptions = [
    { value: 0, label: 'On-site', icon: '🏢' },
    { value: 50, label: 'Hybrid', icon: '🔀' },
    { value: 100, label: 'Remote', icon: '🌐' },
  ];

  const popularLocations = [
    { value: 'India', label: 'India', icon: '🇮🇳' },
    { value: 'United States', label: 'USA', icon: '🇺🇸' },
    { value: 'United Kingdom', label: 'UK', icon: '🇬🇧' },
    { value: 'Canada', label: 'Canada', icon: '🇨🇦' },
    { value: 'Germany', label: 'Germany', icon: '🇩🇪' },
    { value: 'Australia', label: 'Australia', icon: '🇦🇺' },
  ];

  const salaryRanges = [
    { min: 0, max: 600000, label: 'Under ₹6L', value: 'under-6l', count: '~25 jobs' },
    { min: 600000, max: 1000000, label: '₹6L - ₹10L', value: '6l-10l', count: '~35 jobs' },
    { min: 1000000, max: 1500000, label: '₹10L - ₹15L', value: '10l-15l', count: '~40 jobs' },
    { min: 1500000, max: 2000000, label: '₹15L - ₹20L', value: '15l-20l', count: '~30 jobs' },
    { min: 2000000, max: 3000000, label: '₹20L - ₹30L', value: '20l-30l', count: '~25 jobs' },
    { min: 3000000, max: 4000000, label: '₹30L - ₹40L', value: '30l-40l', count: '~15 jobs' },
    { min: 4000000, max: null, label: 'Above ₹40L', value: 'above-40l', count: '~10 jobs' },
  ];

  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  const handleRadioChange = (filterType, value) => {
    const currentValue = filters[filterType];
    onFilterChange(filterType, currentValue === value ? undefined : value);
  };

  const handleSalaryRangeChange = (range) => {
    if (range.value === filters.salaryRange) {
      onFilterChange('salaryRange', undefined);
      onFilterChange('minSalary', '');
      onFilterChange('maxSalary', '');
    } else {
      onFilterChange('salaryRange', range.value);
      onFilterChange('minSalary', range.min || '');
      onFilterChange('maxSalary', range.max || '');
    }
  };

  const hasActiveFilters = Object.values(filters).some(filter => 
    Array.isArray(filter) ? filter.length > 0 : filter !== undefined && filter !== ''
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={onToggle}
          className="flex items-center justify-center space-x-3 px-6 py-4 glass-card hover:bg-white/20 transition-all w-full group"
        >
          <Filter className="h-5 w-5 text-primary-400 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-lg">Filters</span>
          {hasActiveFilters && (
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`glass-card overflow-hidden ${className}`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500/10 to-blue-500/10 p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-500/20 rounded-lg">
                    <Sparkles className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg">Smart Filters</h3>
                    <p className="text-xs text-gray-400">Refine your search</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {hasActiveFilters && (
                    <button
                      onClick={onClearFilters}
                      className="flex items-center space-x-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all text-sm font-medium"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Clear</span>
                    </button>
                  )}
                  
                  <button
                    onClick={onToggle}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              {/* Salary Range Info */}
              <div className="flex items-center justify-between text-xs bg-white/5 rounded-lg p-3 mt-3">
                <div className="text-center flex-1">
                  <div className="text-gray-400">Min Salary</div>
                  <div className="text-success-400 font-bold">₹4.5L</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center flex-1">
                  <div className="text-gray-400">Avg Salary</div>
                  <div className="text-primary-400 font-bold">₹16.1L</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center flex-1">
                  <div className="text-gray-400">Max Salary</div>
                  <div className="text-accent-400 font-bold">₹48L</div>
                </div>
              </div>
            </div>

            {/* Filter Content */}
            <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              
              {/* Experience Level */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-4 w-4 text-primary-400" />
                  <h4 className="font-semibold text-white text-sm">Experience Level</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => handleCheckboxChange('experienceLevel', level.value)}
                      className={`relative p-4 rounded-xl border-2 transition-all group ${
                        (filters.experienceLevel || []).includes(level.value)
                          ? `border-transparent bg-gradient-to-br ${level.color} shadow-lg`
                          : 'border-white/10 hover:border-white/30 bg-white/5'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl">{level.icon}</span>
                        <span className={`text-sm font-semibold ${
                          (filters.experienceLevel || []).includes(level.value)
                            ? 'text-white'
                            : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {level.label}
                        </span>
                      </div>
                      {(filters.experienceLevel || []).includes(level.value) && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                          <span className="text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Briefcase className="h-4 w-4 text-primary-400" />
                  <h4 className="font-semibold text-white text-sm">Employment Type</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {employmentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleCheckboxChange('employmentType', type.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        (filters.employmentType || []).includes(type.value)
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <span className="mr-2">{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Size */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Building2 className="h-4 w-4 text-primary-400" />
                  <h4 className="font-semibold text-white text-sm">Company Size</h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {companySizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => handleRadioChange('companySize', size.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        filters.companySize === size.value
                          ? 'border-primary-500 bg-primary-500/20 shadow-lg shadow-primary-500/20'
                          : 'border-white/10 hover:border-white/30 bg-white/5'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl">{size.icon}</span>
                        <span className={`text-xs font-semibold ${
                          filters.companySize === size.value ? 'text-primary-300' : 'text-gray-300'
                        }`}>
                          {size.label}
                        </span>
                        <span className="text-xs text-gray-500">{size.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Remote Work */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="h-4 w-4 text-primary-400" />
                  <h4 className="font-semibold text-white text-sm">Work Mode</h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {remoteOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleRadioChange('remoteRatio', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        filters.remoteRatio === option.value
                          ? 'border-success-500 bg-success-500/20 shadow-lg shadow-success-500/20'
                          : 'border-white/10 hover:border-white/30 bg-white/5'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl">{option.icon}</span>
                        <span className={`text-xs font-semibold ${
                          filters.remoteRatio === option.value ? 'text-success-300' : 'text-gray-300'
                        }`}>
                          {option.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary-400" />
                  <h4 className="font-semibold text-white text-sm">Location</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {popularLocations.map((location) => (
                    <button
                      key={location.value}
                      onClick={() => handleCheckboxChange('companyLocation', location.value)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                        (filters.companyLocation || []).includes(location.value)
                          ? 'bg-accent-500/20 text-accent-300 border-2 border-accent-500/50'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border-2 border-white/10'
                      }`}
                    >
                      <span className="text-lg">{location.icon}</span>
                      <span>{location.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="h-4 w-4 text-primary-400" />
                  <h4 className="font-semibold text-white text-sm">Salary Range (INR)</h4>
                </div>
                <div className="space-y-2">
                  {salaryRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => handleSalaryRangeChange(range)}
                      className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all text-left flex items-center justify-between ${
                        filters.salaryRange === range.value
                          ? 'bg-gradient-to-r from-accent-500 to-orange-500 text-white shadow-lg'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <span>{range.label}</span>
                      <span className={`text-xs ${
                        filters.salaryRange === range.value ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {range.count}
                      </span>
                    </button>
                  ))}
                  
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 mb-3">Custom Range</p>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minSalary || ''}
                        onChange={(e) => onFilterChange('minSalary', e.target.value)}
                        className="input-field text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxSalary || ''}
                        onChange={(e) => onFilterChange('maxSalary', e.target.value)}
                        className="input-field text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Year */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-4 w-4 text-primary-400" />
                  <h4 className="font-semibold text-white text-sm">Work Year</h4>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="2020"
                      max="2024"
                      value={filters.workYear || 2024}
                      onChange={(e) => onFilterChange('workYear', parseInt(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-primary-500/20 to-primary-500/40 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((filters.workYear || 2024) - 2020) * 25}%, rgba(14, 165, 233, 0.2) ${((filters.workYear || 2024) - 2020) * 25}%, rgba(14, 165, 233, 0.2) 100%)`
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">2020</span>
                    <div className="px-4 py-2 bg-primary-500/20 rounded-lg border border-primary-500/30">
                      <span className="text-primary-300 font-bold text-lg">
                        {filters.workYear || 2024}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">2024</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterPanel;