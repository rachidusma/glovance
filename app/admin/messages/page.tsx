"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") fetchMessages();
  }, [status]);

  const fetchMessages = async () => {
    const res = await fetch("/api/admin/messages");
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const markAsRead = async (msg: Message) => {
    if (!msg.isRead) {
      await fetch(`/api/admin/messages/${msg.id}`, { method: "PATCH" });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
      );
    }
    setSelected({ ...msg, isRead: true });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    setDeletingId(id);
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    setDeletingId(null);
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

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
        <AdminHeader
          title="Inbox"
          subtitle={`${messages.length} messages${unreadCount > 0 ? ` · ${unreadCount} unread` : ""}`}
        />
        <main className="flex-1 p-6">
          <div className="flex gap-6 h-full">
            {/* Message List */}
            <div className="w-96 flex-shrink-0 bg-[#112240] rounded-2xl border border-gray-800 overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Messages</span>
                {unreadCount > 0 && (
                  <span className="bg-primary text-[#0a192f] text-xs font-black px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="overflow-y-auto flex-1 divide-y divide-gray-800">
                {messages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <span className="material-icons-outlined text-4xl block mb-2">inbox</span>
                    No messages yet
                  </div>
                ) : (
                  messages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => markAsRead(msg)}
                      className={`w-full text-left px-4 py-4 hover:bg-white/5 transition ${
                        selected?.id === msg.id ? "bg-white/10" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {!msg.isRead && (
                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                          )}
                          <div className="min-w-0">
                            <p className={`text-sm truncate ${!msg.isRead ? "text-white font-semibold" : "text-gray-300"}`}>
                              {msg.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600 flex-shrink-0 mt-0.5">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate ps-4">
                        {msg.subject || "General Inquiry"} — {msg.message}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Message Detail */}
            <div className="flex-1 bg-[#112240] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
              {selected ? (
                <>
                  {/* Header */}
                  <div className="px-8 py-5 border-b border-gray-800 flex items-start justify-between">
                    <div>
                      <h2 className="text-white font-bold text-lg">{selected.subject || "General Inquiry"}</h2>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-sm text-gray-400">
                          From: <span className="text-white">{selected.name}</span>
                        </span>
                        <a
                          href={`mailto:${selected.email}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {selected.email}
                        </a>
                        {selected.phone && (
                          <span className="text-sm text-gray-400">
                            📞 {selected.phone}
                          </span>
                        )}
                        {selected.company && (
                          <span className="text-sm text-gray-400">
                            🏢 {selected.company}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(selected.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${selected.email}?subject=Re: ${selected.subject || "General Inquiry"}`}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-medium hover:bg-primary/20 transition"
                      >
                        <span className="material-icons-outlined text-base">reply</span>
                        Reply
                      </a>
                      <button
                        onClick={() => handleDelete(selected.id)}
                        disabled={deletingId === selected.id}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-medium hover:bg-red-500/20 transition disabled:opacity-50"
                      >
                        <span className="material-icons-outlined text-base">delete</span>
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 px-8 py-6 overflow-y-auto">
                    <div className="bg-[#0d1f3c] rounded-xl p-6 text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selected.message}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                  <span className="material-icons-outlined text-6xl mb-3">mark_email_read</span>
                  <p className="text-sm">Select a message to read it</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
