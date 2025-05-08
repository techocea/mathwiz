"use client";

import React, { useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import BlurGradient from "@/components/BlurGradient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { FileText, Clock, Calendar, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePaperFormValues, createPaperSchema } from "@/lib/zod";
import axios from "axios";

const CreatePapersPage = () => {
  const router = useRouter();
  const [durationLimit, setDurationLimit] = useState(60);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePaperFormValues>({
    resolver: zodResolver(createPaperSchema),
  });

  const handleCreatePaper = async (data: CreatePaperFormValues) => {
    try {
      setIsUploading(true);
      const newData = {
        ...data,
        durationMinutes: durationLimit,
      };
      const res = await axios.post("/api/paper", newData);
      if (res.status === 200) {
        toast.success("Paper created successfully");
        router.push("/dashboard/admin/papers");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to create paper");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <BlurGradient />
      <DashboardNavbar dashboardType="admin" />

      <div className="flex-1 container lg:max-w-6xl mx-auto lg:py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <form
              onSubmit={handleSubmit(handleCreatePaper)}
              className="space-y-6"
            >
              <CardHeader>
                <CardTitle className="text-2xl">Paper Details</CardTitle>
                <CardDescription>
                  Enter the details for the new examination paper
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="title">Paper Title</Label>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="e.g. Pure Mathematics Paper 1"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="durationLimit">Duration (minutes)</Label>
                    <span className="text-sm text-muted-foreground">
                      {durationLimit} minutes
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      id="durationMinutes"
                      min={30}
                      max={180}
                      step={15}
                      value={[durationLimit]}
                      onValueChange={(value) => {
                        setDurationLimit(value[0]);
                        setValue("durationMinutes", durationLimit); 
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="uploadDeadline">Upload Deadline</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="uploadDeadline"
                      type="date"
                      {...register("uploadDeadline")}
                    />
                  </div>
                  {errors.uploadDeadline && (
                    <p className="text-sm text-red-500">
                      {errors.uploadDeadline.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Upload Exam Paper</Label>
                  <UploadDropzone
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res) => {
                      // alert("ok");
                      const uploadedUrl = res[0].ufsUrl;
                      setPdfUrl(uploadedUrl);
                      setValue("paperUrl", uploadedUrl);
                    }}
                    onUploadError={(error) => {
                      toast.error(`ERROR! ${error.message}`);
                    }}
                  />
                  {errors.paperUrl && (
                    <p className="text-sm text-red-500">
                      {errors.paperUrl.message}
                    </p>
                  )}
                  {pdfUrl && (
                    <div className="flex items-center justify-between bg-accent p-2 rounded-md">
                      <span className="text-sm truncate max-w-[500px]">
                        {pdfUrl}
                      </span>
                      <Button variant={"outline"} size="sm">
                        {"Change"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end gap-2 w-full">
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => router.push("/dashboard/admin/papers")}
                  >
                    Cancel
                  </Button>
                  <Button disabled={isUploading} className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? "Creating..." : "Create Paper"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CreatePapersPage;
