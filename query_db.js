const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://role_27589d67a:kKdXgaHyx6li5L08NU7WhKxeFlqOl8Jb@db-27589d67a.db003.hosteddb.reai.io:5432/27589d67a?connect_timeout=15"
    }
  }
})

async function main() {
  const decimas = await prisma.decima.findMany({
    include: { poet: true }
  })
  decimas.forEach(d => {
    console.log(`POET: ${d.poet.name}`);
    console.log(`LINES: ${d.lines.join(' / ')}`);
    console.log('---');
  })
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
