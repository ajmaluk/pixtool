import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase environment variables are missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  console.log('Testing Supabase connectivity and RLS policies...');

  // 1. Test tools table read (Public RLS)
  const { data: tools, error: toolsError } = await supabase
    .from('tools')
    .select('name, slug')
    .limit(5);

  if (toolsError) {
    console.error('Error fetching tools:', toolsError.message);
  } else {
    console.log(`Success: Fetched ${tools.length} tools.`);
    tools.forEach((tool) => console.log(` - ${tool.name} (${tool.slug})`));
  }

  // 2. Test overall_tool_rating view (Public RLS)
  const { data: overallRating, error: ratingError } = await supabase
    .from('overall_tool_rating')
    .select('*')
    .single();

  if (ratingError) {
    console.error('Error fetching overall rating:', ratingError.message);
  } else {
    console.log('Success: Overall rating fetched.', overallRating);
  }

  // 3. Test insert testimonial (Public RLS)
  const testTestimonial = {
    name: 'Test User',
    message: 'Testing Supabase integration...',
    approved: false,
  };

  const { error: testimonialError } = await supabase
    .from('testimonials')
    .insert([testTestimonial]);

  if (testimonialError) {
    console.error('Error inserting testimonial:', testimonialError.message);
  } else {
    console.log('Success: Test testimonial inserted (pending approval).');
  }

  // 4. Test RLS for private read (should fail or return empty if not approved)
  const { data: privateTestimonials, error: privateError } = await supabase
    .from('testimonials')
    .select('*')
    .eq('name', 'Test User');

  if (privateError) {
     console.log('Note: Testimonial read error (this might be due to RLS):', privateError.message);
  } else {
     const count = privateTestimonials ? privateTestimonials.length : 0;
     console.log(`RLS Check: Found ${count} private testimonials for 'Test User'. (Expected 0 if unapproved and RLS is working)`);
  }

  console.log('\nSupabase test completed.');
}

testSupabase();
