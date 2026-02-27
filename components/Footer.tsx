import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1221] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-icons text-primary text-3xl">public</span>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wider leading-none">
                  GLOVANCE
                </span>
                <span className="text-primary text-[10px] tracking-[0.2em] font-medium leading-none">
                  TRADING
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting Qatar to the world. We specialize in the import and
              export of household appliances, pottery, fruits, dates, and
              everyday consumer goods.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link className="hover:text-primary transition-colors" href="/about">
                  About Company
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/process">
                  Our Process
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/products">
                  Product Catalogue 2026
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest product updates.
            </p>
            <div className="flex">
              <input
                className="bg-gray-800 text-white text-sm border-none rounded-l focus:ring-1 focus:ring-primary w-full px-4 py-2"
                placeholder="Your email"
                type="email"
              />
              <button className="bg-primary text-secondary font-bold px-4 py-2 rounded-r hover:bg-white transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 Glovance Trading. All rights reserved. Designed for Excellence.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="flex items-center text-gray-500 text-sm gap-1">
              <span className="material-icons text-sm text-primary">
                verified
              </span>{" "}
              Quality
            </span>
            <span className="flex items-center text-gray-500 text-sm gap-1">
              <span className="material-icons text-sm text-primary">
                handshake
              </span>{" "}
              Reliability
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
