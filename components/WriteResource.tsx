"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FileText, Clock } from "lucide-react";
import { useTimer } from "@/app/providers/TimerContext";

interface WriteResourceProps {
    resources: any;
    type: "paper" | "speed-paper" | "mini-exam" | "homework" | "worksheet";
}

const WriteResource = ({ resources, type }: WriteResourceProps) => {
    const router = useRouter();
    const { isRunning, currentExamId, startTimer, hasSubmitted } = useTimer();


    const handleStartExam = (paperId: string, durationMinutes: number) => {
        if (isRunning && currentExamId !== paperId) {
            router.push(`/dashboard/student/paper/${paperId}`);
            return;
        }

        const examStartTime = new Date().toISOString();
        localStorage.setItem(`examStartTime_${paperId}`, examStartTime);
        startTimer(durationMinutes, paperId);
        router.push(`/dashboard/student/${type}/${paperId}`);
        const blocked = hasSubmitted(paperId);
        return blocked;
    };

    const isExpired = (uploadDeadline: string) => {
        return new Date(uploadDeadline) < new Date();
    };



    return (
        <Card className="mt-6 rounded-md border bg-white/80 py-2 px-4 backdrop-blur-sm shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Paper</TableHead>
                        {(type === "paper" ||
                            type === "speed-paper" ||
                            type === "mini-exam") && <TableHead>Duration</TableHead>}
                        <TableHead>Submit Deadline</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {resources.length > 0 ? (
                        resources.map((r: any) => {
                            const expired = isExpired(r.uploadDeadline);
                            return (
                                <TableRow key={r._id} className={expired ? "opacity-70" : ""}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText size={18} className="text-primary" />
                                        {r.title}
                                    </TableCell>
                                    {r.durationMinutes && (
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Clock size={16} className="text-muted-foreground" />
                                                {Math.floor(r.durationMinutes / 60) > 0 &&
                                                    `${Math.floor(r.durationMinutes / 60)}h `}
                                                {r.durationMinutes % 60}m
                                            </div>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        {format(new Date(r.uploadDeadline), "PP")}
                                    </TableCell>
                                    <TableCell className="text-right">

                                        {r.durationMinutes ? (
                                            <Button
                                                size="sm"
                                                disabled={isRunning || isExpired(r.uploadDeadline)}
                                                onClick={() =>
                                                    handleStartExam(r._id, r.durationMinutes)
                                                }
                                            >
                                                Start
                                            </Button>
                                        ) : (
                                            <Link href={`/dashboard/student/${type}/${r._id}`}>
                                                <Button>View</Button>
                                            </Link>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center text-2xl tracking-widest text-muted-foreground py-6"
                            >
                                Currently Unavailable
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default WriteResource;
