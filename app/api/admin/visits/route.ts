import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const count = await prisma.visit.count();

    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const visits = await prisma.visit.findMany({
      where: {
        createdAt: {
          gte: oneYearAgo,
        },
      },
      select: {
        createdAt: true,
        country: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const dailyData: Record<string, number> = {};
    const weeklyData: Record<string, number> = {};
    const monthlyData: Record<string, number> = {};
    const countryData: Record<string, number> = {};

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dailyData[d.toLocaleDateString('en-US', { weekday: 'short' })] = 0;
    }

    for (let i = 3; i >= 0; i--) {
      weeklyData[`Week ${4 - i}`] = 0;
    }

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      monthlyData[d.toLocaleDateString('en-US', { month: 'short' })] = 0;
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(now.getDate() - 28);

    visits.forEach((v: { createdAt: Date, country: string | null }) => {
      const date = new Date(v.createdAt);
      
      const countryName = v.country || "Unknown";
      countryData[countryName] = (countryData[countryName] || 0) + 1;
      
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      if (monthlyData[monthKey] !== undefined) {
        monthlyData[monthKey]++;
      }

      if (date >= fourWeeksAgo) {
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let weekIndex = 4 - Math.ceil(diffDays / 7);
        if(weekIndex < 1) weekIndex = 1;
        if(weekIndex > 4) weekIndex = 4;
        
        weeklyData[`Week ${weekIndex}`]++;
      }

      if (date >= sevenDaysAgo) {
        const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
        if (dailyData[dayKey] !== undefined) {
          dailyData[dayKey]++;
        }
      }
    });

    return NextResponse.json({
      count,
      chartData: {
        daily: Object.entries(dailyData).map(([name, visits]) => ({ name, visits })),
        weekly: Object.entries(weeklyData).map(([name, visits]) => ({ name, visits })),
        monthly: Object.entries(monthlyData).map(([name, visits]) => ({ name, visits })),
      },
      countries: Object.entries(countryData)
        .map(([name, visits]) => ({ name, visits }))
        .sort((a, b) => b.visits - a.visits) // Sort descending by visits
    });
  } catch (error) {
    console.error("Error fetching visits count:", error);
    return NextResponse.json({ error: "Failed to fetch visits count" }, { status: 500 });
  }
}
