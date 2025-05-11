import connectDB from "@/lib/db";
import { signToken, verifyToken } from "@/lib/jwt";
import { User } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const admin = await User.findOne({ email });

    if (!admin || admin.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      id: admin._id,
      email: admin.email,
      role: admin.role,
    });

    const response = NextResponse.json(
      { message: "Admin logged in successfully" },
      { status: 200 }
    );

    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Admin Login Error: ", error);
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

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;
    return NextResponse.json(decoded);
  } catch (error) {
    console.error("Error in verifying admin: ", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
