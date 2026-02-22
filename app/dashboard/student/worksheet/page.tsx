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
import { ActiveTabTypes } from "@/global";
import MarkedPapersTable from "@/components/shared/MarkedPapersTable";
import MarkingSchemesTable from "@/components/shared/MarkingSchemesTable";

const Worksheets = () => {
    const [activeTab, setActiveTab] = useState<ActiveTabTypes>("activities");

    const { data: student, isLoading: studentLoading } = useCurrentStudent();
    const { data: workSheets, isLoading: studentResourcesLoading } =
        useStudentResources("worksheet", student);
    const { data: markedPapers, isLoading: studentMarkedPapersLoading } =
        useStudentMarkedPapers("worksheet", student);
    const { data: markingSchemes, isLoading: studentMarkingSchemesLoading } =
        useStudentMarkingSchemes("worksheet", student);

    if (
        studentLoading ||
        studentResourcesLoading ||
        studentMarkingSchemesLoading ||
        studentMarkedPapersLoading
    ) {
        return <Loader />;
    }

    const resourceType = "worksheet";

    const renderContent = () => {
        switch (activeTab) {
            case "activities":
                return <WriteResource resources={workSheets} type={resourceType} />;
            case "marked":
                return <MarkedPapersTable resources={markedPapers} />;
            case "markings":
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
                        title="Worksheets"
                        description="Complete the worksheets and submit"
                    />

                    <TabSection resourceType={resourceType} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </div>

            {renderContent()}
        </div>
    );
};

export default Worksheets;
