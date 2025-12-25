"use client";

import { useState } from "react";
import Loader from "@/components/layout/Loader";
import { useMarkingSchemes } from "@/hooks/useResource";
import { PageHeader } from "@/components/shared/PageHeader";
import FilterComponent from "@/components/dashboard/FilterComponent";
import MarkingSchemaTable from "@/components/dashboard/MarkingSchemaTable";

const MarkingSchemes = () => {
    const [type, setType] = useState("paper");
    const [year, setYear] = useState("2026");
    const [medium, setMedium] = useState("English");

    const {
        data: markings,
        isError,
        isLoading,
    } = useMarkingSchemes({
        type,
        medium,
        year,
    });



    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading marking schemas.</div>;
    }

    return (
        <main className="min-h-screen flex-1 w-full">
            <div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                    <PageHeader
                        title="Marking Schemes Management"
                        description=" Create and manage marksheets"
                    />
                </div>

                <div>
                    <FilterComponent
                        mode="marking"
                        type={type}
                        year={year}
                        medium={medium}
                        onYearChange={setYear}
                        onTypeChange={setType}
                        onMediumChange={setMedium}
                    />
                </div>

                <MarkingSchemaTable markings={markings} />
            </div>
        </main>
    );
};

export default MarkingSchemes;
