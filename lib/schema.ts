import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    contact: { type: String },
    year: { type: String, enum: ["2026", "2027"] },
    school: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
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
    paperUrl: { type: String },
    uploadDeadline: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Paper =
  mongoose.models.Paper || mongoose.model("Paper", paperSchema);
