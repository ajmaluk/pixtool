const dns = require('dns').promises;

async function check(host) {
  try {
    await dns.lookup(host);
    console.log(`FOUND: ${host}`);
  } catch (e) {
    console.log(`NOT FOUND: ${host}`);
  }
}

async function main() {
  const ref = 'lswblkklmmpaqpiutbim';
  await check(`${ref}.supabase.co`);
  await check(`db.${ref}.supabase.co`);
  await check(`db.${ref}.supabase.net`);
  await check(`db.${ref}.supabase.com`);
}

main();
