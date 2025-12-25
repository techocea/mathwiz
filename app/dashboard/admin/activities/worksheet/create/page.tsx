import ResourceCreateForm from "@/components/dashboard/ResourceCreateForm";

const CreateWorksheet = () => {
  return (
    <main className="min-h-screen">
      <div className="flex-1 container lg:max-w-6xl mx-auto py-8 px-4">
        <div className="w-full">
          <ResourceCreateForm type="worksheet" title="worksheet" />
        </div>
      </div>
    </main>
  );
};

export default CreateWorksheet;
