import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { i18n } from "../i18n-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.glovancetrading.com";

  // Get all products
  const products = await prisma.product.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const locales = i18n.locales;

  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/process",
    "/contact",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static routes
  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    });
  });

  // Add product routes
  products.forEach((product) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/product/${product.id}`,
        lastModified: product.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });
  });

  return sitemapEntries;
}
