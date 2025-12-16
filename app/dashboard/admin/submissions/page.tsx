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

  const showNoResults = submissions && submissions.length === 0;

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
      {showNoResults ? (
        <div className="mt-8 p-4 bg-gray-50 border rounded-md">
          <p className="text-gray-600">
            No results found matching the selected year and medium.
          </p>
        </div>
      ) : (
        <ViewSubmissionTable submissions={submissions} />
      )}
    </main>
  );
};

export default Submissions;
