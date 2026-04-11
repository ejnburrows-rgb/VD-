const { Client } = require('pg');
const connectionString = 'postgresql://role_27589d67a:kKdXgaHyx6li5L08NU7WhKxeFlqOl8Jb@db-27589d67a.db003.hosteddb.reai.io:5432/27589d67a?connect_timeout=15';
const client = new Client({ connectionString });

async function main() {
  await client.connect();
  const res = await client.query('SELECT * FROM public."Decima" LIMIT 100;');
  console.log(JSON.stringify(res.rows, null, 2));
  await client.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
