import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import { Paper, Submission } from "@/lib/schema";
import { getUserFromToken } from "@/lib/jwt";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("studentToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const user = getUserFromToken(token);
    if (!user?._id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const formData = await req.formData();
    const submissionUrl = formData.get("submissionUrl") as File | null;
    const paperId = formData.get("paperId")?.toString();
    const startTime = formData.get("startTime")?.toString();

    if (!submissionUrl || !paperId) {
      return NextResponse.json(
        { message: "Missing file or paperId" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const buffer = Buffer.from(await submissionUrl.arrayBuffer());
    const fileStr = `data:${submissionUrl.type};base64,${buffer.toString(
      "base64"
    )}`;

    // Generate unique file name
    const timestamp = Date.now();
    const publicId = `student-${user._id}-paper-${paperId}-${timestamp}`;

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      resource_type: "raw",
      folder: "submissions",
      public_id: publicId,
      format: "pdf",
    });

    // Connect to DB and create submission
    await connectDB();

    let paperStartTime: Date | undefined;
    if (startTime) {
      paperStartTime = new Date(startTime); // Convert the string to a Date object
    } else {
      console.warn(
        "startTime not provided in submission. Storing as null/undefined."
      );
    }

    const submission = await Submission.create({
      submissionUrl: uploadRes.secure_url,
      cloudinaryPublicId: uploadRes.public_id,
      studentId: user._id,
      paperId,
      startTime: paperStartTime,
      uploadedAt: new Date(),
    });

    console.log(submission);
    await Paper.findByIdAndUpdate(paperId, {
      $push: { submissions: submission._id },
    });

    return NextResponse.json(
      {
        message: "Submission successful",
        submissionUrl: uploadRes.secure_url,
        cloudinaryPublicId: uploadRes.public_id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Submission error:", error.message || error);
    return NextResponse.json(
      { message: "Failed to submit exam paper" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const submissions = await Submission.find({})
      .populate("studentId", "firstName lastName contact")
      .populate("paperId", "title");

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch error:", error.message || error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
