import connectDB from "@/lib/db";
import { Resource } from "@/lib/schema";
import { notFound } from "next/navigation";
import WriteNormalPaper from "@/components/shared/WriteNormalPaper";

interface PageProps {
  params: Promise<{
    type: string;
    worksheetId: string;
  }>;
}

const WritePapers = async ({ params }: PageProps) => {
  const { worksheetId } = await params;

  if (!worksheetId) {
    notFound();
  }

  await connectDB();
  const paper = await Resource.findById(worksheetId).lean();

  if (!paper) {
    notFound();
  }

  const serializedPaper = JSON.parse(JSON.stringify(paper));

  return (
    <div className="flex flex-col">
      <WriteNormalPaper
        resourceId={serializedPaper._id.toString()}
        resource={serializedPaper}
      />
    </div>
  );
};

export default WritePapers;
