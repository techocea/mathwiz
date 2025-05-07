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

    const token = signToken({
      id: isUserExists.id,
      email: isUserExists.email,
      name: isUserExists.firstName,
      role: isUserExists.role,
    });

    const response = NextResponse.json(
      { message: "User logged in successfully" },
      { status: 200 }
    );

    response.cookies.set("studentToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Error in logging the user", error);
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
  name: string;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("studentToken")?.value;

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;
    return NextResponse.json(decoded);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }
}
