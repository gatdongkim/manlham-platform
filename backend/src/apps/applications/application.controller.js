import * as applicationService from './application.service.js';
import * as mpesaService from '../payments/mpesa.service.js'; 
import Job from '../jobs/job.model.js'; 
import axios from 'axios';

/**
 * @desc Professional applies for a job
 */
export const applyToJob = async (req, res) => {
    try {
        const application = await applicationService.createApplication(req.user.id, req.body);
        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * @desc Professional views their own applications (For "My Bids" page)
 * ✅ Added this function to handle GET /api/v1/applications
 */
export const getStudentApplications = async (req, res) => {
    try {
        // req.user.id is extracted from the JWT token by your authMiddleware
        const applications = await applicationService.getApplicationsByProfessional(req.user.id);
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc MSME views applications for their job
 */
export const getJobApplications = async (req, res) => {
    try {
        const applications = await applicationService.getApplicationsByJob(req.params.jobId);
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc Hire Professional (Accept Application)
 */
export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params; 
        const { status } = req.body;

        if (status === 'ACCEPTED') {
            const application = await applicationService.getApplicationById(id);
            const job = await Job.findById(application.job);
            
            if (job.status !== 'OPEN') {
                return res.status(400).json({ 
                    success: false, 
                    message: "This job is no longer available." 
                });
            }

            const updatedApp = await applicationService.updateApplicationStatus(id, 'ACCEPTED');

            let paymentResponse;
            try {
                paymentResponse = await mpesaService.initiateStkPush(
                    req.user.phoneNumber, 
                    updatedApp.bidAmount, 
                    id
                );
            } catch (payErr) {
                console.error("M-Pesa Escrow Trigger Failed:", payErr.message);
            }

            try {
                await axios.post(`${process.env.BASE_URL}/api/v1/chat/init`, {
                    participants: [updatedApp.professional, req.user.id], 
                    jobId: updatedApp.job,
                    message: `SYSTEM: ${req.user.name} has hired you.`
                });
            } catch (chatErr) {
                console.error("Chat initiation failed:", chatErr.message);
            }

            return res.status(200).json({
                success: true,
                message: "Professional hired. M-Pesa prompt sent.",
                paymentRequest: paymentResponse || "Manual payment required",
                data: updatedApp
            });
        }

        const result = await applicationService.updateApplicationStatus(id, status);
        res.status(200).json({ success: true, data: result });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};