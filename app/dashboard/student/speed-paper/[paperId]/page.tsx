import connectDB from "@/lib/db";
import { Resource } from "@/lib/schema";
import { notFound } from "next/navigation";
import WritePaper from "@/components/shared/WriteTimedPaper";
import BlurGradient from "@/components/shared/BlurGradient";

interface PageProps {
  params: Promise<{
    type: string;
    paperId: string;
  }>;
}

const WriteSpeedPaper = async ({ params }: PageProps) => {
  const { paperId } = await params;

  if (!paperId) {
    notFound();
  }

  await connectDB();
  const paper = await Resource.findById(paperId).lean();

  if (!paper) {
    notFound();
  }

  const serializedPaper = JSON.parse(JSON.stringify(paper));

  return (
    <div className="flex flex-col border-2">
      <BlurGradient />
      <div className="px-4 py-6 lg:py-16">
        <WritePaper
          paperId={serializedPaper._id.toString()}
          paper={serializedPaper}
        />
      </div>
    </div>
  );
};

export default WriteSpeedPaper;
