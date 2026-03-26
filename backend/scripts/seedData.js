const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const Job = require('../models/Job');

const getSkills = (title) => {
  const t = title.toLowerCase();
  if (t.includes('data scientist') || t.includes('machine learning') || t.includes('ai engineer')) return ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow'];
  if (t.includes('data engineer')) return ['Python', 'SQL', 'Apache Spark', 'ETL', 'AWS'];
  if (t.includes('frontend')) return ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript'];
  if (t.includes('backend')) return ['Node.js', 'Python', 'APIs', 'Databases', 'Docker'];
  if (t.includes('full stack')) return ['JavaScript', 'React', 'Node.js', 'Databases', 'Git'];
  if (t.includes('devops') || t.includes('cloud') || t.includes('sre')) return ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'];
  if (t.includes('product manager')) return ['Strategy', 'Analytics', 'Roadmapping', 'Agile', 'SQL'];
  if (t.includes('data analyst')) return ['SQL', 'Excel', 'Tableau', 'Python', 'Statistics'];
  if (t.includes('security')) return ['Cybersecurity', 'Penetration Testing', 'Risk Assessment', 'SIEM'];
  if (t.includes('qa') || t.includes('test')) return ['Selenium', 'Test Automation', 'API Testing', 'JIRA'];
  if (t.includes('mobile')) return ['React Native', 'Swift', 'Kotlin', 'Flutter'];
  if (t.includes('designer')) return ['Figma', 'Adobe XD', 'Prototyping', 'User Research'];
  return ['JavaScript', 'Python', 'Git', 'APIs', 'Databases'];
};

const getCategory = (title) => {
  const t = title.toLowerCase();
  if (t.includes('data scientist') || t.includes('machine learning') || t.includes('ai') || t.includes('research scientist') || t.includes('analytics engineer')) return 'Data Science';
  if (t.includes('software engineer') || t.includes('developer') || t.includes('programmer')) return 'Software Engineering';
  if (t.includes('devops') || t.includes('cloud') || t.includes('sre') || t.includes('platform')) return 'DevOps & Cloud';
  if (t.includes('product manager')) return 'Product Management';
  if (t.includes('designer') || t.includes('ui') || t.includes('ux')) return 'Design';
  if (t.includes('security')) return 'Security';
  if (t.includes('qa') || t.includes('test') || t.includes('quality')) return 'Quality Assurance';
  if (t.includes('business analyst') || t.includes('data analyst')) return 'Business Analysis';
  if (t.includes('manager') || t.includes('director') || t.includes('lead') || t.includes('vp') || t.includes('cto')) return 'Management';
  return 'Technology';
};

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
  await Job.deleteMany({});
  console.log('Cleared existing data');

  const jobTitles = [
    'Data Scientist', 'Software Engineer', 'Product Manager', 'Data Engineer',
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Machine Learning Engineer', 'DevOps Engineer', 'Data Analyst',
    'Business Analyst', 'UI/UX Designer', 'Mobile Developer', 'Cloud Engineer',
    'Security Engineer', 'QA Engineer', 'Site Reliability Engineer', 'AI Engineer',
    'Analytics Engineer', 'Research Scientist', 'Technical Lead', 'Engineering Manager',
    'Senior Data Scientist', 'Junior Developer', 'Staff Engineer', 'Principal Engineer',
    'Platform Engineer', 'Senior Software Engineer', 'Senior Frontend Developer',
    'Senior Backend Developer'
  ];

  const expLevels = ['EN', 'MI', 'SE', 'EX'];
  const companySizes = ['S', 'M', 'L'];
  const remoteRatios = [0, 50, 100];
  const workYears = [2021, 2022, 2023, 2024];
  const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune'];

  const baseSalaries = {
    'Data Scientist': 1400000, 'Machine Learning Engineer': 1600000, 'AI Engineer': 1700000,
    'Research Scientist': 1800000, 'Analytics Engineer': 1300000, 'Data Engineer': 1200000,
    'Software Engineer': 1100000, 'Senior Software Engineer': 1800000, 'Staff Engineer': 3200000,
    'Principal Engineer': 3800000, 'Frontend Developer': 950000, 'Senior Frontend Developer': 1600000,
    'Backend Developer': 1050000, 'Senior Backend Developer': 1700000, 'Full Stack Developer': 1000000,
    'DevOps Engineer': 1300000, 'Cloud Engineer': 1400000, 'Site Reliability Engineer': 1500000,
    'Platform Engineer': 1400000, 'Product Manager': 1700000, 'Technical Lead': 2600000,
    'Engineering Manager': 3000000, 'Mobile Developer': 1100000, 'UI/UX Designer': 900000,
    'Security Engineer': 1400000, 'QA Engineer': 800000, 'Data Analyst': 750000,
    'Business Analyst': 850000, 'Junior Developer': 500000, 'Senior Data Scientist': 2200000
  };

  const expMult = { EN: 0.72, MI: 1.0, SE: 1.45, EX: 2.1 };
  const yearMult = { 2021: 0.80, 2022: 0.88, 2023: 0.95, 2024: 1.0 };

  const jobs = [];
  for (let i = 0; i < 2000; i++) {
    const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const expLevel = expLevels[Math.floor(Math.random() * expLevels.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const workYear = workYears[Math.floor(Math.random() * workYears.length)];
    const remoteRatio = remoteRatios[Math.floor(Math.random() * remoteRatios.length)];
    const companySize = companySizes[Math.floor(Math.random() * companySizes.length)];

    const base = baseSalaries[jobTitle] || 900000;
    const em = expMult[expLevel];
    const ym = yearMult[workYear];
    const rm = remoteRatio === 100 ? 1.07 : remoteRatio === 50 ? 1.03 : 1.0;
    const sm = companySize === 'L' ? 1.1 : companySize === 'S' ? 0.92 : 1.0;
    const noise = 0.82 + Math.random() * 0.36;

    const localSalary = Math.round(base * em * ym * rm * sm * noise);
    const salaryUSD = Math.round(localSalary / 83);

    jobs.push({
      jobTitle,
      salaryUSD,
      experienceLevel: expLevel,
      employmentType: 'FT',
      companySize,
      companyLocation: city,
      remoteRatio,
      workYear,
      employeeResidence: city,
      salaryInLocalCurrency: localSalary,
      localCurrency: 'INR',
      skills: getSkills(jobTitle),
      category: getCategory(jobTitle)
    });
  }

  await Job.insertMany(jobs);
  const count = await Job.countDocuments();
  const cats = await Job.distinct('category');
  const avg = await Job.aggregate([{ $group: { _id: null, avg: { $avg: '$salaryInLocalCurrency' } } }]);
  console.log(`✅ Seeded ${count} jobs across ${cats.length} categories`);
  console.log(`📊 Avg salary: ₹${Math.round(avg[0].avg).toLocaleString('en-IN')}`);
  console.log(`🏷️  Categories: ${cats.join(', ')}`);
  process.exit(0);
};

seed().catch(e => { console.error(e); process.exit(1); });
