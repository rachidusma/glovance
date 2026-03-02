"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!data.email || !data.password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/admins");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to create admin");
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      <AdminSidebar />
      <div className="ml-64 flex-1 flex flex-col">
        <AdminHeader title="New Admin" subtitle="Create a new administrator account" />
        <main className="flex-1 p-6">
          <div className="max-w-2xl bg-[#112240] rounded-2xl border border-gray-800 p-8 shadow-xl">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
                <span className="material-icons-outlined">error_outline</span>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Admin Name"
                  className="w-full bg-[#0a192f] border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-primary outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="admin@example.com"
                  className="w-full bg-[#0a192f] border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-primary outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#0a192f] border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-primary outline-none transition"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-[#0a192f] font-bold py-3.5 rounded-xl hover:bg-[#b5cc2e] transition disabled:opacity-50 shadow-lg shadow-primary/20"
                >
                  {loading ? "Creating..." : "Create Admin"}
                </button>
                <Link
                  href="/admin/admins"
                  className="flex-1 border border-gray-700 text-white font-bold py-3.5 rounded-xl hover:bg-white/5 transition text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
