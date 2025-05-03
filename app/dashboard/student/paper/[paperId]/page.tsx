import BlurGradient from "@/components/BlurGradient";
import Paper from "@/components/Paper";

const PaperPage = async ({
  params,
}: {
  params: Promise<{ paperId: string }>;
}) => {
  const { paperId } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <BlurGradient />

      <main className="flex-1 container max-w-5xl mx-auto p-6">
        <Paper paperId={paperId} />
      </main>
    </div>
  );
};

export default PaperPage;
