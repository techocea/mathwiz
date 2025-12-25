import connectDB from "@/lib/db";
import { User } from "@/lib/schema";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/helpers/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = getUserFromToken(token);
    if (!user?.email) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);

    const year = searchParams.get("year");
    const medium = searchParams.get("medium");

    const query: Record<string, any> = { role: "user" };

    if (year) query.year = year;
    if (medium) query.medium = medium;

    const students = await User.find(query).select("-password").lean();

    if (!students || students.length === 0) {
      return NextResponse.json(
        { message: "No students found", students: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Students fetched successfully", students },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
