"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import axios from "axios";
import { registrationSchema, RegistrationFormValues } from "@/lib/zod";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
      year: "2025",
      tuitionType: {
        theory: false,
        revision: false,
        paper: false,
      },
    },
  });

  const tuitionType = watch("tuitionType");

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      const res = await axios.post("/api/registration", data);
      if (res.status === 200) {
        toast.success("Registered Successfully");
        console.log(data);
      } else {
        toast.error("Error in registration");
      }
    } catch (error: any) {
      console.error("Error in registration", error);
      toast.error(error?.response?.data?.message || "Error in registration");
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
            <h1 className="text-2xl font-semibold">Personal Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
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

              <div className="space-y-3">
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

              <div className="space-y-3">
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

              <div className="space-y-3">
                <Label className="font-normal" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-3">
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

              <div className="space-y-3">
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
            <h1 className="text-2xl font-semibold">Academic Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
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

              <div className="space-y-3">
                <Label className="font-normal" htmlFor="year">
                  Year
                </Label>
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
            </div>

            <Separator />

            {/* Section: Tuition Info */}
            <div>
              <h1 className="text-2xl font-semibold">Tuition Information</h1>
              <p className="text-sm text-muted-foreground">
                Select Tuition Type
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-3">
                <div>
                  <div className="flex flex-col items-start gap-4">
                    {["theory", "revision", "paper"].map((type) => (
                      <Label
                        key={type}
                        className="flex font-normal items-center gap-2 capitalize"
                      >
                        <Checkbox
                          checked={
                            tuitionType[type as keyof typeof tuitionType]
                          }
                          onCheckedChange={(checked: boolean) =>
                            setValue("tuitionType", {
                              ...tuitionType,
                              [type]: checked,
                            })
                          }
                        />
                        {type}
                      </Label>
                    ))}
                  </div>
                </div>
                {errors.tuitionType && (
                  <p className="text-sm text-red-500">
                    {errors.tuitionType.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-2">
              <Button type="submit" className="w-full">
                Register
              </Button>
              <Button
                variant="link"
                asChild
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
