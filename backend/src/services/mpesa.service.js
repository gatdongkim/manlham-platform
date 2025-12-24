const axios = require('axios');

const releaseEscrow = async (studentPhone, amount, jobId) => {
    const token = await getAccessToken();
    
    const payload = {
        InitiatorName: process.env.MPESA_INITIATOR_NAME,
        SecurityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
        CommandID: "BusinessPayment", // Standard for disbursements
        Amount: amount,
        PartyA: process.env.BUSINESS_SHORT_CODE,
        PartyB: studentPhone, // Student's formatted phone number
        Remarks: `Release for Job ${jobId}`,
        QueueTimeOutURL: `${process.env.BASE_URL}/api/payments/timeout`,
        ResultURL: `${process.env.BASE_URL}/api/payments/b2c-callback`,
        Occasion: "Project Completion"
    };

    return axios.post('https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest', payload, {
        headers: { Authorization: `Bearer ${token}` }
    });
};