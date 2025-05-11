import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Paper } from "@/lib/schema";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const durationMinutes = Number.parseInt(
      formData.get("durationMinutes") as string
    );
    const year = formData.get("year") as string;
    const uploadDeadline = new Date(formData.get("uploadDeadline") as string);
    const paperUrl = formData.get("paperUrl") as File;

    const schema = z.object({
      title: z.string().min(3),
      durationMinutes: z.number().min(15).max(180),
      year: z.string().max(4),
      uploadDeadline: z.date(),
      paperUrl: z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          "File size must be less than 5MB"
        )
        .refine(
          (file) => file.type === "application/pdf",
          "Only PDF files are accepted"
        ),
    });

    try {
      schema.parse({
        title,
        durationMinutes,
        year,
        uploadDeadline,
        paperUrl,
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

    const bytes = await paperUrl.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public/uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error("Error creating upload directory:", error);
    }

    const filename = `${Date.now()}-${paperUrl.name.replace(/\s+/g, "-")}`;
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    await connectDB();

    await Paper.create({
      title,
      durationMinutes,
      year,
      uploadDeadline,
      paperUrl: `/uploads/${filename}`,
    });

    return NextResponse.json(
      { message: "Exam paper created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating exam paper:", error);
    return NextResponse.json(
      { message: "Failed to create exam paper" },
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
        populate: { path: "studentId", select: "email fname contact" },
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
