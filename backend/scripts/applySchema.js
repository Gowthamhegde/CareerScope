const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function applySchema() {
  try {
    console.log('🔧 Applying Supabase Schema...\n');

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase credentials in .env file');
      console.log('Please run: node scripts/setupSupabase.js');
      process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Read schema file
    const schemaPath = path.join(__dirname, '../supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📝 Schema file loaded');
    console.log('⚠️  Note: SQL execution via JS client has limitations.\n');
    console.log('For best results, please run the SQL manually in Supabase Dashboard:');
    console.log('1. Go to: https://supabase.com/dashboard/project/_/sql');
    console.log('2. Copy the content from: backend/supabase-schema.sql');
    console.log('3. Paste and run it');
    console.log('4. Then copy and run: backend/supabase-functions.sql\n');

    // Try to create table (basic check)
    console.log('🔍 Testing connection...');
    const { data, error } = await supabase
      .from('jobs')
      .select('count')
      .limit(1);

    if (error && error.code === '42P01') {
      console.log('❌ Table "jobs" does not exist yet');
      console.log('Please run the SQL files manually as described above.\n');
      process.exit(1);
    } else if (error) {
      console.log('⚠️  Connection test result:', error.message);
    } else {
      console.log('✅ Connection successful! Table exists.\n');
      console.log('Ready to migrate data. Run:');
      console.log('   node scripts/migrateToSupabase.js\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

applySchema();
