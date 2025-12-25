"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";
import { StudentProps } from "@/types";
import { Button } from "../ui/button";
import { Ban, Check, Pen, Trash2, X } from "lucide-react";
import { useUpdateStudentStatus } from "@/hooks/useStudents";
import { useRouter } from "next/navigation";

const ViewStudentsTable = ({ students }: StudentProps) => {
    const router = useRouter();
    const { mutate: updateStatus, isPending } = useUpdateStudentStatus();

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-50 text-green-700";
            case "rejected":
                return "bg-red-50 text-red-700";
            case "banned":
                return "bg-red-50 text-red-800";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    return (
        <Card className="p-2 rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>Medium</TableHead>
                        <TableHead>Tuition Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.length > 0 ? (
                        students.map((s) => (
                            <TableRow key={s._id}>
                                <TableCell className="font-medium capitalize">
                                    {s.firstName} {s.lastName}
                                </TableCell>
                                <TableCell>{s.email}</TableCell>
                                <TableCell>{s.contact}</TableCell>
                                <TableCell>{s.year}</TableCell>
                                <TableCell className="capitalize">{s.school}</TableCell>
                                <TableCell className="capitalize">{s.medium}</TableCell>
                                <TableCell>
                                    {s.tuitionType
                                        ? [
                                            s.tuitionType.theory ? "Theory" : null,
                                            s.tuitionType.revision ? "Revision" : null,
                                            s.tuitionType.paper ? "Paper" : null,
                                        ]
                                            .filter(Boolean)
                                            .join(", ") || "None"
                                        : "None"}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                            s.status
                                        )}`}
                                    >
                                        {s.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1.5">
                                        {s.status === "pending" ? (
                                            <>
                                                <Button
                                                    size="sm"
                                                    className="bg-green-200 rounded-sm hover:bg-green-300 text-green-700"
                                                    disabled={isPending}
                                                    onClick={() =>
                                                        updateStatus({
                                                            studentId: s._id,
                                                            newStatus: "approved",
                                                        })
                                                    }
                                                >
                                                    <Check className=" h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-200 rounded-sm hover:bg-red-300 text-destructive"
                                                    disabled={isPending}
                                                    onClick={() =>
                                                        updateStatus({
                                                            studentId: s._id,
                                                            newStatus: "rejected",
                                                        })
                                                    }
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    size="sm"
                                                    className="bg-blue-100 rounded-sm hover:bg-blue-200 text-blue-700"
                                                    disabled={isPending}
                                                    onClick={() =>
                                                        router.push(
                                                            `/dashboard/admin/students/${s._id}/edit`
                                                        )
                                                    }
                                                >
                                                    <Pen className=" h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-100 rounded-sm hover:bg-red-200 text-destructive"
                                                    disabled={isPending}
                                                //   onClick={handleDeleteStudent(s._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-yellow-100 rounded-sm hover:bg-yellow-200 text-yellow-700"
                                                    disabled={isPending}
                                                    onClick={() =>
                                                        updateStatus({
                                                            studentId: s._id,
                                                            newStatus: "banned",
                                                        })
                                                    }
                                                >
                                                    <Ban className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center py-6">
                                No students found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default ViewStudentsTable;
