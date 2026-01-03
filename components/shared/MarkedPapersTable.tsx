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
        resourceId: {
            title: string;
            firstName: string;
        };
        _id: string;
        title: string;
        remark: string;
        score: number;
        updatedAt: string;
        markedPdfUrl: string;
        markedPublicId: string;
    }[];
}

const MarkedPapersTable = ({ resources }: ResourceProps) => {
    const getScoreColor = (score: number) => {
        if (score >= 75) {
            return <span className="text-green-600 font-semibold"> {score}</span>;
        } else if (score >= 50) {
            return <span className="text-yellow-600 font-semibold"> {score}</span>;
        } else if (score < 50) {
            return <span className="text-red-600 font-semibold"> {score}</span>;
        }
        return <span className="text-gray-600 font-semibold"> {score}</span>;
    };

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
                                        {r.resourceId?.title}
                                    </div>
                                </TableCell>
                                <TableCell>{getScoreColor(r.score)} / 100</TableCell>
                                <TableCell>{r.remark.charAt(0).toUpperCase() + r.remark.slice(1)}</TableCell>
                                <TableCell>{format(new Date(r.updatedAt), "PP")}</TableCell>
                                <TableCell align="right" className="items-end">
                                    <DownloadButton
                                        variant="ghost"
                                        enableIcon={false}
                                        publicId={r.markedPublicId}
                                        fileName={`marked-${r.resourceId.firstName}-${r.resourceId.title}`}
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
