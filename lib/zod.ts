import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  contact: z.string().min(10),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  school: z.string().min(1),
  year: z.enum(["2026", "2027"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
