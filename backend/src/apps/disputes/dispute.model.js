import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    // ✅ Added Region & Currency for KE/SS logic
    region: { 
      type: String, 
      enum: ["KE", "SS"], 
      required: true 
    },
    currency: { 
      type: String, 
      enum: ["KES", "SSP"], 
      required: true 
    },
    status: {
      type: String,
      enum: ["OPEN", "RESOLVED", "REJECTED", "INVESTIGATING"],
      default: "OPEN",
    },
    // ✅ Track evidence files (screenshots of chats/payment receipts)
    evidenceUrls: [{ type: String }],
    adminNotes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Dispute", disputeSchema);