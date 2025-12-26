"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    useGetStudentById,
    useUpdateStudent,
} from "@/hooks/useStudents";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import Loader from "../layout/Loader";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationFormValues } from "@/lib/validation";

const TUITION_KEYS = ["theory", "revision", "paper"] as const;
const TUITION_LABELS: Record<(typeof TUITION_KEYS)[number], string> = {
    theory: "Theory",
    revision: "Revision",
    paper: "Paper",
};

const StudentEditForm = ({ studentId }: { studentId: string }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        watch,
        reset,
        control,
    } = useForm({
        resolver: zodResolver(registrationSchema),
    });

    const {
        data: student,
        isLoading,
        isError,
    } = useGetStudentById({ studentId });

    useEffect(() => {
        if (student) {
            console.log("Fetched Student Data:", student);
            reset(student);
        }
    }, [student, reset]);

    const { mutate: updateStudentData, isPending: isUpdating } =
        useUpdateStudent();

    const tuitionType = watch("tuitionType") || {
        theory: false,
        revision: false,
        paper: false,
    };

    const onSubmit = (data: RegistrationFormValues) => {
        updateStudentData(
            { id: studentId, data },
            {
                onSuccess: () => router.push("/dashboard/admin/students"),
            }
        );
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError)
        return <p className="text-red-500">Error loading student data.</p>;



    return (
        <Card>
            <CardContent className="space-y-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 grid grid-cols-1 gap-2"
                >
                    {/* Section: Personal Info */}
                    <div>
                        <h1 className="text-2xl font-semibold">Personal Information</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter personal information
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2.5">
                            <Label className="font-normal" htmlFor="firstName">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                placeholder="John"
                                {...register("firstName")}
                            />
                            {errors.firstName && (
                                <p className="text-sm text-red-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2.5">
                            <Label className="font-normal" htmlFor="lastName">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                {...register("lastName")}
                            />
                            {errors.lastName && (
                                <p className="text-sm text-red-500">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2.5">
                            <Label className="font-normal" htmlFor="contact">
                                Contact Number
                            </Label>
                            <Input
                                id="contact"
                                placeholder="+94 712 345 678"
                                {...register("contact")}
                            />
                            {errors.contact && (
                                <p className="text-sm text-red-500">{errors.contact.message}</p>
                            )}
                        </div>

                        <div className="space-y-2.5">
                            <Label className="font-normal" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* <div className="space-y-2.5">
                            <Label className="font-normal" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2.5">
                            <Label className="font-normal" htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div> */}
                    </div>

                    <Separator />

                    {/* Section: Academic Info */}
                    <div>
                        <h1 className="text-2xl font-semibold">Academic Information</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter academic information
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2.5">
                            <Label className="font-normal" htmlFor="school">
                                School
                            </Label>
                            <Input
                                id="school"
                                placeholder="Loyola College"
                                {...register("school")}
                            />
                            {errors.school && (
                                <p className="text-sm text-red-500">{errors.school.message}</p>
                            )}
                        </div>

                        <div className="space-y-2.5">
                            <Label className="font-normal" htmlFor="year">
                                Year
                            </Label>
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
                                            <SelectItem value="2025">2025</SelectItem>
                                            <SelectItem value="2026">2026</SelectItem>
                                            <SelectItem value="2027">2027</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {errors.year && (
                            <p className="text-sm text-red-500">{errors.year.message}</p>
                        )}
                    </div>

                    <Separator />
                    <div>
                        <h1 className="text-2xl font-semibold">Tuition Information</h1>
                        <p className="text-sm text-muted-foreground">Select tuition type</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2.5 md:col-span-1">
                            <Label className="font-normal" htmlFor="medium">
                                Medium
                            </Label>
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
                                            <SelectItem value="Sinhala">Sinhala</SelectItem>
                                            <SelectItem value="English">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors.medium && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.medium.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2.5 md:col-span-2">
                            <div className="flex flex-col items-start gap-4">
                                <Label
                                    htmlFor="tuitionType"
                                    className="flex font-normal items-center gap-2 capitalize"
                                >
                                    Select Tuition Mode
                                </Label>
                                <div className="grid grid-cols-3 gap-4">
                                    {TUITION_KEYS.map((key) => (
                                        <div key={key} className="flex items-center gap-2.5">
                                            <Checkbox
                                                checked={tuitionType[key]}
                                                onCheckedChange={(checked: boolean) =>
                                                    setValue(
                                                        "tuitionType",
                                                        {
                                                            ...tuitionType,
                                                            [key]: checked,
                                                        },
                                                        { shouldDirty: true, shouldValidate: true }
                                                    )
                                                }
                                            />
                                            {TUITION_LABELS[key]}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {errors?.tuitionType && (
                                <p className="text-sm text-red-500">
                                    {errors.tuitionType.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col-reverse lg:flex-row lg:justify-end gap-2 w-full">
                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => router.push("/dashboard/admin/students")}
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
                                <p>Update Student</p>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default StudentEditForm;
