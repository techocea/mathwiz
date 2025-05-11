import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  contact: z.string().min(10, "This field is required"),
  email: z
    .string()
    .min(12, "This field is required")
    .email("Invalid email format"),
  password: z.string().min(6, "This field is required"),
  confirmPassword: z.string().min(6, "This field is required"),
  school: z.string().min(1, "This field is required"),
  year: z.enum(["2025", "2026", "2027"]),
  tuitionType: z
    .object({
      paper: z.boolean().default(false),
      revision: z.boolean().default(false),
      theory: z.boolean().default(false),
    })
    .refine((data) => data.paper || data.revision || data.theory, {
      message: "Select at least one tuition type",
      path: ["tuitionType"],
    }),
  status: z.enum(["pending", "approved", "rejected", "banned"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().min(1, "This field is required"),
  password: z.string().min(6, "This field is required"),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const createPaperSchema = z.object({
  title: z.string().min(6, "This field is required"),
  durationMinutes: z.number().min(1, "This field is required"),
  uploadDeadline: z.date({ required_error: "Please select a deadline date" }),
  year: z.enum(["2025", "2026", "2027"]),
  paperUrl: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only PDF files are accepted"
    ),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type CreatePaperFormValues = z.infer<typeof createPaperSchema>;
