import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    institutionType: { type: String },
    skills: { type: [String], default: [] },
    about: { type: String },
    github: { type: String },
    linkedin: { type: String },
    portfolio: [
      {
        title: String,
        fileUrl: String,
        description: String
      }
    ]
  },
  { timestamps: true }
);

// Index for faster searching by skills or user
studentSchema.index({ user: 1 });
studentSchema.index({ skills: 1 });

export default mongoose.model("Student", studentSchema);