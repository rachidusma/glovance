"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function EditAdminPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // Leave blank unless they want to change it
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`/api/admin/admins/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({ name: data.name || "", email: data.email || "", password: "" });
        } else {
          setError("Failed to load admin data");
        }
      } catch (e) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!formData.email) {
      setError("Email is required.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/admins/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/admins");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to update admin");
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const isSelf = (session?.user as any)?.id === params.id;

  if (loading) {
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
        <AdminHeader title="Edit Admin" subtitle="Modify administrator account details" />
        <main className="flex-1 p-6">
          <div className="max-w-2xl bg-[#112240] rounded-2xl border border-gray-800 p-8 shadow-xl">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
                <span className="material-icons-outlined">error_outline</span>
                {error}
              </div>
            )}
            {isSelf && (
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-sm flex items-center gap-3">
                <span className="material-icons-outlined">info</span>
                You are editing your own account. For profile updates, consider using the Profile page instead.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Admin Name"
                  className="w-full bg-[#0a192f] border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-primary outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="admin@example.com"
                  className="w-full bg-[#0a192f] border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-primary outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password <span className="text-gray-500 text-xs font-normal">(Leave blank to keep current)</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#0a192f] border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-primary outline-none transition"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary text-[#0a192f] font-bold py-3.5 rounded-xl hover:bg-[#b5cc2e] transition disabled:opacity-50 shadow-lg shadow-primary/20"
                >
                  {saving ? "Saving..." : "Save Changes"}
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
