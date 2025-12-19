"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/layout/Loader";
import { Button } from "@/components/ui/button";
import { useStudentDetails } from "@/hooks/useStudents";
import { PageHeader } from "@/components/shared/PageHeader";
import FilterComponent from "@/components/dashboard/FilterComponent";
import ViewStudentsTable from "@/components/dashboard/ViewStudentsTable";

const DisplayStudentsPage = () => {
  const router = useRouter();
  const [year, setYear] = useState("2026");
  const [medium, setMedium] = useState("english");

  const {
    data: students,
    isError,
    isLoading,
  } = useStudentDetails({
    medium,
    year,
  });

  if (isLoading) return <Loader />;
  if (isError) {
    return <div>Error loading students.</div>;
  }

  return (
    <main className="min-h-screen flex-1 w-full">
      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
          <PageHeader
            title="Student Management"
            description="Manage students in your class"
          />

          <Button
            size="lg"
            onClick={() => router.push("/dashboard/admin/students/create")}
            className="cursor-pointer"
          >
            <UserPlus className="mr-1 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <div>
        <FilterComponent
          mode="students"
          year={year}
          medium={medium}
          onYearChange={setYear}
          onMediumChange={setMedium}
        />
      </div>

      <ViewStudentsTable students={students} />
    </main>
  );
};

export default DisplayStudentsPage;
