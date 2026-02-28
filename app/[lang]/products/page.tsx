import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import ProductsClient from "./ProductsClient";

export default async function Products({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ProductsClient dict={dict.products_page} lang={lang} />;
}
