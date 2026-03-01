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
            <div className="flex items-center gap-2 mb-4">
              <span className="material-icons text-primary text-3xl">public</span>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wider leading-none">
                  {dict.brand_name}
                </span>
                <span className="text-primary text-[10px] tracking-[0.2em] font-medium leading-none">
                  {dict.brand_desc}
                </span>
              </div>
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
          <div className="flex space-x-4 mt-4 md:mt-0">
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
        </motion.div>
      </div>
    </footer>
  );
}
