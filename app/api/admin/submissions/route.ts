import { getUserFromToken } from "@/helpers/jwt";
import connectDB from "@/lib/db";
import { Resource, Submission } from "@/lib/schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const admin = getUserFromToken(token);

    if (!admin?.email) {
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

    const submissions = await Submission.find({
      paperId: { $in: resourceIds },
    })
      .populate("studentId", "firstName lastName contact")
      .populate("paperId", "title year medium type");

    if (!submissions || submissions.length === 0) {
      return NextResponse.json(
        { submissions, message: "No submissions found" },
        { status: 200 }
      );
    }

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
