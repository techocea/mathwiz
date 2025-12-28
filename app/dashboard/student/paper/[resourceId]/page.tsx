import connectDB from "@/lib/db";
import { Resource } from "@/lib/schema";
import { notFound } from "next/navigation";
import WriteTimedResource from "@/components/shared/WriteTimedResource";

interface PageProps {
  params: Promise<{
    type: string;
    resourceId: string;
  }>;
}

const WritePapers = async ({ params }: PageProps) => {
  const { resourceId } = await params;

  if (!resourceId) {
    notFound();
  }

  await connectDB();
  const paper = await Resource.findById(resourceId).lean();

  if (!paper) {
    notFound();
  }

  const serializedPaper = JSON.parse(JSON.stringify(paper));

  return (
    <div className="flex flex-col">
      <WriteTimedResource
        resourceId={serializedPaper._id.toString()}
        paper={serializedPaper}
      />
    </div>
  );
};

export default WritePapers;
