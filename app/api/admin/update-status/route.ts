import connectDB from "@/lib/db";
import { User } from "@/lib/schema";
import sendMail from "@/lib/sendMail";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { studentId, newStatus } = await req.json();

  await connectDB();

  const updatedStudent = await User.findByIdAndUpdate(
    studentId,
    { status: newStatus },
    { new: true }
  );

  if (!updatedStudent) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  const subject = "Your account status has been updated";
  const body = `Hi ${updatedStudent.firstName} ${updatedStudent.lastName}, your account has been ${newStatus}`;

  await sendMail(updatedStudent.email, subject, body);

  return NextResponse.json({ message: "Status updated and notification sent" });
}
