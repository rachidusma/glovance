"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { status, update } = useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // Leave blank unless they want to change it
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/admin/profile`);
      if (res.ok) {
        const data = await res.json();
        setFormData({ name: data.name || "", email: data.email || "", password: "" });
      } else {
        setError("Failed to load profile data");
      }
    } catch (e) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    if (!formData.email) {
      setError("Email is required.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        // Force the session to update if the email changed, as next-auth relies on the email in JWT
        // We will call the NextAuth update method here to refresh the session token without full sign-in
        await update();
        setFormData((prev) => ({ ...prev, password: "" })); // Clear password field
      } else {
        const err = await res.json();
        setError(err.error || "Failed to update profile");
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
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
        <AdminHeader title="My Profile" subtitle="Manage your account settings" />
        <main className="flex-1 p-6">
          <div className="max-w-2xl bg-[#112240] rounded-2xl border border-gray-800 p-8 shadow-xl">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
                <span className="material-icons-outlined">error_outline</span>
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-3">
                <span className="material-icons-outlined">check_circle</span>
                Profile updated successfully.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
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

              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-white font-medium mb-4">Change Password</h3>
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
                  <p className="text-xs text-gray-500 mt-2">
                    If you change your password, you may be required to log in again on your next visit.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary text-[#0a192f] font-bold py-3.5 px-8 rounded-xl hover:bg-[#b5cc2e] transition disabled:opacity-50 shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="animate-spin material-icons-outlined text-sm">refresh</span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
