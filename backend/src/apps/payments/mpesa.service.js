import axios from 'axios';

/**
 * @desc Generate M-Pesa Access Token
 */
export const getAccessToken = async () => {
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    
    try {
        const response = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: { Authorization: `Basic ${auth}` }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("M-Pesa Auth Error:", error.response?.data || error.message);
        throw new Error("Failed to get M-Pesa access token");
    }
};

/**
 * @desc Initiate STK Push (Lipana M-Pesa Online)
 */
export const initiateStkPush = async (phoneNumber, amount, jobId) => {
    const token = await getAccessToken();
    const date = new Date();
    const timestamp = date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    const password = Buffer.from(
        process.env.MPESA_SHORTCODE + 
        process.env.MPESA_PASSKEY + 
        timestamp
    ).toString('base64');

    const data = {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: `${process.env.BASE_URL}/api/v1/payments/callback`,
        AccountReference: `Job-${jobId}`,
        TransactionDesc: "Payment for services"
    };

    try {
        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/query",
            data,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("STK Push Error:", error.response?.data || error.message);
        throw new Error("M-Pesa STK Push failed");
    }
};