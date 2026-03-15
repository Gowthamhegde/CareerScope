const express = require('express');
const router = express.Router();
const {
  getSalaryStats,
  getSalaryByExperience,
  getSalaryByCategory,
  getSalaryTrends,
  predictSalary
} = require('../controllers/salaryController');

// GET /api/salary/stats - Get salary statistics
router.get('/stats', getSalaryStats);

// GET /api/salary/by-experience - Get salary breakdown by experience level
router.get('/by-experience', getSalaryByExperience);

// GET /api/salary/by-category - Get salary breakdown by category
router.get('/by-category', getSalaryByCategory);

// GET /api/salary/trends - Get salary trends over years
router.get('/trends', getSalaryTrends);

// POST /api/salary/predict - Predict salary based on user input
router.post('/predict', predictSalary);

module.exports = router;