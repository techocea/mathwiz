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

const SpeedPapers = () => {
    const router = useRouter();
    const [medium, setMedium] = useState("english");
    const [year, setYear] = useState("2026");

    const resourceType: ResourceType = "speed-paper";

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
                <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between w-full lg:mb-4 mb-10 gap-0 md:gap-4">
                    <PageHeader
                        title="Speed Paper Management"
                        description="Create and manage speed papers"
                    />

                    <Button
                        size="lg"
                        onClick={() =>
                            router.push("/dashboard/admin/activities/speed-paper/create")
                        }
                        className="cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        Create Speed Paper
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

export default SpeedPapers;
