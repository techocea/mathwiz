import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import { User } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      contact,
      year,
      school,
      medium,
      status,
      tuitionType,
    } = await req.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !contact ||
      !year ||
      !school ||
      !medium
    )
      return NextResponse.json(
        { message: "All fields required" },
        { status: 401 }
      );

    if (
      !tuitionType ||
      typeof tuitionType !== "object" ||
      !["theory", "revision", "paper"].every((key) =>
        Object.prototype.hasOwnProperty.call(tuitionType, key)
      )
    ) {
      return NextResponse.json(
        { message: "Invalid tuitionType format" },
        { status: 400 }
      );
    }

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

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contact,
      year,
      school,
      medium,
      tuitionType,
      status: status || "pending",
    });

    newUser.save();

    return NextResponse.json(
      { message: "User created successfully", newUser },
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
