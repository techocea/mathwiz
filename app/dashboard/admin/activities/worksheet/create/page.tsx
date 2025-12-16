import DashboardNavbar from "@/components/layout/DashboardNavbar";
import BlurGradient from "@/components/shared/BlurGradient";

import ActivityCreateForm from "@/components/dashboard/ActivityCreateForm";

const CreateWorksheet = () => {
  return (
    <main className="min-h-screen">
      <BlurGradient />
      <DashboardNavbar dashboardType="admin" />

      <div className="flex-1 container lg:max-w-6xl mx-auto py-8 px-4 lg:py-12">
        <div className="max-w-xl mx-auto">
          <ActivityCreateForm type="worksheet" title="worksheet" />
        </div>
      </div>
    </main>
  );
};

export default CreateWorksheet;
