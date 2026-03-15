import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  TrendingUp, 
  Home, 
  Car, 
  Utensils,
  Zap,
  Wifi,
  Building,
  Users,
  Star,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import SalaryChart from '../components/SalaryChart';
import api from '../api/axios';

const CityComparison = () => {
  const [selectedCities, setSelectedCities] = useState(['Bangalore', 'Mumbai']);
  const [jobTitle, setJobTitle] = useState('Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState('MI');
  const [comparisonData, setComparisonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cities = [
    { 
      name: 'Bangalore', 
      icon: '🏙️', 
      color: 'from-blue-500 to-cyan-500',
      costOfLiving: 85,
      techHub: true,
      description: 'Silicon Valley of India'
    },
    { 
      name: 'Mumbai', 
      icon: '🌆', 
      color: 'from-purple-500 to-pink-500',
      costOfLiving: 100,
      techHub: false,
      description: 'Financial Capital'
    },
    { 
      name: 'Delhi', 
      icon: '🏛️', 
      color: 'from-red-500 to-orange-500',
      costOfLiving: 90,
      techHub: false,
      description: 'National Capital'
    },
    { 
      name: 'Pune', 
      icon: '🌿', 
      color: 'from-green-500 to-emerald-500',
      costOfLiving: 75,
      techHub: true,
      description: 'IT Hub'
    },
    { 
      name: 'Hyderabad', 
      icon: '💎', 
      color: 'from-indigo-500 to-blue-500',
      costOfLiving: 70,
      techHub: true,
      description: 'Cyberabad'
    },
    { 
      name: 'Chennai', 
      icon: '🏖️', 
      color: 'from-teal-500 to-cyan-500',
      costOfLiving: 80,
      techHub: true,
      description: 'Detroit of India'
    }
  ];

  const costFactors = [
    { name: 'Housing', bangalore: 100, mumbai: 150, delhi: 120, pune: 80, hyderabad: 70, chennai: 85 },
    { name: 'Food', bangalore: 100, mumbai: 120, delhi: 110, pune: 90, hyderabad: 85, chennai: 95 },
    { name: 'Transport', bangalore: 100, mumbai: 130, delhi: 115, pune: 85, hyderabad: 80, chennai: 90 },
    { name: 'Entertainment', bangalore: 100, mumbai: 140, delhi: 125, pune: 90, hyderabad: 85, chennai: 95 },
  ];

  useEffect(() => {
    if (selectedCities.length >= 2) {
      fetchComparisonData();
    }
  }, [selectedCities, jobTitle, experienceLevel]);

  const fetchComparisonData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call for city comparison
      // In real implementation, you'd have city-specific salary data
      const mockData = selectedCities.map(city => {
        const baseMultiplier = {
          'Bangalore': 1.0,
          'Mumbai': 1.15,
          'Delhi': 1.05,
          'Pune': 0.85,
          'Hyderabad': 0.80,
          'Chennai': 0.90
        };
        
        const baseSalary = experienceLevel === 'EN' ? 800000 : 
                          experienceLevel === 'MI' ? 1400000 :
                          experienceLevel === 'SE' ? 2200000 : 3500000;
        
        return {
          city,
          avgSalary: Math.round(baseSalary * baseMultiplier[city]),
          jobCount: Math.floor(Math.random() * 50) + 20,
          costOfLiving: cities.find(c => c.name === city)?.costOfLiving || 85,
          purchasingPower: Math.round((baseSalary * baseMultiplier[city]) / (cities.find(c => c.name === city)?.costOfLiving || 85) * 100)
        };
      });

      setComparisonData(mockData);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCity = (cityName) => {
    if (selectedCities.includes(cityName)) {
      if (selectedCities.length > 1) {
        setSelectedCities(selectedCities.filter(c => c !== cityName));
      }
    } else if (selectedCities.length < 4) {
      setSelectedCities([...selectedCities, cityName]);
    }
  };

  const getCityData = (cityName) => {
    return cities.find(c => c.name === cityName);
  };

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
            <MapPin className="h-4 w-4 text-primary-400" />
            <span className="text-sm text-primary-300">City Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 text-shadow-glow">
            City <span className="gradient-text">Comparison</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Compare salaries, cost of living, and opportunities across Indian cities
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-glow p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="input-field w-full"
                placeholder="e.g., Software Engineer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-3">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="input-field w-full"
              >
                <option value="EN">Entry Level (0-2 years)</option>
                <option value="MI">Mid Level (2-5 years)</option>
                <option value="SE">Senior Level (5-10 years)</option>
                <option value="EX">Executive (10+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Cities to Compare ({selectedCities.length}/4)
              </label>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => toggleCity(city.name)}
                    disabled={!selectedCities.includes(city.name) && selectedCities.length >= 4}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                      selectedCities.includes(city.name)
                        ? `bg-gradient-to-r ${city.color} text-white shadow-lg`
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 disabled:opacity-50'
                    }`}
                  >
                    <span>{city.icon}</span>
                    <span>{city.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Results */}
        {comparisonData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* City Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {comparisonData.map((data, index) => {
                const cityInfo = getCityData(data.city);
                return (
                  <motion.div
                    key={data.city}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card-hover p-6 relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cityInfo.color} opacity-5`} />
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{cityInfo.icon}</span>
                          <div>
                            <h3 className="text-lg font-bold text-white">{data.city}</h3>
                            <p className="text-xs text-gray-400">{cityInfo.description}</p>
                          </div>
                        </div>
                        {cityInfo.techHub && (
                          <span className="badge badge-success text-xs">Tech Hub</span>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-2xl font-bold gradient-text mb-1">
                            {formatCurrency(data.avgSalary, 'INR')}
                          </div>
                          <div className="text-sm text-gray-400">Average Salary</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-white font-semibold">{data.jobCount}</div>
                            <div className="text-gray-400">Jobs Available</div>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{data.costOfLiving}</div>
                            <div className="text-gray-400">Cost Index</div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Purchasing Power</span>
                            <span className="text-sm font-bold text-success-400">
                              {data.purchasingPower}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Detailed Comparison Chart */}
            <div className="glass-card-glow p-8">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 text-primary-400 mr-3" />
                Salary Comparison
              </h2>
              <SalaryChart
                data={comparisonData}
                chartType="bar"
                xKey="city"
                yKey="avgSalary"
                height={400}
                color="#0ea5e9"
              />
            </div>

            {/* Cost of Living Breakdown */}
            <div className="glass-card-glow p-8">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <Home className="h-6 w-6 text-accent-400 mr-3" />
                Cost of Living Comparison
              </h2>
              
              <div className="space-y-6">
                {costFactors.map((factor, index) => (
                  <div key={factor.name} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        {factor.name === 'Housing' && <Home className="h-4 w-4 text-primary-400" />}
                        {factor.name === 'Food' && <Utensils className="h-4 w-4 text-primary-400" />}
                        {factor.name === 'Transport' && <Car className="h-4 w-4 text-primary-400" />}
                        {factor.name === 'Entertainment' && <Star className="h-4 w-4 text-primary-400" />}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{factor.name}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {selectedCities.map(cityName => {
                        const value = factor[cityName.toLowerCase()] || 100;
                        const cityInfo = getCityData(cityName);
                        return (
                          <div key={cityName} className="glass-card p-4 text-center">
                            <div className="text-lg mb-1">{cityInfo.icon}</div>
                            <div className="text-sm text-gray-400 mb-1">{cityName}</div>
                            <div className={`text-lg font-bold ${
                              value <= 80 ? 'text-success-400' : 
                              value <= 100 ? 'text-accent-400' : 'text-red-400'
                            }`}>
                              {value}
                            </div>
                            <div className="text-xs text-gray-500">Index</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass-card-glow p-8 bg-gradient-to-br from-success-500/10 to-emerald-500/10">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-success-400 mr-3" />
                Recommendations
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-success-400">💰 Best for Salary</h3>
                  {comparisonData
                    .sort((a, b) => b.avgSalary - a.avgSalary)
                    .slice(0, 2)
                    .map((data, index) => (
                      <div key={data.city} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <span className="text-2xl">{getCityData(data.city).icon}</span>
                        <div>
                          <div className="font-semibold text-white">{data.city}</div>
                          <div className="text-sm text-success-400">{formatCurrency(data.avgSalary, 'INR')}</div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary-400">🏠 Best Value for Money</h3>
                  {comparisonData
                    .sort((a, b) => b.purchasingPower - a.purchasingPower)
                    .slice(0, 2)
                    .map((data, index) => (
                      <div key={data.city} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <span className="text-2xl">{getCityData(data.city).icon}</span>
                        <div>
                          <div className="font-semibold text-white">{data.city}</div>
                          <div className="text-sm text-primary-400">Power: {data.purchasingPower}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CityComparison;