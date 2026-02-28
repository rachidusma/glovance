"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { i18n } from "@/i18n-config";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const languages = [
    { code: "en", label: "English", display: "EN" },
    { code: "fr", label: "Français", display: "FR" },
    { code: "ar", label: "العربية", display: "AR" },
  ];

  const currentLanguage = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-300 bg-transparent rounded-md hover:text-primary transition-colors focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="material-icons-outlined text-lg mr-1">language</span>
          {currentLanguage.display}
        </button>
      </div>

      {isOpen && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-primary/20"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={redirectedPathName(lang.code)}
                scroll={false}
                className={`block px-4 py-2 text-sm hover:bg-primary/20 hover:text-primary transition-colors ${
                  currentLang === lang.code ? "text-primary font-bold" : "text-gray-300"
                }`}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
