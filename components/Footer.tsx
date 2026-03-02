"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer({ dict, currentLang }: { dict: any; currentLang: string }) {
  return (
    <footer className="bg-[#0b1221] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <Link href={`/${currentLang}`} className="flex items-center gap-2">
                <img 
                  src="/logo.png" 
                  alt="Glovance Trading Logo" 
                  className="h-16 w-auto object-contain" 
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {dict.description}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{dict.quick_links}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link className="hover:text-primary transition-colors" href={`/${currentLang}/about`}>
                  {dict.about}
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={`/${currentLang}/process`}>
                  {dict.process}
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href={`/${currentLang}/products`}>
                  {dict.products}
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#">
                  {dict.privacy}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{dict.stay_updated}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {dict.newsletter_desc}
            </p>
            <div className="flex">
              <input
                className="bg-gray-800 text-white text-sm border-none rounded-l-md focus:ring-1 focus:ring-primary w-full px-4 py-2 outline-none"
                placeholder={dict.email_placeholder}
                type="email"
              />
              <button className="bg-primary text-secondary font-bold px-4 py-2 rounded-r-md hover:bg-white transition-colors">
                {dict.ok}
              </button>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            {dict.copyright}
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex space-x-3 me-2">
              <a
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-primary hover:border-primary hover:text-secondary transition-all"
                href="https://www.facebook.com/share/1CMEnrebE2/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-primary hover:border-primary hover:text-secondary transition-all"
                href="https://www.instagram.com/glovance_trading1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"/><circle cx="16.806" cy="7.207" r="1.078"/><path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.952-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"/></svg>
              </a>
              <a
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-primary hover:border-primary hover:text-secondary transition-all"
                href="https://www.tiktok.com/@glovance.trading?_r=1&_t=ZS-94Le802quua"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.26 6.32 6.33 6.33 0 0 0 6.31-6.24v-5.92a8.08 8.08 0 0 0 4.38 1.2V7.63a4.96 4.96 0 0 1-2.36-.94z"/></svg>
              </a>
            </div>
            
            <div className="flex space-x-4">
              <span className="flex items-center text-gray-500 text-sm gap-1">
                <span className="material-icons text-sm text-primary">
                  verified
                </span>{" "}
                {dict.quality}
              </span>
              <span className="flex items-center text-gray-500 text-sm gap-1">
                <span className="material-icons text-sm text-primary">
                  handshake
                </span>{" "}
                {dict.reliability}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
