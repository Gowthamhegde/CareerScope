const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const XLSX = require('xlsx');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../models/Job');

// Load environment variables
dotenv.config();

// Function to read Excel file and convert to JSON
const readExcelFile = (filePath) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData;
  } catch (error) {
    console.error('Error reading Excel file:', error.message);
    return null;
  }
};

// Function to read CSV file
const readCSVFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected for data import');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Skill mapping based on job titles
const getSkillsFromJobTitle = (jobTitle) => {
  const title = jobTitle.toLowerCase();
  const skillsMap = {
    'data scientist': ['Python', 'Machine Learning', 'Statistics', 'SQL', 'R'],
    'data engineer': ['Python', 'SQL', 'Apache Spark', 'ETL', 'AWS'],
    'machine learning engineer': ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Docker'],
    'software engineer': ['JavaScript', 'Python', 'Git', 'APIs', 'Databases'],
    'frontend developer': ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript'],
    'backend developer': ['Node.js', 'Python', 'APIs', 'Databases', 'Docker'],
    'full stack developer': ['JavaScript', 'React', 'Node.js', 'Databases', 'Git'],
    'devops engineer': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
    'product manager': ['Strategy', 'Analytics', 'Roadmapping', 'Stakeholder Management'],
    'data analyst': ['SQL', 'Excel', 'Tableau', 'Python', 'Statistics'],
    'business analyst': ['SQL', 'Excel', 'Requirements Analysis', 'Process Improvement'],
    'ui/ux designer': ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    'mobile developer': ['React Native', 'Swift', 'Kotlin', 'Mobile UI/UX'],
    'cloud engineer': ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes'],
    'security engineer': ['Cybersecurity', 'Penetration Testing', 'Risk Assessment'],
    'qa engineer': ['Test Automation', 'Selenium', 'API Testing', 'Bug Tracking']
  };

  // Find matching skills
  for (const [key, skills] of Object.entries(skillsMap)) {
    if (title.includes(key)) {
      return skills;
    }
  }

  // Default skills based on common keywords
  const defaultSkills = [];
  if (title.includes('python')) defaultSkills.push('Python');
  if (title.includes('javascript') || title.includes('js')) defaultSkills.push('JavaScript');
  if (title.includes('react')) defaultSkills.push('React');
  if (title.includes('node')) defaultSkills.push('Node.js');
  if (title.includes('sql')) defaultSkills.push('SQL');
  if (title.includes('aws')) defaultSkills.push('AWS');
  if (title.includes('docker')) defaultSkills.push('Docker');
  if (title.includes('kubernetes')) defaultSkills.push('Kubernetes');

  return defaultSkills.length > 0 ? defaultSkills : ['General'];
};

// Category mapping based on job titles
const getCategoryFromJobTitle = (jobTitle) => {
  const title = jobTitle.toLowerCase();
  
  if (title.includes('data scientist') || title.includes('data analyst') || title.includes('machine learning')) {
    return 'Data Science';
  }
  if (title.includes('software engineer') || title.includes('developer') || title.includes('programmer')) {
    return 'Software Engineering';
  }
  if (title.includes('devops') || title.includes('cloud') || title.includes('infrastructure')) {
    return 'DevOps & Cloud';
  }
  if (title.includes('product manager') || title.includes('project manager')) {
    return 'Product Management';
  }
  if (title.includes('designer') || title.includes('ui') || title.includes('ux')) {
    return 'Design';
  }
  if (title.includes('security') || title.includes('cybersecurity')) {
    return 'Security';
  }
  if (title.includes('qa') || title.includes('test') || title.includes('quality')) {
    return 'Quality Assurance';
  }
  if (title.includes('business analyst') || title.includes('analyst')) {
    return 'Business Analysis';
  }
  if (title.includes('manager') || title.includes('director') || title.includes('lead')) {
    return 'Management';
  }
  
  return 'Technology';
};

// Map experience level codes
const mapExperienceLevel = (level) => {
  const mapping = {
    'EN': 'EN', 'Entry': 'EN', 'Junior': 'EN', 'Entry-level': 'EN',
    'MI': 'MI', 'Mid': 'MI', 'Mid-level': 'MI', 'Intermediate': 'MI',
    'SE': 'SE', 'Senior': 'SE', 'Senior-level': 'SE',
    'EX': 'EX', 'Executive': 'EX', 'Expert': 'EX', 'Director': 'EX'
  };
  return mapping[level] || 'EN';
};

// Map employment type codes
const mapEmploymentType = (type) => {
  const mapping = {
    'FT': 'FT', 'Full-time': 'FT', 'Full Time': 'FT',
    'PT': 'PT', 'Part-time': 'PT', 'Part Time': 'PT',
    'CT': 'CT', 'Contract': 'CT', 'Contractor': 'CT',
    'FL': 'FL', 'Freelance': 'FL', 'Freelancer': 'FL'
  };
  return mapping[type] || 'FT';
};

// Map company size codes
const mapCompanySize = (size) => {
  const mapping = {
    'S': 'S', 'Small': 'S', 'Startup': 'S',
    'M': 'M', 'Medium': 'M', 'Mid-size': 'M',
    'L': 'L', 'Large': 'L', 'Enterprise': 'L'
  };
  return mapping[size] || 'M';
};

// Generate sample data if CSV is not readable
const generateSampleData = () => {
  const jobTitles = [
    'Data Scientist', 'Software Engineer', 'Product Manager', 'Data Engineer',
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Machine Learning Engineer', 'DevOps Engineer', 'Data Analyst',
    'Business Analyst', 'UI/UX Designer', 'Mobile Developer',
    'Cloud Engineer', 'Security Engineer', 'QA Engineer', 'Site Reliability Engineer',
    'Platform Engineer', 'AI Engineer', 'Analytics Engineer', 'Research Scientist',
    'Technical Lead', 'Engineering Manager', 'VP of Engineering', 'CTO',
    'Principal Engineer', 'Staff Engineer', 'Senior Data Scientist',
    'Junior Developer', 'Intern Software Engineer', 'Graduate Data Analyst'
  ];

  const experienceLevels = ['EN', 'MI', 'SE', 'EX'];
  const employmentTypes = ['FT', 'PT', 'CT', 'FL'];
  const companySizes = ['S', 'M', 'L'];
  const remoteRatios = [0, 50, 100];
  const workYears = [2020, 2021, 2022, 2023, 2024];
  const locations = [
    { country: 'India', currency: 'INR' },
    { country: 'United States', currency: 'USD' },
    { country: 'Canada', currency: 'CAD' },
    { country: 'United Kingdom', currency: 'GBP' },
    { country: 'Germany', currency: 'EUR' },
    { country: 'Australia', currency: 'AUD' },
    { country: 'Singapore', currency: 'SGD' },
    { country: 'Netherlands', currency: 'EUR' },
  ];

  const sampleData = [];

  // Generate more realistic data - 2000 records (80% Indian market)
  for (let i = 0; i < 2000; i++) {
    const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const experienceLevel = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
    // 80% Indian market, 20% international
    const location = i < 1600 ? locations[0] : locations[Math.floor(Math.random() * locations.length)];
    const workYear = workYears[Math.floor(Math.random() * workYears.length)];
    const remoteRatio = remoteRatios[Math.floor(Math.random() * remoteRatios.length)];
    
    // Generate salary based on experience level, job title, and location
    let baseSalary = location.currency === 'INR' ? 600000 : 60000; // Base in INR or USD
    
    // Job title multipliers
    if (jobTitle.includes('Data Scientist') || jobTitle.includes('Machine Learning')) {
      baseSalary = location.currency === 'INR' ? 1200000 : 95000;
    }
    if (jobTitle.includes('AI Engineer') || jobTitle.includes('Research Scientist')) {
      baseSalary = location.currency === 'INR' ? 1500000 : 110000;
    }
    if (jobTitle.includes('Product Manager')) {
      baseSalary = location.currency === 'INR' ? 1400000 : 105000;
    }
    if (jobTitle.includes('Engineering Manager') || jobTitle.includes('Technical Lead')) {
      baseSalary = location.currency === 'INR' ? 2500000 : 130000;
    }
    if (jobTitle.includes('VP') || jobTitle.includes('CTO')) {
      baseSalary = location.currency === 'INR' ? 6000000 : 200000;
    }
    if (jobTitle.includes('Principal') || jobTitle.includes('Staff')) {
      baseSalary = location.currency === 'INR' ? 3500000 : 150000;
    }
    if (jobTitle.includes('Senior')) {
      baseSalary = location.currency === 'INR' ? Math.max(baseSalary * 1.3, 1000000) : Math.max(baseSalary * 1.3, 90000);
    }
    if (jobTitle.includes('Junior') || jobTitle.includes('Intern') || jobTitle.includes('Graduate')) {
      baseSalary = location.currency === 'INR' ? Math.max(baseSalary * 0.7, 400000) : Math.max(baseSalary * 0.7, 45000);
    }
    
    // Experience level multipliers
    const expMultiplier = { 'EN': 0.8, 'MI': 1.1, 'SE': 1.4, 'EX': 2.0 }[experienceLevel];
    baseSalary *= expMultiplier;
    
    // Year-over-year growth
    const yearMultiplier = { 2020: 0.75, 2021: 0.85, 2022: 0.92, 2023: 0.98, 2024: 1.0 }[workYear];
    baseSalary *= yearMultiplier;
    
    // Remote work premium
    if (remoteRatio === 100) baseSalary *= 1.05;
    if (remoteRatio === 50) baseSalary *= 1.02;
    
    // Add some randomness
    baseSalary *= (0.85 + Math.random() * 0.3);
    
    const localSalary = Math.round(baseSalary);
    
    // Convert to USD for comparison
    const currencyRates = {
      'INR': 83, // 1 USD = 83 INR
      'USD': 1,
      'CAD': 1.35,
      'GBP': 0.79,
      'EUR': 0.92,
      'AUD': 1.52,
      'SGD': 1.35,
    };
    
    const salaryUSD = location.currency === 'INR' ? 
      Math.round(localSalary / currencyRates[location.currency]) : 
      Math.round(localSalary * currencyRates[location.currency]);
    
    sampleData.push({
      jobTitle,
      salaryUSD,
      experienceLevel,
      employmentType: employmentTypes[Math.floor(Math.random() * employmentTypes.length)],
      companySize: companySizes[Math.floor(Math.random() * companySizes.length)],
      companyLocation: location.country,
      remoteRatio,
      workYear,
      employeeResidence: location.country,
      salaryInLocalCurrency: localSalary,
      localCurrency: location.currency,
      skills: getSkillsFromJobTitle(jobTitle),
      category: getCategoryFromJobTitle(jobTitle)
    });
  }

  return sampleData;
};

// Main import function
const importData = async () => {
  try {
    await connectDB();
    
    console.log('🧹 Clearing existing data...');
    await Job.deleteMany({});
    
    // Prioritize indian_salary_data.csv
    const csvPath = path.join(__dirname, '../../indian_salary_data.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.log('⚠️  indian_salary_data.csv not found, generating sample data...');
      const sampleData = generateSampleData();
      await Job.insertMany(sampleData);
      console.log('✅ Sample data imported successfully!');
      await printSummary();
      process.exit(0);
      return;
    }
    
    console.log(`📖 Reading file: indian_salary_data.csv`);
    const data = await readCSVFile(csvPath);
    
    if (!data || data.length === 0) {
      console.log('⚠️  No data found in CSV, generating sample data...');
      const sampleData = generateSampleData();
      await Job.insertMany(sampleData);
      console.log('✅ Sample data imported successfully!');
      await printSummary();
      process.exit(0);
      return;
    }
    
    console.log(`📊 Processing ${data.length} records from indian_salary_data.csv...`);
    
    const jobs = [];
    let processedCount = 0;
    
    for (const row of data) {
      try {
        processedCount++;
        
        // Parse the CSV row - exact column names from indian_salary_data.csv
        const job = {
          jobTitle: row['job_title'] || 'Unknown',
          salaryUSD: parseInt(row['salary_in_usd']) || 0,
          experienceLevel: mapExperienceLevel(row['experience_level'] || 'EN'),
          employmentType: mapEmploymentType(row['employment_type'] || 'FT'),
          companySize: mapCompanySize(row['company_size'] || 'M'),
          companyLocation: row['company_location'] || 'IN',
          remoteRatio: parseInt(row['remote_ratio']) || 0,
          workYear: parseInt(row['work_year']) || 2024,
          employeeResidence: row['employee_residence'] || 'IN',
          salaryInLocalCurrency: parseInt(row['salary']) || 0,
          localCurrency: row['salary_currency'] || 'INR'
        };
        
        // Derive skills and category
        job.skills = getSkillsFromJobTitle(job.jobTitle);
        job.category = getCategoryFromJobTitle(job.jobTitle);
        
        jobs.push(job);
        
        if (processedCount % 100 === 0) {
          console.log(`📊 Processed ${processedCount} rows...`);
        }
      } catch (error) {
        console.error(`❌ Error processing row ${processedCount}:`, error.message);
      }
    }
    
    if (jobs.length === 0) {
      console.log('⚠️  No valid data processed, generating sample data...');
      const sampleData = generateSampleData();
      await Job.insertMany(sampleData);
      console.log('✅ Sample data imported successfully!');
    } else {
      console.log(`📊 Importing ${jobs.length} records to database...`);
      await Job.insertMany(jobs, { ordered: false });
      console.log('✅ Data imported successfully!');
    }
    
    await printSummary();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Import script error:', error.message);
    process.exit(1);
  }
};

// Helper function to print summary
const printSummary = async () => {
  const totalJobs = await Job.countDocuments();
  const categories = await Job.distinct('category');
  const avgSalaryResult = await Job.aggregate([
    { $group: { _id: null, avgUSD: { $avg: '$salaryUSD' }, avgLocal: { $avg: '$salaryInLocalCurrency' } } }
  ]);
  
  console.log('\n📈 Import Summary:');
  console.log(`   Total Jobs: ${totalJobs}`);
  console.log(`   Categories: ${categories.length}`);
  if (avgSalaryResult[0]) {
    console.log(`   Average Salary (USD): $${Math.round(avgSalaryResult[0].avgUSD).toLocaleString()}`);
    console.log(`   Average Salary (INR): ₹${Math.round(avgSalaryResult[0].avgLocal).toLocaleString('en-IN')}`);
  }
  console.log(`   Categories: ${categories.join(', ')}`);
};

// Run the import
importData();