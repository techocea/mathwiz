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
        paperId: {
            title: string;
            firstName: string;
        };
        _id: string;
        title: string;
        remark: string;
        score: string;
        updatedAt: string;
        markedPdfUrl: string;
        markedPublicId: string;
    }[];
}

const MarkedPapersTable = ({ resources }: ResourceProps) => {
    return (
        <Card className="p-2 rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Remark</TableHead>
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
                                        {r.paperId?.title}
                                    </div>
                                </TableCell>

                                <TableCell><span className="font-medium text-blue-500">{r.score}</span>/100</TableCell>
                                <TableCell>{r.remark}</TableCell>
                                <TableCell>{format(new Date(r.updatedAt), "PP")}</TableCell>
                                <TableCell align="right" className="items-end">
                                    <DownloadButton
                                        variant="ghost"
                                        enableIcon={false}
                                        publicId={r.markedPublicId}
                                        fileName={`marked-${r.paperId.firstName}-${r.paperId.title}`}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell align="center" className="capitalize py-4 font-medium text-muted-foreground text-center" colSpan={5}>
                                no marked papers yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default MarkedPapersTable;
