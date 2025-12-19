import { z } from "zod";
import connectDB from "@/lib/db";
import { Resource } from "@/lib/schema";
import cloudinary from "@/services/cloudinary";
import { createResourceSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 30 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const type = String(formData.get("type") ?? "");
    const title = String(formData.get("title") ?? "");
    const medium = String(formData.get("medium") ?? "");
    const year = String(formData.get("year") ?? "");
    const uploadDeadlineStr = String(formData.get("uploadDeadline") ?? "");
    const uploadDeadline = new Date(uploadDeadlineStr);

    const durationRaw = formData.get("durationMinutes");
    const durationMinutes =
      typeof durationRaw === "string" && durationRaw.length > 0
        ? parseInt(durationRaw, 10)
        : undefined;

    const file = formData.get("paperUrl") as File;

    const validated = createResourceSchema.safeParse({
      type,
      title,
      medium,
      year,
      uploadDeadline,
      durationMinutes,
      paperUrl: file,
    });

    if (!validated.success) {
      return NextResponse.json(
        { message: "Validation failed" },
        { status: 400 }
      );
    }

    const requiresFile = [
      "paper",
      "speed-paper",
      "mini-exam",
      "worksheet",
    ].includes(type);

    if (requiresFile) {
      if (!file || typeof (file as any).arrayBuffer !== "function") {
        return NextResponse.json(
          { message: "PDF file is required" },
          { status: 400 }
        );
      }

      // check size and type
      const size = Number((file as any).size ?? 0);
      const mime = String((file as any).type ?? "");

      if (size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { message: "File must be smaller than 30MB" },
          { status: 400 }
        );
      }
      if (!["application/pdf"].includes(mime)) {
        return NextResponse.json(
          { message: "Only PDF files are accepted" },
          { status: 400 }
        );
      }
    }

    let paperUrl = "";
    let cloudinaryPublicId = "";

    if (file) {
      const bytes = await (file as any).arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64File = buffer.toString("base64");
      const fileStr = `data:${(file as any).type};base64,${base64File}`;

      const response = await cloudinary.uploader.upload(fileStr, {
        resource_type: "raw",
        folder: "papers",
        format: "pdf",
        public_id: `${title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`,
      });

      paperUrl = response.secure_url;
      cloudinaryPublicId = response.public_id;
    }

    await connectDB();

    const doc = await Resource.create({
      title,
      medium,
      year,
      durationMinutes: durationMinutes ?? undefined,
      uploadDeadline,
      paperUrl,
      cloudinaryPublicId,
      type,
    });

    return NextResponse.json(
      { message: `${type} created`, resource: doc },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating resource:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create resource", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const year = searchParams.get("year");
    const type = searchParams.get("type");
    const medium = searchParams.get("medium");

    const query: Record<string, any> = {};

    if (year) query.year = year;
    if (medium) query.medium = medium;
    if (type) query.type = type;

    const resources = await Resource.find(query)
      .populate({
        path: "submissions",
        populate: { path: "studentId", select: "email firstName  contact" },
      })
      .lean();

    if (!resources || resources.length === 0) {
      return NextResponse.json(
        {
          resources: [],
          message: "No Resources found",
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Resource fetched",
        resources,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in fetching Resources: ", error);
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
