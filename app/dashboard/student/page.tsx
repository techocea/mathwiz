"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ASSESSMENT_TYPES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const StudentDashboard = () => {
    const router = useRouter();

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Welcome to Student Portal"
                description="Select an assessment type to view your marked answers and marking schemes."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ASSESSMENT_TYPES.map((type) => (
                    <Card
                        key={type.value}
                        onClick={() => router.push(`/dashboard/student/${type.value}`)}
                        className="group relative bg-card rounded-xl border shadow-card hover:shadow-card-hover px-6 text-left transition-all duration-200 hover:border-primary/30 cursor-pointer"
                    >
                        <CardHeader className="flex items-center justify-between w-full">
                            <span className="text-3xl">{type.icon}</span>
                            <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                                {type.label}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                View marked answers & schemes
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;
