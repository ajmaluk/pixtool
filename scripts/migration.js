import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tryLoadEnv = (relativePath) => {
  const envPath = path.resolve(__dirname, '..', relativePath);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    return true;
  }
  return false;
};

tryLoadEnv('.env.local') || tryLoadEnv('.env');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL (or VITE_SUPABASE_URL) and/or SUPABASE_SERVICE_ROLE_KEY in your env.');
  process.exit(1);
}

const DUMMY_UUID = '00000000-0000-0000-0000-000000000000';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const parseToolSeeds = (sql) => {
  const startIdx = sql.search(/insert\s+into\s+tools\s*\(\s*name\s*,\s*slug\s*\)\s*values/i);
  if (startIdx === -1) return [];
  const tail = sql.slice(startIdx);
  const endIdx = tail.indexOf(';');
  if (endIdx === -1) return [];
  const block = tail.slice(0, endIdx);

  const rows = [];
  const re = /\(\s*'((?:[^']|'{2})*)'\s*,\s*'((?:[^']|'{2})*)'\s*\)/g;
  for (const match of block.matchAll(re)) {
    const name = match[1].replace(/''/g, "'").trim();
    const slug = match[2].replace(/''/g, "'").trim();
    if (!name || !slug) continue;
    rows.push({ name, slug });
  }
  return rows;
};

const safeDeleteAll = async (table, primaryKey) => {
  const { error } = await supabase.from(table).delete().neq(primaryKey, DUMMY_UUID);
  if (!error) return;
  if (error.code === '42P01') return;
  throw error;
};

const main = async () => {
  const args = new Set(process.argv.slice(2));
  const wipe = args.has('--wipe') || args.has('--reset');
  const sqlPath = path.resolve(__dirname, '..', 'supa.sql');

  if (!fs.existsSync(sqlPath)) {
    console.error(`Missing supa.sql at ${sqlPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');
  const tools = parseToolSeeds(sql);

  if (!tools.length) {
    console.error('No tools seed rows found in supa.sql.');
    process.exit(1);
  }

  const probe = await supabase.from('tools').select('id', { count: 'exact', head: true });
  if (probe.error) {
    console.error(`Cannot query "tools". Run the schema SQL first. (${probe.error.message})`);
    process.exit(1);
  }

  if (wipe) {
    await safeDeleteAll('ratings', 'id');
    await safeDeleteAll('rate_limits', 'id');
    await safeDeleteAll('tool_stats', 'tool_id');
    await safeDeleteAll('testimonials', 'id');
    await safeDeleteAll('contacts', 'id');
    await safeDeleteAll('tools', 'id');
  }

  const { error: upsertError } = await supabase.from('tools').upsert(tools, { onConflict: 'slug' });
  if (upsertError) {
    console.error(`Seed failed: ${upsertError.message}`);
    process.exit(1);
  }

  const { count } = await supabase.from('tools').select('id', { count: 'exact', head: true });
  console.log(`Seed complete. tools=${Number(count || 0)}`);
};

main().catch((err) => {
  console.error(err?.message || String(err));
  process.exit(1);
});
