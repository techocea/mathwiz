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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { FileText, Clock, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePaperFormValues, createPaperSchema } from "@/lib/zod";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const CreatePapersPage = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePaperFormValues>({
    resolver: zodResolver(createPaperSchema),
    defaultValues: {
      title: "",
      durationMinutes: 60,
      year: "2025",
      uploadDeadline: undefined,
      paperUrl: undefined,
    },
  });

  const durationMinutes = watch("durationMinutes");
  const uploadDeadline = watch("uploadDeadline");

  const handleCreatePaper = async (data: CreatePaperFormValues) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("durationMinutes", data.durationMinutes.toString());
      formData.append("year", data.year);
      formData.append("uploadDeadline", data.uploadDeadline.toISOString());
      formData.append("paperUrl", data.paperUrl);

      const res = await axios.post("/api/paper", formData);
      if (res.status === 200) {
        toast.success("Paper created successfully");
        router.push("/dashboard/admin/papers");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create exam paper"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <BlurGradient />
      <DashboardNavbar dashboardType="admin" />

      <div className="flex-1 container lg:max-w-6xl mx-auto lg:py-12">
        <div className="max-w-xl mx-auto">
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
                    <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                    <span className="text-sm text-muted-foreground">
                      {durationMinutes} minutes
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      id="durationMinutes"
                      min={15}
                      max={180}
                      step={5}
                      onValueChange={(value) =>
                        setValue("durationMinutes", value[0])
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="year">Select Batch</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("year", value as "2025" | "2026" | "2027")
                      }
                      defaultValue="2025"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.year && (
                      <p className="text-sm text-red-500">
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="uploadDeadline">Upload Deadline</Label>
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !uploadDeadline && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {uploadDeadline
                              ? format(uploadDeadline, "PPP")
                              : "Select deadline"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={uploadDeadline}
                            onSelect={(date) =>
                              date && setValue("uploadDeadline", date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {errors.uploadDeadline && (
                      <p className="text-sm text-red-500">
                        {errors.uploadDeadline.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="paperUrl">Upload Exam Paper</Label>
                  <Input
                    id="paperUrl"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setValue("paperUrl", e.target.files[0]);
                      }
                    }}
                  />
                  {errors.paperUrl && (
                    <p className="text-sm text-red-500">
                      {errors.paperUrl.message}
                    </p>
                  )}
                  {/* {pdfUrl && (
                    <div className="flex items-center justify-between bg-accent p-2 rounded-md">
                      <span className="text-sm truncate max-w-[500px]">
                        {pdfUrl}
                      </span>
                      <Button variant={"outline"} size="sm">
                        {"Change"}
                      </Button>
                    </div>
                  )} */}
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
