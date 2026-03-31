const SupabaseJob = require('../models/SupabaseJob');

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
      sortBy = 'salary_usd',
      order = 'desc',
      companyLocation
    } = req.query;

    // Build filters
    const filters = {};
    
    if (search) {
      filters.job_title = search;
    }
    
    if (experienceLevel) {
      filters.experience_level = experienceLevel;
    }
    
    if (category) {
      filters.category = category;
    }

    if (companyLocation) {
      filters.company_location = companyLocation;
    }

    const result = await SupabaseJob.findAll({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder: order,
      filters
    });

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination
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
    const job = await SupabaseJob.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Get similar jobs (same category, similar experience level)
    const { data: similarJobs } = await SupabaseJob.findAll({
      limit: 6,
      filters: {
        category: job.category,
        experience_level: job.experience_level
      }
    });

    res.json({
      success: true,
      data: {
        job,
        similarJobs: similarJobs.filter(j => j.id !== job.id)
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
    const categories = await SupabaseJob.getDistinctValues('category');
    
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
    const titles = await SupabaseJob.getDistinctValues('job_title');
    
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

// Get job statistics
const getStats = async (req, res) => {
  try {
    const stats = await SupabaseJob.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching stats',
      error: error.message
    });
  }
};

module.exports = {
  getJobs,
  getJobById,
  getCategories,
  getJobTitles,
  getStats
};