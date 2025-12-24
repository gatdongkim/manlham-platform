import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    clientType: String,
    location: String,
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
