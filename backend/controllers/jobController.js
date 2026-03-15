const Job = require('../models/Job');

// Get all jobs with filtering, pagination, and search
const getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      experienceLevel,
      companySize,
      remoteRatio,
      category,
      sortBy = 'salaryUSD',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (search) {
      filter.jobTitle = { $regex: search, $options: 'i' };
    }
    
    if (experienceLevel) {
      filter.experienceLevel = { $in: experienceLevel.split(',') };
    }
    
    if (companySize) {
      filter.companySize = { $in: companySize.split(',') };
    }
    
    if (remoteRatio !== undefined) {
      filter.remoteRatio = parseInt(remoteRatio);
    }
    
    if (category) {
      filter.category = { $in: category.split(',') };
    }

    if (req.query.companyLocation) {
      filter.companyLocation = { $in: req.query.companyLocation.split(',') };
    }

    // Build sort object
    const sortOrder = order === 'desc' ? -1 : 1;
    const sort = { [sortBy]: sortOrder };

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [jobs, totalJobs] = await Promise.all([
      Job.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Job.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalJobs / parseInt(limit));

    res.json({
      success: true,
      data: jobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalJobs,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching jobs',
      error: error.message
    });
  }
};

// Get single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).lean();
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Get similar jobs (same category, similar experience level)
    const similarJobs = await Job.find({
      _id: { $ne: job._id },
      category: job.category,
      experienceLevel: job.experienceLevel
    })
    .sort({ salaryUSD: -1 })
    .limit(6)
    .lean();

    res.json({
      success: true,
      data: {
        job,
        similarJobs
      }
    });
  } catch (error) {
    console.error('Get job by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching job',
      error: error.message
    });
  }
};

// Get all job categories with counts
const getCategories = async (req, res) => {
  try {
    const categories = await Job.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgSalary: { $avg: '$salaryUSD' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          avgSalary: { $round: ['$avgSalary', 0] },
          _id: 0
        }
      }
    ]);

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
      error: error.message
    });
  }
};

// Get all unique job titles for autocomplete
const getJobTitles = async (req, res) => {
  try {
    const titles = await Job.distinct('jobTitle');
    
    res.json({
      success: true,
      data: titles.sort()
    });
  } catch (error) {
    console.error('Get job titles error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching job titles',
      error: error.message
    });
  }
};

module.exports = {
  getJobs,
  getJobById,
  getCategories,
  getJobTitles
};