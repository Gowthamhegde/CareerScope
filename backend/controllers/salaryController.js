const SupabaseJob = require('../models/SupabaseJob');

// Get salary statistics
const getSalaryStats = async (req, res) => {
  try {
    const stats = await SupabaseJob.getStats();

    res.json({
      success: true,
      data: {
        avgSalary: stats.avgSalary,
        medianSalary: stats.avgSalary, // Approximate median as avg for now
        minSalary: 0,
        maxSalary: stats.avgSalary * 3, // Approximate
        totalJobs: stats.totalJobs
      }
    });
  } catch (error) {
    console.error('Get salary stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching salary stats',
      error: error.message
    });
  }
};

// Get salary breakdown by experience level
const getSalaryByExperience = async (req, res) => {
  try {
    const stats = await SupabaseJob.getStats();

    res.json({
      success: true,
      data: stats.experienceLevels || []
    });
  } catch (error) {
    console.error('Get salary by experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching salary by experience',
      error: error.message
    });
  }
};

// Get salary breakdown by category
const getSalaryByCategory = async (req, res) => {
  try {
    // For now, return empty array - this needs proper Supabase aggregation
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Get salary by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching salary by category',
      error: error.message
    });
  }
};

// Get salary trends over years
const getSalaryTrends = async (req, res) => {
  try {
    // For now, return empty array - this needs proper Supabase aggregation
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Get salary trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching salary trends',
      error: error.message
    });
  }
};

// Predict salary based on user input
const predictSalary = async (req, res) => {
  try {
    const {
      jobTitle,
      currentCTC,
      experienceLevel,
      yearsExperience,
      skills = [],
      companySize,
      remoteRatio
    } = req.body;

    // Validation
    if (!jobTitle || !currentCTC || !experienceLevel || yearsExperience === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: jobTitle, currentCTC, experienceLevel, yearsExperience'
      });
    }

    // Find similar jobs using Supabase
    const similarJobs = await SupabaseJob.search(jobTitle, { limit: 50 });

    if (similarJobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No similar jobs found for prediction'
      });
    }

    // Calculate base salary from similar jobs using local currency
    const salaries = similarJobs.map(job => job.salary_local || job.salary_usd * 83);
    const baseSalary = salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;

    // Experience multipliers
    const expMultipliers = {
      'EN': 1.0,
      'MI': 1.3,
      'SE': 1.7,
      'EX': 2.2
    };

    // Apply experience level multiplier
    let predictedSalary = baseSalary * (expMultipliers[experienceLevel] || 1.0);

    // Apply years of experience bonus (5% per year beyond baseline)
    const baselineYears = { 'EN': 0, 'MI': 2, 'SE': 5, 'EX': 10 };
    const extraYears = Math.max(0, yearsExperience - (baselineYears[experienceLevel] || 0));
    predictedSalary *= (1 + (extraYears * 0.05));

    // Apply remote work premium
    if (remoteRatio === 100) {
      predictedSalary *= 1.08; // +8% for full remote
    } else if (remoteRatio === 50) {
      predictedSalary *= 1.03; // +3% for hybrid
    }

    // Apply company size factor
    const companySizeFactors = { 'L': 1.1, 'M': 1.0, 'S': 0.95 };
    if (companySize && companySizeFactors[companySize]) {
      predictedSalary *= companySizeFactors[companySize];
    }

    // Calculate ranges (±20%)
    const minRange = Math.round(predictedSalary * 0.8);
    const maxRange = Math.round(predictedSalary * 1.2);
    predictedSalary = Math.round(predictedSalary);

    // Calculate percentile of current CTC
    const sortedSalaries = salaries.sort((a, b) => a - b);
    const percentileIndex = sortedSalaries.findIndex(salary => salary >= currentCTC);
    const percentile = percentileIndex === -1 ? 100 : Math.round((percentileIndex / sortedSalaries.length) * 100);

    // Calculate growth percentage
    const growthPercent = Math.round(((predictedSalary - currentCTC) / currentCTC) * 100);

    // Generate insights
    const insights = [];
    
    if (growthPercent > 30) {
      insights.push('🚀 Excellent growth potential! Your predicted salary shows strong upward trajectory');
    } else if (growthPercent > 15) {
      insights.push('📈 Good growth potential with significant salary increase expected');
    } else if (growthPercent > 0) {
      insights.push('✅ Your predicted salary shows moderate growth potential');
    } else if (growthPercent === 0) {
      insights.push('💼 Your current salary is competitive for your profile');
    } else {
      insights.push('⚠️ Your current salary is above market average for similar roles');
    }

    if (remoteRatio === 100) {
      insights.push('🌐 Remote work adds a premium of 8% to your expected salary');
    } else if (remoteRatio === 50) {
      insights.push('🔀 Hybrid work model adds a 3% premium to your salary');
    }

    if (companySize === 'L') {
      insights.push('🏗️ Large companies typically offer 10% higher compensation packages');
    } else if (companySize === 'S') {
      insights.push('🏠 Startups may offer equity compensation in addition to base salary');
    }

    if (yearsExperience > (baselineYears[experienceLevel] || 0)) {
      insights.push('⭐ Your experience exceeds the typical level for your role, adding value');
    }

    if (skills.length >= 5) {
      insights.push('🎯 Your diverse skill set increases your market value');
    }

    // Add market position insight
    if (percentile >= 75) {
      insights.push('🏆 You\'re in the top 25% salary bracket for similar roles');
    } else if (percentile >= 50) {
      insights.push('📊 You\'re in the upper 50% salary range for your profile');
    } else if (percentile >= 25) {
      insights.push('💡 There\'s room for salary negotiation based on market data');
    }

    res.json({
      success: true,
      data: {
        predictedCTC: predictedSalary,
        minRange,
        maxRange,
        percentile,
        marketAvg: Math.round(baseSalary),
        growthPercent,
        insights: insights.slice(0, 5), // Limit to 5 insights
        similarJobsCount: similarJobs.length,
        currency: 'INR'
      }
    });
  } catch (error) {
    console.error('Predict salary error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while predicting salary',
      error: error.message
    });
  }
};

module.exports = {
  getSalaryStats,
  getSalaryByExperience,
  getSalaryByCategory,
  getSalaryTrends,
  predictSalary
};