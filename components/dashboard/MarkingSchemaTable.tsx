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
import { MarkingProps } from "@/types";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useDeleteMarkingSchemes } from "@/hooks/useResource";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const MarkingSchemaTable = ({ markings }: MarkingProps) => {
    const router = useRouter();
    const { mutate: deleteMarking, isPending: isDeleting } =
        useDeleteMarkingSchemes();

    const handleDeleteMarking = ({ markingId }: { markingId: string }) => {
        if (confirm("Are you sure? This cannot be undone.")) {
            deleteMarking(
                { id: markingId },
                {
                    onSuccess: () => router.push("/dashboard/admin/marking"),
                }
            );
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
                        <TableHead>Uploaded At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {markings.length > 0 ? (
                        markings.map((m) => (
                            <TableRow key={m._id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center capitalize gap-2">
                                        {m.title}
                                    </div>
                                </TableCell>
                                <TableCell>{m.year}</TableCell>
                                <TableCell className="capitalize">{m.medium}</TableCell>
                                <TableCell>{format(new Date(m.createdAt), "PP")}</TableCell>
                                <TableCell className="gap-2 flex justify-end">
                                    <Button
                                        size="sm"
                                        disabled={isDeleting}
                                        className="bg-red-100 rounded-sm hover:bg-red-200 text-destructive"
                                        onClick={() => handleDeleteMarking({ markingId: m._id })}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                align="center"
                                className="capitalize py-4 font-medium text-muted-foreground text-center"
                                colSpan={5}
                            >
                                no marking schemes uploaded yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default MarkingSchemaTable;
