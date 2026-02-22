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
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ResourceType } from "@/global";
import Loader from "../layout/Loader";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createResourceSchema } from "@/lib/validation";
import { Clock, CalendarIcon, Loader2, FileText } from "lucide-react";
import { useGetResourceById, useUpdateResource } from "@/hooks/useResource";

const ResourceEditForm = ({
    resourceId,
    title,
    type,
}: {
    resourceId: string;
    title: string;
    type: ResourceType;
}) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        clearErrors,
        control,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(createResourceSchema),
    });

    const {
        data: resource,
        isLoading,
        isError,
    } = useGetResourceById({ resourceId });

    useEffect(() => {
        if (resource) {
            reset({
                ...resource,
                medium: resource.medium ? resource.medium : "",
                year: resource.year ? String(resource.year) : "",
                uploadDeadline: resource.uploadDeadline
                    ? new Date(resource.uploadDeadline)
                    : undefined,
                durationMinutes: Number(resource.durationMinutes) || 60,
            });
            clearErrors("paperUrl");
        }
    }, [resource, reset, clearErrors]);

    const { mutate: updateResource, isPending: isUpdating } = useUpdateResource(
        () => {
            router.push(`/dashboard/admin/activities/${type}`);
        },
    );

    const onSubmit = (values: any) => {
        const { _id, __v, createdAt, updatedAt, submissions, ...updateData } =
            values;
        console.log("Submitting these values:", updateData);
        updateResource({ id: resourceId, data: updateData });
    };

    const durationMinutes = watch("durationMinutes");
    const uploadDeadline = watch("uploadDeadline");

    if (isLoading) {
        return <Loader />;
    }

    if (isError)
        return <p className="text-red-500">Error loading resource data.</p>;

    return (
        <Card>
            <form
                onSubmit={handleSubmit(onSubmit, (errors) =>
                    console.log("Validation Errors:", errors),
                )}
                className="space-y-6"
            // encType="multipart/form-data"
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
                            <Controller
                                name="medium"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        key={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select medium" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sinhala">Sinhala</SelectItem>
                                            <SelectItem value="english">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
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
                                        min={1}
                                        max={180}
                                        step={1}
                                        value={[durationMinutes]}
                                        onValueChange={(value) => {
                                            setValue("durationMinutes", value[0], {
                                                shouldDirty: true,
                                            });
                                        }}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        )}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label htmlFor="year">Select Year</Label>
                            <Controller
                                name="year"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        key={field.value}
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
                                )}
                            />
                        </div>
                        {errors.year && (
                            <p className="text-sm text-red-500">{errors.year.message}</p>
                        )}
                        <div className="space-y-3">
                            <Label htmlFor="uploadDeadline">Upload Deadline</Label>
                            <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !uploadDeadline && "text-muted-foreground",
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
                                            // selected={uploadDeadline} // This is now a Date object thanks to useEffect
                                            onSelect={(date) => {
                                                setValue("uploadDeadline", date, { shouldDirty: true });
                                            }}
                                            autoFocus
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
                        {resource?.paperUrl && typeof watch("paperUrl") === "string" && (
                            <div className="flex items-center gap-2 p-2 border border-blue-200 rounded-md bg-white/50">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <span className="text-xs truncate flex-1">
                                    Current PDF: {resource.title}
                                </span>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col-reverse lg:flex-row lg:justify-end gap-2 w-full">
                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => router.push(`/dashboard/admin/activities/${type}`)}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            type="submit"
                            className="cursor-pointer"
                            disabled={isUpdating || !isDirty}
                        >
                            {isUpdating ? (
                                <div className="flex items-center gap-2.5">
                                    <Loader2 className="animate-spin transition-all" />
                                </div>
                            ) : (
                                <p>Update</p>
                            )}
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ResourceEditForm;
