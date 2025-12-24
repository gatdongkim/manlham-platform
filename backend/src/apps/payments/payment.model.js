import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    amount: { type: Number, required: true },
    checkoutRequestId: { 
        type: String, 
        unique: true, 
        sparse: true  
    },
    status: { 
        type: String, 
        enum: ['PENDING', 'COMPLETED', 'FAILED'], 
        default: 'PENDING' 
    }
}, { timestamps: true });

// ✅ ESM Export
const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;