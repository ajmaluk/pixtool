const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

async function check(host) {
  return new Promise((resolve) => {
    dns.lookup(host, (err, address) => {
      if (err) {
        console.log(`NOT FOUND: ${host} (${err.code})`);
      } else {
        console.log(`FOUND: ${host} -> ${address}`);
      }
      resolve();
    });
  });
}

async function main() {
  const ref = 'lswblkklmmpaqpiutbim';
  await check(`${ref}.supabase.co`);
  await check(`db.${ref}.supabase.co`);
}

main();
