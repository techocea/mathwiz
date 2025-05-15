import BlurGradient from "@/components/BlurGradient";
import WritePaper from "@/components/WritePaper";
import connectDB from "@/lib/db";
import { Paper } from "@/lib/schema";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    paperId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { paperId } = await params;

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
      <main className="flex-1 container max-w-5xl mx-auto py-4 px-4 sm:p-6 lg:pt-16 lg:pb-32">
        <WritePaper
          paperId={serializedPaper._id.toString()}
          paper={serializedPaper}
        />
      </main>
    </div>
  );
};

export default Page;
