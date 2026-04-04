import connectDB from "@/lib/db";
import { cookies } from "next/headers";
import cloudinary from "@/services/cloudinary";
import { getUserFromToken } from "@/helpers/jwt";
import { Resource, Submission } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ submissionId: string }>;
  },
) {
  try {
    await connectDB();

    const formData = await req.formData();

    const score = Number(formData.get("score") || 0);
    const remark = String(formData.get("remark") ?? "");
    const markedPdfUrl = formData.get("markedPdfUrl") as File;

    if (!markedPdfUrl || !remark)
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 },
      );

    const awaitedParams = (await params).submissionId;

    const submission = await Submission.findById(awaitedParams);
    if (!submission) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const buffer = Buffer.from(await markedPdfUrl.arrayBuffer());
    const fileStr = `data:${markedPdfUrl.type};base64,${buffer.toString(
      "base64",
    )}`;
    const publicId = `${remark
      .replace(/\s+/g, "-")
      .toLowerCase()}-${Date.now()}`;

    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      resource_type: "raw",
      folder: "submissions/marked",
      public_id: publicId,
      format: "pdf",
    });

    submission.score = score;
    submission.remark = remark;
    submission.status = "marked";
    submission.markedPdfUrl = uploadRes.secure_url;
    submission.markedPublicId = uploadRes.public_id;

    const updatedSubmission = await submission.save();

    return NextResponse.json(
      { message: "Submission evaluated", status: updatedSubmission.status },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error uploading the marked paper:", error);
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
