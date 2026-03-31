"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import {
    getAdminData,
    getStudentCount,
    getSubmissionsCount,
    getPaperCount,
    getInquiriesCount,
} from "@/services/dashboard.data";
import { useRouter } from "next/navigation";
import Loader from "@/components/layout/Loader";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
    FileText,
    Users,
    Files,
    SquareCheckBig,
    Video,
    ExternalLink,
    Loader2,
} from "lucide-react";
import MarkingSchemeModal from "@/components/dashboard/MarkingSchemeModal";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnlineClassFormValues, onlineClassSchema } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

const AdminDashboardPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(onlineClassSchema),
        defaultValues: {
            year: "2028",
            zoomLink: undefined,
        },
    });
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const onSubmit = async (data: OnlineClassFormValues) => {
        setIsSubmitting(true);
        try {
            const res = await axios.post("/api/admin/online-class", data);
            console.log("Response from server:", res);
            if (res.status === 200) {
                toast.success("Zoom link updated successfully");
                window.location.reload();
            } else {
                toast.error("Error updating zoom link");
            }
        } catch (error) {
            console.error("Error updating zoom link:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Class Control Widget */}
                    <div className="bg-slate-950 text-white p-6 rounded-xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-teal-500/20 rounded-lg">
                                    <Video className="w-5 h-5 text-teal-400" />
                                </div>
                                <h3 className="text-lg font-bold">Online Class Control</h3>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <Label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                            Online Class Link
                                        </Label>
                                        <div className="mt-1.5 relative">
                                            <Input
                                                type="text"
                                                id="zoomLink"
                                                {...register("zoomLink")}
                                                placeholder="Enter zoom link"
                                                className="w-full bg-slate-900 border-slate-800 rounded-lg py-2.5 pl-3 pr-10 text-sm focus:ring-teal-500 focus:border-teal-500 transition-all"
                                            />
                                            <ExternalLink className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            {errors.zoomLink && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.zoomLink.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2.5">
                                        <Label
                                            className="text-xs font-medium text-slate-400 uppercase tracking-wider"
                                            htmlFor="year"
                                        >
                                            Select Batch
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setValue("year", value as "2028" | "2027" | "2026")
                                            }
                                            defaultValue="2028"
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2028">2028</SelectItem>
                                                <SelectItem value="2027">2027</SelectItem>
                                                <SelectItem value="2026">2026</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.year && (
                                            <p className="text-sm text-red-500">
                                                {errors.year.message}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        size="lg"
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-white text-slate-950 font-bold text-sm rounded-lg hover:bg-slate-100 transition-all active:scale-[0.98]"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            " Update Link for All Students"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Frequently used admin actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={() =>
                                        router.push("/dashboard/admin/activities/paper")
                                    }
                                    className="w-full justify-start cursor-pointer"
                                >
                                    <FileText className="h-4 w-4" />
                                    Manage Papers
                                </Button>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={() => router.push("/dashboard/admin/students")}
                                    className="w-full justify-start cursor-pointer"
                                >
                                    <Users className="h-4 w-4" />
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
