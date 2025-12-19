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

const MiniExams = () => {
    const router = useRouter();
    const [medium, setMedium] = useState("english");
    const [year, setYear] = useState("2026");

    const resourceType: ResourceType = "mini-exam";

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
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading resources.</div>;
    }

    return (
        <main className="min-h-screen flex-1 w-full">
            <div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                    <PageHeader
                        title="Mini Exam Management"
                        description=" Create and manage mini exams"
                    />

                    <Button
                        size="lg"
                        onClick={() =>
                            router.push("/dashboard/admin/activities/mini-exam/create")
                        }
                        className="cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        Create Mini Exam
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

export default MiniExams;
