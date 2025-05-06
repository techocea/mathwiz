import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;
  //   console.log("Token from cookie:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
