import BlurGradient from "@/components/BlurGradient";
import WritePaper from "@/components/WritePaper";
import connectDB from "@/lib/db";
import { Paper } from "@/lib/schema";
import { notFound } from "next/navigation";

interface ExamPageProps {
  params: {
    id: string;
  };
}

async function getPaper(id: string) {
  await connectDB();
  const paper = await Paper.findById(id);
  if (!paper) {
    return null;
  }
  return paper;
}

const PaperPage = async ({ params }: ExamPageProps) => {
  const paper = await getPaper(params.id);

  if (!paper) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BlurGradient />

      <main className="flex-1 container max-w-5xl mx-auto p-6">
        <WritePaper paperId={paper._id.toString()} paper={paper.paperUrl} />
      </main>
    </div>
  );
};

export default PaperPage;
