import http from "./http";

/* ======================
   ADMIN
====================== */

export const fetchStats = () =>
  http.get("/admin/stats");

export const fetchUsers = () =>
  http.get("/admin/users");

export const suspendUser = (userId) =>
  http.patch(`/admin/users/${userId}/suspend`);

export const fetchJobs = () =>
  http.get("/admin/jobs");

export const approveJob = (jobId) =>
  http.patch(`/admin/jobs/${jobId}/approve`);

export const fetchPayments = () =>
  http.get("/admin/payments");

export const fetchDisputes = () =>
  http.get("/admin/disputes");

export const resolveDispute = (id) =>
  http.patch(`/admin/disputes/${id}/resolve`);

export const fetchLogs = () =>
  http.get("/admin/logs");

export const createPost = (data) =>
  http.post("/admin/posts", data);
