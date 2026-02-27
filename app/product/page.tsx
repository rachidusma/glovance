"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Product() {
  const [openSection, setOpenSection] = useState<string | null>("logistics");

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .material-symbols-outlined {
              font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          .zoom-container {
              overflow: hidden;
              cursor: crosshair;
          }
          .zoom-img {
              transition: transform 0.3s ease-out;
          }
          .zoom-container:hover .zoom-img {
              transform: scale(1.15);
          }
        `
      }} />
      <div className="bg-gray-50 dark:bg-card-dark border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Link className="hover:text-primary" href="/">Home</Link>
            <span className="material-icons-outlined text-sm">chevron_right</span>
            <Link className="hover:text-primary" href="/products">Catalogue 2026</Link>
            <span className="material-icons-outlined text-sm">chevron_right</span>
            <span className="hover:text-primary cursor-pointer">Household Appliances</span>
            <span className="material-icons-outlined text-sm">chevron_right</span>
            <span className="text-gray-800 dark:text-white">Premium Dual-Door Refrigerator</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="product-gallery flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-24 lg:h-[600px] scrollbar-hide py-1">
              <button className="flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-lg border-2 border-primary overflow-hidden bg-white">
                <img alt="Refrigerator Front View" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChIGtYQDwQt_jmwzYJSL3NfoZPZoYCmtnZuC2DZuJJhVYWs8c0I0K8UWzA74dj3sBzf4W3Z0-7CZQ-7cQv9TdSjcATl1Gl_glTDlQHg55i5csWfGpcQMHxibT49a02rC1A-DPfuoMDu3dZIuKOtT04I4SYbhS2cvUdI1qyh1ONo-Re_j_RxhjturC_UelBOvxfDJjRyXyxMIX7IVeQGEOrLHBBTZAPZAGHs79jNTtOPOu7LteYSjWXFO1YYcDm0dR9UA5V9pqUhXmf" />
              </button>
              <button className="flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white hover:border-primary transition-colors opacity-70 hover:opacity-100">
                <img alt="Refrigerator Open View" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjpXDazLd08zObpKPmsFCv8jvTE45c9sy0XeiRJ_hl4F1u1zgw6ZhuVVzgFAruj2_cswDzFKyDFRl84oFqQ7XYnphdZzZsTSnBpBru8sT-LnudziqyN0X4AjRbjO1BhBLH_ECcWRV_c3qGIo3ctCQuDq678nq1vCkUytWkOlBiNz1y76VU9-ZPdkyqm7-KdFzlgjeqg5YJVFzH5IPF4x_b0riJdzYYalilVSL1TORwjYvntn3GyNrhGj4A7BWmpfninwvmgaTBbdfv" />
              </button>
              <button className="flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white hover:border-primary transition-colors opacity-70 hover:opacity-100">
                <img alt="Detail Ice Maker" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiOZFtYgTYRlTVOkRsFaOXW92Fb8QJJ_bYcxSYhJBSsDi3UsYATM-kZYau45UFQSJ7wOkuf-C3jTO6QwsSGJCUh6TnRViyEG8_oENV32tanl3_h2EkLnWU4sAihUdPYT7ptRxrYpeXgUIj0mbsJTG9Jnv4otoYxm1X3D89sbwJwqYE9Xcer2u0tuNpsx-GobVOFc3oCOyvDA7mZKgfBU8bxyfO74KnY2JGr9Hz8Nv2643gdCfUEtIkvrXDzSrHJQ8mc-Lj1XQK64Vq" />
              </button>
              <button className="flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white hover:border-primary transition-colors opacity-70 hover:opacity-100">
                <img alt="Side Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASc1OnZKfuEthUzYkRyfgxO9rKBcGwPuMplFjJspiis2SQmFNf3jjNHpL_tIFyF6LaxP6215V_TMxYOQR5vRJU7y1hgkOwfDKDcfRQgKvrX5dsew__K24Vp55MTmKawPRQQj-pWsBWBEzIqrbVKsz31RwOnC5JBZfs5A-WYSaVwAW9jRjjkL402d_-gm5_9Bt5fllPJXpZ2NH9-ws5YiBUTruRX8Zi7njJg3XRn59xn4sWDTh77-Ewp2GdURLzijglO_WmKgkcSscq" />
              </button>
            </div>
            <div className="flex-1 relative bg-white rounded-2xl shadow-sm dark:bg-card-dark border border-gray-100 dark:border-gray-800 overflow-hidden group">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-primary text-[#0b1121] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Premium Export</span>
              </div>
              <div className="zoom-container w-full h-[400px] lg:h-[600px] flex items-center justify-center p-6">
                <img alt="Premium Smart Refrigerator Stainless Steel" className="zoom-img max-h-full max-w-full object-contain drop-shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTJvr17vZOo83do0DXus3Jp5jX3z21sBuNN-1j9yMWwpEUWw3rCCPiXUleLgz0GTAOfgfx7_NRm4GmcDMYIqygo8DWxxefXhiT5jOJY2EeX0Goyrg5zUM7U9RXOWrFlqyyfToxMNRDz6GgSnZyB_FgDH351ssknuTGFw6xTGwvkGJ6QWlT3SwhFeFFLnUcEoVYHnFkx6DzDAMdPNQysInWhuz15UDPSZHvkawQgTYyJxQNaWhln_NOOgMiHSrQS5MRath3jhUK7vFP" />
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur rounded-full p-2 cursor-pointer shadow-lg hover:bg-primary hover:text-[#0b1121] transition-colors group-hover:opacity-100 opacity-0">
                <span className="material-icons-outlined">zoom_in</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 px-2 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0b1121] dark:text-white tracking-tight mb-2">
                FrostGuard™ Elite Series <br />Smart Refrigerator
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <p className="text-sm font-mono text-primary font-bold">MODEL: GL-REF-2026-X</p>
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center text-yellow-400">
                  <span className="material-icons-outlined text-lg fill-current">star</span>
                  <span className="material-icons-outlined text-lg fill-current">star</span>
                  <span className="material-icons-outlined text-lg fill-current">star</span>
                  <span className="material-icons-outlined text-lg fill-current">star</span>
                  <span className="material-icons-outlined text-lg fill-current">star_half</span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">(4.8/5 Quality Score)</span>
                </div>
              </div>
              <p className="text-lg text-gray-500 dark:text-gray-300 leading-relaxed font-light">
                Experience the pinnacle of preservation technology. The FrostGuard™ Elite features dual-cooling zones, smart humidity control, and an energy-efficient inverter compressor designed for international standards. Perfect for modern residential developments and luxury hospitality projects.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="material-icons-outlined text-primary">kitchen</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Capacity</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm pl-8">650 Liters (Net)</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="material-icons-outlined text-primary">bolt</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Energy Class</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm pl-8">A+++ Efficiency</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="material-icons-outlined text-primary">straighten</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Dimensions</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm pl-8">912 x 1790 x 738 mm</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="material-icons-outlined text-primary">verified</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Warranty</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm pl-8">10 Years Compressor</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link href="/contact" className="flex-1 bg-primary hover:bg-[#a8c425] text-[#0b1121] font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 transform transition hover:-translate-y-1 flex justify-center items-center group">
                REQUEST A QUOTE
                <span className="material-icons-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <button className="flex-1 bg-white dark:bg-card-dark border-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex justify-center items-center">
                <span className="material-icons-outlined mr-2">download</span>
                Download Spec Sheet
              </button>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button 
                  className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-card-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left focus:outline-none" 
                  onClick={() => setOpenSection(openSection === 'logistics' ? null : 'logistics')}
                >
                  <span className="font-display font-semibold text-[#0b1121] dark:text-white flex items-center">
                    <span className="material-icons-outlined mr-3 text-primary">local_shipping</span>
                    Logistics &amp; Shipping Details
                  </span>
                  <span className={`material-icons-outlined text-gray-400 transform transition-transform ${openSection === 'logistics' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {openSection === 'logistics' && (
                  <div className="p-4 bg-white dark:bg-card-dark text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    <ul className="space-y-2 list-disc list-inside">
                      <li><strong>Minimum Order Quantity:</strong> 1 x 20ft Container (approx. 24 units)</li>
                      <li><strong>Port of Loading:</strong> Hamad Port, Qatar</li>
                      <li><strong>Lead Time:</strong> 15-20 days after confirmation</li>
                      <li><strong>Packaging:</strong> Reinforced export-grade carton with foam protection.</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button 
                  className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-card-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left focus:outline-none" 
                  onClick={() => setOpenSection(openSection === 'qa' ? null : 'qa')}
                >
                  <span className="font-display font-semibold text-[#0b1121] dark:text-white flex items-center">
                    <span className="material-icons-outlined mr-3 text-primary">security</span>
                    Quality Assurance
                  </span>
                  <span className={`material-icons-outlined text-gray-400 transform transition-transform ${openSection === 'qa' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {openSection === 'qa' && (
                  <div className="p-4 bg-white dark:bg-card-dark text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    <p className="mb-2">Every unit undergoes rigorous testing before shipment, ensuring reliability and performance.</p>
                    <div className="flex gap-3 mt-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">ISO 9001</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">CE Certified</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">RoHS</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-10">
          <h2 className="text-2xl font-display font-bold text-[#0b1121] dark:text-white mb-8">Related Products from Catalogue 2026</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 xl:aspect-w-7 xl:aspect-h-8">
                <img alt="Microwave" className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApTwd9fF4ycVzczEqECirgQ52qnnIsAYu0SFnb64uQhdlo7LqK0yKhtBT-A9El7NX1dOm8SLebGHGZI02snThxxRrhIwggjNMeATraJiWB_VQtkZciNh_AwHR7Y4SyrSQ-ujVXMTri0E8wSqpLACnMVRTUo6Q3RhGbDQyNLo7pGehFYl8s1tixHOsB62s2q_EpY2i7XnMID3JtYHOk2oucaTv7v_CuRgek2SIvllI1a9zuiAsmKg6kIdvSzRPQNm7dN0Nzlx82TcPs" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                  <Link href="/product">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    Digital Convection Oven
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Kitchen Essentials</p>
                <p className="mt-2 text-sm font-bold text-primary">View Details</p>
              </div>
            </div>
            <div className="group relative bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 xl:aspect-w-7 xl:aspect-h-8">
                <img alt="Washing Machine" className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiF3SPlR2aQEbYZFaleXDnFPaZ6siHUyFMortoVpBpGxgYkYkdXp7VyoV0shrCf0cBDH2cjCiNxGLV7M_k2cOiqFGmPogL9gVWV56axOaMDRDJpFvrr_Mm9T1l1Aosa1cj1Alv2WP9DhlJ6vth34TW9z9-vFNsvbYEo5KqY4DUjxt3EgLXN6ibZmh5_jgk48SzwZPzTtO17FJWTIbx6YWEo-VAO-gpsj8sMSwSSkwB4-PuSRls0NAIEVMNLnLnxWxZcYNXW0zZ5RWB" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                  <Link href="/product">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    Front Load Washer
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Laundry Series</p>
                <p className="mt-2 text-sm font-bold text-primary">View Details</p>
              </div>
            </div>
            <div className="group relative bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 xl:aspect-w-7 xl:aspect-h-8">
                <img alt="Small Appliance" className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3FmgDKoVeCU0xYlF1fD-4K81LvY4X2DWs-oDB5EYQ72GZDm3Iuf9wq2SL77u_UZedV26KDJMNWpwkbCGMe7cHUlpY2W7G2NwphcksblOHh88PFcTLVcrzifkVv-tlPvkRSTCYi1_Di53Ll40ECsELq9mPQpsmGYg8LpeVLZdiGWMi9lX30SnDAWlgy4NWhQKxSPLGUXHZyB6bk6dID8glTfkInYFHZgr9rroRTVioKerPPzH_9pP9ioELri7p4kk35LWGwPrv937r" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                  <Link href="/product">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    Pro Blender 5000
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Small Appliances</p>
                <p className="mt-2 text-sm font-bold text-primary">View Details</p>
              </div>
            </div>
            <div className="group relative bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 xl:aspect-w-7 xl:aspect-h-8">
                <img alt="Air Conditioner" className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo0L9cjCN8pq5Ct_PNOrhXe85EAbUTtYrM_ifY6mntC_PSrhxbdZQDI2a9oWaqELZPq1QNLXpAm03CF3qI80eJ0xXq4xZZl7iaJaYAkl8AdaTnOqa965Ja2bCzLgaOqfC7TQjhPm5zA6roZ9FPKS5OIttLAT4kWsERpjEs8eYhahLWUCEHHWyq_8CpBsvvxy3VkDOjLip67T3-QN48LWTKx-Bfyk2LjjgY7nNNj9W_6or_AqXsOHUt__xSYOG03vVfS_vQ1BD2KYJL" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                  <Link href="/product">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    Split AC Inverter
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Climate Control</p>
                <p className="mt-2 text-sm font-bold text-primary">View Details</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
