import connectDB from "@/lib/db";
import { User } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, contact, year, school } =
      await req.json();

    await connectDB();

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contact,
      year,
      school,
    });

    return NextResponse.json(
      { message: "user created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in student registration", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
