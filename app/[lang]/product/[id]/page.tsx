import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/dictionaries/get-dictionary";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/products/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
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
