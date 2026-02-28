import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL ||
  "postgresql://postgres.icsiaoaqcdyzluotmigw:kuj%40Mg%2349nNzEM@aws-1-eu-west-3.pooler.supabase.com:5432/postgres";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const password = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@glovance.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@glovance.com",
      password,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: "cat-appliances" },
      update: {},
      create: {
        id: "cat-appliances",
        nameEn: "Household Appliances",
        nameFr: "Appareils Ménagers",
        nameAr: "الأجهزة المنزلية",
        descEn: "Premium household appliances for modern living",
        descFr: "Appareils ménagers haut de gamme pour la vie moderne",
        descAr: "أجهزة منزلية متميزة للحياة العصرية",
      },
    }),
    prisma.category.upsert({
      where: { id: "cat-pottery" },
      update: {},
      create: {
        id: "cat-pottery",
        nameEn: "Pottery & Ceramics",
        nameFr: "Poterie et Céramiques",
        nameAr: "الفخار والسيراميك",
        descEn: "Handcrafted pottery and ceramic art pieces",
        descFr: "Pièces d'art en poterie et céramique artisanales",
        descAr: "قطع فنية مصنوعة يدوياً من الفخار والسيراميك",
      },
    }),
    prisma.category.upsert({
      where: { id: "cat-dates" },
      update: {},
      create: {
        id: "cat-dates",
        nameEn: "Premium Dates",
        nameFr: "Dattes Premium",
        nameAr: "التمور الفاخرة",
        descEn: "Finest quality dates from the Gulf region",
        descFr: "Dattes de la meilleure qualité de la région du Golfe",
        descAr: "تمور بأعلى جودة من منطقة الخليج",
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} sample categories`);
  console.log("\n🎉 Seed complete!");
  console.log("📧 Admin email: admin@glovance.com");
  console.log("🔑 Admin password: admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
