const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Simple Job schema
const jobSchema = new mongoose.Schema({
  jobTitle: String,
  salaryUSD: Number,
  experienceLevel: String,
  employmentType: String,
  companySize: String,
  companyLocation: String,
  remoteRatio: Number,
  workYear: Number,
  employeeResidence: String,
  salaryInLocalCurrency: Number,
  localCurrency: String,
  skills: [String],
  category: String
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

const getSkills = (title) => {
  const t = title.toLowerCase();
  if (t.includes('data scientist')) return ['Python', 'Machine Learning', 'Statistics', 'SQL'];
  if (t.includes('data analyst')) return ['SQL', 'Excel', 'Tableau', 'Python'];
  if (t.includes('frontend')) return ['JavaScript', 'React', 'HTML', 'CSS'];
  if (t.includes('backend')) return ['Node.js', 'Python', 'APIs', 'Databases'];
  if (t.includes('devops')) return ['Docker', 'Kubernetes', 'AWS', 'CI/CD'];
  if (t.includes('mobile')) return ['React Native', 'Swift', 'Kotlin'];
  if (t.includes('designer')) return ['Figma', 'Adobe XD', 'Prototyping'];
  if (t.includes('qa')) return ['Selenium', 'Test Automation', 'API Testing'];
  return ['Programming', 'Problem Solving'];
};

const getCategory = (title) => {
  const t = title.toLowerCase();
  if (t.includes('data scientist') || t.includes('machine learning')) return 'Data Science';
  if (t.includes('developer') || t.includes('engineer')) return 'Software Engineering';
  if (t.includes('devops') || t.includes('cloud')) return 'DevOps & Cloud';
  if (t.includes('designer')) return 'Design';
  if (t.includes('analyst')) return 'Business Analysis';
  if (t.includes('qa') || t.includes('test')) return 'Quality Assurance';
  return 'Technology';
};

async function importData() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🧹 Clearing existing data...');
    await Job.deleteMany({});

    const csvPath = path.join(__dirname, '../../indian_salary_data.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.error('❌ File not found: indian_salary_data.csv');
      process.exit(1);
    }

    console.log('📖 Reading CSV file...');
    const jobs = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          jobs.push({
            jobTitle: row.job_title,
            salaryUSD: parseInt(row.salary_in_usd),
            experienceLevel: row.experience_level,
            employmentType: row.employment_type,
            companySize: row.company_size,
            companyLocation: row.company_location,
            remoteRatio: parseInt(row.remote_ratio),
            workYear: parseInt(row.work_year),
            employeeResidence: row.employee_residence,
            salaryInLocalCurrency: parseInt(row.salary),
            localCurrency: row.salary_currency,
            skills: getSkills(row.job_title),
            category: getCategory(row.job_title)
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`📊 Importing ${jobs.length} jobs...`);
    await Job.insertMany(jobs);

    const count = await Job.countDocuments();
    const categories = await Job.distinct('category');
    const avgSalary = await Job.aggregate([
      { $group: { _id: null, avg: { $avg: '$salaryInLocalCurrency' } } }
    ]);

    console.log('\n✅ Import Complete!');
    console.log(`📈 Total Jobs: ${count}`);
    console.log(`🏷️  Categories: ${categories.join(', ')}`);
    console.log(`💰 Average Salary: ₹${Math.round(avgSalary[0].avg).toLocaleString('en-IN')}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importData();
