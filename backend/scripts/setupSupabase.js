const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupSupabase() {
  console.log('🚀 Supabase Migration Setup\n');
  console.log('This script will help you migrate from MongoDB to Supabase.\n');

  try {
    // Step 1: Get Supabase credentials
    console.log('📝 Step 1: Supabase Credentials');
    console.log('Get these from: https://supabase.com/dashboard/project/_/settings/api\n');
    
    const supabaseUrl = await question('Enter your Supabase Project URL: ');
    const supabaseKey = await question('Enter your Supabase Anon Key: ');

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Both URL and Key are required!');
      process.exit(1);
    }

    // Step 2: Update .env file
    console.log('\n📝 Step 2: Updating .env file...');
    const envPath = path.join(__dirname, '../.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Remove existing Supabase config if present
    envContent = envContent.replace(/\n# Supabase Configuration[\s\S]*?SUPABASE_ANON_KEY=.*\n?/g, '');
    
    // Add new Supabase config
    envContent += `\n# Supabase Configuration\nSUPABASE_URL=${supabaseUrl}\nSUPABASE_ANON_KEY=${supabaseKey}\n`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Environment variables updated');

    // Step 3: Install dependencies
    console.log('\n📦 Step 3: Installing @supabase/supabase-js...');
    try {
      execSync('npm install @supabase/supabase-js', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit'
      });
      console.log('✅ Dependencies installed');
    } catch (error) {
      console.error('❌ Failed to install dependencies');
      throw error;
    }

    // Step 4: Read SQL files
    console.log('\n📝 Step 4: Database Schema Setup');
    console.log('\nYou need to run these SQL scripts in your Supabase SQL Editor:');
    console.log('1. Go to: https://supabase.com/dashboard/project/_/sql');
    console.log('2. Create a new query');
    console.log('3. Copy and run the following files:\n');
    
    const schemaPath = path.join(__dirname, '../supabase-schema.sql');
    const functionsPath = path.join(__dirname, '../supabase-functions.sql');
    
    console.log(`   - ${schemaPath}`);
    console.log(`   - ${functionsPath}\n`);

    const proceed = await question('Have you run both SQL files in Supabase? (yes/no): ');
    
    if (proceed.toLowerCase() !== 'yes' && proceed.toLowerCase() !== 'y') {
      console.log('\n⚠️  Please run the SQL files first, then run this script again.');
      console.log('Or continue with: node scripts/migrateToSupabase.js');
      process.exit(0);
    }

    // Step 5: Run migration
    console.log('\n🔄 Step 5: Migrating data from MongoDB to Supabase...');
    const migrate = await question('Start migration now? (yes/no): ');
    
    if (migrate.toLowerCase() === 'yes' || migrate.toLowerCase() === 'y') {
      console.log('\n');
      execSync('node scripts/migrateToSupabase.js', {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit'
      });
    } else {
      console.log('\n✅ Setup complete! Run migration manually with:');
      console.log('   node scripts/migrateToSupabase.js');
    }

    rl.close();

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    rl.close();
    process.exit(1);
  }
}

setupSupabase();
