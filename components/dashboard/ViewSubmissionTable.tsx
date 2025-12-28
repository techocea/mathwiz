import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { SubmissionProps } from "@/types";
import { MoreHorizontal } from "lucide-react";
import DownloadButton from "../shared/DownloadButton";
import UploadMarkedAnswerModal from "./UploadMarkedAnswerModal";

const ViewSubmissionTable = ({ submissions }: SubmissionProps) => {
    return (
        <Card className="p-2 rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Paper Title</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Submit Time</TableHead>
                        {/* <TableHead>Status</TableHead> */}
                        <TableHead align="center" className="text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions.length > 0 ? (
                        submissions?.map((s) => (
                            <TableRow key={s._id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center capitalize gap-2">
                                        {s.studentId.firstName}&nbsp;
                                        {s.studentId.lastName}
                                    </div>
                                </TableCell>
                                <TableCell className="capitalize">{s.resourceId.title}</TableCell>
                                <TableCell>{new Date(s.startTime).toLocaleString()}</TableCell>
                                <TableCell>
                                    {new Date(s.createdAt).toLocaleString()}
                                </TableCell>
                                {/* <TableCell>Graded</TableCell> */}
                                <TableCell align="center" className="cursor-pointer">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="border-2 w-full relative"
                                        >
                                            <DropdownMenuItem asChild>
                                                <UploadMarkedAnswerModal submissionId={s._id} />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <DownloadButton
                                                    enableIcon={false}
                                                    variant="ghost"
                                                    publicId={s.submissionPublicId}
                                                    fileName={`submission-${s?.studentId?.firstName}-${s?.resourceId?.title}`}
                                                />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-6">
                                No submissions found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default ViewSubmissionTable;
