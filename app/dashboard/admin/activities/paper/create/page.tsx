import ActivityCreateForm from "@/components/dashboard/ActivityCreateForm";

const CreatePapersPage = () => {
  return (
    <main className="min-h-screen">
      <div className="flex-1 container lg:max-w-6xl mx-auto py-8 px-4 lg:py-12">
        <div className="max-w-xl mx-auto">
          <ActivityCreateForm type="paper" title="paper" />
        </div>
      </div>
    </main>
  );
};

export default CreatePapersPage;
