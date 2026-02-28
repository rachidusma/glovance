"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  imageUrl?: string;
  _count: { products: number };
  createdAt: string;
}

export default function CategoriesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") fetchCategories();
  }, [status]);

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This will also delete all its products.`)) return;
    setDeletingId(id);
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeletingId(null);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <span className="animate-spin material-icons-outlined text-primary text-4xl">refresh</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      <AdminSidebar />
      <div className="ml-64 flex-1 flex flex-col">
        <AdminHeader title="Categories" subtitle={`${categories.length} categories`} />
        <main className="flex-1 p-6">
          <div className="flex justify-end mb-6">
            <Link
              href="/admin/categories/new"
              className="flex items-center gap-2 bg-primary text-[#0a192f] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b5cc2e] transition"
            >
              <span className="material-icons-outlined">add</span>
              New Category
            </Link>
          </div>

          {categories.length === 0 ? (
            <div className="bg-[#112240] rounded-2xl border border-gray-800 p-12 text-center text-gray-500">
              No categories yet. Create the first one!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-[#112240] rounded-2xl border border-gray-800 overflow-hidden group hover:border-gray-600 transition"
                >
                  <div className="relative h-40 bg-[#0a192f]">
                    {cat.imageUrl ? (
                      <img src={cat.imageUrl} alt={cat.nameEn} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-icons-outlined text-gray-700 text-5xl">category</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112240] to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">
                        {cat._count.products} products
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg">{cat.nameEn}</h3>
                    <p className="text-gray-400 text-sm">{cat.nameFr} · {cat.nameAr}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                      <span className="text-gray-500 text-xs">
                        {new Date(cat.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/categories/${cat.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition"
                        >
                          <span className="material-icons-outlined text-base">edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(cat.id, cat.nameEn)}
                          disabled={deletingId === cat.id}
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                        >
                          <span className="material-icons-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
