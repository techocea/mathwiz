import StudentEditForm from "@/components/dashboard/StudentEditForm";
import { PageHeader } from "@/components/shared/PageHeader";

const StudentEditPage = async ({
    params,
}: {
    params: Promise<{ studentId: string }>;
}) => {
    const { studentId } = await params;
    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Edit student details" description="" />
            <StudentEditForm studentId={studentId} />
        </div>
    );
};

export default StudentEditPage;
