import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePaymentStatus = (jobId, isProcessing) => {
    const [status, setStatus] = useState('IDLE'); // IDLE, PENDING, SUCCESS, ERROR

    useEffect(() => {
        let interval;

        if (isProcessing && jobId) {
            setStatus('PENDING');
            
            // Poll every 3 seconds
            interval = setInterval(async () => {
                try {
                    const { data } = await axios.get(`/api/jobs/${jobId}/status`);
                    
                    if (data.paymentStatus === 'IN_ESCROW') {
                        setStatus('SUCCESS');
                        clearInterval(interval);
                    } else if (data.paymentStatus === 'FAILED') {
                        setStatus('ERROR');
                        clearInterval(interval);
                    }
                } catch (err) {
                    console.error("Polling error", err);
                }
            }, 3000);
        }

        return () => clearInterval(interval); // Cleanup on unmount
    }, [jobId, isProcessing]);

    return status;
};