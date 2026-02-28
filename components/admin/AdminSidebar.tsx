"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Users", href: "/admin/users", icon: "people" },
  { label: "Categories", href: "/admin/categories", icon: "category" },
  { label: "Products", href: "/admin/products", icon: "inventory_2" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0d1f3c] border-r border-gray-800 flex flex-col min-h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-xl font-black text-[#0a192f]">G</span>
          </div>
          <div>
            <p className="font-bold text-white text-sm">GLOVANCE</p>
            <p className="text-xs text-primary font-semibold tracking-widest">ADMIN</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-[#0a192f] shadow-md shadow-primary/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-icons-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition"
        >
          <span className="material-icons-outlined text-xl">open_in_new</span>
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
        >
          <span className="material-icons-outlined text-xl">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
