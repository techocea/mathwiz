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
    // Generate a temporary download URL from Cloudinary
    const downloadUrl = cloudinary.utils.private_download_url(
      publicId,
      Math.floor(Date.now() / 1000).toString(),
      {
        resource_type: "raw", // assuming PDF or other non-image file
        type: "upload",
      }
    );

    // Redirect the browser to download the file
    return NextResponse.redirect(downloadUrl);
  } catch (err) {
    console.error("Download error:", err);
    return NextResponse.json(
      { message: "Failed to generate download link" },
      { status: 500 }
    );
  }
}
