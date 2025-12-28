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
import { Clock, Loader2 } from "lucide-react";
import DownloadButton from "./DownloadButton";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/helpers/formatTime";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useTimer } from "@/app/providers/TimerContext";

interface ResourceProps {
  resourceId: string;
  resource: {
    _id: string;
    title: string;
    paperUrl: string;
    cloudinaryPublicId: string;
  };
}

const WriteNormalPaper = ({ resourceId, resource }: ResourceProps) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionUrl) return toast.error("Please upload a file");

    setIsUploading(true);
    const formData = new FormData();
    formData.append("submissionUrl", submissionUrl);
    formData.append("resourceId", resourceId);

    if (!resourceId) {
      return toast.error("Missing resource ID");
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
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold mb-2 capitalize">
            {resource?.title}
          </h2>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm gap-4">
        <CardHeader className="font-semibold text-xl leading-tight">
          Basic Instructions
        </CardHeader>
        <CardContent className="">
          <ol className="list-decimal ml-5 space-y-4 text-sm text-muted">
            <li>Download the paper using the button below.</li>
            <li>Complete all questions in the paper.</li>
            <li>Scan or photograph your completed work and save as a PDF.</li>
            <li>Upload your completed work</li>
            <li>Once submitted, you cannot resubmit your work.</li>
          </ol>
        </CardContent>
        <CardFooter className="mt-2 w-full flex flex-col gap-2 items-start">
          <DownloadButton
            enableIcon={true}
            variant="outline"
            fileName={`${resource?.title}`}
            publicId={resource.cloudinaryPublicId}
          />
          <form onSubmit={handleSubmit} className="w-full mt-2">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Submit Your Work</h3>
              <div className="flex rounded-lg">
                <Input
                  type="file"
                  onChange={(e) =>
                    setSubmissionUrl(e.target.files?.[0] || null)
                  }
                  accept=".pdf"
                  className="bg-white rounded-none"
                  disabled={isUploading}
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
                      "Submit"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardFooter>
      </Card>
      <Separator className="my-8" />
    </div>
  );
};

export default WriteNormalPaper;
