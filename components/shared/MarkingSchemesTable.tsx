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
import { Card } from "@/components/ui/card";
import DownloadButton from "./DownloadButton";

interface ResourceProps {
    resources: {
        _id: string;
        title: string;
        updatedAt: string;
        markingSchemeUrl: string;
        cloudinaryPublicId: string;
    }[];
}

const MarkingSchemesTable = ({ resources }: ResourceProps) => {
    return (
        <Card className="p-2 rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Uploaded At</TableHead>
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

                                <TableCell>{format(new Date(r.updatedAt), "PP")}</TableCell>
                                <TableCell align="right" className="items-end">
                                    <DownloadButton
                                        variant="ghost"
                                        enableIcon={false}
                                        publicId={r.cloudinaryPublicId}
                                        fileName={`marked-${r._id}-${r.title}`}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                align="center"
                                className="capitalize py-4 font-medium text-muted-foreground text-center"
                                colSpan={3}
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

export default MarkingSchemesTable;
