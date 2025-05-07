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

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      year: "2026",
    },
  });

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
    <div className="lg:max-w-lg w-full mx-auto p-4">
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
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input id="contact" {...register("contact")} />
              {errors.contact && (
                <p className="text-sm text-red-500">{errors.contact.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Create Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="school">School</Label>
              <Input id="school" {...register("school")} />
              {errors.school && (
                <p className="text-sm text-red-500">{errors.school.message}</p>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="year">Year</Label>
              <Select
                onValueChange={(value) =>
                  setValue("year", value as "2026" | "2027")
                }
                defaultValue="2026"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
              {errors.year && (
                <p className="text-sm text-red-500">{errors.year.message}</p>
              )}
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
                <Link href="/login">Already a member? Login</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
