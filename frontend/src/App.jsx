import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// --- NEW: Google OAuth Integration ---
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import NotificationPage from "./components/Notification";

// ... (Your 40+ imports remain exactly as they were) ...

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  // Use your real Google Client ID from Google Cloud Console here
  const GOOGLE_CLIENT_ID = "15228028717-idpobi15jqact7hudd0f8behb4jfa9r9.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ScrollToTop />
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterType />} />
            <Route path="/signup-student" element={<SignupStudent />} />
            <Route path="/signup-client" element={<SignupClient />} />
            <Route path="/signup-staff" element={<SignupStaff />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/marketplace" element={<JobMarketplace />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/vetting" element={<VettingProcess />} />
            <Route path="/disputes" element={<DisputeResolution />} />
            <Route path="/safety" element={<SafetyTrust />} />

            {/* --- Auth Flow --- */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* --- Legal --- */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/help" element={<HelpCenter />} />

            {/* --- Protected Routes: Student (PRO) --- */}
            <Route element={<ProtectedRoute allowedRoles={["PRO"]} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/students/dashboard" element={<StudentDashboard />} />
                <Route path="/students/applications" element={<StudentApplications />} />
                <Route path="/students/chats" element={<StudentChats />} />
                <Route path="/students/wallet" element={<Wallet />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/students/profile-setup" element={<ProfileSetup />} />
              </Route>
            </Route>

            {/* --- Protected Routes: Client (MSME) --- */}
            <Route element={<ProtectedRoute allowedRoles={["MSME"]} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/client/dashboard" element={<ClientDashboard />} />
                <Route path="/client/post-job" element={<PostJob />} />
                <Route path="/client/jobs" element={<MyJobs />} />
                <Route path="/client/manage-work/:jobId?" element={<ManageWork />} />
                <Route path="/client/payments" element={<ClientPayments />} />
                <Route path="/client/support" element={<ClientSupport />} />
                <Route path="/client/chats" element={<ClientChat />} />
                <Route path="/client/applications/:jobId?" element={<JobApplications />} />
                <Route path="/client/remember-talent" element={<RememberTalent />} />
                <Route path="/client/discover-student" element={<DiscoverStudent />} />
              </Route>
            </Route>

            {/* --- Protected Routes: Staff --- */}
            <Route element={<ProtectedRoute allowedRoles={["STAFF"]} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/staff/dashboard" element={<StaffDashboard />} />
                <Route path="/staff/meetings" element={<StaffMeetings />} />
                <Route path="/staff/support" element={<StaffSupport />} />
                <Route path="/staff/users" element={<StaffUsers />} />
                <Route path="/staff/verification" element={<StaffVerification />} />
                <Route path="/staff/disputes" element={<DisputePanel />} />
                <Route path="/staff/analytics" element={<FinancialAnalytics />} />
                <Route path="/staff/reviews" element={<StaffReview />} />
              </Route>
            </Route>

            {/* --- Protected Routes: Admin --- */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/verification" element={<VerificationQueue />} />
                <Route path="/admin/disputes" element={<AdminDisputes />} />
                <Route path="/admin/staff-review" element={<StaffActivity />} />
                <Route path="/admin/audit" element={<AuditLogs />} />
                <Route path="/admin/applications" element={<ApplicationsManager />} />
                <Route path="/admin/support" element={<AdminSupport />} />
                <Route path="/admin/payments" element={<AdminPayments />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/post" element={<AdminPost />} />
                <Route path="/admin/analytics" element={<ClientAnalytics />} />
                <Route path="/admin/revenue" element={<RevenueSettings />} />
                <Route path="/admin/withdrawals" element={<WithdrawalRequests />} />
              </Route>
            </Route>

            {/* General Notification & Fallbacks */}
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/unauthorized" element={<UnauthorizedUI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;