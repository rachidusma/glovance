"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Process", href: "/process" },
  ];

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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
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
              onClick={() => setIsOpen(!isOpen)}
              className="bg-secondary p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors"
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <span className="material-icons-outlined">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondary/95 dark:bg-background-dark/95 backdrop-blur-md shadow-lg border-b border-primary/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-primary text-secondary hover:bg-white block px-3 py-2 rounded-md text-base font-bold uppercase tracking-wider transition-colors mt-4 text-center"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
