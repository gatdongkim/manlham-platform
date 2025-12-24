import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    
    // Ownership: MSME who posted and Professional hired
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    professional: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    
    budget: { type: Number, required: true },
    escrowAmount: { type: Number, default: 0 }, // Tracks exact amount held
    
    // --- Project Lifecycle ---
    status: { 
        type: String, 
        enum: ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'DISPUTED', 'CANCELLED'], 
        default: 'OPEN' 
    },
    
    // --- M-Pesa Escrow Tracking ---
    paymentStatus: { 
        type: String, 
        enum: [
            'UNPAID',         // Initial state
            'PENDING_STK',    // STK Push sent, waiting for user PIN
            'ESCROW_HELD',    // Callback received SUCCESS
            'RELEASED',       // Work done, money sent to Pro
            'REFUNDED',       // Dispute resolved in favor of MSME
            'FAILED'          // STK Push cancelled or insufficient funds
        ], 
        default: 'UNPAID' 
    },
    
    // M-Pesa Transaction Identification
    checkoutRequestId: { type: String, unique: true, sparse: true }, 
    mpesaReceipt: { type: String },
    paidAt: { type: Date }
  },
  { timestamps: true }
);

// Performance Indexes for fast lookups
jobSchema.index({ client: 1 });
jobSchema.index({ professional: 1 }); 
jobSchema.index({ checkoutRequestId: 1 }); 
jobSchema.index({ status: 1 });
jobSchema.index({ paymentStatus: 1 }); 
jobSchema.index({ createdAt: -1 });

const Job = mongoose.model("Job", jobSchema);
export default Job;