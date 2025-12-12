"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ResourceType } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useResources } from "@/hooks/useResource";
import BlurGradient from "@/components/BlurGradient";
import ResourceTable from "@/components/ResourceTable";
import DashboardNavbar from "@/components/DashboardNavbar";
import FilterComponent from "@/components/FilterComponent";

const Homework = () => {
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

    const showNoResults = resources && resources.length === 0;

    if (isLoading) {
        return <div>Loading filters and data...</div>;
    }

    if (isError) {
        return <div>Error loading resources.</div>;
    }

    return (
        <>
            <BlurGradient />

            <main className="min-h-screen flex-1 container lg:max-w-6xl mx-auto p-6">
                <div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Homework Management</h1>
                            <p className="text-muted-foreground">
                                Create and manage homework
                            </p>
                        </div>

                        <Button
                            size="lg"
                            onClick={() =>
                                router.push("/dashboard/admin/activities/homework/create")
                            }
                            className="cursor-pointer"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Homework
                        </Button>
                    </div>

                    <div>
                        <FilterComponent
                            year={year}
                            medium={medium}
                            onYearChange={setYear}
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
                        <ResourceTable resources={resources} />
                    )}
                </div>
            </main>
        </>
    );
};

export default Homework;
