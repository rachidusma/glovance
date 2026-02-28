"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

type Lang = "en" | "fr" | "ar";

interface RelatedProduct {
  id: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  images: string[];
}

interface Product {
  id: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  descEn: string | null;
  descFr: string | null;
  descAr: string | null;
  images: string[];
  category: {
    id: string;
    nameEn: string;
    nameFr: string;
    nameAr: string;
    products: RelatedProduct[];
  };
}

function getLocalizedField(obj: any, field: string, lang: Lang): string {
  const suffixes: Record<Lang, string> = { en: "En", fr: "Fr", ar: "Ar" };
  return obj[field + suffixes[lang]] || obj[field + "En"] || "";
}

export default function ProductDetailClient({
  product,
  lang,
  dict,
}: {
  product: Product;
  lang: string;
  dict: any;
}) {
  const l = (lang as Lang) || "en";
  const [activeImage, setActiveImage] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>("logistics");

  const name = getLocalizedField(product, "name", l);
  const desc = getLocalizedField(product, "desc", l);
  const catName = getLocalizedField(product.category, "name", l);
  const images = product.images.length > 0 ? product.images : ["/CF648EE9E3F7404F.jpg"];
  const related = product.category.products || [];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .zoom-container { overflow: hidden; cursor: crosshair; }
          .zoom-img { transition: transform 0.3s ease-out; }
          .zoom-container:hover .zoom-img { transform: scale(1.1); }
        `,
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-card-dark border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 dark:text-gray-400 flex-wrap">
            <Link className="hover:text-primary" href={`/${lang}`}>
              {dict?.navbar?.home || "Home"}
            </Link>
            <span className="material-icons-outlined text-sm">chevron_right</span>
            <Link className="hover:text-primary" href={`/${lang}/products`}>
              {dict?.navbar?.products || "Products"}
            </Link>
            <span className="material-icons-outlined text-sm">chevron_right</span>
            <span className="hover:text-primary cursor-pointer">{catName}</span>
            <span className="material-icons-outlined text-sm">chevron_right</span>
            <span className="text-gray-800 dark:text-white line-clamp-1">{name}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="product-gallery flex flex-col-reverse lg:flex-row gap-4"
          >
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-24 lg:h-[600px] py-1">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === i
                        ? "border-primary opacity-100"
                        : "border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100 hover:border-primary"
                    }`}
                  >
                    <img
                      alt={`${name} ${i + 1}`}
                      className="w-full h-full object-cover"
                      src={src}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 relative bg-white rounded-2xl shadow-sm dark:bg-card-dark border border-gray-100 dark:border-gray-800 overflow-hidden group">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-primary text-[#0b1121] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {catName}
                </span>
              </div>
              <div className="zoom-container w-full h-[400px] lg:h-[600px] flex items-center justify-center p-6">
                <img
                  key={activeImage}
                  alt={name}
                  className="zoom-img max-h-full max-w-full object-contain drop-shadow-xl"
                  src={images[activeImage]}
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur rounded-full p-2 cursor-pointer shadow-lg hover:bg-primary hover:text-[#0b1121] transition-colors opacity-0 group-hover:opacity-100">
                <span className="material-icons-outlined">zoom_in</span>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 px-2 sm:px-0 sm:mt-16 lg:mt-0"
          >
            <div className="mb-6">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">
                {catName}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0b1121] dark:text-white tracking-tight mb-4">
                {name}
              </h1>
              {desc && (
                <p className="text-lg text-gray-500 dark:text-gray-300 leading-relaxed font-light">
                  {desc}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                href={`/${lang}/contact`}
                className="flex-1 bg-primary hover:bg-[#a8c425] text-[#0b1121] font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 transform transition hover:-translate-y-1 flex justify-center items-center group"
              >
                REQUEST A QUOTE
                <span className="material-icons-outlined ml-2 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <button className="flex-1 bg-white dark:bg-card-dark border-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex justify-center items-center">
                <span className="material-icons-outlined mr-2">download</span>
                Download Spec Sheet
              </button>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {[
                {
                  key: "logistics",
                  icon: "local_shipping",
                  label: "Logistics & Shipping Details",
                  content: (
                    <ul className="space-y-2 list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                      <li><strong>Minimum Order Quantity:</strong> 1 × 20ft Container</li>
                      <li><strong>Port of Loading:</strong> Hamad Port, Qatar</li>
                      <li><strong>Lead Time:</strong> 15–20 days after confirmation</li>
                      <li><strong>Packaging:</strong> Reinforced export-grade carton</li>
                    </ul>
                  ),
                },
                {
                  key: "qa",
                  icon: "security",
                  label: "Quality Assurance",
                  content: (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <p className="mb-3">Every unit undergoes rigorous testing before shipment.</p>
                      <div className="flex gap-3 flex-wrap">
                        {["ISO 9001", "CE Certified", "RoHS"].map((badge) => (
                          <span key={badge} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ].map(({ key, icon, label, content }) => (
                <div key={key} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-card-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left focus:outline-none"
                    onClick={() => setOpenSection(openSection === key ? null : key)}
                  >
                    <span className="font-display font-semibold text-[#0b1121] dark:text-white flex items-center">
                      <span className="material-icons-outlined mr-3 text-primary">{icon}</span>
                      {label}
                    </span>
                    <span className={`material-icons-outlined text-gray-400 transform transition-transform ${openSection === key ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  {openSection === key && (
                    <div className="p-4 bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-700">
                      {content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-10"
          >
            <h2 className="text-2xl font-display font-bold text-[#0b1121] dark:text-white mb-8">
              Related Products from {catName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((rel) => {
                const relName = getLocalizedField(rel, "name", l);
                const relThumb = rel.images[0] || "/CF648EE9E3F7404F.jpg";
                return (
                  <div
                    key={rel.id}
                    className="group relative bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        alt={relName}
                        className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                        src={relThumb}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                        <Link href={`/${lang}/product/${rel.id}`}>
                          <span aria-hidden="true" className="absolute inset-0"></span>
                          {relName}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{catName}</p>
                      <p className="mt-2 text-sm font-bold text-primary">View Details</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}
