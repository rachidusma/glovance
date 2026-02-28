"use client";

import { useSession } from "next-auth/react";

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
      <div className="flex items-center gap-3">
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
