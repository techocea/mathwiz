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
import { Eye, Pen, Trash2 } from "lucide-react";
import { useDeleteResource } from "@/hooks/useResource";

const ResourceTable = ({ resources, type }: ResourceProps) => {
    const router = useRouter();
    const { mutate: deleteResource, isPending: isDeleting } = useDeleteResource();

    const handleDeleteResource = ({ resourceId }: { resourceId: string }) => {
        if (confirm("Are you sure? This cannot be undone.")) {
            deleteResource({ id: resourceId }, {
                onSuccess: () => router.push(`/dashboard/admin/activities/${type}`),
            });
        }
    };
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
                                <TableCell className="gap-2 flex justify-end">
                                    <>
                                        <Button
                                            size="sm"
                                            className="bg-blue-100 rounded-sm hover:bg-blue-200 text-blue-700"
                                            onClick={() =>
                                                router.push(
                                                    `/dashboard/admin/activities/${type}/${r._id}/edit`
                                                )
                                            }
                                        >
                                            <Pen className=" h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="bg-red-100 rounded-sm hover:bg-red-200 text-destructive"
                                            onClick={() => handleDeleteResource({ resourceId: r._id })}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                align="center"
                                className="capitalize py-4 font-medium text-muted-foreground text-center"
                                colSpan={7}
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
