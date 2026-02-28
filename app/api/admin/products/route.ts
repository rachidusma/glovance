import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const products = await prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: { select: { id: true, nameEn: true, nameFr: true, nameAr: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nameEn, nameFr, nameAr, descEn, descFr, descAr, images, categoryId } =
      await request.json();

    if (!nameEn || !nameFr || !nameAr || !categoryId) {
      return NextResponse.json(
        { error: "Name (all languages) and category are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        nameEn,
        nameFr,
        nameAr,
        descEn,
        descFr,
        descAr,
        images: images || [],
        categoryId,
      },
      include: { category: true },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
