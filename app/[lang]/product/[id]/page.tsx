import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/dictionaries/get-dictionary";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { 
        category: {
          include: {
            products: {
              where: { id: { not: id } }, // exclude current product
              take: 4, // limit to 4 related products
              select: {
                id: true,
                nameEn: true,
                nameFr: true,
                nameAr: true,
                images: true,
              }
            }
          }
        } 
      }
    });
    return product;
  } catch (error) {
    console.error("Failed to fetch product directly:", error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: Locale; id: string }>;
}) {
  const { lang, id } = await params;
  const [product, dict] = await Promise.all([
    getProduct(id),
    getDictionary(lang),
  ]);

  if (!product) notFound();

  return <ProductDetailClient product={product} lang={lang} dict={dict} />;
}
