"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactClient({ dict }: { dict: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .map-container iframe {
              filter: grayscale(100%) invert(90%) contrast(85%);
          }
          .dark .map-container iframe {
              filter: grayscale(100%) invert(10%) contrast(85%);
          }
        `
      }} />
      <div className="relative bg-[#0D1B2A] pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="Global logistics network background" className="w-full h-full object-cover opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI3ILfydM0ASQw-RlWSYqrUgO8y8juQMM0KLZbulHZB72oCbLRMrdnwukF25pP3tiJk9JT1b-DOol-VLWmgjQjffGZlC_49VGOhZ0G4AqJM9g69jqLiqeFCDmVz00xDuK7LiJQPbXmDdYVh2Yd-QdUws1w2XiTht91oQha6jWRRF72Ta7sALfar-1zoTshLAtxs-xyDO5yFmSPVFfFHiVlY6vvgixhjWcUOUPiQE0T8WP8eXWxwj3ki92zCc-NLHt1Bs4RS-POeqIs" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/90 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            {dict.title_1} <span className="text-primary">{dict.title_2}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl text-xl text-gray-300">
            {dict.desc}
          </motion.p>
        </div>
      </div>
      <div className="relative -mt-12 z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-card-dark rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-2/5 bg-[#0D1B2A] text-white p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary rounded-full opacity-10 pointer-events-none"></div>
              <div className="absolute top-10 right-10 w-20 h-20 border-4 border-primary/20 rounded-full pointer-events-none"></div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                {dict.get_in_touch}
                <span className="h-1 w-12 bg-primary ms-4 inline-block"></span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-[#0D1B2A] transition-colors duration-300">
                    <span className="material-icons text-2xl">location_on</span>
                  </div>
                  <div className="ms-4">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">{dict.hq}</p>
                    <p className="text-gray-300 leading-relaxed">
                      {dict.address_l1}<br />
                      {dict.address_l2}<br />
                      {dict.address_l3}
                    </p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-[#0D1B2A] transition-colors duration-300">
                    <span className="material-icons text-2xl">phone</span>
                  </div>
                  <div className="ms-4">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">{dict.phone}</p>
                    <p className="text-gray-300">+97477198295</p>
                    <p className="text-gray-400 text-sm mt-1">{dict.hours}</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-[#0D1B2A] transition-colors duration-300">
                    <span className="material-icons text-2xl">email</span>
                  </div>
                  <div className="ms-4">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">{dict.email}</p>
                    <p className="text-gray-300">Glovance.trading@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <p className="text-sm font-medium text-gray-400 mb-4">{dict.connect}</p>
                <div className="flex space-x-4">
                  <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-[#0D1B2A] transition-all" href="#">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                  </a>
                  <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-[#0D1B2A] transition-all" href="#">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:w-3/5 p-10 lg:p-12 bg-white dark:bg-card-dark">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{dict.send_msg}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">{dict.form_name}</label>
                    <input className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="name" name="name" placeholder={dict.form_name_ph} type="text" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="company">{dict.form_company}</label>
                    <input className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="company" name="company" placeholder={dict.form_company_ph} type="text" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">{dict.form_email}</label>
                    <input className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="email" name="email" placeholder={dict.form_email_ph} type="email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="phone">{dict.form_phone}</label>
                    <input className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="phone" name="phone" placeholder={dict.form_phone_ph} type="tel" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="subject">{dict.form_subject}</label>
                  <select className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="subject" name="subject" defaultValue="General Inquiry">
                    <option value="General Inquiry">{dict.subj_1}</option>
                    <option value="Import/Export Service">{dict.subj_2}</option>
                    <option value="Distribution Partnership">{dict.subj_3}</option>
                    <option value="Product Information">{dict.subj_4}</option>
                    <option value="Other">{dict.subj_5}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">{dict.form_message}</label>
                  <textarea className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="message" name="message" placeholder={dict.form_message_ph} rows={4} required></textarea>
                </div>
                
                {submitStatus === "success" && (
                  <div className="p-4 rounded-lg bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 flex items-center">
                    <span className="material-icons-outlined me-2">check_circle</span>
                    Message sent successfully!
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="p-4 rounded-lg bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center">
                    <span className="material-icons-outlined me-2">error_outline</span>
                    Failed to send message. Please try again.
                  </div>
                )}

                <div className="pt-4">
                  <button 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-primary text-[#0D1B2A] font-bold text-base rounded shadow hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70" 
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>{dict.btn_send}</span>
                        <span className="material-icons text-sm">send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <section className="py-10 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{dict.location}</h3>
            <div className="h-1 w-16 bg-primary mx-auto mt-2 rounded"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full h-96 bg-gray-300 dark:bg-gray-800 rounded-xl overflow-hidden shadow-inner map-container relative">
            <iframe allowFullScreen height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.0970347856!2d51.4429994625!3d25.285447299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x4419e918974a67af!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus" style={{ border: 0 }} width="100%">
            </iframe>
            <div className="absolute top-4 right-4 bg-white dark:bg-card-dark p-4 rounded shadow-lg max-w-xs hidden sm:block">
              <p className="text-xs font-bold text-gray-500 uppercase">{dict.office_hours_title}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{dict.office_hours_1}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{dict.office_hours_2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/97477198295"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute right-full me-4 bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          Chat with us!
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          fill="currentColor" 
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </>
  );
}
