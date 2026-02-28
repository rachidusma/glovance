"use client";

import { useEffect, useRef, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

interface CategoryForm {
  nameEn: string; nameFr: string; nameAr: string;
  descEn: string; descFr: string; descAr: string;
  imageUrl: string;
}

const empty: CategoryForm = {
  nameEn: "", nameFr: "", nameAr: "",
  descEn: "", descFr: "", descAr: "",
  imageUrl: "",
};

interface Props { params: { id?: string } }

export default function CategoryFormPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const isEdit = !!id;

  const [form, setForm] = useState<CategoryForm>(empty);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated" && isEdit) fetchCategory();
  }, [status]);

  const fetchCategory = async () => {
    const res = await fetch(`/api/admin/categories/${id}`);
    const data = await res.json();
    setForm({
      nameEn: data.nameEn || "", nameFr: data.nameFr || "", nameAr: data.nameAr || "",
      descEn: data.descEn || "", descFr: data.descFr || "", descAr: data.descAr || "",
      imageUrl: data.imageUrl || "",
    });
    if (data.imageUrl) setPreview(data.imageUrl);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dataUrl, folder: "glovance/categories" }),
        });
        const data = await res.json();
        setForm((f) => ({ ...f, imageUrl: data.url }));
      } catch {
        setError("Image upload failed");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(
      isEdit ? `/api/admin/categories/${id}` : "/api/admin/categories",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      router.push("/admin/categories");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save category");
    }
    setLoading(false);
  };

  const set = (key: keyof CategoryForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      <AdminSidebar />
      <div className="ml-64 flex-1 flex flex-col">
        <AdminHeader
          title={isEdit ? "Edit Category" : "New Category"}
          subtitle="Fill in all three languages"
        />
        <main className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{error}</div>
            )}

            {/* Image Upload */}
            <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-white font-semibold mb-4">Category Image</h2>
              <div
                onClick={() => fileRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-gray-700 hover:border-primary rounded-xl overflow-hidden transition relative"
                style={{ height: 200 }}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <span className="material-icons-outlined text-5xl mb-2">add_photo_alternate</span>
                    <p className="text-sm">Click to upload image</p>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="animate-spin material-icons-outlined text-primary text-3xl">refresh</span>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            {/* Names */}
            <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-white font-semibold mb-4">Category Name</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {([["nameEn", "English", "ltr"], ["nameFr", "French", "ltr"], ["nameAr", "Arabic", "rtl"]] as const).map(([key, lang, dir]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">{lang}</label>
                    <input
                      value={form[key]}
                      onChange={set(key)}
                      required
                      dir={dir}
                      placeholder={lang === "Arabic" ? "أدخل الاسم" : `Name in ${lang}`}
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
                {([["descEn", "English", "ltr"], ["descFr", "French", "ltr"], ["descAr", "Arabic", "rtl"]] as const).map(([key, lang, dir]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">{lang}</label>
                    <textarea
                      value={form[key]}
                      onChange={set(key)}
                      dir={dir}
                      rows={3}
                      placeholder={lang === "Arabic" ? "أدخل الوصف" : `Description in ${lang}`}
                      className="w-full bg-[#0a192f] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-white/5 transition">
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
                className="flex-1 bg-primary text-[#0a192f] font-bold py-3 rounded-xl hover:bg-[#b5cc2e] transition disabled:opacity-60"
              >
                {loading ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
