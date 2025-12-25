const EditPaper = async ({
    params,
}: {
    params: Promise<{ resourceId: string }>;
}) => {
    const { resourceId } = await params;
    return <div>EditPaper {resourceId}</div>;
};

export default EditPaper;
