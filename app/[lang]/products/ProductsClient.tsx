"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface Category {
  id: string;
  name: string;
  name_fr: string;
  name_ar: string;
  _count: { products: number };
}

interface Product {
  id: string;
  name: string;
  name_fr: string;
  name_ar: string;
  description: string | null;
  description_fr: string | null;
  description_ar: string | null;
  image: string | null;
  isAvailable: boolean;
  category: { id: string; name: string; name_fr: string; name_ar: string };
}

type Lang = "en" | "fr" | "ar";

function getLocalizedField(obj: any, field: string, lang: Lang): string {
  const suffixes: Record<Lang, string> = { en: "", fr: "_fr", ar: "_ar" };
  return obj[field + suffixes[lang]] || obj[field] || "";
}

export default function ProductsClient({
  dict,
  lang = "en",
}: {
  dict: any;
  lang?: string;
}) {
  const l = (lang as Lang) || "en";
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // If URL param changes (e.g. forward/back navigation), update the state
    const catParam = searchParams.get("category");
    if (catParam !== selectedCategory) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
    ]).then(([cats, prods]) => {
      setCategories(Array.isArray(cats) ? cats : []);
      setProducts(Array.isArray(prods) ? prods : []);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory) {
      result = result.filter((p) => p.category.id === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.name_fr?.toLowerCase().includes(q) ||
          p.name_ar?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, selectedCategory, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const element = document.getElementById("products");
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>


      <div className="min-h-screen bg-gray-50 dark:bg-background-dark transition-colors duration-300">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 bg-[#0a192f] relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-10"></div>
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary blur-[120px] opacity-20"></div>

          <div className="container mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded text-sm font-bold tracking-wider mb-4 uppercase">
                  {dict.badge}
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase leading-tight mb-2">
                  {dict.title_1} <br />{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    {dict.title_2}
                  </span>
                </h1>
                <h2 className="text-6xl md:text-8xl font-display font-bold text-primary mb-6">
                  {dict.year}
                </h2>
                <p className="text-gray-300 text-lg max-w-md mb-8 leading-relaxed">
                  {dict.desc}
                </p>
                <div className="flex space-x-4">
                  <a href="/GLOVANCE CATALOGUE.pdf" download target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-[#a3b826] text-[#0a192f] font-bold py-3 px-8 rounded transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/30 flex items-center">
                    {dict.download_pdf}
                    <span className="material-icons-outlined ml-2 text-xl">
                      download
                    </span>
                  </a>
                  <a onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} href="#products" className="border border-white/30 hover:border-white text-white font-medium py-3 px-8 rounded transition-all hover:bg-white/10 flex items-center cursor-pointer">
                    {dict.discover_products || "Discover Our Products"}
                  </a>
                </div>
              </div>

              <div className="lg:w-1/2 relative h-[600px] w-full hidden lg:block">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 overflow-hidden rounded-bl-[80px] border-4 border-[#112240] shadow-2xl z-10">
                  <img
                    alt="Modern Appliances"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    src="/CF648EE9E3F7404F.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-display text-2xl uppercase">
                      {dict.logistics}
                    </h3>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-2/3 h-1/2 overflow-hidden rounded-tr-[60px] border-4 border-[#112240] shadow-2xl z-20">
                  <img
                    alt="Fresh Fruits"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    src="/chocolate.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-display text-2xl uppercase">
                      {dict.quality_goods}
                    </h3>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary rounded-full z-30 flex items-center justify-center shadow-[0_0_40px_rgba(204,227,51,0.4)] border-8 border-[#0a192f]">
                  <div className="text-center">
                    <span className="block text-3xl font-black text-[#0a192f]">
                      {dict.year}
                    </span>
                    <span className="block text-xs font-bold uppercase tracking-widest text-[#0a192f]/80">
                        {dict.edition}
                      </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-6">
          <div className="container mx-auto flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <div className="lg:w-1/4 space-y-8">
              {/* Search */}
              <div className="relative">
                <input
                  className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 pl-10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-800 dark:text-white"
                  placeholder={dict.search_placeholder}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="material-icons-outlined absolute left-3 top-3.5 text-gray-400">
                  search
                </span>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-display font-bold uppercase mb-4 text-gray-800 dark:text-white border-l-4 border-primary pl-3">
                  {dict.categories}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`flex items-center space-x-3 cursor-pointer group w-full text-left ${!selectedCategory ? "text-primary font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-primary"} transition-colors`}
                    >
                      <span
                        className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${!selectedCategory ? "border-primary bg-primary/20" : "border-gray-300 dark:border-gray-600"}`}
                      >
                        {!selectedCategory && (
                          <span className="material-icons-outlined text-xs text-primary">
                            check
                          </span>
                        )}
                      </span>
                      <span>{dict.cat_all}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        ({products.length})
                      </span>
                    </button>
                  </li>
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <li key={i}>
                          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </li>
                      ))
                    : categories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory === cat.id ? null : cat.id
                              )
                            }
                            className={`flex items-center space-x-3 cursor-pointer group w-full text-left ${selectedCategory === cat.id ? "text-primary font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-primary"} transition-colors`}
                          >
                            <span
                              className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selectedCategory === cat.id ? "border-primary bg-primary/20" : "border-gray-300 dark:border-gray-600"}`}
                            >
                              {selectedCategory === cat.id && (
                                <span className="material-icons-outlined text-xs text-primary">
                                  check
                                </span>
                              )}
                            </span>
                            <span>{getLocalizedField(cat, "name", l).trim() || cat.name || "Unnamed Category"}</span>
                            <span className="ml-auto text-xs text-gray-400">
                              ({cat._count.products})
                            </span>
                          </button>
                        </li>
                      ))}
                </ul>
              </div>

              {/* Download CTA */}
              <a href="/GLOVANCE CATALOGUE.pdf" download target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-br from-[#112240] to-black p-6 rounded-lg text-white relative overflow-hidden group cursor-pointer">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all"></div>
                <h4 className="font-display font-bold text-xl mb-2 relative z-10">
                  {dict.full_catalog}
                </h4>
                <p className="text-sm text-gray-400 mb-4 relative z-10">
                  {dict.catalog_desc}
                </p>
                <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wider relative z-10">
                  {dict.download_now}{" "}
                  <span className="material-icons-outlined ml-1 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </a>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4" id="products">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-display font-bold uppercase text-gray-800 dark:text-white">
                  {dict.featured}
                </h2>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800"
                    >
                      <div className="h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <span className="material-icons-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">
                    inventory_2
                  </span>
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    {dict.no_products}
                  </p>
                  {(search || selectedCategory) && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setSelectedCategory(null);
                      }}
                      className="mt-4 text-primary hover:underline text-sm"
                    >
                      {dict.clear_filters}
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {paginatedProducts.map((product, index) => {
                    let name = getLocalizedField(product, "name", l);
                    if (!name.trim()) name = product.name || "Unnamed Product";
                    
                    const desc = getLocalizedField(product, "description", l);
                    
                    let catName = getLocalizedField(product.category, "name", l);
                    if (!catName.trim()) catName = product.category.name || "Unnamed Category";
                    
                    const thumb = product.image || "/CF648EE9E3F7404F.jpg";

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-800 group"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                          <img
                            alt={name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            src={thumb}
                          />
                          <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2 items-start">
                            <span className="bg-primary text-[#0a192f] text-xs font-bold px-2 py-1 rounded inline-block uppercase tracking-wide">
                              {catName}
                            </span>
                            {!product.isAvailable && (
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-red-400/50 inline-block uppercase tracking-wide">
                                {dict.out_of_stock}
                              </span>
                            )}
                            <h3 className="text-2xl font-display font-bold text-white uppercase line-clamp-2 mt-1">
                              {name}
                            </h3>
                          </div>
                        </div>
                        <div className="p-6">
                          {desc && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                              {desc}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                              {catName}
                            </span>
                            <Link
                              href={`/${lang}/product/${product.id}`}
                              className="text-primary hover:text-white hover:bg-primary p-2 rounded-full transition-colors flex items-center justify-center"
                            >
                              <span className="material-icons-outlined text-lg">
                                arrow_forward
                              </span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center"
                  >
                    <span className="material-icons-outlined">chevron_left</span>
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition flex items-center justify-center ${
                        currentPage === i + 1
                          ? "bg-primary text-[#0a192f]"
                          : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center"
                  >
                    <span className="material-icons-outlined">chevron_right</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-100 dark:bg-[#0a192f] border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <span className="material-icons-outlined text-4xl">
                  verified_user
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-800 dark:text-white uppercase mb-2">
                {dict.feat_quality}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {dict.feat_quality_desc}
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <span className="material-icons-outlined text-4xl">
                  handshake
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-800 dark:text-white uppercase mb-2">
                {dict.feat_reliability}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {dict.feat_reliability_desc}
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <span className="material-icons-outlined text-4xl">public</span>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-800 dark:text-white uppercase mb-2">
                {dict.feat_network}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {dict.feat_network_desc}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
