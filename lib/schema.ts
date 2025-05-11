import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    contact: { type: String },
    year: { type: String, enum: ["2025", "2026", "2027"] },
    school: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    tuitionType: {
      type: {
        theory: { type: Boolean, default: false },
        revision: { type: Boolean, default: false },
        paper: { type: Boolean, default: false },
      },
      _id: false,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "banned"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const paperSchema = new mongoose.Schema(
  {
    title: { type: String },
    durationMinutes: { type: Number },
    year: { type: String, enum: ["2025", "2026", "2027"] },
    uploadDeadline: { type: Date },
    paperUrl: { type: String },
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
    file: {
      type: String,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Paper =
  mongoose.models.Paper || mongoose.model("Paper", paperSchema);
export const Submission =
  mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
