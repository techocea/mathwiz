import connectDB from "@/lib/db";
import { Resource } from "@/lib/schema";
import { notFound } from "next/navigation";
import WriteTimedResource from "@/components/shared/WriteTimedResource";
import BlurGradient from "@/components/shared/BlurGradient";

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
    <div className="flex flex-col border-2">
      <BlurGradient />
      <div className="px-4 py-6 lg:py-16">
        <WriteTimedResource
          resourceId={serializedPaper._id.toString()}
          paper={serializedPaper}
        />
      </div>
    </div>
  );
};

export default WritePapers;
