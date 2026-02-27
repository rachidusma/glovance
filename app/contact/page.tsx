export default function Contact() {
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
      <div className="relative bg-[#0D1B2A] py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="Global logistics network background" className="w-full h-full object-cover opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI3ILfydM0ASQw-RlWSYqrUgO8y8juQMM0KLZbulHZB72oCbLRMrdnwukF25pP3tiJk9JT1b-DOol-VLWmgjQjffGZlC_49VGOhZ0G4AqJM9g69jqLiqeFCDmVz00xDuK7LiJQPbXmDdYVh2Yd-QdUws1w2XiTht91oQha6jWRRF72Ta7sALfar-1zoTshLAtxs-xyDO5yFmSPVFfFHiVlY6vvgixhjWcUOUPiQE0T8WP8eXWxwj3ki92zCc-NLHt1Bs4RS-POeqIs" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/90 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Let's Build <span className="text-primary">Bridges</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-300">
            Connecting Qatar to the world. Reach out to our team for import, export, and distribution inquiries.
          </p>
        </div>
      </div>
      <div className="relative -mt-12 z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-card-dark rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-[#0D1B2A] text-white p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary rounded-full opacity-10 pointer-events-none"></div>
              <div className="absolute top-10 right-10 w-20 h-20 border-4 border-primary/20 rounded-full pointer-events-none"></div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                Get in Touch
                <span className="h-1 w-12 bg-primary ml-4 inline-block"></span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-[#0D1B2A] transition-colors duration-300">
                    <span className="material-icons text-2xl">location_on</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Headquarters</p>
                    <p className="text-gray-300 leading-relaxed">
                      Glovance Trading Tower,<br />
                      West Bay Business District,<br />
                      Doha, Qatar
                    </p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-[#0D1B2A] transition-colors duration-300">
                    <span className="material-icons text-2xl">phone</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-gray-300">+974 4400 1234</p>
                    <p className="text-gray-400 text-sm mt-1">Mon-Fri, 8am - 5pm AST</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-[#0D1B2A] transition-colors duration-300">
                    <span className="material-icons text-2xl">email</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Email</p>
                    <p className="text-gray-300">info@glovancetrading.com</p>
                    <p className="text-gray-300">sales@glovancetrading.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <p className="text-sm font-medium text-gray-400 mb-4">CONNECT WITH US</p>
                <div className="flex space-x-4">
                  <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-[#0D1B2A] transition-all" href="#">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                  </a>
                  <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-[#0D1B2A] transition-all" href="#">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:w-3/5 p-10 lg:p-12 bg-white dark:bg-card-dark">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
              <form action="#" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Full Name</label>
                    <input className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="name" name="name" placeholder="John Doe" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="company">Company Name</label>
                    <input className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="company" name="company" placeholder="Glovance Ltd." type="text" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email Address</label>
                    <input className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="email" name="email" placeholder="john@example.com" type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="phone">Phone Number</label>
                    <input className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="phone" name="phone" placeholder="+974 ..." type="tel" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="subject">Subject</label>
                  <select className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="subject" name="subject" defaultValue="General Inquiry">
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Import/Export Service">Import/Export Service</option>
                    <option value="Distribution Partnership">Distribution Partnership</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">Message</label>
                  <textarea className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-background-dark dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-3 px-4" id="message" name="message" placeholder="How can we help you?" rows={4}></textarea>
                </div>
                <div className="pt-4">
                  <button className="w-full sm:w-auto px-8 py-3 bg-primary text-[#0D1B2A] font-bold text-base rounded shadow hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2" type="submit">
                    <span>SEND MESSAGE</span>
                    <span className="material-icons text-sm">send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <section className="py-10 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Location</h3>
            <div className="h-1 w-16 bg-primary mx-auto mt-2 rounded"></div>
          </div>
          <div className="w-full h-96 bg-gray-300 dark:bg-gray-800 rounded-xl overflow-hidden shadow-inner map-container relative">
            <iframe allowFullScreen height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.0970347856!2d51.4429994625!3d25.285447299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x4419e918974a67af!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus" style={{ border: 0 }} width="100%">
            </iframe>
            <div className="absolute top-4 right-4 bg-white dark:bg-card-dark p-4 rounded shadow-lg max-w-xs hidden sm:block">
              <p className="text-xs font-bold text-gray-500 uppercase">Office Hours</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">Sun - Thu: 08:00 - 17:00</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Closed on Fridays</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
