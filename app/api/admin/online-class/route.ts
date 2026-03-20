import connectDB from "@/lib/db";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/helpers/jwt";
import { NextRequest, NextResponse } from "next/server";
import { OnlineClasses } from "@/lib/schema";

export async function POST(req: NextRequest) {
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

    const { zoomLink, year } = await req.json();

    if (!zoomLink || !year) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 },
      );
    }

    await OnlineClasses.create({
      zoomLink,
      year,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Online class created successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in creating online class:", error);
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
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = getUserFromToken(token);
    if (!user?.email) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    const query: Record<string, any> = {};
    if (year) query.year = year;

    const classes = await OnlineClasses.find(query).lean();

    if (!classes || classes.length === 0) {
      return NextResponse.json(
        { message: "No online classes found" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: "Online classes found successfully",
        classes,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in fetching online classes:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
