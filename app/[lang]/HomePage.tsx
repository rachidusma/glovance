"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

type Lang = "en" | "fr" | "ar";

interface Category {
  id: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  descEn: string | null;
  descFr: string | null;
  descAr: string | null;
  imageUrl: string | null;
  _count: { products: number };
}

function getLocalizedField(obj: any, field: string, lang: Lang): string {
  const suffixes: Record<Lang, string> = { en: "En", fr: "Fr", ar: "Ar" };
  return obj[field + suffixes[lang]] || obj[field + "En"] || "";
}

// Fallback images for categories without an image
const FALLBACK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnLhZ0p9PZjcB67aUc3C2UmOYyfhtH5eR61T1ag16PhG2Xhq3aW5czsJ1QT6x0jBVM4K3aa_v5b30MxL_BQl3i89pRPFduu13V7cJv7VUF4AtppWYh6MloNaOc93hUaBHyFQYeid-unClugnW3z1V6P6e8MWrx30FopeM9PAsMfPFQDh6AIrfxAmEQ87Wsdq18dhso7V42kx1_4NKfvzCWpGMMRvdzxeMBY_L-l8ZHznxrk10_qv8v3DGFj7ZLsclmMA9fBnaDcAUR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCa8HFBLbEvFbTMKyUaMLS01Z-XSN0APxIvUgY174rQt9gW1Zs_BrUPeeFDb8abGb62bdo3bUiC_KyuRpXM_zLbtcWCzqJ7B_1VoJtwtqPpAAfdRxJW-WcDKVu92R7tq6WD88OcM0Vcw_oEJ0n4XOtSAR51rdXBxndIeC7J_bD_L3BWHq5vsy3pLEwgD_jpoIj4EN3SfTqgcF_tFkqqtKSh0GlZ5tNG3uSLWWzvHa5HZrXeAZp_7xHZoQOTgP48zc_KuA9dmcyKw3CP",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD1WktykDWR19nYDdSIbC38DBVsA4ujTxCQEHTtNj_08lzpKQHTj95zQemorWisTB_UgLCY0TeCzaMQj5A2nG_DqeJDVx0-yQN2fUeZgbbuKv-TqW-sAlAn95dzd_nYcbLQlEfOtHHqjwPRHp1lLsa9mhshadQ2pgtWYiZxGysyCXEHCt6AWE_QWEaMdOFmJuXjceOpD9ppvqbJRzQaFwjm9ApIRn5Jl_trEAwDn3G3tOs1qIePWirlcn4YZKbHL2It7J9iEv0nUxgm",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAfGNumi2HpldeG_aqbxhTJgheWbPVNWdpsWOHMAGoqsQFDKkNaMnAmngbjnzvvthcfyr63lJH5IS1gdFqf-NypfHDiQJFyd4yzILTuG9DCXS5VMvlLF83aigtX0GdrCdcnK8m68VOKPyl8V414AhgKCW0B8pYJZ6q0hkpx9Zi4PjNDkFDPg5Kk8hB7C4bzFvOzWD7d2EsBln7KpOFWFsYgfkf4itO3uNGQISWqsP9HDc39xoTlKgrp8WS5h22SXQYlClHkOPi3Uv64",
];

function CatalogueSection({ dict, lang }: { dict: any; lang: Lang }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Number of cards visible depending on screen
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        const cats = Array.isArray(data) ? data : [];
        console.log("Categories in HomePage:", cats.length, cats);
        setCategories(cats);
        setLoading(false);
      });
  }, []);

  const maxIndex = Math.max(0, categories.length - visibleItems);

  const next = useCallback(() => {
    setActiveIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  // Auto-advance every 4s when not hovered
  useEffect(() => {
    if (isHovered || loading || categories.length <= visibleItems) return;
    timerRef.current = setTimeout(next, 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIndex, isHovered, loading, categories.length, next, visibleItems]);

  const skeletons = Array.from({ length: 4 });

  return (
    <section className="py-24 bg-gray-100 dark:bg-[#0f1826] relative overflow-hidden" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm tracking-[0.3em] uppercase block mb-3">
            {dict.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary dark:text-white uppercase">
            {dict.title_1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
              {dict.title_2}
            </span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Prev Button */}
          {!loading && categories.length > visibleItems && (
            <button
              onClick={prev}
              aria-label="Previous"
              className={`absolute ${lang === 'ar' ? '-right-5' : '-left-5'} top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white dark:bg-[#112240] shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-secondary dark:text-white hover:bg-primary hover:border-primary hover:text-white dark:hover:text-secondary transition-all duration-300 group`}
            >
              <span className={`material-icons-outlined transition-transform ${lang === 'ar' ? 'group-hover:translate-x-0.5' : 'group-hover:-translate-x-0.5'}`}>
                {lang === 'ar' ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
          )}

          {/* Cards */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(${lang === 'ar' ? '' : '-'}${activeIndex} * (100% / ${visibleItems} + 8px)))` }}
            >
              {loading
                ? skeletons.map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 rounded-xl overflow-hidden h-96 bg-gray-200 dark:bg-gray-800 animate-pulse"
                      style={{ width: `calc(100% / ${visibleItems} - ${(visibleItems - 1) * 24 / visibleItems}px)` }}
                    />
                  ))
                : categories.length === 0
                ? (
                    <div className="w-full py-16 text-center text-gray-400 dark:text-gray-500">
                      <span className="material-icons-outlined text-5xl mb-3 block">category</span>
                      <p className="text-lg">No categories yet. Add them in the admin panel.</p>
                    </div>
                  )
                : categories.map((cat, i) => {
                    let name = getLocalizedField(cat, "name", lang);
                    // Fallback to English if the Arabic/French name is just whitespace or empty
                    if (!name.trim()) name = cat.nameEn || "Unnamed Category";
                    const desc = getLocalizedField(cat, "desc", lang);
                    const img = cat.imageUrl || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
                    return (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="flex-shrink-0 group relative overflow-hidden rounded-xl shadow-lg h-96 cursor-pointer"
                        style={{ width: `calc(100% / ${visibleItems} - ${(visibleItems - 1) * 24 / visibleItems}px)` }}
                      >
                        <Link href={`/${lang}/products`} prefetch={false}>
                          <img
                            alt={name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            src={img}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                          {/* Product count badge */}
                          <div className="absolute top-4 right-4 bg-primary text-secondary text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                            {cat._count.products} {cat._count.products === 1 ? dict.product_count : dict.products_count}
                          </div>
                          <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase">
                              {name}
                            </h3>
                            {desc && (
                              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                                {desc}
                              </p>
                            )}
                            <span className="mt-4 inline-flex items-center text-primary text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                              {dict.explore}
                              <span className="material-icons-outlined ml-1 text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
            </div>
          </div>

          {/* Next Button */}
          {!loading && categories.length > visibleItems && (
            <button
              onClick={next}
              aria-label="Next"
              className={`absolute ${lang === 'ar' ? '-left-5' : '-right-5'} top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white dark:bg-[#112240] shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-secondary dark:text-white hover:bg-primary hover:border-primary hover:text-white dark:hover:text-secondary transition-all duration-300 group`}
            >
              <span className={`material-icons-outlined transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}>
                {lang === 'ar' ? 'chevron_left' : 'chevron_right'}
              </span>
            </button>
          )}
        </div>

        {/* Dot Indicators */}
        {!loading && categories.length > visibleItems && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-primary w-8 h-2.5"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/50 w-2.5 h-2.5"
                }`}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            className="inline-block border-2 border-secondary dark:border-white text-secondary dark:text-white hover:bg-primary hover:border-primary hover:text-secondary px-10 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300"
            href={`/${lang}/products`}
          >
            {dict.download_pdf}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home({ dict, lang }: { dict: any; lang: string }) {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden" id="home">
        <div className="absolute inset-0 z-0">
          <video autoPlay className="absolute inset-0 w-full h-full object-cover z-0" loop muted playsInline poster="/hero-poster.jpg">
            <source src="/istockphoto-2194813689-640_adpp_is.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-blue-900/60 z-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/40 to-transparent transform skew-x-12 translate-x-20 hidden lg:block"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block border-l-4 border-primary pl-4">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">
                  {dict.hero.badge}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                {dict.hero.title_1} <br />
                <span className="text-primary">{dict.hero.title_qatar}</span> {dict.hero.title_2}
              </h1>
              <p className="text-gray-300 text-lg max-w-lg leading-relaxed mt-2">
                {dict.hero.desc}
              </p>
              <div className="flex space-x-4 pt-4">
                <Link
                  className="bg-primary text-secondary hover:bg-white hover:text-secondary px-8 py-4 rounded font-bold transition-all uppercase tracking-wider shadow-[0_0_20px_rgba(163,209,49,0.4)] flex items-center"
                  href={`/${lang}/products`}
                >
                  {dict.hero.view_catalog}
                  <span className="material-icons-outlined ml-2">arrow_forward</span>
                </Link>
                <Link
                  className="border border-white text-white hover:bg-white hover:text-secondary px-8 py-4 rounded font-bold transition-all uppercase tracking-wider flex items-center"
                  href={`/${lang}/contact`}
                >
                  {dict.hero.contact}
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-[600px]">
              <div
                className="absolute top-10 right-10 w-64 h-80 bg-cover bg-center rounded shadow-2xl border-4 border-secondary dark:border-background-dark z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('/chocolate.jpg')",
                }}
              >
                <div className="absolute bottom-0 left-0 bg-primary text-secondary text-xs font-bold px-3 py-1 uppercase">
                  {dict.hero.food}
                </div>
              </div>
              <div
                className="absolute top-40 left-10 w-64 h-80 bg-cover bg-center rounded shadow-2xl border-4 border-secondary dark:border-background-dark z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('/CF648EE9E3F7404F.jpg')",
                }}
              >
                <div className="absolute bottom-0 left-0 bg-primary text-secondary text-xs font-bold px-3 py-1 uppercase">
                  {dict.hero.fresh_produce}
                </div>
              </div>
              <div
                className="absolute bottom-20 right-20 w-48 h-48 bg-cover bg-center rounded shadow-2xl border-4 border-secondary dark:border-background-dark z-30 transform hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgJX4RK0Op-nZJX_HCWWxSFLrnmSjaPlHJt1EoWBREtnwrDT7KFjjCxc-8MkXcj09lL6Ds3y8ArzmNxUWmsD2ElxTQEEW3cAdrTuI9dcn_JcPriVPUP6FKv-f3Cn8jwKHmjerf9G9m-Lm4vQ241lMVfdifOznTvW5A0a35CtgntukflBM3bsUTwMAOdR5SA9vgcCy53fAkOROqoy_6jdgrcPsnws3U-2pI6hr4OWn6P_-6Zr4cWFYL3_Zs-MI97titjuGcETfaPmt1')",
                }}
              >
                <div className="absolute bottom-0 left-0 bg-primary text-secondary text-xs font-bold px-3 py-1 uppercase">
                  {dict.hero.appliances}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-white text-xs uppercase tracking-widest mb-2">
            {dict.hero.scroll_down}
          </span>
          <span className="material-icons-outlined text-primary">
            keyboard_arrow_down
          </span>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-background-dark relative" id="about">
        <div className="absolute top-0 left-0 w-2 h-full bg-primary hidden md:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-bold text-xl uppercase mb-2 tracking-widest">
                {dict.about.badge}
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-secondary dark:text-white uppercase mb-8 border-b-4 border-secondary dark:border-primary pb-4 inline-block">
                {dict.about.title}
              </h3>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p className="text-xl font-medium mb-6">
                  {dict.about.subtitle}
                </p>
                <p className="mb-6">
                  {dict.about.desc}
                </p>
              </div>
              <div className="mt-12 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h4 className="text-2xl font-display font-bold text-secondary dark:text-white uppercase mb-3 flex items-center">
                    <span className="bg-primary text-secondary p-1 mr-3 rounded">
                      <span className="material-icons-outlined text-xl">
                        flag
                      </span>
                    </span>
                    {dict.about.mission_title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 pl-11">
                    {dict.about.mission_desc}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h4 className="text-2xl font-display font-bold text-secondary dark:text-white uppercase mb-3 flex items-center">
                    <span className="bg-primary text-secondary p-1 mr-3 rounded">
                      <span className="material-icons-outlined text-xl">
                        diamond
                      </span>
                    </span>
                    {dict.about.values_title}
                  </h4>
                  <ul className="pl-11 grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {dict.about.val_quality}
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {dict.about.val_reliability}
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {dict.about.val_performance}
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {dict.about.val_commitment}
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {dict.about.val_innovation}
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img
                  alt="Cargo shipping container"
                  className="rounded-lg shadow-lg h-64 w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6plu6OzHvQqjEs1WhdscdwQZnc5h1Jse72AVZcQw2M9pKvDJ8JUUzaXZmwAZuOZmpX-lYbqPvtGoGGmzhkBQN0A0ya1FAmBS44dVcxxDI62AB5Rc-1MG23YIULDCqq6t0uGfJUhs2RttMYVxAmEd303tdckTF5L1PMv_xNcodolyFQa9HzBQO_w_OvHdIsaN8PFH7BvqUqaxvlAZUiJqjdsuWPsgWjr0hJ9phlUMCsu3X1iaPOUKEuf2TNGY7Ykz5UpRbYkgBV9NC"
                />
                <img
                  alt="Dates and fruits"
                  className="rounded-lg shadow-lg h-64 w-full object-cover mt-8 md:mt-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLl-OXz1aQIbyH2vyi8zqMZF3M5HR9vXm31J2_fh64qXU59U_6JdUgLorWj8sq9mknNtbbiF2UZyFFxmLGMbVL6XcmKmMsyRsyyyTEuysJUF82myftgxZCzfz6qcV5hHIIPDE-2ydyQHRUsNPoiwewPNLzfNRB9NXUwejKii0il5Ev8y0IDzu06g1Iix779yauVwRhL4y8uXxVxdfPKBOyNjlaUGwh21ma84ZWM0ts29kZAdftSWPc5xMF7UKd_RjByegSX365HKGA"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-96 h-96 overflow-hidden rounded-[40px] border-8 border-white dark:border-[#0D1B2A] shadow-2xl z-20 hidden md:block group">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <img alt="Modern Home Appliances" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" src="/CF648EE9E3F7404F.jpg" />
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="font-display font-bold text-white text-2xl drop-shadow-lg">{dict.homeAppliances}</span>
                </div>
              </div>
              <div className="bg-secondary dark:bg-accent-blue rounded-xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-2xl"></div>
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center group">
                    <span className="material-icons-outlined text-primary text-4xl mr-4 group-hover:scale-110 transition-transform">
                      verified_user
                    </span>
                    <span className="text-2xl font-bold text-white uppercase tracking-wider">
                      {dict.about.feat_qualite}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/10"></div>
                  <div className="flex items-center group">
                    <span className="material-icons-outlined text-primary text-4xl mr-4 group-hover:scale-110 transition-transform">
                      handshake
                    </span>
                    <span className="text-2xl font-bold text-white uppercase tracking-wider">
                      {dict.about.feat_fiabilite}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/10"></div>
                  <div className="flex items-center group">
                    <span className="material-icons-outlined text-primary text-4xl mr-4 group-hover:scale-110 transition-transform">
                      public
                    </span>
                    <span className="text-2xl font-bold text-white uppercase tracking-wider">
                      {dict.about.feat_reseau}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CatalogueSection dict={dict.catalogue} lang={lang as Lang} />

      <section className="py-20 bg-secondary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzksWcJYktHse9f4qc1YfMKnhm9KsA4Sx6G0_u6t6OU4IoiRLwoBlOgUK_SGM8dPs0Fev0cTryoUO3wgUnXPooNlSePB26RklB5pFF0-dmyDQj8u8yvg8WnHDR6C7fkETdOHiS7-pDnqCMgCiAGsVU3x4Gpt0eJwUOwxICa8hQDabQyKijq0W-AYC6j_cfl5hqORfdGoEQsBT59w1nRzQ_nXFxtCHLJcIS5nn9FTsOUVEt-ymNkcH0diRQUADJm56BNSYUgmLywBnZ')",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <span className="block text-5xl font-display font-bold text-white mb-2">
                15+
              </span>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                {dict.stats.countries}
              </span>
            </div>
            <div className="p-6">
              <span className="block text-5xl font-display font-bold text-white mb-2">
                500+
              </span>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                {dict.stats.products}
              </span>
            </div>
            <div className="p-6">
              <span className="block text-5xl font-display font-bold text-white mb-2">
                24/7
              </span>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                {dict.stats.support}
              </span>
            </div>
            <div className="p-6">
              <span className="block text-5xl font-display font-bold text-white mb-2">
                100%
              </span>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                {dict.stats.reliability}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase italic mb-4 tracking-tight">
            {dict.cta.title}
          </h2>
          <p className="text-white text-lg md:text-xl mb-8 font-medium">
            {dict.cta.desc}
          </p>
          <Link
            className="inline-block bg-white text-primary hover:bg-gray-100 px-10 py-4 rounded font-bold transition-all uppercase tracking-wider"
            href={`/${lang}/contact`}
          >
            {dict.cta.btn}
          </Link>
        </div>
      </section>


      <section className="py-20 bg-background-light dark:bg-background-dark" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#151f2e] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-10 md:p-14">
              <h2 className="text-3xl font-display font-bold text-secondary dark:text-white mb-6 uppercase">
                {dict.get_in_touch.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                {dict.get_in_touch.desc}
              </p>
              <form className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="name"
                  >
                    {dict.get_in_touch.label_name}
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-colors dark:text-white"
                    id="name"
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="email"
                  >
                    {dict.get_in_touch.label_email}
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-colors dark:text-white"
                    id="email"
                    type="email"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="message"
                  >
                    {dict.get_in_touch.label_message}
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-colors dark:text-white"
                    id="message"
                    rows={4}
                  ></textarea>
                </div>
                <button
                  className="w-full bg-secondary dark:bg-primary text-white dark:text-secondary py-4 rounded-lg font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  type="submit"
                >
                  {dict.get_in_touch.btn_send}
                </button>
              </form>
            </div>
            <div className="w-full md:w-1/2 bg-secondary text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold mb-8 uppercase">
                  {dict.get_in_touch.hq}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <span className="material-icons-outlined text-primary mr-4 mt-1">
                      location_on
                    </span>
                    <p className="text-gray-300" style={{ whiteSpace: "pre-line" }}>
                      {dict.get_in_touch.address}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons-outlined text-primary mr-4">
                      phone
                    </span>
                    <p className="text-gray-300">+974 4400 1234</p>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons-outlined text-primary mr-4">
                      email
                    </span>
                    <p className="text-gray-300">info@glovancetrading.com</p>
                  </div>
                </div>
              </div>
              <div className="relative z-10 mt-12">
                <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
                  {dict.get_in_touch.follow_us}
                </p>
                <div className="flex space-x-4">
                  <a
                    className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-secondary transition-all"
                    href="#"
                  >
                    <span className="font-display font-bold">In</span>
                  </a>
                  <a
                    className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-secondary transition-all"
                    href="#"
                  >
                    <span className="font-display font-bold">X</span>
                  </a>
                  <a
                    className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-secondary transition-all"
                    href="#"
                  >
                    <span className="font-display font-bold">Fb</span>
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary rounded-full opacity-10 z-0 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
