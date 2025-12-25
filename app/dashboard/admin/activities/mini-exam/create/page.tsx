import ResourceCreateForm from "@/components/dashboard/ResourceCreateForm";

const CreateMiniExam = () => {
  return (
    <main className="min-h-screen">
      <div className="flex-1 container lg:max-w-6xl mx-auto py-8 px-4">
        <div className="w-full">
          <ResourceCreateForm type="mini-exam" title="mini exam" />
        </div>
      </div>
    </main>
  );
};

export default CreateMiniExam;
