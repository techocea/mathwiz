"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { FileText, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ResourceProps } from "@/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ResourceTable = ({ resources }: ResourceProps) => {
    const router = useRouter();

    return (
        <Card className="p-2 rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
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
                    {resources?.map((r) => (
                        <TableRow key={r._id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center capitalize gap-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    {r.title}
                                </div>
                            </TableCell>
                            <TableCell>{format(new Date(r.uploadDeadline), "PP")}</TableCell>
                            <TableCell>{r.year}</TableCell>
                            <TableCell>{r.medium}</TableCell>
                            <TableCell>
                                {Math.floor(r.durationMinutes / 60) > 0 &&
                                    `${Math.floor(r.durationMinutes / 60)}h `}
                                {r.durationMinutes % 60}m
                            </TableCell>
                            <TableCell align="center">{r.submissions.length}</TableCell>

                            <TableCell className="text-right">
                                <Button
                                    size="sm"
                                    variant="link"
                                    className="cursor-pointer"
                                    onClick={() => router.push("/dashboard/admin/submissions")}
                                >
                                    <Eye className="h-4 w-4" />
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default ResourceTable;
