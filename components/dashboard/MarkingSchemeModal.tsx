"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { markingSchema } from "@/lib/validation";
import { Loader2, Plus, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const MarkingSchemeModal = () => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

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
            year: "2028",
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

            const res = await axios.post("/api/admin/marking-schemes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(res.data.message || "Created");

            if (res.status === 200) {
                toast.success("Marking created successfully");
                router.push("/dashboard/admin");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error: any) {
            console.log("failed to create marking scheme:", error);
            toast.error(
                error?.response?.data?.message || error.message || "Upload failed"
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    variant="default"
                    className="cursor-pointer px-0 flex items-center text-sm font-medium justify-start gap-2"
                >
                    <Plus /> Upload Marking Scheme
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl capitalize">details</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    encType="multipart/form-data"
                >
                    <div className="space-y-6">
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
                                    defaultValue="english"
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select medium" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sinhala">Sinhala</SelectItem>
                                        <SelectItem value="english">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <Label htmlFor="year">Select Batch</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setValue("year", value as "2028" | "2027" | "2026")
                                    }
                                    defaultValue="2025"
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2028">2028</SelectItem>
                                        <SelectItem value="2027">2027</SelectItem>
                                        <SelectItem value="2026">2026</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.year && (
                                    <p className="text-sm text-red-500">{errors.year.message}</p>
                                )}
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="type">Select Type</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setValue(
                                            "type",
                                            value as
                                            | "paper"
                                            | "mini-exam"
                                            | "homework"
                                            | "speed-paper"
                                            | "worksheet"
                                        )
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
                                    <p className="text-sm text-red-500">{errors.type.message}</p>
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
                    </div>
                    <DialogFooter className="p-6 pt-0 flex justify-end gap-2 w-full">
                        <Button
                            type="submit"
                            disabled={isUploading}
                            className="cursor-pointer"
                        >
                            {isUploading ? (
                                <div>
                                    <Loader2 className="animate-spin" />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Upload /> Upload
                                </div>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default MarkingSchemeModal;
