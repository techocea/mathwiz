import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/db';
import {Paper} from '@/lib/schema';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const durationMinutes = Number.parseInt(
      formData.get("durationMinutes") as string
    );
    const year = formData.get("year") as string;
    const uploadDeadline = new Date(formData.get("uploadDeadline") as string);
    
    // Get the file from the form data
    const file = formData.get("paperUrl") as File;
    
    if (!file) {
      return NextResponse.json(
        { message: "Paper file is required" },
        { status: 400 }
      );
    }
    
    // Validate non-file inputs
    const inputSchema = z.object({
      title: z.string().min(3),
      durationMinutes: z.number().min(15).max(180),
      year: z.string().max(4),
      uploadDeadline: z.date(),
    });

    try {
      inputSchema.parse({
        title,
        durationMinutes,
        year,
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

    // Convert file to buffer for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to Cloudinary using buffer upload
    const cloudinaryUploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "papers",
          public_id: `${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
          format: "pdf",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      // Convert buffer to stream for upload
      const Readable = require('stream').Readable;
      const readableInstanceStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        }
      });
      
      readableInstanceStream.pipe(uploadStream);
    });
    
    // Extract the secure URL from Cloudinary response
    const paperUrl = (cloudinaryUploadResponse as any).secure_url;

    await connectDB();

    // Create the paper document in MongoDB
    await Paper.create({
      title,
      durationMinutes,
      year,
      uploadDeadline,
      paperUrl,
    });

    return NextResponse.json(
      { 
        message: "Exam paper created successfully",
        paperUrl: paperUrl 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating exam paper:", error);
    return NextResponse.json(
      { message: "Failed to create exam paper", error: (error as Error).message },
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
