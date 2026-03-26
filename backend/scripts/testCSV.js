const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const csvPath = path.join(__dirname, '../../indian_salary_data.csv');

console.log('📖 Testing CSV file reading...\n');
console.log(`File path: ${csvPath}`);
console.log(`File exists: ${fs.existsSync(csvPath)}\n`);

if (!fs.existsSync(csvPath)) {
  console.error('❌ File not found!');
  process.exit(1);
}

const jobs = [];
let rowCount = 0;

fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', (row) => {
    rowCount++;
    if (rowCount <= 5) {
      console.log(`Row ${rowCount}:`, row);
    }
    jobs.push(row);
  })
  .on('end', () => {
    console.log(`\n✅ Successfully read ${jobs.length} rows`);
    console.log('\nSample data:');
    console.log('- Job Titles:', [...new Set(jobs.slice(0, 10).map(j => j.job_title))]);
    console.log('- Experience Levels:', [...new Set(jobs.map(j => j.experience_level))]);
    console.log('- Company Sizes:', [...new Set(jobs.map(j => j.company_size))]);
    console.log('- Currencies:', [...new Set(jobs.map(j => j.salary_currency))]);
    
    const avgSalary = jobs.reduce((sum, j) => sum + parseInt(j.salary || 0), 0) / jobs.length;
    console.log(`\n💰 Average Salary: ₹${Math.round(avgSalary).toLocaleString('en-IN')}`);
  })
  .on('error', (error) => {
    console.error('❌ Error reading CSV:', error.message);
    process.exit(1);
  });
