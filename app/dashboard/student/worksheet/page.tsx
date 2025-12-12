"use client";

import Loader from "@/components/Loader";
import WriteResource from "@/components/WriteResource";
import { useCurrentStudent } from "@/hooks/useCurrentStudent";
import { useStudentResources } from "@/hooks/useStudentResources";

const Worksheets = () => {
    const { data: student, isLoading: studentLoading } = useCurrentStudent();
    const { data: worksheets, isLoading } = useStudentResources(
        "worksheet",
        student
    );

    if (studentLoading || isLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-full flex-1 lg:max-w-6xl w-full mx-auto p-6">
            <div className="flex flex-col space-y-4">
                <div className="">
                    <h2 className="font-bold text-4xl text-black">
                        {student?.year} Worksheets
                    </h2>
                </div>

                <WriteResource resources={worksheets} type="worksheet" />
            </div>
        </div>
    );
};

export default Worksheets;
