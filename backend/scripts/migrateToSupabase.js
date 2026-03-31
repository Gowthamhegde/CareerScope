const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const Job = require('../models/Job');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function migrateToSupabase() {
  try {
    console.log('🔄 Starting migration from MongoDB to Supabase...\n');

    // Initialize Supabase client directly
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials in .env file');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Fetch all jobs from MongoDB
    console.log('📥 Fetching jobs from MongoDB...');
    const jobs = await Job.find({}).lean();
    console.log(`✅ Found ${jobs.length} jobs\n`);

    if (jobs.length === 0) {
      console.log('⚠️  No jobs to migrate!');
      process.exit(0);
    }

    // Transform data for Supabase
    console.log('🔄 Transforming data for Supabase...');
    const supabaseJobs = jobs.map(job => ({
      job_title: job.jobTitle,
      salary_usd: job.salaryUSD,
      experience_level: job.experienceLevel,
      employment_type: job.employmentType,
      company_size: job.companySize,
      company_location: job.companyLocation,
      remote_ratio: job.remoteRatio,
      work_year: job.workYear,
      employee_residence: job.employeeResidence,
      salary_local: job.salaryInLocalCurrency,
      local_currency: job.localCurrency,
      skills: job.skills || [],
      category: job.category
    }));

    // Test connection first
    console.log('🔍 Testing Supabase connection...');
    const { error: testError } = await supabase
      .from('jobs')
      .select('id')
      .limit(1);

    if (testError) {
      console.error('❌ Cannot connect to Supabase table:', testError.message);
      console.log('\n📝 Please ensure you have:');
      console.log('   1. Created the table using supabase-schema.sql');
      console.log('   2. Run the functions using supabase-functions.sql');
      console.log('   3. Enabled RLS policies for public access\n');
      throw testError;
    }
    console.log('✅ Connection successful\n');

    // Clear existing data in Supabase (optional)
    console.log('🧹 Clearing existing Supabase data...');
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .gte('id', 0); // Delete all rows

    if (deleteError && deleteError.code !== 'PGRST116') {
      console.log('⚠️  Could not clear existing data:', deleteError.message);
    } else {
      console.log('✅ Existing data cleared\n');
    }

    // Insert data in batches (Supabase has limits)
    console.log('📤 Inserting data into Supabase...');
    const batchSize = 100;
    let inserted = 0;
    let errors = 0;

    for (let i = 0; i < supabaseJobs.length; i += batchSize) {
      const batch = supabaseJobs.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('jobs')
        .insert(batch)
        .select();

      if (error) {
        console.error(`❌ Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error.message);
        errors++;
        
        // Try inserting one by one if batch fails
        console.log('   Trying individual inserts...');
        for (const job of batch) {
          const { error: singleError } = await supabase
            .from('jobs')
            .insert([job]);
          
          if (!singleError) {
            inserted++;
          } else {
            console.error(`   Failed to insert: ${job.job_title}`);
          }
        }
      } else {
        inserted += batch.length;
        console.log(`   Inserted ${inserted}/${supabaseJobs.length} jobs...`);
      }
    }

    console.log('\n✅ Migration completed!');
    console.log(`📊 Successfully migrated: ${inserted} jobs`);
    if (errors > 0) {
      console.log(`⚠️  Errors encountered: ${errors} batches`);
    }

    // Verify data
    const { count, error: countError } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`✅ Verified: ${count} jobs in Supabase\n`);
    }

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

migrateToSupabase();
