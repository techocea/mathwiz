import DashboardNavbar from "@/components/DashboardNavbar";
import BlurGradient from "@/components/BlurGradient";

import ActivityCreateForm from "@/components/ActivityCreateForm";

const CreateSpeedPaper = () => {
  return (
    <main className="min-h-screen">
      <BlurGradient />
      <DashboardNavbar dashboardType="admin" />

      <div className="flex-1 container lg:max-w-6xl mx-auto py-8 px-4 lg:py-12">
        <div className="max-w-xl mx-auto">
          <ActivityCreateForm type="speed-paper" title="speed paper" />
        </div>
      </div>
    </main>
  );
};

export default CreateSpeedPaper;
