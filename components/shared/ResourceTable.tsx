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
import { Button } from "../ui/button";
import { ResourceProps } from "@/types";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";

const ResourceTable = ({ resources, type }: ResourceProps) => {
    const router = useRouter();

    return (
        <Card className="p-2 rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Medium</TableHead>
                        {(type === "paper" ||
                            type === "speed-paper" ||
                            type === "mini-exam") && <TableHead>Time Limit</TableHead>}
                        <TableHead>Deadline</TableHead>
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
                    {resources.length > 0 ? (
                        resources.map((r) => (
                            <TableRow key={r._id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center capitalize gap-2">
                                        {r.title}
                                    </div>
                                </TableCell>

                                <TableCell>{r.year}</TableCell>
                                <TableCell className="capitalize">{r.medium}</TableCell>
                                {r.durationMinutes && (
                                    <TableCell>
                                        {Math.floor(r.durationMinutes / 60) > 0 &&
                                            `${Math.floor(r.durationMinutes / 60)}h `}
                                        {r.durationMinutes % 60}m
                                    </TableCell>
                                )}
                                <TableCell>
                                    {format(new Date(r.uploadDeadline), "PP")}
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
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                align="center"
                                className="capitalize py-4 font-medium text-muted-foreground text-center"
                                colSpan={4}
                            >
                                no {type.replace("-", " ")} uploaded yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default ResourceTable;
