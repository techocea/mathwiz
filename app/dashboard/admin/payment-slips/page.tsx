"use client";

import Loader from "@/components/layout/Loader";
import { usePaymentSlips } from "@/hooks/useStudents";
import { PageHeader } from "@/components/shared/PageHeader";
import ViewPaymentsTable from "@/components/dashboard/ViewPaymentsTable";

const PaymentSlips = () => {
    const { data: payments, isError, isLoading } = usePaymentSlips();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading payment slips.</div>;
    }

    return (
        <main className="min-h-full flex-1 w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                <div>
                    <PageHeader
                        title="Payment Slips"
                        description="View and manage student payment slips"
                    />
                </div>
            </div>

            <ViewPaymentsTable payments={payments} />
        </main>
    );
};

export default PaymentSlips;
