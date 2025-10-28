const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  const users = [
    { email: 'admin1@placeholder.com', password: 'Password123', name: 'Admin One' },
    { email: 'admin2@placeholder.com', password: 'Password123', name: 'Admin Two' }
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: { password: hashed, name: u.name, role: 'admin' },
      create: { email: u.email, password: hashed, name: u.name, role: 'admin' }
    });
  }

  console.log('Seed complete.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
