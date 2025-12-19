"use client";

import { useState } from "react";
import Loader from "@/components/layout/Loader";
import { useSubmissions } from "@/hooks/useSubmissions";
import FilterComponent from "@/components/dashboard/FilterComponent";
import ViewSubmissionTable from "@/components/dashboard/ViewSubmissionTable";
import { PageHeader } from "@/components/shared/PageHeader";

const Submissions = () => {
  const [type, setType] = useState("paper");
  const [year, setYear] = useState("2026");
  const [medium, setMedium] = useState("english");

  const {
    data: submissions,
    isError,
    isLoading,
  } = useSubmissions({
    type,
    medium,
    year,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading marking schemas.</div>;
  }

  return (
    <main className="min-h-full flex-1 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
        <div>
          <PageHeader
            title="Student Submissions"
            description="View and manage all student examination submissions"
          />
        </div>
      </div>

      <div>
        <FilterComponent
          mode="submissions"
          type={type}
          year={year}
          medium={medium}
          onYearChange={setYear}
          onTypeChange={setType}
          onMediumChange={setMedium}
        />
      </div>

      <ViewSubmissionTable submissions={submissions} />
    </main>
  );
};

export default Submissions;
