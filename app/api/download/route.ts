import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/services/cloudinary";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const publicId = searchParams.get("public_id");
  // const filename = searchParams.get("filename") || "file";

  if (!publicId) {
    return NextResponse.json(
      { message: "public_id is required" },
      { status: 400 }
    );
  }

  try {
    const downloadUrl = cloudinary.utils.private_download_url(
      publicId,
      Math.floor(Date.now() / 1000).toString(),
      {
        resource_type: "raw",
        type: "upload",
      }
    );

    return NextResponse.redirect(downloadUrl);
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { message: "Failed to generate download link" },
      { status: 500 }
    );
  }
}
