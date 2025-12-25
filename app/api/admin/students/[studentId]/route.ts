import connectDB from "@/lib/db";
import { User } from "@/lib/schema";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/helpers/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ studentId: string }> }
) {
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
    const { studentId } = await params;
    const student = await User.findById(studentId).select("-password").lean();

    if (!student) {
      return NextResponse.json(
        { message: "Student not found", student: null },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Student fetched successfully", student },
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ studentId: string }> }
) {
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
    const { studentId } = await params;
    const body = await req.json();
    const updatedStudent = await User.findByIdAndUpdate(studentId, body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedStudent) {
      return NextResponse.json(
        { message: "Student not found or update failed", student: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Student updated successfully", student: updatedStudent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
