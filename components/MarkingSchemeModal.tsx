"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Clock, Loader2, Upload } from "lucide-react";
import { markingSchema } from "@/lib/validation";

const MarkingSchemeModal = () => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadMarkingOpen, setIsUploadMarkingOpen] = useState(false);

    const handleUploadMarkingModal = () => {
        setIsUploadMarkingOpen((prev) => !prev);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(markingSchema),
        defaultValues: {
            title: "",
            type: "paper",
            medium: "english",
            year: "2025",
            markingSchemeUrl: undefined,
        },
    });
    const onSubmit = async (data: any) => {
        setIsUploading(true);
        try {
            const formData = new FormData();

            formData.append("type", data.type);
            formData.append("year", data.year);
            formData.append("title", data.title);
            formData.append("medium", data.medium);

            if (data.markingSchemeUrl)
                formData.append("markingSchemeUrl", data.markingSchemeUrl);

            const res = await axios.post("/api/admin/marking", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(res.data.message || "Created");

            if (res.status === 200) {
                toast.success("Marking created successfully");
                setIsUploadMarkingOpen(false);
                router.push("/dashboard/admin");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error: any) {
            console.log("failed to create marking scheme:", error);
            toast.error(
                error?.response?.data?.message || error.message || "Upload failed"
            );
            setIsUploadMarkingOpen(false);
        } finally {
            setIsUploading(false);
            setIsUploadMarkingOpen(false);
        }
    };
    return (
        <>
            <Button
                onClick={handleUploadMarkingModal}
                variant="outline"
                className="w-full justify-start"
            >
                <Clock className="mr-2 h-4 w-4" />
                Upload Marksheet
            </Button>
            {isUploadMarkingOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 lg:px-0">
                    <Card className="max-w-lg w-full">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                            encType="multipart/form-data"
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl capitalize"> details</CardTitle>
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
                                            <p className="text-sm text-red-500">
                                                {errors.title.message}
                                            </p>
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
                                        <Label htmlFor="type">Select Type</Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setValue("type", value as "paper" | "mini-exam" | "homework" | "speed-paper" | "worksheet")
                                            }
                                            defaultValue="paper"
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="paper">Paper</SelectItem>
                                                <SelectItem value="mini-exam">Mini Exam</SelectItem>
                                                <SelectItem value="homework">Homework</SelectItem>
                                                <SelectItem value="speed-paper">Speed Paper</SelectItem>
                                                <SelectItem value="worksheet">Worksheet</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && (
                                            <p className="text-sm text-red-500">
                                                {errors.type.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="markingSchemeUrl" className="capitalize">
                                        Upload
                                    </Label>
                                    <Input
                                        id="markingSchemeUrl"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setValue("markingSchemeUrl", e.target.files[0]);
                                            }
                                        }}
                                    />
                                    {errors.markingSchemeUrl && (
                                        <p className="text-sm text-red-500">
                                            {String(errors.markingSchemeUrl?.message)}
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
                                        onClick={handleUploadMarkingModal}
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
                                            <span className="capitalize">upload</span>
                                        )}
                                    </Button>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            )}
        </>
    );
};

export default MarkingSchemeModal;
