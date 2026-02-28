import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nameEn, nameFr, nameAr, descEn, descFr, descAr, imageUrl } =
      await request.json();

    if (!nameEn || !nameFr || !nameAr) {
      return NextResponse.json(
        { error: "Name is required in all three languages" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { nameEn, nameFr, nameAr, descEn, descFr, descAr, imageUrl },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
