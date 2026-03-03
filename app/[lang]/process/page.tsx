import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import ProcessClient from "./ProcessClient";

export default async function Process({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return <ProcessClient dict={dict.process_page} lang={lang} />;
}
