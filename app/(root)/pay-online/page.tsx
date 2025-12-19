"use client";

import {
    X,
    Upload,
    FileText,
    CheckCircle,
    Loader2,
    ArrowLeft,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentFormValues, paymentSchema } from "@/lib/validation";

const PayOnline = () => {
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        setValue,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            referenceId: "",
            name: "",
            year: "2025",
            paymentSlip: undefined,
        },
    });

    const onSubmit = async (data: PaymentFormValues) => {
        setIsUploading(true);
        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("year", data.year);
            formData.append("referenceId", data.referenceId);

            if (data.paymentSlip) {
                formData.append("paymentSlip", data.paymentSlip);
            }

            const res = await axios.post("/api/payment-slip", formData);

            if (res.status === 200) {
                toast.success("Payment slip uploaded successfully");
                router.push("/");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error: any) {
            console.log("failed to upload payment slip:", error);
            toast.error(
                error?.response?.data?.message || error.message || "Upload failed"
            );
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = () => {
        setValue("paymentSlip", null, { shouldValidate: true });

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setPreview(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
            <div>
                <div className="flex items-start justify-start mb-2 w-full gap-2">
                    <Link href="/" className="flex items-center justify-center">
                        <Button variant="ghost" size="lg">
                            <ArrowLeft size={32} />
                            Back to Home
                        </Button>
                    </Link>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="text-blue-600" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Upload Payment Slip
                        </h2>
                        <p className="text-gray-500 text-xs mt-1">
                            Please upload your bank receipt to verify your payment.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Reference ID */}
                        <div className="space-y-3">
                            <Label
                                htmlFor="referenceId"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Transaction / Reference ID
                            </Label>
                            <Input
                                type="text"
                                className="w-full"
                                placeholder="Ex: Theory Payment - December"
                                {...register("referenceId")}
                            />
                            {errors.referenceId && (
                                <p className="text-sm text-red-500">
                                    {errors.referenceId.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <Label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Your Name
                                </Label>
                                <Input
                                    type="text"
                                    className="w-full"
                                    placeholder="Ex: John Doe"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-3">
                                <Label className="font-normal" htmlFor="year">
                                    Year
                                </Label>
                                <Controller
                                    name="year"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2025">2025</SelectItem>
                                                <SelectItem value="2026">2026</SelectItem>
                                                <SelectItem value="2027">2027</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.year && (
                                    <p className="text-sm text-red-500">{errors.year.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Upload Area */}
                        <div className="space-y-3">
                            <Label
                                htmlFor="paymentSlipUrl"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Payment Receipt (Image)
                            </Label>
                            {!preview ? (
                                <Label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="text-gray-400 mb-2" size={32} />
                                        <p className="text-xs text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or
                                            drag and drop
                                        </p>
                                        <p className="text-[10px] text-gray-400 mt-1">
                                            PNG, JPG or JPEG (MAX. 5MB)
                                        </p>
                                    </div>
                                    <Input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setValue("paymentSlip", file, { shouldValidate: true });
                                                setPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                    {errors.paymentSlip && (
                                        <p className="text-sm text-red-500">
                                            {String(errors.paymentSlip?.message)}
                                        </p>
                                    )}
                                </Label>
                            ) : (
                                <div className="relative rounded-xl h-48 overflow-hidden border border-gray-200">
                                    <Image
                                        src={preview}
                                        alt="Receipt Preview"
                                        fill
                                        className="object-cover"
                                    />

                                    <Button
                                        size="icon"
                                        type="button"
                                        onClick={removeFile}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white"
                                    >
                                        <X size={16} />
                                    </Button>

                                    <div className="p-2 bg-white flex items-center gap-2 text-xs text-green-600">
                                        <CheckCircle size={14} />
                                        Image selected
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            size="lg"
                            type="submit"
                            disabled={isUploading}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${isUploading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 shadow-md active:scale-[0.98]"
                                }`}
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Uploading...
                                </>
                            ) : (
                                "Submit Verification"
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-[11px] text-gray-400 mt-6">
                        Verification typically takes 24-48 working hours.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PayOnline;
