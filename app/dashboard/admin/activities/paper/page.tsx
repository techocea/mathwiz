"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ResourceType } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useResources } from "@/hooks/useResource";
import BlurGradient from "@/components/BlurGradient";
import ResourceTable from "@/components/ResourceTable";
import DashboardNavbar from "@/components/DashboardNavbar";
import FilterComponent from "@/components/FilterComponent";

const Papers = () => {
  const router = useRouter();
  const [medium, setMedium] = useState("english");
  const [year, setYear] = useState("2026");

  const resourceType: ResourceType = "paper";

  const {
    data: resources,
    isError,
    isLoading,
  } = useResources({
    type: resourceType,
    medium,
    year,
  });


  const showNoResults = resources && resources.length === 0;

  if (isLoading) {
    return <div>Loading filters and data...</div>;
  }

  if (isError) {
    return <div>Error loading resources.</div>;
  }

  return (
    <>
      <BlurGradient />
      <DashboardNavbar dashboardType="admin" />
      <main className="min-h-screen flex-1 container lg:max-w-6xl mx-auto py-6">
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Paper Management</h1>
              <p className="text-muted-foreground">
                Create and manage A/L Combined Mathematics papers
              </p>
            </div>

            <Button
              size="lg"
              onClick={() =>
                router.push("/dashboard/admin/activities/paper/create")
              }
              className="cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Paper
            </Button>
          </div>

          <div>
            <FilterComponent
              year={year}
              medium={medium}
              onYearChange={setYear}
              onMediumChange={setMedium}
            />
          </div>

          {showNoResults ? (
            <div className="mt-8 p-4 bg-gray-50 border rounded-md">
              <p className="text-gray-600">
                No results found matching the selected year and medium.
              </p>
            </div>
          ) : (
            <ResourceTable resources={resources} />
          )}
        </div>
      </main>
    </>
  );
};

export default Papers;
