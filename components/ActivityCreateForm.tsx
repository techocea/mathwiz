"use client";

import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Clock, Upload, CalendarIcon, Loader2 } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createResourceSchema } from "@/lib/validation";
import { toast } from "@/components/ui/sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ActivityCreateFormProps {
    title: string;
    type: "paper" | "speed-paper" | "mini-exam" | "homework" | "worksheet";
}

const ActivityCreateForm = ({ type, title }: ActivityCreateFormProps) => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createResourceSchema),
        defaultValues: {
            title: "",
            medium: "sinhala",
            year: "2025",
            uploadDeadline: undefined,
            paperUrl: undefined,
            durationMinutes: undefined,
            type,
        },
    });

    const durationMinutes = watch("durationMinutes");
    const uploadDeadline = watch("uploadDeadline");

    const onSubmit = async (data: any) => {
        setIsUploading(true);
        try {
            const formData = new FormData();

            formData.append("type", type);
            formData.append("year", data.year);
            formData.append("title", data.title);
            formData.append("medium", data.medium);

            formData.append(
                "uploadDeadline",
                (data.uploadDeadline as Date).toISOString()
            );

            if (data.durationMinutes !== undefined)
                formData.append("durationMinutes", String(data.durationMinutes));

            if (data.paperUrl) formData.append("paperUrl", data.paperUrl);

            const res = await axios.post("/api/admin/resources", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(res.data.message || "Created");
            console.log(res);

            if (res.status === 200) {
                toast.success(`${title} created successfully`);
                router.push(`/dashboard/admin/activities/${type}`);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error: any) {
            console.log("failed to create activity:", error);
            toast.error(
                error?.response?.data?.message || error.message || "Upload failed"
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Card>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                encType="multipart/form-data"
            >
                <CardHeader>
                    <CardTitle className="text-2xl capitalize">{title} details</CardTitle>
                    <CardDescription>Enter the details for the {title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label htmlFor="title">Title</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="title"
                                    {...register("title")}
                                    placeholder="Title here"
                                />
                            </div>
                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title.message}</p>
                            )}
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="medium">Select Medium</Label>
                            <Select
                                onValueChange={(value) =>
                                    setValue("medium", value as "sinhala" | "english")
                                }
                                defaultValue="sinhala"
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select medium" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sinhala">sinhala</SelectItem>
                                    <SelectItem value="english">english</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {(type === "paper" ||
                        type === "speed-paper" ||
                        type === "mini-exam") && (
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
                                        min={5}
                                        max={180}
                                        step={5}
                                        onValueChange={(value) =>
                                            setValue("durationMinutes", value[0])
                                        }
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        )}
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
                                <p className="text-sm text-red-500">{errors.year.message}</p>
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
                                            {uploadDeadline instanceof Date
                                                ? format(uploadDeadline, "PPP")
                                                : "Select deadline"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            //   selected={uploadDeadline}
                                            onSelect={(date) =>
                                                setValue("uploadDeadline", date || undefined)
                                            }
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
                        <Label htmlFor="paperUrl" className="capitalize">
                            Upload {title}
                        </Label>
                        <Input
                            id="paperUrl"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setValue("paperUrl", e.target.files[0]);
                                }
                            }}
                        />
                        {errors.paperUrl && (
                            <p className="text-sm text-red-500">
                                {String(errors.paperUrl?.message)}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-end gap-2 w-full">
                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => router.push("/dashboard/admin/activities/papers")}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUploading}
                            className="cursor-pointer"
                        >
                            <Upload className="h-4 w-4 mr-1" />
                            {isUploading ? (
                                <div className="flex gap-2">
                                    Please Wait{" "}
                                    <Loader2 className="animate-spin transition-all" />
                                </div>
                            ) : (
                                <span className="capitalize">create {title}</span>
                            )}
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ActivityCreateForm;
