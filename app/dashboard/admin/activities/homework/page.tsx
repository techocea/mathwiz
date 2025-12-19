"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ResourceType } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useResources } from "@/hooks/useResource";
import ResourceTable from "@/components/shared/ResourceTable";
import FilterComponent from "@/components/dashboard/FilterComponent";
import Loader from "@/components/layout/Loader";
import { PageHeader } from "@/components/shared/PageHeader";

const Homework = () => {
    const router = useRouter();
    const [medium, setMedium] = useState("english");
    const [year, setYear] = useState("2026");

    const resourceType: ResourceType = "homework";

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
                        title="Homework Management"
                        description="Create and manage homework"
                    />

                    <Button
                        size="lg"
                        onClick={() =>
                            router.push("/dashboard/admin/activities/homework/create")
                        }
                        className="cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        Create Homework
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

export default Homework;
