const Job = require('../models/Job');

// Get salary statistics
const getSalaryStats = async (req, res) => {
  try {
    const { jobTitle, experienceLevel, year } = req.query;
    
    // Build filter
    const filter = {};
    if (jobTitle) {
      filter.jobTitle = { $regex: jobTitle, $options: 'i' };
    }
    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }
    if (year) {
      filter.workYear = parseInt(year);
    }

    const stats = await Job.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          avgSalary: { $avg: '$salaryUSD' },
          minSalary: { $min: '$salaryUSD' },
          maxSalary: { $max: '$salaryUSD' },
          totalJobs: { $sum: 1 },
          salaries: { $push: '$salaryUSD' }
        }
      },
      {
        $project: {
          avgSalary: { $round: ['$avgSalary', 0] },
          minSalary: 1,
          maxSalary: 1,
          totalJobs: 1,
          salaries: 1
        }
      }
    ]);

    if (!stats.length) {
      return res.json({
        success: true,
        data: {
          avgSalary: 0,
          medianSalary: 0,
          minSalary: 0,
          maxSalary: 0,
          totalJobs: 0
        }
      });
    }

    // Calculate median
    const salaries = stats[0].salaries.sort((a, b) => a - b);
    const medianIndex = Math.floor(salaries.length / 2);
    const medianSalary = salaries.length % 2 === 0
      ? Math.round((salaries[medianIndex - 1] + salaries[medianIndex]) / 2)
      : salaries[medianIndex];

    res.json({
      success: true,
      data: {
        avgSalary: stats[0].avgSalary,
        medianSalary,
        minSalary: stats[0].minSalary,
        maxSalary: stats[0].maxSalary,
        totalJobs: stats[0].totalJobs
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
    const experienceLevels = {
      'EN': 'Entry',
      'MI': 'Mid',
      'SE': 'Senior',
      'EX': 'Executive'
    };

    const salaryByExp = await Job.aggregate([
      {
        $group: {
          _id: '$experienceLevel',
          avgSalary: { $avg: '$salaryInLocalCurrency' }, // Use local currency (INR)
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          level: { $ifNull: [{ $arrayElemAt: [Object.values(experienceLevels), { $indexOfArray: [Object.keys(experienceLevels), '$_id'] }] }, '$_id'] },
          avgSalary: { $round: ['$avgSalary', 0] },
          count: 1,
          _id: 0
        }
      },
      {
        $sort: { avgSalary: 1 }
      }
    ]);

    res.json({
      success: true,
      data: salaryByExp
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
    const salaryByCategory = await Job.aggregate([
      {
        $group: {
          _id: '$category',
          avgSalary: { $avg: '$salaryInLocalCurrency' }, // Use local currency (INR)
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: '$_id',
          avgSalary: { $round: ['$avgSalary', 0] },
          count: 1,
          _id: 0
        }
      },
      {
        $sort: { avgSalary: -1 }
      }
    ]);

    res.json({
      success: true,
      data: salaryByCategory
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
    const trends = await Job.aggregate([
      {
        $group: {
          _id: '$workYear',
          avgSalary: { $avg: '$salaryInLocalCurrency' }, // Use local currency (INR)
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          year: '$_id',
          avgSalary: { $round: ['$avgSalary', 0] },
          count: 1,
          _id: 0
        }
      },
      {
        $sort: { year: 1 }
      }
    ]);

    res.json({
      success: true,
      data: trends
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

    // Find similar jobs
    const similarJobs = await Job.find({
      $or: [
        { jobTitle: { $regex: jobTitle, $options: 'i' } },
        { skills: { $in: skills } }
      ]
    }).lean();

    if (similarJobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No similar jobs found for prediction'
      });
    }

    // Calculate base salary from similar jobs using INR (salaryInLocalCurrency)
    const salaries = similarJobs.map(job => job.salaryInLocalCurrency || job.salaryUSD * 83);
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