import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const products = await prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: { select: { id: true, name: true, name_fr: true, name_ar: true } } },
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" }
      ],
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nameEn, nameFr, nameAr, descEn, descFr, descAr, images, inStock, categoryId, order } =
      await request.json();

    if (!nameEn || !nameFr || !nameAr || !categoryId) {
      return NextResponse.json(
        { error: "Name (all languages) and category are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: nameEn,
        name_fr: nameFr,
        name_ar: nameAr,
        description: descEn,
        description_fr: descFr,
        description_ar: descAr,
        image: images && images.length > 0 ? images[0] : null,
        isAvailable: inStock ?? true,
        order: order ? parseInt(order, 10) : 0,
        categoryId,
      },
      include: { category: true },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
