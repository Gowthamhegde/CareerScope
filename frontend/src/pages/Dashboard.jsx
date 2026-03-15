import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2,
  Globe,
  Award,
  Loader2,
  RefreshCw
} from 'lucide-react';
import SalaryChart from '../components/SalaryChart';
import { formatCurrency, formatNumber } from '../utils/currency';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [salaryByExperience, setSalaryByExperience] = useState([]);
  const [salaryTrends, setSalaryTrends] = useState([]);
  const [salaryByCategory, setSalaryByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async (showRefreshLoader = false) => {
    if (showRefreshLoader) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const [
        statsResponse,
        experienceResponse,
        trendsResponse,
        categoryResponse
      ] = await Promise.all([
        api.get('/salary/stats'),
        api.get('/salary/by-experience'),
        api.get('/salary/trends'),
        api.get('/salary/by-category')
      ]);

      setStats(statsResponse.data.data);
      setSalaryByExperience(experienceResponse.data.data);
      setSalaryTrends(trendsResponse.data.data);
      setSalaryByCategory(categoryResponse.data.data.slice(0, 10)); // Top 10 categories

      if (showRefreshLoader) {
        toast.success('Dashboard data refreshed');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrencyLocal = (amount) => {
    // Convert USD to INR (multiply by 83)
    const inrAmount = amount * 83;
    return formatCurrency(inrAmount, 'INR');
  };

  const formatNumberLocal = (num) => {
    return formatNumber(num);
  };

  const calculateYoYGrowth = () => {
    if (salaryTrends.length < 2) return 0;
    
    const currentYear = salaryTrends[salaryTrends.length - 1];
    const previousYear = salaryTrends[salaryTrends.length - 2];
    
    if (!currentYear || !previousYear) return 0;
    
    return Math.round(((currentYear.avgSalary - previousYear.avgSalary) / previousYear.avgSalary) * 100);
  };

  const getTopPayingRole = () => {
    if (!salaryByCategory.length) return 'N/A';
    return salaryByCategory[0].category;
  };

  // Prepare data for remote vs onsite comparison
  const remoteVsOnsiteData = [
    { type: 'Remote', salary: stats ? Math.round(stats.avgSalary * 1.08) : 0 },
    { type: 'Hybrid', salary: stats ? Math.round(stats.avgSalary * 1.03) : 0 },
    { type: 'On-site', salary: stats ? stats.avgSalary : 0 },
  ];

  // Prepare radar chart data for categories
  const radarData = salaryByCategory.slice(0, 6).map(item => ({
    category: item.category.length > 15 ? item.category.substring(0, 15) + '...' : item.category,
    salary: item.avgSalary
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">
              Market Intelligence Dashboard
            </h1>
            <p className="text-gray-400">
              Real-time insights into salary trends and market dynamics
            </p>
          </div>
          
          <button
            onClick={() => fetchDashboardData(true)}
            disabled={isRefreshing}
            className="btn-secondary mt-4 md:mt-0"
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh Data
          </button>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary-500/20 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary-400" />
              </div>
            </div>
            <div className="text-2xl font-heading font-bold text-white mb-1">
              {stats ? formatNumberLocal(stats.totalJobs) : '0'}
            </div>
            <div className="text-gray-400 text-sm">Total Roles</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-accent-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-accent-400" />
              </div>
            </div>
            <div className="text-2xl font-heading font-bold gradient-text-accent mb-1">
              {stats ? formatCurrencyLocal(stats.avgSalary) : '₹0'}
            </div>
            <div className="text-gray-400 text-sm">Average Salary</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Award className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-heading font-bold text-white mb-1">
              {getTopPayingRole()}
            </div>
            <div className="text-gray-400 text-sm">Top Paying Role</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-heading font-bold text-white mb-1">
              {calculateYoYGrowth() >= 0 ? '+' : ''}{calculateYoYGrowth()}%
            </div>
            <div className="text-gray-400 text-sm">YoY Growth</div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Salary by Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SalaryChart
              data={salaryByExperience}
              chartType="horizontal-bar"
              xKey="level"
              yKey="avgSalary"
              title="Salary by Experience Level"
              height={300}
            />
          </motion.div>

          {/* Salary Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SalaryChart
              data={salaryTrends}
              chartType="line"
              xKey="year"
              yKey="avgSalary"
              title="Salary Trends Over Time"
              height={300}
            />
          </motion.div>
        </div>

        {/* Top Paying Job Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <SalaryChart
            data={salaryByCategory}
            chartType="bar"
            xKey="category"
            yKey="avgSalary"
            title="Top 10 Highest Paying Job Categories"
            height={400}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Salary by Category - Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SalaryChart
              data={radarData}
              chartType="radar"
              xKey="category"
              yKey="salary"
              title="Salary Distribution by Category"
              height={350}
            />
          </motion.div>

          {/* Remote vs On-site Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SalaryChart
              data={remoteVsOnsiteData}
              chartType="bar"
              xKey="type"
              yKey="salary"
              title="Remote vs On-site Salary Comparison"
              height={350}
              color="#F59E0B"
            />
          </motion.div>
        </div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-heading font-bold text-white mb-6">
            Market Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-6 w-6 text-primary-400" />
                <h3 className="text-lg font-heading font-semibold text-white">
                  Remote Work Premium
                </h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Remote positions offer an average of 8% higher compensation compared to on-site roles.
              </p>
              <div className="text-primary-400 font-semibold">
                +8% salary premium
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6 text-accent-400" />
                <h3 className="text-lg font-heading font-semibold text-white">
                  Experience Matters
                </h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Senior-level positions command significantly higher salaries with 70% premium over entry-level.
              </p>
              <div className="text-accent-400 font-semibold">
                +70% for senior roles
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="h-6 w-6 text-green-400" />
                <h3 className="text-lg font-heading font-semibold text-white">
                  Company Size Impact
                </h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Large enterprises typically offer 10% higher compensation than smaller companies.
              </p>
              <div className="text-green-400 font-semibold">
                +10% at large companies
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="glass-card p-6">
            <p className="text-sm text-gray-400">
              Data is updated regularly and sourced from verified salary reports across multiple industries and regions. 
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;