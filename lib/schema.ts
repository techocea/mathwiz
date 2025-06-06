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

const paperSchema = new mongoose.Schema(
  {
    title: { type: String },
    medium: { type: String, enum: ["sinhala", "english"] },
    durationMinutes: { type: Number },
    year: { type: String, enum: ["2025", "2026", "2027"] },
    uploadDeadline: { type: Date },
    paperUrl: { type: String },
    cloudinaryPublicId: { type: String },
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
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
      ref: "Paper",
      required: true,
    },
    submissionUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    startTime: { type: Date },
    submittedAt: {
      type: Date,
      default: Date.now,
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
export const Paper =
  mongoose.models.Paper || mongoose.model("Paper", paperSchema);
export const Submission =
  mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
export const Inquiries =
  mongoose.models.Inquiries || mongoose.model("Inquiries", inquirySchema);
