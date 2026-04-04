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
import { Button } from "../ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { useTimer } from "@/app/providers/TimerContext";
import { JSX } from "react";

interface WriteResourceProps {
    resources: any;
    type: "paper" | "speed-paper" | "mini-exam" | "homework" | "worksheet";
}

const WriteResource = ({ resources, type }: WriteResourceProps) => {
    const router = useRouter();
    const { isRunning, currentExamId, startTimer, isTimeUp } = useTimer();

    const handleStartExam = async (
        resourceId: string,
        durationMinutes: number,
    ) => {
        let isThisExamSubmitted =
            localStorage.getItem(`examSubmitted_${resourceId}`) === "true";
        if (isRunning && currentExamId !== resourceId) {
            router.push(`/dashboard/student/${type}/${currentExamId}`);
            return;
        }

        if (isThisExamSubmitted) {
            return;
        }

        const examStartTime = new Date().toISOString();
        try {
            await fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resourceId, startTime: examStartTime }),
            });

            localStorage.setItem(`examStartTime_${resourceId}`, examStartTime);
            startTimer(durationMinutes, resourceId);
            router.push(`/dashboard/student/${type}/${resourceId}`);
        } catch (error) {
            console.error("Start-log failed", error);
            router.push(`/dashboard/student/${type}/${resourceId}`);
        }
    };

    const isExpired = (uploadDeadline: string) => {
        return new Date(uploadDeadline) < new Date();
    };

    return (
        <Card className="w-full rounded-md bg-white/80 py-2 px-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        {(type === "paper" ||
                            type === "speed-paper" ||
                            type === "mini-exam") && <TableHead>Duration</TableHead>}
                        <TableHead>Deadline</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {resources.length > 0 ? (
                        resources.map((r: any) => {
                            const expired = isExpired(r.uploadDeadline);
                            return (
                                <TableRow key={r._id} className={expired ? "opacity-70" : ""}>
                                    <TableCell>
                                        <div className="font-medium flex items-center capitalize gap-2">
                                            {r.title}
                                        </div>
                                    </TableCell>
                                    {r.durationMinutes && (
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-blue-500 mb-0.5" />
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
                                            ((): JSX.Element => {
                                                const isThisExamSubmitted =
                                                    localStorage.getItem(`examSubmitted_${r._id}`) ===
                                                    "true";

                                                // Determine button text based on status
                                                const buttonText =
                                                    isRunning && currentExamId === r._id
                                                        ? "Continue Exam"
                                                        : isTimeUp
                                                            ? "Time's Up"
                                                            : isThisExamSubmitted
                                                                ? "Submitted"
                                                                : "Start Exam";

                                                const isDisabled =
                                                    (isRunning && currentExamId !== r._id) ||
                                                    isExpired(r.uploadDeadline) ||
                                                    isThisExamSubmitted;

                                                return (
                                                    <Button
                                                        size="default"
                                                        disabled={isDisabled}
                                                        onClick={() =>
                                                            handleStartExam(r._id, r.durationMinutes)
                                                        }
                                                    >
                                                        {buttonText}
                                                    </Button>
                                                );
                                            })()
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
                                align="center"
                                className="capitalize py-4 font-medium text-muted-foreground text-center"
                                colSpan={3}
                            >
                                no {type.replace("-", " ")}s yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default WriteResource;
