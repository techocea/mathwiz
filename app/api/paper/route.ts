import connectDB from "@/lib/db";
import { Paper } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, paperUrl, uploadDeadline, durationMinutes } =
      await req.json();

    await connectDB();

    await Paper.create({
      title,
      paperUrl,
      uploadDeadline,
      durationMinutes,
    });

    return NextResponse.json(
      {
        message: "Paper Created Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in creating paper: ", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const papers = await Paper.find();

    return NextResponse.json({ papers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching papers: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
