import http from "./http";

/* ======================
   PAYMENT & ESCROW SERVICES
====================== */

/**
 * Trigger an M-Pesa STK Push
 * This sends the payment prompt to the client's phone.
 * @param {Object} data - { jobId, amount, phoneNumber }
 */
export const initiateStkPush = async (data) => {
  const res = await http.post("/payments/stk-push", data);
  return res.data; // Usually returns a CheckoutRequestID
};

/**
 * Check the status of a specific transaction
 * Used to poll the backend while the user is typing their PIN.
 * @param {string} checkoutRequestId 
 */
export const checkTransactionStatus = async (checkoutRequestId) => {
  const res = await http.get(`/payments/status/${checkoutRequestId}`);
  return res.data;
};

/**
 * [STUDENT] Request payout for completed work
 * This notifies the admin to release escrow funds to the student.
 * @param {string} jobId 
 */
export const requestPayout = (jobId) => {
  return http.post(`/payments/request-payout`, { jobId });
};

/**
 * [CLIENT] Release payment to student
 * Used when a client approves the final delivery.
 */
export const releaseEscrow = (jobId) => {
  return http.post(`/payments/release-escrow`, { jobId });
};

/**
 * Fetch payment history for the logged-in user
 */
export const getTransactionHistory = () => {
  return http.get("/payments/history");
};