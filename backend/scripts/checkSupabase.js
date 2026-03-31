const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function checkSupabase() {
  console.log('🔍 Checking Supabase Setup...\n');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  // Check credentials
  console.log('1. Checking credentials...');
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    console.log('\nPlease add to backend/.env:');
    console.log('SUPABASE_URL=your_url');
    console.log('SUPABASE_ANON_KEY=your_key\n');
    process.exit(1);
  }
  console.log('✅ Credentials found');
  console.log(`   URL: ${supabaseUrl}`);
  console.log(`   Key: ${supabaseKey.substring(0, 20)}...\n`);

  // Create client
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Check connection
  console.log('2. Testing connection...');
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('count', { count: 'exact', head: true });

    if (error) {
      if (error.code === 'PGRST205') {
        console.log('❌ Table "jobs" does not exist\n');
        console.log('📝 You need to create the table in Supabase:');
        console.log('   1. Go to: https://supabase.com/dashboard/project/_/sql');
        console.log('   2. Click "New Query"');
        console.log('   3. Copy the entire content from:');
        console.log('      backend/supabase-schema.sql');
        console.log('   4. Paste and click "Run"');
        console.log('   5. Then do the same for:');
        console.log('      backend/supabase-functions.sql\n');
        process.exit(1);
      } else {
        console.log('⚠️  Error:', error.message);
        console.log('   Code:', error.code);
        process.exit(1);
      }
    }

    console.log('✅ Connection successful!\n');

    // Check if table has data
    const { count } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });

    console.log('3. Checking data...');
    console.log(`   Jobs in Supabase: ${count || 0}\n`);

    if (count === 0) {
      console.log('📊 Table is empty. Ready to migrate data!');
      console.log('   Run: node scripts/migrateToSupabase.js\n');
    } else {
      console.log('✅ Table has data. Migration already completed!\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkSupabase();
