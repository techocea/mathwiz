import connectDB from "@/lib/db";
import { User } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    await connectDB();

    const isUserExists = await User.findOne({ email });

    if (!isUserExists) {
      return new NextResponse("User not exist", { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      isUserExists.password
    );

    if (!isValidPassword) {
      return new NextResponse("Invalid Password", { status: 401 });
    }

    return new NextResponse("User logged in successfully", { status: 200 });
  } catch (error) {
    console.log("Error in logging the user", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
