const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Using the pooler address with project ID in the username
const connectionString = 'postgresql://postgres.lswblkklmmpaqpiutbim:Ajmal%40123nyd@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';

async function main() {
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Connecting to Supabase (via pooler)...');
    await client.connect();
    console.log('Connected successfully.');

    const sqlPath = path.join(__dirname, '../../supa.sql');
    console.log(`Reading schema from ${sqlPath}...`);
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing schema initialization...');
    await client.query(sql);
    console.log('Schema initialized and tools seeded successfully.');

    console.log('Verifying data...');
    const res = await client.query('SELECT count(*) FROM tools');
    console.log(`Verified: ${res.rows[0].count} tools found in database.`);

  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
