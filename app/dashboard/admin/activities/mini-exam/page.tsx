"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import BlurGradient from "@/components/BlurGradient";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FileText, Plus, Eye, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";

interface PaperProps {
    _id: string;
    title: string;
    durationMinutes: number;
    year: string;
    medium: string;
    paperUrl: string;
    submissions: string[];
    uploadDeadline: string;
}

const MiniExams = () => {
    const router = useRouter();
    const [papers, setPapers] = useState<PaperProps[] | null>(null);
    const [loading, setLoading] = useState(false);

    //   useEffect(() => {
    //     const fetchAllPapers = async () => {
    //       setLoading(true);
    //       try {
    //         const res = await axios.get("/api/admin/paper");
    //         setPapers(res.data.papers);
    //       } catch (error) {
    //         console.log("Failed to fetch papers: ", error);
    //         // router.push("/dashboard/admin");
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchAllPapers();
    //   }, [router]);

    if (loading)
        return (
            <div className="min-h-lvh flex items-center justify-center w-full">
                Please Wait <Loader2 className="animate-spin transition-all" />
            </div>
        );

    return (
        <>
            <BlurGradient />
            <DashboardNavbar dashboardType="admin" />
            <main className="min-h-screen flex-1 container lg:max-w-6xl mx-auto p-6">
                <div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Mini Exam Management</h1>
                            <p className="text-muted-foreground">
                                Create and manage mini exams
                            </p>
                        </div>

                        <Button
                            size="lg"
                            onClick={() => router.push("/dashboard/admin/activities/mini-exam/create")}
                            className="cursor-pointer"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Mini Exam
                        </Button>
                    </div>

                    <div className="rounded-lg border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Paper Title</TableHead>
                                    <TableHead>Deadline</TableHead>
                                    <TableHead>Batch</TableHead>
                                    <TableHead>Medium</TableHead>
                                    <TableHead>Time Limit</TableHead>
                                    <TableHead
                                        className="flex items-center justify-center"
                                        align="justify"
                                    >
                                        Submissions
                                    </TableHead>

                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {papers && papers.length > 0 ? (
                                    papers.map((paper) => (
                                        <TableRow key={paper?._id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center capitalize gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    {paper?.title}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(paper?.uploadDeadline), "PPp")}
                                            </TableCell>
                                            <TableCell>{paper?.year}</TableCell>
                                            <TableCell>{paper?.medium}</TableCell>
                                            <TableCell>
                                                {Math.floor(paper.durationMinutes / 60) > 0 &&
                                                    `${Math.floor(paper.durationMinutes / 60)}h `}
                                                {paper.durationMinutes % 60}m
                                            </TableCell>
                                            <TableCell align="center">
                                                {paper?.submissions?.length}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    variant="link"
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        router.push("/dashboard/admin/submissions")
                                                    }
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-6">
                                            No papers found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
        </>
    );
};

export default MiniExams;
