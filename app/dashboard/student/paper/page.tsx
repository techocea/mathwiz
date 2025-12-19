"use client";

import Loader from "@/components/layout/Loader";
import TabSection from "@/components/dashboard/TabSection";
import { PageHeader } from "@/components/shared/PageHeader";
import WriteResource from "@/components/shared/WriteResource";
import { useCurrentStudent } from "@/hooks/useCurrentStudent";
import {
  useStudentMarkedPapers,
  useStudentMarkingSchemes,
  useStudentResources,
} from "@/hooks/useStudentResources";
import { useState } from "react";
import { ActiveTabTypes } from "@/types";
import MarkedPapersTable from "@/components/shared/MarkedPapersTable";
import MarkingSchemesTable from "@/components/shared/MarkingSchemesTable";

const Papers = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabTypes>("activities");

  const { data: student, isLoading: studentLoading } = useCurrentStudent();
  const { data: papers, isLoading: studentResourcesLoading } =
    useStudentResources("paper", student);
  const { data: markedPapers, isLoading: studentMarkedPapersLoading } =
    useStudentMarkedPapers("paper", student);
  const { data: markingSchemes, isLoading: studentMarkingSchemesLoading } =
    useStudentMarkingSchemes("paper", student);

  if (
    studentLoading ||
    studentResourcesLoading ||
    studentMarkingSchemesLoading ||
    studentMarkedPapersLoading
  ) {
    return <Loader />;
  }

  const resourceType = "paper";

  const renderContent = () => {
    switch (activeTab) {
      case "activities":
        return <WriteResource resources={papers} type={resourceType} />;
      case "marked-papers":
        return <MarkedPapersTable resources={markedPapers} />;
      case "marking-schemes":
        return <MarkingSchemesTable resources={markingSchemes} />;
      default:
        null;
    }
  };

  return (
    <div className="min-h-full flex-1 w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-8 w-full">
          <PageHeader
            title="Papers"
            description="Complete the paper on the given time"
          />
          <TabSection resourceType={resourceType} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default Papers;
