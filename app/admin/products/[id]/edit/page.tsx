"use client";

import { useEffect, useRef, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

interface Category {
  id: string;
  nameEn: string;
}

interface ProductForm {
  nameEn: string; nameFr: string; nameAr: string;
  descEn: string; descFr: string; descAr: string;
  categoryId: string;
  images: string[];
}

export default function EditProductPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<ProductForm>({
    nameEn: "", nameFr: "", nameAr: "",
    descEn: "", descFr: "", descAr: "",
    categoryId: "", images: [],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") fetchData();
  }, [status]);

  const fetchData = async () => {
    const [prodRes, catRes] = await Promise.all([
      fetch(`/api/admin/products/${id}`),
      fetch("/api/admin/categories"),
    ]);
    const [prod, cats] = await Promise.all([prodRes.json(), catRes.json()]);
    setCategories(cats);
    setForm({
      nameEn: prod.nameEn || "",
      nameFr: prod.nameFr || "",
      nameAr: prod.nameAr || "",
      descEn: prod.descEn || "",
      descFr: prod.descFr || "",
      descAr: prod.descAr || "",
      categoryId: prod.categoryId || "",
      images: prod.images || [],
    });
    setPreviews(prod.images || []);
    setLoading(false);
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
            console.error("Upload failed");
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
    setSaving(true);
    setError("");
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/products");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update product");
    }
    setSaving(false);
  };

  const set = (key: keyof ProductForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

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
        <AdminHeader title="Edit Product" subtitle="Update product in all languages" />
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
                  <option key={c.id} value={c.id}>{c.nameEn}</option>
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
                {([ ["nameEn", "English", "ltr"], ["nameFr", "French", "ltr"], ["nameAr", "Arabic", "rtl"] ] as const).map(([key, lang, dir]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">{lang}</label>
                    <input value={form[key]} onChange={set(key)} required dir={dir}
                      placeholder={lang === "Arabic" ? "اسم المنتج" : `Name in ${lang}`}
                      className="w-full bg-[#0a192f] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Descriptions */}
            <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-white font-semibold mb-4">Description</h2>
              <div className="space-y-4">
                {([ ["descEn", "English", "ltr"], ["descFr", "French", "ltr"], ["descAr", "Arabic", "rtl"] ] as const).map(([key, lang, dir]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">{lang}</label>
                    <textarea value={form[key]} onChange={set(key)} dir={dir} rows={3}
                      placeholder={lang === "Arabic" ? "وصف المنتج" : `Description in ${lang}`}
                      className="w-full bg-[#0a192f] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-white/5 transition">
                Cancel
              </button>
              <button type="submit" disabled={saving || uploading}
                className="flex-1 bg-primary text-[#0a192f] font-bold py-3 rounded-xl hover:bg-[#b5cc2e] transition disabled:opacity-60">
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
