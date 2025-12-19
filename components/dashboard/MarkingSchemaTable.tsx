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
import { Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MarkingProps } from "@/types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import DownloadButton from "../shared/DownloadButton";

const MarkingSchemaTable = ({ markings }: MarkingProps) => {
    const router = useRouter();

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
                        markings?.map((m) => (
                            <TableRow key={m._id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center capitalize gap-2">
                                        {m.title}
                                    </div>
                                </TableCell>
                                <TableCell>{m.year}</TableCell>
                                <TableCell className="capitalize">{m.medium}</TableCell>
                                <TableCell>{format(new Date(m.createdAt), "PP")}</TableCell>
                                <TableCell align="right">
                                    <DownloadButton
                                        variant="ghost"
                                        enableIcon={false}
                                        publicId={m.cloudinaryPublicId}
                                        fileName={`marking-schema-${m.title}-${m._id}`}
                                    />
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
