const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  getCategories,
  getJobTitles,
  getStats
} = require('../controllers/jobController');

// GET /api/jobs - Get all jobs with filtering and pagination
router.get('/', getJobs);

// GET /api/jobs/stats - Get job statistics
router.get('/stats', getStats);

// GET /api/jobs/categories - Get all job categories
router.get('/categories', getCategories);

// GET /api/jobs/titles - Get all job titles for autocomplete
router.get('/titles', getJobTitles);

// GET /api/jobs/:id - Get single job by ID
router.get('/:id', getJobById);

module.exports = router;