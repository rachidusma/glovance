"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Subscriber {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminSubscribers() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
    if (status === "authenticated") {
      fetchSubscribers();
    }
  }, [status]);

  const fetchSubscribers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/subscribers");
      if (!res.ok) throw new Error("Failed to fetch subscribers");
      const data = await res.json();
      setSubscribers(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load subscribers.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscriber = async (id: string, currentStatus: boolean) => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (!res.ok) throw new Error("Failed to update status");
      
      setSubscribers(subscribers.map(sub => 
        sub.id === id ? { ...sub, isActive: !currentStatus } : sub
      ));
      setSuccess("Subscriber status updated.");
    } catch (e) {
      console.error(e);
      setError("Error updating subscriber.");
    }
  };

  const deleteSubscriber = async (id: string) => {
    setError("");
    setSuccess("");
    if (!confirm("Are you sure you want to permanently delete this subscriber?")) return;

    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete subscriber");
      
      setSubscribers(subscribers.filter(sub => sub.id !== id));
      setSuccess("Subscriber deleted.");
    } catch (e) {
      console.error(e);
      setError("Error deleting subscriber.");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen bg-[#0a192f]">
        <AdminSidebar />
        <div className="ml-64 flex-1 flex flex-col justify-center items-center">
          <span className="animate-spin material-icons-outlined text-primary text-4xl">refresh</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      <AdminSidebar />
      <div className="ml-64 flex-1 flex flex-col">
        <AdminHeader title="Subscribers" subtitle="Manage your newsletter subscribers" />
        <main className="flex-1 p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-400 text-sm">
              {success}
            </div>
          )}
          <div className="bg-[#112240] rounded-2xl border border-gray-800 p-6">
            {subscribers.length === 0 ? (
              <div className="text-center py-12">
                <span className="material-icons-outlined text-6xl text-gray-700 mb-4 block">people_outline</span>
                <h3 className="text-xl font-bold text-white mb-2">No subscribers yet</h3>
                <p className="text-gray-400">When someone subscribes via the footer, they will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800 text-sm text-gray-400">
                      <th className="pb-4 font-semibold px-4">Email</th>
                      <th className="pb-4 font-semibold px-4">Status</th>
                      <th className="pb-4 font-semibold px-4">Subscribed Date</th>
                      <th className="pb-4 font-semibold px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-sm">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-white/5 transition group">
                        <td className="py-4 px-4">
                          <span className="text-white font-medium">{sub.email}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            sub.isActive ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sub.isActive ? "bg-green-400" : "bg-red-400"}`}></span>
                            {sub.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-400">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => toggleSubscriber(sub.id, sub.isActive)}
                              className="w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 flex items-center justify-center transition"
                              title={sub.isActive ? "Deactivate" : "Activate"}
                            >
                              <span className="material-icons-outlined text-sm">
                                {sub.isActive ? "block" : "check_circle"}
                              </span>
                            </button>
                            <button
                              onClick={() => deleteSubscriber(sub.id)}
                              className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:text-white hover:bg-red-500 flex items-center justify-center transition"
                              title="Delete permanently"
                            >
                              <span className="material-icons-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
