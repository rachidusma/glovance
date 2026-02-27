import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-secondary/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex items-center justify-center bg-transparent border-2 border-primary rounded-full">
                <span className="material-icons-outlined text-primary text-2xl transform -rotate-45">
                  flight_takeoff
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-wide text-white uppercase leading-none">
                  Glovance
                </span>
                <span className="font-sans text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                  Trading
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                className="text-white hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider"
                href="/about"
              >
                About
              </Link>
              <Link
                className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider"
                href="/products"
              >
                Products
              </Link>
              <Link
                className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider"
                href="/process"
              >
                Process
              </Link>
              <Link
                className="bg-primary text-secondary hover:bg-white px-5 py-2 rounded-md text-sm font-bold transition-all uppercase tracking-wider shadow-lg transform hover:-translate-y-0.5"
                href="/contact"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              className="bg-secondary p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              type="button"
            >
              <span className="sr-only">Open main menu</span>
              <span className="material-icons-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
