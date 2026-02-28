"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  images: string[];
  category: { id: string; nameEn: string };
  createdAt: string;
}

interface Category {
  id: string;
  nameEn: string;
}

export default function ProductsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    const [prodRes, catRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/categories"),
    ]);
    const [prods, cats] = await Promise.all([prodRes.json(), catRes.json()]);
    setProducts(prods);
    setCategories(cats);
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeletingId(id);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  };

  const filtered = filter
    ? products.filter((p) => p.category.id === filter)
    : products;

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
        <AdminHeader title="Products" subtitle={`${filtered.length} products`} />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6 gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#112240] border border-gray-700 text-gray-300 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none transition"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.nameEn}</option>
              ))}
            </select>
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 bg-primary text-[#0a192f] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b5cc2e] transition"
            >
              <span className="material-icons-outlined">add</span>
              New Product
            </Link>
          </div>

          <div className="bg-[#112240] rounded-2xl border border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-4">Product</th>
                  <th className="text-left px-6 py-4">Category</th>
                  <th className="text-left px-6 py-4">Images</th>
                  <th className="text-left px-6 py-4">Added</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images[0] ? (
                          <img src={product.images[0]} alt={product.nameEn} className="w-10 h-10 rounded-lg object-cover border border-gray-700" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                            <span className="material-icons-outlined text-gray-600 text-base">image</span>
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium">{product.nameEn}</p>
                          <p className="text-gray-500 text-xs">{product.nameFr} · {product.nameAr}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
                        {product.category.nameEn}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {product.images.length} image{product.images.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition"
                        >
                          <span className="material-icons-outlined text-base">edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.nameEn)}
                          disabled={deletingId === product.id}
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                        >
                          <span className="material-icons-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No products found.{" "}
                      <Link href="/admin/products/new" className="text-primary hover:underline">
                        Create one
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
