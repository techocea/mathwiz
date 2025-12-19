import connectDB from "@/lib/db";
import { Marking } from "@/lib/schema";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/helpers/jwt";
import { NextRequest, NextResponse } from "next/server";

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
    const type = searchParams.get("type");
    const medium = searchParams.get("medium");

    const query: Record<string, any> = {};

    if (year) query.year = year;
    if (medium) query.medium = medium;
    if (type) query.type = type;

    const markings = await Marking.find(query).lean();

    if (!markings || markings.length === 0) {
      return NextResponse.json(
        {
          message: "No markings found",
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Markings found succesfully",
        markings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in fetching marking scheme:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
