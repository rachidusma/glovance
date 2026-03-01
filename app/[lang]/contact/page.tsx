import { Suspense } from "react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import ContactClient from "./ContactClient";

export default async function Contact({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <Suspense fallback={null}>
      <ContactClient dict={dict.contact_page} />
    </Suspense>
  );
}
