import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Briefcase, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
// --- NEW: Google OAuth & API Imports ---
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import api from "../api/http"; 
import BackButton from "../components/BackButton";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // 1. Handle Messages from other pages (like Password Reset or Registration)
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccess(location.state.successMessage);
    }
    const params = new URLSearchParams(location.search);
    if (params.get("reset") === "success") {
      setSuccess("Password reset successfully! Please log in.");
    }
    // Clean URL state
    window.history.replaceState({}, document.title, "/login");
  }, [location]);

  // 2. Helper function to route users based on their role
  const routeByUserRole = (role) => {
    const r = role?.toUpperCase();
    if (r === "ADMIN") navigate("/admin/dashboard");
    else if (r === "MSME") navigate("/client/dashboard");
    else if (r === "PRO") navigate("/students/dashboard");
    else if (r === "STAFF") navigate("/staff/dashboard");
    else setError("User role not recognized. Contact support.");
  };

  // 3. GOOGLE LOGIN HANDLER
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError("");
      try {
        // Fetch User Info from Google Servers
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}`, Accept: 'application/json' } }
        );

        // Send Google Data to your Backend
        const { data } = await api.post("/auth/google-login", {
          email: res.data.email,
          googleId: res.data.id,
          name: res.data.name,
          picture: res.data.picture
        });

        if (data?.token && data?.user) {
          await login(data.user, data.token);
          routeByUserRole(data.user.role);
        }
      } catch (err) {
        console.error("Google Auth Error:", err);
        setError("Google authentication failed. Please try manual login.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError("Google Sign-In was cancelled or failed.")
  });

  // 4. MANUAL LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = { 
        email: email.trim().toLowerCase(), 
        password: password.trim() 
      };

      const { data } = await api.post("/auth/login", payload);
      
      if (data?.token && data?.user) {
        await login(data.user, data.token);
        routeByUserRole(data.user.role);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Account not verified. Please check your email.");
      } else if (err.response?.status === 401) {
        setError("Invalid email or password. Check for typos.");
      } else {
        setError(err.response?.data?.message || "Connection failed. Is the server running?");
      }
    } finally {
      setLoading(false);
    }
  };

  // 5. RESEND VERIFICATION HANDLER
  const handleResend = async () => {
    if (!email) return setError("Enter your email to resend link.");
    setResending(true);
    try {
      await api.post("/auth/resend-verification", { email: email.trim().toLowerCase() });
      setSuccess("Verification link sent! Check your inbox.");
      setError("");
    } catch (err) {
      setError("Failed to resend. Check your email address.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[440px]">
        <div className="mb-8"><BackButton text="Return Home" to="/" /></div>
        
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-indigo-100/50 p-8 md:p-12 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex w-14 h-14 bg-indigo-600 rounded-2xl items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200">
              <Briefcase size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2 italic uppercase">
              Welcome Back<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase">Secure Platform Access</p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className={`mb-6 p-4 text-[10px] font-black uppercase tracking-widest rounded-2xl text-center border flex items-center justify-center gap-2 ${
              error.includes("verified") ? "bg-amber-50 border-amber-100 text-amber-600" : "bg-red-50 border-red-100 text-red-600"
            }`}>
              <AlertCircle size={14} />
              <div className="flex-1">
                {error}
                {error.includes("verified") && (
                  <button onClick={handleResend} disabled={resending} className="block w-full mt-1 text-indigo-600 hover:underline lowercase italic font-bold">
                    {resending ? "sending..." : "resend link"}
                  </button>
                )}
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-2xl text-center flex flex-col items-center gap-2">
              <CheckCircle2 size={16} />
              {success}
            </div>
          )}

          {/* Manual Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  required type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all font-bold text-gray-900" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" style={{fontSize: '9px'}} className="font-black text-indigo-600 uppercase tracking-widest hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  required type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all font-bold text-gray-900" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg active:scale-[0.98] disabled:bg-gray-300">
              {loading ? "Authenticating..." : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest text-gray-300"><span className="bg-white px-4 italic">Social Authentication</span></div>
          </div>

          {/* Google Sign In Button */}
          <button 
            type="button" 
            onClick={() => handleGoogleLogin()}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="G" /> 
            Sign in with Google
          </button>
        </div>
        
        <p className="text-center mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          New here? <Link to="/register" className="text-indigo-600 hover:underline ml-1">Create Account</Link>
        </p>
      </div>
    </div>
  );
}