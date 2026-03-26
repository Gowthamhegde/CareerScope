const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Job = require('../models/Job');

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

async function verifyData() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI not found in environment variables!');
      console.error('   Make sure backend/.env file exists with MONGO_URI');
      process.exit(1);
    }
    
    console.log(`Connection string: ${process.env.MONGO_URI.replace(/:[^:@]+@/, ':****@')}`);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected successfully!\n');

    // List all databases
    const admin = mongoose.connection.db.admin();
    const { databases } = await admin.listDatabases();
    console.log('📚 Available databases:');
    databases.forEach(db => {
      console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });

    // Check current database
    const currentDb = mongoose.connection.db.databaseName;
    console.log(`\n🎯 Current database: ${currentDb}`);

    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`\n📦 Collections in ${currentDb}:`);
    if (collections.length === 0) {
      console.log('   ⚠️  No collections found!');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }

    // Count jobs
    const jobCount = await Job.countDocuments();
    console.log(`\n💼 Total jobs in 'jobs' collection: ${jobCount}`);

    if (jobCount > 0) {
      // Get sample data
      const sampleJobs = await Job.find().limit(3);
      console.log('\n📋 Sample jobs:');
      sampleJobs.forEach((job, i) => {
        console.log(`\n   ${i + 1}. ${job.jobTitle}`);
        console.log(`      Salary: ₹${job.salaryInLocalCurrency.toLocaleString('en-IN')} (${job.localCurrency})`);
        console.log(`      Experience: ${job.experienceLevel}, Location: ${job.companyLocation}`);
      });

      // Get statistics
      const stats = await Job.aggregate([
        {
          $group: {
            _id: null,
            avgSalary: { $avg: '$salaryInLocalCurrency' },
            minSalary: { $min: '$salaryInLocalCurrency' },
            maxSalary: { $max: '$salaryInLocalCurrency' }
          }
        }
      ]);

      if (stats.length > 0) {
        console.log('\n📊 Salary Statistics:');
        console.log(`   Average: ₹${Math.round(stats[0].avgSalary).toLocaleString('en-IN')}`);
        console.log(`   Min: ₹${stats[0].minSalary.toLocaleString('en-IN')}`);
        console.log(`   Max: ₹${stats[0].maxSalary.toLocaleString('en-IN')}`);
      }

      // Get categories
      const categories = await Job.distinct('category');
      console.log(`\n🏷️  Categories (${categories.length}): ${categories.join(', ')}`);
    } else {
      console.log('\n⚠️  No jobs found in database!');
      console.log('   Run: npm run quick-import');
    }

    await mongoose.connection.close();
    console.log('\n✅ Verification complete!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

verifyData();
