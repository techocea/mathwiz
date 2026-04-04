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
        { status: 401 },
      );
    }

    const user = getUserFromToken(token);
    if (!user?._id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";

    // CASE A: Starting the exam (JSON)
    if (contentType.includes("application/json")) {
      const { resourceId, startTime } = await req.json();

      const submission = await Submission.findOneAndUpdate(
        { studentId: user._id, resourceId },
        { startTime: new Date(startTime), status: "started" },
        { upsert: true, new: true },
      );

      // Link to resource if not already linked
      await Resource.findByIdAndUpdate(resourceId, {
        $addToSet: { submissions: submission._id },
      });

      return NextResponse.json({ message: "Exam started" });
    }

    // CASE B: Submitting the paper (FormData)
    const formData = await req.formData();
    const resourceId = formData.get("resourceId")?.toString();
    const submissionUrl = formData.get("submissionUrl") as File;

    if (!submissionUrl || !resourceId) {
      return NextResponse.json(
        { message: "Missing file or resourceId" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await submissionUrl.arrayBuffer());
    const fileStr = `data:${submissionUrl.type};base64,${buffer.toString(
      "base64",
    )}`;
    const timestamp = Date.now();
    const publicId = `student-${user._id}-paper-${resourceId}-${timestamp}`;

    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      resource_type: "raw",
      folder: "submissions/answers",
      public_id: publicId,
      format: "pdf",
    });

    await connectDB();

    await Submission.findOneAndUpdate(
      {
        studentId: user._id,
        resourceId,
      },
      {
        $set: {
          submissionUrl: uploadRes.secure_url,
          submissionPublicId: uploadRes.public_id,
          status: "submitted",
          submitTime: new Date(),
        },
      },
      { upsert: true, new: true },
    );

    return NextResponse.json(
      {
        message: "Submission successful",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("studentToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token" },
        { status: 401 },
      );
    }

    const user = getUserFromToken(token);

    if (!user?._id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);

    const year = searchParams.get("year");
    const type = searchParams.get("type");
    const medium = searchParams.get("medium");

    const resourceQuery: Record<string, any> = {};

    if (year) resourceQuery.year = year;
    if (medium) resourceQuery.medium = medium;
    if (type) resourceQuery.type = type;

    const resources = await Resource.find(resourceQuery).select("_id");
    const resourceIds = resources.map((r) => r._id);

    const submissionQuery: Record<string, any> = {
      studentId: user?._id,
      markedPdfUrl: { $exists: true, $ne: null },
      resourceId: { $in: resourceIds },
    };

    const submissions = await Submission.find(submissionQuery)
      .populate("studentId", "firstName lastName contact")
      .populate("resourceId", "title year medium type")
      .sort({ createdAt: -1 });

    if (!submissions || submissions.length === 0) {
      return NextResponse.json(
        { submissions, message: "No submissions found" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        submissions,
        message: "submissions found",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Fetch error:", error.message || error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
