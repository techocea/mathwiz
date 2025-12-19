"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { FileText, Users, Files, SquareCheckBig } from "lucide-react";
import {
    getAdminData,
    getStudentCount,
    getSubmissionsCount,
    getPaperCount,
    getInquiriesCount,
} from "@/services/dashboard.data";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/layout/Loader";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import MarkingSchemeModal from "@/components/dashboard/MarkingSchemeModal";

const AdminDashboardPage = () => {
    const router = useRouter();

    const { data: adminData, isLoading: isAdminLoading } = useQuery({
        queryKey: ["admin-auth"],
        queryFn: getAdminData,
        throwOnError: true,
        retry: 0,
    });

    const { data: totalStudents, isLoading: isStudentsLoading } = useQuery({
        queryKey: ["dashboard-counts", "students"],
        queryFn: getStudentCount,
    });

    const { data: totalPapers, isLoading: isPapersLoading } = useQuery({
        queryKey: ["dashboard-counts", "papers"],
        queryFn: getPaperCount,
    });

    const { data: totalSubmissions, isLoading: isSubmissionsLoading } = useQuery({
        queryKey: ["dashboard-counts", "submissions"],
        queryFn: getSubmissionsCount,
    });

    const { data: totalInquiries, isLoading: isInquiriesLoading } = useQuery({
        queryKey: ["dashboard-counts", "inquiries"],
        queryFn: getInquiriesCount,
    });



    const isLoading =
        isAdminLoading ||
        isStudentsLoading ||
        isPapersLoading ||
        isSubmissionsLoading ||
        isInquiriesLoading;

    if (isLoading) {
        return <Loader />;
    }

    return (
        <main className="min-h-full flex-1 w-full">
            <div>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome, {adminData?.email}
                    </h1>
                    <p className="text-muted-foreground">
                        Here&apos;s an overview of your A/L Combined Mathematics class
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Students
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalStudents ?? 0}</div>
                            <p className="text-xs text-muted-foreground pt-1">
                                Active student accounts
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Papers
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalPapers ?? 0}</div>
                            <p className="text-xs text-muted-foreground pt-1">
                                Papers created
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Submissions
                            </CardTitle>
                            <Files className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalSubmissions ?? 0}</div>
                            <p className="text-xs text-muted-foreground pt-1">
                                Papers submitted
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Inquiries
                            </CardTitle>
                            <SquareCheckBig className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalInquiries ?? 0}</div>
                            <p className="text-xs text-muted-foreground pt-1">Inquiries</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Recent activity from your class</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                        <p className="font-medium">
                                            Dasun Silva submitted Paper 03
                                        </p>
                                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        View
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                        <p className="font-medium">Paper 04 deadline approaching</p>
                                        <p className="text-sm text-muted-foreground">
                                            6 hours remaining
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        View
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                        <p className="font-medium">
                                            Malini Perera started Paper 05
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            30 minutes ago
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        View
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Frequently used admin actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={() => router.push("/dashboard/admin/activities/paper")}
                                    className="w-full justify-start cursor-pointer"
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Manage Papers
                                </Button>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={() => router.push("/dashboard/admin/students")}
                                    className="w-full justify-start cursor-pointer"
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    Manage Students
                                </Button>
                                <MarkingSchemeModal />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboardPage;
