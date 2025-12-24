import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Lock, CheckCircle, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import api from "../api/http";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    
    setLoading(true);

    try {
      await api.post("/auth/reset-password", { token, password });
      // Using a smoother transition than a standard alert
      navigate("/login?reset=success");
    } catch (err) {
      setError(err.response?.data?.message || "Link expired or invalid. Please request a new one.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[440px]">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-indigo-100/50 p-8 md:p-12 border border-gray-100 text-center">
          
          <div className="mb-10">
            <div className="inline-flex w-14 h-14 bg-indigo-600 rounded-2xl items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200">
              <ShieldCheck size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2 italic">
              New Password<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase">
              Update your security credentials
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* New Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all font-bold text-gray-900" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg group disabled:bg-gray-300"
            >
              {loading ? "Updating..." : <>Update Password <CheckCircle size={18} /></>}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-gray-300">
                <span className="bg-white px-4 italic">Encrypted Connection</span>
            </div>
          </div>

          <Link to="/login" className="flex items-center justify-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:underline">
            <ArrowLeft size={14} /> Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}