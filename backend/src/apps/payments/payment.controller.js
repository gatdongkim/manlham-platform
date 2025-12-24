import Payment from './payment.model.js';
import Job from '../jobs/job.model.js';

export const handleMpesaCallback = async (req, res) => {
    try {
        console.log("M-Pesa Callback:", req.body);
        res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const create = async (req, res) => {
    try {
        res.status(200).json({ message: "STK Push initiated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const myPayments = async (req, res) => {
    try {
        const history = await Payment.find({ user: req.user.id }).populate('job');
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const downloadStatement = async (req, res) => {
    try {
        res.status(200).json({ message: "Feature coming soon" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};