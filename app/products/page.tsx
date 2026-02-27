import Link from "next/link";
import Image from "next/image";

export default function Products() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .geometric-accent {
              clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
          }
          .angle-divider {
              clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
          }
        `
      }} />
      <header className="relative bg-[#112240] overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[#112240] opacity-50 z-0"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent z-0 skew-x-12 origin-top"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded text-sm font-bold tracking-wider mb-4 uppercase">
                Import - Export - Distribution
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase leading-tight mb-2">
                Catalogue <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Produits</span>
              </h1>
              <h2 className="text-6xl md:text-8xl font-display font-bold text-primary mb-6">2026</h2>
              <p className="text-gray-300 text-lg max-w-md mb-8 leading-relaxed">
                Connecting Qatar to the world. Specializing in the import and export of household appliances, pottery, fruits, dates, and everyday consumer goods.
              </p>
              <div className="flex space-x-4">
                <button className="bg-primary hover:bg-[#a3b826] text-[#0a192f] font-bold py-3 px-8 rounded transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/30 flex items-center">
                  Download PDF
                  <span className="material-icons-outlined ml-2 text-xl">download</span>
                </button>
                <button className="border border-white/30 hover:border-white text-white font-medium py-3 px-8 rounded transition-all hover:bg-white/5">
                  Our Mission
                </button>
              </div>
            </div>
            <div className="relative hidden md:block h-[500px]">
              <div className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden rounded-bl-[80px] border-4 border-[#112240] shadow-2xl z-10">
                <img alt="Logistics and shipping" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsz4v-WzAzxabfJukcL7CJAU2CN5eVTbGzXxT3s58g2VJIPDeRqlpkUPWjn52uRe5NYRWEbD56uY0r8__cR12Fi-lpDJhvhWrblv8B__EAvgMMMoamLhSKH_9OnVI5x3L0oOT9wJnuLrZ0hPG8T1dcc0p4fGO7Sht8yyM5c9k5BeoinYRMs9C7IpkcEz_02cX8WSCEqNabOKiWQXS11gqC7V4fXiRGRPxzhxW8QmjfiPCp4LvqbHUuSt_pfhFRYjXyhmD15aS12ItI" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-display text-2xl uppercase">Logistics</h3>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-1/2 overflow-hidden rounded-tr-[60px] border-4 border-[#112240] shadow-2xl z-20">
                <img alt="Fresh Fruits" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAfe4Xc6llVEdfIr4KJR5hoYE4BJlXFLJUjAXrHOHPUa8kUoLKuqdAYnKKWsQh6E_vhBsYQ8tBlebwcSQsXXfcJwMjm7qi-sZw2Ts2M245tdqHSahltZ1nW3lsygiB2_pqPtUuosCA7GvUcm_ywRs8sSjv83P1s_VTp6lTuLi0ikz3oMLq9sTDwv1_TEAWHklCGsCeWFOkxdrzAlzcSU7E7idU2bubD3Ct2eJiK4HTiAclJp0PlgS83nH4PAkOW4wyWzgK2vH54GJW" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-display text-2xl uppercase">Quality Goods</h3>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/20 blur-2xl rounded-full z-0"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-background-light dark:bg-background-dark" style={{ clipPath: "polygon(100% 100%, 0 100%, 100% 0)" }}></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="relative">
                <input className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 pl-10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-800 dark:text-white" placeholder="Search products..." type="text" />
                <span className="material-icons-outlined absolute left-3 top-3.5 text-gray-400">search</span>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold uppercase mb-4 text-gray-800 dark:text-white border-l-4 border-primary pl-3">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input defaultChecked className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-card-dark focus:ring-primary" type="checkbox" />
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">All Products</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-card-dark focus:ring-primary" type="checkbox" />
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">Household Appliances</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-card-dark focus:ring-primary" type="checkbox" />
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">Pottery &amp; Ceramics</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-card-dark focus:ring-primary" type="checkbox" />
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">Fruits &amp; Vegetables</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-card-dark focus:ring-primary" type="checkbox" />
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">Dates &amp; Dried Goods</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold uppercase mb-4 text-gray-800 dark:text-white border-l-4 border-primary pl-3">Origin</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors">Qatar</button>
                  <button className="px-3 py-1 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors">International</button>
                  <button className="px-3 py-1 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors">Regional</button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#112240] to-black p-6 rounded-lg text-white relative overflow-hidden group cursor-pointer">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all"></div>
                <h4 className="font-display font-bold text-xl mb-2 relative z-10">Full Catalog</h4>
                <p className="text-sm text-gray-400 mb-4 relative z-10">Download our complete 2026 product PDF.</p>
                <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wider relative z-10">
                  Download Now <span className="material-icons-outlined ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          </aside>
          <section className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-display font-bold uppercase text-gray-800 dark:text-white">Featured Collections</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">Showing 4 major categories</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="group relative bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-0 right-0 z-10 w-24 h-full bg-primary/90 skew-x-[-20deg] translate-x-32 group-hover:translate-x-12 transition-transform duration-500 opacity-80"></div>
                  <img alt="Household Appliances" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxVRllRF0kNVkYGzdDl32VE_adFsZZjUyywwT3Uk-cDYuID2jen3X0bfWNQYaToNSE34Jzy5_SLjKS1WeRqu_QS2DN-sVc2ssgDzA6UTSAMnEiwZz6r8neZ8AOWRZ704VP8hWw5YFZwLc6DhCP-zPiLU7jc2veASl66F2aPMXksiRQfPnAL-rWCHypoKgeb8dHPU9fUbf7m42SwoYDO0KT5hkZRRkl_luqUcnNVdPZuTQCuatVduuN-uN8cWmuwcg5JCVRL5SnS3Tt" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-primary text-[#0a192f] text-xs font-bold px-2 py-1 rounded mb-2 inline-block">PREMIUM</span>
                    <h3 className="text-2xl font-display font-bold text-white uppercase">Household Appliances</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">High-quality refrigerators, washing machines, and kitchen essentials sourced from top global manufacturers.</p>
                  <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">54 Products</span>
                    <Link href="/product" className="text-primary hover:text-white hover:bg-primary p-2 rounded-full transition-colors flex items-center justify-center">
                      <span className="material-icons-outlined text-lg">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
              <article className="group relative bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-0 right-0 z-10 w-24 h-full bg-primary/90 skew-x-[-20deg] translate-x-32 group-hover:translate-x-12 transition-transform duration-500 opacity-80"></div>
                  <img alt="Premium Dates" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXiu53qLQtwuKU6122tVo-ManGTy_YqNeFtCfQ3nfAHR8kkQpeswXF4hq57oGEEgphvlNryI8DYAAz_CBu_W_aYo4zENGgzpaW12wQ7eFdY1aTSW1VeQk1USN6jQqA1tJQ_EqVbhl8P6Wcs4pIzdtWjxKMtjA0JT0fHavnntbtjYPnrCZH1tAuHaaELWmn6pdJXP97qg8l3DyMPBakkLaAFi5b45yZMa3msyMXLo7GABpFr9di74SYT982ffHYHWmjC-MXguncNUG4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-primary text-[#0a192f] text-xs font-bold px-2 py-1 rounded mb-2 inline-block">ORGANIC</span>
                    <h3 className="text-2xl font-display font-bold text-white uppercase">Premium Dates</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">Exquisite selection of regional dates including Ajwa, Medjool, and Sukkari. Carefully packaged for export.</p>
                  <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">12 Varieties</span>
                    <button className="text-primary hover:text-white hover:bg-primary p-2 rounded-full transition-colors flex items-center justify-center">
                      <span className="material-icons-outlined text-lg">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
              <article className="group relative bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-0 right-0 z-10 w-24 h-full bg-primary/90 skew-x-[-20deg] translate-x-32 group-hover:translate-x-12 transition-transform duration-500 opacity-80"></div>
                  <img alt="Pottery &amp; Ceramics" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4-TwPP08Z-8t_tpfeq0Qc-ixafcHxQl1OsEyT6p3_MgrmmUbE3Kmen-Cyni9EltG3eAlrbqqt14kI_6dMghDd2QbSEVbGntH4rWTu6wehPdS3YW3QtNFWvH8bl_djdNltcd-a75NHzoxUAPdeTyLBrXRSpMvPMZ9nNWJ1F3Qam96GyIgkEKXkdSTA0b7QGvzGvD7ISowZdImGm9zJdv04eDVjAjiwyAGjZzkNWdbperTaKsCCcFptFAxQ9OKI4ePoE12ZNa3ZL-C_" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-primary text-[#0a192f] text-xs font-bold px-2 py-1 rounded mb-2 inline-block">HANDCRAFTED</span>
                    <h3 className="text-2xl font-display font-bold text-white uppercase">Pottery &amp; Ceramics</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">Traditional and modern pottery designs. Durable ceramics for everyday use and decorative purposes.</p>
                  <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">86 Items</span>
                    <button className="text-primary hover:text-white hover:bg-primary p-2 rounded-full transition-colors flex items-center justify-center">
                      <span className="material-icons-outlined text-lg">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
              <article className="group relative bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-0 right-0 z-10 w-24 h-full bg-primary/90 skew-x-[-20deg] translate-x-32 group-hover:translate-x-12 transition-transform duration-500 opacity-80"></div>
                  <img alt="Fresh Fruits" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDElw14nR5pMvEmqElQqDACXEGT8ceFuoPs7b-62VMl7Ii4udM5AlNpuMSxDR0Qs4cLankOvBnHphBVTGLZmOwbPKLwd18DRUaQcekx9hsRDbqqIEV6QvMhezYExrBWrpv72GwMQliSgLB2Uro3kSduNOz3jHyUF7CkK4M4_aThjLMsm-wqjHqyeDMwQ496wBRKhi4x9B4Svm152QmxXxemhqqGN6Ot_dha-_jlYw2ST01Ws8BretseyNorbSJyy0kekfxQkhAojmvI" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-primary text-[#0a192f] text-xs font-bold px-2 py-1 rounded mb-2 inline-block">FRESH IMPORT</span>
                    <h3 className="text-2xl font-display font-bold text-white uppercase">Seasonal Fruits</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">A wide variety of fresh seasonal fruits imported daily to ensure the highest quality and taste.</p>
                  <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Daily Stock</span>
                    <button className="text-primary hover:text-white hover:bg-primary p-2 rounded-full transition-colors flex items-center justify-center">
                      <span className="material-icons-outlined text-lg">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>
            <div className="mt-12 text-center">
              <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-[#0a192f] font-bold py-3 px-10 rounded transition-colors uppercase tracking-widest text-sm">
                Load More Products
              </button>
            </div>
          </section>
        </div>
      </main>

      <section className="bg-white dark:bg-card-dark py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <span className="material-icons-outlined text-4xl">verified_user</span>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-800 dark:text-white uppercase mb-2">Qualité</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">We ensure every product meets rigorous international quality standards before it reaches your hands.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <span className="material-icons-outlined text-4xl">handshake</span>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-800 dark:text-white uppercase mb-2">Fiabilité</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Reliable logistics and transparent processes define our commitment to our partners and clients.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <span className="material-icons-outlined text-4xl">public</span>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-800 dark:text-white uppercase mb-2">Réseau</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">A vast global network connecting Qatar to markets worldwide for seamless trade.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
