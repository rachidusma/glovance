"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-bold text-white">{title}</h1>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 mr-2">
          <Link href="/admin/categories/new" className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm hover:bg-primary/20 transition">
            <span className="material-icons-outlined text-[18px]">add</span> Category
          </Link>
          <Link href="/admin/products/new" className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm hover:bg-primary/20 transition">
            <span className="material-icons-outlined text-[18px]">add</span> Product
          </Link>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-white">{session?.user?.name}</p>
          <p className="text-xs text-primary font-semibold">Administrator</p>
        </div>
        <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-[#0a192f] font-bold text-sm">
          {session?.user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
}
