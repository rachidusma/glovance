"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProcessClient({ dict }: { dict: any }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .process-line {
              transition: width 1.5s ease-out;
          }
          .step-card {
              transition: all 0.3s ease;
          }
          .step-card:hover {
              transform: translateY(-5px);
          }
          .step-icon-wrapper::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
              border-radius: 9999px;
              border: 2px solid #A3D131;
              opacity: 0;
              animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          }
          @keyframes pulse-ring {
              0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
              50% { opacity: 0.5; }
              100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
          }
        `
      }} />
      <main className="relative overflow-hidden min-h-screen bg-background-light dark:bg-background-dark">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-multiply dark:mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-light dark:to-background-dark z-0 h-full w-full"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-display font-bold tracking-widest uppercase mb-3">
              {dict.badge}
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {dict.title_1} <span className="text-primary">{dict.title_2}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 font-light">
              {dict.desc}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-24 h-1 bg-primary mx-auto mt-8 rounded-full"></motion.div>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 rounded-full overflow-hidden">
              <div className="process-line w-full h-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 animate-pulse"></div>
            </div>
            <div className="lg:hidden absolute top-0 left-8 h-full w-1 bg-gray-200 dark:bg-gray-700 -translate-x-1/2 rounded-full"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="step-card group relative flex lg:flex-col items-center lg:items-center text-left lg:text-center">
                <div className="flex-shrink-0 relative z-10 mb-0 lg:mb-6 mr-6 lg:mr-0">
                  <div className="step-icon-wrapper w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white dark:bg-card-dark border-4 border-primary flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors duration-300">
                    <span className="material-icons-outlined text-3xl lg:text-4xl text-gray-800 dark:text-white group-hover:text-white">
                      handshake
                    </span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold text-sm shadow-md border-2 border-primary">
                    01
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-md border-t-4 border-primary w-full lg:min-h-[220px]">
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {dict.step1_title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {dict.step1_desc}
                  </p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="step-card group relative flex lg:flex-col items-center lg:items-center text-left lg:text-center lg:mt-16">
                <div className="flex-shrink-0 relative z-10 mb-0 lg:mb-6 mr-6 lg:mr-0">
                  <div className="step-icon-wrapper w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white dark:bg-card-dark border-4 border-primary flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors duration-300">
                    <span className="material-icons-outlined text-3xl lg:text-4xl text-gray-800 dark:text-white group-hover:text-white">
                      verified_user
                    </span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold text-sm shadow-md border-2 border-primary">
                    02
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-md border-t-4 border-primary w-full lg:min-h-[220px]">
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {dict.step2_title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {dict.step2_desc}
                  </p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="step-card group relative flex lg:flex-col items-center lg:items-center text-left lg:text-center">
                <div className="flex-shrink-0 relative z-10 mb-0 lg:mb-6 mr-6 lg:mr-0">
                  <div className="step-icon-wrapper w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white dark:bg-card-dark border-4 border-primary flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors duration-300">
                    <span className="material-icons-outlined text-3xl lg:text-4xl text-gray-800 dark:text-white group-hover:text-white">
                      local_shipping
                    </span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold text-sm shadow-md border-2 border-primary">
                    03
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-md border-t-4 border-primary w-full lg:min-h-[220px]">
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {dict.step3_title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {dict.step3_desc}
                  </p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="step-card group relative flex lg:flex-col items-center lg:items-center text-left lg:text-center lg:mt-16">
                <div className="flex-shrink-0 relative z-10 mb-0 lg:mb-6 mr-6 lg:mr-0">
                  <div className="step-icon-wrapper w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white dark:bg-card-dark border-4 border-primary flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors duration-300">
                    <span className="material-icons-outlined text-3xl lg:text-4xl text-gray-800 dark:text-white group-hover:text-white">
                      public
                    </span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold text-sm shadow-md border-2 border-primary">
                    04
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-md border-t-4 border-primary w-full lg:min-h-[220px]">
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {dict.step4_title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {dict.step4_desc}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-24 text-center">
            <div className="inline-flex items-center p-1 rounded-full bg-gray-100 dark:bg-card-dark border border-gray-200 dark:border-gray-700">
              <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                {dict.cta_text}
              </span>
              <Link
                className="px-6 py-2 bg-primary text-black font-bold rounded-full hover:bg-opacity-90 transition transform hover:-translate-y-0.5 shadow-lg flex items-center"
                href="/contact"
              >
                {dict.contact_btn} <span className="material-icons-outlined text-sm ml-2">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl transform translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-900 opacity-10 rounded-full blur-3xl transform -translate-x-1/2"></div>
      </main>
    </>
  );
}
