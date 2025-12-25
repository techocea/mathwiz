import connectDB from "@/lib/db";
import { cookies } from "next/headers";
import { Resource } from "@/lib/schema";
import { getUserFromToken } from "@/helpers/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
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
    const { resourceId } = await params;
    const resource = await Resource.findById(resourceId).lean();

    if (!resource) {
      return NextResponse.json(
        { message: "Resource not found", resource: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Resource fetched successfully", resource },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching resource:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
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
    const { resourceId } = await params;
    const body = await req.json();
    const updatedResource = await Resource.findByIdAndUpdate(resourceId, body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedResource) {
      return NextResponse.json(
        { message: "Resource not found or update failed", resource: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Resource updated successfully", resource: updatedResource },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating resource:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
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
    const { resourceId } = await params;

    const deletedResource = await Resource.findByIdAndDelete(resourceId);

    if (!deletedResource) {
      return NextResponse.json(
        { message: "Resource not found or deletion failed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
