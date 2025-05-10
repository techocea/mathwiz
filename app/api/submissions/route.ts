import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import connectDB from "@/lib/db";
import { Paper, Submission } from "@/lib/schema";
import { getUserFromToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("studentToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = getUserFromToken(token);
    if (!user?._id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const formData = await req.formData();

    const file = formData.get("file") as File;
    const paperId = formData.get("paperId")?.toString();
    // const studentId = formData.get("studentId") as string;

    const buffer = Buffer.from(await file.arrayBuffer());
    const timeStamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${timeStamp}-MATHWIZ.pdf`;

    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    await writeFile(filePath, buffer);

    await connectDB();

    const submission = await Submission.create({
      file: `/uploads/${fileName}`,
      studentId: user._id,
      paperId: paperId,
    });

    await Paper.findByIdAndUpdate(paperId, {
      $push: { submissions: submission._id },
    });

    return NextResponse.json(
      {
        message: "Submission Successfull",
        file: fileName,
      },

      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in submitting the paper: ", error);
    return NextResponse.json(
      {
        message: "Failed to submit exam paper",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const submissions = await Submission.find({})
      .populate("studentId", "firstName lastName  contact")
      .populate("paperId", "title");

    return NextResponse.json(
      {
        submissions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching submissions: ", error);
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
