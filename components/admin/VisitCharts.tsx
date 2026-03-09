"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface ChartData {
  daily: { name: string; visits: number }[];
  weekly: { name: string; visits: number }[];
  monthly: { name: string; visits: number }[];
}

interface VisitChartsProps {
  data: ChartData | null;
}

export default function VisitCharts({ data }: VisitChartsProps) {
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");

  if (!data) return null;

  const currentData = data[view];

  return (
    <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800 col-span-1 lg:col-span-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="material-icons-outlined text-blue-400">visibility</span>
          Visits Overview
        </h2>
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
                view === v
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-[#0a192f] text-gray-400 border border-gray-800 hover:border-gray-600"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#112240",
                border: "1px solid #374151",
                borderRadius: "0.5rem",
                color: "#f3f4f6"
              }}
              itemStyle={{ color: "#60a5fa" }}
            />
            <Area
              type="monotone"
              dataKey="visits"
              stroke="#60a5fa"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVisits)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
