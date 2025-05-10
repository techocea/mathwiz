import BlurGradient from "@/components/BlurGradient";
import WritePaper from "@/components/WritePaper";
import connectDB from "@/lib/db";
import { Paper } from "@/lib/schema";
import { notFound } from "next/navigation";

interface ExamPageProps {
  params: {
    paperId?: string; 
  };
}

async function getPaper(paperId: string) {
  await connectDB();
  const paper = await Paper.findById(paperId).lean();
  return paper ? JSON.parse(JSON.stringify(paper)) : null;
}

const PaperPage = async ({ params }: ExamPageProps) => {
  const paperId = params?.paperId;

  if (!paperId) {
    notFound(); 
  }

  const paper = await getPaper(paperId);

  if (!paper) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BlurGradient />
      <main className="flex-1 container max-w-5xl mx-auto p-6">
        <WritePaper paperId={paper._id.toString()} paper={paper} />
      </main>
    </div>
  );
};

export default PaperPage;
