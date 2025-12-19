import { z } from "zod";

const MAX_FILE_SIZE = 30 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf", "jpg", "png"];

export const contactSchema = z.object({
  name: z.string().min(6, "This field is required"),
  email: z.email("Invalid email format").min(12, "This field is required"),
  contact: z.string().min(10, "This field is required"),
  message: z.string().min(6, "This field is required"),
});

export const registrationSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  contact: z.string().min(10, "This field is required"),
  email: z.email("Invalid email format").min(12, "This field is required"),
  password: z.string().min(6, "This field is required"),
  confirmPassword: z.string().min(6, "This field is required"),
  school: z.string().min(1, "This field is required"),
  year: z
    .enum(["2025", "2026", "2027"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select your year.",
    }),

  medium: z
    .enum(["sinhala", "english"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select your medium.",
    }),

  tuitionType: z
    .object({
      theory: z.boolean().default(false),
      revision: z.boolean().default(false),
      paper: z.boolean().default(false),
    })
    .refine((data) => data.theory || data.revision || data.paper, {
      message: "You must select at least one tuition type.",
      path: ["tuitionType"],
    }),
  status: z.enum(["pending", "approved", "rejected", "banned"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().min(1, "This field is required"),
  password: z.string().min(6, "This field is required"),
});

export const markingSchema = z.object({
  title: z.string().min(3),
  medium: z.enum(["sinhala", "english"]),
  year: z.enum(["2025", "2026", "2027"]),
  type: z.enum(["paper", "mini-exam", "worksheet", "homework", "speed-paper"]),
  markingSchemeUrl: z
    .custom<File>((val) => val instanceof File, "PDF file is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "File too large")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only PDF allowed"
    ),
});

export const markedAnswerSchema = z.object({
  score: z.number().min(0).max(100),
  remark: z.string().min(3),
  markedPdfUrl: z
    .custom<File>((val) => val instanceof File, "PDF file is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "File too large")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only PDF allowed"
    ),
});

export const paymentSchema = z.object({
  referenceId: z.string().min(3),
  name: z.string().min(3, "This field is required"),
  year: z.enum(["2025", "2026", "2027"]),
  paymentSlip: z
    .instanceof(File, { message: "Payment slip is required" })
    .nullable(),
});

const baseSchema = z.object({
  title: z.string().min(3),
  medium: z.enum(["sinhala", "english"]),
  year: z.enum(["2025", "2026", "2027"]),
  uploadDeadline: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

const paperVariant = baseSchema.extend({
  type: z.literal("paper"),
  paperUrl: z
    .custom<File>((val) => val instanceof File, "PDF file is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "File too large")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only PDF allowed"
    ),
  durationMinutes: z.number().min(5).max(180),
});

const speedPaperVariant = baseSchema.extend({
  type: z.literal("speed-paper"),
  paperUrl: z
    .custom<File>((val) => val instanceof File, "PDF file is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "File too large")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only PDF allowed"
    ),
  durationMinutes: z.number().min(5).max(180),
});

const miniExamVariant = baseSchema.extend({
  type: z.literal("mini-exam"),
  paperUrl: z
    .custom<File>((val) => val instanceof File, "PDF file is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "File too large")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only PDF allowed"
    ),
  durationMinutes: z.number().min(5).max(180),
});

const worksheetVariant = baseSchema.extend({
  type: z.literal("worksheet"),
  paperUrl: z.any().optional(),
});

const homeworkVariant = baseSchema.extend({
  type: z.literal("homework"),
  paperUrl: z.any().optional(),
});

export const createResourceSchema = z.discriminatedUnion("type", [
  paperVariant,
  speedPaperVariant,
  miniExamVariant,
  worksheetVariant,
  homeworkVariant,
]);

export type LoginFormValues = z.infer<typeof loginSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
export type MarkingSchemaFormValues = z.infer<typeof markingSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
export type MarkedAnswerSchemaFormValues = z.infer<typeof markedAnswerSchema>;
