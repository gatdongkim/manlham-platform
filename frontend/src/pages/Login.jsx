import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Mail, Lock, ArrowRight, Briefcase, Eye, EyeOff, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
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

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccess(location.state.successMessage);
    }
    
    const params = new URLSearchParams(location.search);
    if (params.get("reset") === "success") {
      setSuccess("Password reset successfully! Please log in.");
    }

    // Clean up state so message doesn't persist
    window.history.replaceState({}, document.title, "/login");
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // ✅ Normalization: Trim whitespace and lowercase the email
      const payload = { 
        email: email.trim().toLowerCase(), 
        password: password.trim() 
      };

      const { data } = await api.post("/auth/login", payload);
      
      if (data?.token && data?.user) {
        // ✅ Store session in AuthContext
        await login(data.user, data.token);
        
        // ✅ Case-Insensitive Role Routing
        const role = data.user.role?.toUpperCase(); 
        
        console.log(`Auth Success: Routing ${data.user.email} as ${role}`);

        if (role === "ADMIN") navigate("/admin/dashboard");
        else if (role === "MSME") navigate("/client/dashboard");
        else if (role === "PRO") navigate("/students/dashboard");
        else if (role === "STAFF") navigate("/staff/dashboard");
        else {
          setError("User role not recognized. Please contact support.");
        }
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      
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
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-2xl text-center flex flex-col items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 size={16} />
              {success}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  required 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all font-bold text-gray-900" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
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
                  required 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all font-bold text-gray-900" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg group disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? "Authenticating..." : <>Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest text-gray-300"><span className="bg-white px-4 italic">Security Protocol Active</span></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all active:scale-[0.98]">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-4 h-4" alt="G" /> Sign in with Google
          </button>
        </div>
        
        <p className="text-center mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          New here? <Link to="/register" className="text-indigo-600 hover:underline ml-1">Create Account</Link>
        </p>
      </div>
    </div>
  );
}