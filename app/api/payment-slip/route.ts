import { getUserFromToken } from "@/helpers/jwt";
import connectDB from "@/lib/db";
import { Payments } from "@/lib/schema";
import cloudinary from "@/services/cloudinary";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = String(formData.get("name"));
    const year = String(formData.get("year"));
    const referenceId = String(formData.get("referenceId"));

    const paymentSlip = formData.get("paymentSlip") as File | null;

    if (!paymentSlip || !referenceId) {
      return NextResponse.json(
        { message: "Missing file or referenceId" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await paymentSlip.arrayBuffer());
    const fileStr = `data:${paymentSlip.type};base64,${buffer.toString(
      "base64"
    )}`;
    const timestamp = Date.now();
    const publicId = `student-receipt-${referenceId}-${timestamp}`;

    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      resource_type: "raw",
      folder: "receipts",
      public_id: publicId,
      allowed_formats: ["jpg", "png"],
    });

    await connectDB();

    const payment = await Payments.create({
      name,
      year,
      referenceId,
      paymentSlipUrl: uploadRes.secure_url,
      cloudinaryPublicId: uploadRes.public_id,
    });

    return NextResponse.json(
      { message: "Bank slip uploaded successfully", payment },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in uploading slip:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = getUserFromToken(token);
    if (!user?.email) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    const paymentSlips = await Payments.find();

    if (!paymentSlips || paymentSlips.length === 0) {
      return NextResponse.json(
        { message: "Payment slips not found" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Payment slips found", paymentSlips },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in fetching payments slips:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
