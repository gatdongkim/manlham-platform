import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ShieldCheck, ArrowRight, Loader2, KeyRound } from "lucide-react";
import BackButton from "../../components/BackButton";
import api from "../../api/http"; // ✅ Connect to backend
import { useAuth } from "../../contexts/AuthContext"; // ✅ Access Auth state

export default function SignupStaff() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Destructure login function
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    accessCode: "", 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Internal Security Check
    if (form.accessCode !== "MANLHAM_2025") {
      setLoading(false);
      setError("Invalid Staff Access Code. Contact Admin.");
      return;
    }

    try {
      // 2. Register Staff via API
      const { data } = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "STAFF" // ✅ Explicitly assigning Staff role
      });

      if (data?.token && data?.user) {
        // 3. Sync with Global React State
        await login(data.user, data.token);
        
        // 4. Navigate to Staff Dashboard
        navigate("/staff/dashboard");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Internal registration failed.";
      setError(msg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <BackButton text="Back to Selection" to="/register" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center">
          <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-gray-200">
            <ShieldCheck size={28} />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-black text-gray-900 italic tracking-tighter">
          Internal Onboarding<span className="text-indigo-600">.</span>
        </h2>
        <p className="mt-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Staff Security Protocol
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-10 shadow-2xl shadow-indigo-100/50 rounded-[3rem] border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100 animate-shake">
                {error}
              </div>
            )}

            {/* Access Code Section */}
            <div className="bg-indigo-50/50 p-4 rounded-3xl border border-indigo-100 mb-6">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 ml-1 italic">Security Key</label>
              <div className="relative mt-1">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
                <input
                  name="accessCode"
                  type="text"
                  required
                  value={form.accessCode}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-indigo-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none font-black text-center tracking-[0.3em] uppercase transition-all placeholder:text-gray-200"
                  placeholder="MANLHAM-XXXX"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Official Name</label>
                <div className="relative mt-1">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold transition-all"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Company Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold transition-all"
                    placeholder="staff@manlham.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={18} />}
              {loading ? "Verifying Credentials..." : "Finalize Registration"}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-gray-50 pt-8">
            <Link to="/login" className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:underline flex items-center justify-center gap-2">
               Existing Staff? Access Portal <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}