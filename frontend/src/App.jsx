import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import NotificationPage from "./components/Notification";

// --- 1. Public & Auth Pages ---
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import RegisterType from "./pages/RegisterType";
import SignupStudent from "./pages/students/SignupStudent";
import SignupClient from "./pages/client/SignupClient";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UnauthorizedUI from "./pages/UnauthorizedUI.jsx";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import SuccessStories from "./pages/platform/SuccessStories";
import DisputeResolution from "./pages/support/DisputeResolution";

// --- 2. Student (PRO) Pages ---
import StudentDashboard from "./pages/students/Dashboard";
import JobMarketplace from "./pages/students/JobMarketplace";
import StudentApplications from "./pages/students/Applications";
import StudentChats from "./pages/students/Chats";
import ProfileSetup from "./pages/students/ProfileSetup";
import Wallet from "./pages/students/Wallet";
import JobDetail from "./pages/students/JobDetail";
import Workspace from "./pages/students/Workspace";

// --- 3. Client (MSME) Pages ---
import ClientDashboard from "./pages/client/Dashboard";
import MyJobs from "./pages/client/MyJobs";
import JobApplications from "./pages/client/JobApplications";
import PostJob from "./pages/client/PostJob";
import DiscoverStudent from "./pages/client/DiscoverStudent";
import ClientChat from "./pages/client/Chats";
import ClientSettings from "./pages/client/Settings";
import RememberTalent from "./pages/client/RememberTalent";
import ClientSupport from "./pages/client/Support";
import ManageWork from "./pages/client/ManageWork";
import ClientPayments from "./pages/client/Payments";

// --- 4. Staff Pages ---
import StaffDashboard from "./pages/staff/Dashboard";
import StaffMeetings from "./pages/staff/Meetings";
import StaffSupport from "./pages/staff/Support";
import StaffUsers from "./pages/staff/Users";
import SignupStaff from "./pages/staff/SignupStaff";
import StaffVerification from "./pages/staff/StaffVerification";
import DisputePanel from "./pages/staff/DisputePanel";
import FinancialAnalytics from "./pages/staff/FinancialAnalytics";
import StaffReview from "./pages/staff/StaffReview";

// --- 5. Admin Pages ---
import AdminDashboard from "./pages/admin/Dashboard";
import VerificationQueue from "./pages/admin/VerificationQueue";
import AdminDisputes from "./pages/admin/Disputes";
import AuditLogs from "./pages/admin/AuditLogs";
import ApplicationsManager from "./pages/admin/ApplicationsManager";
import AdminSupport from "./pages/admin/Support";
import AdminPayments from "./pages/admin/Payments";
import AdminUsers from "./pages/admin/Users";
import AdminPost from "./pages/admin/Post";
import ClientAnalytics from "./pages/admin/ClientAnalytics";
import RevenueSettings from "./pages/admin/RevenueSettings";
import WithdrawalRequests from "./pages/admin/WithdrawalRequests";
import StaffActivity from "./pages/admin/StaffActivity";

// --- Platform/Legal ---
import HelpCenter from "./pages/support/HelpCenter";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import ContactUs from "./pages/legal/Contact";
import VettingProcess from "./pages/legal/VettingProcess";
import SafetyTrust from "./pages/legal/SafetyTrust";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
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

          {/* ✅ FIXED AUTH FLOW ROUTES */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* ✅ FIXED LEGAL PATHS */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/help" element={<HelpCenter />} />

          {/* --- Student (PRO) Protected Routes --- */}
          <Route element={<ProtectedRoute allowedRoles={["PRO"]} />}>
            <Route element={<DashboardLayout />}>
              <Route
                path="/students/dashboard"
                element={<StudentDashboard />}
              />
              <Route
                path="/students/applications"
                element={<StudentApplications />}
              />
              <Route path="/students/chats" element={<StudentChats />} />
              <Route path="/students/wallet" element={<Wallet />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/marketplace" element={<JobMarketplace />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route
                path="/students/profile-setup"
                element={<ProfileSetup />}
              />
            </Route>
          </Route>

          {/* --- MSME (Client) Protected Routes --- */}
          <Route element={<ProtectedRoute allowedRoles={["MSME"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/client/post-job" element={<PostJob />} />
              <Route path="/client/jobs" element={<MyJobs />} />

              {/* ✅ FIXED: Added dynamic jobId support to prevent 404s */}
              <Route path="/client/manage-work" element={<ManageWork />} />
              <Route
                path="/client/manage-work/:jobId"
                element={<ManageWork />}
              />

              <Route path="/client/payments" element={<ClientPayments />} />
              <Route path="/client/support" element={<ClientSupport />} />
              <Route path="/client/chats" element={<ClientChat />} />
              <Route path="/notification" element={<NotificationPage />} />

              {/* ✅ FIXED: Parameterized Applications route */}
              <Route
                path="/client/applications"
                element={<JobApplications />}
              />
              <Route
                path="/client/applications/:jobId"
                element={<JobApplications />}
              />

              <Route
                path="/client/remember-talent"
                element={<RememberTalent />}
              />
              <Route
                path="/client/discover-student"
                element={<DiscoverStudent />}
              />
            </Route>
          </Route>

          {/* --- Staff Protected Routes --- */}
          <Route element={<ProtectedRoute allowedRoles={["STAFF"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/staff/meetings" element={<StaffMeetings />} />
              <Route path="/staff/support" element={<StaffSupport />} />
              <Route path="/staff/users" element={<StaffUsers />} />
              <Route
                path="/staff/verification"
                element={<StaffVerification />}
              />
              <Route path="/staff/disputes" element={<DisputePanel />} />
              <Route path="/staff/analytics" element={<FinancialAnalytics />} />
              <Route path="/staff/reviews" element={<StaffReview />} />
            </Route>
          </Route>

          {/* --- Admin Protected Routes --- */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/verification"
                element={<VerificationQueue />}
              />
              <Route path="/admin/disputes" element={<AdminDisputes />} />

              {/* ✅ FIXED: Matches your "Staff Requests" sidebar link */}
              <Route path="/admin/staff-review" element={<StaffActivity />} />

              {/* ✅ FIXED: Matches your "Audit Logs" sidebar link */}
              <Route path="/admin/audit" element={<AuditLogs />} />

              <Route
                path="/admin/applications"
                element={<ApplicationsManager />}
              />
              <Route path="/admin/support" element={<AdminSupport />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/admin/users" element={<AdminUsers />} />

              {/* ✅ FIXED: Matches your "Post Manager" sidebar link */}
              <Route path="/admin/post" element={<AdminPost />} />

              <Route path="/admin/analytics" element={<ClientAnalytics />} />
              <Route path="/admin/revenue" element={<RevenueSettings />} />
              <Route
                path="/admin/withdrawals"
                element={<WithdrawalRequests />}
              />
              <Route path="/notification" element={<NotificationPage />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedUI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
