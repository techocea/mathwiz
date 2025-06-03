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

import Link from "next/link";
import axios from "axios";
import { loginSchema, LoginFormValues } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/login", data);

      if (res.status === 200) {
        toast.success("logged in successfully");
        router.push("/dashboard/student");
      } else {
        toast.error("Error in login");
      }
    } catch (error: any) {
      console.error("Error in login", error);
      toast.error(error?.response?.data?.message || "Error in login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:max-w-lg w-full mx-auto p-4">
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Mathwiz Online Portal
          </CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 grid grid-cols-1 gap-2"
          >
            <div className="flex flex-col space-y-4 gap-2">
              <div className="space-y-2.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className=""
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-2">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <div className="flex items-center gap-2.5">
                    <Loader2 className="animate-spin transition-all" />
                  </div>
                ) : (
                  <p>Login</p>
                )}
              </Button>
              <Button
                variant="link"
                asChild
                className="w-fit text-center cursor-pointer"
              >
                <Link href="/registration">New here? Register</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
