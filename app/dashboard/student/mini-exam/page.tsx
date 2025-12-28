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

const MiniExams = () => {
    const [activeTab, setActiveTab] = useState<ActiveTabTypes>("activities");

    const { data: student, isLoading: studentLoading } = useCurrentStudent();
    const { data: miniExams, isLoading: studentResourcesLoading } =
        useStudentResources("mini-exam", student);
    const { data: markedPapers, isLoading: studentMarkedPapersLoading } =
        useStudentMarkedPapers("mini-exam", student);
    const { data: markingSchemes, isLoading: studentMarkingSchemesLoading } =
        useStudentMarkingSchemes("mini-exam", student);

    if (
        studentLoading ||
        studentResourcesLoading ||
        studentMarkingSchemesLoading ||
        studentMarkedPapersLoading
    ) {
        return <Loader />;
    }

    const resourceType = "mini-exam";

    const renderContent = () => {
        switch (activeTab) {
            case "activities":
                return <WriteResource resources={miniExams} type={resourceType} />;
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
                        title="Mini Exams"
                        description="Complete the paper on the given time"
                    />
                    <TabSection resourceType={resourceType} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </div>
            <div className="w-full">
                {renderContent()}
            </div>
        </div>
    );
};
export default MiniExams;
