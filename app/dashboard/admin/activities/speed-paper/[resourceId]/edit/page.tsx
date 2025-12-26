import ResourceEditForm from "@/components/dashboard/ResourceEditForm";

const EditPaper = async ({
    params,
}: {
    params: Promise<{ resourceId: string }>;
}) => {
    const { resourceId } = await params;
    return (
        <ResourceEditForm
            resourceId={resourceId}
            title="Speed Paper"
            type="speed-paper"
        />
    );
};

export default EditPaper;
