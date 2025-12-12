"use client";


import Loader from "@/components/Loader";
import WriteResource from "@/components/WriteResource";
import { useCurrentStudent } from "@/hooks/useCurrentStudent";
import { useStudentResources } from "@/hooks/useStudentResources";

const SpeedPapers = () => {
    const { data: student, isLoading: studentLoading } = useCurrentStudent();
    const { data: speedPapers, isLoading } = useStudentResources("speed-paper", student);

    if (studentLoading || isLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-full flex-1 lg:max-w-6xl w-full mx-auto p-6">
            <div className="flex flex-col space-y-4">
                <div className="">
                    <h2 className="font-bold text-4xl text-black">
                        {student?.year} Speed Papers
                    </h2>
                </div>

                <WriteResource resources={speedPapers} type="speed-paper" />
            </div>
        </div>
    );
};

export default SpeedPapers;
