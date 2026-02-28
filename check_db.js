const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const c = await prisma.category.findMany({ select: { id: true, nameEn: true, nameFr: true, nameAr: true } });
  console.log(JSON.stringify(c, null, 2));
}
main().finally(() => prisma.$disconnect());
