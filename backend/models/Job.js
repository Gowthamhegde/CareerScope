const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  salaryUSD: {
    type: Number,
    required: true,
    min: 0
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['EN', 'MI', 'SE', 'EX'], // Entry, Mid, Senior, Executive
    default: 'EN'
  },
  employmentType: {
    type: String,
    required: true,
    enum: ['FT', 'PT', 'CT', 'FL'], // Full-time, Part-time, Contract, Freelance
    default: 'FT'
  },
  companySize: {
    type: String,
    required: true,
    enum: ['S', 'M', 'L'], // Small, Medium, Large
    default: 'M'
  },
  companyLocation: {
    type: String,
    required: true,
    trim: true
  },
  remoteRatio: {
    type: Number,
    required: true,
    enum: [0, 50, 100], // 0 = On-site, 50 = Hybrid, 100 = Remote
    default: 0
  },
  workYear: {
    type: Number,
    required: true,
    min: 2020,
    max: 2024
  },
  employeeResidence: {
    type: String,
    required: true,
    trim: true
  },
  salaryInLocalCurrency: {
    type: Number,
    required: true,
    min: 0
  },
  localCurrency: {
    type: String,
    required: true,
    trim: true,
    default: 'USD'
  },
  skills: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
jobSchema.index({ jobTitle: 1 });
jobSchema.index({ salaryUSD: -1 });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ workYear: 1 });
jobSchema.index({ companyLocation: 1 });

module.exports = mongoose.model('Job', jobSchema);