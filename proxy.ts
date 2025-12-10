import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  // Check if the path is admin-related
  const isAdminPath = req.nextUrl.pathname.startsWith('/dashboard/admin');
  
  // Get both tokens
  const adminToken = req.cookies.get("adminToken")?.value;
  const studentToken = req.cookies.get("studentToken")?.value;

  // Admin routes check
  if (isAdminPath) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    try {
      await jwtVerify(adminToken, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Student routes check
  if (!studentToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(studentToken, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
