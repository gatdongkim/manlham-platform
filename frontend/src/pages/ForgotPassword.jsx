import React, { useState } from "react";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/http";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("Check your inbox! If an account exists, you'll receive a reset link.");
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full border border-gray-50">
        <h2 className="text-2xl font-black text-gray-900 italic tracking-tighter mb-2">Forgot Password?</h2>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Enter your email to reset access</p>

        {message && <div className="mb-6 p-4 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-2xl">{message}</div>}
        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded-2xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input required type="email" placeholder="email@example.com" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button disabled={loading} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all">
            {loading ? "Sending..." : <>Request Link <Send size={14} /></>}
          </button>
        </form>

        <Link to="/login" className="mt-8 flex items-center justify-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:underline">
          <ArrowLeft size={14} /> Back to Login
        </Link>
      </div>
    </div>
  );
}