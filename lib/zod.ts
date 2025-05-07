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
  status: z.enum(["pending", "approved", "rejected", "banned"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().min(1, "This field is required"),
  password: z.string().min(6, "This field is required"),
});

export const createPaperSchema = z.object({
  title: z.string().min(6, "This field is required"),
  duration: z.string().min(6, "This field is required"),
  paperUrl: z.string().min(6, "This field is required"),
  uploadDeadline: z.string(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
export type CreatePaperFormValues = z.infer<typeof createPaperSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
