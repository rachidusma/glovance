"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Admin {
  id: string;
  email: string;
  name: string | null;
}

export default function AdminsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/admins");
      const data = await res.json();
      if (Array.isArray(data)) {
        setAdmins(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the admin account "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAdmins((prev) => prev.filter((a) => a.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete admin");
      }
    } catch (e) {
      alert("An error occurred while deleting.");
    } finally {
      setDeletingId(null);
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
        <AdminHeader title="Admins Management" subtitle={`${admins.length} administrators`} />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-end mb-6">
            <Link
              href="/admin/admins/new"
              className="flex items-center gap-2 bg-primary text-[#0a192f] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b5cc2e] transition shadow-lg shadow-primary/20"
            >
              <span className="material-icons-outlined">add</span>
              New Admin
            </Link>
          </div>

          <div className="bg-[#112240] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider bg-black/20">
                  <th className="text-left px-6 py-4 font-semibold">Name</th>
                  <th className="text-left px-6 py-4 font-semibold">Email</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-right px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-[#0a192f] font-bold shadow-lg">
                          {(admin.name && admin.name.charAt(0).toUpperCase()) || admin.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium group-hover:text-primary transition-colors">{admin.name || "Unnamed Admin"}</p>
                          {(session?.user as any)?.id === admin.id && (
                            <p className="text-primary text-xs font-semibold tracking-wider uppercase mt-0.5">You</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {admin.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/admins/${admin.id}/edit`}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Edit"
                        >
                          <span className="material-icons-outlined text-[20px]">edit</span>
                        </Link>
                        {/* Cannot delete the currently logged in user from here */}
                        {(session?.user as any)?.id !== admin.id ? (
                          <button
                            onClick={() => handleDelete(admin.id, admin.name || admin.email)}
                            disabled={deletingId === admin.id}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                            title="Delete"
                          >
                            <span className="material-icons-outlined text-[20px]">delete_outline</span>
                          </button>
                        ) : (
                          <div className="w-[36px] h-[36px]"></div> /* Placeholder for alignment */
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {admins.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <span className="material-icons-outlined text-4xl mb-3 text-gray-700">admin_panel_settings</span>
                        <p>No admins found.</p>
                      </div>
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
