import connectDB from "@/lib/db";
import { Inquiries } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, contact, message } = await req.json();

    await connectDB();

    await Inquiries.create({
      name,
      email,
      contact,
      message,
    });

    return NextResponse.json(
      {
        message: "Inquiry submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in submitting inquiry form: ", error);
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

    const inquiries = await Inquiries.find({});
    return NextResponse.json(
      {
        inquiries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching inquiry forms");
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
