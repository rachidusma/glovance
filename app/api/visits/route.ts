import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    
    await prisma.visit.create({
      data: {
        ip,
        userAgent,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating visit:", error);
    return NextResponse.json({ error: "Failed to record visit" }, { status: 500 });
  }
}
