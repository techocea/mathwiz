"use client";

import Loader from "@/components/layout/Loader";
import TabSection from "@/components/dashboard/TabSection";
import { PageHeader } from "@/components/shared/PageHeader";
import WriteResource from "@/components/shared/WriteResource";
import { useCurrentStudent } from "@/hooks/useCurrentStudent";
import {
    useStudentMarkingSchemes,
    useStudentResources,
} from "@/hooks/useStudentResources";
import { useState } from "react";
import { ActiveTabTypes } from "@/types";
import MarkingSchemesTable from "@/components/shared/MarkingSchemesTable";

const Homework = () => {
    const [activeTab, setActiveTab] = useState<ActiveTabTypes>("activities");

    const { data: student, isLoading: studentLoading } = useCurrentStudent();
    const { data: homework, isLoading: studentResourcesLoading } =
        useStudentResources("homework", student);
    // const { data: markedPapers, isLoading: studentMarkedPapersLoading } =
    //     useStudentMarkedPapers("homework", student);
    const { data: markingSchemes, isLoading: studentMarkingSchemesLoading } =
        useStudentMarkingSchemes("homework", student);

    if (
        studentLoading ||
        studentResourcesLoading ||
        studentMarkingSchemesLoading
        // studentMarkedPapersLoading
    ) {
        return <Loader />;
    }

    const resourceType = "homework";

    const renderContent = () => {
        switch (activeTab) {
            case "activities":
                return <WriteResource resources={homework} type={resourceType} />;
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
                        title="Homework"
                        description="Complete the homework and submit"
                    />
                    <TabSection resourceType={resourceType} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </div>

            {renderContent()}
        </div>
    );
};

export default Homework;
