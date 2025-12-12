import connectDB from "@/lib/db";
import { cookies } from "next/headers";
import cloudinary from "@/services/cloudinary";
import { getUserFromToken } from "@/helpers/jwt";
import { Resource, Submission } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

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

    const buffer = Buffer.from(await submissionUrl.arrayBuffer());
    const fileStr = `data:${submissionUrl.type};base64,${buffer.toString(
      "base64"
    )}`;
    const timestamp = Date.now();
    const publicId = `student-${user._id}-paper-${paperId}-${timestamp}`;

    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      resource_type: "raw",
      folder: "submissions",
      public_id: publicId,
      format: "pdf",
    });

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

    await Resource.findByIdAndUpdate(paperId, {
      $push: { submissions: submission._id },
    });

    return NextResponse.json(
      {
        message: "Submission successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
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

    return NextResponse.json(
      {
        submissions,
        message: "submissions found",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Fetch error:", error.message || error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
