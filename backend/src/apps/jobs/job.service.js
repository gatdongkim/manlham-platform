/**
 * src/apps/jobs/job.service.js
 * Job business logic + M-Pesa payment integration
 */

const axios = require("axios");
const Job = require("./job.model");

/* ===================== JOB SERVICES ===================== */

const getJobById = async (id) => {
  return Job.findById(id).populate("client", "-password");
};

const updateJob = async (id, data) => {
  return Job.findByIdAndUpdate(id, data, { new: true });
};

const deleteJob = async (id) => {
  return Job.findByIdAndDelete(id);
};

/* ===================== M-PESA HELPERS ===================== */

const getTimestamp = () => {
  const date = new Date();
  return (
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0") +
    String(date.getHours()).padStart(2, "0") +
    String(date.getMinutes()).padStart(2, "0") +
    String(date.getSeconds()).padStart(2, "0")
  );
};

const getAccessToken = async () => {
  try {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("❌ M-Pesa Token Generation Failed:", error.response?.data || error.message);
    throw new Error("Failed to generate M-Pesa access token");
  }
};

/* ===================== M-PESA PAYMENT ===================== */

const initiateMpesaPayment = async (paymentData) => {
  const accessToken = await getAccessToken();
  const timestamp = getTimestamp();

  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: paymentData.amount,
    PartyA: paymentData.phoneNumber,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: paymentData.phoneNumber,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: paymentData.accountReference || "SkillLink Job",
    TransactionDesc: paymentData.transactionDesc || "Job Payment",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "❌ M-Pesa STK Push Failed:",
      error.response?.data || error.message
    );
    throw new Error("Payment initiation failed");
  }
};

/**
 * Escrow payment wrapper
 * Called when client hires a student
 */
const initiateEscrowPayment = async ({ amount, phoneNumber, jobId }) => {
  return initiateMpesaPayment({
    amount,
    phoneNumber,
    accountReference: `SkillLink-${jobId}`,
    transactionDesc: "Escrow deposit for job",
  });
};


/* ===================== EXPORTS ===================== */

module.exports = {
  getJobById,
  updateJob,
  deleteJob,
  initiateMpesaPayment,
  initiateEscrowPayment, // ✅ ADD THIS
};

