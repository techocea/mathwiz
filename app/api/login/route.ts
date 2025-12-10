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
      return NextResponse.json({ message: "User not exist" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      isUserExists.password
    );

    // const salt = await bcrypt.genSalt(10);
    // const testUser = await bcrypt.hash("12345678", salt);
    // console.log(testUser);
    // 12345678 brightly@email.com
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }

    if (isUserExists.status !== "approved") {
      return NextResponse.json(
        { message: `Your account is ${isUserExists.status}` },
        { status: 403 }
      );
    }

    const token = signToken({
      _id: isUserExists._id,
      email: isUserExists.email,
      name: isUserExists.firstName,
      year: isUserExists.year,
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
  _id: string;
  email: string;
  role: string;
  name: string;
  year: string;
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
    console.error("Error in verifying user: ", error);
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
