import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  contact: z.string().min(10, "This field is required"),
  email: z.string().min(12, "This field is required"),
  password: z.string().min(6, "This field is required"),
  confirmPassword: z.string().min(6, "This field is required"),
  school: z.string().min(1, "This field is required"),
  year: z.enum(["2026", "2027"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
