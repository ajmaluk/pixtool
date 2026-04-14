const { Client } = require('pg');

const regions = [
  'us-east-1',
  'us-west-1',
  'eu-central-1',
  'ap-southeast-1',
  'ap-northeast-1',
  'sa-east-1',
  'us-east-2',
  'us-west-2'
];

const ref = 'lswblkklmmpaqpiutbim';
const password = 'Ajmal%40123nyd';

async function tryRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  const port = 6543;
  console.log(`Trying ${region} (${host}:${port})...`);
  const client = new Client({
    connectionString: `postgresql://postgres.${ref}:${password}@${host}:${port}/postgres`,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
  });

  try {
    await client.connect();
    console.log(`SUCCESS in ${region}!`);
    await client.end();
    return true;
  } catch (e) {
    console.log(`FAILED ${region}: ${e.message}`);
    return false;
  }
}

async function main() {
  for (const region of regions) {
    if (await tryRegion(region)) break;
  }
}

main();
