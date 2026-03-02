import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const password = await bcrypt.hash("admin123", 12);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@glovance.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@glovance.com",
      password,
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
        name: "Household Appliances",
        name_fr: "Appareils Ménagers",
        name_ar: "الأجهزة المنزلية",
        description: "Premium household appliances for modern living",
        description_fr: "Appareils ménagers haut de gamme pour la vie moderne",
        description_ar: "أجهزة منزلية متميزة للحياة العصرية",
      },
    }),
    prisma.category.upsert({
      where: { id: "cat-pottery" },
      update: {},
      create: {
        id: "cat-pottery",
        name: "Pottery & Ceramics",
        name_fr: "Poterie et Céramiques",
        name_ar: "الفخار والسيراميك",
        description: "Handcrafted pottery and ceramic art pieces",
        description_fr: "Pièces d'art en poterie et céramique artisanales",
        description_ar: "قطع فنية مصنوعة يدوياً من الفخار والسيراميك",
      },
    }),
    prisma.category.upsert({
      where: { id: "cat-dates" },
      update: {},
      create: {
        id: "cat-dates",
        name: "Premium Dates",
        name_fr: "Dattes Premium",
        name_ar: "التمور الفاخرة",
        description: "Finest quality dates from the Gulf region",
        description_fr: "Dattes de la meilleure qualité de la région du Golfe",
        description_ar: "تمور بأعلى جودة من منطقة الخليج",
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
