import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase environment variables are missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false }
});

async function runTests() {
  console.log('Testing Rating System (Auto-creation of tools)...');
  
  const testSlug = `auto-test-tool-${Date.now()}`;
  const userId1 = `user-${Math.random().toString(36).substring(7)}`;
  const userId2 = `user-${Math.random().toString(36).substring(7)}`;
  const ipHash1 = `ip-${Math.random().toString(36).substring(7)}`;
  const ipHash2 = `ip-${Math.random().toString(36).substring(7)}`;

  console.log(`1. Submitting rating for non-existent tool: ${testSlug}`);
  const { data: rating1, error: error1 } = await supabase.rpc('submit_tool_rating', {
    p_tool_slug: testSlug,
    p_user_id: userId1,
    p_ip_hash: ipHash1,
    p_rating: 5,
    p_window_seconds: 10
  });

  if (error1) {
    console.error('❌ Failed to submit first rating:', error1.message);
    process.exit(1);
  }
  
  console.log('✅ Rating 1 successful:', rating1);
  
  console.log(`2. Verifying tool was created automatically in 'tools' table`);
  const { data: tool, error: toolError } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', testSlug)
    .single();
    
  if (toolError || !tool) {
    console.error('❌ Tool was not created:', toolError?.message);
    process.exit(1);
  }
  console.log('✅ Tool exists:', tool.name);

  console.log(`3. Testing duplicate rating prevention (same user/tool)`);
  const { data: ratingDup, error: errorDup } = await supabase.rpc('submit_tool_rating', {
    p_tool_slug: testSlug,
    p_user_id: userId1,
    p_ip_hash: ipHash1,
    p_rating: 4,
    p_window_seconds: 10
  });

  if (errorDup) {
    // If it throws an error, that's fine, but the RPC returns `already_rated: true`
    console.log('✅ Rate limit / duplicate check worked via error:', errorDup.message);
  } else {
    const isAlreadyRated = Array.isArray(ratingDup) ? ratingDup[0].already_rated : ratingDup.already_rated;
    if (isAlreadyRated) {
      console.log('✅ Duplicate correctly blocked by returning already_rated = true');
    } else {
      console.error('❌ Duplicate rating was allowed!');
      process.exit(1);
    }
  }

  console.log(`4. Submitting second rating from different user`);
  const { data: rating2, error: error2 } = await supabase.rpc('submit_tool_rating', {
    p_tool_slug: testSlug,
    p_user_id: userId2,
    p_ip_hash: ipHash2,
    p_rating: 3,
    p_window_seconds: 10
  });

  if (error2) {
    console.error('❌ Failed to submit second rating:', error2.message);
    process.exit(1);
  }
  
  const avg = Array.isArray(rating2) ? rating2[0].avg_rating : rating2.avg_rating;
  const total = Array.isArray(rating2) ? rating2[0].total_votes : rating2.total_votes;
  
  console.log(`✅ Rating 2 successful. New Avg: ${avg}, Total: ${total}`);
  if (avg === 4 && total === 2) {
    console.log('✅ Averages calculated correctly!');
  } else {
    console.error(`❌ Expected avg 4 and total 2, got avg ${avg} and total ${total}`);
    process.exit(1);
  }

  console.log('\n🎉 All rating system tests passed successfully!');
}

runTests();
