"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { formatTime } from "@/lib/formatTime";
import { Clock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTimer } from "@/components/contexts/TimerContext";
import { Input } from "./ui/input";
import axios from "axios";
import DownloadButton from "./DownloadButton";

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
  const totalDuration = (paper?.durationMinutes ?? 0) * 1000;
  const timeElapsed = totalDuration - timeRemaining;
  const progress = Math.min(
    1000,
    Math.max(0, (timeElapsed / totalDuration) * 1000)
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
        router.push("/dashboard/student");
        localStorage.removeItem(`examStartTime_${paperId}`);
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
    <>
      <div className="fixed bottom-4 right-4 z-10">
        <div
          className={`flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full border ${
            isTimeUp ? "border-red-500" : "border-primary/20"
          }`}
        >
          <Clock size={20} className={getDangerLevel()} />

          <span className={`text-lg font-bold ${getDangerLevel()}`}>
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
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Card className="mb-8 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Exam Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal ml-5 space-y-2">
            <li>Download the exam paper using the button below.</li>
            <li>Complete all questions in the paper.</li>
            <li>Scan or photograph your completed work and save as a PDF.</li>
            <li>Upload your completed work before the timer ends.</li>
            <li>Once submitted, you cannot resubmit your work.</li>
          </ol>
        </CardContent>
        <CardFooter>
          <DownloadButton
            variant="outline"
            publicId={paper.cloudinaryPublicId}
            fileName={`${paper?.title}`}
          />
        </CardFooter>
      </Card>

      <Separator className="my-8" />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Submit Your Work</h3>

          <div className="flex rounded-lg py-6">
            <Input
              type="file"
              onChange={(e) => setSubmissionUrl(e.target.files?.[0] || null)}
              accept=".pdf"
              className="bg-white rounded-none"
              disabled={isTimeUp || isUploading}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
                className="rounded-none"
                disabled={!submissionUrl || isTimeUp || isUploading}
              >
                {isUploading ? (
                  <div>
                    <Loader2 className="animate-spin transition-all" />
                  </div>
                ) : (
                  "Submit Paper"
                )}
              </Button>
              {/* {file && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected: {file.name}
                </p>
              )} */}
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
    </>
  );
};

export default WritePaper;
