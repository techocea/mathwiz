"use client";

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
import { Loader2, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    markedAnswerSchema,
    MarkedAnswerSchemaFormValues,
} from "@/lib/validation";

const UploadMarkedAnswerModal = ({
    submissionId,
}: {
    submissionId: string;
}) => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(markedAnswerSchema),
        defaultValues: {
            remark: "",
            markedPdfUrl: undefined,
        },
    });

    const onSubmit = async (data: MarkedAnswerSchemaFormValues) => {
        setIsUploading(true);
        try {
            const formData = new FormData();

            formData.append("remark", data.remark);

            if (data.markedPdfUrl)
                formData.append("markedPdfUrl", data.markedPdfUrl);

            const res = await axios.post(
                `/api/admin/submissions/${submissionId}/mark`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(res.data.message || "Created");

            if (res.status === 200) {
                toast.success("Marked answer sheet uploaded successfully");
                router.push("/dashboard/admin");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error: any) {
            console.log("failed to upload answer sheet:", error);
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
                    variant="ghost"
                    className="cursor-pointer p-4 w-full flex items-center text-sm font-normal text-center justify-center gap-2"
                >
                    Upload Answer
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
                        <div className="space-y-3">
                            <Label htmlFor="remark">Remark</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="remark"
                                    {...register("remark")}
                                    placeholder="Remark here"
                                />
                            </div>
                            {errors.remark && (
                                <p className="text-sm text-red-500">{errors.remark.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="markedPdfUrl" className="capitalize">
                            Upload
                        </Label>
                        <Input
                            id="markedPdfUrl"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setValue("markedPdfUrl", e.target.files[0]);
                                }
                            }}
                        />
                        {errors.markedPdfUrl && (
                            <p className="text-sm text-red-500">
                                {String(errors.markedPdfUrl?.message)}
                            </p>
                        )}
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

export default UploadMarkedAnswerModal;
