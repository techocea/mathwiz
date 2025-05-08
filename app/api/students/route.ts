import connectDB from "@/lib/db";
import { User } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const students = await User.find({ role: { $ne: "admin" } }).select("-password");

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
