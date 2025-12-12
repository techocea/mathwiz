"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Clock, Loader2 } from "lucide-react";
import DownloadButton from "./DownloadButton";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/helpers/formatTime";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useTimer } from "@/app/providers/TimerContext";

interface PaperProps {
    paperId: string;
    paper: {
        _id: string;
        title: string;
        durationMinutes: number;
        uploadDeadline: string;
        paperUrl: string;
        cloudinaryPublicId: string;
    };
}

const WritePaper = ({ paperId, paper }: PaperProps) => {
    const router = useRouter();
    const [submissionUrl, setSubmissionUrl] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { timeRemaining, isRunning, isTimeUp, currentExamId, startTimer } =
        useTimer();

    // Start the timer if not already running and if the paper exists
    useEffect(() => {
        if (paper && !isRunning && !isTimeUp && currentExamId !== paper._id) {
            startTimer(paper.durationMinutes, paper._id);
        }
    }, [paper, isRunning, isTimeUp, currentExamId, startTimer]);

    //dangerous level
    const getDangerLevel = (): string => {
        if (isTimeUp) return "text-destructive";
        if (timeRemaining < 30000) return "text-red-500";
        if (timeRemaining < 60000) return "text-orange-500";
        return "text-green-500";
    };

    // Calculate progress
    const totalDurationMilliSeconds = (paper?.durationMinutes ?? 0) * 60 * 1000;
    const timeElapsed = totalDurationMilliSeconds - timeRemaining;
    const rawProgress = timeElapsed / totalDurationMilliSeconds;
    const progress = Math.min(
        100,
        Math.max(0, rawProgress * 100)
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!submissionUrl) return toast.error("Please upload a file");

        setIsUploading(true);
        const formData = new FormData();
        formData.append("submissionUrl", submissionUrl);
        formData.append("paperId", paperId);

        if (!paperId) {
            return toast.error("Missing paper ID");
        }

        const examStartTime = localStorage.getItem(`examStartTime_${paperId}`);
        if (examStartTime) {
            formData.append("startTime", examStartTime);
        } else {
            toast.error("Exam start time not found in localStorage.");
        }

        try {
            const res = await axios.post("/api/submissions", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200) {
                toast.success("Answer Sheet submitted successfully!");
                router.push("/dashboard/student/paper");
                // localStorage.removeItem(`examStartTime_${paperId}`);
                setSubmissionUrl(null);
            } else {
                toast.error("Failed to submit answer sheet");
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="lg:max-w-2xl w-full mx-auto">
            <div className="fixed bottom-4 right-4 z-10">
                <div
                    className={`flex items-center space-x-2 min-w-24 lg:p-6 p-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-full border ${isTimeUp ? "border-red-500" : "border-primary/20"
                        }`}
                >
                    <Clock size={20}
                        className={getDangerLevel()} />

                    <span className={`text-2xl font-bold ${getDangerLevel()}`}>
                        {formatTime(timeRemaining)}
                    </span>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-3xl font-bold mb-2">{paper?.title}</h2>
                    <p>Duration: {paper?.durationMinutes} minutes</p>
                </div>

                <div className="mt-4">
                    <Progress value={progress}
                        className="h-2" />
                </div>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm gap-4">
                <CardHeader className="font-semibold text-xl leading-tight">
                    Exam Instructions
                </CardHeader>
                <CardContent className="">
                    <ol className="list-decimal ml-5 space-y-4 text-sm text-muted">
                        <li>Download the exam paper using the button below.</li>
                        <li>Complete all questions in the paper.</li>
                        <li>Scan or photograph your completed work and save as a PDF.</li>
                        <li>Upload your completed work before the timer ends.</li>
                        <li>Once submitted, you cannot resubmit your work.</li>
                    </ol>
                </CardContent>
                <CardFooter className="mt-2 w-full">
                    {isTimeUp ? (
                        <form onSubmit={handleSubmit}
                            className="w-full">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">Submit Your Work</h3>
                                <div className="flex rounded-lg">
                                    <Input
                                        type="file"
                                        onChange={(e) => setSubmissionUrl(e.target.files?.[0] || null)}
                                        accept=".pdf"
                                        className="bg-white rounded-none"
                                        disabled={!isTimeUp || isUploading}
                                    />
                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="rounded-none"
                                            disabled={isUploading}
                                        >
                                            {isUploading ? (
                                                <div>
                                                    <Loader2 className="animate-spin transition-all" />
                                                </div>
                                            ) : (
                                                "Submit Paper"
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* {isTimeUp && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-center">
            <p className="text-destructive font-medium">
              Time&apos;s up! You can no longer submit your paper.
            </p>
          </div>
        )} */}
                        </form>
                    ) : (
                        <DownloadButton
                            variant="outline"
                            publicId={paper.cloudinaryPublicId}
                            fileName={`${paper?.title}`}
                        />

                    )}
                </CardFooter>
            </Card>
            <Separator className="my-8" />
        </div>
    );
};

export default WritePaper;
