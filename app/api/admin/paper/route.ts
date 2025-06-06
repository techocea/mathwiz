import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Paper } from "@/lib/schema";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const medium = formData.get("medium") as string;
    const durationMinutes = Number.parseInt(
      formData.get("durationMinutes") as string
    );
    const year = formData.get("year") as string;
    const uploadDeadline = new Date(formData.get("uploadDeadline") as string);
    const file = formData.get("paperUrl") as File;

    if (
      !year ||
      !file ||
      !title ||
      !medium ||
      !durationMinutes ||
      !uploadDeadline
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const inputSchema = z.object({
      title: z.string().min(3),
      medium: z.string().min(4),
      durationMinutes: z.number().min(15).max(180),
      year: z.string().max(4),
      uploadDeadline: z.date(),
    });

    try {
      inputSchema.parse({
        title,
        medium,
        year,
        durationMinutes,
        uploadDeadline,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { message: "Validation failed", errors: error.errors },
          { status: 400 }
        );
      }
      throw error;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = buffer.toString("base64");
    const fileStr = `data:${file.type};base64,${base64File}`;

    const cloudinaryUploadResponse = await cloudinary.uploader.upload(fileStr, {
      resource_type: "raw",
      folder: "papers",
      format: "pdf",
      public_id: `${title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`,
    });

    const paperUrl = cloudinaryUploadResponse.secure_url;
    const cloudinaryPublicId = cloudinaryUploadResponse.public_id;

    await connectDB();

    await Paper.create({
      title,
      year,
      medium,
      paperUrl,
      uploadDeadline,
      durationMinutes,
      cloudinaryPublicId,
    });

    return NextResponse.json(
      {
        message: "Exam paper created successfully",
        paperUrl: paperUrl,
        cloudinaryPublicId: cloudinaryPublicId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating exam paper:", error);
    return NextResponse.json(
      {
        message: "Failed to create exam paper",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    const query = year ? { year } : {};

    const papers = await Paper.find(query)
      .populate({
        path: "submissions",
        populate: { path: "studentId", select: "email firstName  contact" },
      })
      .lean();

    if (!papers || papers.length === 0) {
      return NextResponse.json(
        {
          message: "No papers found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        papers,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in fetching Papers: ", error);
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
