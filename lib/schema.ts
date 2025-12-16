import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    contact: { type: String },
    year: { type: String, enum: ["2025", "2026", "2027"] },
    medium: { type: String, enum: ["sinhala", "english"] },
    school: { type: String },
    tuitionType: {
      theory: { type: Boolean, default: false },
      revision: { type: Boolean, default: false },
      paper: { type: Boolean, default: false },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "banned"],
      default: "pending",
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

const resourceSchema = new mongoose.Schema(
  {
    durationMinutes: { type: Number },
    title: { type: String, required: true },
    medium: { type: String, enum: ["sinhala", "english"], required: true },
    year: { type: String, enum: ["2025", "2026", "2027"], required: true },
    uploadDeadline: { type: Date, required: true },
    paperUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
    type: {
      type: String,
      required: true,
      enum: ["paper", "speed-paper", "mini-exam", "worksheet", "homework"],
    },
  },
  { timestamps: true }
);

const submissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    submissionUrl: {
      type: String,
      required: true,
    },
    submissionPublicId: {
      type: String,
    },
    markedPdfUrl: {
      type: String,
    },
    remark: {
      type: String,
    },
    markedPublicId: { type: String },
    startTime: { type: Date },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const markingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    medium: { type: String, enum: ["sinhala", "english"], required: true },
    year: { type: String, enum: ["2025", "2026", "2027"], required: true },
    markingSchemeUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["paper", "speed-paper", "mini-exam", "worksheet", "homework"],
    },
  },
  { timestamps: true }
);

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Resource =
  mongoose.models.Resource || mongoose.model("Resource", resourceSchema);
export const Submission =
  mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
export const Marking =
  mongoose.models.Marking || mongoose.model("Marking", markingSchema);
export const Inquiries =
  mongoose.models.Inquiries || mongoose.model("Inquiries", inquirySchema);
