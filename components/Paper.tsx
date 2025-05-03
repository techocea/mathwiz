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
import { MOCK_PAPERS } from "@/lib/constants";
import { formatTime } from "@/lib/formatTime";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useTimer } from "@/components/contexts/TimerContext";
import Link from "next/link";

interface PaperProps {
  paperId: string;
}

const Paper = ({ paperId }: PaperProps) => {
  const router = useRouter();
  const { timeRemaining, isRunning, isTimeUp, currentExamId, startTimer } =
    useTimer();

  const paper = MOCK_PAPERS.find((p) => p.id === paperId);

  // Start the timer if not already running and if the paper exists
  useEffect(() => {
    if (paper && !isRunning && !isTimeUp && currentExamId !== paper.id) {
      startTimer(paper.durationMinutes, paper.id);
    }
  }, [paper, isRunning, isTimeUp, currentExamId, startTimer]);

  //dangerous level
  const getDangerLevel = (): string => {
    if (isTimeUp) return "text-destructive";
    if (timeRemaining < 300) return "text-red-500";
    if (timeRemaining < 600) return "text-orange-500";
    return "text-green-500";
  };

  // Calculate progress
  const totalDuration = (paper?.durationMinutes ?? 0) * 1000;
  const timeElapsed = totalDuration - timeRemaining;
  const progress = Math.min(
    10,
    Math.max(0, (timeElapsed / totalDuration) * 10)
  );

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
          <Button
            variant="outline"
            asChild
            onClick={() => toast.info("Downloading paper...")}
            className="w-full sm:w-auto"
          >
            <a download={paper?.fileUrl}>Download Exam Paper</a>
          </Button>
        </CardFooter>
      </Card>

      <Separator className="my-8" />

      {/* <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Submit Your Work</h3>

            <div className="bg-secondary rounded-lg p-6">
              <Input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                disabled={isTimeUp || isUploading}
                className="bg-white"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!selectedFile || isTimeUp || isUploading}
              variant="default"
            >
              {isUploading ? "Submitting..." : "Submit Paper"}
            </Button>
          </div>

          {isTimeUp && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-center">
              <p className="text-destructive font-medium">
                Time's up! You can no longer submit your paper.
              </p>
            </div>
          )}
        </form> */}
    </>
  );
};

export default Paper;
