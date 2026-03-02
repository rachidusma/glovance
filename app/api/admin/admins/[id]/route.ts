import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    
    const admin = await prisma.admin.findUnique({
      where: { id: resolvedParams.id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch admin details" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { email, password, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const dataToUpdate: any = {
      email,
      name,
    };

    if (password && password.trim() !== "") {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const admin = await prisma.admin.update({
      where: { id: resolvedParams.id },
      data: dataToUpdate,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update admin" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;

    // Prevent deleting the last admin
    const adminCount = await prisma.admin.count();
    if (adminCount <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last admin account" },
        { status: 400 }
      );
    }

    // Prevent deleting oneself
    const currentUser = session.user as { id?: string };
    if (currentUser?.id === resolvedParams.id) {
        return NextResponse.json(
            { error: "You cannot delete your own account from here. Use the profile page if supported, or ask another admin." },
            { status: 400 }
        );
    }

    await prisma.admin.delete({
      where: { id: resolvedParams.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete admin" },
      { status: 500 }
    );
  }
}
