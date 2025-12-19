"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ResourceType } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/components/layout/Loader";
import { useResources } from "@/hooks/useResource";
import { PageHeader } from "@/components/shared/PageHeader";
import ResourceTable from "@/components/shared/ResourceTable";
import FilterComponent from "@/components/dashboard/FilterComponent";

const Papers = () => {
  const router = useRouter();
  const [year, setYear] = useState("2026");
  const [medium, setMedium] = useState("english");

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

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>Error loading resources.</div>;
  }

  return (
    <main className="min-h-screen flex-1 w-full">
      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
          <div>
            <PageHeader
              title="Paper Management"
              description="Create and manage A/L Combined Mathematics papers"
            />
          </div>

          <Button
            size="lg"
            onClick={() =>
              router.push("/dashboard/admin/activities/paper/create")
            }
            className="cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Create Paper
          </Button>
        </div>

        <div>
          <FilterComponent
            year={year}
            medium={medium}
            mode="resources"
            onYearChange={setYear}
            onMediumChange={setMedium}
          />
        </div>

        <ResourceTable type={resourceType} resources={resources} />
      </div>
    </main>
  );
};

export default Papers;
