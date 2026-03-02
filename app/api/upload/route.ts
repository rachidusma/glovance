import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { auth } from "@/auth";

export const maxDuration = 60; // Set up to 60 seconds of execution for Vercel
// Vercel serverless functions have a hard 4.5 MB payload limit.
// We allow up to 4mb to be safe for base64 strings.
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};


export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dataUrl, folder } = body;

    if (!dataUrl) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const url = await uploadImage(dataUrl, folder || "glovance");
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
