import connectDB from "@/lib/db";
import { cookies } from "next/headers";
import { Marking } from "@/lib/schema";
import { getUserFromToken } from "@/helpers/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ markingId: string }> }
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
    const { markingId } = await params;
    const body = await req.json();
    const updatedMarking = await Marking.findByIdAndUpdate(markingId, body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedMarking) {
      return NextResponse.json(
        { message: "Marking scheme not found or update failed", marking: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Marking scheme updated successfully",
        marking: updatedMarking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating marking scheme:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ markingId: string }> }
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
    const { markingId } = await params;

    const deletedMarking = await Marking.findByIdAndDelete(markingId);

    if (!deletedMarking) {
      return NextResponse.json(
        { message: "Marking scheme not found or deletion failed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting marking scheme:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
