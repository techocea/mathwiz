"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, Heading1, Loader2, Lock } from "lucide-react";
import DownloadButton from "./DownloadButton";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/helpers/formatTime";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useTimer } from "@/app/providers/TimerContext";
import { Worker, Viewer } from "@react-pdf-viewer/core";

interface PaperProps {
  resourceId: string;
  paper: {
    _id: string;
    title: string;
    durationMinutes: number;
    uploadDeadline: string;
    paperUrl: string;
    cloudinaryPublicId: string;
  };
}

const WriteTimedResource = ({ resourceId, paper }: PaperProps) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState<File | null>(null);
  const {
    timeRemaining,
    isTimeUp,
    currentExamId,
    startTimer,
    hasSubmitted,
    setExamSubmitted,
  } = useTimer();

  const isLocked = isTimeUp || hasSubmitted;

  useEffect(() => {
    if (paper && currentExamId !== paper._id && !isLocked) {
      startTimer(paper.durationMinutes, paper._id);
    }
  }, [paper, isLocked, currentExamId, startTimer]);

  const getDangerLevel = (): string => {
    if (isTimeUp) return "text-destructive";
    if (timeRemaining < 30000) return "text-red-500";
    if (timeRemaining < 60000) return "text-orange-500";
    return "text-green-500";
  };

  const totalDurationMilliSeconds = (paper?.durationMinutes ?? 0) * 60 * 1000;
  const timeElapsed = totalDurationMilliSeconds - timeRemaining;
  const rawProgress = timeElapsed / totalDurationMilliSeconds;
  const progress = Math.min(100, Math.max(0, rawProgress * 100));

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-6 text-center">
        <Lock size={48} className="text-slate-400 mb-4" />
        <h2 className="text-xl font-bold">Exam Session Ended</h2>
        <p className="text-slate-500">
          You have already submitted or the time has expired.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      toast.error("Submission period has ended. Exam is locked.");
      return;
    }

    if (!submissionUrl) {
      toast.error("Please upload a file");
      return;
    }

    if (!resourceId) {
      toast.error("Missing resource ID");
      return;
    }

    const alreadySubmitted =
      localStorage.getItem(`examSubmitted_${resourceId}`) === "true";
    if (alreadySubmitted) {
      toast.error("This exam has already been submitted.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("submissionUrl", submissionUrl);
    formData.append("resourceId", resourceId);

    const examStartTime = localStorage.getItem(`examStartTime_${resourceId}`);
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
        setExamSubmitted(resourceId);
        router.push("/dashboard/student");
        setSubmissionUrl(null);
      } else {
        toast.error("Failed to submit answer sheet");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsUploading(false);
      setExamSubmitted(resourceId);
    }
  };

  return (
    <div className="lg:max-w-2xl w-full lg:mx-auto">
      <div className="fixed top-1/6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl px-6 py-3 flex items-center justify-between transition-all duration-300">
          {/* Timer Section */}
          <div className="flex items-center gap-4">
            <div
              className={`p-2.5 rounded-2xl transition-colors ${timeRemaining < 300 ? "bg-red-50" : "bg-indigo-50/50"}`}
            >
              <Clock
                size={22}
                className={`${getDangerLevel()} transition-all`}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-2xl font-mono font-black tracking-tighter leading-none ${getDangerLevel()}`}
              >
                {formatTime(timeRemaining)}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Time Remaining
              </span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-10 w-px bg-slate-200/60 mx-2 hidden sm:block" />

          {/* Progress Section */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-black text-slate-700 leading-none">
                {Math.round(progress)}%{" "}
                <span className="text-slate-400 font-medium">Done</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Current Progress
              </span>
            </div>

            {/* Sleek Progress Ring */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-slate-100"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={125.6}
                  strokeDashoffset={125.6 - (125.6 * progress) / 100}
                  strokeLinecap="round"
                  className="text-indigo-600 transition-all duration-1000 ease-in-out"
                />
              </svg>
              <span className="absolute text-[10px] font-black text-slate-600 sm:hidden">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Paper Hero Section */}
      <div className="mt-8 mb-6 px-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <BookOpen size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Active Examination
            </span>
          </div>
          <h1 className="text-4xl font-extrabold capitalize text-slate-900 tracking-tight">
            {paper?.title}
          </h1>
        </div>
      </div>

      {/* Instructions and Preview Section */}
      <div className="grid grid-cols-1 gap-16">
        {/* Instructions Card */}
        <Card className="bg-primary/5 shadow-sm border-slate-200">
          <CardHeader>
            <h3 className="font-bold text-lg text-slate-800">
              Exam Instructions
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                "Read all questions carefully before starting.",
                "Ensure your handwriting is clear and legible.",
                "Scan your work as a single PDF file.",
                "Submit before the timer reaches zero.",
              ].map((inst, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="flex-none flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px]">
                    {i + 1}
                  </span>
                  {inst}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* PDF Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold capitalize text-slate-900 tracking-tight">
              Paper Preview
            </h1>
          </div>

          <div className="group relative rounded-xl border-4 border-slate-100 bg-slate-100 shadow-inner overflow-hidden transition-all">
            {/* Subtle anti-copy overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none border border-black/5 rounded-lg" />

            <iframe
              src={`${paper.paperUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-[800px] bg-white rounded-lg shadow-lg"
              title="PDF Viewer"
            />
          </div>
        </div>

        {/* Submission Section */}
        <Card className="border-2 border-primary/10 bg-primary/5">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg text-slate-800">
                  Upload Answer Script
                </h3>

                <p className="text-sm text-slate-500">
                  Only PDF files are accepted. Max size 10MB.
                </p>
              </div>

              <div className="flex bg-white rounded-lg">
                <Input
                  type="file"
                  onChange={(e) =>
                    setSubmissionUrl(e.target.files?.[0] || null)
                  }
                  accept=".pdf"
                  className="bg-white rounded-none"
                  disabled={isUploading || isLocked}
                />
                <Button
                  type="submit"
                  className="px-8 shadow-lg shadow-primary/20 transition-all active:scale-95"
                  disabled={isUploading || isLocked || !submissionUrl}
                >
                  {isUploading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WriteTimedResource;
