"use client";

import { useEffect, useRef, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface ProductForm {
  nameEn: string; nameFr: string; nameAr: string;
  descEn: string; descFr: string; descAr: string;
  categoryId: string;
  images: string[];
  inStock: boolean;
}

const empty: ProductForm = {
  nameEn: "", nameFr: "", nameAr: "",
  descEn: "", descFr: "", descAr: "",
  categoryId: "", images: [],
  inStock: true,
};

export default function NewProductPage() {
  const { status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<ProductForm>(empty);
  const [categories, setCategories] = useState<Category[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") fetchCategories();
  }, [status]);

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data);
    if (data.length > 0) setForm((f) => ({ ...f, categoryId: data[0].id }));
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);

    const uploadedUrls: string[] = [];
    const newPreviews: string[] = [];

    for (const file of files) {
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const dataUrl = reader.result as string;
          newPreviews.push(dataUrl);
          try {
            const res = await fetch("/api/upload", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ dataUrl, folder: "glovance/products" }),
            });
            const data = await res.json();
            uploadedUrls.push(data.url);
          } catch {
            console.error("Failed to upload image");
          }
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    setPreviews((prev) => [...prev, ...newPreviews]);
    setForm((f) => ({ ...f, images: [...f.images, ...uploadedUrls] }));
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/products");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create product");
    }
    setLoading(false);
  };

  const set = (key: keyof ProductForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      <AdminSidebar />
      <div className="ml-64 flex-1 flex flex-col">
        <AdminHeader title="New Product" subtitle="Fill in all three languages" />
        <main className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{error}</div>
            )}

            {/* Category */}
            <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-white font-semibold mb-4">Category</h2>
              <select
                value={form.categoryId}
                onChange={set("categoryId")}
                required
                className="w-full bg-[#0a192f] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Images */}
            <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-white font-semibold mb-4">Product Images</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                {previews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-700">
                    <img src={src} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-gray-700 hover:border-primary transition flex flex-col items-center justify-center text-gray-500 hover:text-primary"
                >
                  <span className="material-icons-outlined text-2xl">add_photo_alternate</span>
                  <span className="text-xs mt-1">Add</span>
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImagesChange} />
              {uploading && (
                <p className="text-primary text-sm flex items-center gap-2">
                  <span className="animate-spin material-icons-outlined text-base">refresh</span>
                  Uploading images...
                </p>
              )}
            </div>

            {/* Names */}
            <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-white font-semibold mb-4">Product Name</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {([["nameEn", "English", "ltr"], ["nameFr", "French", "ltr"], ["nameAr", "Arabic", "rtl"]] as const).map(([key, lang, dir]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">{lang}</label>
                    <input value={form[key]} onChange={set(key)} required dir={dir} placeholder={lang === "Arabic" ? "اسم المنتج" : `Name in ${lang}`}
                      className="w-full bg-[#0a192f] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition" />
                  </div>
                ))}
              </div>
            </div>

            {/* Descriptions */}
            <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-white font-semibold mb-4">Description</h2>
              <div className="space-y-4">
                {([["descEn", "English", "ltr"], ["descFr", "French", "ltr"], ["descAr", "Arabic", "rtl"]] as const).map(([key, lang, dir]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">{lang}</label>
                    <textarea value={form[key]} onChange={set(key)} dir={dir} rows={3} placeholder={lang === "Arabic" ? "وصف المنتج" : `Description in ${lang}`}
                      className="w-full bg-[#0a192f] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition resize-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* inStock toggle */}
            <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <span className="material-icons-outlined text-primary">inventory_2</span>
                  Availability
                </h2>
                <p className="text-gray-400 text-sm mt-1">If turned off, product will show as "Out of stock"</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={form.inStock} onChange={(e) => setForm(f => ({ ...f, inStock: e.target.checked }))} />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-white/5 transition">Cancel</button>
              <button type="submit" disabled={loading || uploading}
                className="flex-1 bg-primary text-[#0a192f] font-bold py-3 rounded-xl hover:bg-[#b5cc2e] transition disabled:opacity-60">
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
