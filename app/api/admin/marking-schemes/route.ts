import { getUserFromToken } from "@/helpers/jwt";
import connectDB from "@/lib/db";
import { Marking } from "@/lib/schema";
import cloudinary from "@/services/cloudinary";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const formData = await req.formData();

    const type = formData.get("type") as string;
    const year = formData.get("year") as string;
    const title = formData.get("title") as string;
    const medium = formData.get("medium") as string;
    const markingSchemeUrl = formData.get("markingSchemeUrl") as File | null;

    if (!markingSchemeUrl || !title || !medium || !year || !type)
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );

    const buffer = Buffer.from(await markingSchemeUrl.arrayBuffer());
    const fileStr = `data:${markingSchemeUrl.type};base64,${buffer.toString(
      "base64"
    )}`;
    const publicId = `${title
      .replace(/\s+/g, "-")
      .toLowerCase()}-${Date.now()}`;

    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      resource_type: "raw",
      folder: "markings",
      public_id: publicId,
      format: "pdf",
    });

    await Marking.create({
      type,
      year,
      title,
      medium,
      markingSchemeUrl: uploadRes.secure_url,
      cloudinaryPublicId: uploadRes.public_id,
      uploadedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Marking schema uploaded successful" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in creating marking scheme:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);

    const year = searchParams.get("year");
    const type = searchParams.get("type");
    const medium = searchParams.get("medium");

    const query: Record<string, any> = {};

    if (year) query.year = year;
    if (medium) query.medium = medium;
    if (type) query.type = type;

    const markings = await Marking.find(query).lean();

    if (!markings || markings.length === 0) {
      return NextResponse.json(
        {
          message: "No markings found",
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Markings found succesfully",
        markings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in fetching marking scheme:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
