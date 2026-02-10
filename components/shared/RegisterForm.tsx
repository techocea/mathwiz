"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
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

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        watch,
        control,
    } = useForm({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
            password: "",
            confirmPassword: "",
            school: "",
            year: undefined,
            medium: undefined,
            tuitionType: {
                theory: false,
                revision: false,
                paper: false,
            },
        },
    });

    const tuitionType = watch("tuitionType");

    const onSubmit = async (data: RegistrationFormValues) => {
        setLoading(true);
        try {
            const res = await axios.post("/api/registration", data);
            if (res.status === 200) {
                toast.success(
                    "Registered Successfully, Please wait for account approval"
                );
            } else {
                toast.error("Error in registration");
            }
        } catch (error: any) {
            console.error("Error in registration", error);
            toast.error(error?.response?.data?.message || "Error in registration");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:max-w-xl w-full mx-auto p-4">
            <Card>
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-primary">
                        Mathwiz Online Portal
                    </CardTitle>
                    <CardDescription>Join us to unlock your potential</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
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
                                    <p className="text-sm text-red-500">
                                        {errors.contact.message}
                                    </p>
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

                            <div className="space-y-2.5">
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
                            </div>
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
                                    <p className="text-sm text-red-500">
                                        {errors.school.message}
                                    </p>
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
                                        <Select onValueChange={field.onChange} value={field.value}>
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
                        </div>

                        <Separator />

                        {/* Section: Tuition Info */}
                        <div>
                            <h1 className="text-2xl font-semibold">Tuition Information</h1>
                            <p className="text-sm text-muted-foreground">
                                Select tuition type
                            </p>
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
                                        <Select onValueChange={field.onChange} value={field.value}>
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

                        <div className="w-full flex flex-col items-center justify-center gap-2">
                            <Button
                                size="lg"
                                type="submit"
                                className="w-full"
                                disabled={loading || !isDirty}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2.5">
                                        <Loader2 className="animate-spin transition-all" />
                                    </div>
                                ) : (
                                    <p>Register</p>
                                )}
                            </Button>
                            <Button
                                asChild
                                variant="link"
                                className="w-fit text-center cursor-pointer"
                            >
                                <Link
                                    href="/login"
                                    className="text-muted-foreground font-normal"
                                >
                                    Already a member? Login
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterForm;
