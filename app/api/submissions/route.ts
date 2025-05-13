import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import connectDB from "@/lib/db";
import { Paper, Submission } from "@/lib/schema";
import { getUserFromToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("studentToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = getUserFromToken(token);
    if (!user?._id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const formData = await req.formData();

    const file = formData.get("file") as File;
    const paperId = formData.get("paperId")?.toString();
    // const studentId = formData.get("studentId") as string;

    // Convert file to buffer then to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = buffer.toString("base64");
    const fileStr = `data:${file.type};base64,${base64File}`;

    // Generate a unique filename for Cloudinary
    const timestamp = new Date().getTime();
    const fileName = `student-${user._id}-paper-${paperId}-${timestamp}`;

    // Upload to Cloudinary
    const cloudinaryUploadResponse = await cloudinary.uploader.upload(fileStr, {
      resource_type: "auto",
      folder: "submissions",
      public_id: fileName,
      format: "pdf",
    });

    await connectDB();

    // Create submission record with Cloudinary URL
    const submission = await Submission.create({
      file: cloudinaryUploadResponse.secure_url,
      studentId: user._id,
      paperId: paperId,
      uploadedAt: new Date(),
    });

    await Paper.findByIdAndUpdate(paperId, {
      $push: { submissions: submission._id },
    });

    return NextResponse.json(
      {
        message: "Submission Successfull",
        file: fileName,
      },

      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in submitting the paper: ", error);
    return NextResponse.json(
      {
        message: "Failed to submit exam paper",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const submissions = await Submission.find({})
      .populate("studentId", "firstName lastName  contact")
      .populate("paperId", "title");

    return NextResponse.json(
      {
        submissions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching submissions: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
