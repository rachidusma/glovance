import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    
    // Extract the first IP if it's a comma-separated list
    let ip = "unknown";
    if (forwardedFor) {
      ip = forwardedFor.split(',')[0].trim();
    } else if (realIp) {
      ip = realIp;
    }

    const userAgent = request.headers.get("user-agent") || "unknown";
    const vercelCountry = request.headers.get("x-vercel-ip-country");
    let country = "Unknown";

    console.log("Visit tracking info:", { ip, vercelCountry, userAgent });

    if (vercelCountry) {
      country = vercelCountry;
    } else if (ip && ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
      try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        console.log("IP API response:", data);
        if (data.status === "success" && data.country) {
          country = data.country;
        }
      } catch (err) {
        console.error("Failed to fetch country from IP:", err);
      }
    } else if (ip === "127.0.0.1" || ip === "::1" || ip === "localhost") {
      country = "Localhost";
    }
    
    await prisma.visit.create({
      data: {
        ip,
        userAgent,
        country,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating visit:", error);
    return NextResponse.json({ error: "Failed to record visit" }, { status: 500 });
  }
}
