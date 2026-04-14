const net = require('net');

const ref = 'lswblkklmmpaqpiutbim';
const hosts = [
  `${ref}.supabase.co`,
  `db.${ref}.supabase.co`,
  `aws-0-us-east-1.pooler.supabase.com`,
  `aws-0-eu-central-1.pooler.supabase.com`,
  `aws-0-ap-southeast-1.pooler.supabase.com`
];

async function checkPort(host) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);
    socket.on('connect', () => {
      console.log(`CONNECTED to ${host}:5432`);
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      console.log(`TIMEOUT on ${host}:5432`);
      socket.destroy();
      resolve(false);
    });
    socket.on('error', (err) => {
      console.log(`ERROR on ${host}:5432 - ${err.message}`);
      socket.destroy();
      resolve(false);
    });
    socket.connect(5432, host);
  });
}

async function main() {
  for (const host of hosts) {
    await checkPort(host);
  }
}

main();
