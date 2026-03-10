"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import VisitCharts from "@/components/admin/VisitCharts";
import VisitCountries from "@/components/admin/VisitCountries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Stats {
  categories: number;
  products: number;
  messages: number;
  unreadMessages: number;
  subscribers: number;
  visits: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ categories: 0, products: 0, messages: 0, unreadMessages: 0, subscribers: 0, visits: 0 });
  const [chartData, setChartData] = useState<any>(null);
  const [countriesData, setCountriesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
    if (status === "authenticated") {
      fetchStats();
    }
  }, [status]);

  const fetchStats = async () => {
    try {
      const [catRes, prodRes, msgRes, subRes, visitRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/products"),
        fetch("/api/admin/messages"),
        fetch("/api/admin/subscribers"),
        fetch("/api/admin/visits"),
      ]);
      const [categories, products, messages, subscribers, visits] = await Promise.all([
        catRes.json(),
        prodRes.json(),
        msgRes.json(),
        subRes.json(),
        visitRes.json(),
      ]);
      setStats({
        categories: categories.length,
        products: products.length,
        messages: Array.isArray(messages) ? messages.length : 0,
        unreadMessages: Array.isArray(messages) ? messages.filter((m: any) => !m.isRead).length : 0,
        subscribers: Array.isArray(subscribers) ? subscribers.length : 0,
        visits: visits.count || 0,
      });
      setChartData(visits.chartData || null);
      setCountriesData(visits.countries || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <span className="animate-spin material-icons-outlined text-primary text-4xl">refresh</span>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  const statCards = [
    { label: "Categories", value: stats.categories, icon: "category", color: "text-purple-400", href: "/admin/categories" },
    { label: "Products", value: stats.products, icon: "inventory_2", color: "text-primary", href: "/admin/products" },
    { label: "Messages", value: stats.messages, badge: stats.unreadMessages, icon: "inbox", color: "text-orange-400", href: "/admin/messages" },
    { label: "Subscribers", value: stats.subscribers, icon: "people", color: "text-green-400", href: "/admin/subscribers" },
    { label: "Visits", value: stats.visits, icon: "visibility", color: "text-blue-400", href: "#" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      <AdminSidebar />
      <div className="ml-64 flex-1 flex flex-col">
        <AdminHeader title="Dashboard" subtitle="Overview of your content" />
        <main className="flex-1 p-6 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="bg-[#112240] rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`material-icons-outlined text-3xl ${card.color}`}>{card.icon}</span>
                  <div className="flex items-center gap-2">
                    {(card as any).badge > 0 && (
                      <span className="bg-primary text-[#0a192f] text-xs font-black px-2 py-0.5 rounded-full">
                        {(card as any).badge} new
                      </span>
                    )}
                    <span className="material-icons-outlined text-gray-700 group-hover:text-gray-500 transition">arrow_forward</span>
                  </div>
                </div>
                <p className="text-4xl font-bold text-white">{loading ? "—" : card.value}</p>
                <p className="text-gray-400 text-sm mt-1">{card.label}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <VisitCharts data={chartData} />

            {/* Quick Actions */}
            <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800 flex flex-col justify-center gap-4 col-span-1">
              <h2 className="text-white font-semibold mb-2">Quick Actions</h2>
              <Link
                href="/admin/categories/new"
                className="flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl text-primary hover:bg-primary/20 transition"
              >
                <span className="material-icons-outlined">add_circle</span>
                New Category
              </Link>
              <Link
                href="/admin/products/new"
                className="flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl text-primary hover:bg-primary/20 transition"
              >
                <span className="material-icons-outlined">add_circle</span>
                New Product
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <VisitCountries data={countriesData} />
          </div>
        </main>
      </div>
    </div>
  );
}
