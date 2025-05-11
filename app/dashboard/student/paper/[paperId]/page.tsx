import BlurGradient from "@/components/BlurGradient";
import WritePaper from "@/components/WritePaper";
import connectDB from "@/lib/db";
import { Paper } from "@/lib/schema";
import { notFound } from "next/navigation";

interface PageProps {
  params: Awaited<{ paperId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { paperId } = params;

  if (!paperId) {
    notFound();
  }

  await connectDB();
  const paper = await Paper.findById(paperId).lean();

  if (!paper) {
    notFound();
  }

  const serializedPaper = JSON.parse(JSON.stringify(paper));

  return (
    <div className="min-h-screen flex flex-col">
      <BlurGradient />
      <main className="flex-1 container max-w-5xl mx-auto p-6">
        <WritePaper
          paperId={serializedPaper._id.toString()}
          paper={serializedPaper}
        />
      </main>
    </div>
  );
}
