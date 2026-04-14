const { createClient } = require('@supabase/supabase-js');

const url = 'https://lswblkklmmpaqpiutbim.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzd2Jsa2tsbW1wYXFwaXV0YmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNzQ3MTUsImV4cCI6MjA5MTc1MDcxNX0._jZOACB33oG0H-07qAhpW7K4k6uE8MDNq3p87Wzfvxs';

async function main() {
  const supabase = createClient(url, key);
  
  console.log('Testing connection to Supabase API...');
  const { data, error } = await supabase.from('tools').select('name').limit(5);
  
  if (error) {
    console.error('Connection failed:', error.message);
    process.exit(1);
  } else {
    console.log('SUCCESS! Tools found:');
    data.forEach(t => console.log(`- ${t.name}`));
  }
}

main();
